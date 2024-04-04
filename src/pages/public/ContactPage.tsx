import { IoLogoWhatsapp, IoMdMail } from "react-icons/io";

import PublicFooter from "../../components/layout/PublicFooter";
import PublicHeader from "../../components/layout/PublicHeader";
import { IoLogoFacebook } from "react-icons/io5";
import { FaXTwitter } from "react-icons/fa6";
import { Instagram } from "../../assets/icons";
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
						<a href="mailto:Support@myPredictBeta.com">
							<p className="text-[#0D7FE9] font-semibold">
								Support@myPredictBeta.com
							</p>
						</a>
					</div>

					<div className="grid md:grid-cols-2 gap-4">
						<div className="rounded-lg border-[#DDEFFF] border p-6 flex items-center justify-center">
							<IoLogoWhatsapp size={24} color="#27AE60" className="mr-2.5" />
							<p className="mr-2.5">Whatsapp:</p>
							<a href="tel:+2349154379148">
								<p className="font-semibold">+234 915 4379 148</p>
							</a>
						</div>
						<div className="rounded-lg border-[#DDEFFF] border p-6 flex items-center justify-center">
							<IoLogoFacebook size={24} color="#315CB8" className="mr-2.5" />
							<p className="mr-2.5">Facebook:</p>
							<p className="font-semibold">@PredictBeta</p>
						</div>
						<div className="rounded-lg border-[#DDEFFF] border p-6 flex items-center justify-center">
							<FaXTwitter size={24} className="mr-2.5" />
							<p className="mr-2.5">:</p>
							<p className="font-semibold">@PredictBeta</p>
						</div>
						<div className="rounded-lg border-[#DDEFFF] border p-6 flex items-center justify-center">
							<Instagram size={24} className="mr-2.5" />
							<p className="mr-2.5">Instagram:</p>
							<p className="font-semibold">@PredictBeta</p>
						</div>
					</div>
				</section>
			</main>
			<PublicFooter />
		</>
	);
};

export default ContactPage;
