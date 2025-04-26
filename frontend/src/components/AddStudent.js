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

    if (!form.studentId || !form.firstName || !form.lastName || !form.email || !form.dob || !form.department || !form.enrollmentYear) {
      alert("⚠️ Please fill all fields properly before submitting.");
      return;
    }

    axios.post('https://websitee2.onrender.com/api/students', form)
      .then(() => {
        alert('✅ Student added successfully!');
        navigate('/students');
      })
      .catch(err => {
        console.error('Error:', err.response?.data);
        alert('❌ Failed to add student! ' + (err.response?.data?.error?.message || err.response?.data?.message || 'Unknown error'));
      });
  };

  return (
    <div className="max-w-xl mx-auto mt-8 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Add New Student</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input name="studentId" placeholder="Student ID" className="input" onChange={handleChange} required />
        <input name="firstName" placeholder="First Name" className="input" onChange={handleChange} required />
        <input name="lastName" placeholder="Last Name" className="input" onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" className="input" onChange={handleChange} required />
        <input name="dob" type="date" className="input" onChange={handleChange} required />
        <input name="department" placeholder="Department" className="input" onChange={handleChange} required />
        <input name="enrollmentYear" type="number" placeholder="Enrollment Year" className="input" onChange={handleChange} required />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Add Student
        </button>
      </form>
    </div>
  );
}
