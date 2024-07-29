import styled from "styled-components";
import { P } from "../Texts";
import {  IClub } from "../../types/types";
const Style = styled.div<{ invalid: "true" | "false" }>`
	border: 1px solid;
	border-color: ${(props) =>
		props.invalid === "true" ? "#EB1536" : "#e1e7ec"};
`;

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
	home,
	away,
	invalid = false
}: {
	away: any;
	home: any;
	invalid?: boolean;
}) => {
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
		</Style>
	);
};
