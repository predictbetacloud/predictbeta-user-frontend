import DashboardLayout from "../../../components/layout/DashboardLayout";
import { FaRankingStar } from "react-icons/fa6";
import { useAppSelector } from "../../../state/hooks";
import { selectAuth } from "../../../state/slices/auth";


import { toastError, toastSuccess } from "../../../utils/toast";

import Button from "../../../components/Buttons";
import { LuCopy } from "react-icons/lu";

const ReferralLink = () => {
  const { user } = useAppSelector(selectAuth);

  const referralLink = `https://predictbeta.com/register?referralCode=${user?.referralCode}`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      toastSuccess("Referral link copied to clipboard");
    } catch (err) {
      toastError("Failed to copy. Please try again!");
    }
  };

  return (
    <DashboardLayout title="Get Referral Link">
      <section className="w-full py-5 lg:py-10 lg:px-8">
        <section className="px-4 mb-20">
          <div className="flex flex-col justify-between border border-[#eb1536ee] rounded-md bg-white shadow-md w-full md:w-2/3 lg:w-1/2 p-2 md:p-4 p[40px] h[400px]">
            <span className="text-red-600 text-3xl">
              <FaRankingStar />{" "}
            </span>
            <div className="flex items-center justify-between  py-2">
              <p className="text- ">Total point Balance: </p>
              <p className="font-bold text-xl">{user?.referralPoints}</p>
            </div>
            <div className="flex items-center flex-col sm:flex-row justify-between gap-2 rounded-lg border border-[#EB1536] bg-gray-100  p-2">
              <p className="text-sm text-gray-500 cursor-not-allowed select-none">
                {`https://predictbeta.com/register?referralCode=${user?.referralCode}`}
              </p>
              <Button.Outline
                title=""
                content={
                  <div className="flex items-center space-x-1 text-[#EB1536]">
                    <LuCopy />
                  </div>
                }
                className="border border-[#EB1536] bg-slate-100 hover:bg-slate-300"
                onClick={copyToClipboard}
              />
            </div>
          </div>
        </section>
      </section>
    </DashboardLayout>
  );
};

export default ReferralLink;
