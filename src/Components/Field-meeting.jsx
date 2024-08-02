import React, { useState } from "react";
import Sidebar from "./Sidebar";
import "./style.css";
import Form from 'react-bootstrap/Form';
import { useSession } from '../SessionContext'; 
import { Row, Col } from "react-bootstrap";

const Field = () => {
    const { user } = useSession(); 

    const [formData, setFormData] = useState({
        phone1: '',
        comp_name: '',
        cust_name: '',
        pincode: '',
        gimage: null,
        mlimage: null,
        imlimage: null
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (files) {
            setFormData({
                ...formData,
                [name]: files[0]
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('eid', user.id); 
        data.append('phone1', formData.phone1);
        data.append('comp_name', formData.comp_name);
        data.append('cust_name', formData.cust_name);
        data.append('pincode', formData.pincode);
        data.append('gimage', formData.gimage);
        data.append('mlimage', formData.mlimage);
        data.append('imlimage', formData.imlimage);

        try {
            const response = await fetch('https://digimanagement.org/erp/api/appointment', {
                method: 'POST',
                body: data
            });

            if (!response.ok) {
                
                throw new Error(`Server error: ${response.status}`);
            }

          
            const result = await response.json();
            console.log(result);
            
            setFormData({
                phone1: '',
                comp_name: '',
                cust_name: '',
                pincode: '',
                gimage: '',
                mlimage: '',
                imlimage: ''
            });
        } catch (error) {
            console.error('There was an error!', error);
        }
    };

    return (
        <>
            <Sidebar />
            <div className="field-form mt-4">
                <h1 className="text-center">Add Field Meeting</h1>
                <Form className="mt-3" onSubmit={handleSubmit}>
                    <Row>
                        <Col>
                            <Form.Group className="mb-4">
                                <Form.Label>Mobile Number</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="phone1"
                                    placeholder="Mobile Number"
                                    value={formData.phone1}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-4">
                                <Form.Label>Company Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="comp_name"
                                    placeholder="Company Name"
                                    value={formData.comp_name}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group className="mb-4">
                                <Form.Label>Customer Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="cust_name"
                                    placeholder="Customer Name"
                                    value={formData.cust_name}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-4">
                                <Form.Label>Pincode</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="pincode"
                                    placeholder="Pincode"
                                    value={formData.pincode}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group className="mb-4">
                                <Form.Label>Capture GST Image</Form.Label>
                                <Form.Control
                                    type="file"
                                    name="gimage"
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-4">
                                <Form.Label>Capture Meeting Location Image</Form.Label>
                                <Form.Control
                                    type="file"
                                    name="mlimage"
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Form.Group className="mb-4">
                        <Form.Label>Capture In-house Meeting Location Image</Form.Label>
                        <Form.Control
                            type="file"
                            name="imlimage"
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <button type="submit">Submit</button>
                </Form>
            </div>
        </>
    );
};

export default Field;
