import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { SessionProvider } from './SessionContext'; // Corrected import path
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import Task from './Components/Task';
import Field from './Components/Field-meeting';
import CreateTask from './Components/Create';
import Pool  from './Components/Pool'
import Assign from './Components/Assign';
import Deal from './Components/Deal-closed';

const App = () => {
  return (
    <Router>
      <SessionProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/field-meeting" element={<Field />} />
          <Route path="/pool" element={<Pool />} />
          <Route path="/task" element={<Task />} />
          <Route path="/assign" element={<Assign />} />
          <Route path="/deal" element={<Deal />} />
          <Route path="/create" element={<CreateTask />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </SessionProvider>
    </Router>
  );
}

export default App;
