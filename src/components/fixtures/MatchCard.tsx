/* eslint-disable @typescript-eslint/no-explicit-any */
import styled from "styled-components";
import { IoIosLock } from "react-icons/io";
import * as dfn from "date-fns";

import { P } from "../Texts";
import { FormEnum, IClub } from "../../types/types";
import { colors } from "../../utils/colors";
import { MdOutlineBarChart } from "react-icons/md";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { useState } from "react";

const Style = styled.div<{ invalid: "true" | "false" }>`
	border: 1px solid;
	border-color: ${(props) =>
		props.invalid === "true" ? "#EB1536" : "#e1e7ec"};
`;

interface PredictionStyle {
	isselected: "true" | "false";
	isCorrect: "true" | "false";
}

const PredictionStyle = styled.div<PredictionStyle>`
	background: ${(props) =>
		props.isCorrect === "true"
			? colors.green700
			: props.isselected === "true"
			? "#EB1536"
			: "#051B30"};
	padding: 8px 14px;
`;

const Prediction = ({
	value,
	title,
	onClick,
	selectedPrediction,
	className = "",
	style,
	locked,
	inactive,
	result,
}: {
	className?: string;
	onClick: (value: any) => void;
	selectedPrediction: any;
	style: object;
	title?: string;
	locked: boolean;
	inactive: boolean;
	result: "" | "HOME" | "DRAW" | "AWAY" | undefined;
	value: any;
}) => (
	<PredictionStyle
		className={`flex items-center justify-center ${
			inactive || locked ? "" : "cursor-pointer"
		} ${className ? className : ""}`}
		style={style}
		onClick={inactive ? () => {} : () => onClick(value)}
		isCorrect={result === value ? "true" : "false"}
		isselected={selectedPrediction === value ? "true" : "false"}
	>
		{locked ? (
			<IoIosLock color="white" width="14px" className="cursor-not-allowed" />
		) : (
			<P className="text-white">{title ?? value}</P>
		)}
	</PredictionStyle>
);

const Team = ({ team }: { team: IClub }) => (
	<div className="flex items-center">
		<img
			src={team?.clubLogo}
			className="h-6 w-6 mr-1 md:mr-3"
			alt={team?.name}
		/>
		<P className="text-[#000301] text-[0.8em]">{team?.name}</P>
	</div>
);

