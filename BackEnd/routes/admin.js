const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');

// resolve the expense app index form
router.get('/totalexpense', adminController.fetchAllExpensesWithTotal);

module.exports = router;