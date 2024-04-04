import { useState } from "react";
import styled from "styled-components";
import { BiMinus, BiPlus } from "react-icons/bi";

const Style = styled.button`
	padding: 12px 16px;
`;

type Props = { title: string; content: string };

const FAQ = ({ title, content }: Props) => {
	const [isActive, setIsActive] = useState(false);

	return (
		<Style
			className={`rounded-md border w-full max-w-[500px] ${
				isActive ? "border-[#EB1536]" : "border-[#e1e7ec]"
			}`}
			onClick={() => setIsActive(!isActive)}
		>
			{/* title */}
			<div className="w-full flex items-center justify-between">
				<p
					className={`text-[#212934] text-left ${
						isActive ? "font-medium" : ""
					}`}
				>
					{title}
				</p>
				{isActive ? <BiMinus color="#EB1536" /> : <BiPlus />}
			</div>
			{/* content */}
			{isActive && <p className="text-[#5F6B7A] text-sm text-left mt-3">{content}</p>}
		</Style>
	);
};

export default FAQ;
