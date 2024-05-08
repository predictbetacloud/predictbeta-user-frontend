import React from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { selectAuth } from "../../state/slices/auth";
import { P } from "../Texts";
import Button from "../Buttons";
import {
	DepositIcon,
	HistoryIcon,
	HomeIcon,
	LeaderboardIcon,
	PrivateLeagueIcon,
	SettingsIcon,
} from "../../assets/icons";
import { logOutAPI } from "../../api/authAPI";

const Style = styled.aside`
	max-width: 300px;
	height: calc(100vh - 80px);

	box-shadow: 2px 4px 8px 0px #0000000a;
`;

export const routes: {
	icon: any;
	path: string;
	title: string;
}[] = [
	{
		path: "/dashboard/fixtures",
		title: "Home - Games",
		icon: <HomeIcon />,
	},
	{
		path: "/dashboard/wallet",
		title: "Wallet",
		icon: <DepositIcon />,
	},
	// {
	// 	path: "/dashboard/withdraw",
	// 	title: "Withdraw Funds",
	// 	icon: <WithdrawIcon />,
	// },
	{
		path: "/dashboard/account",
		title: "Account Settings",
		icon: <SettingsIcon />,
	},
	{
		path: "/dashboard/leaderboard",
		title: "Leaderboard",
		icon: <LeaderboardIcon />,
	},
	{
		path: "/dashboard/prediction-history",
		title: "Prediction history",
		icon: <HistoryIcon />,
	},
	// {
	// 	path: "/dashboard/private-league",
	// 	title: "Private leagues",
	// 	icon: <PrivateLeagueIcon />,
	// },
];

const Sidebar = () => {
	const location = useLocation();
	const { user } = useAppSelector(selectAuth);

	const dispatch = useAppDispatch();

	return (
		<Style className="flex-shrink-0 bg-[#FFF] w-1/5 top-[80px] sticky pt-2.5 pb-10 hidden lg:flex flex-col">
			<div className="flex flex-col flex-grow justify-between px-3">
				{/* Links */}
				<div>
					{routes.map((route, idx) => (
						<Link
							key={idx}
							to={route.path}
							className={`rounded-md p-3 flex items-center mb-3 gap-3 ${
								location.pathname.includes(route.path)
									? "bg-[#051B30] text-white font-normal"
									: "bg-[#F5F8FA] text-[#051B30] font-light"
							}`}
						>
							{route.icon
								? React.cloneElement(route.icon, {
										color: location.pathname.includes(route.path)
											? "#fff"
											: "#051B30",
								  })
								: null}
							<P className="text-sm">{route.title}</P>
						</Link>
					))}
				</div>

				{/* User Card */}
				<div className="p-3 pt-4 border border-[#E1E7EC] rounded-xl">
					<div className="flex items-center gap-x-3">
						<div className="flex items-center justify-center rounded-md w-9 h-9 bg-[#F5F8FA] border border-[#E1E7EC]">
							<P className="uppercase text-[#051B30]">
								{user?.firstName?.[0]}
								{user?.lastName?.[0]}
							</P>
						</div>
						<div>
							<P className="text-[#212934] text-sm">
								{user?.firstName} {user?.lastName}
							</P>
							<P className="text-[#8895A7] text-xs">({user?.email})</P>
						</div>
					</div>
					<Button.Outline
						title="Log out"
						className="mt-3 w-full"
						onClick={() => dispatch(logOutAPI())}
					/>
				</div>
			</div>
		</Style>
	);
};

export default Sidebar;
