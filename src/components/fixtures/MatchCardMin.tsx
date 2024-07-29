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

const TeamMin = ({ team }: { team: IClub }) => (
	<div className="flex items-center">
		<img
			src={team?.clubLogo}
			className="h-6 w-6 mr-1 md:mr-3"
			alt={team?.name}
		/>
		<P className="text-[#000301] text-[0.8em]">{team?.name}</P>
	</div>
);

export const MatchCardMin = ({
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

	return (
		<Style className="p-4 rounded-md" invalid={invalid ? "true" : "false"}>
			<div className="w-full">
                <div className=" text-gray-500 flex justify-between">
                    <div className="flex flex-col gap-4 items-center">
                        <p className="text-xs">English League</p>
                        <TeamMin team={home} />
                    </div>
                    <div className="flex flex-col gap-4 items-center">
                        <p className="text-xs ">12:30pm</p>
                        <p className="text-lg font-bold text-[] text-[#EB1636]">0 : 0</p>
                    </div>
                    <div className="flex flex-col gap-4 items-center">
                        <p className="text-xs">24th  July 2024</p>
                       <TeamMin team={away} />
                    </div>
                </div>
				
			</div>
			<>
				
				
			</>
		</Style>
	);
};
