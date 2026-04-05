import express from 'express';
import {
  getTransactions,
  getTransactionSummary,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} from '../controllers/transactionController.js';

const router = express.Router();

router.route('/').get(getTransactions).post(createTransaction);
router.route('/summary').get(getTransactionSummary);
router.route('/:id').put(updateTransaction).delete(deleteTransaction);

export default router;
