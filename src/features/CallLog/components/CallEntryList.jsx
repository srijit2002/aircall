import { CallEntry } from "./CallEntry";
import propTypes from "prop-types";


export const CallEntryList = ({ data, date }) => {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-xs bg-gradient-to-t from-[#3d74c8] to-[#7db0fc] to-light-blue w-fit px-2.5 py-1.5 font-semibold text-white rounded-md">
        {date}
      </h2>
      {data?.map((call) => (
        <CallEntry key={call.id} {...call} />
      ))}
    </section>
  );
};

CallEntryList.propTypes = {
  data: propTypes.array,
  date: propTypes.string,
};
