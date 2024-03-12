import { CSSProperties } from "react";
import { colors } from "../utils/colors";

// Buttons
export type ButtonAction = "button" | "submit" | "reset" | undefined;

export interface ButtonType {
	title?: string;
	type?: ButtonAction;
	style?: CSSProperties | undefined;
	className?: string;
	disabled?: boolean;
	loading?: boolean;
	content?: React.ReactElement;
	onClick?: () => void;
}

export interface IPlayer {
	name: string;
	number: number;
	createdAt: string;
	id: number;
}

export interface IClub {
	name: string;
	clubLogo: string;
	createdAt: string;
	id: number;
	region: null;
	shortName: string;
	players: [] | undefined;
}

export interface ICreateClub {
	name: "string";
	shortName: "string";
	region: "string";
	clubLogo: "string";
}

// Auth Types

export interface UserType {
	id: string;
	email: string;
	firstName: string;
	lastName: string;
	verifiedOn: string | Date | number;
	username: string;
	mobileNumber: string;
	userId: string;
}

export interface WalletType {
	userId: number;
	currency: string;
	id: number;
	balance: number;
}

export interface AuthType {
	user?: Partial<UserType> | null;
	wallet?: WalletType | null;
	token?: string | null;
	refresh_token?: string | null;
	retryCount?: number | string | null;
	logout_retryCount?: number | string | null;
	isPerformingAuthAction?: boolean;
	isFetchingUserInfo?: boolean;
}

export interface TeamState {
	allPlayers: IPlayer[];
	isFetchingAllPlayers: boolean;
}

export interface ISeason {
	id: number;
	name: string;
	createdAt: string;
}

export interface IWeek {
	id: number;
	number: number;
	createdAt: string;
	deadline?: string | number;
}
export interface IMatch {
	prediction: "" | "1" | "X" | "2" | undefined;
	awayTeam: IClub;
	homeTeam: IClub;
	id: number;
	number: number;
	createdAt: string;
	fixtureDateTime: string;
	week: IWeek;
}

export const predictionEnum = {
	AWAY: "2",
	HOME: "1",
	DRAW: "X",
};

export const reversePredictionEnum = {
	1: "HOME",
	X: "DRAW",
	2: "AWAY",
};

export interface FixtureState {
	seasons: ISeason[];
	specificSeason: ISeason | null;
	weeks: IWeek[];
	matches: IMatch[];
	specificWeek: IWeek | null;
	isFetchingSeasons: boolean;
	isFetchingSpecificSeason: boolean;
	isFetchingWeeks: boolean;
	isFetchingSpecificWeek: boolean;
	isFetchingMatches: boolean;
}

export interface WalletHistoryItem {
	amount: number;
	balanceAfter: number;
	balanceBefore: number;
	createdAt: string;
	currency: string;
	deletedAt: string | null;
	id: number;
	reference: string;
	type: "credit" | "debit";
}

export interface WalletState {
	wallet: WalletType | null;
	walletHistory: WalletHistoryItem[];
	isFetchingWalletInfo: boolean;
	isFundingWallet: boolean;
	isWithdrawingWallet: boolean;
	showDepositModal: boolean;
	showWithdrawalModal: boolean;
}

export interface IUser {
	userId: string;
	firstName: string;
	middleName: string;
	surname: string;
	email: string;
	profilePicUrl: string;
	mobileNumber: string;
}

export interface UserState {
	users: IUser[];
	specificUser: IUser | null;
	isCreatingUser: boolean;
	isFetchingAllUsers: boolean;
	isFetchingSpecificUser: boolean;
	isEditingUser: boolean;
	isDeletingUser: boolean;
}

export const statusEnum = {
	success: {
		bg: colors.green200,
		color: colors.green700,
	},
	pending: {
		bg: colors.orange200,
		color: colors.orange700,
	},
	warning: {
		bg: colors.orange200,
		color: colors.orange700,
	},
	error: {
		bg: colors.red200,
		color: colors.red700,
	},
	failed: {
		bg: colors.red200,
		color: colors.red700,
	},
	credit: {
		bg: colors.green200,
		color: colors.green700,
	},
	debit: {
		bg: colors.orange200,
		color: colors.orange700,
	},
};
