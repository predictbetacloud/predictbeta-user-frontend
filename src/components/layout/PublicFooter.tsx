import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaXTwitter } from "react-icons/fa6";

import logo from "../../assets/logo/logo-light.svg";
// import goBetLogo from "../../assets/images/Gobet-Featured-Image 1.png";

const routes: { title: string; route: string }[] = [
	{ title: "About us", route: "/about-us" },
	{ title: "Contact us", route: "/contact" },
	{ title: "Terms & conditions", route: "/terms" },
];

const PublicFooter = () => {
	return (
		<footer className="w-full">
			{/* top */}
			<div className="md:flex items-center justify-between py-6 px-6 md:px-40 bg-white">
				<img src={logo} alt="Predictbeta" className="md:mr-8" />
				<nav className="flex items-center gap-x-8 mt-4 md:mt-0">
					{routes.map((route) => (
						<Link
							key={route.title}
							to={route.route}
							className="text-sm md:text-base text-[#153243] hover:text-[#eb1536]"
						>
							{route.title}
						</Link>
					))}
				</nav>
				{/* <a
					href="https://gobet247.com"
					className="text-[#153243] hover:text-[#eb1536]"
				>
					<img src={goBetLogo} alt="Gobet247" className="" />
				</a> */}
			</div>

			{/* copyright */}
			<div className="md:flex items-center justify-between bg-[#051B30] py-3 px-6 md:px-40">
				<p className="text-white font-light text-xs md:text-sm">
					© {new Date().getFullYear()} - Predictbeta. All rights reserved |
					(18+) Predict Responsibly
				</p>
				<div className="flex items-center gap-x-4 mt-4 md:mt-0">
					<a
						href="#"
						className="flex items-center justify-center w-8 h-8 rounded-full bg-[#EB1536]"
					>
						<FaXTwitter color="#FFF" />
					</a>
					<a
						href="#"
						className="flex items-center justify-center w-8 h-8 rounded-full bg-[#EB1536]"
					>
						<FaFacebookF color="#FFF" />
					</a>
					<a
						href="#"
						className="flex items-center justify-center w-8 h-8 rounded-full bg-[#EB1536]"
					>
						<FaInstagram color="#FFF" />
					</a>
				</div>
			</div>
		</footer>
	);
};

export default PublicFooter;
