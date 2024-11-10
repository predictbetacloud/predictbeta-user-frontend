import { ReactNode, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { selectAuth } from "../../state/slices/auth";
import { getUserInfoAPI } from "../../api/authAPI";
import { globalRouter } from "../../utils/utils";

type Props = { children: ReactNode; title?: string };

const DashboardLayout = ({ children, title }: Props) => {
	const { user } = useAppSelector(selectAuth);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (user?.id) {
			console.log("user id exists");
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

	return (
    <section>
      <Header title={title} />
      <main className="flex max-w-[84rem] mx-auto">
        <Sidebar />
        <section className="w-full lg:w-[80%]">{children}</section>
      </main>
    </section>
  );
};

export default DashboardLayout;
