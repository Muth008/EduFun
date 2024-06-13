import React, { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import "../../assets/css/account/AccountForms.css";

function RegisterForm() {
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [passwordCheck, setPasswordCheck] = useState("");
    
    const { register } = useContext(UserContext);
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();

        if (password !== passwordCheck) {
            alert("Passwords do not match!");
            return;
        }

        register({ firstName, lastName, email, password });
    };

    return (
        <div className="account-form-container">
            <Form onSubmit={handleRegister} className="account-form">
                <h3>Sign Up</h3>
                <Form.Group controlId="formFirstName" className="mb-3">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter first name"
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formLastName" className="mb-3">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter last name"
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formEmail" className="mb-3">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formPassword" className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formPasswordCheck" className="mb-3">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Confirm Password"
                        onChange={(e) => setPasswordCheck(e.target.value)}
                    />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
                    Submit
                </Button>
                <div className="d-flex justify-content-between align-items-center mt-3">
                    <div className="login">
                        <a href="#" onClick={() => navigate('/account/login')}>Login</a>
                    </div>
                </div>
            </Form>
        </div>
    );
}

export default RegisterForm;
