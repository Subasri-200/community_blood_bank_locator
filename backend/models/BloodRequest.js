const mongoose = require('mongoose');

const bloodRequestSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  patientName: {
    type: String,
    required: [true, 'Patient name is required'],
    trim: true,
  },
  bloodGroup: {
    type: String,
    required: [true, 'Blood group is required'],
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  },
  unitsRequired: {
    type: Number,
    required: [true, 'Units required is required'],
    min: [1, 'At least 1 unit must be requested'],
  },
  hospitalName: {
    type: String,
    required: [true, 'Hospital name is required'],
    trim: true,
  },
  hospitalAddress: {
    type: String,
    required: [true, 'Hospital address is required'],
  },
  city: {
    type: String,
    required: [true, 'City is required'],
    trim: true,
  },
  contactNumber: {
    type: String,
    required: [true, 'Contact number is required'],
  },
  emergencyLevel: {
    type: String,
    required: [true, 'Emergency level is required'],
    enum: ['Normal', 'Urgent', 'Critical'],
    default: 'Normal',
  },
  additionalMessage: {
    type: String,
    default: '',
  },
  status: {
    type: String,
    enum: ['Pending', 'Accepted', 'Rejected', 'Completed'],
    default: 'Pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('BloodRequest', bloodRequestSchema);
