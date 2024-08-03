import { IoLogoWhatsapp, IoMdMail } from "react-icons/io";

import PublicFooter from "../../components/layout/PublicFooter";
import PublicHeader from "../../components/layout/PublicHeader";
import { IoLogoFacebook } from "react-icons/io5";
import { FaXTwitter } from "react-icons/fa6";
import { Instagram } from "../../assets/icons";
import { FaTiktok } from "react-icons/fa";
import { GiRotaryPhone } from "react-icons/gi";
import { FaTelegramPlane } from "react-icons/fa";
const ContactPage = () => {
	return (
		<>
			<PublicHeader />
			<main>
				{/* Banner */}
				<section className="py-20 px-4 bg-[#051B30] text-center mb-16">
					<h1 className="text-white font-semibold text-4xl mb-4">Contact Us</h1>
					<p className="text-[#E1E7EC] max-w-[600px] mx-auto">
						You can contact Predictbeta across any of the following channels.
					</p>
				</section>
				<section className="px-4 md:px-40 mb-20 flex flex-col justify-center items-center">
					<div className="rounded-lg border-[#DDEFFF] border p-6 flex items-center justify-center mb-4">
						<IoMdMail size={24} color="#003859" className="mr-2.5" />
						<p className="mr-2.5">Email:</p>
						<a href="mailto:help@predictbeta.com">
							<p className="text-[#0D7FE9] font-semibold">
								help@predictbeta.com
							</p>
						</a>
					</div>

					<div className="grid md:grid-cols-2 gap-4">
						<div className="rounded-lg border-[#DDEFFF] border p-6 flex items-center justify-center">
							<GiRotaryPhone size={24} color="#031332" className="mr-2.5" />
							<p className="mr-2.5">Call Us:</p>
							<a href="tel:+2348168448979">
								<p className="font-semibold">+2348168448979</p>
							</a>
						</div>
						<div className="rounded-lg border-[#DDEFFF] border p-6 flex items-center justify-center">
							<IoLogoWhatsapp size={24} color="#27AE60" className="mr-2.5" />
							<p className="mr-2.5">Whatsapp:</p>
							<a href="tel:07082481037">
								<p className="font-semibold">07082481037</p>
							</a>
						</div>
						<div className="rounded-lg border-[#DDEFFF] border p-6 flex items-center justify-center">
							<FaTelegramPlane size={24} color="#031332" className="mr-2.5" />
							<p className="mr-2.5">Telegram</p>
							<a href="tel:+2348168448979">
								<p className="font-semibold">+2348168448979</p>
							</a>
						</div>
						<a href="https://www.facebook.com/share/gDU5uy7r2FJwko4g/?mibextid=LQQJ4d" className="rounded-lg border-[#DDEFFF] border p-6 flex items-center justify-center" target="_blank">
							<IoLogoFacebook size={24} color="#315CB8" className="mr-2.5" />
							<p className="mr-2.5">Facebook:</p>
							<p className="font-semibold">@PredictBeta</p>
						</a>
						<a href="https://x.com/predictbeta?s=11&t=zQ2VH2EhRxbRQ3E-8zuNIA" className="rounded-lg border-[#DDEFFF] border p-6 flex items-center justify-center" target="_blank">
							<FaXTwitter size={24} className="mr-2.5" />
							<p className="mr-2.5">Twitter:</p>
							<p className="font-semibold">@PredictBeta</p>
						</a>
						<a href="https://www.instagram.com/predictbeta" className="rounded-lg border-[#DDEFFF] border p-6 flex items-center justify-center" target="_blank">
							<Instagram size={24} className="mr-2.5" />
							<p className="mr-2.5">Instagram:</p>
							<p className="font-semibold">@PredictBeta</p>
						</a>
						<a href="https://www.tiktok.com/@predictbeta?_t=8oAS8UTdYNy&_r=1" className="rounded-lg border-[#DDEFFF] border p-6 flex items-center justify-center" target="_blank">
							<FaTiktok size={24} className="mr-2.5" />
							<p className="mr-2.5">TikTok:</p>
							<p className="font-semibold">@PredictBeta</p>
						</a>
					</div>
				</section>
			</main>
			<PublicFooter />
		</>
	);
};

export default ContactPage;
