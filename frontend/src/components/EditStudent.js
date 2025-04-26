import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export default function EditStudent() {
  const [form, setForm] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`https://websitee2.onrender.com${id}`).then(res => setForm(res.data));
  }, [id]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    axios.put(`https://websitee2.onrender.com${id}`, form)
      .then(() => navigate('/students'))
      .catch(err => alert('Update failed: ' + err.message));
  };

  return (
    <div className="container">
      <h2>Edit Student</h2>
      <form onSubmit={handleSubmit}>
        <input name="studentId" value={form.studentId || ''} readOnly /><br />
        <input name="firstName" value={form.firstName || ''} onChange={handleChange} /><br />
        <input name="lastName" value={form.lastName || ''} onChange={handleChange} /><br />
        <input name="email" value={form.email || ''} onChange={handleChange} /><br />
        <input name="dob" type="date" value={form.dob?.split('T')[0] || ''} onChange={handleChange} /><br />
        <input name="department" value={form.department || ''} onChange={handleChange} /><br />
        <input name="enrollmentYear" type="number" value={form.enrollmentYear || ''} onChange={handleChange} /><br />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}
