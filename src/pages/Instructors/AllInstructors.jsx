import Loading from "../../Shared/Loading/Loading";
import useAuth from "../../hooks/useAuth";
import useInstructors from "../../hooks/useInstructors";

const AllInstructors = () => {
  const { isLoader } = useAuth();
  const [instructors] = useInstructors();
  console.log(instructors);
  return (
    <div>
      {isLoader ? (
        <>
          <Loading />
        </>
      ) : (
        <>
          <section className="grid grid-cols-1 justify-center md:grid-cols-2 lg:grid-cols-3 place-items-center gap-5 p-5">
            {instructors.map((instructor) => (
              <div
                key={instructor?._id}
                className="relative h-[400px] w-[300px] rounded-md"
              >
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
            ))}
          </section>
        </>
      )}
    </div>
  );
};

export default AllInstructors;
