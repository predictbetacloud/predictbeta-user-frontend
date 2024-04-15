import { createSlice } from "@reduxjs/toolkit";
import { type RootState } from "../store";
import { DrawerState } from "../../types/types";

const initialState: DrawerState = {
	isDrawerOpen: false,
};

export const drawerSlice = createSlice({
	name: "drawer",
	initialState,
	reducers: {
		toggleDrawer: (state) => {
			state.isDrawerOpen = !state.isDrawerOpen;
		},
	},
});

export const { toggleDrawer } = drawerSlice.actions;

export const selectDrawerState = (state: RootState) =>
	state.drawer.isDrawerOpen;
