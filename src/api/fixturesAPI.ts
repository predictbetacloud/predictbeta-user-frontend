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
import { createCancelableThunk } from "./helper";

// Season

// export const getAllSeasonsAPI = createAsyncThunk(
// 	"fixtures/getAllSeasons",
// 	({ params }: FieldValues, { dispatch }) => {
// 		dispatch(setIsFetchingAllSeasons(true));
// 		axiosInstance
// 			.get(`/seasons`, { params })
// 			.then((data) => {
// 				dispatch(setIsFetchingAllSeasons(false));
// 				dispatch(setSeasons(data.data?.data));
// 			})
// 			.catch((error) => {
// 				dispatch(setIsFetchingAllSeasons(false));
// 				toastError(error?.response?.data?.message);
// 			});
// 	}
// );

export const getAllSeasonsAPI = createCancelableThunk(
  "fixtures/getAllSeasons",
  "getAllSeasons",
  () => `/seasons`,
  setIsFetchingAllSeasons,
  setSeasons
);

// export const getSpecificSeasonAPI = createAsyncThunk(
// 	"fixtures/getSpecificSeason",
// 	({ seasonId }: FieldValues, { dispatch }) => {
// 		dispatch(setIsFetchingSpecificSeason(true));
// 		axiosInstance
// 			.get(`/seasons/${seasonId}`)
// 			.then((data) => {
// 				dispatch(setIsFetchingSpecificSeason(false));
// 				dispatch(setSpecificSeason(data.data?.data));
// 			})
// 			.catch((error) => {
// 				dispatch(setIsFetchingSpecificSeason(false));
// 				toastError(error?.response?.data?.message);
// 			});
// 	}
// );

export const getSpecificSeasonAPI = createCancelableThunk(
  "fixtures/getSpecificSeason",
  "getSpecificSeason",
  ({ seasonId }) => `/seasons/${seasonId}`,
  setIsFetchingSpecificSeason,
  setSpecificSeason
);

// Weeks

// export const getAllWeeksAPI = createAsyncThunk(
// 	"fixtures/getAllWeeks",
// 	({ seasonId }: FieldValues, { dispatch }) => {
// 		dispatch(setIsFetchingAllWeeks(true));
// 		axiosInstance
// 			.get(`/weeks/season/${seasonId}/published`)
// 			.then((data) => {
// 				dispatch(setIsFetchingAllWeeks(false));
// 				const weeks = Array.isArray(data?.data?.data)
// 					? data?.data?.data.reverse()
// 					: [];
// 				dispatch(setWeeks(weeks));
// 			})
// 			.catch((error) => {
// 				dispatch(setIsFetchingAllWeeks(false));
// 				toastError(error?.response?.data?.message);
// 			});
// 	}
// );

export const getAllWeeksAPI = createCancelableThunk(
  "fixtures/getAllWeeks",
  "getAllWeeks",
  ({ seasonId }) => `/weeks/season/${seasonId}/published`,
  setIsFetchingAllWeeks,
  setWeeks
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

export const getSpecificWeekAPI = createCancelableThunk(
  "fixtures/getSpecificWeek",
  "getSpecificWeek",
  ({ weekId }) => `/weeks/${weekId}`,
  setIsFetchingSpecificWeek,
  setSpecificWeek
);

// Matches
// export const getAllMatchesAPI = createAsyncThunk(
// 	"fixtures/getAllMatches",
// 	({ seasonId, weekId }: FieldValues, { dispatch }) => {
// 		dispatch(setIsFetchingMatches(true));
// 		axiosInstance
// 			.get(`/fixtures/season/${seasonId}/week/${weekId}`)
// 			.then((data) => {
// 				dispatch(setIsFetchingMatches(false));
// 				const matches = Array.isArray(data?.data?.data)
// 					? data?.data?.data.reverse()
// 					: [];
// 				dispatch(setMatches(matches));
// 			})
// 			.catch((error) => {
// 				dispatch(setIsFetchingMatches(false));
// 				toastError(error?.response?.data?.message);
// 			});
// 	}
// );

export const getAllMatchesAPI = createCancelableThunk(
  "fixtures/getAllMatches",
  "getAllMatches",
  ({ seasonId, weekId }) => `/fixtures/season/${seasonId}/week/${weekId}`,
  setIsFetchingMatches,
  setMatches
);
// Prediction
export const submitPredictionAPI = createAsyncThunk(
  "fixtures/submitPrediction",
  (
    {
      seasonId,
      weekId,
      predictions,
      mostLikelyToScore,
      moreLikelyToScore,
      likelyToScore,
      timeOfFirstGoal,
      point = 0,
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
        point,
      })
      .then((data) => {
        dispatch(setIsSubmittingPredictions(false));
        dispatch(
          getSpecificWeekPredictionAPI({
            weekId,
          })
        );
        dispatch(
          getAllMatchesAPI({
            seasonId,
            weekId,
          })
        );
        toastSuccess(
          data?.data?.message ??
            "Your prediction has been submitted successfully"
        );
      })
      .catch((error) => {
        dispatch(setIsSubmittingPredictions(false));
        toastError(error?.response?.data?.message);
      });
  }
);

// export const getSpecificWeekPredictionAPI = createAsyncThunk(
// 	"fixtures/getSpecificWeekPrediction",
// 	({ weekId }: FieldValues, { dispatch }) => {
// 		dispatch(setIsFetchingSpecificWeekPrediction(true));
// 		axiosInstance
// 			.get(`/predictions/week/${weekId}`)
// 			.then((data) => {
// 				dispatch(setIsFetchingSpecificWeekPrediction(false));
// 				dispatch(setSpecificWeekPrediction(data?.data?.data));
// 			})
// 			.catch((error) => {
// 				dispatch(setSpecificWeekPrediction(null));
// 				dispatch(setIsFetchingSpecificWeekPrediction(false));
// 				toastError(error?.response?.data?.message);
// 			});
// 	}
// );

export const getSpecificWeekPredictionAPI = createCancelableThunk(
  "fixtures/getSpecificWeekPrediction",
  "getSpecificWeekPrediction",
  ({ weekId }) => `/predictions/week/${weekId}`,
  setIsFetchingSpecificWeekPrediction,
  setSpecificWeekPrediction
);

// export const getSpecificUserWeekPredictionAPI = createAsyncThunk(
// 	"fixtures/getSpecificUserWeekPrediction",
// 	({ username, weekId }: FieldValues, { dispatch }) => {
// 		dispatch(setIsFetchingSpecificWeekPrediction(true));
// 		axiosInstance
// 			.get(`/leaderboard/predictions/user/${username}/week/${weekId}`)
// 			.then((data) => {
// 				dispatch(setIsFetchingSpecificWeekPrediction(false));
// 				dispatch(setSpecificWeekPrediction(data?.data?.data));
// 			})
// 			.catch((error) => {
// 				dispatch(setSpecificWeekPrediction(null));
// 				dispatch(setIsFetchingSpecificWeekPrediction(false));
// 				toastError(error?.response?.data?.message);
// 			});
// 	}
// );

export const getSpecificUserWeekPredictionAPI = createCancelableThunk(
  "fixtures/getSpecificUserWeekPrediction",
  "getSpecificUserWeekPrediction",
  ({ username, weekId }) =>
    `/leaderboard/predictions/user/${username}/week/${weekId}`,
  setIsFetchingSpecificWeekPrediction,
  setSpecificWeekPrediction
);
