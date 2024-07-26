import { useState } from "react";
import logo from "../../assets/logo/logo-light.svg";
import { Link } from "react-router-dom";
import { MdOutlineMailLock } from "react-icons/md";
import { FaPhoneVolume } from "react-icons/fa6";
import EmailLogin from "./EmailLogin";
import PhoneLogin from "./PhoneLogin";

const Login = () => {
	const [type, setType] = useState('email')

	return (
		<main className="w-screen h-screen px-4 md:px-0 bg-[#FFFFFF] flex flex-col items-center justify-center">
			<div className=" p-4 flex flex-col gap-2 justify-center items-center border-2 rounded-lg">
				<Link to="/">
					<img src={logo} alt="Predictbeta" />
				</Link>
				<h3 className="text-xl text-[#222222] font-medium mb-8 text-center">
						Welcome back, log in to manage your account
				</h3>
				<div className="flex justify-around">
					<button onClick={()=>setType('email')} className={`flex flex-col items-center justify-center py-2 px-6  rounded-l-md  ${type==='email' ? 'bg-[#EB1536] text-white' : 'border-2 border-[#EB1536]'}`}>
						<MdOutlineMailLock size={20}/>
						<span>Email</span>
					</button>
					<button onClick={()=>setType('phone')} className={`flex flex-col items-center justify-center py-2 px-6  rounded-r-md  ${type==='phone' ? 'bg-[#EB1536] text-white' : 'border-2 border-[#EB1536]'}`}>
						<FaPhoneVolume size={20}/>
						<span>Phone</span>
					</button>
				</div>

				{/* Dynamic SignUp type */}
				{type === 'email' && <EmailLogin/>}
				{type === 'phone' && <PhoneLogin/>}
				
			</div>
		</main>
	);
};

export default Login;
