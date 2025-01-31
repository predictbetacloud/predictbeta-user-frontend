import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaXTwitter } from "react-icons/fa6";
import { FaTiktok } from "react-icons/fa";

import logo from "../../assets/logo/logo-light.svg";
//import hallaBetLogo from "../../assets/logo/hallabet.png"
// import goBetLogo from "../../assets/images/Gobet-Featured-Image 1.png";

const routes: { title: string; route: string }[] = [
  { title: "About", route: "/about-us" },
  { title: "Contact", route: "/contact" },
  { title: "Terms & conditions", route: "/terms" },
  { title: "Privacy & Policy", route: "/policy" },
];

const PublicFooter = () => {
  return (
    <footer className="w-full relative bottom-0">
      {/* top */}
      <div className="md:flex items-center justify-between py-6 px-6 md:px-4 lg:px-30 xl:px-40 bg-white">
        <div className="flex gap-8 items-center">
          <Link to="/" className="border-r-2">
            <img src={logo} alt="Predictbeta" className="md:mr-8" />
          </Link>
          {/* <a href="https://www.hallabet.com" target="_blank"><img src={hallaBetLogo} width={120} alt="HallaBet" className="md:mr-8 rounded-md" /></a> */}
        </div>
        <nav className="flex gap-4 mt-4 md:mt-0 flex-col text-left sm:flex-row ">
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
      <div className="md:flex items-center justify-between bg-[#051B30] py-3 px-6  md:px-4 lg:px-30 xl:px-40">
        <p className="text-white font-light text-xs md:text-sm">
          © {new Date().getFullYear()} - Predictbeta. All rights reserved |
          (18+) Predict Responsibly
        </p>
       
        <div className="flex items-center gap-x-4 mt-4 md:mt-0">
          <a
            href="https://x.com/predictbeta?s=11&t=zQ2VH2EhRxbRQ3E-8zuNIA"
            target="_blank"
            className="flex items-center justify-center w-8 h-8 rounded-full bg-[#EB1536]"
          >
            <FaXTwitter color="#FFF" />
          </a>
          <a
            href="https://www.facebook.com/share/gDU5uy7r2FJwko4g/?mibextid=LQQJ4d"
            target="_blank"
            className="flex items-center justify-center w-8 h-8 rounded-full bg-[#EB1536]"
          >
            <FaFacebookF color="#FFF" />
          </a>
          <a
            href="https://www.instagram.com/predictbeta"
            target="_blank"
            className="flex items-center justify-center w-8 h-8 rounded-full bg-[#EB1536]"
          >
            <FaInstagram color="#FFF" />
          </a>
          <a
            href="https://www.tiktok.com/@predictbeta?_t=8oAS8UTdYNy&_r=1"
            target="_blank"
            className="flex items-center justify-center w-8 h-8 rounded-full bg-[#EB1536]"
          >
            <FaTiktok color="#FFF" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default PublicFooter;
