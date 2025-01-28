import PublicHeader from "../../components/layout/PublicHeader";
import PublicFooter from "../../components/layout/PublicFooter";

const ReferralsProgram = () => {
  return (
    <>
      <PublicHeader />
      <main>
        {/* Banner */}
        <section className="py-20 px-4 bg-[#051B30] text-center mb-16">
          <h1 className="text-white font-semibold text-4xl mb-4">
            PredictBeta Referral Program
          </h1>
          <p className="text-[#E1E7EC] max-w-[600px] mx-auto">
            Your prediction points are not enough! Invite friends to sign up on
            PredictBeta with your referral code and earn points, for FREE!
          </p>
        </section>
        <section className="px-4 md:px-40 mb-20">
          <div className="md:w-2/3">
            {/* Getting Started */}
            <h3 className="text-[#212934] font-semibold text-4xl mb-3">
              How to Participate
            </h3>
            <ul className="px-4 list-disc space-y-2">
              <li>
                <p className="text-[#212934]">
                  Firstly, make sure you have a PredictBeta account to refer
                  others.
                </p>
              </li>
              <li>
                <p className="text-[#212934]">
                  Share your referral link with other people.
                </p>
              </li>
              <li>
                <p className="text-[#212934]">
                  When someone signs up with your referral link on PredictBeta,
                  you and the person earn 2 points, each.
                </p>
              </li>
              <li>
                <p className="text-[#212934]">
                  All your referral points will be stored in your point wallet.
                </p>
              </li>
              <li>
                <p className="text-[#212934]">
                  You can apply up to 20 referral points per round on
                  PredictBeta.
                </p>
              </li>
              <li>
                <p className="text-[#212934]">
                  These points will be added to your current point from your
                  predictions and will help you climb the leaderboard.
                </p>
              </li>
              <li>
                <p className="text-[#212934]">
                  When your referral points help you make the top 3 on the
                  leaderboard, you win cool cash prizes for that round. No
                  stories!
                </p>
              </li>
              <li>
                <p className="text-[#212934]">
                  Improve your chances of winning FREE cash prizes by sending
                  others your referral link, now.
                </p>
              </li>
              <li>
                <p className="text-[#212934]">
                  Referring others to PredictBeta is a smart move. Work smart!
                </p>
              </li>
            </ul>
          </div>
        </section>
      </main>
      <PublicFooter />
    </>
  );
};

export default ReferralsProgram;
