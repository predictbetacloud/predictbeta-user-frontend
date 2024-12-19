import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/logo/logo-dark.svg";
import { useEffect, useState } from "react";
import queryString from "query-string";

import { Popover } from "@headlessui/react";
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
import { PiBellRingingFill } from "react-icons/pi";

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
    <header className="bg-[#051B30] sticky top-0 w-full z-[100]">
      <div className="max-w-[82rem] mx-auto px-4 py-3">
        <div className="flex items-center gap-5 justify-between h-[46px] md:h-16  ">
          <div className="w-[24%]">
            <div className="flex items-center">
              <div className="md:px10 flex-shrink-0">
                <Link to="/">
                  <img src={logo} alt="Predictbeta" className="" />
                </Link>
              </div>

              {title ? (
                <h1 className="lg:hidden text-white font-semibold text-sm ml-4">
                  {title}
                </h1>
              ) : null}
            </div>
          </div>

          <div className="hidden w-full lg:flex items-center justify-between gap-4">
            {/* Title */}
            {!title ? (
              <>
                {/* Countdown */}
                {selectedWeek?.deadline ? (
                  <div className="hidden lg:flex items-center justify-between gap-6 ">
                    <div className="flex items-center xl:mr-20">
                      <BsFillClockFill
                        color={colors.blue900}
                        fill={colors.white}
                      />
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
            <div className="flex items-center gap-3">
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
                  className="absolute mt-2 right-0 rounded-md bg-blue-100 w-[300px] text-sm/6 transition-all duration-1000 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0"
                  style={{ border: `1px solid ${colors.blue900}` }}
                >
                  <div className="p-2 rounded-md flex flex-col gap-2 ">
                    <h3 className="font-semibold text-[16px] text-[#051B30]">
                      Become a PredictBeta Affiliate
                    </h3>
                    <p className="text-black/50 text-sm/4 ">
                      Refer friends to predict on PredictBeta and earn 20 points
                      for each game round you play.
                    </p>
                    
                    <Link
                      to="/affiliates-program"
                      className="font-medium text-[#051B30] hover:text-[#EB1536] hover:underline w-fit "
                    >
                      Read more
                    </Link>
                  </div>
                </Popover.Panel>
              </Popover>

              {/* Balance */}
              <div className="rounded-md p-2 px-3 flex items-center bg-[#F5F8FA]">
                <p className="mr-2 text-[#212934]">Balance:</p>
                <p className="mr-1 text-[#8895A7] text-xs font-semibold">NGN</p>
                {isFetchingUserInfo ? (
                  <TextSkeleton width="100px" />
                ) : (
                  <>
                    {hideBalance ? (
                      <p className="mr-1 text-[#2A2E33] font-semibold">****</p>
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
        </div>
      </div>
    </header>
  );
};

export default Header;
