// import img1 from "../assets/images/ads/400-percent-welcome-bonus.jpeg"; // this was already commented out
import img2 from "../assets/images/ads/NGN500-freebet.jpeg";
import playYourFavourite from "../assets/images/ads/play-your-favourite.jpg";
import freeTickets from "../assets/images/Free-Tickets-Promo.jpg";
import DecemberGiveAway from "../assets/images/ads/HallaDecember.jpg";


const images = [
  // img1,
  img2,
  playYourFavourite,
  freeTickets,
  DecemberGiveAway
];

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
    arrows: false,
  };
	return (
    <div className="w-full md:w-1/2 lg:w-full mx-auto rounded-md ">
      <Slider {...settings}>
        {images.map((url, i) => (
          <a
            href="https://www.hallabet.com"
            target="_blank"
            className="flex justify-center"
            key={i}
          >
            <img src={url} className="w-[100%] rounded-md " alt="advert-img" />
          </a>
        ))}
      </Slider>
    </div>
  );
};

export default SingleAdvert;
