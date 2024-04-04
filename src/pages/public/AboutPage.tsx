import PublicFooter from "../../components/layout/PublicFooter";
import PublicHeader from "../../components/layout/PublicHeader";

const AboutPage = () => {
	return (
		<>
			<PublicHeader />
			<main>
				{/* Banner */}
				<section className="py-20 px-4 bg-[#051B30] text-center mb-16">
					<h1 className="text-white font-semibold text-4xl mb-4">About Us</h1>
					<p className="text-[#E1E7EC] max-w-[600px] mx-auto">
						If you are reading this, then you already know what we know; we make
						you a little richer with your correct sport predictions!
					</p>
				</section>
				<section className="px-4 md:px-40 mb-20">
					<div className="md:w-1/2">
						<h3 className="text-[#212934] font-semibold text-2xl mb-3">
							What we do
						</h3>
						<p className="text-[#212934]">
							Predict9ja is a one of a kind sport prediction entertainment
							platform owned by TwinLove Media Limited. We offer a monetary
							rewarding sports prediction league on a fixture/weekly basis on
							our platform to help you make the best of your prediction
							super-powers.
						</p>
						<p className="text-[#212934] mt-3">
							Wins on Predict9ja are weekly and payout happens immediately after
							every match-week on the platform. Our league offerings go from
							general league to private league for our subscribers.
						</p>

						<h3 className="text-[#212934] font-semibold text-2xl mb-3 mt-8">
							Goal
						</h3>
						<p className="text-[#212934]">
							Our primary goal at Predict9ja is enjoyment, sport banter and
							getting you a little richer.
						</p>
						<p className="text-[#212934] mt-3">
							Just like we have in sport leagues, we’re using this platform to
							promote sports prediction in Nigeria to know who tops the league
							at the end of the season. But we also want to help you make some
							money while doing that.
						</p>

						{/* <h3 className="text-[#212934] font-semibold text-2xl mb-3 mt-8">
							Partners
						</h3>
						<p className="text-[#212934]">
							Predict9ja owned by TwinLove Media Limited operate with the
							following partners:
						</p> */}
					</div>
				</section>
			</main>
			<PublicFooter />
		</>
	);
};

export default AboutPage;
