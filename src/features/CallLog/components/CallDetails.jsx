import { FaCircleUser } from "react-icons/fa6";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { extractDateAndTime, formatTime } from "../utils/formatCallLogData";
import { MdPhoneMissed, MdPhoneInTalk } from "react-icons/md";
import { CgVoicemailR } from "react-icons/cg";
import propTypes from "prop-types";

export const CallDetails = ({
  isOpen,
  onClose,
  from,
  direction,
  via,
  duration,
  call_type,
  created_at,
}) => {
  const { time, date } = extractDateAndTime(created_at);
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
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
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="div"
                  className="text-lg font-medium leading-6 text-gray-900 flex items-center gap-4"
                >
                  <FaCircleUser size={70} />
                  <div>
                    <h3 className="text-4xl">+{from || 9199999999}</h3>
                    <h5 className="text-xs text-gray-400 font-normal">
                      Via aircall {via}
                    </h5>
                  </div>
                </Dialog.Title>
                <div className="flex justify-between items-center">
                  <div className="mt-2">
                    <h2 className="text-2xl font-semibold">{time}</h2>
                    <h4 className="text-sm">{date}</h4>
                  </div>
                  <div>
                    <h3>{direction === "inbound" ? "Incoming" : "Outgoing"}</h3>
                    <h4 className="flex items-center gap-2 text-xs">
                      {call_type === "missed" ? (
                        <MdPhoneMissed className="text-red-400" />
                      ):call_type==="answered" ? (
                        <MdPhoneInTalk className="text-green-500" />
                      ):<CgVoicemailR className="text-green-500"/>}
                      {call_type === "missed"
                        ? "Missed Call"
                        : formatTime(duration)}
                    </h4>
                  </div>
                </div>
                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={onClose}
                  >
                    Got it, thanks!
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

CallDetails.propTypes = {
  isOpen: propTypes.bool,
  onClose: propTypes.func,
  from: propTypes.number,
  direction: propTypes.string,
  via: propTypes.number,
  duration: propTypes.number,
  call_type: propTypes.string,
  created_at: propTypes.string,
};
