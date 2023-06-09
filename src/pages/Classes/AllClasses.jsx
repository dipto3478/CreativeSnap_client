import { toast } from "react-hot-toast";
import Loading from "../../Shared/Loading/Loading";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import useClasses from "../../hooks/useClasses";

const AllClasses = () => {
  const { role, isLoader, user } = useAuth();
  const [classes] = useClasses();
  const [axiosSource] = useAxios();

  // console.log(classes);

  const handleAddToCard = (card) => {
    console.log(card);
    const {
      instructor_name,
      _id,
      email,
      price,
      image,
      title,
      Available_seats,
      instructor_img,
    } = card;

    const cardData = {
      instructor_name,
      class_Id: _id,
      instructor_email: email,
      class_img: image,
      price,
      title,
      Available_seats,
      instructor_img,
      user_email: user?.email,
    };
    axiosSource.post("/cards", cardData).then((data) => {
      console.log(data);
      toast.success("successfully Added card!");
    });
  };

  return (
    <div>
      {isLoader ? (
        <>
          <Loading />
        </>
      ) : (
        <>
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
                      onClick={() => handleAddToCard(card)}
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
        </>
      )}
    </div>
  );
};

export default AllClasses;
