import img1 from "../assets/images/ads/400-percent-welcome-bonus.jpeg";
import img2 from "../assets/images/ads/NGN500-freebet.jpeg";
import playYourFavourite from "../assets/images/ads/play-your-favourite.jpg";
// import customerServiceWeek from "../assets/images/ads/HallaBetGiveaway.jpg";
import DecemberGiveAway from "../assets/images/ads/HallaDecember.jpg";

const images = [img1, img2, playYourFavourite, DecemberGiveAway];

import Slider from "react-slick";

const SingleAdvert = () => {
	const settings = {
		dots: false,
		fade: true,
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		speed: 2000,
		autoplaySpeed: 10000,
		cssEase: "linear",
	};
	return (
		<div className="w-full">
			<Slider {...settings}>
				{images.map((url, i) => (
					<a
						href="https://www.hallabet.com"
						target="_blank"
						className="w-full"
						key={i}
					>
						<img src={url} className="w-[100%]" alt="advert-img" />
					</a>
				))}
			</Slider>
		</div>
	);
};

export default SingleAdvert;
