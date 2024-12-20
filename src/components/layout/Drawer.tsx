import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { IoCloseCircleSharp, IoMenuOutline } from "react-icons/io5";

import logo from "../../assets/logo/logo-light.svg";

import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { selectDrawerState, toggleDrawer } from "../../state/slices/drawer";
import { Link } from "react-router-dom";
import { selectAuth, selectIsFetchingUserInfo } from "../../state/slices/auth";
import { TextSkeleton } from "../loaders/TextSkeleton";
import { formatCurrency } from "../../utils/utils";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { colors } from "../../utils/colors";
import Button from "../Buttons";
import { routes } from "./Sidebar";
import { logOutAPI } from "../../api/authAPI";
import { Popover } from "@headlessui/react";
import { PiBellRingingFill } from "react-icons/pi";

const Drawer = () => {
  const dispatch = useAppDispatch();

  const showDrawer = useAppSelector(selectDrawerState);
  const isFetchingUserInfo = useAppSelector(selectIsFetchingUserInfo);
  const { wallet, user } = useAppSelector(selectAuth);

  const [hideBalance, setHideBalance] = useState(false);

  const toggleHideBalance = () => setHideBalance(!hideBalance);

  return (
    <main className="flex items-center gap-2 lg:hidden">
      <Popover className="relative">
        <Popover.Button className="relative bg-transparent hover:bg-gray-700 transition-all ease-in-out duration-200 border border-[#F5F8FA] rounded-full p-[5px] ">
          <PiBellRingingFill className="h-6 w-6" fill="#F5F8FA" />
          <div className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center">
            <span className="absolute inline-flex h-full w-full rounded-full bg-[#EB1536] opacity-75 animate-ping" />
            <span
              className="absolute inline-flex h-full w-full rounded-full bg-[#EB1536] opacity-75 animate-ping "
              style={{ animationDelay: "500ms" }}
            />
            <span
              className="absolute inline-flex h-full w-full rounded-full bg-[#EB1536] opacity-75 animate-ping "
              style={{ animationDelay: "1000ms" }}
            />
            <span className="relative inline-flex h-2 w-2 items-center justify-center rounded-full bg-[#EB1536] text-xs text-primary-foreground" />
          </div>
        </Popover.Button>
        <Popover.Panel
          as="div"
          className="absolute mt-2 right-0 rounded-md bg-blue-100 w-[250px] text-sm/6 transition-all duration-1000 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0"
          style={{ border: `1px solid ${colors.blue900}` }}
        >
          <div className="p-2 rounded-md flex flex-col gap-2 ">
            <h3 className="font-semibold text-[16px] text-[#051B30]">
              Become a PredictBeta Affiliate
            </h3>
            <p className="text-black/50 text-sm/4 ">
              Refer friends to predict on PredictBeta and earn 20 points for
              each round you play.
            </p>

            <Link
              to="/referral-program"
              className="font-medium text-[#051B30] hover:text-[#EB1536] hover:underline w-fit "
            >
              Read more
            </Link>
          </div>
        </Popover.Panel>
      </Popover>
      <button
        type="button"
        className="bg-[#D82E2E] p-1  rounded"
        onClick={() => dispatch(toggleDrawer())}
      >
        <IoMenuOutline color="#fff" size={24} />
      </button>

      <Transition as={Fragment} show={showDrawer}>
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
              <Dialog.Panel className="w-[80vw] h-screen transform overflow-hidden bg-white p-6 pb-10 px-4 text-left align-middle shadow-xl transition-all flex flex-col justify-between">
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

                  <div className="mt-2 mb-4">
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
