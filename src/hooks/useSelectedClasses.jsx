import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxios from "./useAxios";

const useSelectedClasses = () => {
  const { user, loading } = useAuth();
  const [axiosSource] = useAxios();
  const { data: selected = [], refetch } = useQuery({
    queryKey: ["selected"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSource(`/cards/${user?.email}`);
      return res.data;
    },
  });

  return [selected, refetch];
};

export default useSelectedClasses;
