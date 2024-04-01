import { Link } from "react-router-dom";
import logo from "../../assets/logo/logo-light.svg";
import Button from "../Buttons";

const routes: { title: string; route: string }[] = [
	{ title: "Home", route: "/" },
	{ title: "How to Play", route: "/how-to-play" },
	{ title: "Leaderboard", route: "/leaderboard" },
	{ title: "FAQs", route: "/faq" },
];

const PublicHeader = () => {
	return (
		<header className="flex items-center justify-between w-full md:px-40 py-2 bg-white shadow-sm z-10 sticky top-0">
			<div className="flex items-center">
				<img src={logo} alt="Predictbeta" className="md:mr-8" />
				<nav className="flex items-center gap-x-8">
					{routes.map((route) => (
						<Link
							key={route.title}
							to={route.route}
							className="text-[#153243] hover:text-[#eb1536]"
						>
							{route.title}
						</Link>
					))}
					<a
						href="https://gobet247.com"
						className="text-[#153243] hover:text-[#eb1536]"
					>
						Gobet247
					</a>
				</nav>
			</div>
			<div className="flex items-center gap-x-5">
				<Link to="/login">
					<Button.OutlineWhite title="Login" />
				</Link>
				<Link to="/register">
					<Button.Blue title="Create account" />
				</Link>
			</div>
		</header>
	);
};

export default PublicHeader;
