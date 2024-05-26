import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Container } from 'react-bootstrap';

const TaskItemModal = ({ show, handleClose, taskItem, saveTaskItem }) => {
    const emptyItem = { name: '', type: '', contentType: 'text', content: '' }
    const [localTaskItem, setLocalTaskItem] = useState(taskItem || emptyItem);
    const [selectedFile, setSelectedFile] = useState(null);

    const handleSave = () => {
        saveTaskItem(localTaskItem, selectedFile);
        handleClose();
    };

    useEffect(() => {
        setLocalTaskItem(taskItem || emptyItem);
    }, [show, taskItem]);

    return (
        <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Task item</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Form>
                        <Form.Group controlId="taskItemName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={localTaskItem?.name}
                                onChange={(e) => setLocalTaskItem({ ...localTaskItem, name: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="taskItemType">
                            <Form.Label>Type</Form.Label>
                            <Form.Control
                                as="select"
                                value={localTaskItem?.type}
                                onChange={(e) => setLocalTaskItem({ ...localTaskItem, type: e.target.value })}
                            >
                                <option value='' disabled>*Select a type*</option>
                                <option value={'question'}>question</option>
                                <option value={'answer'}>answer</option>
                                <option value={'info'}>info</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="taskItemContentType">
                            <Form.Label>Content type</Form.Label>
                            <Form.Control
                                as="select"
                                value={localTaskItem?.contentType}
                                onChange={(e) => setLocalTaskItem({ ...localTaskItem, contentType: e.target.value })}
                            >
                                <option>text</option>
                                <option>image</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="taskItemContent">
                            <Form.Label>Content</Form.Label>
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
                                        onChange={(e) => {
                                            setSelectedFile(e.target.files[0]);
                                            setLocalTaskItem({ ...localTaskItem, content: e.target.files[0] })}
                                        }
                                    />
                                </>
                            ) : (
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    value={localTaskItem?.content}
                                    onChange={(e) => setLocalTaskItem({ ...localTaskItem, content: e.target.value })}
                                />
                            )}
                        </Form.Group>
                    </Form>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="success" onClick={handleSave}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default TaskItemModal;