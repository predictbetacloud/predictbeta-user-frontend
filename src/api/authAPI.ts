import { createAsyncThunk } from "@reduxjs/toolkit";
import { FieldValues } from "react-hook-form";

import axiosInstance from "../connection/defaultClient";
import { store } from "../state/store";
import {
	logoutUser,
	setIsFetchingUserInfo,
	setIsPerformingAuthAction,
	setIsRequestingOtp,
	updateAuth,
	updateLogoutRetryCount,
	updateRetryCount,
} from "../state/slices/auth";
import { toastError, toastSuccess } from "../utils/toast";
import { globalRouter } from "../utils/utils";
import { setWallet } from "../state/slices/wallet";
import axios from "axios";

const sessionName = import.meta.env.VITE_REACT_APP_SLUG + "_session";

export const signUpAPI = createAsyncThunk(
	"auth/signup",
	(
		{
			email,
			password,
			username,
			country,
			state,
			countryCode,
			mobileNumber,
			signUpType,
		}: FieldValues,
		{ dispatch }
	) => {
		dispatch(setIsPerformingAuthAction(true));
		axiosInstance
			.post(`/users`, {
				email,
				password,
				mobileNumber,
				username,
				country,
				state,
				countryCode,
				signUpType,
			})
			.then((data) => {
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

export const updateProfileAPI = createAsyncThunk(
	"auth/updateProfile",
	(
		{
			email,
			password,
			mobileNumber,
			firstName,
			middleName,
			username,
			surname,
			userId,
		}: FieldValues,
		{ dispatch }
	) => {
		dispatch(setIsPerformingAuthAction(true));
		axiosInstance
			.put(`/users/${userId}`, {
				email,
				password,
				mobileNumber,
				firstName,
				middleName,
				username,
				surname,
			})
			.then((data) => {
				toastSuccess(
					data?.data?.message ?? "Your account has been updated successfully"
				);
				dispatch(setIsPerformingAuthAction(false));
				// window.location.reload();
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
					console.log("in navigate", globalRouter.location);
					if (
						globalRouter.location &&
						globalRouter.location.state &&
						globalRouter.location.state.from
					) {
						console.log("router", globalRouter);
						console.log("location", globalRouter?.location);
						globalRouter.navigate(globalRouter?.location?.state?.from);
					} else {
						console.log("navigate but no state");
						globalRouter.navigate("/dashboard/fixtures");
					}
				} else {
					console.log("no navigate");
				}
			})
			.catch((error) => {
				dispatch(setIsPerformingAuthAction(false));
				toastError(error?.response?.data?.message);
			});
	}
);

export const verifyEmailAPI = createAsyncThunk(
	"auth/verify-email",
	({ oneTimeToken }: FieldValues, { dispatch }) => {
		dispatch(setIsPerformingAuthAction(true));
		axiosInstance
			.post(`/users/verify-email-action`, {
				oneTimeToken,
			})
			.then((data) => {
				toastSuccess(data?.data?.message ?? "Email verified");
				dispatch(setIsPerformingAuthAction(false));

				if (globalRouter.navigate) {
					globalRouter.navigate("/login");
				}
			})
			.catch((error) => {
				dispatch(setIsPerformingAuthAction(false));
				toastError(
					Array.isArray(error?.response?.data?.message)
						? error?.response?.data?.message?.[0]
						: error?.response?.data?.message
				);
			});
	}
);

export const requestPasswordOTP = createAsyncThunk(
	"auth/request-OTP",
	({ email }: FieldValues, { dispatch }) => {
		dispatch(setIsRequestingOtp(true));
		axiosInstance
			.post(`/users/reset-password`, {
				email,
			})
			.then((data) => {
				toastSuccess(
					data?.data?.message ?? "Request submitted, please check your email."
				);
				dispatch(setIsRequestingOtp(false));
			})
			.catch((error) => {
				dispatch(setIsRequestingOtp(false));
				toastError(error?.response?.data?.message);
			});
	}
);

export const forgotPasswordAPI = createAsyncThunk(
	"auth/forgot-password",
	({ email }: FieldValues, { dispatch }) => {
		dispatch(setIsPerformingAuthAction(true));
		axiosInstance
			.post(`/users/reset-password`, {
				email,
			})
			.then((data) => {
				toastSuccess(
					data?.data?.message ?? "Request submitted, please check your email."
				);
				dispatch(setIsPerformingAuthAction(false));

				if (globalRouter.navigate) {
					globalRouter.navigate("/new-password");
				}
			})
			.catch((error) => {
				dispatch(setIsPerformingAuthAction(false));
				toastError(error?.response?.data?.message);
			});
	}
);

export const newPasswordAPI = createAsyncThunk(
	"auth/new-password",
	({ oneTimePassword, password }: FieldValues, { dispatch }) => {
		dispatch(setIsPerformingAuthAction(true));
		axiosInstance
			.post(`/users/new-password-otp`, {
				oneTimePassword,
				password,
			})
			.then((data) => {
				toastSuccess(
					data?.data?.message ?? "New password set up successfully."
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

let getUserInfoCancelToken: AbortController;

export const getUserInfoAPI = createAsyncThunk(
	"auth/getUserInfo",
	({ id }: FieldValues, { dispatch }) => {
		dispatch(setIsFetchingUserInfo(true));

		if (getUserInfoCancelToken) {
			getUserInfoCancelToken.abort("Operation canceled due to new request.");
		}

		getUserInfoCancelToken = new AbortController();
		const { signal } = getUserInfoCancelToken;

		axiosInstance
			.get(`/users/${id}`, { signal })
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
				if (axios.isCancel(error) || error.name === "AbortError") {
					console.log("Request canceled:", error.message);
				} else {
					dispatch(setIsFetchingUserInfo(false));
					toastError(error?.response?.data?.message);
				}
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

let refreshRequestCancelToken: AbortController;

export const refreshTokenAPI = createAsyncThunk(
	"auth/refresh",
	async (_, { dispatch }) => {
		const authState = store.getState().auth;
		const { refresh_token, retryCount: _retryCount } = authState;

		const maxCount = 4;
		const retryCount = _retryCount ?? 0;

		const retry = Number(retryCount) < maxCount ? true : false;

		if (refreshRequestCancelToken) {
			refreshRequestCancelToken.abort("Operation canceled due to new request.");
		}

		refreshRequestCancelToken = new AbortController();
		const { signal } = refreshRequestCancelToken;

		if (retry) {
			axiosInstance
				.post(
					`/auth/refresh-token`,
					{ refreshToken: refresh_token },
					{
						headers: {
							Authorization: `Bearer ${refresh_token}`,
						},
						signal,
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
					if (axios.isCancel(error) || error.name === "AbortError") {
						console.log("Request canceled:", error.message);
					} else {
						dispatch(
							updateRetryCount(
								retry ? (Number(retryCount) + 1).toString() : "0"
							)
						);
						if (
							(error && error.response && error.response.status === 401) ||
							(error.data &&
								error?.data?.error &&
								error.data.error.code === 401) ||
							(error && error.response && error.response.status === 403) ||
							(error.data &&
								error?.data?.error &&
								error.data.error.code === 403)
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
								globalRouter.navigate("/", {
									state: {
										from: `${globalRouter.location?.pathname}${globalRouter.location?.search}`,
									},
								});
							}
						}
					}
				});
		} else {
			if (globalRouter.navigate) {
				globalRouter.navigate("/", {
					state: {
						from: `${globalRouter.location?.pathname}${globalRouter.location?.search}`,
					},
				});
			}
		}
	}
);
