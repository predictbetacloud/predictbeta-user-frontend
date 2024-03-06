import { Link } from "react-router-dom";
import logo from "../../assets/logo/logo-dark.svg";
import Button from "../Buttons";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { selectAuth, selectIsFetchingUserInfo } from "../../state/slices/auth";
import { formatCurrency } from "../../utils/utils";
import { TextSkeleton } from "../loaders/TextSkeleton";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { BsFillClockFill } from "react-icons/bs";
import { colors } from "../../utils/colors";
import { selectAllWeeks } from "../../state/slices/fixtures";
import CustomCountDown from "../Countdown";
import { setShowDepositModal } from "../../state/slices/wallet";

type Props = { title?: string };

const Header = ({ title }: Props) => {
	const [hideBalance, setHideBalance] = useState(false);
	const dispatch = useAppDispatch();

	const toggleHideBalance = () => setHideBalance(!hideBalance);
	const { user, wallet } = useAppSelector(selectAuth);
	const allWeeks = useAppSelector(selectAllWeeks);

	const isFetchingUserInfo = useAppSelector(selectIsFetchingUserInfo);

	return (
		<header className="bg-[#051B30] py-3 px-8 sticky top-0 flex items-center justify-between z-[100]">
			<div className="md:px-10 flex-shrink-0">
				<img src={logo} alt="Predictbeta" className="" />
			</div>

			<div className="flex items-center justify-between flex-grow md:pl-32">
				{/* Title */}
				{!title ? (
					<p></p>
				) : (
					<h1 className="text-white font-semibold text-lg">{title}</h1>
				)}
				<div className="flex items-center">
					{/* Countdown */}
					{allWeeks?.[0]?.deadline ? (
						<div className="hidden md:flex items-start justify-between md:-ml-52">
							<div className="flex items-center mr-20">
								<BsFillClockFill color={colors.blue900} fill={colors.white} />
								<p className="ml-4 text-white">
									Time left until the end of this round
								</p>
							</div>
							<CustomCountDown deadline={allWeeks?.[0]?.deadline} />
						</div>
					) : null}

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

					<Button
						title="Deposit"
						className=""
						onClick={() => dispatch(setShowDepositModal(true))}
					/>
				</div>
			</div>
		</header>
	);
};

export default Header;
