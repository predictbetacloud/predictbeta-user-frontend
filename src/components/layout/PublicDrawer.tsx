import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { IoCloseCircleSharp, IoMenuOutline } from "react-icons/io5";

import logo from "../../assets/logo/new-logo.svg";

import { useAppDispatch, useAppSelector } from "../../state/hooks";
import {
  selectPublicDrawerState,
  togglePublicDrawer,
} from "../../state/slices/drawer";
import { Link } from "react-router-dom";
import Button from "../Buttons";
import { logOutAPI } from "../../api/authAPI";
import { PiBellRingingFill } from "react-icons/pi";
import { Popover } from "@headlessui/react";
import { colors } from "../../utils/colors";

const routes: { title: string; route: string }[] = [
  { title: "Home", route: "/" },
  { title: "How to Play", route: "/how-to-play" },
  { title: "Leaderboard", route: "/leaderboard" },
  { title: "FAQs", route: "/faq" },
  { title: "Referrals", route: "/referral-program" },
];

const PublicDrawer = () => {
  const dispatch = useAppDispatch();
  const user = JSON.parse(
    localStorage.getItem("predictbeta-user_session") || "{}"
  );

  const showDrawer = useAppSelector(selectPublicDrawerState);
  const isActive = (route: string) => window.location.pathname === route;

  return (
    <main className="flex items-center gap-3 lg:hidden">
      <Popover className="relative">
        <Popover.Button className="relative bg-transparent hover:bg-gray-300 transition-all ease-in-out duration-200 border border-[#051B30] rounded-full p-[5px]">
          <PiBellRingingFill className="h-6 w-6" fill="#051B30" />
          <div className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center">
            <span className="absolute inline-flex h-full w-full rounded-full bg-[#EB1536] opacity-75 animate-ping" />
            <span
              className="absolute inline-flex h-full w-full rounded-full bg-[#EB1536] opacity-75 animate-ping"
              style={{ animationDelay: "500ms" }}
            />
            <span
              className="absolute inline-flex h-full w-full rounded-full bg-[#EB1536] opacity-75 animate-ping"
              style={{ animationDelay: "1000ms" }}
            />
            <span className="relative inline-flex h-[10px] w-[10px] items-center justify-center rounded-full bg-[#EB1536] text-xs text-primary-foreground" />
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
                    <Link to="/">
                      <img src={logo} alt="Predictbeta" className="h-12" />
                    </Link>
                    <button
                      onClick={() => dispatch(togglePublicDrawer())}
                      type="button"
                    >
                      <IoCloseCircleSharp size={24} color="#8C97A7" />
                    </button>
                  </div>

                  {/* Routes */}
                  <div className="flex flex-col gap-4 flex-grow justify-between">
                    {/* Links */}
                    {routes.map((route) => (
                      <div key={route.title}>
                        <Link
                          key={route.title}
                          to={route.route}
                          className={` hover:text-[#eb1536] ${
                            isActive(route.route)
                              ? " text-[#eb1536] font-semibold"
                              : " text-[#153243]"
                          } `}
                        >
                          {route.title}
                        </Link>
                      </div>
                    ))}
                  </div>

                  {user && Object.keys(user).length > 0 ? (
                    <div className="mt-3 flex flex-col itemscenter w-full">
                      <Link to="/dashboard/fixtures">
                        <Button
                          title="My Dashboard"
                          className="whitespace-nowrap w-full"
                        />
                      </Link>
                      <div className="flex items-center gap-x-5">
                        <Button.Blue
                          title="Log out"
                          className="mt-3 w-full"
                          onClick={() => dispatch(logOutAPI())}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center w-full">
                      <Link
                        to="/login"
                        className="block w-full"
                        onClick={() => dispatch(togglePublicDrawer())}
                      >
                        <Button.OutlineWhite className="w-full" title="Login" />
                      </Link>
                      <Link
                        to="/register"
                        className="block w-full mt-4"
                        onClick={() => dispatch(togglePublicDrawer())}
                      >
                        <Button.Blue
                          className="w-full"
                          title="Create account"
                        />
                      </Link>
                    </div>
                  )}
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
