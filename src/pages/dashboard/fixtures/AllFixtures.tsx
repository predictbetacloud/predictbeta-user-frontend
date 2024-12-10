import { useEffect, useState } from "react";
import queryString from "query-string";
import Select from "react-select";
import { useLocation, useSearchParams } from "react-router-dom";
import { AiOutlineLoading } from "react-icons/ai";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { isBefore } from "date-fns";

import Button from "../../../components/Buttons";
import DashboardLayout from "../../../components/layout/DashboardLayout";
import { useAppDispatch, useAppSelector } from "../../../state/hooks";
import {
  selectAllSeasons,
  selectAllWeeks,
  selectIsFetchingAllSeasons,
  selectIsFetchingAllWeeks,
  selectIsFetchingMatches,
  selectIsFetchingSpecificWeekPrediction,
  selectIsSubmittingPredictions,
  selectMatches,
  selectSpecificWeekPrediction,
} from "../../../state/slices/fixtures";
import {
  getAllMatchesAPI,
  getAllSeasonsAPI,
  getAllWeeksAPI,
  getSpecificWeekPredictionAPI,
  submitPredictionAPI,
} from "../../../api/fixturesAPI";
import { VscFilter } from "react-icons/vsc";
import { Input, InputPlaceholder } from "../../../components/inputs/Input";
import CustomListBox from "../../../components/inputs/CustomListBox";
import PageLoading from "../../../components/loaders/PageLoading";
import { MatchCard } from "../../../components/fixtures/MatchCard";
import { SelectionIcon } from "../../../assets/icons";
import ErrorMessage from "../../../components/inputs/ErrorMessage";
import SelectionCard from "../../../components/fixtures/SelectionCard";
import IndicatorSeparator from "../../../components/IndicatorSeparator";
import {
  pendingStyle,
  correctStyle,
  defaultStyle,
  invalidStyle,
} from "../../../utils/selectStyle";
import { getAllPlayersAPI } from "../../../api/teamsAPI";
import {
  selectAllPlayers,
  selectIsFetchingAllPlayers,
} from "../../../state/slices/teams";
import { formatPredictionsFromObjectToArray } from "../../../utils/utils";
import CustomCountDown from "../../../components/Countdown";
import { BsFillClockFill } from "react-icons/bs";
import { IWeek } from "../../../types/types";
import { colors } from "../../../utils/colors";
import SingleAdvert from "../../../components/SingleAdvert";
import RedirectModal from "../../../components/modals/RedirectModal";

