const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expense');

// resolve the expense app  form
router.post('/insert-expense', expenseController.postAddExpense);
router.get('/fetch-allexpenses', expenseController.fetchAllExpense);
router.delete('/delete-expense/:id', expenseController.deleteExpense);
router.put('/update-expense/:id', expenseController.updateExpense);

module.exports = router;