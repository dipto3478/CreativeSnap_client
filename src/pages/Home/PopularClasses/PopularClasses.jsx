import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxios from "../../../hooks/useAxios";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

const PopularClasses = () => {
  const { role, user, loading } = useAuth();
  const [axiosSource] = useAxios();

  const { data: classes = [] } = useQuery({
    queryKey: ["classes"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSource.get("/classes/popular");
      // console.log(res.data);
      return res.data;
    },
  });
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
    <div className="my-16">
      <h3 className="text-4xl font-semibold text-center my-5">
        Popular classes
      </h3>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-5">
        {classes.map((card) => (
          <div
            key={card?._id}
            className={`w-full ${
              role === "admin" || role === "instructor"
                ? "bg-red-500 text-white"
                : ""
            }  rounded-md border`}
          >
            <img
              src={card?.image}
              alt="Laptop"
              className="h-[200px] w-full rounded-md object-cover"
            />
            <div className="p-4">
              <h1 className="text-lg font-semibold">{card?.title}</h1>
              <div className="flex items-center  justify-between space-y-2 gap-2">
                <p>Enroll by: {card?.sell_count} students</p>
                <div className="flex items-center gap-2">
                  <p className="mt-3 text-sm text-gray-600">
                    by {card?.instructor_name}
                  </p>
                  <img
                    className=" h-8 w-8 rounded-full"
                    src={card?.instructor_img}
                    alt={card?.instructor_name}
                  />
                </div>
              </div>
              <div className="flex items-center  justify-between">
                {user?.email || role === "admin" || role === "instructor" ? (
                  <>
                    <button
                      onClick={() => handleAddToCard(card)}
                      disabled={
                        role === "admin" ||
                        role === "instructor" ||
                        card?.Available_seats === 0
                      }
                      type="button"
                      className={`mt-4 rounded-sm  bg-black  px-3 py-2 text-[14px] font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black`}
                    >
                      Enroll Now
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      type="button"
                      className={`mt-4 rounded-sm bg-black px-3 py-2 text-[14px] font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black`}
                    >
                      Enroll Now
                    </Link>
                  </>
                )}

                <p className="font-bold">
                  Available seats: {card?.Available_seats}
                </p>
                <p className="font-bold">Price: ${card?.price}</p>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default PopularClasses;
