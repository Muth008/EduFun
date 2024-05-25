import { useContext, useEffect, useState } from "react";
import { ModulesContext } from "../../context/ModulesContext";
import { TasksContext } from "../../context/TasksContext";
import { useNavigate, useParams } from "react-router-dom";
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
    const navigate = useNavigate();
    const { moduleList, handlerMap } = useContext(ModulesContext);
    const { taskList } = useContext(TasksContext);
    const { id } = useParams();

    const emptyModule = {
        name: "",
        description: "",
        active: false,
        tasks: [],
    };

    const [activeModule, setActiveModule] = useState(emptyModule);
    const [updatedTasks, setUpdatedTasks] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const moduleData = {
            id: activeModule.id,
            name: activeModule.name,
            description: activeModule.description,
            active: activeModule.active,
            tasks: activeModule.tasks.map(task => ({ id: task.id, order: task.order })),
        };
    
        const handleRequest = moduleData.id ? handlerMap.handleUpdate : handlerMap.handleCreate;
    
        if (activeModule.image) {
            const reader = new FileReader();
            reader.onloadend = async () => {
                moduleData.image = reader.result;
                const response = await handleRequest(moduleData);
                handleResponse(response);
            };
            reader.readAsDataURL(activeModule.image);
        } else {
            const response = await handleRequest(moduleData);
            handleResponse(response);
        }
    };
    
    const handleResponse = (response) => {
        console.log(response);
        if (response.state === 'error') {
            console.error(response.error);
        } else {
            console.log(response.data);
        }
    };
    const handleCancel = () => {
        navigate('/');
    };

    const handleTaskDelete = (taskId) => {
        const newTasks = activeModule.tasks.filter(
            (task) => task.id !== taskId
        );
        setActiveModule({ ...activeModule, tasks: newTasks });
    };

    const handleAddTask = () => {
        setIsModalOpen(true);
    };

    const updateModuleTasks = (module) => {
        module.tasks = module.tasks.map((moduleTask) => {
            const task = taskList.find((task) => task.id === moduleTask.id);
            return { ...task, order: moduleTask.order };
        });
        return module;
    };

    useEffect(() => {
        let module = moduleList.find((module) => module.id === id);
        if (!module) {
            setActiveModule(emptyModule);
            setUpdatedTasks([]);
        } else {
            let updatedModule = updateModuleTasks(module);
            setActiveModule(updatedModule);
            setUpdatedTasks(updatedModule.tasks);
        }
    }, [id, moduleList, taskList]);

    useEffect(() => {
        setActiveModule(prevModule => ({ ...prevModule, tasks: updatedTasks }));
    }, [updatedTasks]);

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
                                            placeholder="Module name"
                                            value={activeModule?.name}
                                            onChange={e => setActiveModule({ ...activeModule, name: e.target.value })}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="moduleDescription">
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={3}
                                            placeholder="Module description"
                                            value={activeModule?.description}
                                            onChange={e => setActiveModule({ ...activeModule, description: e.target.value })}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="moduleImage">
                                        <Form.Label>Image</Form.Label>
                                        {/* {activeModule.image && 
                                            <div className="image-container">
                                                <img className="image-preview" src={activeModule.image} alt="module" />
                                                <div className="image-name">{activeModule.image?.split("/").pop()}</div>
                                            </div>
                                        } */}
                                        <Form.Control
                                            type="file"
                                            accept="image/*"
                                            onChange={e => setActiveModule({ ...activeModule, image: e.target.files[0] })}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="moduleActive">
                                        <Form.Check
                                            type="checkbox"
                                            label="Active"
                                            checked={activeModule?.active}
                                            onChange={e => setActiveModule({ ...activeModule, active: e.target.checked })}
                                        />
                                    </Form.Group>
                                    <Button
                                        type="submit"
                                        variant="success"
                                        className="mt-3"
                                    >
                                        Save
                                    </Button>
                                    <Button variant="danger" className="mt-3 ml-2" onClick={handleCancel}>
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
                                        {activeModule?.tasks.map((task) => (
                                            <ListGroup.Item key={task.id}>
                                                <Row>
                                                    <Col>
                                                        <strong>{task.name}</strong>
                                                        <p>{task.description}</p>
                                                    </Col>
                                                    <Col xs="auto">
                                                        <Button
                                                            variant="danger"
                                                            onClick={() => handleTaskDelete(task.id)}
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
            <ModuleTasksModal 
                show={isModalOpen} 
                handleClose={() => { setIsModalOpen(false); }} 
                tasks={activeModule?.tasks} 
                setTasks={setUpdatedTasks} 
            />
        </>
    );
}

export default ModuleEdit;
