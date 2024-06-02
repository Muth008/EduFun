import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

function FilterModal({
    show,
    type,
    handleClose,
    handleFilterClear,
    handleFilterChange,
    filterCriteria,
}) {
    const [localFilterCriteria, setLocalFilterCriteria] = useState(filterCriteria);

    const handleApply = () => {
        handleFilterChange(localFilterCriteria);
        handleClose();
    };

    const handleClear = () => {
        setLocalFilterCriteria({});
        handleFilterClear();
        handleClose();
    }

    const handleInputChange = (event) => {
        setLocalFilterCriteria({
            ...localFilterCriteria,
            [event.target.name]: event.target.value,
        });
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Filter {type}s</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Search by name"
                            name="name"
                            value={localFilterCriteria?.name || ""}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClear}>
                    Clear
                </Button>
                <Button variant="primary" onClick={handleApply}>
                    Apply
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default FilterModal;
