import img1 from '../assets/images/ads/ads-3.jpg'
import img2 from '../assets/images/ads/ads-2.jpeg'
import img4 from '../assets/images/ads/ads-1.jpeg'
import img5 from '../assets/images/ads/ads-5.jpeg'
import img6 from '../assets/images/ads/ads-4.jpg'
const images = [img1, img2, img4, img5, img6]
const images2  = [img6, img5,img4, img2, img1]
const images3 = [img2, img4, img1, img6, img6]
import Slider from "react-slick";


const RightSideAdvert = () => {
  const settings = {
    dots: false,
    fade:true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 5000,
    cssEase: "linear"
  };
  return (
    <div className="w-full lg:w-[20%]">
      <Slider {...settings}>
        {images3.map((url,i)=>(
          <a href="https://www.hallabet.com" target='_blank' className="w-full" key={i}>
            <img src={url} className="w-[100%]" alt='advert-img' />
        </a>
        ))}
      </Slider>
      <Slider {...settings}>
        {images.map((url,i)=>(
          <a href="https://www.hallabet.com" target='_blank' className="w-full" key={i}>
            <img src={url} className="w-[100%]" alt='advert-img' />
        </a>
        ))}
      </Slider>
      <Slider {...settings}>
        {images2.map((url,i)=>(
          <a href="https://www.hallabet.com" target='_blank' className="w-full" key={i}>
            <img src={url} className="w-[100%]" alt='advert-img' />
        </a>
        ))}
      </Slider>
    </div>
  )
}

export default RightSideAdvert