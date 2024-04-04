import PublicFooter from "../../components/layout/PublicFooter";
import PublicHeader from "../../components/layout/PublicHeader";

const HowToPlayPage = () => {
	return (
		<>
			<PublicHeader />
			<main>
				{/* Banner */}
				<section className="py-20 px-4 bg-[#051B30] text-center mb-16">
					<h1 className="text-white font-semibold text-4xl mb-4">
						How to play
					</h1>
					<p className="text-[#E1E7EC] max-w-[600px] mx-auto">
						You should no longer waste your sports prediction superpowers. Build
						a winning culture with PredictBeta, play in our leagues and take
						everyone else's money!
					</p>
				</section>
				<section className="px-4 md:px-40 mb-20">
					<div className="md:w-2/3">
						{/* Getting Started */}
						<h3 className="text-[#212934] font-semibold text-4xl mb-3">
							Getting Started
						</h3>
						<ul className="px-4 list-disc space-y-4">
							<li>
								<p className="text-[#212934]">
									To play in either the general or private league, make sure you
									already have an account with us.
								</p>
							</li>
							<li>
								<p className="text-[#212934]">
									To Play the general or private league, the processes are
									pretty the same.
								</p>
							</li>
							<li>
								<p className="text-[#212934]">
									Log in to your page and scroll to the league you want to play
									in for a given match week.
								</p>
							</li>
							<li>
								<p className="text-[#212934]">
									Find the ten matches up for prediction for that week and make
									your predictions for either -{" "}
									<span className="font-bold">Home win, Draw or Away win.</span>
									.
								</p>
							</li>
							<li>
								<p className="text-[#212934]">
									You’re now close to taking everyone else’s money but… finish
									it up by picking your deciders.
								</p>
							</li>
						</ul>

						{/* Deciders */}
						<h3 className="text-[#212934] font-semibold text-4xl mb-3 mt-10">
							Deciders
						</h3>
						<h5 className="text-[#212934] font-semibold text-xl mb-2">
							First decider - Goal Scorer
						</h5>
						<ul className="px-4 list-disc space-y-4">
							<li>
								<p className="text-[#212934]">
									Deciders are a key element on predictbeta because it helps us
									get winners when there’s a tie.
								</p>
							</li>
							<li>
								<p className="text-[#212934]">
									Once you’ve predicted the matches on a draw, select your goal
									scorers in order of priority and points.
								</p>
							</li>
							<li>
								<p className="text-[#212934]">
									First option is -{" "}
									<span className="font-bold">Most Likely to Score</span>. Here,
									you have 5-points. You will be selecting your best option to
									score from the list of matches on the draw for that
									match-week. Most likely to score carries the highest points of
									the deciders with 5-points.
								</p>
							</li>
							<li>
								<p className="text-[#212934]">
									Second option -{" "}
									<span className="font-bold">Likely to Score</span>. Here you
									have 3-points. You will be selecting a player from the list of
									matches who you feel will score to earn you that 3-point.
								</p>
							</li>
							<li>
								<p className="text-[#212934]">
									Third option -{" "}
									<span className="font-bold">Less Likely to Score</span>. Here
									you have 1-point. This is the third option of the decider but
									could also be the most important option. You have to select a
									player who you trust can score to earn you that 1-point.
								</p>
							</li>
							<li>
								<p className="text-[#212934]">
									You should note that the goal scorer decider option considers
									the priority of your choice as you see with the points they
									carry.
								</p>
							</li>
							<li>
								<p className="text-[#212934]">
									At the end each match week, all the points from your
									prediction and deciders are added to determine winners for
									that week.
								</p>
							</li>
							<li>
								<p className="text-[#212934]">But that’s not all…</p>
							</li>
						</ul>

						<h5 className="text-[#212934] font-semibold text-xl mb-2 mt-6">
							Second decider - Time of prediction
						</h5>
						<ul className="px-4 list-disc space-y-4">
							<li>
								<p className="text-[#212934]">
									If we have two or more players still tied after their
									predictions and goal scorers are added, then we decide it here
									with the Time a prediction was submitted.
								</p>
							</li>
							<li>
								<p className="text-[#212934]">
									The time decider is based on the time when a prediction was
									submitted by a player for a match week.
								</p>
							</li>
							<li>
								<p className="text-[#212934]">
									The player who submitted his prediction the earliest wins the
									tie and would be placed on the leaderboard accordingly
								</p>
							</li>
						</ul>

						{/* Deciders */}
						<h3 className="text-[#212934] font-semibold text-4xl mb-3 mt-10">
							What makes up a tie?
						</h3>
						<p className="text-[#212934]">
							A tie on PredictBeta happens when two or more players score the
							same points off their prediction on a match week.
						</p>
					</div>
				</section>
			</main>
			<PublicFooter />
		</>
	);
};

export default HowToPlayPage;
