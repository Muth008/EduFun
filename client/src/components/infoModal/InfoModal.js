import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const InfoModal = ({ show, handleClose, title, message, buttons }) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{message}</Modal.Body>
            <Modal.Footer>
                {buttons?.map((button, index) => (
                    <Button key={index} variant={button.variant || "primary"} onClick={button.onClick}>
                        {button.text}
                    </Button>
                ))}
            </Modal.Footer>
        </Modal>
    );
};

export default InfoModal;