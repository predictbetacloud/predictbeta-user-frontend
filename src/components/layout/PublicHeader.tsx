import { Link } from "react-router-dom";
import logo from "../../assets/logo/logo-light.svg";
import Button from "../Buttons";
import PublicDrawer from "./PublicDrawer";
import { useAppDispatch } from "../../state/hooks";
import { logOutAPI } from "../../api/authAPI";
import { PiBellRingingFill } from "react-icons/pi";

import { Popover } from "@headlessui/react";
import { colors } from "../../utils/colors";

const routes: { title: string; route: string }[] = [
  { title: "Home", route: "/" },
  { title: "How to Play", route: "/how-to-play" },
  { title: "Leaderboard", route: "/leaderboard" },
  { title: "HallaBet", route: "https://www.hallabet.com/prematch" },
  { title: "FAQs", route: "/faq" },
  { title: "Referrals", route: "/referral-program" },
];

const PublicHeader = () => {
  const user = JSON.parse(
    localStorage.getItem("predictbeta-user_session") || "{}"
  );

  const isActive = (route: string) => window.location.pathname === route;

  const dispatch = useAppDispatch();

  return (
    <header className="flex items-center justify-between w-full px-4 md:px-10 xl:px-40 py-2 bg-white shadow-sm z-10 sticky top-0">
      <div className="flex items-center">
        <Link to="/">
          <img src={logo} alt="Predictbeta" className="md:mr-4" />
        </Link>
        <nav className="hidden lg:flex items-center gap-x-4">
          {routes.map((route) => (
            <div key={route.title}>
              {route.title === "HallaBet" ? (
                <a
                  key={route.title}
                  href={route.route}
                  target="_blank"
                  className="font-extrabold px-2 text-lg"
                >
                  <span className="text-[#3E4095]">Halla</span>
                  <span className="text-[#eb1536]">Bet</span>
                </a>
              ) : (
                <Link
                  key={route.title}
                  to={route.route}
                  className={`hover:text-[#eb1536] ${
                    route.title === "Referrals" || isActive(route.route)
                      ? "text-[#eb1536] font-bold"
                      : "text-[#153243] font-normal"
                  }`}
                >
                  {route.title}
                </Link>
              )}
            </div>
          ))}

          {/* <a
						href="https://gobet247.com"
						className="text-[#153243] hover:text-[#eb1536]"
					>
						Gobet247
					</a> */}
        </nav>
      </div>

      <div className="hidden lg:flex items-center gap-x-5 ">
        <Popover className="relative">
          <Popover.Button className="relative bg-transparent hover:bg-gray-300 transition-all ease-in-out duration-200 border border-[#051B30] rounded-full p-[5px] ">
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
            className="absolute mt-2 right-0 rounded-md bg-blue-100 w-[300px] text-sm/6 transition-all duration-1000 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0"
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
        {user && Object.keys(user).length > 0 ? (
          <>
            <Link to="/dashboard/fixtures">
              <Button title="My Dashboard" className="whitespace-nowrap " />
            </Link>
            <Button.Blue
              title="Log out"
              className="w-full"
              onClick={() => dispatch(logOutAPI())}
            />
          </>
        ) : (
          <>
            <Link to="/login">
              <Button.OutlineWhite title="Login" />
            </Link>
            <Link to="/register">
              <Button.Blue title="Create account" />
            </Link>
          </>
        )}
      </div>

      <PublicDrawer />
    </header>
  );
};

export default PublicHeader;
