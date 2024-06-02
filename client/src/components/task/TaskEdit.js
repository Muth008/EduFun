import {
    Container,
    Row,
    Col,
    Card,
    Form,
    Button,
    ListGroup,
    Spinner,
} from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { TasksContext } from "../../context/TasksContext";
import { useNavigate, useParams } from "react-router-dom";
import TaskItemModal from "./TaskItemModal";
import '../../assets/css/task/Task.css';

const emptyTask = { name: "", description: "" };

function TaskEdit() {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { taskList, taskItemsList, handlerMap } = useContext(TasksContext);
    const [activeTask, setActiveTask] = useState(emptyTask);
    const [activeTaskItem, setActiveTaskItem] = useState(null);
    const [validated, setValidated] = useState(false); 
    const [isLoading, setIsLoading] = useState(false);
    const [taskItems, setTaskItems] = useState([]);
    const { id } = useParams();

    // open modal to add task item
    const handleAddTaskItem = () => {
        setActiveTaskItem(null);
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        navigate("/");
    };

    const handleSubmit = async (e) => {
        const form = e.currentTarget;
        e.preventDefault();

        if (!form.checkValidity()) { 
            setValidated(true); 
            return; 
        }

        setIsLoading(true);
        const handleRequest = activeTask.id ? handlerMap.handleUpdate : handlerMap.handleCreate;
        const response = await handleRequest(activeTask, taskItems);
        setIsLoading(false);

        if (response.state === "success") {
            navigate("/");
        }
    }

    const saveTaskItem = (item, selectedFile) => {
        return new Promise((resolve, reject) => {
            if (selectedFile) {
                // save file content as base64 string to item.content
                const reader = new FileReader();
                reader.onloadend = () => {
                    item.content = reader.result;
                    resolve(saveTaskItemHelper(item));
                };
                reader.onerror = reject;
                reader.readAsDataURL(item.content);
            } else {
                resolve(saveTaskItemHelper(item));
            }
        });
    }
    
    const saveTaskItemHelper = (item) => {
        if (item.id) {
            // replace existing task item in taskItems with updated task item
            const updatedTaskItems = taskItems.map((taskItem) => {
                if (taskItem.id === item.id) {
                    return item;
                }
                return taskItem;
            });
            setTaskItems(updatedTaskItems);
        } else {
            // add new task item to taskItems
            const newTaskItem = { ...item, taskId: id, order: taskItems.length + 1 };
            setTaskItems([...taskItems, newTaskItem]);
        }
    }

    const deleteTaskItem = (activeItem) => {
        const updatedTaskItems = taskItems.filter((item) => activeItem.id ? item.id !== activeItem.id : item.name !== activeItem.name);
        updatedTaskItems.forEach((item, index) => { item.order = index + 1; });
        setTaskItems(updatedTaskItems);
    };

    useEffect(() => {
        setActiveTask(taskList.find((task) => task.id === id) || emptyTask);
    }, [id, taskList]);

    useEffect(() => {
        setTaskItems(taskItemsList.filter((item) => item.taskId === id));
    }, [id, taskItemsList]);

    return (
        <>
            {isLoading && (
                <div className="spinner-container">
                    <Spinner animation="border" role="status"/>
                </div>
            )}
            <Container fluid>
                <Row>
                    <Col lg={6}>
                    <Card className="mb-3">
                        <Card.Header>{activeTask?.id ? 'Update' : 'Create'} task</Card.Header>
                        <Card.Body>
                            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                <Form.Group controlId="taskName">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        value={activeTask?.name}
                                        onChange={(e) => setActiveTask({ ...activeTask, name: e.target.value })}
                                    />
                                    <Form.Control.Feedback type="invalid"> 
                                        Enter name of the task
                                    </Form.Control.Feedback> 
                                </Form.Group>
                                <Form.Group controlId="taskDescription">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control
                                        required
                                        as="textarea"
                                        rows={3}
                                        value={activeTask?.description}
                                        onChange={(e) => setActiveTask({ ...activeTask, description: e.target.value })}
                                    />
                                    <Form.Control.Feedback type="invalid"> 
                                        Enter description of the task
                                    </Form.Control.Feedback> 
                                </Form.Group>
                                <Button variant="success" type="submit">Save</Button>
                                <Button variant="danger" className="ml-2" onClick={handleCancel}>
                                    Cancel
                                </Button>
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
                                        <Col>
                                            <div><strong>Name: </strong>{item.name}</div>
                                            <div><strong>Type: </strong>{item.type}</div>
                                            <div><strong>Content type: </strong>{item.contentType}</div>
                                        </Col>
                                        <Col xs="auto">
                                            <Button variant="success"
                                                onClick={() => { setActiveTaskItem(item); setIsModalOpen(true); }}>
                                                    Edit
                                            </Button>
                                            <Button variant="danger"
                                                onClick={() => deleteTaskItem(item)}>
                                                    Delete
                                            </Button>
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
            <TaskItemModal 
                show={isModalOpen} 
                handleClose={() => setIsModalOpen(false)}
                saveTaskItem = {saveTaskItem}
                taskItem = {activeTaskItem}
            />
        </>
    );
}

export default TaskEdit;
