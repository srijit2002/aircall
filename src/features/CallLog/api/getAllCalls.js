import axios from "@/lib/axios";
import { useQuery } from "react-query";

const getAllCalls = async () => {
  return await axios.get("activities");
};

export const useAllCalls = ({ queryKey = [] } = {}) => {
  return useQuery({
    queryFn: getAllCalls,
    queryKey: ["allCalls", ...queryKey],
  });
};
