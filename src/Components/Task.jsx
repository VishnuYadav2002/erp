// src/Components/Home.jsx
import React from 'react';
import { Row , Col,Form,Button} from "react-bootstrap";
import Sidebar from './Sidebar'
import { Link } from 'react-router-dom';
import TableData from './Table';

function Task() {
  return (
    <div>
       <Sidebar/>
      <div className='lis'>
        <ul className='d-flex list-type'>
          <li><a href="/">all</a></li>
          <li><a href="/">Not Start</a></li>
          <li><a href="/">Complete</a></li>
          <li><a href="/">Pending</a></li>
          <li><a href="/">Rework</a></li>
        </ul>
      </div>
     <div className='tas'>
     <div className='create'>
        <Link to='/create'>Create task</Link>
        <Form inline className='search-task'>
      <Row >
        <Col className="sear" xs="auto">
          <Form.Control type="text" placeholder="Search" className="mr-sm-2" />
        </Col>
        <Col className="sear" xs="auto">
          <Button type="submit">Submit</Button>
        </Col>
      </Row>
    </Form>
      </div>
      <div className='create'>
        <a href="/"><button>All</button></a>
        <a href="/"><button>Today</button></a>
        <a href="/"><button>Yesterday</button></a>
        <a href="/"><button>This Month</button></a>
        <a href="/"><button>Last Month</button></a>
        <form action="">
          <input type="date" />
          <input type="date" />
          <button>Filter Data</button>
        </form>
      </div>
      <TableData/>
     </div>
    </div>
  );
}


export default Task;