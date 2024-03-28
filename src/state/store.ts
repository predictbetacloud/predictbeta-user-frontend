import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slices/auth";
import { teamsSlice } from "./slices/teams";
import { fixtureSlice } from "./slices/fixtures";
import { walletSlice } from "./slices/wallet";
import { leaderboardSlice } from "./slices/leaderboard";

export const store = configureStore({
	reducer: {
		fixtures: fixtureSlice.reducer,
		teams: teamsSlice.reducer,
		leaderboard: leaderboardSlice.reducer,
		auth: authSlice.reducer,
		wallet: walletSlice.reducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
