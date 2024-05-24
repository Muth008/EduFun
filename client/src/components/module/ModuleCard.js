import React from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import logo from '../../assets/logo.svg';
import '../../assets/css/module/Module.css';
import { useNavigate } from 'react-router-dom';

function ModuleCard(props) {

    const navigate = useNavigate();

    const handleEditClick = () => {
        navigate('/module/' + props.module.id);
    };

    const handleStartClick = () => {
        navigate('/progress/' + props.module.id);
    }

    return (
        <Card className="module-card"> 
            <Card.Img variant="top" src={props.module.image ?? logo} className="module-card-img" />
            <Card.Body>
                <Card.Title>{props.module.name}</Card.Title>
                <Card.Text>{props.module.description}</Card.Text>
                <div className="module-buttons">
                    <Button variant="secondary" onClick={handleEditClick}>Edit</Button>
                    <Button variant="primary" onClick={handleStartClick}>Start</Button>
                </div>
            </Card.Body>
        </Card>
    );
}

export default ModuleCard;