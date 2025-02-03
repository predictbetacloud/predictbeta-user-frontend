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
  isRequestingOtp?: boolean;
  isFetchingUserInfo?: boolean;
  showAdPopUp?: boolean;
}

export interface TeamState {
  allPlayers: IPlayer[];
  isFetchingAllPlayers: boolean;
}

export interface Result {
  data: UserPosition[];
  totalPages: number;
  totalElements: number;
  elementsPerPage: string;
}

export interface IPaginatedLeaderboard {
  result: Result;
  userPosition: UserPosition;
}

export interface UserPosition {
  position: number;
  userId: string;
  username: string;
  location: null;
  points: number;
}
export interface LeaderboardState {
  leaderboard: IPaginatedLeaderboard | null;
  isFetchingWeekLeaderboard: boolean;
  isFetchingMonthLeaderboard: boolean;
  isFetchingSeasonLeaderboard: boolean;
}

export type SharingFormularType = {
  position: number;
  percentage: number;
}[];

export interface PrivateLeagueItem {
  name: string;
  leagueCode: string;
  id?: number;
  scoringStarts: number;
  entranceFee: number;
  numberOfPlayers: number;
  winningPositions: number;
  sharingFormula: {
    position: number;
    percentage: number;
  }[];
}
export interface PrivateLeagueState {
  allPrivateLeagues: PrivateLeagueItem[];
  specificPrivateLeague: PrivateLeagueItem | null;
  specificPrivateLeagueLeaderboard: UserPosition[];
  isFetchingAllPrivateLeagues: boolean;
  isFetchingSpecificPrivateLeague: boolean;
  isFetchingSpecificPrivateLeagueWeekLeaderboard: boolean;
  isFetchingSpecificPrivateLeagueSeasonLeaderboard: boolean;
  isJoiningPrivateLeague: boolean;
  isCreatingPrivateLeague: boolean;
  isEditingPrivateLeague: boolean;
  isDeletingPrivateLeague: boolean;
  isLeavingPrivateLeague: boolean;
  showSharePrivateLeagueModal: boolean;
  showLeavePrivateLeagueModal: boolean;
  showDeletePrivateLeagueModal: boolean;
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
  prediction: "" | "HOME" | "DRAW" | "AWAY" | "NULL" | undefined;
  awayTeam: IClub;
  homeTeam: IClub;
  id: number;
  number: number;
  createdAt: string;
  fixtureDateTime: string;
  week: IWeek;
  homeForm: string;
  awayForm: string;
  head2head: any;
  outcome?: "win" | "lose" | "pending" | "NULL";
}

export const predictionEnum = {
  AWAY: "AWAY",
  HOME: "HOME",
  DRAW: "DRAW",
  NULL: "NULL",
};

export type Prediction = {
  fixtureId: number;
  result: string;
};

export interface IWeekPrediction {
  score: number;
  pointUsed: number;

  predictions: {
    fixtures: {
      fixture: {
        id: number;
        createdAt: string;
        deletedAt: string | null;
        weekId: number;
        fixtureDateTime: string;
        homeTeam: IClub;
        awayTeam: IClub;
      };
      result: "HOME" | "AWAY" | "DRAW" | "NULL";
    }[];
    timeOfFirstGoal: number;
    mostLikelyToScore: IPlayer;
    moreLikelyToScore: IPlayer;
    likelyToScore: IPlayer;
  };

  results: {
    fixtures: {
      fixture: {
        id: number;
        createdAt: string;
        deletedAt: string | null;
        weekId: number;
        fixtureDateTime: string;
        homeTeam: IClub;
        awayTeam: IClub;
      };
      result: "HOME" | "AWAY" | "DRAW" | "NULL";
    }[];
    timeOfFirstGoal: number;
    scorers: IPlayer[];
  };
}

export interface FixtureState {
  seasons: ISeason[];
  specificSeason: ISeason | null;
  weeks: IWeek[];
  matches: IMatch[];
  specificWeek: IWeek | null;
  specificWeekPrediction: IWeekPrediction | null;
  // specificWeekResult: IWeekPrediction | null;
  isFetchingSeasons: boolean;
  isFetchingSpecificSeason: boolean;
  isFetchingWeeks: boolean;
  isFetchingSpecificWeek: boolean;
  isFetchingSpecificWeekPrediction: boolean;
  // isFetchingSpecificWeekResult: boolean;
  isFetchingMatches: boolean;
  isSubmittingPredictions: boolean;
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

export interface IPaginatedWalletHistory {
  items: UserPosition[];
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
}

export interface WalletState {
  wallet: WalletType | null;
  walletHistory: IPaginatedWalletHistory | null;
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

export const FormEnum = {
  W: "#27C079",
  L: "#D62F4B",
  D: "#B8C4CE",
};

export interface DrawerState {
  isDrawerOpen: boolean;
  isPublicDrawerOpen: boolean;
}
