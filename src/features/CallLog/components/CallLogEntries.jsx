import { forwardRef } from "react";
import { CallEntryList } from "../components/CallEntryList";
import propTypes from "prop-types";
import { Spinner } from "@/components/Spinner";
import CallPlaceholder from "@/assets/CallPlaceholder.svg";

export const CallLogEntries = forwardRef((props, ref) => {
  const { calls, handleArchive, isLoading, archived } = props;
  if (!calls.length) {
    return (
      <section className="absolute w-60 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center flex-col items-center">
        <img src={CallPlaceholder} alt="No entries found" className="w-60" />
        <h2 className="font-semibold">
          {archived
            ? "Archive list is empty"
            : "Wohoo! Your call history is empty"}
        </h2>
      </section>
    );
  }

  return (
    <section
      ref={ref}
      className="flex flex-col gap-6 overflow-y-auto scrollbar-none"
    >
      <button
        disabled={isLoading}
        onClick={() => handleArchive(archived)}
        className="shadow items-center flex justify-center gap-2 bg-[#f8f8f8] hover:border-0 border-0 outline-0 hover:brightness-95 active:outline-none active:border-0 focus:border-0 focus:outline-none"
      >
        {isLoading ? <Spinner /> : null}
        {archived ? "Un" : ""} Archive All
      </button>
      {calls.map((call) => (
        <CallEntryList key={call.date} data={call.entries} date={call.date} />
      ))}
    </section>
  );
});
CallLogEntries.propTypes = {
  calls: propTypes.array,
  handleArchive: propTypes.func,
  isLoading: propTypes.bool,
  archived: propTypes.bool,
};
CallLogEntries.displayName = "Call Log Entries";
