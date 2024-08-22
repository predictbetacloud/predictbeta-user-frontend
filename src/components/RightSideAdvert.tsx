import img1 from '../assets/images/ads/ads-1.jpg'
import img2 from '../assets/images/ads/ads-2.jpg'
import img3 from '../assets/images/ads/ads-3.jpeg'
import img4 from '../assets/images/ads/ads-4.jpeg'
import img5 from '../assets/images/ads/ads-4.jpg'
const images = [img1, img2, img4, img5, img3]
const images2  = [img5, img4,img3, img2, img1]
const images3 = [img2, img4, img1, img3, img5]
import Slider from "react-slick";


const RightSideAdvert = () => {
  const settings = {
    dots: false,
    fade:true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 10000,
    cssEase: "linear"
  };
  return (
    <div className="w-full">
      <Slider {...settings}>
        {images3.map((url,i)=>(
          <a href="https://www.hallabet.com" target='_blank' className="w-full" key={i}>
            <img src={url} className="w-[100%]" alt='advert-img' />
        </a>
        ))}
      </Slider>
      <Slider {...settings} className='hidden md:block'>
        {images.map((url,i)=>(
          <a href="https://www.hallabet.com" target='_blank' className="w-full" key={i}>
            <img src={url} className="w-[100%]" alt='advert-img' />
        </a>
        ))}
      </Slider>
      <Slider {...settings} className='hidden md:block'>
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