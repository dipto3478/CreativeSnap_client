import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";
import useAuth from "../../../hooks/useAuth";
import { JackInTheBox, Roll } from "react-awesome-reveal";

const PopularInstructor = () => {
  const [axiosSource] = useAxios();
  const { loading } = useAuth();

  const { data: instructors = [] } = useQuery({
    queryKey: ["instructors"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSource.get("/instructors/popular");
      console.log(res.data);
      return res.data;
    },
  });
  return (
    <div className="my-16">
      <h3 className="text-4xl font-semibold text-center my-5">
        Popular Instructors
      </h3>
      <section className="grid grid-cols-1 justify-center md:grid-cols-2 lg:grid-cols-3 place-items-center gap-5 p-5">
        {instructors.map((instructor) => (
          <Roll key={instructor?._id} delay={500}>
            <div className="relative h-[400px] w-[300px] rounded-md">
              <img
                src={instructor?.img}
                className="z-0 h-full w-full rounded-md object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-left">
                <h1 className="text-lg font-semibold text-white">
                  {instructor?.name}
                </h1>
                <p className="mt-2 text-sm uppercase text-gray-300">
                  {instructor?.role}
                </p>
                <p className="mt-2 text-sm uppercase text-gray-300">
                  Email: {instructor?.email}
                </p>
                <p className="mt-2 text-sm uppercase text-gray-300">
                  Enroll by: {instructor?.sell_count} Students
                </p>
              </div>
            </div>
          </Roll>
        ))}
      </section>
    </div>
  );
};

export default PopularInstructor;
