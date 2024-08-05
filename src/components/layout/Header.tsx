import { useLocation } from "react-router-dom";
import logo from "../../assets/logo/logo-dark.svg";
import { useEffect, useState } from "react";
import queryString from "query-string";

import { useAppSelector } from "../../state/hooks";
import { selectAuth, selectIsFetchingUserInfo } from "../../state/slices/auth";
import { formatCurrency } from "../../utils/utils";
import { TextSkeleton } from "../loaders/TextSkeleton";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { BsFillClockFill } from "react-icons/bs";
import { colors } from "../../utils/colors";
import { selectAllWeeks } from "../../state/slices/fixtures";
import CustomCountDown from "../Countdown";
import { IWeek } from "../../types/types";
import { isBefore } from "date-fns";
import Drawer from "./Drawer";

type Props = { title?: string };

const Header = ({ title }: Props) => {
	const l = useLocation();

	const queries = queryString.parse(l.search);
	const query_week = queries?.week;

	const [selectedWeek, setSelectedWeek] = useState<IWeek | null>(null);

	const [hideBalance, setHideBalance] = useState(false);

	const toggleHideBalance = () => setHideBalance(!hideBalance);
	const { wallet } = useAppSelector(selectAuth);
	const allWeeks = useAppSelector(selectAllWeeks);

	const isFetchingUserInfo = useAppSelector(selectIsFetchingUserInfo);

	// Make latest week the active week
	useEffect(() => {
		if (query_week) {
			const activeWeek = allWeeks.find(
				(_week) => _week.number === Number(query_week)
			);
			if (activeWeek) {
				setSelectedWeek(activeWeek);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [allWeeks, query_week]);

	return (
		<header className="bg-[#051B30] py-3 px-4 lg:px-8 sticky top-0 flex items-center justify-between z-[100]">
			<div className="flex items-center">
				<div className="md:px-10 flex-shrink-0">
					<img src={logo} alt="Predictbeta" className="" />
				</div>

				{title ? (
					<h1 className="lg:hidden text-white font-semibold text-sm ml-4">
						{title}
					</h1>
				) : null}
			</div>

			<div className=" hidden lg:flex items-center justify-between flex-grow md:pl-32">
				{/* Title */}
				{!title ? (
					<>
						{/* Countdown */}
						{selectedWeek?.deadline ? (
							<div className="hidden lg:flex items-center justify-between">
								<div className="flex items-center xl:mr-20">
									<BsFillClockFill color={colors.blue900} fill={colors.white} />
									{!isBefore(
										new Date(),
										new Date(String(selectedWeek?.deadline))
									) ? (
										<p className="ml-4 text-white">
											Prediction deadline has passed
										</p>
									) : (
										<p className="ml-4 text-white">
											Time left until the end of this round
										</p>
									)}
								</div>
								<CustomCountDown deadline={selectedWeek?.deadline} />
							</div>
						) : (
							<p></p>
						)}
					</>
				) : (
					<h1 className="text-white font-semibold text-lg">{title}</h1>
				)}
				<div className="flex items-center justify-between">
					{/* Balance */}
					<div className="rounded-md p-2 px-3 flex items-center mr-4 bg-[#F5F8FA]">
						<p className="mr-2 text-[#212934]">Balance:</p>
						<p className="mr-1 text-[#8895A7] text-xs font-semibold">NGN</p>
						{isFetchingUserInfo ? (
							<TextSkeleton width="100px" />
						) : (
							<>
								{hideBalance ? (
									<p className="mr-1 text-[#2A2E33] font-semibold">********</p>
								) : (
									<p className="mr-1 text-[#2A2E33] font-semibold">
										{formatCurrency(wallet?.balance || 0)}
									</p>
								)}
							</>
						)}
						<div className="ml-1">
							{hideBalance ? (
								<AiOutlineEye
									fill={colors.grey500}
									color={colors.grey700}
									size={18}
									onClick={toggleHideBalance}
								/>
							) : (
								<AiOutlineEyeInvisible
									fill={colors.grey500}
									color={colors.grey100}
									size={18}
									onClick={toggleHideBalance}
								/>
							)}
						</div>
					</div>

					{/* <Button
						title="Deposit"
						className=""
						onClick={() => dispatch(setShowDepositModal(true))}
					/> */}
				</div>
			</div>

			<Drawer />
		</header>
	);
};

export default Header;
