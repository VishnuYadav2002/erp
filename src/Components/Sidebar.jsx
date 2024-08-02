  import React, { useState, useEffect } from "react";
  import { Link, useNavigate } from "react-router-dom";
  import Nav from 'react-bootstrap/Nav';
  import Navbar from 'react-bootstrap/Navbar';
  import Container from 'react-bootstrap/Container';
  import { Row, Col, Form, InputGroup } from "react-bootstrap";
  import Button from 'react-bootstrap/Button'; 
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import { faBars, faTimes, faCogs, faList, faUser, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
  import { useSession } from '../SessionContext';
  import Modal from 'react-bootstrap/Modal';

  const Sidebar = () => {
    const { user, isAuthenticated, logout, token } = useSession();
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    const [isOpen, setIsOpen] = useState(true);
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
  
    const handleTrigger = () => setIsOpen(!isOpen);
  
    useEffect(() => {
      if (!isAuthenticated) {
        navigate('/login');
        return;
      }
  
      const fetchProfileData = async () => {
        try {
          let response = await fetch(`https://digimanagement.org/erp/api/profile-image?id=${user.id}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            }
          });
  
          if (!response.ok) {
            if (response.status === 405) {
              response = await fetch("https://digimanagement.org/erp/api/profile-image", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ id: user.id })
              });
            }
  
            if (!response.ok) {
              throw new Error(`Network response was not ok. Status: ${response.status}`);
            }
          }
  
          const data = await response.json();
          setProfile(data);
        } catch (error) {
          console.error("Error fetching profile data:", error);
          setError(error.message);
        }
      };
  
      fetchProfileData();
    }, [isAuthenticated, user.id, navigate, token]);
  
    const handleLogout = () => {
      logout();
      navigate('/login');
    };
  
    const isPasswordStrong = (password) => {
      const checks = {
        length: password.length >= 8,
        uppercase: /[A-Z]/.test(password),
        digit: /\d/.test(password),
        symbol: /[!@#$%^&*]/.test(password)
      };
      checks.valid = checks.length && checks.uppercase && checks.digit && checks.symbol;
      return checks;
    };
  
    const handleChangePassword = async (event) => {
      event.preventDefault();
      const { npwd, cnpwd } = event.target.elements;
  
      if (npwd.value !== cnpwd.value) {
        alert("Passwords do not match");
        return;
      }
  
      const passwordChecks = isPasswordStrong(npwd.value);
      if (!passwordChecks.valid) {
        let message = "Password must be at least 8 characters long";
        if (!passwordChecks.uppercase) message += ", include at least one capital letter";
        if (!passwordChecks.symbol) message += ", include at least one symbol";
        if (!passwordChecks.digit) message += ", include at least one digit";
        alert(message);
        return;
      }
  
      const payload = {
        empid: user.id,
        npwd: npwd.value,
        cnpwd: cnpwd.value, 
      };
  
      console.log('Sending payload:', payload);
  
      try {
        const response = await fetch("https://digimanagement.org/erp/api/changepassword", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
  
        const responseText = await response.text();
        console.log('Response Status:', response.status);
        console.log('Response Body:', responseText);
  
        if (!response.ok) {
          throw new Error(`Failed to change password. Status: ${response.status}, Message: ${responseText}`);
        }
  
        alert("Password changed successfully");
        handleClose();
      } catch (error) {
        console.error("Error changing password:", error);
        alert(`Error changing password: ${error.message}`);
      }
    };
  
    if (!isAuthenticated) {
      return null;
    }

    return (
      <>
        <Navbar expand="lg" className="bg-body-tertiary">
          <Container>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Form inline>
                  <Row>
                    <Col className="sear" xs="auto">
                      <Form.Control as="select" className="mr-sm-2">
                        <option value="mobile">Mobile</option>
                        <option value="email">Email</option>
                        <option value="company">Company Name</option>
                        <option value="customer">Customer Name</option>
                        <option value="pincode">Pincode</option>
                        <option value="City">City</option>
                      </Form.Control>
                    </Col>
                    <Col className="sear" xs="auto">
                      <Form.Control type="text" placeholder="Search" className="mr-sm-2" />
                    </Col>
                    <Col className="sear" xs="auto">
                      <Button type="submit">Submit</Button>
                    </Col>
                  </Row>
                </Form>
                <Button className="logout" variant="outline-danger" onClick={handleLogout}>Logout</Button>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <div className={`sidebar ${isOpen ? "sidebar--open" : ""}`}>
          <div className="trigger" onClick={handleTrigger}>
            <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
          </div>
          <div className="log over">
            <img src="https://digimanagement.org/erp/public/assets/img/logo.png" alt="logo" />
          </div>
          <div className="over text-center">
            {error ? (
              <p style={{ color: "red" }}>Error: {error}</p>
            ) : profile ? (
              <>
                <img
                  src={`https://digimanagement.org/erp/public/uploads/${profile.profileImage}`}
                  alt="profile"
                  className="profile-img"
                />
                <h6 className="mt-2 " style={{ color: "white" }}>{profile.name}</h6>
                <h6 className="mt-2" style={{ color: "white" }}>{profile.role}</h6>
              </>
            ) : (
              <p style={{ color: "white" }}>Loading...</p>
            )}
          </div>

          <Link className="side-link" onClick={handleShow}>
            <div className="sidebar-position">
              <FontAwesomeIcon icon={faUser} />
              <span>Edit password</span>
            </div>
          </Link>

          <Link className="side-link" to="/dashboard">
            <div className="sidebar-position">
              <FontAwesomeIcon icon={faUser} />
              <span>Dashboard</span>
            </div>
          </Link>

          <Link className="side-link" to="/Task">
            <div className="sidebar-position">
              <FontAwesomeIcon icon={faCogs} />
              <span>Task</span>
            </div>
          </Link>

          <Link className="side-link" to="/field-meeting">
            <div className="sidebar-position">
              <FontAwesomeIcon icon={faList} />
              <span>Field Meeting</span>
            </div>
          </Link>

          <Link className="side-link" to="/pool">
            <div className="sidebar-position">
              <FontAwesomeIcon icon={faList} />
              <span>Pool</span>
            </div>
          </Link>

          <Link className="side-link" to="/assign">
            <div className="sidebar-position">
              <FontAwesomeIcon icon={faList} />
              <span>Assigned</span>
            </div>
          </Link>

          <Link className="side-link" to="/deal">
            <div className="sidebar-position">
              <FontAwesomeIcon icon={faList} />
              <span>Deal Closed</span>
            </div>
          </Link>
        </div>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Password</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleChangePassword}>
              <Form.Group className="mb-3" controlId="formGroupNewPassword">
                <InputGroup>
                  <Form.Control 
                    type={showPassword ? "text" : "password"} 
                    placeholder="New Password" 
                    name="npwd" 
                  />
                  <Button
                    variant="outline-secondary"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                  </Button>
                </InputGroup>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGroupConfirmPassword">
                <InputGroup>
                  <Form.Control 
                    type={showPassword ? "text" : "password"} 
                    placeholder="Confirm Password" 
                    name="cnpwd" 
                  />
                  <Button
                    variant="outline-secondary"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                  </Button>
                </InputGroup>
              </Form.Group>
              <Modal.Footer>
                <Button variant="primary" type="submit">
                  Save Password
                </Button>
              </Modal.Footer>
            </Form>
          </Modal.Body>
        </Modal>
      </>
    );
  };

  export default Sidebar;
