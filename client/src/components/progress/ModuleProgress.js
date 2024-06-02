import React, { useContext, useEffect, useRef, useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Image } from 'react-bootstrap';
import { ModulesContext } from '../../context/ModulesContext';
import { useNavigate, useParams } from 'react-router-dom';
import ModalContext from '../../context/ModalContext';

const ModuleProgress = () => {
    const navigate = useNavigate();
    const { handlerMap } = useContext(ModulesContext);
    const { showModal, hideModal } = useContext(ModalContext);
    const { id } = useParams();

    const [answer, setAnswer] = useState('');
    const [taskItems, setTaskItems] = useState([]);
    const [currentTask, setCurrentTask] = useState(null);
    
    const fetchData = useRef(null);

    const handleAnswerChange = (e) => {
        setAnswer(e.target.value);
    };

    const handleSend = async () => {
        if (!answer) return;
        let response = await handlerMap.handleMakeProgress({ id: id, answer: answer });
        setAnswer('');

        if (!response.data?.success) {
            showModal('Wrong', 'Wrong answer, try again');
            return;
        }

        if (!response.data.finished) { 
            showModal('Correct', 'You have answered correctly! Keep going!')
            fetchData.current();
        } else {
            let finishTime = response.data.finishTime.hours + 'h ' + response.data.finishTime.minutes + 'm ' + response.data.finishTime.seconds + 's';
            showModal('Finished', 'Congratulations! You have finished the module in ' + finishTime);
            navigate("/");
        }

    };

    const handleHint = () => {
        const buttons = [
            { text: 'No', onClick: () => hideModal(), variant: 'secondary' },
            { text: 'Yes', onClick: () => { console.log('call for hint'); hideModal(); } }
        ];
      
        showModal('Hint', 'Are you sure, you want to take an hint?', buttons);
        
        // TODO: logic for hint
    };

    // TODO: logic for answer
    // const handleAnswer = () => {
    //     
    // };

    fetchData.current = async () => {
        let response = await handlerMap.handleGetProgress(id);

        if (response.state === 'error') {
            console.log(response.error);
            return;
        }
        
        setTaskItems(response?.data?.taskItemList);
        setCurrentTask(response?.data?.currentTask);
    };

    useEffect(() => {
        fetchData.current();
    }, [id]);

    return (
        <Container fluid>
            <Row className="justify-content-center mb-4">
                <Col lg={8}>
                    <Card className="mb-3">
                        <Card.Header>{currentTask ? currentTask.name : 'No task in module'}</Card.Header>
                        {taskItems?.map((task, index) => (
                            <React.Fragment key={index}>
                                <Card.Body>
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
                                    <Col sm={4} className="text-right">
                                        <Button variant="success" onClick={handleSend} className="mr-2">
                                        Send
                                        </Button>
                                        <Button variant="warning" onClick={handleHint}>
                                        Hint
                                        </Button>
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
};

export default ModuleProgress;
