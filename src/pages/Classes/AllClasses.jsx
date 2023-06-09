import useAuth from "../../hooks/useAuth";
import useClasses from "../../hooks/useClasses";

const AllClasses = () => {
  const { role } = useAuth();
  const [classes] = useClasses();
  console.log(classes);
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-5">
      {classes.map((card) => (
        <div key={card?._id} className="w-full  rounded-md border">
          <img
            src={card?.image}
            alt="Laptop"
            className="h-[200px] w-full rounded-md object-cover"
          />
          <div className="p-4">
            <h1 className="text-lg font-semibold">{card?.title}</h1>
            <div className="flex items-center justify-end space-y-2 gap-2">
              <p className="mt-3 text-sm text-gray-600">
                by {card?.instructor_name}
              </p>
              <img
                className=" h-8 w-8 rounded-full"
                src={card?.instructor_img}
                alt={card?.instructor_name}
              />
            </div>
            <div className="flex items-center  justify-between">
              <button
                disabled={role === "admin" || role === "instructor"}
                type="button"
                className={`mt-4 rounded-sm  ${
                  role === "admin" || role === "instructor"
                    ? "bg-red-500"
                    : "bg-black"
                }  px-3 py-2 text-[14px] font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black`}
              >
                Enroll Now
              </button>
              <p className="font-bold">
                Available seats: {card?.Available_seats}
              </p>
              <p className="font-bold">Price: ${card?.price}</p>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default AllClasses;
