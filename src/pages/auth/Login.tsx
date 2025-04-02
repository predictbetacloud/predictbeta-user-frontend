import { useState } from "react";
import logo from "../../assets/logo/newLogoFull.svg";
// import logo from "../../assets/logo/new-logo.svg";
import { Link } from "react-router-dom";

import EmailLogin from "./EmailLogin";
import PhoneLogin from "./PhoneLogin";
import { EmailIcon, PhoneIcon } from "../../assets/icons";

const Login = () => {
  const [type, setType] = useState("email");

  return (
    <main className="w-screen h-screen px-4 md:px-0 bg-[#FFFFFF] flex flex-col items-center justify-center">
      <div className=" p-4 flex flex-col gap-2 justify-center items-center border-2 rounded-lg">
        <Link to="/">
          <img src={logo} alt="Predictbeta" className="w-[120px] h-auto " />
        </Link>

        <h3 className="text-base py-3 text-[#222222] font-medium text-center">
          Welcome back, log in to manage <br /> your account
        </h3>
        <div className="flex justify-around">
          <button
            onClick={() => setType("email")}
            className={`flex gap-2 items-center justify-center py-2 px-6  rounded-l-[19px] ${
              type === "email"
                ? "bg-[var(--primary-gold)]"
                : "bg-[#E3E3E3]"
            }`}
          >
            <EmailIcon />
            <span>Email</span>
          </button>
          <button
            onClick={() => setType("phone")}
            className={`flex gap-2 items-center justify-center py-2 px-6 text-black rounded-r-[19px]  ${
              type === "phone"
                ? "bg-[var(--primary-gold)]"
                : "bg-[#E3E3E3]"
            }`}
          >
            <PhoneIcon />
            <span>Phone</span>
          </button>
        </div>

        {/* Dynamic SignUp type */}
        {type === "email" && <EmailLogin />}
        {type === "phone" && <PhoneLogin />}
      </div>
    </main>
  );
};

export default Login;
