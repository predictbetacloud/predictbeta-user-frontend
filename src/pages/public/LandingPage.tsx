import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../state/hooks";
import {
	selectAllSeasons,
	selectAllWeeks,
	selectIsFetchingAllSeasons,
	selectIsFetchingAllWeeks,
	selectIsFetchingMatches,
	selectMatches,
} from "../../state/slices/fixtures";

import PublicHeader from "../../components/layout/PublicHeader";
import { colors } from "../../utils/colors";
import {
	getAllMatchesAPI,
	getAllSeasonsAPI,
	getAllWeeksAPI,
} from "../../api/fixturesAPI";
import PageLoading from "../../components/loaders/PageLoading";
import { MatchCard } from "../../components/fixtures/MatchCard";
import PublicFooter from "../../components/layout/PublicFooter";
import { selectShowAdPopUp, setShowAdPopUp } from "../../state/slices/auth";
import AdPopUp from "../../components/modals/AdPopUp";
import HeroSection from "../../components/Hero";
import { useNavigate } from "react-router";
import LeftSideAdvert from "../../components/LeftSideAdvert";
import RightSideAdvert from "../../components/RightSideAdvert";

const LandingPage = () => {
	const dispatch = useAppDispatch();
	let navigate = useNavigate();

	const isFetchingSeasons = useAppSelector(selectIsFetchingAllSeasons);
	const isFetchingWeeks = useAppSelector(selectIsFetchingAllWeeks);
	const isFetchingMatches = useAppSelector(selectIsFetchingMatches);
	const showAdPopUp = useAppSelector(selectShowAdPopUp);

	const allWeeks = useAppSelector(selectAllWeeks);
	const allMatches = useAppSelector(selectMatches);
	const seasons = useAppSelector(selectAllSeasons);

	// Get all Season
	useEffect(() => {
		dispatch(getAllSeasonsAPI({}));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// Make latest week the active week
	useEffect(() => {
		if (allWeeks?.[0]?.id) {
			// if week is in query use that week
			if (seasons?.[0]?.id && allWeeks?.[0]?.id) {
				dispatch(
					getAllMatchesAPI({
						seasonId: seasons?.[0]?.id,
						weekId: allWeeks?.[0]?.id,
					})
				);
			}
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [allWeeks]);

	// Make latest season the active season
	useEffect(() => {
		if (seasons?.[0]?.id) {
			dispatch(getAllWeeksAPI({ seasonId: seasons?.[0]?.id }));
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [seasons]);

	useEffect(() => {
    
      dispatch(setShowAdPopUp(true));
    
    return () => {
      dispatch(setShowAdPopUp(false));
    };
  }, []);

	return (
    <main className="bg-white">
      <PublicHeader />
      {/* Hero Image */}
      <HeroSection />

      {/* Carousel section */}
      {/* <TopWinners/> */}

      {/* Weekly Predictions Teaser */}
      <section
        className=" pt-4 lg:py-8 mb-10 lg:mb-0"
        style={{
          background: colors.peach,
        }}
      >
        <h2
          className="text-center mb-10 lg:w-2/5 lg:mx-auto text-4xl font-semibold"
          color={colors.grey700}
        >
          Are you up to the task this week?
        </h2>
        <div className="p-4 lg:p-8 rounded-xl">
          <div className="flex flex-col lg:flex-row justify-between gap-6 bg-white">
            <div className="w-full lg:w-[20%]">
              {/* <LeftSideAdvert /> */}
            </div>
            <div className="flex-1">
              <p
                color={colors.grey700}
                className="py-2 inline-block mb-6 text-[#2A2E33]"
                style={{
                  borderBottom: `3px solid ${colors.accent}`,
                }}
              >
                This Week’s Fixtures
              </p>
              {isFetchingMatches || isFetchingWeeks || isFetchingSeasons ? (
                <PageLoading />
              ) : (
                <>
                  {allMatches?.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
                      {allMatches?.map((match, idx) => (
                        <div
                          key={idx}
                          className={
                            idx === allMatches.length - 1 &&
                            allMatches.length % 2 !== 0
                              ? "md:col-span-2 md:w-[380px] lg:w-[400px] md:mx-auto"
                              : ""
                          }
                        >
                          <MatchCard
                            key={match.id}
                            home={match.homeTeam}
                            away={match.awayTeam}
                            head2head={match.head2head}
                            awayForm={match.awayForm}
                            homeForm={match.homeForm}
                            id={match.id}
                            matchTime={match.fixtureDateTime}
                            prediction={match.prediction}
                            onChange={() => {
                              navigate("/dashboard/fixtures");
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center py-20 lg:py-32 flex-col">
                      <h3 className="font-bold text-3xl mb-2">
                        There no matches for this week
                      </h3>
                      <p className="">
                        Matches will show here once they are published.
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
            <div className="w-full lg:w-[20%]">
              {/* <RightSideAdvert /> */}
            </div>
          </div>
          {/* {isFetchingCurrentDraw ? (
						<BallLoader className="mx-auto" />
					) : (
						<>
							{currentDraws?.[0]?.matches?.length > 0 ? (
								<>
									<div className="grid lg:grid-cols-2 gap-8">
										{currentDraws?.[0]?.matches?.map((match, idx) =>
											idx % 2 ? null : (
												<div key={idx}>
													<MatchCard
														key={match.id}
														home={match.home}
														away={match.away}
														id={match.id}
														prediction={match.prediction}
														onChange={() => {
															history.push("?modal=login");
														}}
													/>
												</div>
											)
										)}
									</div>
									<div
										className="mt-8 mx-auto"
										style={{
											width: "fit-content",
										}}
									>
										<Link to="?modal=login">
											<P
												color={colors.accent}
												className="flex items-center justify-center"
											>
												See more games{" "}
												<div className="h-5 w-5 rounded-full flex items-center justify-center bg-accent ml-4">
													<Icon.ChevronRight color={colors.white} />
												</div>
											</P>
										</Link>
									</div>
								</>
							) : (
								<H3 className="mb-5" color={colors.grey700}>
									There are no games for this week. Check back soon!
								</H3>
							)}
						</>
					)} */}
        </div>
      </section>

      {/* FOOTER */}
      <PublicFooter />

      {showAdPopUp ? <AdPopUp /> : null}
    </main>
  );
};

export default LandingPage;
