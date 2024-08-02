import img1 from '../assets/images/ads/ads-1.jpeg'
import img2 from '../assets/images/ads/ads-5.jpeg'
import img3 from '../assets/images/ads/ads-4.jpg'


const RightAdvertCards = () => {
  return (
    <div className="w-full lg:w-[20%]">
        <a href="https://www.hallabet.com" target='_blank' className="w-full">
            <img src={img1} className="w-[100%]" alt='advert-img' />
        </a>
        <a href="https://www.hallabet.com" target='_blank' className="w-full">
            <img src={img2} className="w-[100%]" alt='advert-img' />
        </a>
        <a href="https://www.hallabet.com" target='_blank' className="w-full hidden lg:block">
            <img src={img3} className="w-[100%]" alt='advert-img' />
        </a>
    </div>
  )
}

export default RightAdvertCards