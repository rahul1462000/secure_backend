// const User = require('../models/User');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

// const JWT_SECRET = 'your_secret_key';

// const MAX_ATTEMPTS = 5;
// const LOCK_TIME = 15 * 60 * 1000; // 15 minutes

// // ADMIN creates user
// exports.createUser = async (req, res) => {
//   const { name, email, password, role } = req.body;

//   try {
//     const existing = await User.findOne({ email });
//     if (existing) return res.status(400).json({ message: 'User already exists' });

//     const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;
//     if (!hasSpecialChar.test(password)) {
//       return res.status(400).json({ message: 'Password must contain at least one special character' });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const user = new User({ name,email, password: hashedPassword, role: role || 'user',  forcePasswordChange: true
//  });
//     await user.save();

//     // ✅ Generate token after user creation
//     const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });

//     res.status(201).json({ message: 'User created successfully', token, role: user.role });
//   } catch (err) {
//     res.status(500).json({ message: 'Server Error' });
//   }
// };

// // USER Login with rate limiter
// exports.login = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(401).json({ message: 'Invalid credentials' });

//     // ⛔ Check if user is locked
//     if (user.isLocked()) {
//       const unlockTime = new Date(user.lockUntil).toLocaleTimeString();
//       return res.status(403).json({
//         message: `Account locked due to multiple failed attempts. Try again after ${unlockTime}`
//       });
//     }

//     const match = await bcrypt.compare(password, user.password);
//     if (!match) {
//       user.failedAttempts += 1;

//       // Lock account if failed 5 times
//       if (user.failedAttempts >= MAX_ATTEMPTS) {
//         user.lockUntil = new Date(Date.now() + LOCK_TIME);
//       }

//       await user.save();
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }

//     // ✅ Successful login: reset attempts
//     user.failedAttempts = 0;
//     user.lockUntil = undefined;
//     await user.save();

//     const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '1d' });
//     res.status(200).json({ token, role: user.role, forcePasswordChange: user.forcePasswordChange,
//  message: 'Login successful' });

//   } catch (err) {
//     res.status(500).json({ message: 'Server Error' });
//   }
// };

// exports.changePassword = async (req, res) => {
//   const userId = req.user.id;
//   const { newPassword } = req.body;

//   if (!newPassword) return res.status(400).json({ message: 'New password is required' });

//   const hasSpecialChar = /[!@#$%^&*]/;
//   if (!hasSpecialChar.test(newPassword)) {
//     return res.status(400).json({ message: 'Password must contain a special character' });
//   }

//   try {
//     const hashed = await bcrypt.hash(newPassword, 10);
//     await User.findByIdAndUpdate(userId, {
//       password: hashed,
//       forcePasswordChange: false,
//       failedAttempts: 0,
//       lockUntil: null
//     });

//     res.status(200).json({ message: 'Password changed successfully!' });
//   } catch (err) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // Update User (Admin only)
// exports.updateUser = async (req, res) => {
//   const { id } = req.params;
//   const { name, email, role } = req.body;

//   try {
//     const user = await User.findByIdAndUpdate(
//       id,
//       { name, email, role },
//       { new: true, runValidators: true }
//     );

//     if (!user) return res.status(404).json({ message: 'User not found' });

//     res.status(200).json({ message: 'User updated successfully', user });

//   } catch (err) {
//     res.status(500).json({ message: 'Server Error' });
//   }
// };

// // Delete User (Admin only)
// exports.deleteUser = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const user = await User.findByIdAndDelete(id);
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     res.status(200).json({ message: 'User deleted successfully' });

//   } catch (err) {
//     res.status(500).json({ message: 'Server Error' });
//   }
// };
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'your_secret_key';

const MAX_ATTEMPTS = 5;
const LOCK_TIME = 15 * 60 * 1000; // 15 minutes

// ADMIN creates user
exports.createUser = async (req, res) => {
  const { name, email, password, role,status } = req.body;

  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'User already exists' });

    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;
    if (!hasSpecialChar.test(password)) {
      return res.status(400).json({ message: 'Password must contain at least one special character' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ name,email, password: hashedPassword, role: role || 'user', status, forcePasswordChange: true
 });
    await user.save();

    // ✅ Generate token after user creation
    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });

    res.status(201).json({ message: 'User created successfully', token, role: user.role });
 } catch (err) {
  console.error("Create user error:", err); // ✅ LOG actual error
  res.status(500).json({ message: 'Server Error' });
}
};

// USER Login with rate limiter
// exports.login = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(401).json({ message: 'Invalid credentials' });

//     // ⛔ Check if user is locked
//     if (user.isLocked()) {
//       const unlockTime = new Date(user.lockUntil).toLocaleTimeString();
//       return res.status(403).json({
//         message: `Account locked due to multiple failed attempts. Try again after ${unlockTime}`
//       });
//     }

//     const match = await bcrypt.compare(password, user.password);
//     if (!match) {
//       user.failedAttempts += 1;

//       // Lock account if failed 5 times
//       if (user.failedAttempts >= MAX_ATTEMPTS) {
//         user.lockUntil = new Date(Date.now() + LOCK_TIME);
//       }

//       await user.save();
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }

//     // ✅ Successful login: reset attempts
//     user.failedAttempts = 0;
//     user.lockUntil = undefined;
//     await user.save();

//     const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '1d' });
//     res.status(200).json({ token, role: user.role, forcePasswordChange: user.forcePasswordChange,
//  message: 'Login successful' });

//   } catch (err) {
//     res.status(500).json({ message: 'Server Error' });
//   }
// };

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    // ⛔ Account lock check
    if (user.isLocked()) {
      const unlockTime = new Date(user.lockUntil).toLocaleTimeString();
      return res.status(403).json({
        message: `Account locked due to multiple failed attempts. Try again after ${unlockTime}`
      });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      user.failedAttempts += 1;
      if (user.failedAttempts >= MAX_ATTEMPTS) {
        user.lockUntil = new Date(Date.now() + LOCK_TIME);
      }
      await user.save();
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // ✅ Successful login: reset attempts
    user.failedAttempts = 0;
    user.lockUntil = undefined;
    await user.save();

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(200).json({
      token,
      role: user.role,
      forcePasswordChange: user.forcePasswordChange,
      user: { _id: user._id, email: user.email, role: user.role }, // ✅ Added
      message: 'Login successful'
    });

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.changePassword = async (req, res) => {
  const userId = req.user.id;
  const { newPassword } = req.body;

  if (!newPassword) return res.status(400).json({ message: 'New password is required' });

  const hasSpecialChar = /[!@#$%^&*]/;
  if (!hasSpecialChar.test(newPassword)) {
    return res.status(400).json({ message: 'Password must contain a special character' });
  }

  try {
    const hashed = await bcrypt.hash(newPassword, 10);
    await User.findByIdAndUpdate(userId, {
      password: hashed,
      forcePasswordChange: false,
      failedAttempts: 0,
      lockUntil: null
    });

    res.status(200).json({ message: 'Password changed successfully!' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update User (Admin only)
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, role } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      id,
      { name, email, role },
      { new: true, runValidators: true }
    );

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ message: 'User updated successfully', user });

  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Delete User (Admin only)
exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ message: 'User deleted successfully' });

  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};