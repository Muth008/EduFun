import React, { useContext, useEffect, useRef, useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Image } from 'react-bootstrap';
import { ModulesContext } from '../../context/ModulesContext';
import { useNavigate, useParams } from 'react-router-dom';
import ModalContext from '../../context/ModalContext';
import "../../assets/css/layout/Layout.css";
import Icon from "@mdi/react";
import { mdiLoading } from "@mdi/js";

const ModuleProgress = () => {
    const navigate = useNavigate();
    const { handlerMap } = useContext(ModulesContext);
    const { showModal, hideModal } = useContext(ModalContext);
    const { id } = useParams();

    const [answer, setAnswer] = useState('');
    const [taskItems, setTaskItems] = useState([]);
    const [currentTask, setCurrentTask] = useState(null);
    const [loadingState, setLoadingState] = useState('pending');
    
    const fetchData = useRef(null);

    const handleAnswerChange = (e) => {
        setAnswer(e.target.value);
    };

    const handleSend = async () => {
        if (!answer && currentTask.answerExists) return;

        // Send answer to server
        const response = await handlerMap.handleMakeProgress({ id: id, answer: answer });
        setAnswer('');

        // answer is wrong
        if (!response.data?.success) {
            showModal('Wrong', 'Wrong answer, try again');
            return;
        }

        if (!response.data.finished) { 
            // answer is correct and module is not finished
            if (currentTask.answerExists) {
                // if there was an answer in previous task, show confirmation
                showModal('Correct', 'You have answered correctly! Keep going!')
            }
            fetchData.current();
        } else {
            // answer is correct and module is finished
            let finishTime = response.data.finishTime.hours + 'h ' + response.data.finishTime.minutes + 'm ' + response.data.finishTime.seconds + 's';
            showModal('Finished', 'Congratulations! You have finished the module in ' + finishTime);
            navigate("/");
        }

    };

    // helper functions for handling hint and solution (assign buttons and text to modal)
    const handleHelp = (type, title) => {
        const buttons = [
            { text: 'No', onClick: hideModal, variant: 'secondary' },
            { text: 'Yes', onClick: async () => { 
                await handlerMap.handleMakeProgress({ id, [type]: true });
                fetchData.current();
                hideModal(); 
                setTimeout(() => {
                    window.scrollTo(0,document.body.scrollHeight);
                }, 500);
            }}
        ];
        showModal(title, `Are you sure, you want to take a ${type}?`, buttons);
    };

    const handleHint = () => handleHelp('hint', 'Hint');
    const handleSolution = () => handleHelp('solution', 'Solution');

    fetchData.current = async () => {
        setLoadingState('pending');
        let response = await handlerMap.handleGetProgress(id);

        if (response.state === 'error' && response.error.code !== 'moduleTaskNotFound') {
            setLoadingState('error');
            return;
        }
        
        setTaskItems(response?.data?.taskItemList);
        setCurrentTask(response?.data?.currentTask);
        setLoadingState('success');
    };

    useEffect(() => {
        fetchData.current();
    }, [id]);

    switch (loadingState) {
        case 'pending':
            return (
                <div className="loading">
                    <Icon size={2} path={mdiLoading} spin={true} />
                </div>
            );
        case 'success':
            return (
                <Container fluid>
                    <Row className="justify-content-center mb-4">
                        <Col lg={8}>
                            <Card className="mb-3">
                                <Card.Header>{currentTask ? currentTask.name : 'No task in module'}</Card.Header>
                                {taskItems?.map((task, index) => (
                                    <React.Fragment key={index}>
                                        <Card.Body className={task.type === 'hint' ? 'bg-info' : task.type === 'solution' ? 'bg-warning' : ''}>
                                            {task.contentType === 'image' && task.content && <Image src={task.content} fluid className="mb-3" />}
                                            {task.contentType === 'text' && <Card.Text>{task.content}</Card.Text>}
                                        </Card.Body>
                                        {index < taskItems?.length - 1 && <hr />}
                                    </React.Fragment>
                                ))}
                            </Card>
                        </Col>
                    </Row>
                    {taskItems?.length > 0 &&
                        <Row className="justify-content-center">
                            <Col lg={8}>
                                <Card>
                                    <Card.Body>
                                        <Form>
                                            <Form.Group as={Row} controlId="formAnswer">
                                                {currentTask.answerExists &&
                                                    <>
                                                        <Form.Label column sm={2}>
                                                            Answer
                                                        </Form.Label>
                                                        <Col sm={6}>
                                                            <Form.Control
                                                                type="text"
                                                                value={answer}
                                                                onChange={handleAnswerChange}
                                                            />
                                                        </Col>
                                                    </>
                                                }
                                                <Col sm={4} className="text-right">
                                                    <Button variant="success" onClick={handleSend} className="mr-2">
                                                        {currentTask.answerExists ? 'Send' : 'Confirm'}
                                                    </Button>
                                                    {currentTask.hintAvailable && !currentTask.hintUsed &&
                                                        <Button variant="info" onClick={handleHint}>
                                                            Hint
                                                        </Button>
                                                    }
                                                    {/* Show solution after hint was displayed or there is no hint */}
                                                    {currentTask.solutionAvailable && !currentTask.solutionUsed && 
                                                        (!currentTask.hintAvailable || currentTask.hintUsed) &&
                                                        <Button variant="warning" onClick={handleSolution}>
                                                            Solution
                                                        </Button>
                                                    }
                                                </Col>
                                            </Form.Group>
                                        </Form>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    }
                </Container>
            );
        case 'error':
            return (
                <div className="error">
                    <p>Nepodařilo se načíst data</p>
                </div>
            );
        default:
            return null;
    }


};

export default ModuleProgress;
