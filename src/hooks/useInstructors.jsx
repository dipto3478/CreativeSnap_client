import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxios from "./useAxios";

const useInstructors = () => {
  const { loading, setIsLoader } = useAuth();
  const [axiosSource] = useAxios();
  const { data: instructors = [], refetch } = useQuery({
    queryKey: ["instructors"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSource("/instructors");
      setIsLoader(false);
      return res.data;
    },
  });

  return [instructors, refetch];
};

export default useInstructors;
