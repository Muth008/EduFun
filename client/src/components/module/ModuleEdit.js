import { useCallback, useContext, useEffect, useState } from "react";
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
    Spinner,
} from "react-bootstrap";
import ModuleTasksModal from "./ModuleTasksModal";

const emptyModule = { name: "", description: "", active: false, tasks: [] };

function ModuleEdit() {
    const navigate = useNavigate();
    const { moduleList, handlerMap } = useContext(ModulesContext);
    const { taskList } = useContext(TasksContext);
    const { id } = useParams();

    const [activeModule, setActiveModule] = useState(emptyModule);
    const [updatedTasks, setUpdatedTasks] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [validated, setValidated] = useState(false); 
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        const form = e.currentTarget;
        e.preventDefault();

        if (!form.checkValidity()) { 
            setValidated(true); 
            return; 
        }
        setIsLoading(true);

        const moduleData = {
            id: activeModule.id,
            name: activeModule.name,
            description: activeModule.description,
            active: activeModule.active,
            tasks: activeModule.tasks.map(task => ({ id: task.id, order: task.order })),
        };
    
        const handleRequest = moduleData.id ? handlerMap.handleUpdate : handlerMap.handleCreate;
    
        if (selectedFile) {
            // save file content as base64 string to moduleData.image
            const reader = new FileReader();
            reader.onloadend = async () => {
                moduleData.image = reader.result;
                const response = await handleRequest(moduleData);
                handleResponse(response);
            };
            reader.readAsDataURL(selectedFile);
        } else {
            const response = await handleRequest(moduleData);
            handleResponse(response);
        }
        setIsLoading(false);
    };
    
    const handleResponse = (response) => {
        if (response.state === "success") {
            navigate("/");
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

    // update tasks in module with tasks from taskList
    const updateModuleTasks = useCallback((module) => {
        module.tasks = module.tasks.map((moduleTask) => {
            const task = taskList.find((task) => task.id === moduleTask.id);
            return { ...task, order: moduleTask.order };
        });
        return module;
    }, [taskList]);

    useEffect(() => {
        let module = moduleList.find((module) => module.id === id);
        if (!module) {
            // create new module
            setActiveModule(emptyModule);
            setUpdatedTasks([]);
        } else {
            // update existing module
            let updatedModule = updateModuleTasks(module);
            setActiveModule(updatedModule);
            setUpdatedTasks(updatedModule.tasks);
        }
    }, [id, moduleList, taskList, updateModuleTasks]);

    // update tasks in activeModule when updatedTasks change
    useEffect(() => {
        setActiveModule(prevModule => ({ ...prevModule, tasks: updatedTasks }));
    }, [updatedTasks]);

    return (
        <>
            {isLoading && (
                <div className="spinner-container">
                    <Spinner animation="border" role="status"/>
                </div>
            )}
            <Container fluid>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Row>
                        <Col lg={6}>
                            <Card className="mb-3">
                                <Card.Header>{activeModule?.id ? 'Update' : 'Create'} module</Card.Header>
                                <Card.Body>
                                    <Form.Group controlId="moduleName">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control
                                            required
                                            type="text"
                                            placeholder="Module name"
                                            value={activeModule?.name}
                                            onChange={e => setActiveModule({ ...activeModule, name: e.target.value })}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Enter name of the module
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group controlId="moduleDescription">
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            required
                                            rows={3}
                                            placeholder="Module description"
                                            value={activeModule?.description}
                                            onChange={e => setActiveModule({ ...activeModule, description: e.target.value })}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Enter description of the module
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group controlId="moduleImage">
                                        <Form.Label>Image</Form.Label>
                                        {activeModule.image && 
                                            <div className="image-container">
                                                <img className="image-preview" src={activeModule.image} alt="module" />
                                                <div className="image-name">image</div>
                                            </div>
                                        }
                                        <Form.Control
                                            type="file"
                                            accept="image/*"
                                            onChange={e => setSelectedFile(e.target.files[0])}
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
                                                    <Col xs={2}>Order {task.order}</Col>
                                                    <Col xs={6}>
                                                        <strong>{task.name}</strong>
                                                        <p>{task.description}</p>
                                                    </Col>
                                                    <Col xs={4} className="text-right">
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
