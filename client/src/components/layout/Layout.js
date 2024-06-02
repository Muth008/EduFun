import { Outlet } from "react-router-dom";
import NavBar from "../navBar/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "../footer/Footer";
import "../../assets/css/layout/Layout.css";
import InfoPopup from "../infoModal/InfoModal";
import ModalContext from "../../context/ModalContext";
import { useContext } from "react";

function Layout() {
    const { modal, hideModal } = useContext(ModalContext);

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
            <InfoPopup show={modal.show} handleClose={hideModal} title={modal.title} message={modal.message} buttons={modal.buttons}/>
        </>
    );
}

export default Layout;
