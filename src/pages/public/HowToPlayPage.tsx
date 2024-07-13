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
						<ul className="px-4 list-disc space-y-2">
							<li>
								<p className="text-[#212934]">
									To play the PredictBeta league, make sure you already have an
									account with us. Sign up!
								</p>
							</li>
							<li>
								<p className="text-[#212934]">
									After signing up, log in to your page and navigate to “Home -
									Games”.
								</p>
							</li>
							<li>
								<p className="text-[#212934]">
									Find the matches up for prediction for that week and make your
									predictions for either -{" "}
									<span className="font-bold">Home win, Draw or Away win.</span>
									.
								</p>
							</li>
							<li>
								<p className="text-[#212934]">
									You earn 10 points for each correct Win - Draw - Lose
									prediction you make.
								</p>
							</li>
							<li>
								<p className="text-[#212934]">
									Select your goal scorers in deciders in the order of point
									grading.
								</p>
							</li>
							<li>
								<p className="text-[#212934]">
									Select the minute the earliest goal in the round will be
									scored.
								</p>
							</li>
							<li>
								<p className="text-[#212934]">
									You’re now all set for success on PredictBeta!
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
						<ul className="px-4 list-disc space-y-2">
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
									<span className="font-bold">More Likely to Score</span>. Here
									you have 3-points. You will be selecting a player from the
									list of matches who you feel will score to earn you that
									3-point.
								</p>
							</li>
							<li>
								<p className="text-[#212934]">
									Third option -{" "}
									<span className="font-bold">Likely to Score</span>. Here you
									have 1-point. This is the third option of the decider but
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

						{/* Ultinate Decider */}
						<h5 className="text-[#212934] font-semibold text-xl mb-2 mt-6">
							Ultimate decider - Time of earliest goal in the draw
						</h5>
						<h6 className="text-[#212934] mt-1">
							IMPORTANT! Did you get the exact time the earliest goal was scored
							in the draw?
						</h6>
						<h6 className="text-[#212934] mb-2 mt-1">
							This means you get the whole 10 points added to what you already
							have.
						</h6>

						<div>
							<h6 className="text-[#212934] mb-2 mt-4">
								How the point share work here:
							</h6>
							<ul className="px-4 list-disc space-y-2">
								<li>
									<p className="text-[#212934]">
										If we have two or more predictors still tied after their
										predictions and goal scorers points are added, then we
										decide it here with the time the earliest goal in the draw
										was scored.
									</p>
								</li>
								<li>
									<p className="text-[#212934]">
										To know this, we use subtraction to determine the minutes
										between the time a predictor submitted and the exact time
										the earliest goal was scored.
									</p>
								</li>
								<li>
									<p className="text-[#212934]">
										Predictors then get points based on falling into any of the
										time difference categories.
									</p>
								</li>
							</ul>
						</div>

						<div>
							<h6 className="text-[#212934] mb-2 mt-4">
								Point categories based on the minute(s) between a predictor’s
								submission and when the actual earliest goal went in:
							</h6>
							<ul className="px-4 list-disc space-y-1">
								<li>
									<p className="text-[#212934]">
										If a predictor gets the exact time of the earliest goal in
										the draw = 10pts
									</p>
								</li>
								<li>
									<p className="text-[#212934]">
										If a predictor is between 1 - 5 minutes to the earliest
										goal = 9pts
									</p>
								</li>
								<li>
									<p className="text-[#212934]">
										If a predictor is between 6 - 10 minutes to the earliest
										goal = 8pts
									</p>
								</li>
								<li>
									<p className="text-[#212934]">
										If a predictor is between 11 -15 minutes to the earliest
										goal = 7pts
									</p>
								</li>
								<li>
									<p className="text-[#212934]">
										If a predictor is between 16 - 20 minutes to the earliest
										goal = 6pts
									</p>
								</li>
								<li>
									<p className="text-[#212934]">
										If a predictor is between 21 - 25 minutes to the earliest
										goal = 5pts
									</p>
								</li>
								<li>
									<p className="text-[#212934]">
										If a predictor is between 26 - 30 minutes to the earliest
										goal = 4pts
									</p>
								</li>
								<li>
									<p className="text-[#212934]">
										If a predictor is between 31 - 35 minutes to the earliest
										goal = 3pts
									</p>
								</li>
								<li>
									<p className="text-[#212934]">
										If a predictor is between 36 - 40 minutes to the earliest
										goal = 2pts
									</p>
								</li>
								<li>
									<p className="text-[#212934]">
										If a predictor is between 41 - 45 minutes to the earliest
										goal = 1pt
									</p>
								</li>
								<li>
									<p className="text-[#212934]">
										If a predictor is between 46 - 90 minutes to the earliest
										goal = 0pt
									</p>
								</li>
							</ul>
							<p className="text-[#212934] font-semibold mt-2">
								NOTE: The farther you are to the exact time the earliest goal
								was scored, the less points you get.
							</p>
						</div>

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
