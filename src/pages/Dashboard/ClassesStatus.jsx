import { useQuery } from "@tanstack/react-query";

import { toast } from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import Swal from "sweetalert2";

const ClassesStatus = () => {
  const { loading } = useAuth();
  const [axiosSource] = useAxios();

  const { data: classes = [], refetch } = useQuery({
    queryKey: ["allClasses"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSource.get("/allclasses");
      // console.log(res.data);
      return res.data;
    },
  });

  const handleApproved = (user) => {
    Swal.fire({
      title: "Are you sure?",

      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSource.patch(`/classes/approved/${user?._id}`).then((data) => {
          refetch();
          console.log(data.data);
          toast.success("Successfully Approved");
        });
      }
    });
  };
  const handleReject = (user) => {
    Swal.fire({
      title: "Are you sure?",

      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSource.patch(`/classes/denied/${user?._id}`).then((data) => {
          refetch();
          console.log(data.data);
          toast.success("Successfully Denied");
        });
      }
    });
  };

  const handleFeedback = async (event, person) => {
    event.preventDefault();
    const form = event.target;
    const feedback = form.feedback.value;
    // console.log(feedback);

    const response = await axiosSource.patch(
      `/classes/feedback/${person._id}`,
      { feedback }
    );
    console.log(response.data);
    toast.success("Feedback submitted successfully");
    refetch();
    form.reset();
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
                    className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                  >
                    <span>Instructors</span>
                  </th>
                  <th
                    scope="col"
                    className="px-12 py-3.5 text-left text-sm font-normal text-gray-700"
                  >
                    Details
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
                    Denied
                  </th>
                  <th scope="col" className="relative px-4 py-3.5">
                    Feedback
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {classes.map((person) => (
                  <tr key={person._id}>
                    <td className="whitespace-nowrap px-4 py-4">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <img
                            className="h-10 w-10 rounded-full object-cover"
                            src={person?.instructor_img}
                            alt=""
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {person?.instructor_name}
                          </div>
                          <div className="text-sm text-gray-700">
                            {person?.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-12 py-4">
                      <div className="text-sm text-gray-900 ">
                        {person?.title}
                      </div>
                      <div className="text-sm text-gray-700">
                        Price: ${person?.price.toFixed(2)}
                      </div>
                      <div className="text-sm text-gray-700">
                        Available seats: {person?.Available_seats}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-4 py-4">
                      <span className="inline-flex rounded-full   text-xs font-semibold leading-5 ">
                        <button
                          disabled={
                            person?.status === "approved" ||
                            person?.status === "denied"
                          }
                          onClick={() => handleApproved(person)}
                          className={`px-2 py-1 ${
                            person?.status === "approved"
                              ? "bg-green-500"
                              : "bg-red-500"
                          } text-white uppercase`}
                        >
                          {person?.status ? person?.status : "Pending"}
                        </button>
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
                      <button
                        disabled={
                          person?.status === "approved" ||
                          person?.status === "denied"
                        }
                        onClick={() => handleReject(person)}
                        className="px-2 py-1 uppercase bg-red-500 text-white"
                      >
                        Denied
                      </button>
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 text-right text-sm font-medium">
                      {person?.status === "denied" && (
                        <form
                          onSubmit={(event) => handleFeedback(event, person)}
                          className="flex flex-col gap-2"
                        >
                          <input
                            className="border-2 border-black"
                            type="text"
                            name="feedback"
                          />
                          <button
                            type="submit"
                            className="px-2 py-1 bg-green-500 text-white"
                          >
                            Submit
                          </button>
                        </form>
                      )}
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

export default ClassesStatus;