export const MatchCard = ({
	id,
	home,
	away,
	onChange,
	prediction,
	matchTime,
	inactive = false,
	locked = false,
	invalid = false,
	result,
	head2head,
	awayForm,
	homeForm,
}: {
	away: any;
	home: any;
	id: number;
	matchTime: string;
	onChange?: (id: number, value: any) => void;
	locked?: boolean;
	inactive?: boolean;
	invalid?: boolean;
	isScoreSet?: boolean;
	head2head: any;
	awayForm: string;
	homeForm: string;
	prediction?: "" | "HOME" | "DRAW" | "AWAY";
	result?: "" | "AWAY" | "DRAW" | "HOME";
	adminSet?: boolean;
	toggleUpdateModal?: () => void;
	toggleDeleteModal?: () => void;
}) => {
	const captureSelection = (value: any) => {
		onChange ? onChange(id, value) : null;
	};

	const [showStats, setShowStats] = useState(false);

	return (
		<Style className="p-4 rounded-md" invalid={invalid ? "true" : "false"}>
			<div className="flex items-center justify-between">
				<div className="md:space-y-2 items-center justify-between space-y-4">
					<Team team={home} />
					<Team team={away} />
				</div>
				<div>
					<div className="grid grid-cols-3 w-fit ml-auto">
						<Prediction
							value={"HOME"}
							onClick={captureSelection}
							inactive={inactive}
							locked={locked}
							title="H"
							selectedPrediction={prediction}
							style={{
								borderRadius: "5px 0px 0px 5px",
							}}
							result={result}
						/>
						<Prediction
							// title="1"
							value={"DRAW"}
							onClick={captureSelection}
							inactive={inactive}
							locked={locked}
							title="X"
							result={result}
							selectedPrediction={prediction}
							style={{
								borderRight: `1px solid ${colors.grey500}`,
								borderLeft: `1px solid ${colors.grey500}`,
							}}
						/>
						<Prediction
							value={"AWAY"}
							title="A"
							inactive={inactive}
							locked={locked}
							onClick={captureSelection}
							result={result}
							selectedPrediction={prediction}
							style={{
								borderRadius: "0px 5px 5px 0px",
							}}
						/>
					</div>
				</div>
			</div>
			<>
				<hr className="my-4" />
				<div className="flex items-center justify-between gap-4">
					<div className="flex items-center justify-between gap-4">
						<button
							type="button"
							className="flex items-center w-fit gap-1"
							onClick={() => setShowStats(!showStats)}
						>
							<MdOutlineBarChart size={18} color={colors.accent} />
							<p className="text-[#2A2E33] font-light">Stats</p>
							{showStats ? (
								<BsChevronUp size={12} color="#2A2E33" />
							) : (
								<BsChevronDown size={12} color="#2A2E33" />
							)}
						</button>
					</div>
					<p className="text-[#8C97A7] text-sm font-light">
						{matchTime ? dfn.format(dfn.subHours(matchTime, 1), "eee dd MMM, hh:mm aa") : ""}
					</p>
				</div>

				{showStats && (
					<>
						<hr className="my-4" />
						{awayForm && homeForm && (
							<>
								<h4 className="text-[#6D7786] text-sm mb-4">
									Form (Last 5 matches)
								</h4>
								<div className="bg-[#F5F8FA] border border-[#F5F8FA] rounded-lg p-3">
									<div className="flex justify-between items-center">
										{/* Home Team */}
										<div className="flex items-center">
											<img
												src={home?.clubLogo}
												className="h-6 w-6 mr-1 md:mr-2"
												alt={home?.name}
											/>
											<P className="text-[#000301] text-[0.8em] uppercase">
												{home?.name?.substring(0, 3)}
											</P>
										</div>
										<div className="flex items-center space-x-1">
											{homeForm.split("").map((form, index) => {
												const typedForm = form as keyof typeof FormEnum;
												return (
													<div
														style={{ background: FormEnum[typedForm] }}
														className="flex items-center justify-center h-6 w-6 text-white rounded-full text-sm"
														key={index}
													>
														{form}
													</div>
												);
											})}
										</div>
									</div>
									<div className="flex justify-between items-center space-y-2">
										{/* Away Team */}
										<div className="flex items-center">
											<img
												src={away?.clubLogo}
												className="h-6 w-6 mr-1 md:mr-2"
												alt={away?.name}
											/>
											<P className="text-[#000301] text-[0.8em] uppercase">
												{away?.name?.substring(0, 3)}
											</P>
										</div>
										<div className="flex items-center space-x-1">
											{awayForm.split("").map((form, index) => {
												const typedForm = form as keyof typeof FormEnum;
												return (
													<div
														style={{ background: FormEnum[typedForm] }}
														className="flex items-center justify-center h-6 w-6 text-white rounded-full text-sm"
														key={index}
													>
														{form}
													</div>
												);
											})}
										</div>
									</div>
								</div>
							</>
						)}

						{Array.isArray(head2head) && head2head?.length > 0 && (
							<>
								<h4 className="text-[#6D7786] text-sm my-4">
									H2H (Last 5 matches)
								</h4>
								{head2head.map((fixture: any) => {
									const match = fixture as any;
									return (
										<div
											className="bg-[#F5F8FA] border border-[#F5F8FA] rounded-lg p-4 mb-3"
											key={match?.fixture?.id}
										>
											{/* Match Date */}
											<p className="text-[#8C97A7] text-[10px] text-right font-light">
												{match?.fixture?.date
													? dfn.format(
															new Date(match?.fixture?.date),
															"dd MMM yyyy"
													  )
													: ""}
											</p>
											{/* Scoreline */}
											<div className="flex justify-between items-center mt-3">
												{/* Home team */}
												<div className="flex items-center">
													<img
														src={match?.teams?.home?.logo}
														className="h-6 w-6 mr-1 md:mr-2"
														alt={match?.teams?.home?.name}
													/>
													<P className="text-[#000301] text-[0.8em] uppercase">
														{match?.teams?.home?.name?.substring(0, 3)}
													</P>
												</div>
												{/* Goals */}
												<div className="flex items-center gap-x-2">
													<p className="text-[#020300]">{match?.goals?.home}</p>
													<p className="text-[#020300]">-</p>
													<p className="text-[#020300]">{match?.goals?.away}</p>
												</div>
												{/* Away team */}
												<div className="flex items-center">
													<img
														src={match?.teams?.away?.logo}
														className="h-6 w-6 mr-1 md:mr-2"
														alt={match?.teams?.away?.name}
													/>
													<P className="text-[#000301] text-[0.8em] uppercase">
														{match?.teams?.away?.name?.substring(0, 3)}
													</P>
												</div>
											</div>
										</div>
									);
								})}
							</>
						)}
					</>
				)}
			</>
		</Style>
	);
};
