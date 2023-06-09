import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxios from "./useAxios";

const useClasses = () => {
  const { loading, setIsLoader } = useAuth();
  const [axiosSource] = useAxios();
  const { data: classes = [], refetch } = useQuery({
    queryKey: ["classes"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSource("/classes");
      // console.log(res.data);
      setIsLoader(false);
      return res.data;
    },
  });
  return [classes, refetch];
};

export default useClasses;
