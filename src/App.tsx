import { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
// import { ErrorBoundary } from "react-error-boundary";

import { getUserInfoAPI, refreshTokenAPI } from "./api/authAPI";
import { useAppDispatch, useAppSelector } from "./state/hooks";
import { selectAuth } from "./state/slices/auth";
import { callFunctionInInterval } from "./utils/helpers";
import { globalRouter } from "./utils/utils";

// import ErrorFallback from "./components/layout/ErrorFallback";

import Login from "./pages/auth/Login";
import AllFixtures from "./pages/dashboard/fixtures/AllFixtures";
import NotFound from "./pages/404";
import LandingPage from "./pages/public/LandingPage";
import Register from "./pages/auth/Register";
import Wallet from "./pages/dashboard/wallet/Wallet";
import DepositFundModal from "./components/modals/DepositFundModal";
import { selectShowDepositModal } from "./state/slices/wallet";
import EditProfile from "./pages/dashboard/account/EditProfile";
import EditPassword from "./pages/dashboard/account/EditPassword";

function App() {
	const navigate = useNavigate();
	const location = useLocation();
	const dispatch = useAppDispatch();

	const { refresh_token, user } = useAppSelector(selectAuth);
	const showDepositModal = useAppSelector(selectShowDepositModal);

	globalRouter.navigate = navigate;
	globalRouter.location = location;

	useEffect(() => {
		if (refresh_token) {
			dispatch(refreshTokenAPI());
			const clearTimer = callFunctionInInterval(
				() => dispatch(refreshTokenAPI()),
				23 * 60 * 60000
			);
			return () => {
				clearTimer();
			};
		}
	}, []);

	useEffect(() => {
		if (user?.id) {
			dispatch(getUserInfoAPI({ id: user?.id }));
		}
	}, [user?.id]);

	return (
		// <ErrorBoundary FallbackComponent={ErrorFallback}>
		<>
			<Routes>
				<Route path="/" element={<LandingPage />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/dashboard/account/password" element={<EditPassword />} />
				<Route path="/dashboard/account" element={<EditProfile />} />
				<Route path="/dashboard/wallet" element={<Wallet />} />
				<Route path="/dashboard/fixtures" element={<AllFixtures />} />
				<Route path="*" element={<NotFound />} />
			</Routes>

			{showDepositModal ? <DepositFundModal /> : null}
		</>
		// </ErrorBoundary>
	);
}

export default App;
