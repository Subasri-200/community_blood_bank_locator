const express = require('express');
const router = express.Router();
const {
  createBloodRequest,
  getMyRequests,
  getAllRequests,
  updateRequestStatus,
  deleteBloodRequest,
} = require('../controllers/bloodRequestController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.post('/', protect, createBloodRequest);
router.get('/my', protect, getMyRequests);
router.get('/', protect, adminOnly, getAllRequests);
router.put('/:id', protect, adminOnly, updateRequestStatus);
router.delete('/:id', protect, deleteBloodRequest);

module.exports = router;
