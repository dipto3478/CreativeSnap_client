import { Home, School, LogOut, UserCircle, Users } from "lucide-react";
import { Link, Outlet } from "react-router-dom";
const Dashboard = () => {
  return (
    <>
      <aside className="flex h-screen w-64 flex-col overflow-y-auto  bg-[#EEE2DE] px-5 py-8 border-r-2  border-black">
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
                to="/"
              >
                <UserCircle className="h-5 w-5" aria-hidden="true" />
                <span className="mx-2 text-sm font-medium">My Profile</span>
              </Link>
              <Link
                className="flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
                to="/"
              >
                <Users className="h-5 w-5" aria-hidden="true" />
                <span className="mx-2 text-sm font-medium">All Users</span>
              </Link>
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
            <hr className="border-2 border-black" />
            <div className="space-y-3  mt-auto">
              <p
                className="flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
                href="#"
              >
                <LogOut className="h-5 w-5" aria-hidden="true" />
                <span className="mx-2 text-sm font-medium">Log Out</span>
              </p>
            </div>
          </nav>
        </div>
      </aside>
      <section>
        <Outlet />
      </section>
    </>
  );
};

export default Dashboard;
