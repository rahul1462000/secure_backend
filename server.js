const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const User = require('./models/User');
const authRoutes = require('./routes/authRoutes');
const objectiveRoutes = require('./routes/objectiveRoutes');
const leaveRoutes = require('./routes/leaveRoutes');
const submitweekRoutes = require('./routes/submitweekRoutes');
const aboutRoutes = require('./routes/IntroduceYourselfRoutes/aboutRoutes');
const aboutjobRoutes = require('./routes/IntroduceYourselfRoutes/aboutjobRoutes');
const hobbiesRoutes = require('./routes/IntroduceYourselfRoutes/hobbiesRoutes');
const githubRoutes = require('./routes/IntroduceYourselfRoutes/githubRoutes');
const taskRoutes = require('./routes/taskRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');
const payrollRoutes = require('./routes/payrollRoutes');
const payslipRoutes = require('./routes/payslipRoutes');
const employeeRoutes = require('./routes/OrganizationRoutes/departmentRoutes');
const holidayRoutes = require("./routes/OrganizationRoutes/holidayRoutes");
const shiftRoutes = require("./routes/OrganizationRoutes/shiftRoutes");

const app = express();
const PORT = 5000; // ✅ Port defined here

app.use(cors());
app.use(express.json());

// Routes
app.use('/api', authRoutes);

// Create default admin if not exists
const createDefaultAdmin = async () => {
  const existing = await User.findOne({ email: 'admin@example.com' });
  if (!existing) {
    const hashedPassword = await bcrypt.hash('admin123', 10);
  await User.create({
  name: "Admin",
  email: "admin@example.com",
  password: "admin123",
  role: "Admin" // ✅ सही value
});

    console.log('✅ Admin user created');
  } else {
    console.log('Admin already exists');
  }
};

app.use('/api/objective', objectiveRoutes);
app.use('/api/leave', leaveRoutes);
app.use('/api/submitweek', submitweekRoutes);
app.use('/api/about', aboutRoutes);
app.use('/api/aboutjob', aboutjobRoutes);
app.use('/api/hobbies', hobbiesRoutes);
app.use('/api/github', githubRoutes);
app.use('/api/task', taskRoutes);
app.use('/api/attendance',attendanceRoutes);
app.use('/api/payroll', payrollRoutes);
app.use("/api/payslip", payslipRoutes);
app.use('/api/department', employeeRoutes);
app.use("/api/holidays", holidayRoutes);
app.use("/api/shifts", shiftRoutes);


mongoose.connect('mongodb://mongo:WRyRAneJodavVzZbCVSQODNsfGzawLol@mainline.proxy.rlwy.net:11642')
  .then(async () => {
    console.log('✅ MongoDB connected');
    await createDefaultAdmin();
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
  });
