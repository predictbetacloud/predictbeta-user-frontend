import Button from "./Buttons";
import heroImg from "../assets/images/hero img.png";
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="px-4 md:px-10 lg:px-40 lg:pt-0 max-h-screen w-full md:flex md:justify-between md:items-center">
        <div className="md:w-[55%] lg:w-[50%] flex-shrink-0 py-10">
            <h1 className="text-[50px] lg:text-[56px] font-semibold leading-[55px] lg:leading-[68px]">
                <span className="text-[#eb1536]">Predict</span>! <br />
                Take Your <br/> Share<span className="text-[#eb1536]">.</span>
            </h1>
            <p className="mt-4 mb-8 text-[#5F6B7A]">
                Luck or skill? Let’s see who’s better.
            </p>
            <div className="flex items-center gap-x-5">
                <Link to="/dashboard/fixtures">
                    <Button title="Start predicting" />
                </Link>
                <Link to="/dashboard/private-league">
                    <Button.OutlineRed title="Create a league" />
                </Link>
            </div>
        </div>
        <div className='hidden md:block md:w-[45%] lg:w-[50%]'>
            <img
                src={heroImg}
                alt="We play ball"
                className="hidden md:block lg:block max-h-[90vh] w-[100%]"
            />
        </div>
    </section>
  )
}

export default HeroSection