import styled from "styled-components";
import { colors } from "../../utils/colors";

const Style = styled.button<{ isselected: boolean }>`
	border: 1px solid;
	border-color: ${(props) =>
		props.isselected ? colors.accent : colors.grey200};
	border-radius: 8px;

	&:focus {
		outline: none;
		box-shadow: none;
	}
`;

export const AmountOption = ({
	currency = "NGN",
	value,
	isselected,
	onClick = () => {},
}: {
	currency: string;
	value: number;
	isselected: boolean;
	onClick: () => void;
}) => {
	return (
		<Style
			isselected={isselected}
			onClick={onClick}
			type="button"
			className="py-2 px-3 cursor-pointer"
		>
			<p className="whitespace-pre text-[#2A2E33] text-xs">
				{currency} {Number(value).toLocaleString()}
			</p>
		</Style>
	);
};
