const BloodRequest = require('../models/BloodRequest');

// @desc    Submit a new blood request
// @route   POST /api/requests
// @access  Private (User/Admin)
const createBloodRequest = async (req, res, next) => {
  try {
    const {
      patientName,
      bloodGroup,
      unitsRequired,
      hospitalName,
      hospitalAddress,
      city,
      contactNumber,
      emergencyLevel,
      additionalMessage,
    } = req.body;

    if (!patientName || !bloodGroup || !unitsRequired || !hospitalName || !hospitalAddress || !city || !contactNumber || !emergencyLevel) {
      res.status(400);
      throw new Error('Please provide all required blood request fields');
    }

    const bloodRequest = await BloodRequest.create({
      userId: req.user._id,
      patientName,
      bloodGroup,
      unitsRequired: Number(unitsRequired),
      hospitalName,
      hospitalAddress,
      city,
      contactNumber,
      emergencyLevel,
      additionalMessage: additionalMessage || '',
      status: 'Pending',
    });

    res.status(201).json({
      message: 'Blood request submitted successfully.',
      requestId: bloodRequest._id,
      request: bloodRequest,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get logged in user's blood requests
// @route   GET /api/requests/my
// @access  Private (User)
const getMyRequests = async (req, res, next) => {
  try {
    const requests = await BloodRequest.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(requests);
  } catch (error) {
    next(error);
  }
};

// @desc    Get all blood requests (Admin view)
// @route   GET /api/requests
// @access  Private/Admin
const getAllRequests = async (req, res, next) => {
  try {
    const requests = await BloodRequest.find({})
      .populate('userId', 'name email phone')
      .sort({ createdAt: -1 });
    res.json(requests);
  } catch (error) {
    next(error);
  }
};

// @desc    Update blood request status
// @route   PUT /api/requests/:id
// @access  Private/Admin
const updateRequestStatus = async (req, res, next) => {
  try {
    const { status, emergencyLevel } = req.body;
    const request = await BloodRequest.findById(req.params.id);

    if (!request) {
      res.status(404);
      throw new Error('Blood request not found');
    }

    if (status) {
      if (!['Pending', 'Accepted', 'Rejected', 'Completed'].includes(status)) {
        res.status(400);
        throw new Error('Invalid request status value');
      }
      request.status = status;
    }

    if (emergencyLevel) {
      request.emergencyLevel = emergencyLevel;
    }

    const updatedRequest = await request.save();
    res.json(updatedRequest);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete blood request
// @route   DELETE /api/requests/:id
// @access  Private (Admin or Request Owner)
const deleteBloodRequest = async (req, res, next) => {
  try {
    const request = await BloodRequest.findById(req.params.id);

    if (!request) {
      res.status(404);
      throw new Error('Blood request not found');
    }

    // Check authorization: must be admin or the owner
    if (req.user.role !== 'admin' && request.userId.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error('Not authorized to delete this request');
    }

    await request.deleteOne();
    res.json({ message: 'Blood request deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createBloodRequest,
  getMyRequests,
  getAllRequests,
  updateRequestStatus,
  deleteBloodRequest,
};
