// Import Expense model
const Expense = require('../models/expense');

// Function to calculate and return the total expense
async function calculateTotalExpense() {
    try {
        // Fetch all expenses from the database
        const expenses = await Expense.findAll();

        // Initialize total expense
        let totalExpense = 0;

        // Loop through each expense and sum up the amounts
        expenses.forEach((expense) => {
            totalExpense += parseFloat(expense.exp_amount);
        });

        // Return the total expense
        return totalExpense.toFixed(2);
    } catch (error) {
        console.error('Error calculating total expense:', error);
        throw new Error('An error occurred while calculating total expense');
    }
}

module.exports = calculateTotalExpense;
