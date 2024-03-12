import { useEffect, useMemo, useState } from "react";
import queryString from "query-string";
import Select from "react-select";
import { useLocation, useSearchParams } from "react-router-dom";
import { AiOutlineLoading } from "react-icons/ai";
import { Controller, useForm } from "react-hook-form";

import Button from "../../../components/Buttons";
import DashboardLayout from "../../../components/layout/DashboardLayout";
import { useAppDispatch, useAppSelector } from "../../../state/hooks";
import {
	selectAllSeasons,
	selectAllWeeks,
	selectIsFetchingAllSeasons,
	selectIsFetchingAllWeeks,
	selectIsFetchingMatches,
	selectMatches,
} from "../../../state/slices/fixtures";
import {
	getAllMatchesAPI,
	getAllSeasonsAPI,
	getAllWeeksAPI,
} from "../../../api/fixturesAPI";
import { VscFilter } from "react-icons/vsc";
import { InputPlaceholder } from "../../../components/inputs/Input";
import CustomListBox from "../../../components/inputs/CustomListBox";
import PageLoading from "../../../components/loaders/PageLoading";
import { MatchCard } from "../../../components/fixtures/MatchCard";
import { SelectionIcon } from "../../../assets/icons";
import ErrorMessage from "../../../components/inputs/ErrorMessage";
import SelectionCard from "../../../components/fixtures/SelectionCard";
import IndicatorSeparator from "../../../components/IndicatorSeparator";
import { defaultStyle, invalidStyle } from "../../../utils/selectStyle";
import { getAllPlayersAPI } from "../../../api/teamsAPI";
import {
	selectAllPlayers,
	selectIsFetchingAllPlayers,
} from "../../../state/slices/teams";

const AllFixtures = () => {
	const dispatch = useAppDispatch();
	const [, setSearchParams] = useSearchParams();
	const l = useLocation();

	const queries = queryString.parse(l.search);
	const query_week = queries?.week;

	const isFetchingSeasons = useAppSelector(selectIsFetchingAllSeasons);
	const isFetchingWeeks = useAppSelector(selectIsFetchingAllWeeks);
	const isFetchingMatches = useAppSelector(selectIsFetchingMatches);
	const isFetchingAllPlayers = useAppSelector(selectIsFetchingAllPlayers);

	const allWeeks = useAppSelector(selectAllWeeks);
	const allMatches = useAppSelector(selectMatches);
	const seasons = useAppSelector(selectAllSeasons);
	const allPlayers = useAppSelector(selectAllPlayers);

	const [selectedWeek, setSelectedWeek] = useState<{
		id: string;
		number: string;
	} | null>(null);

	const [matches, setMatches] = useState(allMatches);

	const {
		register,
		setValue,
		handleSubmit,
		control,
		trigger,
		formState: { errors },
	} = useForm();

	// Set matches
	useMemo(() => {
		setMatches(allMatches);
		allMatches?.forEach((match) => {
			register(String(match.id), {
				required: "You haven't predicted this match",
			});
		});

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [allMatches]);

	// Get all Season
	useMemo(() => {
		dispatch(getAllSeasonsAPI({}));
		dispatch(getAllPlayersAPI({}));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// Get all weeks in the latest season
	useMemo(() => {
		if (seasons?.[0]?.id) {
			dispatch(getAllWeeksAPI({ seasonId: seasons?.[0]?.id }));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [seasons?.[0]?.id]);

	// Make latest week the active week
	useEffect(() => {
		if (allWeeks?.[0]?.id) {
			// if week is in query use that week
			if (query_week) {
				const activeWeek = allWeeks.find(
					(_week) => _week.number === Number(query_week)
				);
				if (activeWeek) {
					setSelectedWeek({
						id: String(activeWeek?.id),
						number: String(activeWeek?.number),
					});
				}
			} else {
				setSearchParams({ week: String(allWeeks?.[0]?.id) });
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [allWeeks, query_week]);

	useMemo(() => {
		if (seasons?.[0]?.id && selectedWeek?.id) {
			dispatch(
				getAllMatchesAPI({
					seasonId: seasons?.[0]?.id,
					weekId: selectedWeek?.id,
				})
			);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedWeek]);

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

	const onPredict = () => {
		console.log(errors);
	};

	return (
		<DashboardLayout>
			<section className="predictbeta-header w-full px-8 py-3 flex items-center justify-between">
				{/* week select */}
				<div>
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
								value: String(week.id),
							}))}
							onChange={(value: string): void => {
								setSearchParams({ week: String(value) });
							}}
							defaultOption={selectedWeek?.id}
							title={"Week"}
							icon={<VscFilter />}
						/>
					)}
				</div>
			</section>

			{/* Matches */}
			{isFetchingMatches || isFetchingWeeks || isFetchingSeasons ? (
				<PageLoading />
			) : (
				<form onSubmit={handleSubmit(onPredict)} className="py-10 px-8">
					{matches?.length > 0 ? (
						<section className="flex ">
							<div className="flex-grow">
								<div className="grid md:grid-cols-2 gap-6">
									{matches?.map((match, idx) => (
										<div key={idx}>
											<MatchCard
												key={match.id}
												home={match.homeTeam}
												away={match.awayTeam}
												id={match.id}
												matchTime={match.fixtureDateTime}
												prediction={match.prediction}
												onChange={updateSelection}
												invalid={!!errors?.[match?.id]}
											/>
											{errors?.[match?.id] && (
												<div className="-mt-0.5">
													<ErrorMessage
														message={errors?.[match?.id]?.message?.toString()}
													/>
												</div>
											)}
										</div>
									))}
								</div>
								<hr className="my-8" />
								<h3 className="text-[#000] font-medium text-lg text-center">
									Decider
								</h3>
								<p className="md:text-center text-[#5F6B7A] text-sm mt-3">
									Select three likely different scorers and minute of first goal
									to decide your tie
								</p>
								<div className="md:grid grid-cols-2 gap-6">
									{/* Most likely to score? */}
									<div>
										<label htmlFor="most_likely" className="mb-2 block">
											<p className="text-[#222222] text-sm">
												Most likely to score?
											</p>
										</label>
										<Controller
											control={control}
											name="most_likely"
											rules={{
												required: "Make a selection",
											}}
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
													styles={
														errors?.most_likely ? invalidStyle : defaultStyle
													}
												/>
											)}
										/>
										{errors?.most_likely && (
											<ErrorMessage
												message={
													errors?.most_likely &&
													errors?.most_likely.message?.toString()
												}
											/>
										)}
									</div>
								</div>
							</div>
							<div className="md:w-1/3 md:pl-8">
								<div className="bg-white pb-7 rounded-4xl rounded-b-none shadow">
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

										<Button
											className="w-full"
											type="submit"
											// loading={predicting}
											title="Submit your prediction"
										/>
									</div>
								</div>
							</div>
						</section>
					) : (
						<div className="flex items-center justify-center py-20 lg:py-32 flex-col">
							<h3 className="font-bold text-3xl mb-2">
								There no matches for this week
							</h3>
							<p className="">Create a match to begin</p>
						</div>
					)}
				</form>
			)}
		</DashboardLayout>
	);
};

export default AllFixtures;
