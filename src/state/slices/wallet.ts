import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { type RootState } from "../store";
import { WalletState, WalletType } from "../../types/types";

const sessionName = import.meta.env.VITE_REACT_APP_SLUG + "_session";

const initialState: WalletState = {
	wallet: localStorage.getItem(sessionName)
		? JSON.parse(localStorage.getItem(sessionName) ?? "")?.wallet
		: {},
	walletHistory: [],
	isFetchingWalletInfo: false,
	isFundingWallet: false,
	isWithdrawingWallet: false,
	showDepositModal: false,
	showWithdrawalModal: false,
};

export const walletSlice = createSlice({
	name: "wallet",
	// `createSlice` will infer the state type from the `initialState` argument
	initialState,
	reducers: {
		// Use the PayloadAction type to declare the contents of `action.payload`
		setWallet: (state, action: PayloadAction<WalletType>) => {
			state.wallet = action.payload;
		},
		setWalletHistory: (state, action: PayloadAction<any>) => {
			state.walletHistory = action.payload;
		},
		setIsFundingWallet: (
			state,
			action: PayloadAction<WalletState["isFundingWallet"]>
		) => {
			state.isFundingWallet = action.payload;
		},
		setIsFetchingWalletInfo: (
			state,
			action: PayloadAction<WalletState["isFetchingWalletInfo"]>
		) => {
			state.isFetchingWalletInfo = action.payload;
		},
		setIsWithdrawingWallet: (
			state,
			action: PayloadAction<WalletState["isWithdrawingWallet"]>
		) => {
			state.isWithdrawingWallet = action.payload;
		},
		setShowDepositModal: (
			state,
			action: PayloadAction<WalletState["showDepositModal"]>
		) => {
			state.showDepositModal = action.payload;
		},
		setShowWithdrawalModal: (
			state,
			action: PayloadAction<WalletState["showWithdrawalModal"]>
		) => {
			state.showWithdrawalModal = action.payload;
		},
	},
});

export const {
	setIsFetchingWalletInfo,
	setIsFundingWallet,
	setIsWithdrawingWallet,
	setShowDepositModal,
	setShowWithdrawalModal,
	setWallet,
	setWalletHistory,
} = walletSlice.actions;

export const selectWallet = (state: RootState) => state.wallet.wallet;

export const selectWalletHistory = (state: RootState) =>
	state.wallet.walletHistory;

export const selectIsFetchingWalletInfo = (state: RootState) =>
	state.wallet.isFetchingWalletInfo;

export const selectIsFundingWallet = (state: RootState) =>
	state.wallet.isFundingWallet;

export const selectIsWithdrawingWallet = (state: RootState) =>
	state.wallet.isWithdrawingWallet;

export const selectShowDepositModal = (state: RootState) =>
	state.wallet.showDepositModal;

export const selectShowWithdrawalModal = (state: RootState) =>
	state.wallet.showWithdrawalModal;
