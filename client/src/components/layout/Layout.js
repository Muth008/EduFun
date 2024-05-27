import { Outlet } from "react-router-dom";
import NavBar from "../navBar/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "../footer/Footer";
import '../../assets/css/layout/Layout.css';

function Layout() {
  return (
    <>
      <div className="sticky-top">
        <NavBar />
      </div>
      <div className="content">
        <Outlet />
      </div>
      <div className="sticky-footer">
        <Footer />
      </div>
    </>
  );
}

export default Layout;