const AllFixtures = () => {
  const dispatch = useAppDispatch();
  const [, setSearchParams] = useSearchParams();
  const l = useLocation();

  const queries = queryString.parse(l.search);
  const query_week = queries?.week;
  const query_season = queries?.season;

  const isFetchingSeasons = useAppSelector(selectIsFetchingAllSeasons);
  const isFetchingWeeks = useAppSelector(selectIsFetchingAllWeeks);
  const isFetchingMatches = useAppSelector(selectIsFetchingMatches);
  const isFetchingAllPlayers = useAppSelector(selectIsFetchingAllPlayers);
  const isSubmittingPrediction = useAppSelector(selectIsSubmittingPredictions);
  const isFetchingSpecificWeekPredictions = useAppSelector(
    selectIsFetchingSpecificWeekPrediction
  );
  const specificWeekPredictions = useAppSelector(selectSpecificWeekPrediction);

  const allWeeks = useAppSelector(selectAllWeeks);
  const allMatches = useAppSelector(selectMatches);
  const seasons = useAppSelector(selectAllSeasons);
  const allPlayers = useAppSelector(selectAllPlayers);

  const [selectedWeek, setSelectedWeek] = useState<{
    id: string;
    number: string;
  } | null>(null);
  const [activeWeek, setActiveWeek] = useState<IWeek | null>(null);

  const [matches, setMatches] = useState(allMatches);
  const [isWeekDeadlineElasped, setIsWeekDeadlineElasped] = useState(true);
  const [showAdvert, setShowAdvert] = useState(false);

  const {
    register,
    setValue,
    handleSubmit,
    control,
    trigger,
    watch,
    formState: { errors },
  } = useForm();

  const mostLikelyToScore = watch("mostLikelyToScore");
  const moreLikelyToScore = watch("moreLikelyToScore");
  const likelyToScore = watch("likelyToScore");

  const selectedPlayers = [
    mostLikelyToScore?.id,
    moreLikelyToScore?.id,
    likelyToScore?.id,
  ];

  // Set matches
  if (matches?.[0]?.id !== allMatches?.[0]?.id) {
    setMatches(allMatches);
    allMatches?.forEach((match) => {
      register(String(match.id), {
        required: "You haven't predicted this match",
      });
    });
  }

  // Get all Season
  useEffect(() => {
    dispatch(getAllSeasonsAPI({}));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Make latest week the active week
  useEffect(() => {
    if (allWeeks?.[0]?.id) {
      // if week is in query use that week
      if (query_week) {
        const activeWeek = allWeeks.find(
          (_week) => _week.number === Number(query_week)
        );

        if (activeWeek) {
          setActiveWeek(activeWeek);
          setIsWeekDeadlineElasped(
            !isBefore(new Date(), new Date(String(activeWeek?.deadline)))
          );
          setSelectedWeek({
            id: String(activeWeek?.id),
            number: String(activeWeek?.number),
          });
        }
      } else {
        setSearchParams({
          season: query_season
            ? String(query_season)
            : String(seasons?.[0]?.name),
          week: String(allWeeks?.[0]?.number),
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allWeeks, query_week]);

  useEffect(() => {
    if (query_season) {
      const activeSeason = seasons.find(
        (_season) => _season.name === query_season
      );
      if (activeSeason?.id && selectedWeek?.id) {
        dispatch(
          getAllMatchesAPI({
            seasonId: activeSeason?.id,
            weekId: selectedWeek?.id,
          })
        );
      }
      if (selectedWeek?.id) {
        dispatch(
          getSpecificWeekPredictionAPI({
            weekId: selectedWeek?.id,
          })
        );
        dispatch(
          getAllPlayersAPI({
            weekId: selectedWeek?.id,
          })
        );
      }
    } else if (seasons?.[0]?.id && selectedWeek?.id) {
      dispatch(
        getAllMatchesAPI({
          seasonId: seasons?.[0]?.id,
          weekId: selectedWeek?.id,
        })
      );
      dispatch(
        getSpecificWeekPredictionAPI({
          weekId: selectedWeek?.id,
        })
      );
      dispatch(
        getAllPlayersAPI({
          weekId: selectedWeek?.id,
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedWeek]);

  // Make latest season the active season
  useEffect(() => {
    if (query_season) {
      const activeSeason = seasons.find(
        (_season) => _season.name === query_season
      );

      if (activeSeason?.id) {
        dispatch(getAllWeeksAPI({ seasonId: activeSeason?.id }));
      }
    } else {
      if (seasons?.[0]?.id) {
        dispatch(getAllWeeksAPI({ seasonId: seasons?.[0]?.id }));
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seasons, query_season]);

  // Update Selection
  const updateSelection = (matchId: number, prediction: any) => {
    // Update form value for match
    setValue(String(matchId), prediction);
    trigger(String(matchId));

    const old_matches_array = [...matches];

    const match_index = matches.findIndex((_match) => matchId === _match.id);
    const matchToSelect = matches[match_index];
    const new_match = { ...matchToSelect, prediction: prediction };
    old_matches_array.splice(match_index, 1, new_match);
    setMatches(old_matches_array);
  };

  const onPredict = ({
    mostLikelyToScore,
    moreLikelyToScore,
    likelyToScore,
    timeOfFirstGoal,
    ..._predictions
  }: FieldValues) => {
    const predictions = formatPredictionsFromObjectToArray(_predictions);
    const activeSeason = seasons.find(
      (_season) => _season.name === query_season
    );

    dispatch(
      submitPredictionAPI({
        seasonId: activeSeason?.id,
        weekId: Number(selectedWeek?.id),
        mostLikelyToScore: { playerId: mostLikelyToScore?.id },
        moreLikelyToScore: { playerId: moreLikelyToScore?.id },
        likelyToScore: { playerId: likelyToScore?.id },
        timeOfFirstGoal: Number(timeOfFirstGoal),
        predictions,
      })
    ).then(() => {
      setShowAdvert(true);
    });
  };

  return (
    <DashboardLayout>
      <section className="predictbeta-header bg-white w-full px-4 lg:px-6 py-3 flex items-center justify-between">
        {/* season select */}
        <div className="w-full flex items-center gap-4 justify-between sm:justify-start">
          {isFetchingSeasons || !seasons ? (
            <InputPlaceholder>
              <AiOutlineLoading
                className="animate-spin"
                color="#5D65F6"
                size={16}
              />
            </InputPlaceholder>
          ) : (
            <CustomListBox
              options={seasons?.map((season) => ({
                name: season.name,
                value: String(season.name),
              }))}
              onChange={(value: string): void => {
                setSearchParams({
                  season: String(value),
                  week: "",
                });
              }}
              defaultOption={String(query_season)}
              title={"Season"}
              icon={<VscFilter />}
            />
          )}

          {/* week select */}
          {isFetchingWeeks || !allWeeks ? (
            <InputPlaceholder>
              <AiOutlineLoading
                className="animate-spin"
                color="#5D65F6"
                size={16}
              />
            </InputPlaceholder>
          ) : (
            <CustomListBox
              options={allWeeks?.map((week) => ({
                name: `Week ${week.number}`,
                value: String(week.number),
              }))}
              onChange={(value: string): void => {
                setSearchParams({
                  season: String(query_season),
                  week: String(value),
                });
              }}
              defaultOption={selectedWeek?.number}
              title={"Week"}
              icon={<VscFilter />}
            />
          )}
        </div>
      </section>

      <div className="lg:hidden bg-[#051B30] p-4">
        {/* Countdown */}
        {activeWeek?.deadline ? (
          <div className="">
            <div className="lg:flex items-center">
              <BsFillClockFill
                className="hidden lg:block"
                color={colors.blue900}
                fill={colors.white}
              />
              {!isBefore(new Date(), new Date(String(activeWeek?.deadline))) ? (
                <p className="lg:ml-4 text-[#fff]">
                  Prediction deadline has passed
                </p>
              ) : (
                <>
                  <div className="flex lg:block gap-x-2 items-center justify-center">
                    <BsFillClockFill
                      className="lg:hidden"
                      color={colors.blue900}
                      fill={colors.white}
                    />
                    <p className="lg:ml-4 text-[#fff]">
                      Time left until the end of this round
                    </p>
                  </div>
                  <div className="flex justify-center">
                    <CustomCountDown deadline={activeWeek?.deadline} />
                  </div>
                </>
              )}
            </div>
          </div>
        ) : (
          <p></p>
        )}
      </div>

      {/* Matches */}
      {isFetchingMatches ||
      isFetchingWeeks ||
      isFetchingSeasons ||
      isFetchingAllPlayers ||
      isFetchingSpecificWeekPredictions ? (
        <PageLoading />
      ) : (
        <>
          {Array.isArray(specificWeekPredictions?.predictions?.fixtures) &&
          specificWeekPredictions?.predictions?.fixtures?.length > 0 ? (
            <>
              <section className="py-5 lg:py-10 px-4 lg:px-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="bg-white h-fit p-3 md:p-5 border rounded-lg col-span-1 lg:col-span-2">
                  <div className="grid md:grid-cols-2 gap-6">
                    {matches?.map((match, idx) => (
                      <div key={idx}>
                        <MatchCard
                          key={match.id}
                          home={match.homeTeam}
                          away={match.awayTeam}
                          id={match.id}
                          matchTime={match.fixtureDateTime}
                          head2head={match.head2head}
                          awayForm={match.awayForm}
                          homeForm={match.homeForm}
                          prediction={
                            specificWeekPredictions?.predictions?.fixtures?.find(
                              (_match) => _match.fixture.id === match.id
                            )?.result
                          }
                          result={
                            specificWeekPredictions?.results?.fixtures?.find(
                              (_match) => _match.fixture.id === match.id
                            )?.result
                          }
                          inactive
                          onChange={updateSelection}
                          invalid={!!errors?.[match?.id]}
                        />
                      </div>
                    ))}
                  </div>
                  <hr className="my-8" />
                  <h3 className="text-[#000] font-medium text-lg text-center">
                    Deciders
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6 py-6">
                    {/* Most likely To Score to score? */}
                    <div>
                      <label
                        htmlFor="mostLikelyToScore"
                        className="mb-2 flex items-center gap-2"
                      >
                        <p className="text-[#222222] text-sm">
                          Most likely to score?
                        </p>
                        <div className="py-1 px-2 bg-gray-100 rounded-md">
                          <p className="text-[#EB1536] text-xs">5 points</p>
                        </div>
                      </label>
                      <Controller
                        control={control}
                        name="mostLikelyToScore"
                        rules={{
                          required: "Make a selection",
                        }}
                        disabled
                        defaultValue={allPlayers?.find(
                          (player) =>
                            player.id ===
                            specificWeekPredictions?.predictions
                              ?.mostLikelyToScore?.id
                        )}
                        render={({ field: { onChange, value, ref } }) => (
                          <Select
                            ref={ref}
                            onChange={onChange}
                            options={allPlayers}
                            value={value}
                            isLoading={isFetchingAllPlayers}
                            components={{
                              IndicatorSeparator,
                            }}
                            getOptionValue={(option) => option["id"]}
                            getOptionLabel={(option) => option["name"]}
                            maxMenuHeight={300}
                            placeholder="- Select -"
                            classNamePrefix="react-select"
                            isClearable
                            isDisabled
                            styles={
                              specificWeekPredictions?.results
                                ? specificWeekPredictions?.results?.scorers?.some(
                                    (player) =>
                                      player.id ===
                                      specificWeekPredictions?.predictions
                                        ?.mostLikelyToScore?.id
                                  )
                                  ? correctStyle
                                  : invalidStyle
                                : pendingStyle
                            }
                          />
                        )}
                      />
                    </div>

                    {/* More likely To Score to score? */}
                    <div>
                      <label
                        htmlFor="moreLikelyToScore"
                        className="mb-2 flex items-center gap-2"
                      >
                        <p className="text-[#222222] text-sm">
                          More likely to score?
                        </p>
                        <div className="py-1 px-2 bg-gray-100 rounded-md">
                          <p className="text-[#EB1536] text-xs">3 points</p>
                        </div>
                      </label>
                      <Controller
                        control={control}
                        name="moreLikelyToScore"
                        rules={{
                          required: "Make a selection",
                        }}
                        disabled
                        defaultValue={allPlayers?.find(
                          (player) =>
                            player.id ===
                            specificWeekPredictions?.predictions
                              ?.moreLikelyToScore?.id
                        )}
                        render={({ field: { onChange, value, ref } }) => (
                          <Select
                            ref={ref}
                            onChange={onChange}
                            options={allPlayers}
                            value={value}
                            isLoading={isFetchingAllPlayers}
                            components={{
                              IndicatorSeparator,
                            }}
                            getOptionValue={(option) => option["id"]}
                            getOptionLabel={(option) => option["name"]}
                            maxMenuHeight={300}
                            placeholder="- Select -"
                            classNamePrefix="react-select"
                            isClearable
                            isDisabled
                            styles={
                              specificWeekPredictions?.results
                                ? specificWeekPredictions?.results?.scorers?.some(
                                    (player) =>
                                      player.id ===
                                      specificWeekPredictions?.predictions
                                        ?.moreLikelyToScore?.id
                                  )
                                  ? correctStyle
                                  : invalidStyle
                                : pendingStyle
                            }
                          />
                        )}
                      />
                    </div>

                    {/* Likely to score? */}
                    <div>
                      <label
                        htmlFor="likelyToScore"
                        className="mb-2 flex items-center gap-2"
                      >
                        <p className="text-[#222222] text-sm">
                          Likely to score?
                        </p>
                        <div className="py-1 px-2 bg-gray-100 rounded-md">
                          <p className="text-[#EB1536] text-xs">1 points</p>
                        </div>
                      </label>
                      <Controller
                        control={control}
                        name="likelyToScore"
                        rules={{
                          required: "Make a selection",
                        }}
                        disabled
                        defaultValue={allPlayers?.find(
                          (player) =>
                            player.id ===
                            specificWeekPredictions?.predictions?.likelyToScore
                              ?.id
                        )}
                        render={({ field: { onChange, value, ref } }) => (
                          <Select
                            ref={ref}
                            onChange={onChange}
                            options={allPlayers}
                            value={value}
                            isLoading={isFetchingAllPlayers}
                            components={{
                              IndicatorSeparator,
                            }}
                            getOptionValue={(option) => option["id"]}
                            getOptionLabel={(option) => option["name"]}
                            maxMenuHeight={300}
                            placeholder="- Select -"
                            classNamePrefix="react-select"
                            isClearable
                            menuPlacement="auto"
                            isDisabled
                            styles={
                              specificWeekPredictions?.results
                                ? specificWeekPredictions?.results?.scorers?.some(
                                    (player) =>
                                      player.id ===
                                      specificWeekPredictions?.predictions
                                        ?.likelyToScore?.id
                                  )
                                  ? correctStyle
                                  : invalidStyle
                                : pendingStyle
                            }
                          />
                        )}
                      />
                    </div>

                    {/* Goal time */}
                    <div className="">
                      <label htmlFor="timeOfFirstGoal" className="mb-2 block">
                        <p className="text-[#222222] text-sm py-0.5">
                          At what minute will the earliest goal be scored?
                        </p>
                      </label>
                      <Input
                        id="timeOfFirstGoal"
                        type="text"
                        placeholder="1"
                        disabled
                        defaultValue={
                          specificWeekPredictions?.predictions?.timeOfFirstGoal
                        }
                        className={`w-full input ${
                          specificWeekPredictions?.results
                            ? specificWeekPredictions?.predictions
                                ?.timeOfFirstGoal ===
                              specificWeekPredictions?.results?.timeOfFirstGoal
                              ? "correct"
                              : "invalid"
                            : "pending"
                        }`}
                      />
                    </div>
                  </div>
                </div>
                <div className="lg:block lg:py-0 col-span-1 space-y-5">
                  <div className="bg-white pb-7 rounded-md border">
                    <div className="bg-[#EB1536] px-2 py-3 flex items-center justify-center rounded-md rounded-b-none space-x-2.5 mb-6">
                      <SelectionIcon />
                      <p className="text-white">Selections</p>
                    </div>
                    <div
                      className="px-4 space-y-4 overflow-y-auto"
                      style={{ maxHeight: "450px" }}
                    >
                      {matches?.map((match) => (
                        <SelectionCard
                          key={match.id}
                          match={{
                            ...match,
                            prediction:
                              specificWeekPredictions?.predictions?.fixtures?.find(
                                (_match) => _match.fixture.id === match.id
                              )?.result,
                            outcome:
                              specificWeekPredictions?.predictions?.fixtures?.find(
                                (_match) => _match.fixture.id === match.id
                              )?.result === undefined ||
                              specificWeekPredictions?.results?.fixtures?.find(
                                (_match) => _match.fixture.id === match.id
                              )?.result === undefined
                                ? "pending"
                                : specificWeekPredictions?.predictions?.fixtures?.find(
                                    (_match) => _match.fixture.id === match.id
                                  )?.result === "NULL" ||
                                  specificWeekPredictions?.results?.fixtures?.find(
                                    (_match) => _match.fixture.id === match.id
                                  )?.result === "NULL"
                                ? "NULL"
                                : specificWeekPredictions?.predictions?.fixtures?.find(
                                    (_match) => _match.fixture.id === match.id
                                  )?.result ===
                                  specificWeekPredictions?.results?.fixtures?.find(
                                    (_match) => _match.fixture.id === match.id
                                  )?.result
                                ? "win"
                                : "lose",
                          }}
                        />
                      ))}
                    </div>
                    {specificWeekPredictions?.score ? (
                      <div className="mt-6 px-4">
                        <hr className="mb-8" />

                        <Button.OutlineWhite
                          className="w-full"
                          type="submit"
                          disabled
                          title={`Week Score: ${specificWeekPredictions?.score}`}
                        />
                      </div>
                    ) : (
                      <div className="mt-6 px-4">
                        <Button.OutlineWhite
                          className="w-full"
                          type="submit"
                          disabled
                          title={`Prediction made already`}
                        />
                      </div>
                    )}
                  </div>
                  <div className="w-full">
                    <SingleAdvert />
                  </div>
                </div>
              </section>
            </>
          ) : (
            <form onSubmit={handleSubmit(onPredict)}>
              {matches?.length > 0 ? (
                <section className="py-5 px-4 lg:px-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
                  <div className="bg-white h-fit p-3 md:p-5 border rounded-lg col-span-1 lg:col-span-2">
                    <div className="grid md:grid-cols-2 gap-6">
                      {matches?.map((match, idx) => (
                        <div key={idx}>
                          <MatchCard
                            key={match.id}
                            home={match.homeTeam}
                            away={match.awayTeam}
                            id={match.id}
                            matchTime={match.fixtureDateTime}
                            head2head={match.head2head}
                            awayForm={match.awayForm}
                            homeForm={match.homeForm}
                            prediction={match.prediction}
                            onChange={updateSelection}
                            invalid={!!errors?.[match?.id]}
                            locked={
                              !isBefore(
                                new Date(),
                                new Date(String(activeWeek?.deadline))
                              )
                            }
                            inactive={
                              !isBefore(
                                new Date(),
                                new Date(String(activeWeek?.deadline))
                              )
                            }
                          />
                          {errors?.[match?.id] && (
                            <div className="-mt-0.5">
                              <ErrorMessage
                                message={errors?.[
                                  match?.id
                                ]?.message?.toString()}
                              />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                    <hr className="my-8" />
                    <h3 className="text-[#000] font-medium text-lg text-center">
                      Deciders
                    </h3>
                    <p className="md:text-center text-[#5F6B7A] text-sm mt-3">
                      Select three likely different scorers and the minute the
                      first goal of the round will be scored
                    </p>
                    <div className="grid md:grid-cols-2 gap-6 py-6">
                      {/* Most likely To Score to score? */}
                      <div>
                        <label
                          htmlFor="mostLikelyToScore"
                          className="mb-2 flex items-center gap-2"
                        >
                          <p className="text-[#222222] text-sm">
                            Most likely to score?
                          </p>
                          <div className="py-1 px-2 bg-gray-100 rounded-md">
                            <p className="text-[#EB1536] text-xs">5 points</p>
                          </div>
                        </label>
                        <Controller
                          control={control}
                          name="mostLikelyToScore"
                          rules={{
                            required: "Make a selection",
                          }}
                          render={({ field: { onChange, value, ref } }) => (
                            <Select
                              ref={ref}
                              onChange={onChange}
                              options={allPlayers.filter(
                                (player) => !selectedPlayers.includes(player.id)
                              )}
                              value={value}
                              isLoading={isFetchingAllPlayers}
                              components={{
                                IndicatorSeparator,
                              }}
                              getOptionValue={(option) => option["id"]}
                              getOptionLabel={(option) => option["name"]}
                              maxMenuHeight={300}
                              placeholder="- Select -"
                              classNamePrefix="react-select"
                              isClearable
                              styles={
                                errors?.mostLikelyToScore
                                  ? invalidStyle
                                  : defaultStyle
                              }
                              isDisabled={
                                !isBefore(
                                  new Date(),
                                  new Date(String(activeWeek?.deadline))
                                )
                              }
                            />
                          )}
                        />
                        {errors?.mostLikelyToScore && (
                          <ErrorMessage
                            message={
                              errors?.mostLikelyToScore &&
                              errors?.mostLikelyToScore.message?.toString()
                            }
                          />
                        )}
                      </div>

                      {/* More likely To Score to score? */}
                      <div>
                        <label
                          htmlFor="moreLikelyToScore"
                          className="mb-2 flex items-center gap-2"
                        >
                          <p className="text-[#222222] text-sm">
                            More likely to score?
                          </p>
                          <div className="py-1 px-2 bg-gray-100 rounded-md">
                            <p className="text-[#EB1536] text-xs">3 points</p>
                          </div>
                        </label>
                        <Controller
                          control={control}
                          name="moreLikelyToScore"
                          rules={{
                            required: "Make a selection",
                          }}
                          render={({ field: { onChange, value, ref } }) => (
                            <Select
                              ref={ref}
                              onChange={onChange}
                              options={allPlayers.filter(
                                (player) => !selectedPlayers.includes(player.id)
                              )}
                              value={value}
                              isLoading={isFetchingAllPlayers}
                              components={{
                                IndicatorSeparator,
                              }}
                              getOptionValue={(option) => option["id"]}
                              getOptionLabel={(option) => option["name"]}
                              maxMenuHeight={300}
                              placeholder="- Select -"
                              classNamePrefix="react-select"
                              isClearable
                              styles={
                                errors?.moreLikelyToScore
                                  ? invalidStyle
                                  : defaultStyle
                              }
                              isDisabled={
                                !isBefore(
                                  new Date(),
                                  new Date(String(activeWeek?.deadline))
                                )
                              }
                            />
                          )}
                        />
                        {errors?.moreLikelyToScore && (
                          <ErrorMessage
                            message={
                              errors?.moreLikelyToScore &&
                              errors?.moreLikelyToScore.message?.toString()
                            }
                          />
                        )}
                      </div>

                      {/* Likely to score? */}
                      <div>
                        <label
                          htmlFor="likelyToScore"
                          className="mb-2 flex items-center gap-2"
                        >
                          <p className="text-[#222222] text-sm">
                            Likely to score?
                          </p>
                          <div className="py-1 px-2 bg-gray-100 rounded-md">
                            <p className="text-[#EB1536] text-xs">1 points</p>
                          </div>
                        </label>
                        <Controller
                          control={control}
                          name="likelyToScore"
                          rules={{
                            required: "Make a selection",
                          }}
                          render={({ field: { onChange, value, ref } }) => (
                            <Select
                              ref={ref}
                              onChange={onChange}
                              options={allPlayers.filter(
                                (player) => !selectedPlayers.includes(player.id)
                              )}
                              value={value}
                              isLoading={isFetchingAllPlayers}
                              components={{
                                IndicatorSeparator,
                              }}
                              getOptionValue={(option) => option["id"]}
                              getOptionLabel={(option) => option["name"]}
                              maxMenuHeight={300}
                              placeholder="- Select -"
                              classNamePrefix="react-select"
                              isClearable
                              menuPlacement="auto"
                              styles={
                                errors?.likelyToScore
                                  ? invalidStyle
                                  : defaultStyle
                              }
                              isDisabled={
                                !isBefore(
                                  new Date(),
                                  new Date(String(activeWeek?.deadline))
                                )
                              }
                            />
                          )}
                        />
                        {errors?.likelyToScore && (
                          <ErrorMessage
                            message={
                              errors?.likelyToScore &&
                              errors?.likelyToScore.message?.toString()
                            }
                          />
                        )}
                      </div>

                      {/* Goal time */}
                      <div className="">
                        <label htmlFor="timeOfFirstGoal" className="mb-2 block">
                          <p className="text-[#222222] text-sm py-0.5">
                            At what minute will the earliest goal be scored?
                          </p>
                        </label>
                        <Input
                          id="timeOfFirstGoal"
                          type="number"
                          placeholder="1"
                          max={120}
                          {...register("timeOfFirstGoal", {
                            required: "Enter a valid number",
                            min: {
                              value: 1,
                              message: "Please enter a valid number",
                            },
                          })}
                          className={`w-full input ${
                            errors?.timeOfFirstGoal ? "invalid" : ""
                          }`}
                          disabled={
                            !isBefore(
                              new Date(),
                              new Date(String(activeWeek?.deadline))
                            )
                          }
                        />
                        {errors?.timeOfFirstGoal && (
                          <ErrorMessage
                            message={errors.timeOfFirstGoal.message?.toString()}
                          />
                        )}
                      </div>

                      <div className="mt-6 px-4">
                        <hr className="mt-8" />

                        {isWeekDeadlineElasped ? (
                          <Button
                            className="w-full"
                            // type="submit"
                            disabled
                            title="The deadline has passed"
                          />
                        ) : (
                          <Button
                            className="w-full"
                            type="submit"
                            loading={isSubmittingPrediction}
                            title="Submit your prediction"
                          />
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="lg:block lg:py-0 col-span-1 space-y-5">
                    <div className="bg-white pb-7 rounded-md border  ">
                      <div className="bg-[#EB1536] px-2 py-3 flex items-center justify-center rounded-md rounded-b-none space-x-2.5 mb-6">
                        <SelectionIcon />
                        <p className="text-white">Selections</p>
                      </div>
                      <div
                        className="px-4 space-y-4 overflow-y-auto"
                        style={{ maxHeight: "450px" }}
                      >
                        {matches?.map((match) => (
                          <SelectionCard key={match.id} match={match} />
                        ))}
                      </div>
                      <div className="mt-6 px-4">
                        <hr className="mt-8" />

                        {isWeekDeadlineElasped ? (
                          <Button
                            className="w-full"
                            // type="submit"
                            disabled
                            title="The deadline has passed"
                          />
                        ) : (
                          <Button
                            className="w-full"
                            type="submit"
                            loading={isSubmittingPrediction}
                            title="Submit your prediction"
                          />
                        )}
                      </div>
                    </div>
                    <div className="w-full">
                      <SingleAdvert />
                    </div>
                  </div>
                </section>
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
            </form>
          )}
        </>
      )}
      <RedirectModal showAdvert={showAdvert} setShowAdvert={setShowAdvert} />
    </DashboardLayout>
  );
};

export default AllFixtures;
