import React, { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { IoCloseCircleSharp, IoMenuOutline } from "react-icons/io5";
import queryString from "query-string";

import logo from "../../assets/logo/logo-light.svg";

import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { selectDrawerState, toggleDrawer } from "../../state/slices/drawer";
import { Link, useLocation } from "react-router-dom";
import { selectAuth, selectIsFetchingUserInfo } from "../../state/slices/auth";
import { IWeek } from "../../types/types";
import { selectAllWeeks } from "../../state/slices/fixtures";
import { TextSkeleton } from "../loaders/TextSkeleton";
import { formatCurrency } from "../../utils/utils";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { colors } from "../../utils/colors";
import Button from "../Buttons";
import { setShowDepositModal } from "../../state/slices/wallet";
import { BsFillClockFill } from "react-icons/bs";
import { isBefore } from "date-fns";
import CustomCountDown from "../Countdown";
import { routes } from "./Sidebar";
import { logOutAPI } from "../../api/authAPI";

const Drawer = () => {
	const dispatch = useAppDispatch();
	const l = useLocation();

	const queries = queryString.parse(l.search);
	const query_week = queries?.week;

	const showDrawer = useAppSelector(selectDrawerState);
	const isFetchingUserInfo = useAppSelector(selectIsFetchingUserInfo);
	const allWeeks = useAppSelector(selectAllWeeks);
	const { wallet, user } = useAppSelector(selectAuth);

	const [selectedWeek, setSelectedWeek] = useState<IWeek | null>(null);
	const [hideBalance, setHideBalance] = useState(false);

	const toggleHideBalance = () => setHideBalance(!hideBalance);

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
		<main className="lg:hidden">
			<button
				type="button"
				className="bg-[#D82E2E] p-1  rounded"
				onClick={() => dispatch(toggleDrawer())}
			>
				<IoMenuOutline color="#fff" size={24} />
			</button>

			<Transition
				as={Fragment}
				show={showDrawer}
				// enter="transform transition duration-[400ms]"
				// enterFrom="opacity-0 rotate-[-120deg] scale-50"
				// enterTo="opacity-100 rotate-0 scale-100"
				// leave="transform duration-200 transition ease-in-out"
				// leaveFrom="opacity-100 rotate-0 scale-100 "
				// leaveTo="opacity-0 scale-95 "
			>
				<Dialog
					as="div"
					className="relative z-[1000]"
					onClose={() => dispatch(toggleDrawer())}
				>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-black/50" />
					</Transition.Child>

					<div className="fixed inset-0">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300 transition transform"
							enterFrom="-translate-x-full"
							enterTo="translate-x-0"
							leave="ease-in duration-200"
							leaveFrom="translate-x-0"
							leaveTo="-translate-x-full"
						>
							<Dialog.Panel className="w-[80vw] h-screen transform overflow-hidden bg-white p-6 px-4 text-left align-middle shadow-xl transition-all flex flex-col justify-between">
								<section>
									<div className="flex items-center justify-between pb-4 mb-2">
										<img src={logo} alt="Predictbeta" className="h-12" />
										<button
											onClick={() => dispatch(toggleDrawer())}
											type="button"
										>
											<IoCloseCircleSharp size={24} color="#8C97A7" />
										</button>
									</div>

									{/* Countdown */}
									<div className="mb-4">
										{/* Countdown */}
										{selectedWeek?.deadline ? (
											<div className="">
												<div className="flex items-center">
													<BsFillClockFill
														color={colors.white}
														fill={colors.blue900}
													/>
													{!isBefore(
														new Date(),
														new Date(String(selectedWeek?.deadline))
													) ? (
														<p className="ml-4 text-[#051B30]">
															Prediction deadline has passed
														</p>
													) : (
														<>
															<p className="ml-4 text-[#051B30]">
																Time left until the end of this round
															</p>
															<CustomCountDown
																deadline={selectedWeek?.deadline}
															/>
														</>
													)}
												</div>
											</div>
										) : (
											<p></p>
										)}
										<div className="mt-2">
											{/* Balance */}
											<div className="rounded-md p-2 px-3 flex items-center bg-[#F5F8FA]">
												<p className="mr-2 text-[#212934]">Balance:</p>
												<p className="mr-1 text-[#8895A7] text-xs font-semibold">
													NGN
												</p>
												{isFetchingUserInfo ? (
													<TextSkeleton width="100px" />
												) : (
													<>
														{hideBalance ? (
															<p className="mr-1 text-[#2A2E33] font-semibold">
																********
															</p>
														) : (
															<p className="mr-1 text-[#2A2E33] font-semibold">
																{formatCurrency(wallet?.balance || 0)}
															</p>
														)}
													</>
												)}
												<div className="ml-auto">
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
										</div>
									</div>

									<hr className="my-4" />

									{/* Routes */}
									<div className="flex flex-col flex-grow justify-between">
										{/* Links */}
										<div>
											{routes.map((route, idx) => (
												<Link
													key={idx}
													to={route.path}
													onClick={() => dispatch(toggleDrawer())}
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
													<p className="text-sm">{route.title}</p>
												</Link>
											))}
										</div>
									</div>
								</section>

								<div className="p-3 pt-4 border border-[#E1E7EC] rounded-xl">
									<div className="flex items-center gap-x-3">
										<div className="flex items-center justify-center rounded-md w-9 h-9 bg-[#F5F8FA] border border-[#E1E7EC]">
											<p className="uppercase text-[#051B30]">
												{user?.firstName?.[0]}
												{user?.lastName?.[0]}
											</p>
										</div>
										<div>
											<p className="text-[#212934] text-sm">
												{user?.firstName} {user?.lastName}
											</p>
											<p className="text-[#8895A7] text-xs">({user?.email})</p>
										</div>
									</div>
									<Button.Outline
										title="Log out"
										className="mt-3 w-full"
										onClick={() => {
											dispatch(toggleDrawer());
											dispatch(logOutAPI());
										}}
									/>
								</div>
								{/* <Button.Outline
									title="Log out"
									className="mt-3 w-full"
									onClick={() => dispatch(logOutAPI())}
								/> */}
								{/* <Button
									title="Deposit"
									className="w-full"
									onClick={() => dispatch(setShowDepositModal(true))}
								/> */}
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</Dialog>
			</Transition>
		</main>
	);
};

export default Drawer;
