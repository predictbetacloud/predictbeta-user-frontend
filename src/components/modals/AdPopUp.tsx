import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
// import styled from "styled-components";

// import pattern from "../../assets/images/pop-up pattern.png";
// import legImg from "../../assets/images/pop-up leg-img.png";
// import matchImg from "../../assets/images/pop-up match-img.png";
// import hallaBetLogo from "../../assets/logo/hallabet.png";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { selectShowAdPopUp, setShowAdPopUp } from "../../state/slices/auth";
// import Button from "../Buttons";
// import { Link } from "react-router-dom";
import referAndEarn from "../../assets/images/referAndEarn.jpg";

// const Container = styled.div`
//   background-image: linear-gradient(
//       to bottom,
//       rgba(0, 0, 0, 0.7),
//       rgba(0, 0, 0, 0.7)
//     ),
//     url("${pattern}");
// `;

const AdPopUp = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(selectShowAdPopUp);

  const closeModal = () => {
    dispatch(setShowAdPopUp(false));
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10 hidden" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                // as={Container}
                // className="w-full max-w-[80vw] transform overflow-hidden rounded-lg  p-6 md:px-16 md:py-24 text-left align-middle shadow-xl transition-all relative"
                className="w-full max-w-[450px] rounded-md"
              >
                {/* Content */}
                <div className="flex items-center justify-between w-full">
                  <img
                    src={referAndEarn}
                    alt="referAndEarn"
                    className="w-full"
                  />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default AdPopUp;

{/* <div>
  <h4 className="text-white text-2xl font-medium">Welcome to Predictbeta</h4>
  <div className="flex items-center justify-between mt-8">
    <div className="md:w-3/5">
      <h2 className="text-3xl lg:text-6xl text-white font-bold">
        We&apos;re the fastest growing{" "}
        <span className="text-[#d52a2a]">FREE</span> sports prediction
        community!
      </h2>
    </div>
    Match img
    <img src={matchImg} alt="match" className="hidden lg:block" />
  </div>
  <Link to="/dashboard/fixtures">
    <Button title="Join predictbeta" className="mt-8" />
  </Link>
  <hr className="mt-4 border-gray-600" />
  <p className="text-white flex items-center gap-2 py-2">
    Powered by{" "}
    <a href="https://www.hallabet.com" target="_blank">
      <img
        src={hallaBetLogo}
        width={80}
        alt="HallaBet"
        className="md:mr-8 rounded-md"
      />
    </a>
  </p>
</div>; */}
{
  /* leg img */
}
{/* <img
  src={legImg}
  alt="foot"
  className="hidden md:block absolute h-full right-0 top-0"
/>; */}