import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";

import { toast } from "react-hot-toast";
import { Trash } from "lucide-react";

const MyAddedClasses = () => {
  const { user, loading } = useAuth();
  const [axiosSource] = useAxios();
  const { data: classes = [], refetch } = useQuery({
    queryKey: ["classes"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSource.get(`/classes/${user?.email}`);
      console.log(res.data);
      return res.data;
    },
  });

  const handleRemove = (item) => {
    console.log(item);
    axiosSource.delete(`/classes/${item?._id}`).then((data) => {
      refetch();
      console.log(data);
      toast.success("Successfully deleted");
    });
  };
  return (
    <section className="mt-6 flex flex-col">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div className="overflow-hidden border border-gray-200 md:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-12 py-3.5 text-left text-sm font-normal text-gray-700"
                  >
                    Title
                  </th>

                  <th
                    scope="col"
                    className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                  >
                    Total Enroll
                  </th>

                  <th scope="col" className="relative px-4 py-3.5">
                    Feedback
                  </th>
                  <th scope="col" className="relative px-4 py-3.5">
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {classes.map((person) => (
                  <tr key={person._id}>
                    <td className="whitespace-nowrap px-12 py-4">
                      <div className="text-sm text-gray-900 ">
                        {person?.title}
                      </div>
                      <div className="text-sm text-gray-700">
                        Price: ${person?.price.toFixed(2)}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-4 py-4">
                      <span className="inline-flex rounded-full   text-xs font-semibold leading-5 ">
                        <button
                          className={`px-2 py-1 ${
                            person?.status === "approved"
                              ? "bg-green-500"
                              : "bg-red-500"
                          } text-white`}
                        >
                          {person?.status ? person?.status : "Pending"}
                        </button>
                      </span>
                    </td>

                    <td className="whitespace-nowrap px-4 py-4 text-right text-sm font-medium">
                      {person?.sell_count ? person?.sell_count : 0}
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 text-right text-sm font-medium">
                      {person?.status === "denied" ? person?.feedback : ""}
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 text-right text-sm font-medium">
                      <button
                        onClick={() => handleRemove(person)}
                        className="p-2 text-sm rounded-full bg-red-500 text-white"
                      >
                        <Trash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyAddedClasses;
