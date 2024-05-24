import React, { useState } from 'react';
import { Modal, Button, Form, Container } from 'react-bootstrap';

const TaskItemModal = ({ show, handleClose, handleSave }) => {
  const [taskItem, setTaskItem] = useState({
    name: 'First question',
    type: 'Question',
    contentType: 'Text',
    content: 'Look at the picture. If side a equals 3cm and side b equals 4cm. How much is side c?'
  });

  const handleContentTypeChange = (e) => {
    const newContentType = e.target.value;
    setTaskItem({ ...taskItem, contentType: newContentType, content: newContentType === 'Image' ? '' : taskItem.content });
  };

  const handleContentChange = (e) => {
    if (taskItem.contentType === 'Image') {
      setTaskItem({ ...taskItem, content: e.target.files[0] });
    } else {
      setTaskItem({ ...taskItem, content: e.target.value });
    }
  };

  const onSave = () => {
    handleSave(taskItem);
    handleClose();
  };

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
                value={taskItem.name}
                onChange={(e) => setTaskItem({ ...taskItem, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="taskItemType">
              <Form.Label>Type</Form.Label>
              <Form.Control
                as="select"
                value={taskItem.type}
                onChange={(e) => setTaskItem({ ...taskItem, type: e.target.value })}
              >
                <option>Question</option>
                <option>Info</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="taskItemContentType">
              <Form.Label>Content type</Form.Label>
              <Form.Control
                as="select"
                value={taskItem.contentType}
                onChange={handleContentTypeChange}
              >
                <option>Text</option>
                <option>Image</option>
                <option>Video</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="taskItemContent">
              <Form.Label>Content</Form.Label>
              {taskItem.contentType === 'Text' ? (
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={taskItem.content}
                  onChange={handleContentChange}
                />
              ) : (
                <Form.Control
                  type="file"
                  onChange={handleContentChange}
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
        <Button variant="success" onClick={onSave}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TaskItemModal;