import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Container } from 'react-bootstrap';
import { taskItemContentTypes, taskItemTypes } from '../../data/constants';

const emptyItem = { name: '', type: '', contentType: 'text', content: '' }

const TaskItemModal = ({ show, handleClose, taskItem, saveTaskItem }) => {
    const [localTaskItem, setLocalTaskItem] = useState(taskItem || emptyItem);
    const [selectedFile, setSelectedFile] = useState(null);
    const [validated, setValidated] = useState(false); 

    const handleSave = async (e) => {
        const form = e.currentTarget;
        e.preventDefault();

        if (!form.checkValidity()) { 
            setValidated(true); 
            return; 
        }

        saveTaskItem(localTaskItem, selectedFile);
        handleClose();
    };

    useEffect(() => {
        setLocalTaskItem(taskItem || emptyItem);
        setSelectedFile(null);
    }, [show, taskItem]);

    return (
        <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Task item</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Form noValidate validated={validated} onSubmit={handleSave}>
                        <Form.Group controlId="taskItemName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                value={localTaskItem?.name}
                                onChange={(e) => setLocalTaskItem({ ...localTaskItem, name: e.target.value })}
                            />
                            <Form.Control.Feedback type="invalid"> 
                                Enter name of the task item
                            </Form.Control.Feedback> 
                        </Form.Group>
                        <Form.Group controlId="taskItemType">
                            <Form.Label>Type</Form.Label>
                            <Form.Control
                                required
                                as="select"
                                value={localTaskItem?.type}
                                onChange={(e) => setLocalTaskItem({ ...localTaskItem, type: e.target.value })}
                            >
                                <option value='' disabled>*Select a type*</option>
                                {taskItemTypes.map((type, index) => (
                                    <option key={index} value={type}>{type}</option>
                                ))}
                            </Form.Control>
                            <Form.Control.Feedback type="invalid"> 
                                Select a type of the task item
                            </Form.Control.Feedback> 
                        </Form.Group>
                        <Form.Group controlId="taskItemContentType">
                            <Form.Label>Content type</Form.Label>
                            <Form.Control
                                as="select"
                                value={localTaskItem?.contentType}
                                onChange={(e) => setLocalTaskItem({ ...localTaskItem, contentType: e.target.value })}
                            >
                                {taskItemContentTypes.map((type, index) => (
                                    <option key={index} value={type}>{type}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="taskItemContent">
                            <Form.Label>Content</Form.Label>
                            {/* Display image preview and file input if content type is an image */}
                            {(localTaskItem?.contentType === 'image') ? (
                                <>
                                    {localTaskItem.content && typeof localTaskItem.content == 'string'  && (
                                        <div className="image-container">
                                            <img className="image-preview" src={localTaskItem.content} alt="item" />
                                            <div className="image-name">image</div>
                                        </div>
                                    )}
                                    <Form.Control
                                        type="file"
                                        accept="image/*"
                                        required={localTaskItem?.contentType === 'image'}
                                        onChange={(e) => {
                                            setSelectedFile(e.target.files[0]);
                                            setLocalTaskItem({ ...localTaskItem, content: e.target.files[0] })}
                                        }
                                    />
                                    <Form.Control.Feedback type="invalid"> 
                                        Add an image
                                    </Form.Control.Feedback>
                                </>
                            ) : (
                                <>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        required={localTaskItem?.contentType === 'text'}
                                        value={localTaskItem?.content}
                                        onChange={(e) => setLocalTaskItem({ ...localTaskItem, content: e.target.value })}
                                    />
                                    <Form.Control.Feedback type="invalid"> 
                                        Select a type of the task item
                                    </Form.Control.Feedback> 
                                </>
                            )}
                        </Form.Group>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Cancel
                            </Button>
                            <Button variant="success" type="submit">
                                Save
                            </Button>
                         </Modal.Footer>
                    </Form>
                </Container>
            </Modal.Body>

        </Modal>
    );
};

export default TaskItemModal;