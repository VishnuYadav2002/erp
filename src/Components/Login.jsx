// Login.js
import './style.css';
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSession } from "../SessionContext";
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
    const navigate = useNavigate();
    const { login, isAuthenticated } = useSession();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(null);
    const [isLocationEnabled, setIsLocationEnabled] = useState(false);

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard');
        }

        navigator.geolocation.getCurrentPosition(
            () => setIsLocationEnabled(true),
            () => setIsLocationEnabled(false)
        );
    }, [isAuthenticated, navigate]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(null);

        try {
            const response = await fetch('https://digimanagement.org/erp/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            console.log('Response Status:', response.status);
            console.log('Response Data:', data);

            if (!response.ok) {
                throw new Error('Login failed. Please check your credentials.');
            }

            if (data.message === 'Login Successfully' && data.id) {
                login(data.id); 
            } else {
                throw new Error('Invalid email or password.');
            }

        } catch (error) {
            setError(error.message);
            console.error('Login error:', error);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(prevState => !prevState);
    };

    return (
        <div className="login-section">
            <div className="logo">
                <img src="https://digimanagement.org/erp/public/assets/img/logo.png" alt="Digi Management Logo" />
                <h1>We are The Digi<br /> Management Team</h1>
            </div>
            <div className="card-section">
                <Card className="login-card">
                    <p className="para">Please login to your account</p>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-5" controlId="formGroupEmail">
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3 password-group" controlId="formGroupPassword">
                            <Form.Control
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <span className="password-toggle" onClick={togglePasswordVisibility}>
                                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                            </span>
                        </Form.Group>
                        <Form.Group className="mb-5" controlId="formHorizontalCheck">
                            <Form.Check label="Remember me" />
                        </Form.Group>
                        {error && <p className="error-message">{error}</p>}
                        <div className="sub">
                            <Button className="log-btn" type="submit" disabled={!isLocationEnabled}>Login</Button>
                        </div>
                    </Form>
                    {!isLocationEnabled && <p className="error-message">Location services must be enabled to login.</p>}
                </Card>
            </div>
        </div>
    );
};

export default Login;
