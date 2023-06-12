import { Trash } from "lucide-react";
import useUser from "../../hooks/useUser";

import { toast } from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import Loading from "../../Shared/Loading/Loading";
import Swal from "sweetalert2";
import useAxios from "../../hooks/useAxios";

const AllUsers = () => {
  const [users, refetch] = useUser();
  const { isLoading } = useAuth();
  const [axiosSource] = useAxios();

  // console.log(users);
  const handleMakeAdmin = (user) => {
    Swal.fire({
      title: "Are you sure?",

      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSource.patch(`/users/admin/${user?._id}`).then((data) => {
          refetch();
          console.log(data);
          toast.success("Successfully make Admin");
        });
      }
    });
  };

  const handleMakeInstructor = (user) => {
    Swal.fire({
      title: "Are you sure?",

      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSource.patch(`/users/instructor/${user?._id}`).then((data) => {
          refetch();
          console.log(data);
          toast.success("Successfully make Instructor");
        });
      }
    });
  };
  // TODO: remove
  const handleRemove = (user) => {
    Swal.fire({
      title: "Are you sure?",

      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, ",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSource.delete(`/users/${user?._id}`).then((data) => {
          refetch();
          console.log(data);
          toast.success("Successfully User remove");
        });
      }
    });
  };
  return (
    <section>
      {isLoading ? (
        <>
          <Loading />
        </>
      ) : (
        <>
          <div className="w-full px-5  flex flex-col">
            <div className="-mx-4 -my-2  sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className=" border border-gray-200 md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                        >
                          <span>Users</span>
                        </th>
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
                          Role
                        </th>
                        <th scope="col" className="relative px-4 py-3.5">
                          Delete
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {users.map((person) => (
                        <tr key={person?._id}>
                          <td className="whitespace-nowrap px-4 py-4">
                            <div className="flex items-center">
                              <div className="h-10 w-10 flex-shrink-0">
                                <img
                                  className="h-10 w-10 rounded-full object-cover"
                                  src={person?.img}
                                  alt=""
                                />
                              </div>
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-12 py-4">
                            <div className="text-sm text-gray-900 ">
                              {person?.name}
                            </div>
                            <div className="text-sm text-gray-700">
                              {person?.email}
                            </div>
                          </td>

                          <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
                            <button
                              disabled={person?.role === "admin"}
                              className={`rounded-md border ${
                                person?.role === "admin"
                                  ? "bg-green-500 "
                                  : "bg-red-500 "
                              }  px-3 py-2 text-white text-sm font-semibold  shadow-sm `}
                              onClick={() => handleMakeAdmin(person)}
                            >
                              <span className="uppercase">
                                {person?.role === "admin"
                                  ? "admin"
                                  : "make admin"}
                              </span>
                            </button>

                            <button
                              disabled={person?.role === "instructor"}
                              className={`rounded-md border ${
                                person?.role === "instructor"
                                  ? "bg-green-500 "
                                  : "bg-red-500 "
                              }  px-3 py-2 text-white text-sm font-semibold  shadow-sm `}
                              onClick={() => handleMakeInstructor(person)}
                            >
                              <span className="uppercase">
                                {person?.role === "instructor"
                                  ? "instructor"
                                  : "make instructor"}
                              </span>
                            </button>
                          </td>
                          <td className="whitespace-nowrap px-4 py-4 text-right text-sm font-medium">
                            <button
                              onClick={() => handleRemove(person)}
                              type="button"
                              className="rounded-full bg-red-500 px-3 py-3 text-sm font-semibold text-white shadow-sm hover:bg-red/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red"
                            >
                              <Trash className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default AllUsers;
