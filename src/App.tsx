import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
// import { ErrorBoundary } from "react-error-boundary";

import { useAppSelector } from "./state/hooks";
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
import PredictionHistory from "./pages/dashboard/predictionHistory/PredictionHistory";
import WeekLeaderboard from "./pages/dashboard/leaderboard/WeekLeaderboard";
import Terms from "./pages/public/Terms";
import AboutPage from "./pages/public/AboutPage";
import ContactPage from "./pages/public/ContactPage";
import HowToPlayPage from "./pages/public/HowToPlayPage";
import FaqPage from "./pages/public/FAQs";
import AllPrivateLeagues from "./pages/dashboard/privateLeague/AllPrivateLeagues";
import CreatePrivateLeague from "./pages/dashboard/privateLeague/CreatePrivateLeague";
import JoinPrivateLeague from "./pages/dashboard/privateLeague/JoinPrivateLeague";
import PrivateLeagueWeekLeaderboard from "./pages/dashboard/privateLeague/PrivateLeagueWeekLeaderboard";
import EditPrivateLeague from "./pages/dashboard/privateLeague/EditPrivateLeague";
import ForgotPassword from "./pages/auth/ForgotPassword";
import NewPassword from "./pages/auth/NewPassword";
import SeasonLeaderboard from "./pages/dashboard/leaderboard/SeasonLeaderboard";
import MonthLeaderboard from "./pages/dashboard/leaderboard/MonthLeaderboard";
import VerifyEmail from "./pages/auth/VerifyEmail";
import UserPredictionHistory from "./pages/dashboard/predictionHistory/UserPredictionHistory";
import PublicWeekLeaderboard from "./pages/public/PublicWeekLeaderboard";
import PublicMonthLeaderboard from "./pages/public/PublicMonthLeaderboard";
import PublicSeasonLeaderboard from "./pages/public/PublicSeasonLeaderboard";
import DemoPage from "./pages/public/Demo";
import Policy from "./pages/public/Policy";
import ReferralsProgram from "./pages/public/ReferralsProgram";
import ReferralProgram from "./pages/dashboard/referral-program/ReferralProgram";
// import { selectAuth } from "./state/slices/auth";

function App() {
	// const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	// const { refresh_token } = useAppSelector(selectAuth);

	const showDepositModal = useAppSelector(selectShowDepositModal);

	globalRouter.navigate = navigate;
	globalRouter.location = location;

	// useEffect(() => {
	// 	if (refresh_token) {
	// 		dispatch(refreshTokenAPI());
	// 		const clearTimer = callFunctionInInterval(
	// 			() => dispatch(refreshTokenAPI()),
	// 			23 * 60 * 60000
	// 		);
	// 		return () => {
	// 			clearTimer();
	// 		};
	// 	}
	// }, []);

	return (
    // <ErrorBoundary FallbackComponent={ErrorFallback}>
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about-us" element={<AboutPage />} />
        <Route path="/how-to-play" element={<HowToPlayPage />} />
        <Route path="/faq" element={<FaqPage />} />
        {/* <Route path="/referral-program" element={<ReferralsProgram />} /> */}
        <Route path="/demo" element={<DemoPage />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/leaderboard/month" element={<PublicMonthLeaderboard />} />
        <Route
          path="/leaderboard/season"
          element={<PublicSeasonLeaderboard />}
        />
        <Route path="/leaderboard" element={<PublicWeekLeaderboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify" element={<VerifyEmail />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/new-password" element={<NewPassword />} />
        <Route path="/dashboard/account/password" element={<EditPassword />} />
        <Route path="/dashboard/account" element={<EditProfile />} />
        <Route path="/dashboard/wallet" element={<Wallet />} />
        <Route path="/dashboard/fixtures" element={<AllFixtures />} />
        <Route
          path="/dashboard/leaderboard/month"
          element={<MonthLeaderboard />}
        />
        <Route
          path="/dashboard/leaderboard/season"
          element={<SeasonLeaderboard />}
        />
        <Route path="/dashboard/leaderboard" element={<WeekLeaderboard />} />
        <Route
          path="/dashboard/private-league/standing/:leagueId"
          element={<PrivateLeagueWeekLeaderboard />}
        />
        <Route
          path="/dashboard/private-league/edit/:leagueId"
          element={<EditPrivateLeague />}
        />
        <Route
          path="/dashboard/private-league/create"
          element={<CreatePrivateLeague />}
        />
        <Route
          path="/dashboard/private-league/join"
          element={<JoinPrivateLeague />}
        />
        <Route
          path="/dashboard/private-league"
          element={<AllPrivateLeagues />}
        />
        <Route
          path="/dashboard/user-prediction-history/:username"
          element={<UserPredictionHistory />}
        />
        <Route
          path="/dashboard/prediction-history"
          element={<PredictionHistory />}
        />
        {/* <Route
          path="/dashboard/referral-program"
          element={<ReferralProgram />}
        /> */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      {showDepositModal ? <DepositFundModal /> : null}
    </>
    // </ErrorBoundary>
  );
}

export default App;
