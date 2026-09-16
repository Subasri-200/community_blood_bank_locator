const mongoose = require('mongoose');

const bloodGroupSchema = new mongoose.Schema({
  availableUnits: {
    type: Number,
    required: true,
    default: 0,
    min: [0, 'Units cannot be negative'],
  },
  availabilityStatus: {
    type: String,
    enum: ['Available', 'Low', 'Not Available'],
    default: 'Not Available',
  },
}, { _id: false });

const bloodBankSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Blood bank name is required'],
    trim: true,
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
  },
  city: {
    type: String,
    required: [true, 'City is required'],
    trim: true,
  },
  state: {
    type: String,
    required: [true, 'State is required'],
    trim: true,
  },
  pincode: {
    type: String,
    required: [true, 'Pincode is required'],
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
  },
  email: {
    type: String,
    required: [true, 'Email address is required'],
  },
  openingTime: {
    type: String,
    default: '09:00 AM',
  },
  closingTime: {
    type: String,
    default: '08:00 PM',
  },
  latitude: {
    type: Number,
    required: [true, 'Latitude is required'],
  },
  longitude: {
    type: Number,
    required: [true, 'Longitude is required'],
  },
  bloodAvailability: {
    'A+': { type: bloodGroupSchema, default: () => ({ availableUnits: 0, availabilityStatus: 'Not Available' }) },
    'A-': { type: bloodGroupSchema, default: () => ({ availableUnits: 0, availabilityStatus: 'Not Available' }) },
    'B+': { type: bloodGroupSchema, default: () => ({ availableUnits: 0, availabilityStatus: 'Not Available' }) },
    'B-': { type: bloodGroupSchema, default: () => ({ availableUnits: 0, availabilityStatus: 'Not Available' }) },
    'AB+': { type: bloodGroupSchema, default: () => ({ availableUnits: 0, availabilityStatus: 'Not Available' }) },
    'AB-': { type: bloodGroupSchema, default: () => ({ availableUnits: 0, availabilityStatus: 'Not Available' }) },
    'O+': { type: bloodGroupSchema, default: () => ({ availableUnits: 0, availabilityStatus: 'Not Available' }) },
    'O-': { type: bloodGroupSchema, default: () => ({ availableUnits: 0, availabilityStatus: 'Not Available' }) },
  },
}, {
  timestamps: true,
});

// Helper function to update status based on units
const calculateStatus = (units) => {
  const num = Number(units) || 0;
  if (num >= 10) return 'Available';
  if (num >= 1) return 'Low';
  return 'Not Available';
};

// Pre-save hook to recalculate statuses automatically
bloodBankSchema.pre('save', function (next) {
  const groups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  if (this.bloodAvailability) {
    groups.forEach((group) => {
      if (this.bloodAvailability[group]) {
        const units = this.bloodAvailability[group].availableUnits || 0;
        this.bloodAvailability[group].availabilityStatus = calculateStatus(units);
      }
    });
  }
  next();
});

module.exports = mongoose.model('BloodBank', bloodBankSchema);
