import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import ErrorPages from "../Shared/ErrorPages/ErrorPages";
import Login from "../Shared/Login/Login";
import SignUp from "../Shared/SignUp/SignUp";
import Dashboard from "../Layout/Dashboard";
import PrivateRouter from "./PrivateRouter";
import Home from "../pages/Home/Home/Home";

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
  },
]);
