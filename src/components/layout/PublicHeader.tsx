import { Link } from "react-router-dom";
import logo from "../../assets/logo/logo-light.svg";
import Button from "../Buttons";
import PublicDrawer from "./PublicDrawer";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { selectAuth } from "../../state/slices/auth";
import { logOutAPI } from "../../api/authAPI";

const routes: { title: string; route: string }[] = [
  { title: "Home", route: "/" },
  { title: "How to Play", route: "/how-to-play" },
  { title: "Leaderboard", route: "/leaderboard" },
  { title: "HallaBet", route: "https://www.hallabet.com/prematch" },
  { title: "FAQs", route: "/faq" },
];

const PublicHeader = () => {
  const { user } = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();

  console.log(user)

  return (
    <header className="flex items-center justify-between w-full px-4 md:px-10 lg:px-20 xl:px-40 py-2 bg-white shadow-sm z-10 sticky top-0">
      <div className="flex items-center">
        <Link to="/">
          <img src={logo} alt="Predictbeta" className="md:mr-8" />
        </Link>
        <nav className="hidden lg:flex items-center gap-x-8">
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
                  className={`text-[#153243] hover:text-[#eb1536]`}
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
      {user && Object.keys(user).length > 0 ? (
        <div className="hidden lg:flex items-center gap-x-5">
          <Link to="/dashboard/fixtures">
            <Button title="My Dashboard" className="whitespace-nowrap " />
          </Link>
          <Button.Blue
            title="Log out"
            className="w-full"
            onClick={() => dispatch(logOutAPI())}
          />
        </div>
      ) : (
        <div className="hidden lg:flex items-center gap-x-5">
          <Link to="/login">
            <Button.OutlineWhite title="Login" />
          </Link>
          <Link to="/register">
            <Button.Blue title="Create account" />
          </Link>
        </div>
      )}

      <PublicDrawer />
    </header>
  );
};

export default PublicHeader;
