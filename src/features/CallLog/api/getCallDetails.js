import axios from "@/lib/axios";
import { useQuery } from "react-query";

const getCallDetails = async (id) => {
  return await axios.get(`activities/${id}`);
};

export const useCallDetails = ({ id, queryKey = [] } = {}) => {
  return useQuery({
    queryFn: () => getCallDetails(id),
    queryKey: ["callDetails", ...queryKey],
  });
};
