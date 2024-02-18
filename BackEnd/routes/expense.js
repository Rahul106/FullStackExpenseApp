const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expense');

// Route for user submission
router.get('/', expenseController.resolveIndexForm);

module.exports = router;