import { CallLogEntries } from "../components/CallLogEntries";
import { useAllCalls } from "../api/getAllCalls";
import formatCallLogData from "../utils/formatCallLogData";
import { Tab } from "@/components/Tab";
import { useUpdateCall } from "../api/updateCall";
import queryClient from "@/lib/reactQuery";
import { useState } from "react";
import { Spinner } from "@/components/Spinner";
import { toast } from "react-toastify";

export const CallLog = () => {
  const { data, isLoading } = useAllCalls();
  const { mutateAsync: updateCallMutation } = useUpdateCall();
  const [archiveLoading, setArchivealoading] = useState(false);
  if (isLoading) {
    return <Spinner />;
  }
  const rawArchivedCalls = data?.data?.filter((call) => call.is_archived) || [];
  const rawUnArchivedCalls =
    data?.data?.filter((call) => !call.is_archived) || [];
  const unArchievedCalls = formatCallLogData(rawUnArchivedCalls);
  const archievedCalls = formatCallLogData(rawArchivedCalls);
  const handleArchive = async (archived) => {
    try {
      setArchivealoading(true);
      if (archived) {
        for (let { id } of rawArchivedCalls) {
          await updateCallMutation({ id, isArchived: false });
        }
      } else {
        for (let { id } of rawUnArchivedCalls) {
          await updateCallMutation({ id, isArchived: true });
        }
      }
      toast.success("Yayy! entries updated successfully", {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      console.log(error);
      toast.error("Ooops! Some error has occured", {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } finally {
      await queryClient.refetchQueries("allCalls");
      setArchivealoading(false);
    }
  };
  return (
    <main className="w-[360px] flex flex-col bg-white min-h-screen max-h-screen">
      <Tab
        data={[
          {
            key: "Recent Calls",
            component: (
              <CallLogEntries
                calls={unArchievedCalls}
                handleArchive={handleArchive}
                isLoading={archiveLoading}
                archived={false}
              />
            ),
          },
          {
            key: "Archived",
            component: (
              <CallLogEntries
                calls={archievedCalls}
                handleArchive={handleArchive}
                isLoading={archiveLoading}
                archived={true}
              />
            ),
          },
        ]}
      />
    </main>
  );
};
