import { createAsyncThunk } from "@reduxjs/toolkit";
import { FieldValues } from "react-hook-form";

import axiosInstance from "../connection/defaultClient";
import { toastError } from "../utils/toast";
import {
	setIsFetchingWalletInfo,
	setIsFundingWallet,
	setWalletHistory,
} from "../state/slices/wallet";

export const getWalletHistoryAPI = createAsyncThunk(
	"wallet/getHistory",
	({ userId }: FieldValues, { dispatch }) => {
		dispatch(setIsFetchingWalletInfo(true));

		axiosInstance
			.get(`/users/${userId}/wallet-history`)
			.then((data) => {
				dispatch(setIsFetchingWalletInfo(false));
				dispatch(setWalletHistory(data.data.data));
			})
			.catch((error) => {
				dispatch(setIsFetchingWalletInfo(false));
				toastError(error?.response?.data?.message);
			});
	}
);

export const fundWalletAPI = createAsyncThunk(
	"wallet/fundWallet",
	({ amount, userId }: FieldValues, { dispatch }) => {
		dispatch(setIsFundingWallet(true));
		axiosInstance
			.post(`/users/${userId}/fund-wallet`, { amount })
			.then((data) => {
				dispatch(setIsFundingWallet(false));
				window.open(data.data.data.data.authorization_url, "_blank");
			})
			.catch((error) => {
				dispatch(setIsFundingWallet(false));
				toastError(error?.response?.data?.message);
			});
	}
);

export const withdrawWalletAPI = createAsyncThunk(
	"wallet/withdrawWallet",
	({ amount, userId }: FieldValues, { dispatch }) => {
		dispatch(setIsFundingWallet(true));
		axiosInstance
			.post(`/users/${userId}/withdraw-wallet`, { amount })
			.then(() => {
				dispatch(setIsFundingWallet(false));
			})
			.catch((error) => {
				dispatch(setIsFundingWallet(false));
				toastError(error?.response?.data?.message);
			});
	}
);
