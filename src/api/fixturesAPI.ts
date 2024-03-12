import { createAsyncThunk } from "@reduxjs/toolkit";
import { FieldValues } from "react-hook-form";

import axiosInstance from "../connection/defaultClient";
import { toastError } from "../utils/toast";
import {
	setIsFetchingAllSeasons,
	setIsFetchingAllWeeks,
	setIsFetchingMatches,
	setIsFetchingSpecificSeason,
	setIsFetchingSpecificWeek,
	setMatches,
	setSeasons,
	setSpecificSeason,
	setSpecificWeek,
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
			.get(`/weeks/season/${seasonId}`)
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

// export const getSpecificWeekAPI = createAsyncThunk(
// 	"fixtures/getSpecificWeek",
// 	({ weekId }: FieldValues, { dispatch }) => {
// 		dispatch(setIsFetchingSpecificWeek(true));
// 		axiosInstance
// 			.get(`/weeks/${weekId}`)
// 			.then((data) => {
// 				dispatch(setIsFetchingSpecificWeek(false));
// 				dispatch(setSpecificWeek(data.data?.data));
// 			})
// 			.catch((error) => {
// 				dispatch(setIsFetchingSpecificWeek(false));
// 				toastError(error?.response?.data?.message);
// 			});
// 	}
// );
