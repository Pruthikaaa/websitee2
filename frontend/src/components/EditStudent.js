import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export default function EditStudent() {
  const [form, setForm] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`https://websitee2.onrender.com/api/students/${id}`)
      .then(res => setForm(res.data))
      .catch(err => console.error('Fetch error:', err));
  }, [id]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    axios.put(`https://websitee2.onrender.com/api/students/${id}`, form)
      .then(() => {
        alert('✅ Student updated!');
        navigate('/students');
      })
      .catch(err => {
        console.error('Update error:', err);
        alert('❌ Update failed');
      });
  };

  return (
    <div className="max-w-xl mx-auto mt-8 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Edit Student</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input name="studentId" className="input" value={form.studentId || ''} readOnly />
        <input name="firstName" className="input" value={form.firstName || ''} onChange={handleChange} required />
        <input name="lastName" className="input" value={form.lastName || ''} onChange={handleChange} required />
        <input name="email" type="email" className="input" value={form.email || ''} onChange={handleChange} required />
        <input name="dob" type="date" className="input" value={form.dob?.split('T')[0] || ''} onChange={handleChange} required />
        <input name="department" className="input" value={form.department || ''} onChange={handleChange} required />
        <input name="enrollmentYear" type="number" className="input" value={form.enrollmentYear || ''} onChange={handleChange} required />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Update Student
        </button>
      </form>
    </div>
  );
}
