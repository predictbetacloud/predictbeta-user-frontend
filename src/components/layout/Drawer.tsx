import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { IoCloseCircleSharp, IoMenuOutline } from "react-icons/io5";

const Drawer = () => {
	const [showDrawer, setShowDrawer] = useState(false);

	const toggleDrawer = () => setShowDrawer(!showDrawer);

	return (
		<main className="lg:hidden">
			<button
				type="button"
				className="bg-[#D82E2E] p-1  rounded"
				onClick={toggleDrawer}
			>
				<IoMenuOutline color="#fff" size={24} />
			</button>

			{/* {showDrawer ? ( */}
				<Transition
					as={Fragment}
					show={showDrawer}
					enter="transform transition duration-[400ms]"
					enterFrom="opacity-0 rotate-[-120deg] scale-50"
					enterTo="opacity-100 rotate-0 scale-100"
					leave="transform duration-200 transition ease-in-out"
					leaveFrom="opacity-100 rotate-0 scale-100 "
					leaveTo="opacity-0 scale-95 "
				>
					<Dialog as="div" className="relative z-[1000]" onClose={toggleDrawer}>
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
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95 -right-[100%]"
								enterTo="opacity-100 scale-100 right-0"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100 right-0"
								leaveTo="opacity-0 scale-95 -right-[100%]"
							>
								<Dialog.Panel className="w-[80vw] h-screen transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all">
									<div className="flex items-center justify-end pb-4 mb-6 border-b border-b-[#E1E7EC]">
										<button onClick={toggleDrawer} type="button">
											<IoCloseCircleSharp size={24} color="#8C97A7" />
										</button>
									</div>

									{/* Routes */}
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</Dialog>
				</Transition>
			{/* ) : null} */}
		</main>
	);
};

export default Drawer;
