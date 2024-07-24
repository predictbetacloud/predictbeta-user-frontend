import styled from "styled-components";
import { colors } from "../utils/colors";

const Style = styled.div`
	background: #fffdfd;
	border-radius: 12px;
	border: 1px solid ${colors.accent};
`;

export const WinnersCard = ({
	winner,
}: {
	winner: {
		img: string;
		amount: number;
		currency: string;
		name: string;
		location?: string;
	};
}) => {
	return (
		<Style className="flex-1 py-4 px-6 md:px-2 xl:px-5 flex items-center gap-4 md:gap-2 lg:gap-5">
			<div
				className="rounded-full w-[60px] h-[60px] text-2xl md:text-lg md:w-[35px] md:h-[35px] text-[#3F3E4D] flex items-center justify-center p-2"
				style={{
					border: "1px solid #EB1536",
					boxShadow: "0px 0px 0px 3px rgba(249, 99, 99, 0.25)",
				}}
			>
				<p>{winner?.name?.[0]}</p>
			</div>
			<div>
				<div className="flex items-baseline">
					<p className="text-xs text-[#5F6B7A] font-light">{winner?.currency ?? "NGN "}</p>
					<p className="text-xl font-medium text-[#2A2E33]">
						{winner?.amount?.toLocaleString() ?? 0}
					</p>
				</div>
				<p className="text-[#2A2E33] mt-0.5 truncate">{winner?.name}</p>
				<p className="text-xs text-[#8895A7] mt-0.5 font-light">{winner?.location}</p>
			</div>
		</Style>
	);
};
