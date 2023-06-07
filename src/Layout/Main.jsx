import { Outlet } from "react-router-dom";
import NavBar from "../Shared/NavBar/NavBar";

const Main = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

export default Main;
