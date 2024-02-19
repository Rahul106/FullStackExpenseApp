// Import Expense model
const Expense = require('../models/expense');

const calculateTotalExpense = require('../utils/totalexpense');

// Route handler to fetch all expenses along with the total expense
exports.fetchAllExpensesWithTotal = async (req, res, next) => {
    try {
        // Calculate total expense
        const totalExpense = await calculateTotalExpense();

        // Fetch all expenses
        const expenses = await Expense.findAll();

        // Send response with expenses and total expense
        res.json({totalExpense });
        
    } catch (error) {
        console.error('Error fetching expenses with total expense:', error);
        res.status(500).send('An error occurred while fetching expenses with total expense');
    }
};
