import { ReactNode, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { selectAuth } from "../../state/slices/auth";
import { getUserInfoAPI, refreshTokenAPI } from "../../api/authAPI";
import { callFunctionInInterval } from "../../utils/helpers";
import { globalRouter } from "../../utils/utils";

type Props = { children: ReactNode; title?: string };

const DashboardLayout = ({ children, title }: Props) => {
	const { refresh_token, user } = useAppSelector(selectAuth);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (user?.id) {
			dispatch(getUserInfoAPI({ id: user?.id }));
		} else {
			if (globalRouter.navigate) {
				console.log(
					"path",
					globalRouter.location,
					globalRouter.location?.state
				);
				globalRouter.navigate("/login", {
					state: {
						from: `${globalRouter.location?.pathname}${globalRouter.location?.search}`,
					},
				});
			}
		}
	}, [user?.id]);

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

	return (
		<section>
			<Header title={title} />
			<main className="flex w-screen items-start">
				<Sidebar />
				<section className="flex-grow">{children}</section>
			</main>
		</section>
	);
};

export default DashboardLayout;
