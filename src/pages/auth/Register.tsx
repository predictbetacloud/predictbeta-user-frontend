import { Link } from "react-router-dom";

import logo from "../../assets/logo/logo-light.svg";

import { useState } from "react";
import { MdOutlineMailLock } from "react-icons/md";
import { FaPhoneVolume } from "react-icons/fa6";
import EmailRegistration from "./EmailRegistration";
import PhoneRegistration from "./PhoneRegistration";

const Register = () => {
	const [type, setType] = useState('email')


 
	return (
		<main className="w-screen min-h-screen px-4 md:px-0 py-20 bg-[#FFFFFF] flex flex-col items-center justify-center">
			<div className=" p-4 flex flex-col gap-2 justify-center items-center border-2 rounded-lg">
				<Link to="/"><img src={logo} alt="Predictbeta" /></Link>
				<h3 className="text-xl text-[#222222] font-medium mb-2 text-center">
						Create an account to make predictions
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
				{type === 'email' && <EmailRegistration/>}
				{type === 'phone' && <PhoneRegistration/>}
			</div>
		</main>
	);
};

export default Register;
