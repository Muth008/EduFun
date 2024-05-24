

import { Container, Row, Col, Card, Form, Button, ListGroup } from 'react-bootstrap';
import { useContext, useEffect, useState } from "react";
import { TasksContext } from "../../context/TasksContext";
import { useParams } from "react-router-dom";
import TaskItemModal from './TaskItemModal';

function TaskEdit() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { taskList } = useContext(TasksContext);
    const [activeTask, setActiveTask] = useState(null);
    const { id } = useParams();

  const [taskInfo, setTaskInfo] = useState({
    name: 'Pythagorean theorem - basics',
    description: 'First task of Pythagorean basics'
  });

  const [taskItems, setTaskItems] = useState([
    {
      order: 1,
      name: 'First info',
      type: 'Info',
      contentType: 'Text'
    }
  ]);

  const handleAddTaskItem = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    setActiveTask(taskList.find((task) => task.id === id));
}, [id, taskList]);

  return (
    <>
    <Container fluid>
      <Row>
        <Col lg={6}>
          <Card className="mb-3">
            <Card.Header>Create new task</Card.Header>
            <Card.Body>
              <Form>
                <Form.Group controlId="taskName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={taskInfo.name}
                    onChange={(e) => setTaskInfo({ ...taskInfo, name: e.target.value })}
                  />
                </Form.Group>
                <Form.Group controlId="taskDescription">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={taskInfo.description}
                    onChange={(e) => setTaskInfo({ ...taskInfo, description: e.target.value })}
                  />
                </Form.Group>
                <Button variant="success">Save</Button>
                <Button variant="danger" className="ml-2">Cancel</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={6}>
          <Card>
            <Card.Header>Task items</Card.Header>
            <Card.Body>
              <ListGroup>
                {taskItems.map((item, index) => (
                  <ListGroup.Item key={index}>
                    <Row>
                      <Col xs={2}>Order {item.order}</Col>
                      <Col xs={6}>
                        <div><strong>Name: </strong>{item.name}</div>
                        <div><strong>Type: </strong>{item.type}</div>
                        <div><strong>Content type: </strong>{item.contentType}</div>
                      </Col>
                      <Col xs={4} className="text-right">
                        <Button variant="success" size="sm" className="mr-2">Edit</Button>
                        <Button variant="danger" size="sm">Delete</Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
              <Button variant="primary" className="mt-3" onClick={handleAddTaskItem}>Add Item</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    <TaskItemModal show={isModalOpen} handleClose={() => setIsModalOpen(false)} />
    </>
  );
};


export default TaskEdit;
