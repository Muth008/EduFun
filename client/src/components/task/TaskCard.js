import React from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import '../../assets/css/task/Task.css';
import { useNavigate } from 'react-router-dom';

function TaskCard(props) {
    const navigate = useNavigate();

    const handleEditClick = () => {
        navigate('/task/' + props.task.id);
    };

    return (
        <Card className="task-card"> 
            <Card.Body>
                <Card.Title>{props.task.name}</Card.Title>
                <Card.Text>{props.task.description}</Card.Text>
                <div className="task-buttons">
                    <Button variant="secondary" onClick={handleEditClick}>Edit</Button>
                </div>
            </Card.Body>
        </Card>
    );
}

export default TaskCard;