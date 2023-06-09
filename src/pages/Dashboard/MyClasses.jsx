import { Trash } from "lucide-react";
import useSelectedClasses from "../../hooks/useSelectedClasses";
import { Link } from "react-router-dom";

const MyClasses = () => {
  const [selected] = useSelectedClasses();
  console.log(selected);

  const totalPrice = selected.reduce((acc, item) => acc + item?.price, 0);

  const handleRemove = (product) => {
    console.log(product);
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
                <div className="flex divide-x text-sm">
                  <button
                    onClick={() => handleRemove(product)}
                    type="button"
                    className="flex items-center  text-red-500 space-x-2 px-3 py-2 pl-0"
                  >
                    <Trash size={16} />
                    <span>Remove</span>
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="space-y-1 text-right">
        <p>
          Total amount:
          <span className="font-semibold"> ${totalPrice}</span>
        </p>
      </div>
      <div className="flex justify-end space-x-4">
        <Link
          to="/classes"
          type="button"
          className="rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        >
          Back to shop
        </Link>
        <button
          type="button"
          className="rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default MyClasses;
