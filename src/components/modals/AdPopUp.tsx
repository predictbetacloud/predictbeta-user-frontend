import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import styled from "styled-components";

import pattern from "../../assets/images/pop-up pattern.png";
import legImg from "../../assets/images/pop-up leg-img.png";
import matchImg from "../../assets/images/pop-up match-img.png";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { selectShowAdPopUp, setShowAdPopUp } from "../../state/slices/auth";
import Button from "../Buttons";
import { Link } from "react-router-dom";

const Container = styled.div`
	background-image: linear-gradient(
			to bottom,
			rgba(0, 0, 0, 0.7),
			rgba(0, 0, 0, 0.7)
		),
		url("${pattern}");
`;

const AdPopUp = () => {
	const dispatch = useAppDispatch();
	const isOpen = useAppSelector(selectShowAdPopUp);

	const closeModal = () => {
		dispatch(setShowAdPopUp(false));
	};

	return (
		<Transition appear show={isOpen} as={Fragment}>
			<Dialog as="div" className="relative z-10" onClose={closeModal}>
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

				<div className="fixed inset-0 overflow-y-auto">
					<div className="flex min-h-full items-center justify-center p-4 text-center">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95"
						>
							<Dialog.Panel
								as={Container}
								className="w-full max-w-[80vw] transform overflow-hidden rounded-lg  p-6 md:px-16 md:py-24 text-left align-middle shadow-xl transition-all relative"
							>
								{/* Content */}
								<div>
									<h4 className="text-white text-2xl font-medium">
										Welcome to Predictbeta
									</h4>
									<div className="flex items-center justify-between mt-8">
										<div className="md:w-3/5">
											<h2 className="text-3xl lg:text-6xl text-white font-bold">
												We’re the fastest growing FREE sports prediction community!
											</h2>
										</div>
										{/* Match img */}
										<img src={matchImg} alt="match" className="hidden lg:block" />
									</div>
									<Link to="/login">
										<Button title="Join predictbeta" className="mt-8" />
									</Link>
								</div>
								{/* leg img */}
								<img
									src={legImg}
									alt="foot"
									className="hidden md:block absolute h-full right-0 top-0"
								/>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
};

export default AdPopUp;
