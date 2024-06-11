import React, { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { UserContext } from "../../context/UserContext";
import "../../assets/css/account/AccountForms.css";

function LoginForm({showRegisterForm}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { user, login } = useContext(UserContext);

    const handleLogin = (e) => {
        e.preventDefault();

        login(email, password);
    };

    return (
        <div className="account-form-container">
            <Form onSubmit={handleLogin} className="account-form">
                <h3>Sign In</h3>
                <Form.Group className="mb-3">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Check
                        type="checkbox"
                        id="customCheck1"
                        label="Remember me"
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
                <div className="d-flex justify-content-between align-items-center mt-3">
                    <div className="register">
                        <a href="#" onClick={showRegisterForm}>Register</a>
                    </div>
                    <div className="forgot-password">
                        Forgot <a href="#">password?</a>
                    </div>
                </div>
            </Form>
        </div>
    );
}

export default LoginForm;
