import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function StudentList() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios.get('https://websitee2.onrender.com/api/students')
      .then(res => setStudents(res.data))
      .catch(err => console.error('Error fetching students:', err));
  }, []);

  const deleteStudent = (id) => {
    axios.delete(`https://websitee2.onrender.com/api/students/${id}`)
      .then(() => setStudents(prev => prev.filter(s => s._id !== id)))
      .catch(err => console.error('Delete error:', err));
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">All Students</h2>
      <table className="min-w-full bg-white shadow-md rounded border">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Student ID</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Department</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s._id}>
              <td className="py-2 px-4 border-b">{s.studentId}</td>
              <td className="py-2 px-4 border-b">{s.firstName} {s.lastName}</td>
              <td className="py-2 px-4 border-b">{s.email}</td>
              <td className="py-2 px-4 border-b">{s.department}</td>
              <td className="py-2 px-4 border-b space-x-2">
                <Link to={`/edit/${s._id}`}>
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded">Edit</button>
                </Link>
                <button
                  onClick={() => deleteStudent(s._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

