// const express = require('express');
// const router = express.Router();
// const authController = require('../controllers/authControllers');
// const verifyToken = require('../middleware/verifyToken');
// const isAdmin = require('../middleware/isAdmin');
// const User = require('../models/User')

// // Only admin can create users
// router.post('/admin/create-user', verifyToken, isAdmin, authController.createUser);

// // Anyone can login
// router.post('/login', authController.login);
// router.post('/change-password', verifyToken, authController.changePassword);

// router.get('/user-profile', verifyToken, (req, res) => {
//   res.status(200).json({
//     id: req.user.id,
//     email: req.user.email, // set this in token
//     role: req.user.role,
//   });
// });

// // In authRoutes.js
// router.post('/skip-password-change', verifyToken, async (req, res) => {
//   try {
//     await User.findByIdAndUpdate(req.user.id, { forcePasswordChange: false });
//     res.json({ message: 'Skipped password change' });
//   } catch (err) {
//     res.status(500).json({ message: 'Server Error' });
//   }
// });

// // ✅ Get all users (admin only)
// router.get('/admin/users', verifyToken, isAdmin, async (req, res) => {
//   try {
//     // Exclude admins if needed: { role: 'user' }
//     const users = await User.find({ role: 'user' }).select('-password');
//     res.status(200).json(users);
//   } catch (err) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// router.put('/user/:id', authController.updateUser);
// router.delete('/user/:id', authController.deleteUser);


// module.exports = router;
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authControllers');
const verifyToken = require('../middleware/verifyToken');
const isAdmin = require('../middleware/isAdmin');
const User = require('../models/User')

// Only admin can create users
router.post('/admin/create-user', verifyToken, isAdmin, authController.createUser);

// Anyone can login
router.post('/login', authController.login);
router.post('/change-password', verifyToken, authController.changePassword);

router.get('/user-profile', verifyToken, (req, res) => {
  res.status(200).json({
    id: req.user.id,
    email: req.user.email, // set this in token
    role: req.user.role,
  });
});

// In authRoutes.js
router.post('/skip-password-change', verifyToken, async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user.id, { forcePasswordChange: false });
    res.json({ message: 'Skipped password change' });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// ✅ Get all users (admin only)
router.get('/admin/users', verifyToken, isAdmin, async (req, res) => {
  try {
    // Exclude admins if needed: { role: 'user' }
const users = await User.find({
  role: { $in: ['user', 'Node.js Developer', 'UI/UX Designer','Java Developer' , 'Full-stack Developer'] }
}).select('-password');    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/user/:id', authController.updateUser);
router.delete('/user/:id', authController.deleteUser);

// Get User Count
router.get('/user-count', async (req, res) => {
  try {
    const count = await User.countDocuments();
    res.status(200).json({ count });
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});



module.exports = router;