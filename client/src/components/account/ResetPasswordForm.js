import React, { useContext, useState } from "react";
import { Button, Form, Card } from "react-bootstrap";
import { UserContext } from "../../context/UserContext";
import { useNavigate, useLocation } from "react-router-dom";
import "../../assets/css/account/AccountForms.css";

function ResetPassworForm() {
    const [sent, setSent] = useState(false);
    const [password, setPassword] = useState("");
    const [passwordCheck, setPasswordCheck] = useState("");

    const { resetPassword } = useContext(UserContext);
    const navigate = useNavigate();
    const location = useLocation();

    const getHash = () => {
        const searchParams = new URLSearchParams(location.search);
        return searchParams.get('hash');
    };

    const handleReset = async (e) => {
        e.preventDefault();

        if (password !== passwordCheck) {
            alert("Passwords do not match!");
            return;
        }

        const hash = getHash();
        const response = await resetPassword(hash, password);
        if (response?.status === 200) {
            setSent(true);
        }
    };

    return (
        <div className="account-form-container">
            {sent ? (
                <>
                    <Card className="mb-3">
                        <Card.Body>Your password has been reset. Please login with new password.</Card.Body>
                        <Button variant="primary" onClick={() => navigate("/account/login")}>
                            Login
                        </Button>
                    </Card>

                </>
            ) : (
                <Form onSubmit={handleReset} className="account-form">
                    <h3>Reset password</h3>
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

export default ResetPassworForm;
