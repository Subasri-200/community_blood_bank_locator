const BloodBank = require('../models/BloodBank');

// @desc    Get all blood banks with optional filters
// @route   GET /api/bloodbanks
// @access  Public
const getBloodBanks = async (req, res, next) => {
  try {
    const { city, bloodGroup, availability } = req.query;
    let query = {};

    if (city) {
      query.city = { $regex: new RegExp(city, 'i') };
    }

    if (bloodGroup) {
      const key = `bloodAvailability.${bloodGroup}.availabilityStatus`;
      if (availability) {
        query[key] = availability;
      } else {
        query[key] = { $in: ['Available', 'Low'] };
      }
    }

    const bloodBanks = await BloodBank.find(query).sort({ name: 1 });
    res.json(bloodBanks);
  } catch (error) {
    next(error);
  }
};

// @desc    Search blood banks by city and blood group
// @route   GET /api/bloodbanks/search
// @access  Public
const searchBloodBanks = async (req, res, next) => {
  try {
    const { city, bloodGroup } = req.query;
    let query = {};

    if (city && city.trim() !== '') {
      query.city = { $regex: new RegExp(city.trim(), 'i') };
    }

    if (bloodGroup && bloodGroup.trim() !== '') {
      const bg = bloodGroup.trim();
      const unitsKey = `bloodAvailability.${bg}.availableUnits`;
      query[unitsKey] = { $gt: 0 };
    }

    const bloodBanks = await BloodBank.find(query).sort({ createdAt: -1 });
    res.json(bloodBanks);
  } catch (error) {
    next(error);
  }
};

// @desc    Get single blood bank details
// @route   GET /api/bloodbanks/:id
// @access  Public
const getBloodBankById = async (req, res, next) => {
  try {
    const bloodBank = await BloodBank.findById(req.params.id);

    if (bloodBank) {
      res.json(bloodBank);
    } else {
      res.status(404);
      throw new Error('Blood Bank not found');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new blood bank
// @route   POST /api/bloodbanks
// @access  Private/Admin
const createBloodBank = async (req, res, next) => {
  try {
    const {
      name, address, city, state, pincode, phone, email,
      openingTime, closingTime, latitude, longitude, bloodAvailability
    } = req.body;

    if (!name || !address || !city || !state || !pincode || !phone || !email || latitude === undefined || longitude === undefined) {
      res.status(400);
      throw new Error('Please fill in all required blood bank details');
    }

    const bloodBank = new BloodBank({
      name,
      address,
      city,
      state,
      pincode,
      phone,
      email,
      openingTime: openingTime || '09:00 AM',
      closingTime: closingTime || '08:00 PM',
      latitude: Number(latitude),
      longitude: Number(longitude),
      bloodAvailability: bloodAvailability || {}
    });

    const createdBloodBank = await bloodBank.save();
    res.status(201).json(createdBloodBank);
  } catch (error) {
    next(error);
  }
};

// @desc    Update blood bank details / availability
// @route   PUT /api/bloodbanks/:id
// @access  Private/Admin
const updateBloodBank = async (req, res, next) => {
  try {
    const bloodBank = await BloodBank.findById(req.params.id);

    if (!bloodBank) {
      res.status(404);
      throw new Error('Blood Bank not found');
    }

    const fields = [
      'name', 'address', 'city', 'state', 'pincode',
      'phone', 'email', 'openingTime', 'closingTime',
      'latitude', 'longitude', 'bloodAvailability'
    ];

    fields.forEach((field) => {
      if (req.body[field] !== undefined) {
        bloodBank[field] = req.body[field];
      }
    });

    const updatedBloodBank = await bloodBank.save();
    res.json(updatedBloodBank);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete blood bank
// @route   DELETE /api/bloodbanks/:id
// @access  Private/Admin
const deleteBloodBank = async (req, res, next) => {
  try {
    const bloodBank = await BloodBank.findById(req.params.id);

    if (bloodBank) {
      await bloodBank.deleteOne();
      res.json({ message: 'Blood bank removed successfully' });
    } else {
      res.status(404);
      throw new Error('Blood Bank not found');
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getBloodBanks,
  searchBloodBanks,
  getBloodBankById,
  createBloodBank,
  updateBloodBank,
  deleteBloodBank,
};
