import React from 'react';
import {Form, Col, Row,Button} from 'react-bootstrap'
import Sidebar from './Sidebar';

const CreateTask = () =>{


    return(
        <>
        <Sidebar/>
       
     
        <div className='create-task'>
            <h4>Add Task</h4>
            <hr></hr>
    <Form>
      <Row className="mb-3">
        <Col>
        <Form.Label>Select Client*</Form.Label>
          <Form.Select aria-label="Default select example">
            <option>Open this select menu</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </Form.Select>
        </Col>
        <Col>
        <Form.Label>Priority Level*</Form.Label>
          <Form.Select aria-label="Default select example">
            <option>Open this select menu</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </Form.Select>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
        <Form.Label>Select Marketplace*</Form.Label>
          <Form.Select aria-label="Default select example">
            <option>Open this select menu</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </Form.Select>
        </Col>
        <Col>
        <Form.Label>Select Employee*</Form.Label>
          <Form.Select aria-label="Default select example">
            <option>Open this select menu</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </Form.Select>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
        <Form.Label>Task Name*</Form.Label>
          <Form.Select aria-label="Default select example">
            <option>Open this select menu</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </Form.Select>
        </Col>
        <Col>
        <Form.Label>End Date*</Form.Label>
        <Form.Control  required type="date"  />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
        <Form.Label>Start Date*</Form.Label>
        <Form.Control  required type="date"  />
        </Col>
        <Col>
        <Form.Label>Upload Files</Form.Label>
        <Form.Control type="file" multiple />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
        <Form.Label>Short Description*</Form.Label>
        <Form.Control as="textarea" rows={3} />
        </Col>
        <Col>
        <Form.Check 
        type="switch"
        id="custom-switch"
        label="e-mail to Client"
      />
        <Form.Label>No. of SKU</Form.Label>
        <Form.Control type="number" multiple />
        </Col>
      </Row>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
        </div>
      </>
    );
}
export default CreateTask;