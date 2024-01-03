import { MdArchive, MdCallReceived, MdCallMissed } from "react-icons/md";
import { FaCircleUser } from "react-icons/fa6";
import formatTime from "@/util/formatTime";
import { useUpdateCall } from "../api/updateCall";
import queryClient from "@/lib/reactQuery";
import { useState } from "react";
import { Spinner } from "@/components/Spinner";
import { CallDetails } from "./CallDetails";
import { CgVoicemailR } from "react-icons/cg";
import propTypes from "prop-types";
import { toast } from "react-toastify";

export const CallEntry = ({
  created_at,
  call_type,
  is_archived,
  from,
  id,
  direction,
  via,
  duration,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { mutateAsync: updateCallMutation } = useUpdateCall();
  const handleArchieve = async (e) => {
    e.stopPropagation();
    try {
      setLoading(true);
      await updateCallMutation({ id: id, isArchived: !is_archived });
      await queryClient.refetchQueries("allCalls");
      toast.success("Yayy! entry updated successfully", {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      toast.error("Ooops! Some error has occured", {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const handleClick = () => {
    setIsOpen(true);
  };
  return (
    <>
      <CallDetails
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        from={from}
        direction={direction}
        via={via}
        duration={duration}
        created_at={created_at}
        call_type={call_type}
      />
      <article
        onClick={handleClick}
        to={id}
        className="flex hover:text-inherit text-inherit gap-4 items-center px-4 py-3 cursor-pointer border rounded-lg shadow-sm hover:bg-[#f2f2f2]"
      >
        <FaCircleUser size={34} />
        <div className="flex flex-col flex-1">
          <h2 className="text-md font-semibold">{from || 99999999}</h2>
          <div className="flex items-center gap-1">
            {call_type === "missed" ? (
              <MdCallMissed size={18} className="text-red-500" />
            ) : call_type === "voicemail" ? (
              <CgVoicemailR size={18} className="text-green-500" />
            ) : (
              <MdCallReceived size={18} className="text-green-500" />
            )}
            <h3 className="text-sm text-gray-500">{formatTime(created_at)}</h3>
          </div>
        </div>
        <button
          className="bg-transparent p-0 hover:border-0 border-0 focus:outline-none hover:opacity-80"
          onClick={handleArchieve}
        >
          {loading ? (
            <Spinner />
          ) : (
            <MdArchive size={22} className={is_archived ? "rotate-180" : ""} />
          )}
        </button>
      </article>
    </>
  );
};

CallEntry.propTypes = {
  created_at: propTypes.string,
  call_type: propTypes.string,
  is_archived: propTypes.bool,
  from: propTypes.number,
  id: propTypes.string,
  direction: propTypes.string,
  to: propTypes.number,
  via: propTypes.number,
  duration: propTypes.number,
};
