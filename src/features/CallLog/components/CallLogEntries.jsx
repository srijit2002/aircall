import { forwardRef } from "react";
import { CallEntryList } from "../components/CallEntryList";
import propTypes from "prop-types";

export const CallLogEntries = forwardRef((props, ref) => {
  const { calls } = props;
  return (
    <section
      ref={ref}
      className="flex flex-col gap-6 overflow-y-auto scrollbar-none"
    >
      {calls.map((call) => (
        <CallEntryList key={call.date} data={call.entries} date={call.date} />
      ))}
    </section>
  );
});
CallLogEntries.propTypes = {
  calls: propTypes.array,
};
CallLogEntries.displayName = "Call Log Entries";
