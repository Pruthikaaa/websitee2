require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ Connected to MongoDB Atlas"))
.catch(err => console.error("❌ MongoDB connection error:", err));

// Student Schema
const studentSchema = new mongoose.Schema({
  studentId: { type: String, required: true, unique: true, match: /^[a-zA-Z0-9]+$/ },
  firstName: { type: String, required: true, minlength: 2 },
  lastName: { type: String, required: true, minlength: 2 },
  email: { type: String, required: true, match: /\S+@\S+\.\S+/ },
  dob: { type: Date, required: true },
  department: { type: String, required: true },
  enrollmentYear: { type: Number, required: true, min: 2000, max: new Date().getFullYear() },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

const Student = mongoose.model('Student', studentSchema);

// API Routes
app.get('/api/students', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    console.error('Fetch students error:', error);
    res.status(500).json({ message: 'Server Error', error });
  }
});

app.get('/api/students/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json(student);
  } catch (error) {
    console.error('Get student error:', error);
    res.status(500).json({ message: 'Server Error', error });
  }
});

app.post('/api/students', async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    console.log('✅ New student added:', student.studentId);
    res.status(201).json(student);
  } catch (error) {
    console.error('Create student error:', error);
    res.status(400).json({ message: 'Validation Error', error });
  }
});

app.put('/api/students/:id', async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json(student);
  } catch (error) {
    console.error('Update student error:', error);
    res.status(400).json({ message: 'Update failed', error });
  }
});

app.delete('/api/students/:id', async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json({ message: 'Student deleted successfully' });
  } catch (error) {
    console.error('Delete student error:', error);
    res.status(500).json({ message: 'Delete failed', error });
  }
});

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

// Server Port
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
