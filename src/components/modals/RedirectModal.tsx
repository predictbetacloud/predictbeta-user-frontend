import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

import redirectImage from "../../assets/images/redirectPopUpWeek9.jpg";

const RedirectModal = ({
  showAdvert,
  setShowAdvert,
}: {
  showAdvert: boolean;
  setShowAdvert: (value: boolean) => void;
}) => {
  return (
    <Transition appear show={showAdvert} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10 max-w-[550px] "
        onClose={setShowAdvert}
      >
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
              <Dialog.Panel className="w-full max-w-[450px] transform overflow-hidden rounded-lg shadow-xl transition-all ">
                <div className="flex justify-center items-center w-full bg-white ">
                  <a
                    target="_blank"
                    href="https://hallabet.com/prematch?bookedBet=YV99947"
                    className="w-full"
                  >
                    <img
                      src={redirectImage}
                      alt="HallaBet redirect promo"
                      className="w-full "
                      style={{ position: "relative" }}
                    />
                  </a>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default RedirectModal;
