import WinnersCarousel from '../components/WinnersCarousel'
import winners from "../utils/winners";

const TopWinners = () => {
  return (
    <div className="px-4 py-5 md:px-[40px] lg:px-[100px] xl:px-40 mb-24 flex flex-col gap-4 xl:-mt-[200px]">
        <h3 className=" text-[#2A2E33] font-bold">Recent winners</h3>
        <WinnersCarousel winners={winners} />
    </div>
  )
}

export default TopWinners