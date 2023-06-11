import { Trash } from "lucide-react";
import useSelectedClasses from "../../hooks/useSelectedClasses";
import { Link } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import { toast } from "react-hot-toast";

const MyClasses = () => {
  const [selected, refetch] = useSelectedClasses();
  // console.log(selected);
  const [axiosSource] = useAxios();

  const handleRemove = (product) => {
    // console.log(product);
    axiosSource.delete(`/cards/${product?._id}`).then((data) => {
      refetch();
      console.log(data);
      toast.success("Successfully deleted");
    });
  };
  return (
    <div className="mx-auto flex max-w-3xl flex-col space-y-4 p-6 px-2 sm:p-10 sm:px-2">
      <ul className="flex flex-col divide-y divide-gray-200">
        {selected.map((product) => (
          <li
            key={product?._id}
            className="flex flex-col py-6 sm:flex-row sm:justify-between"
          >
            <div className="flex w-full space-x-2 sm:space-x-4">
              <img
                className="h-20 w-20 flex-shrink-0 rounded object-contain outline-none dark:border-transparent sm:h-32 sm:w-32"
                src={product?.class_img}
                alt={product?.title}
              />
              <div className="flex w-full flex-col justify-between pb-4">
                <div className="flex w-full justify-between space-x-2 pb-2">
                  <div className="space-y-1">
                    <h3 className="text-lg font-semibold leading-snug sm:pr-8">
                      {product?.title}
                    </h3>
                    <p className="text-sm">By {product?.instructor_name}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold">${product?.price}</p>
                  </div>
                </div>
                <div className="flex justify-between divide-x text-sm">
                  <button
                    onClick={() => handleRemove(product)}
                    type="button"
                    className="flex items-center  text-red-500 space-x-2 px-3 py-2 pl-0"
                  >
                    <Trash size={16} />
                    <span>Remove</span>
                  </button>
                  <Link
                    to={`/dashboard/payment/${product?._id}`}
                    type="button"
                    className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  >
                    Pay
                  </Link>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyClasses;
