import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";
import useAuth from "./useAuth";

const useUser = () => {
  const { loading } = useAuth();
  const [axiosSource] = useAxios();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSource("/users");
      console.log(res.data);
      return res.data;
    },
  });
  return [users, refetch];
};

export default useUser;
