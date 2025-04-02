import { Link } from "react-router-dom";

import logo from "../../assets/logo/newLogoFull.svg";

import { useState } from "react";
import EmailRegistration from "./EmailRegistration";
import PhoneRegistration from "./PhoneRegistration";

const Register = () => {
  const [type, setType] = useState("email");

  // useEffect(() => {
  // 	window.navigator.geolocation.getCurrentPosition(pos=>{
  // 		const {latitude, longitude} = pos.coords
  // 		const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
  // 		fetch(url).then(res=>res.json()).then(data=>{
  // 			setCountry(data?.address?.country)
  // 			setState(data?.address?.state)
  // 		});
  // 	})
  // }, [])

  return (
    <main className="w-screen min-h-screen px-4 md:px-0 py-10 bg-[#FFFFFF] flex flex-col items-center justify-center">
      <div className="p-4 flex flex-col gap-2 justify-center items-center border-2 rounded-lg">
        <Link to="/">
          <img src={logo} alt="Predictbeta" />
        </Link>
        <h3 className="text-base text-[#222222] font-medium py-3 text-center">
          Create an account to make predictions
        </h3>
        
        {type === "email" && <EmailRegistration country="" state="" />}
        {type === "phone" && <PhoneRegistration country="" state="" />}
      </div>
    </main>
  );
};

export default Register;
