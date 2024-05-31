import { createAsyncThunk } from "@reduxjs/toolkit";
import { FieldValues } from "react-hook-form";

import axiosInstance from "../connection/defaultClient";
import { toastError, toastSuccess } from "../utils/toast";
import {
	setIsFetchingAllSeasons,
	setIsFetchingAllWeeks,
	setIsFetchingMatches,
	setIsFetchingSpecificSeason,
	setIsFetchingSpecificWeek,
	setIsFetchingSpecificWeekPrediction,
	setIsSubmittingPredictions,
	setMatches,
	setSeasons,
	setSpecificSeason,
	setSpecificWeek,
	setSpecificWeekPrediction,
	setWeeks,
} from "../state/slices/fixtures";

// Season

export const getAllSeasonsAPI = createAsyncThunk(
	"fixtures/getAllSeasons",
	({ params }: FieldValues, { dispatch }) => {
		dispatch(setIsFetchingAllSeasons(true));
		axiosInstance
			.get(`/seasons`, { params })
			.then((data) => {
				dispatch(setIsFetchingAllSeasons(false));
				dispatch(setSeasons(data.data?.data));
			})
			.catch((error) => {
				dispatch(setIsFetchingAllSeasons(false));
				toastError(error?.response?.data?.message);
			});
	}
);

export const getSpecificSeasonAPI = createAsyncThunk(
	"fixtures/getSpecificSeason",
	({ seasonId }: FieldValues, { dispatch }) => {
		dispatch(setIsFetchingSpecificSeason(true));
		axiosInstance
			.get(`/seasons/${seasonId}`)
			.then((data) => {
				dispatch(setIsFetchingSpecificSeason(false));
				dispatch(setSpecificSeason(data.data?.data));
			})
			.catch((error) => {
				dispatch(setIsFetchingSpecificSeason(false));
				toastError(error?.response?.data?.message);
			});
	}
);

// Weeks

export const getAllWeeksAPI = createAsyncThunk(
	"fixtures/getAllWeeks",
	({ seasonId }: FieldValues, { dispatch }) => {
		dispatch(setIsFetchingAllWeeks(true));
		axiosInstance
			.get(`/weeks/season/${seasonId}/published`)
			.then((data) => {
				dispatch(setIsFetchingAllWeeks(false));
				const weeks = Array.isArray(data?.data?.data)
					? data?.data?.data.reverse()
					: [];
				dispatch(setWeeks(weeks));
			})
			.catch((error) => {
				dispatch(setIsFetchingAllWeeks(false));
				toastError(error?.response?.data?.message);
			});
	}
);

export const getSpecificWeekAPI = createAsyncThunk(
	"fixtures/getSpecificWeek",
	({ weekId }: FieldValues, { dispatch }) => {
		dispatch(setIsFetchingSpecificWeek(true));
		axiosInstance
			.get(`/weeks/${weekId}`)
			.then((data) => {
				dispatch(setIsFetchingSpecificWeek(false));
				dispatch(setSpecificWeek(data.data?.data));
			})
			.catch((error) => {
				dispatch(setIsFetchingSpecificWeek(false));
				toastError(error?.response?.data?.message);
			});
	}
);

// Matches
export const getAllMatchesAPI = createAsyncThunk(
	"fixtures/getAllMatches",
	({ seasonId, weekId }: FieldValues, { dispatch }) => {
		dispatch(setIsFetchingMatches(true));
		axiosInstance
			.get(`/fixtures/season/${seasonId}/week/${weekId}`)
			.then((data) => {
				dispatch(setIsFetchingMatches(false));
				const matches = Array.isArray(data?.data?.data)
					? data?.data?.data.reverse()
					: [];
				dispatch(setMatches(matches));
			})
			.catch((error) => {
				dispatch(setIsFetchingMatches(false));
				toastError(error?.response?.data?.message);
			});
	}
);

// Prediction
export const submitPredictionAPI = createAsyncThunk(
	"fixtures/submitPrediction",
	(
		{
			weekId,
			predictions,
			mostLikelyToScore,
			moreLikelyToScore,
			likelyToScore,
			timeOfFirstGoal,
		}: FieldValues,
		{ dispatch }
	) => {
		dispatch(setIsSubmittingPredictions(true));
		axiosInstance
			.post(`/predictions`, {
				weekId,
				predictions,
				mostLikelyToScore,
				moreLikelyToScore,
				likelyToScore,
				timeOfFirstGoal,
			})
			.then((data) => {
				dispatch(setIsSubmittingPredictions(false));
				toastSuccess(
					data?.data?.message ??
						"Your prediction has been submitted succesfully"
				);
				getSpecificWeekPredictionAPI({
					weekId,
				});
			})
			.catch((error) => {
				dispatch(setIsSubmittingPredictions(false));
				toastError(error?.response?.data?.message);
			});
	}
);

export const getSpecificWeekPredictionAPI = createAsyncThunk(
	"fixtures/getSpecificWeekPrediction",
	({ weekId }: FieldValues, { dispatch }) => {
		dispatch(setIsFetchingSpecificWeekPrediction(true));
		axiosInstance
			.get(`/predictions/week/${weekId}`)
			.then((data) => {
				dispatch(setIsFetchingSpecificWeekPrediction(false));
				dispatch(setSpecificWeekPrediction(data?.data?.data));
			})
			.catch((error) => {
				dispatch(setSpecificWeekPrediction(null));
				dispatch(setIsFetchingSpecificWeekPrediction(false));
				toastError(error?.response?.data?.message);
			});
	}
);

export const getSpecificUserWeekPredictionAPI = createAsyncThunk(
	"fixtures/getSpecificUserWeekPrediction",
	({ username, weekId }: FieldValues, { dispatch }) => {
		dispatch(setIsFetchingSpecificWeekPrediction(true));
		axiosInstance
			.get(`/leaderboard/predictions/user/${username}/week/${weekId}`)
			.then((data) => {
				dispatch(setIsFetchingSpecificWeekPrediction(false));
				dispatch(setSpecificWeekPrediction(data?.data?.data));
			})
			.catch((error) => {
				dispatch(setSpecificWeekPrediction(null));
				dispatch(setIsFetchingSpecificWeekPrediction(false));
				toastError(error?.response?.data?.message);
			});
	}
);
