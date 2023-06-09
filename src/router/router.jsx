import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import ErrorPages from "../Shared/ErrorPages/ErrorPages";
import Login from "../Shared/Login/Login";
import SignUp from "../Shared/SignUp/SignUp";
import Dashboard from "../Layout/Dashboard";
import PrivateRouter from "./PrivateRouter";
import Home from "../pages/Home/Home/Home";
import AllUsers from "../pages/Dashboard/AllUsers";
import AddClasses from "../pages/Dashboard/AddClasses";
import AllClasses from "../pages/Classes/AllClasses";
import MyProfile from "../pages/Dashboard/MyProfile";
import AllInstructors from "../pages/Instructors/AllInstructors";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPages />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/classes",
        element: <AllClasses />,
      },
      {
        path: "/instructors",
        element: <AllInstructors />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  // Dashboard
  {
    path: "/dashboard",
    element: (
      <PrivateRouter>
        <Dashboard />
      </PrivateRouter>
    ),
    children: [
      {
        path: "/dashboard/allusers",
        element: <AllUsers />,
      },
      {
        path: "/dashboard/addclasses",
        element: <AddClasses />,
      },
      {
        path: "/dashboard/myprofile",
        element: <MyProfile />,
      },
    ],
  },
]);
