import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Image } from 'react-bootstrap';

const ModuleProgress = () => {
  const [answer, setAnswer] = useState('');
  const [tasks, setTasks] = useState([
    {
      title: 'Basic theorem',
      image: 'path/to/image.png',
      description: 'Look at the picture. If side a equals 3cm and side b equals 4cm. How much is side c?'
    },
    {
      title: 'Another theorem',
      image: 'path/to/another_image.png',
      description: 'Look at the picture. If side a equals 5cm and side b equals 12cm. How much is side c?'
    },
    {
      title: 'No image theorem',
      description: 'This theorem does not have an image associated with it.'
    }
    // Další objekty lze přidat zde
  ]);

  const handleAnswerChange = (e) => {
    setAnswer(e.target.value);
  };

  const handleSend = () => {
    // Logika pro odeslání odpovědi
    console.log(answer);
  };

  const handleHint = () => {
    // Logika pro zobrazení nápovědy
    alert('Hint: Use the Pythagorean theorem to find the length of side c.');
  };

  return (
    <Container fluid>
      <Row className="justify-content-center mb-4">
        <Col lg={8}>
          <Card className="mb-3">
            <Card.Header>Pythagorean theorem</Card.Header>
            {tasks.map((task, index) => (
              <React.Fragment key={index}>
                <Card.Body>
                  {index === 0 && <Card.Title>{task.title}</Card.Title>}
                  {task.image && <Image src={task.image} fluid className="mb-3" />}
                  <Card.Text>{task.description}</Card.Text>
                </Card.Body>
                {index < tasks.length - 1 && <hr />}
              </React.Fragment>
            ))}
          </Card>
        </Col>
      </Row>
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
    </Container>
  );
};

export default ModuleProgress;
