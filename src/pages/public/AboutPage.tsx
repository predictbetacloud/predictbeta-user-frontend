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
						We might be the easiest sports prediction and entertainment platform in the world but you’ll soon find out that nothing is truly easy.
					</p>
				</section>
				<section className="px-4 md:px-40 mb-20">
					<div className="md:w-1/2">
						<h3 className="text-[#212934] font-semibold text-2xl mb-3">
							Who we are and what we do
						</h3>
						<p className="text-[#212934] text-justify ">
							PredictBeta is a one of a kind social sport prediction, entertainment platform owned by PredictBeta Nigeria Limited. We offer a peer to peer, staked sport prediction service to our users/subscribers to gain monetary rewards and some bragging rights through our three game offers: 
						</p>
						{/* <ul> */}
						<div  className="text-[#212934] pb-6 pt-2 ">
							<li>Peer Vs Peer</li>
							<li>Private League </li>
							<li>General League</li>
						</div>
						{/* </ul> */}
						<p className="text-[#212934] mt-3 text-justify">
							Our drive is to lead the growth of positive social sports communities using simple sport predictions to create entertainment and fuel passion. We also provide marketing services for SMEs across Nigeria and Africa.
						</p>

						<h3 className="text-[#212934] font-semibold text-2xl mb-3 mt-8">
							Goal
						</h3>
						<p className="text-[#212934]">
							As a brand, we believe in the spirit of sharing.
						</p>
						<p className="text-[#212934] mt-3 text-justify">
							Just like we have in sport leagues, we’re using this platform to
							promote sports prediction in Nigeria to know who tops the league
							at the end of the season. But we also want to help you make some
							money while doing that.
						</p>

						<p className="text-[#212934] mt-3 text-justify">
							Wins on Predictbeta are weekly and payout happens immediately after every match-week on the platform. Our league offerings go from general league to private league for all our subscribers/users.

						</p>

						<p className="text-[#212934] mt-3">
							Do you have what it takes to win every week or make the top 10 at the end of the season for a share of our grand prize?
						</p>
						<p className="text-[#212934] mt-3 font-bold">
							Let's see you try!
						</p>
						{/* <p className="text-[#212934] mt-3 text-[#EC1636]">PredictBeta is powered by Hallabet.</p> */}
					</div>
				</section>
			</main>
			<PublicFooter />
		</>
	);
};

export default AboutPage;
