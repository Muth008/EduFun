import { useContext, useEffect, useState } from "react";
import { ModulesContext } from "../../context/ModulesContext";
import { useParams } from "react-router-dom";
import {
    Container,
    Row,
    Col,
    Form,
    Button,
    Card,
    ListGroup,
} from "react-bootstrap";
import ModuleTasksModal from "./ModuleTasksModal";

function ModuleEdit() {
    const { moduleList } = useContext(ModulesContext);
    const [activeModule, setActiveModule] = useState(null);
    const { id } = useParams();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [moduleName, setModuleName] = useState("");
    const [moduleDescription, setModuleDescription] = useState("");
    const [moduleImage, setModuleImage] = useState(null);
    const [isActive, setIsActive] = useState(false);
    const [tasks, setTasks] = useState([
        {
            id: 1,
            name: "Paythagorean theorem - basics",
            description: "First task of Pythagorean basics",
        },
    ]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const moduleData = {
            name: moduleName,
            description: moduleDescription,
            image: moduleImage,
            active: isActive,
            tasks: tasks,
        };
        console.log(moduleData);
        // Here you can send the data to your server or handle it as needed
    };

    const handleTaskDelete = (taskId) => {
        setTasks(tasks.filter((task) => task.id !== taskId));
    };

    const handleAddTask = () => {
        setIsModalOpen(true);
        // const newTask = {
        //     id: tasks.length + 1,
        //     name: `New Task ${tasks.length + 1}`,
        //     description: `Description for task ${tasks.length + 1}`,
        // };
        // setTasks([...tasks, newTask]);
    };

    useEffect(() => {
        setActiveModule(moduleList.find((module) => module.id === id));
    }, [id, moduleList]);

    return (
        <>
        <Container fluid>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col lg={6}>
                        <Card className="mb-3">
                            <Card.Header>Create new module</Card.Header>
                            <Card.Body>
                                <Form.Group controlId="moduleName">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Pythagorean theorem"
                                        value={moduleName}
                                        onChange={(e) =>
                                            setModuleName(e.target.value)
                                        }
                                    />
                                </Form.Group>
                                <Form.Group controlId="moduleDescription">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        placeholder="Learn what the Pythagorean theorem is and how to use it"
                                        value={moduleDescription}
                                        onChange={(e) =>
                                            setModuleDescription(e.target.value)
                                        }
                                    />
                                </Form.Group>
                                <Form.Group controlId="moduleImage">
                                    <Form.Label>Image</Form.Label>
                                    <Form.Control
                                        type="file"
                                        onChange={(e) =>
                                            setModuleImage(e.target.files[0])
                                        }
                                    />
                                </Form.Group>
                                <Form.Group controlId="moduleActive">
                                    <Form.Check
                                        type="checkbox"
                                        label="Active"
                                        checked={isActive}
                                        onChange={(e) =>
                                            setIsActive(e.target.checked)
                                        }
                                    />
                                </Form.Group>
                                <Button
                                    type="submit"
                                    variant="success"
                                    className="mt-3"
                                >
                                    Save
                                </Button>
                                <Button variant="danger" className="mt-3 ml-2">
                                    Cancel
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col lg={6}>
                        <Card>
                            <Card.Header>Task list</Card.Header>
                            <Card.Body>
                                <ListGroup>
                                    {tasks.map((task) => (
                                        <ListGroup.Item key={task.id}>
                                            <Row>
                                                <Col>
                                                    <strong>{task.name}</strong>
                                                    <p>{task.description}</p>
                                                </Col>
                                                <Col xs="auto">
                                                    <Button
                                                        variant="danger"
                                                        onClick={() =>
                                                            handleTaskDelete(
                                                                task.id
                                                            )
                                                        }
                                                    >
                                                        Delete
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                                <Button variant="primary" className="mt-3" onClick={handleAddTask}>Add Task</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Form>
        </Container>
        <ModuleTasksModal show={isModalOpen} handleClose={() => setIsModalOpen(false)} />
        </>
    );
}

export default ModuleEdit;
