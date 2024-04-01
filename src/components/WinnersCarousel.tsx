import Slider from "react-slick";
import styled from "styled-components";
import { colors } from "../utils/colors";
import { WinnersCard } from "./WinnersCard";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const PrevArrow = ({
	className,
	onClick,
}: {
	className?: string;
	onClick?: () => void;
}) => (
	<button className={className} onClick={onClick}>
		<FaChevronLeft color={colors.accent} size={24} />
	</button>
);

const NextArrow = ({
	className,
	onClick,
}: {
	className?: string;
	onClick?: () => void;
}) => (
	<button className={className} onClick={onClick}>
		<FaChevronRight color={colors.accent} size={24} />
	</button>
);

const CustomSlider = styled(Slider)`
	.slick-slide {
		padding: 0 10px;
	}

	margin: 0;

	& .slick-list {
		padding: 0 !important;
	}

	& .slick-track {
		margin-left: 0;
		margin-right: 0;
	}

	.slick-disabled {
		display: none;
	}

	@media (max-width: 1000px) {
		& .slick-prev,
		.slick-next {
			display: none;
		}
	}

	& .slick-prev,
	.slick-next {
		&:before {
			display: none;
		}
		position: absolute;
		top: 50%;
		width: 50px;
		height: 50px;
		z-index: 10;
		background: #ffffff;
		border: 1px solid ${colors.accent};
		box-shadow: 0px 15px 30px rgba(235, 21, 54, 0.1);
		border-radius: 10px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
`;

const WinnersCarousel = ({
	winners,
}: {
	winners: {
		img: string;
		amount: number;
		currency: string;
		name: string;
		location: string;
	}[];
}) => {
	const settings = {
		speed: 1000,
		slidesToShow: 4,
		slidesToScroll: 1,
		infinite: winners.length > 4 ? true : false,
		initialSlide: 0,
		nextArrow: <NextArrow />,
		prevArrow: <PrevArrow />,
		autoplay: true,
		autoplaySpeed: 5000,
		pauseOnHover: true,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 4,
					slidesToScroll: 1,
					infinite: winners.length > 4 ? true : false,
				},
			},
			{
				breakpoint: 1000,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1,
					swipeToSlide: true,
					infinite: winners.length > 3,
					dots: true,
				},
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					swipeToSlide: true,
					infinite: winners.length > 1,
					dots: true,
				},
			},
		],
	};

	return (
		<div className="-mx-3">
			<CustomSlider {...settings}>
				{winners.map((winner, index) => (
					<WinnersCard winner={winner} key={index} data-index={index} />
				))}
			</CustomSlider>
		</div>
	);
};

export default WinnersCarousel;
