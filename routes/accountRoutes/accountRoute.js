import express from 'express';
import {
  createAccount,
  getAllAccountDetails,
  getAccountById,
  updateAccount,
  deleteAccount
} from '../../controller/accountsController/accountController.js';
import logActivity from '../../middlewares/logActivity.js';

const router = express.Router();

// Create Account
router.post('/', logActivity, createAccount);

// Get All Account details
router.get('/', logActivity, getAllAccountDetails);

// Get Account by ID
router.get('/:id', logActivity, getAccountById);

// Update Account
router.put('/:id', logActivity, updateAccount);

// Delete Account
router.delete('/:id', logActivity, deleteAccount);

export default router;
