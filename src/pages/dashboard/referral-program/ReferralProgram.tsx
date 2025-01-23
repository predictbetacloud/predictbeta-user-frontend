import DashboardLayout from "../../../components/layout/DashboardLayout";
import { FaRankingStar } from "react-icons/fa6";

const ReferralProgram = () => {
  return (
    <DashboardLayout title="Referral Point">
      <section className="md:w-full flex py-5 lg:py-10 px-4 lg:px-8">
        <section className="px-4 mb-20">
          <div className="header">
            <h1 className="text-2xl font-bold">Referral Point</h1>
            <div className="container header_tab bg-white mx-auto shadow-md w-[400px] p-[40px] h-[400px]">
              <p>
                <span className="text-red-600 text-3xl">
                  <FaRankingStar />{" "}
                </span>
                Point Balance:
                <span className="font-bold text-xl">0</span>/20
              </p>
            </div>
          </div>
        </section>
      </section>
    </DashboardLayout>
  );
};

export default ReferralProgram;
