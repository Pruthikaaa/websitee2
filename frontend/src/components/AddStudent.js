import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AddStudent() {
  const [form, setForm] = useState({
    studentId: '',
    firstName: '',
    lastName: '',
    email: '',
    dob: '',
    department: '',
    enrollmentYear: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple frontend validation before sending
    if (!form.studentId || !form.firstName || !form.lastName || !form.email || !form.dob || !form.department || !form.enrollmentYear) {
      alert("⚠️ Please fill all fields properly before submitting.");
      return;
    }

    axios.post('/api/students', form)
      .then(() => {
        alert('✅ Student added successfully!');
        navigate('/students');
      })
      .catch(err => {
        console.error('Error:', err.response.data);
        alert('❌ Failed to add student! ' + (err.response.data?.error?.message || err.response.data?.message || 'Unknown error'));
      });
  };

  return (
    <div className="container">
      <h2>Add New Student</h2>
      <form onSubmit={handleSubmit}>
        <input name="studentId" placeholder="Student ID" onChange={handleChange} required /><br />
        <input name="firstName" placeholder="First Name" onChange={handleChange} required /><br />
        <input name="lastName" placeholder="Last Name" onChange={handleChange} required /><br />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required /><br />
        <input name="dob" type="date" onChange={handleChange} required /><br />
        <input name="department" placeholder="Department" onChange={handleChange} required /><br />
        <input name="enrollmentYear" type="number" placeholder="Enrollment Year" onChange={handleChange} required /><br />
        <button type="submit">Add Student</button>
      </form>
    </div>
  );
}
