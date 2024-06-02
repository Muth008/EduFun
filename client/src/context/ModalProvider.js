import { useState } from "react";
import ModalContext from "./ModalContext";

const ModalProvider = ({ children }) => {
    const [modal, setModal] = useState({
        show: false,
        title: "",
        message: "",
        buttons: [],
    });

    const showModal = (title, message, buttons) => {
        setModal({ show: true, title, message, buttons });
    };

    const hideModal = () => {
        setModal({ ...modal, show: false });
    };

    return (
        <ModalContext.Provider value={{ modal, showModal, hideModal }}>
            {children}
        </ModalContext.Provider>
    );
};

export default ModalProvider;