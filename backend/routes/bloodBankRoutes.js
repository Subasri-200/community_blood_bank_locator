const express = require('express');
const router = express.Router();
const {
  getBloodBanks,
  searchBloodBanks,
  getBloodBankById,
  createBloodBank,
  updateBloodBank,
  deleteBloodBank,
} = require('../controllers/bloodBankController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.get('/', getBloodBanks);
router.get('/search', searchBloodBanks);
router.get('/:id', getBloodBankById);

router.post('/', protect, adminOnly, createBloodBank);
router.put('/:id', protect, adminOnly, updateBloodBank);
router.delete('/:id', protect, adminOnly, deleteBloodBank);

module.exports = router;
