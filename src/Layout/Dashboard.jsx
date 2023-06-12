import { CreditCard, Home, School, UserCircle, Users } from "lucide-react";
import { Link, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Dashboard = () => {
  const { role } = useAuth();

  return (
    <div className="flex w-full bg-[#EEE2DE]  ">
      <aside className="flex  h-screen    w-1/5    flex-col uto  px-5 py-8 ">
        <Link
          to="/"
          className="font-bold text-xl text-center border-4 border-black px-2 py-1  border-dotted "
        >
          Creative Snap
        </Link>
        <div className="mt-6 flex flex-1 flex-col justify-between">
          <nav className="-mx-3 space-y-6 ">
            <div className="space-y-3  ">
              <Link
                className="flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
                to="/dashboard/myprofile"
              >
                <UserCircle className="h-5 w-5" aria-hidden="true" />
                <span className="mx-2 text-sm font-medium">My Profile</span>
              </Link>
              {!role && (
                <Link
                  className="flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
                  to="/dashboard/history"
                >
                  <CreditCard className="h-5 w-5" aria-hidden="true" />
                  <span className="mx-2 text-sm font-medium">
                    Payment History
                  </span>
                </Link>
              )}
              {!role && (
                <Link
                  className="flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
                  to="/dashboard/myclasses"
                >
                  <School className="h-5 w-5" aria-hidden="true" />
                  <span className="mx-2 text-sm font-medium">My Classes</span>
                </Link>
              )}
              {role === "admin" && (
                <Link
                  className="flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
                  to="/dashboard/allusers"
                >
                  <Users className="h-5 w-5" aria-hidden="true" />
                  <span className="mx-2 text-sm font-medium">All Users</span>
                </Link>
              )}
              {role === "admin" && (
                <Link
                  className="flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
                  to="/dashboard/allclasses"
                >
                  <School className="h-5 w-5" aria-hidden="true" />
                  <span className="mx-2 text-sm font-medium">
                    Manage Classes
                  </span>
                </Link>
              )}
              {role === "instructor" && (
                <Link
                  className="flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
                  to="/dashboard/addclasses"
                >
                  <School className="h-5 w-5" aria-hidden="true" />
                  <span className="mx-2 text-sm font-medium">Add Classes</span>
                </Link>
              )}
              {role === "instructor" && (
                <Link
                  className="flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
                  to="/dashboard/myaddedclasses"
                >
                  <School className="h-5 w-5" aria-hidden="true" />
                  <span className="mx-2 text-sm font-medium">
                    My Add Classes
                  </span>
                </Link>
              )}
            </div>
            <hr className="border-2 border-black" />
            <div className="space-y-3 ">
              <Link
                className="flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
                to="/"
              >
                <Home className="h-5 w-5" aria-hidden="true" />
                <span className="mx-2 text-sm font-medium">Home</span>
              </Link>
              <Link
                className="flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
                to="/instructors"
              >
                <Users className="h-5 w-5" aria-hidden="true" />
                <span className="mx-2 text-sm font-medium">Instructors</span>
              </Link>
              <Link
                className="flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
                to="/classes"
              >
                <School className="h-5 w-5" aria-hidden="true" />
                <span className="mx-2 text-sm font-medium">Classes</span>
              </Link>
            </div>
          </nav>
        </div>
      </aside>
      <section className=" flex flex-col bg-white items-center justify-center   w-4/5">
        <Outlet />
      </section>
    </div>
  );
};

export default Dashboard;
