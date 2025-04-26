import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="container">
      <h1>🎓 Student Management System</h1>
      <div style={{ marginTop: "20px" }}>
        <Link to="/students"><button>View Students</button></Link>
        <Link to="/add"><button style={{ marginLeft: "10px" }}>Add Student</button></Link>
      </div>
    </div>
  );
}
