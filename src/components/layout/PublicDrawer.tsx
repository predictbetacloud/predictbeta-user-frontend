import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { IoCloseCircleSharp, IoMenuOutline } from "react-icons/io5";

import logo from "../../assets/logo/logo-light.svg";

import { useAppDispatch, useAppSelector } from "../../state/hooks";
import {
	selectPublicDrawerState,
	togglePublicDrawer,
} from "../../state/slices/drawer";
import { Link } from "react-router-dom";
import Button from "../Buttons";

const routes: { title: string; route: string }[] = [
	{ title: "Home", route: "/" },
	{ title: "How to Play", route: "/how-to-play" },
	{ title: "Leaderboard", route: "/leaderboard" },
	{ title: "FAQs", route: "/faq" },
];

const PublicDrawer = () => {
	const dispatch = useAppDispatch();

	const showDrawer = useAppSelector(selectPublicDrawerState);

	return (
		<main className="lg:hidden">
			<button
				type="button"
				className="bg-[#D82E2E] p-1  rounded"
				onClick={() => dispatch(togglePublicDrawer())}
			>
				<IoMenuOutline color="#fff" size={24} />
			</button>

			<Transition as={Fragment} show={showDrawer}>
				<Dialog
					as="div"
					className="relative z-[1000]"
					onClose={() => dispatch(togglePublicDrawer())}
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
											onClick={() => dispatch(togglePublicDrawer())}
											type="button"
										>
											<IoCloseCircleSharp size={24} color="#8C97A7" />
										</button>
									</div>

									{/* Routes */}
									<div className="flex flex-col flex-grow justify-between">
										{/* Links */}
										{routes.map((route) => (
											<Link
												key={route.title}
												to={route.route}
												className="text-[#153243] hover:text-[#eb1536] block my-2"
												onClick={() => dispatch(togglePublicDrawer())}
											>
												{route.title}
											</Link>
										))}
									</div>

									<Link
										to="/login"
										className="block mt-4"
										onClick={() => dispatch(togglePublicDrawer())}
									>
										<Button.OutlineWhite className="w-full" title="Login" />
									</Link>
									<Link
										to="/register"
										className="block mt-4"
										onClick={() => dispatch(togglePublicDrawer())}
									>
										<Button.Blue className="w-full" title="Create account" />
									</Link>
								</section>
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

export default PublicDrawer;
