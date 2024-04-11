import { createAsyncThunk } from "@reduxjs/toolkit";
import { FieldValues } from "react-hook-form";

import axiosInstance from "../connection/defaultClient";
import { toastError } from "../utils/toast";
import {
	setAllPrivateLeagues,
	setIsCreatingPrivateLeague,
	setIsFetchingAllPrivateLeagues,
	setIsFetchingSpecificPrivateLeague,
	setIsFetchingSpecificPrivateLeagueSeasonLeaderboard,
	setIsFetchingSpecificPrivateLeagueWeekLeaderboard,
	setIsJoiningPrivateLeague,
	setSpecificPrivateLeague,
	setSpecificPrivateLeagueLeaderboard,
} from "../state/slices/privateLeague";
import { globalRouter } from "../utils/utils";

export const createPrivateLeagueAPI = createAsyncThunk(
	"privateLeague/createPrivateLeague",
	(
		{
			name,
			scoringStarts,
			entranceFee,
			numberOfPlayers,
			winningPositions,
			sharingFormula,
		}: FieldValues,
		{ dispatch }
	) => {
		dispatch(setIsCreatingPrivateLeague(true));
		axiosInstance
			.post(`/private-league`, {
				name,
				scoringStarts,
				entranceFee,
				numberOfPlayers,
				winningPositions,
				sharingFormula,
			})
			.then(() => {
				dispatch(setIsCreatingPrivateLeague(false));

				if (globalRouter.navigate) {
					if (globalRouter.location?.state?.from) {
						globalRouter.navigate(globalRouter?.location?.state?.from);
					} else {
						globalRouter.navigate("/dashboard/private-league");
					}
				}
			})
			.catch((error) => {
				dispatch(setIsCreatingPrivateLeague(false));
				Array.isArray(error?.response?.data?.message)
					? toastError(error?.response?.data?.message?.[0])
					: toastError(error?.response?.data?.message);
			});
	}
);

export const joinPrivateLeagueAPI = createAsyncThunk(
	"privateLeague/joinPrivateLeague",
	({ code }: FieldValues, { dispatch }) => {
		dispatch(setIsJoiningPrivateLeague(true));
		axiosInstance
			.post(`/private-league/${code}/join`)
			.then(() => {
				dispatch(setIsJoiningPrivateLeague(false));
				dispatch(getAllPrivateLeaguesAPI());
			})
			.catch((error) => {
				dispatch(setIsJoiningPrivateLeague(false));
				toastError(error?.response?.data?.message);
			});
	}
);

export const getAllPrivateLeaguesAPI = createAsyncThunk(
	"privateLeague/getAllPrivateLeagues",
	(_, { dispatch }) => {
		dispatch(setIsFetchingAllPrivateLeagues(true));
		axiosInstance
			.get(`/private-league/user`)
			.then((data) => {
				dispatch(setAllPrivateLeagues(data.data?.data));
				dispatch(setIsFetchingAllPrivateLeagues(false));
			})
			.catch((error) => {
				dispatch(setAllPrivateLeagues([]));
				dispatch(setIsFetchingAllPrivateLeagues(false));
				toastError(error?.response?.data?.message);
			});
	}
);

export const getSpecificPrivateLeaguesAPI = createAsyncThunk(
	"privateLeague/getSpecificPrivateLeagues",
	({ leagueId }: FieldValues, { dispatch }) => {
		dispatch(setIsFetchingSpecificPrivateLeague(true));
		axiosInstance
			.get(`/private-league/${leagueId}`)
			.then((data) => {
				dispatch(setSpecificPrivateLeague(data.data?.data));
				dispatch(setIsFetchingSpecificPrivateLeague(false));
			})
			.catch((error) => {
				dispatch(setSpecificPrivateLeague(null));
				dispatch(setIsFetchingSpecificPrivateLeague(false));
				toastError(error?.response?.data?.message);
			});
	}
);

export const getPrivateLeagueWeekLeaderboardAPI = createAsyncThunk(
	"privateLeague/getPrivateLeagueWeekLeaderboard",
	({ weekId, leagueId }: FieldValues, { dispatch }) => {
		dispatch(setIsFetchingSpecificPrivateLeagueWeekLeaderboard(true));
		axiosInstance
			.get(`/private-league/${leagueId}/${weekId}/leaderboard`)
			.then((data) => {
				dispatch(setSpecificPrivateLeagueLeaderboard(data.data?.data));
				dispatch(setIsFetchingSpecificPrivateLeagueWeekLeaderboard(false));
			})
			.catch((error) => {
				dispatch(setSpecificPrivateLeagueLeaderboard([]));
				dispatch(setIsFetchingSpecificPrivateLeagueWeekLeaderboard(false));
				toastError(error?.response?.data?.message);
			});
	}
);

export const getPrivateLeagueSeasonLeaderboardAPI = createAsyncThunk(
	"privateLeague/getPrivateLeagueSeasonLeaderboard",
	({ seasonId, leagueId }: FieldValues, { dispatch }) => {
		dispatch(setIsFetchingSpecificPrivateLeagueSeasonLeaderboard(true));
		axiosInstance
			.get(`/private-league/${leagueId}/${seasonId}/leaderboard`)
			.then((data) => {
				dispatch(setSpecificPrivateLeagueLeaderboard(data.data?.data));
				dispatch(setIsFetchingSpecificPrivateLeagueSeasonLeaderboard(false));
			})
			.catch((error) => {
				dispatch(setSpecificPrivateLeagueLeaderboard([]));
				dispatch(setIsFetchingSpecificPrivateLeagueSeasonLeaderboard(false));
				toastError(error?.response?.data?.message);
			});
	}
);
