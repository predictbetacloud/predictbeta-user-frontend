import { createAsyncThunk } from "@reduxjs/toolkit";
import { FieldValues } from "react-hook-form";

import axiosInstance from "../connection/defaultClient";
import { store } from "../state/store";
import {
	logoutUser,
	setIsFetchingUserInfo,
	setIsPerformingAuthAction,
	updateAuth,
	updateLogoutRetryCount,
	updateRetryCount,
} from "../state/slices/auth";
import { toastError, toastSuccess } from "../utils/toast";
import { globalRouter } from "../utils/utils";
import { setWallet } from "../state/slices/wallet";

const sessionName = import.meta.env.VITE_REACT_APP_SLUG + "_session";

export const signUpAPI = createAsyncThunk(
	"auth/signup",
	(
		{
			email,
			password,
			mobileNumber,
			firstName,
			middleName,
			surname,
		}: FieldValues,
		{ dispatch }
	) => {
		dispatch(setIsPerformingAuthAction(true));
		axiosInstance
			.post(`/users`, {
				email,
				password,
				mobileNumber,
				firstName,
				middleName,
				surname,
			})
			.then((data) => {
				// dispatch(
				// 	updateAuth({
				// 		user: {
				// 			email: data.data.user.email,
				// 			fullName: data.data.user.fullName,
				// 			id: data.data.user.id,
				// 			verifiedOn: data.data.user.verifiedOn,
				// 		},
				// 		token: data.data.tokens.access_token,
				// 		refresh_token: data.data.tokens.refresh_token,
				// 	})
				// );

				toastSuccess(
					data?.data?.message ?? "Your account has been created successfully"
				);
				dispatch(setIsPerformingAuthAction(false));

				if (globalRouter.navigate) {
					globalRouter.navigate("/login");
				}
			})
			.catch((error) => {
				dispatch(setIsPerformingAuthAction(false));
				toastError(error?.response?.data?.message);
			});
	}
);

export const loginAPI = createAsyncThunk(
	"auth/login",
	({ email, password }: FieldValues, { dispatch }) => {
		dispatch(setIsPerformingAuthAction(true));

		axiosInstance
			.post(`/users/login`, { email, password })
			.then((data) => {
				const newState = {
					user: {
						email: data.data.loginResponse?.data?.admin?.email,
						username: data.data.loginResponse?.data?.admin?.username,
						id: data.data.loginResponse?.data?.admin?.id,
						firstName: data.data.loginResponse?.data?.admin?.firstName,
						mobileNumber: data.data.loginResponse?.data?.admin?.mobileNumber,
						profilePicUrl: data.data.loginResponse?.data?.admin?.profilePicUrl,
						lastName: data.data.loginResponse?.data?.admin?.surname,
						userId: data.data.loginResponse?.data?.admin?.userId,
					},
					token: data.data.loginResponse?.data?.accessToken,
					refresh_token: data.data.loginResponse?.data?.refreshToken,
				};

				dispatch(updateAuth(newState));

				dispatch(setIsPerformingAuthAction(false));

				if (globalRouter.navigate) {
					if (globalRouter.location?.state?.from) {
						globalRouter.navigate(globalRouter?.location?.state?.from);
					} else {
						globalRouter.navigate("/dashboard/fixtures");
					}
				}
			})
			.catch((error) => {
				dispatch(setIsPerformingAuthAction(false));
				toastError(error?.response?.data?.message);
			});
	}
);

export const getUserInfoAPI = createAsyncThunk(
	"auth/getUserInfo",
	({ id }: FieldValues, { dispatch }) => {
		dispatch(setIsFetchingUserInfo(true));

		axiosInstance
			.get(`/users/${id}`)
			.then((data) => {
				const newState = {
					user: {
						email: data.data.data?.user.email,
						username: data.data.data?.user.username,
						id: data.data.data?.user.id,
						firstName: data.data.data?.user.firstName,
						mobileNumber: data.data.data?.user.mobileNumber,
						profilePicUrl: data.data.data?.user.profilePicUrl,
						lastName: data.data.data?.user.surname,
						userId: data.data.data?.user.userId,
					},
					wallet: {
						userId: data.data.data?.wallet.userId,
						currency: data.data.data?.wallet.currency,
						id: data.data.data?.wallet.id,
						balance: data.data.data?.wallet.balance,
					},
				};

				dispatch(setIsFetchingUserInfo(false));
				dispatch(setWallet(newState.wallet));
				dispatch(updateAuth(newState));
				// localStorage.setItem(sessionName, JSON.stringify(newState));
			})
			.catch((error) => {
				dispatch(setIsFetchingUserInfo(false));
				toastError(error?.response?.data?.message);
			});
	}
);

export const logOutAPI = createAsyncThunk(
	"users/logout",
	async (_, { dispatch }) => {
		dispatch(setIsPerformingAuthAction(true));
		const authState = store.getState().auth;
		const { logout_retryCount } = authState;

		const maxCount = 4;
		const retryCount = Number(logout_retryCount) ?? 0;

		const retry = retryCount < maxCount ? true : false;

		dispatch(updateLogoutRetryCount(String(0)));
		dispatch(logoutUser());
		dispatch(setIsPerformingAuthAction(false));

		if (retry) {
			axiosInstance
				.post(`/users/logout`)
				.then(() => {
					dispatch(updateLogoutRetryCount(String(0)));
					dispatch(setIsPerformingAuthAction(false));
					dispatch(logoutUser());
				})
				.catch(() => {
					dispatch(updateLogoutRetryCount((retryCount + 1).toString()));
					dispatch(logoutUser());
					dispatch(setIsPerformingAuthAction(false));
				});
		} else {
			dispatch(logoutUser());
			dispatch(updateLogoutRetryCount(String(0)));
			dispatch(setIsPerformingAuthAction(false));
		}
	}
);

export const refreshTokenAPI = createAsyncThunk(
	"users/refresh",
	async (_, { dispatch }) => {
		const authState = store.getState().auth;
		const { refresh_token, retryCount: _retryCount } = authState;

		const maxCount = 4;
		const retryCount = _retryCount ?? 0;

		const retry = Number(retryCount) < maxCount ? true : false;

		if (retry) {
			axiosInstance
				.post(
					`/users/refresh-token`,
					{ refreshToken: refresh_token },
					{
						headers: {
							Authorization: `Bearer ${refresh_token}`,
						},
					}
				)
				.then((data) => {
					dispatch(
						updateAuth({
							token: data.data.data.accessToken,
							refresh_token: data.data.data.refreshToken,
						})
					);

					dispatch(updateRetryCount(String(0)));
				})
				.catch((error) => {
					dispatch(
						updateRetryCount(retry ? (Number(retryCount) + 1).toString() : "0")
					);

					if (
						(error && error.response && error.response.status === 401) ||
						(error.data &&
							error?.data?.error &&
							error.data.error.code === 401) ||
						(error && error.response && error.response.status === 403) ||
						(error.data && error?.data?.error && error.data.error.code === 403)
					) {
						localStorage.removeItem(sessionName);
						dispatch(
							updateAuth({
								user: null,
								token: null,
								refresh_token: null,
							})
						);

						if (globalRouter.navigate) {
							globalRouter.navigate("/login", {
								state: { from: window.location.pathname },
							});
						}
					}
				});
		} else {
			if (globalRouter.navigate) {
				globalRouter.navigate("/login", {
					state: { from: window.location.pathname },
				});
			}
		}
	}
);
