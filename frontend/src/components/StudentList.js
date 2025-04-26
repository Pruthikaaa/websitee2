import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function StudentList() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios.get('/api/students')
      .then(res => setStudents(res.data))
      .catch(err => console.error('Error fetching students:', err));
  }, []);

  const deleteStudent = (id) => {
    axios.delete(`/api/students/${id}`)
      .then(() => setStudents(prev => prev.filter(s => s._id !== id)))
      .catch(err => console.error('Delete error:', err));
  };

  return (
    <div className="container">
      <h2>All Students</h2>
      <table>
        <thead>
          <tr>
            <th>Student ID</th><th>Name</th><th>Email</th><th>Department</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map(s => (
            <tr key={s._id}>
              <td>{s.studentId}</td>
              <td>{s.firstName} {s.lastName}</td>
              <td>{s.email}</td>
              <td>{s.department}</td>
              <td>
                <Link to={`/edit/${s._id}`}><button>Edit</button></Link>
                <button onClick={() => deleteStudent(s._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
