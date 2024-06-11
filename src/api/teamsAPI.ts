import { createAsyncThunk } from "@reduxjs/toolkit";
import { FieldValues } from "react-hook-form";

import axiosInstance from "../connection/defaultClient";
import { toastError } from "../utils/toast";
import { setAllPlayers, setIsFetchingAllPlayers } from "../state/slices/teams";

export const getAllPlayersAPI = createAsyncThunk(
	"teams/getAllPlayers",
	({ weekId }: FieldValues, { dispatch }) => {
		dispatch(setIsFetchingAllPlayers(true));
		axiosInstance
			.get(`/players/week/${weekId}`)
			.then((data) => {
				dispatch(setIsFetchingAllPlayers(false));
				dispatch(setAllPlayers(data.data?.data));
			})
			.catch((error) => {
				dispatch(setIsFetchingAllPlayers(false));
				toastError(error?.response?.data?.message);
			});
	}
);
