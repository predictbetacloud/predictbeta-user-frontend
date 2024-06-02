import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { type RootState } from "../store";
import {
	FixtureState,
	IMatch,
	ISeason,
	IWeek,
	IWeekPrediction,
} from "../../types/types";

const initialState: FixtureState = {
	seasons: [],
	specificSeason: null,
	weeks: [],
	specificWeek: null,
	specificWeekPrediction: null,
	matches: [],
	isFetchingSeasons: true,
	isFetchingSpecificSeason: true,
	isFetchingWeeks: true,
	isFetchingSpecificWeek: true,
	isFetchingSpecificWeekPrediction: true,
	isFetchingMatches: true,
	isSubmittingPredictions: false,
};

export const fixtureSlice = createSlice({
	name: "fixture",
	// `createSlice` will infer the state type from the `initialState` argument
	initialState,
	reducers: {
		// Use the PayloadAction type to declare the contents of `action.payload`
		setSeasons: (state, action: PayloadAction<ISeason[]>) => {
			state.seasons = action.payload;
		},
		setSpecificSeason: (state, action: PayloadAction<ISeason>) => {
			state.specificSeason = action.payload;
		},
		setWeeks: (state, action: PayloadAction<IWeek[]>) => {
			state.weeks = action.payload;
		},
		setSpecificWeek: (state, action: PayloadAction<IWeek>) => {
			state.specificWeek = action.payload;
		},
		setSpecificWeekPrediction: (
			state,
			action: PayloadAction<IWeekPrediction | null>
		) => {
			state.specificWeekPrediction = action.payload;
		},
		setMatches: (state, action: PayloadAction<IMatch[]>) => {
			state.matches = action.payload;
		},
		setIsFetchingAllSeasons: (
			state,
			action: PayloadAction<FixtureState["isFetchingSeasons"]>
		) => {
			state.isFetchingSeasons = action.payload;
		},
		setIsFetchingSpecificSeason: (
			state,
			action: PayloadAction<FixtureState["isFetchingSpecificSeason"]>
		) => {
			state.isFetchingSpecificSeason = action.payload;
		},
		setIsFetchingAllWeeks: (
			state,
			action: PayloadAction<FixtureState["isFetchingWeeks"]>
		) => {
			state.isFetchingWeeks = action.payload;
		},
		setIsFetchingSpecificWeek: (
			state,
			action: PayloadAction<FixtureState["isFetchingSpecificWeek"]>
		) => {
			state.isFetchingSpecificWeek = action.payload;
		},
		setIsFetchingSpecificWeekPrediction: (
			state,
			action: PayloadAction<FixtureState["isFetchingSpecificWeekPrediction"]>
		) => {
			state.isFetchingSpecificWeekPrediction = action.payload;
		},
		setIsFetchingMatches: (
			state,
			action: PayloadAction<FixtureState["isFetchingMatches"]>
		) => {
			state.isFetchingMatches = action.payload;
		},
		setIsSubmittingPredictions: (
			state,
			action: PayloadAction<FixtureState["isSubmittingPredictions"]>
		) => {
			state.isSubmittingPredictions = action.payload;
		},
	},
});

export const {
	setSeasons,
	setWeeks,
	setSpecificSeason,
	setSpecificWeek,
	setSpecificWeekPrediction,
	setMatches,
	setIsFetchingAllSeasons,
	setIsFetchingAllWeeks,
	setIsFetchingSpecificSeason,
	setIsFetchingSpecificWeek,
	setIsFetchingSpecificWeekPrediction,
	setIsFetchingMatches,
	setIsSubmittingPredictions,
} = fixtureSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectAllSeasons = (state: RootState) => state.fixtures.seasons;

export const selectSpecificSeason = (state: RootState) =>
	state.fixtures.specificSeason;

export const selectAllWeeks = (state: RootState) => state.fixtures.weeks;

export const selectSpecificWeek = (state: RootState) =>
	state.fixtures.specificWeek;

export const selectSpecificWeekPrediction = (state: RootState) =>
	state.fixtures.specificWeekPrediction;

export const selectMatches = (state: RootState) => state.fixtures.matches;

export const selectIsFetchingAllSeasons = (state: RootState) =>
	state.fixtures.isFetchingSeasons;

export const selectIsFetchingSpecificSeasons = (state: RootState) =>
	state.fixtures.isFetchingSpecificSeason;

export const selectIsFetchingAllWeeks = (state: RootState) =>
	state.fixtures.isFetchingWeeks;

export const selectIsFetchingSpecificWeek = (state: RootState) =>
	state.fixtures.isFetchingSpecificWeek;

export const selectIsFetchingSpecificWeekPrediction = (state: RootState) =>
	state.fixtures.isFetchingSpecificWeekPrediction;

export const selectIsFetchingMatches = (state: RootState) =>
	state.fixtures.isFetchingMatches;

export const selectIsSubmittingPredictions = (state: RootState) =>
	state.fixtures.isSubmittingPredictions;
