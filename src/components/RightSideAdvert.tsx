// import img1 from "../assets/images/ads/15-percent-weekly-cashback.jpg";

// import img2 from "../assets/images/ads/50-percent-acca-cashback.jpg"; // this was already commented out
import decemberGoodieBag from "../assets/images/decemberGoodieBag.jpg";
import img3 from "../assets/images/ads/400-percent-welcome-bonus.jpeg";
// import img4 from "../assets/images/ads/beta-betting-hallabet.jpeg";
import img5 from "../assets/images/ads/play-your-favourite.jpg";
import boxingDayFlyer from "../assets/images/boxingDayFlyer.jpg";

// const images = [img4, img2, img1, img5, img3];
// const images2 = [img5, img4, img2, img3, img1];
const images3 = [
	img3,
	boxingDayFlyer,
	// img4,
	// img1,
	decemberGoodieBag,
	img5
];
import Slider from "react-slick";

const RightSideAdvert = () => {
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
				{images3.map((url, i) => (
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
			{/* <Slider {...settings} className="hidden md:block">
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
			<Slider {...settings} className="hidden md:block">
				{images2.map((url, i) => (
					<a
						href="https://www.hallabet.com"
						target="_blank"
						className="w-full"
						key={i}
					>
						<img src={url} className="w-[100%]" alt="advert-img" />
					</a>
				))}
			</Slider> */}
		</div>
	);
};

export default RightSideAdvert;
