import axios from "@/lib/axios";
import { useMutation } from "react-query";

const updateCall = async (id, isArchived) => {
  return await axios.patch(`activities/${id}`, { is_archived: isArchived });
};

export const useUpdateCall = ({ id, isArchived, queryKey = [] } = {}) => {
  return useMutation({
    mutationFn: async () => await updateCall(id, isArchived),
    queryKey: ["updateCall", ...queryKey],
  });
};
