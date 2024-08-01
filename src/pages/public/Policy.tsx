import PublicFooter from "../../components/layout/PublicFooter";
import PublicHeader from "../../components/layout/PublicHeader";

const Policy = () => {
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
						predicting on PredictBeta.
					</p>
				</section>
				{/* List */}
				<ul className="px-4 md:w-3/5 list-disc mx-auto space-y-4 mb-40">
					<li>
						<p className="text-[#212934]">
							You must be at least 18yrs old or more to predict on PredictBeta.
						</p>
					</li>
					<li>
						<p className="text-[#212934]">
							Wins on PredictBeta happen on a draw basis and this can be weekly
							and/mid-weekly for league and cup matches respectively
						</p>
					</li>
					<li>
						<p className="text-[#212934]">
							Predictions on PredictBeta are FREE and easy to play with
							predictors deciding between three options:
							<span className="font-bold"> Win - Draw - Lose.</span>
						</p>
					</li>
					<li>
						<p className="text-[#212934]">
							This platform reserves the{" "}
							<span className="font-bold">
								exclusive right to choose sport events{" "}
							</span>
							eligible for prediction on each match-week and these can come from
							football or any other type of sport.
						</p>
					</li>
					<li>
						<p className="text-[#212934]">
							Predictions close <span className="font-bold">an hour </span>{" "}
							before the first event/match in the draw begins. Any prediction
							made
							<span className="font-bold"> less than an hour</span> to the first
							sport event of that match-week will be considered ineligible/void.
						</p>
					</li>
					<li>
						<p className="text-[#212934]">
							<span className="font-bold">Who wins?: </span> Top three winners
							with the most points are rewarded with a total monetary prize of
							N100,000 for every published draw.
						</p>
					</li>
					<li>
						<p className="text-[#212934]">
							This money is shared between the top three in this manner: 1st
							(N50,000), 2nd (N30,000) & 3rd (N20,000).
						</p>
					</li>
					<li>
						<p className="text-[#212934]">
							Payment of winnings are made{" "}
							<span className="font-bold">immediately</span> after the end of a
							draw and can be withdrawn from winners’ Hallabet account once they
							click on withdraw funds.
						</p>
					</li>
					<li>
						<p className="text-[#212934]">
							When withdraw funds is initiated, the user is redirected to the
							Hallabet website where they already have an existing account as a
							result of registering on PredictBeta.
						</p>
					</li>
					<li>
						<p className="text-[#212934]">
							The user logs- in with their exact PredictBeta details and then
							goes on to withdraw their wins.
						</p>
					</li>
				</ul>
			</main>
			<PublicFooter />
		</>
	);
};

export default Policy;
