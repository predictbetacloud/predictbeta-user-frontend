import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { type RootState } from "../store";
import { IPlayer, TeamState } from "../../types/types";

const initialState: TeamState = {
	allPlayers: [],
	isFetchingAllPlayers: false,
};

export const teamsSlice = createSlice({
	name: "teams",
	// `createSlice` will infer the state type from the `initialState` argument
	initialState,
	reducers: {
		// Use the PayloadAction type to declare the contents of `action.payload`
		setAllPlayers: (state, action: PayloadAction<IPlayer[]>) => {
			state.allPlayers = action.payload;
		},
		setIsFetchingAllPlayers: (
			state,
			action: PayloadAction<TeamState["isFetchingAllPlayers"]>
		) => {
			state.isFetchingAllPlayers = action.payload;
		},
	},
});

export const { setAllPlayers, setIsFetchingAllPlayers } = teamsSlice.actions;

// Other code such as selectors can use the imported `RootState` type

export const selectAllPlayers = (state: RootState) => state.teams.allPlayers;

export const selectIsFetchingAllPlayers = (state: RootState) =>
	state.teams.isFetchingAllPlayers;
