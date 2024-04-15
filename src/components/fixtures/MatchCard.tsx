/* eslint-disable @typescript-eslint/no-explicit-any */
import styled from "styled-components";
import { IoIosLock } from "react-icons/io";
import * as dfn from "date-fns";

import { P } from "../Texts";
import { IClub } from "../../types/types";
import { colors } from "../../utils/colors";
import { MdOutlineBarChart } from "react-icons/md";
import { BsChevronDown } from "react-icons/bs";

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
		<img src={team?.clubLogo} className="h-6 w-6 mr-1 md:mr-3" alt={team?.name} />
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
	prediction?: "" | "HOME" | "DRAW" | "AWAY";
	result?: "" | "AWAY" | "DRAW" | "HOME";
	adminSet?: boolean;
	toggleUpdateModal?: () => void;
	toggleDeleteModal?: () => void;
}) => {
	const captureSelection = (value: any) => {
		onChange ? onChange(id, value) : null;
	};

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
						<button type="button" className="flex items-center w-fit gap-1">
							<MdOutlineBarChart size={18} color={colors.accent} />
							<p className="text-[#2A2E33] font-light">Stats</p>
							<BsChevronDown size={12} color="#2A2E33" />
						</button>
					</div>
					<p className="text-[#8C97A7] text-sm font-light">
						{dfn.format(matchTime, "eee dd MMM, HH:mm ")}
					</p>
				</div>
			</>
		</Style>
	);
};
