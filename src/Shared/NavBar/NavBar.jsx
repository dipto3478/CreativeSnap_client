import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-hot-toast";

const NavBar = () => {
  const { user, logOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const nav = (
    <>
      <li>
        <Link
          className="inline-flex items-center text-sm font-semibold text-gray-800 hover:text-gray-900"
          to="/"
        >
          Home
        </Link>
      </li>
      <li>
        <Link
          className="inline-flex items-center text-sm font-semibold text-gray-800 hover:text-gray-900"
          to="/instructors"
        >
          Instructors
        </Link>
      </li>
      <li>
        <Link
          className="inline-flex items-center text-sm font-semibold text-gray-800 hover:text-gray-900"
          to="/classes"
        >
          Classes
        </Link>
      </li>
      {user?.email && (
        <li>
          <Link
            className="inline-flex items-center text-sm font-semibold text-gray-800 hover:text-gray-900"
            to="/dashboard"
          >
            Dashboard
          </Link>
        </li>
      )}
    </>
  );

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast.success("successfully logged out");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="relative w-full bg-[#EEE2DE]">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
        <div className="inline-flex items-center space-x-2">
          <Link
            to="/"
            className="font-bold text-xl border-4 border-black px-2 py-1  border-dotted "
          >
            Creative Snap
          </Link>
        </div>
        <div className="hidden lg:block">
          <ul className="ml-12 inline-flex space-x-8">{nav}</ul>
        </div>

        {user?.email ? (
          <>
            <div className="flex grow justify-end">
              <button
                onClick={handleLogOut}
                className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                Log Out
              </button>
            </div>
            <div className="ml-2 mt-2 hidden lg:block">
              <span title={user?.displayName} className="relative inline-block">
                <img
                  className="h-10 w-10 rounded-full"
                  src={user?.photoURL && user?.photoURL}
                  alt={user?.displayName}
                />
                <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-600 ring-2 ring-white"></span>
              </span>
            </div>
          </>
        ) : (
          <>
            <div className="flex grow justify-end">
              <Link
                className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                to="/login"
              >
                Login
              </Link>
            </div>
          </>
        )}

        <div className="ml-2 lg:hidden">
          <Menu onClick={toggleMenu} className="h-6 w-6 cursor-pointer" />
        </div>
        {isMenuOpen && (
          <div className="absolute inset-x-0 top-0 z-50 origin-top-right transform p-2 transition lg:hidden">
            <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="px-5 pb-6 pt-5">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center space-x-2">
                    <Link
                      to="/"
                      className="font-bold text-xl border-4 border-black px-2 py-1  border-dotted "
                    >
                      Creative Snap
                    </Link>
                  </div>
                  <div className="-mr-2">
                    <button
                      type="button"
                      onClick={toggleMenu}
                      className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    >
                      <span className="sr-only">Close menu</span>
                      <X className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </div>
                <div className="mt-6">
                  <nav className="grid gap-y-4">{nav}</nav>
                </div>
                <div className="ml-3 mt-4 flex items-center space-x-2">
                  <img
                    className="inline-block h-10 w-10 rounded-full"
                    src={user?.photoURL && user?.photoURL}
                    alt={user?.displayName}
                  />
                  <span className="flex flex-col">
                    <span className="text-sm font-medium uppercase text-gray-900">
                      {user?.displayName}
                    </span>
                    <span className="text-sm font-medium text-gray-500">
                      {user?.email}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
