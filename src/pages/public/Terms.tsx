import PublicFooter from "../../components/layout/PublicFooter";
import PublicHeader from "../../components/layout/PublicHeader";

const Terms = () => {
	return (
		<>
			<PublicHeader />
			<main>
				{/* Banner */}
				<section className="py-20 px-4 bg-[#051B30] text-center mb-16">
					<h1 className="text-white font-semibold text-4xl mb-4">
						Terms and Conditions
					</h1>
					<p className="text-[#E1E7EC] max-w-[600px] mx-auto">
						The following are the terms and conditions to consider before
						predicting on Predict9ja and these applies to both the general and
						private league:
					</p>
				</section>
				{/* List */}
				<ul className="px-4 md:w-3/5 list-disc mx-auto space-y-4 mb-40">
					<li>
						<p className="text-[#212934]">
							Wins on Predict9ja are <span className="font-bold">90%</span> of
							all the monies predicted with on the platform on either the
							general or private league.
						</p>
					</li>
					<li>
						<p className="text-[#212934]">
							These 90% is shared between{" "}
							<span className="font-bold">1st, 2nd and 3rd</span> on the general
							league while this setting can be adjusted for the private league
							depending on players’ choices.
						</p>
					</li>
					<li>
						<p className="text-[#212934]">
							Predict9ja keeps <span className="font-bold">10%</span> of all the
							total prediction monies both on the general or private leagues.
							These will help to maintain the platform and settle staff members
							in charge of the daily running of the platform.
						</p>
					</li>
					<li>
						<p className="text-[#212934]">
							This platform reserves the exclusive{" "}
							<span className="font-bold">right to choose sport events </span>
							eligible for prediction on each match-week.
						</p>
					</li>
					<li>
						<p className="text-[#212934]">
							Predictions are closed <span className="font-bold">an hour </span>
							before the first sport event selected for prediction for that
							match-week begins.
						</p>
					</li>
					<li>
						<p className="text-[#212934]">
							Any prediction made{" "}
							<span className="font-bold">less than an hour </span> to the first
							sport event of that match-week will be considered ineligible/void
							with your prediction money returned back to your wallet.
						</p>
					</li>
					<li>
						<p className="text-[#212934]">
							The fixed amount to predict on the general league is{" "}
							<span className="font-bold">N500</span>. Not more, not less.
						</p>
					</li>
					<li>
						<p className="text-[#212934]">
							The least amount to predict with on the private league is{" "}
							<span className="font-bold">N1,000 </span>
							or more.
						</p>
					</li>
					<li>
						<p className="text-[#212934]">
							Payment of winnings are made within the{" "}
							<span className="font-bold">first five hours </span> after the end
							of each match-week.
						</p>
					</li>
				</ul>
			</main>
			<PublicFooter />
		</>
	);
};

export default Terms;
