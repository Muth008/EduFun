import { Outlet } from "react-router-dom";
import NavBar from "../navBar/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";

function Layout() {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}

export default Layout;