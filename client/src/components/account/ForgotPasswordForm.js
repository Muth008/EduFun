import React, { useContext, useState } from "react";
import { Button, Form, Card } from "react-bootstrap";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import "../../assets/css/account/AccountForms.css";

function ForgotPassworForm() {
    const [email, setEmail] = useState("");
    const [sent, setSent] = useState(false);

    const { forgotPassword } = useContext(UserContext);
    const navigate = useNavigate();

    const handleForgot = async (e) => {
        e.preventDefault();

        const response = await forgotPassword(email);
        if (response?.status === 200) {
            setSent(true);
        }
    };

    return (
        <div className="account-form-container">
            {sent ? (
                <>
                    <Card className="mb-3">
                        <Card.Body>Reset link has been sent to your email address.</Card.Body>
                        <Button variant="primary" onClick={() => navigate("/account/login")}>
                            Login
                        </Button>
                    </Card>

                </>
            ) : (
                <Form onSubmit={handleForgot} className="account-form">
                    <h3>Reset password</h3>
                    <Form.Group className="mb-3">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                    <div className="d-flex justify-content-between align-items-center mt-3">
                        <div className="login">
                            <a href="#" onClick={() => navigate("/account/login")}>
                                Login
                            </a>
                        </div>
                    </div>
                </Form>
            )}
        </div>
    );
}

export default ForgotPassworForm;
