import { CallLogEntries } from "../components/CallLogEntries";
import { useAllCalls } from "../api/getAllCalls";
import formatCallLogData from "../utils/formatCallLogData";
import { Tab } from "@/components/Tab";

export const CallLog = () => {
  const { data, isLoading } = useAllCalls();
  if (isLoading) {
    return <h1>loading....</h1>;
  }
  const unArchievedCalls = formatCallLogData(
    data.data.filter((call) => !call.is_archived) || []
  );
  const archievedCalls = formatCallLogData(
    data.data.filter((call) => call.is_archived) || []
  );

  return (
    <main className="w-[360px] flex flex-col bg-white min-h-screen max-h-screen">
      <Tab
        data={[
          {
            key: "Recent Calls",
            component: <CallLogEntries calls={unArchievedCalls} />,
          },
          {
            key: "Archived",
            component: <CallLogEntries calls={archievedCalls} />,
          },
        ]}
      />
    </main>
  );
};
