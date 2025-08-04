// const mongoose = require('mongoose');

// const TaskSchema = new mongoose.Schema({
//     title: { type: String, required: true },
//     assignedTo: { type: String, required: true },
//     priority: { type: String, enum: ['Low', 'Medium', 'High', ''], default: '' },
// });

// module.exports = mongoose.model('Task', TaskSchema);
const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    assignedTo: { 
        type: mongoose.Schema.Types.ObjectId, // Reference to User
        ref: 'User',
        required: true 
    },
    priority: { type: String, enum: ['Low', 'Medium', 'High', ''], default: '' },
    status: { type: String, enum: ['Pending', 'In Progress', 'Completed'], default: 'Pending' }
});

module.exports = mongoose.model('Task', TaskSchema);
