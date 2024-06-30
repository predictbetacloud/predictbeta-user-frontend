import { setAllPlayers, setIsFetchingAllPlayers } from "../state/slices/teams";
import { createCancelableThunk } from "./helper";

// export const getAllPlayersAPI = createAsyncThunk(
// 	"teams/getAllPlayers",
// 	({ weekId }: FieldValues, { dispatch }) => {
// 		dispatch(setIsFetchingAllPlayers(true));
// 		axiosInstance
// 			.get(`/players/week/${weekId}`)
// 			.then((data) => {
// 				dispatch(setIsFetchingAllPlayers(false));
// 				dispatch(setAllPlayers(data.data?.data));
// 			})
// 			.catch((error) => {
// 				dispatch(setIsFetchingAllPlayers(false));
// 				toastError(error?.response?.data?.message);
// 			});
// 	}
// );

export const getAllPlayersAPI = createCancelableThunk(
	"teams/getAllPlayers",
	"getAllPlayers",
	({ weekId }) => `/players/week/${weekId}`,
	setIsFetchingAllPlayers,
	setAllPlayers
);
