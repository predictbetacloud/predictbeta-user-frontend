import { createSlice } from "@reduxjs/toolkit";
import { type RootState } from "../store";
import { DrawerState } from "../../types/types";

const initialState: DrawerState = {
	isDrawerOpen: false,
	isPublicDrawerOpen: false,
};

export const drawerSlice = createSlice({
	name: "drawer",
	initialState,
	reducers: {
		toggleDrawer: (state) => {
			state.isDrawerOpen = !state.isDrawerOpen;
		},
		togglePublicDrawer: (state) => {
			state.isPublicDrawerOpen = !state.isPublicDrawerOpen;
		},
	},
});

export const { toggleDrawer, togglePublicDrawer } = drawerSlice.actions;

export const selectDrawerState = (state: RootState) =>
	state.drawer.isDrawerOpen;

export const selectPublicDrawerState = (state: RootState) =>
	state.drawer.isPublicDrawerOpen;
