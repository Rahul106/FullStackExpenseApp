const path = require('path');
const rootDir = require('../utils/path');
const Expense = require('../models/expense');

// Import the DateUtils module if it's in a separate file
const date = require('../utils/date');
const DateUtils = require('../utils/date');


// Fetch expense by ID
exports.fetchExpenseById = async (req, res, next) => {

    try {

        const expense = await Expense.findByPk(req.params.id);
        if (expense) {
            res.json(expense);
        } else {
            res.status(404).send('Expense not found');
        }

    } catch (error) {
        console.error('Error fetching expense:', error);
        res.status(500).send('An error occurred while fetching the expense');
    }

};


// Update expense by ID
exports.updateExpense = async (req, res, next) => {
    try {
        const { n_expNum, n_expName, n_expAmount, n_expDate, n_imgInput } = req.body;

        // Update expense with the given ID
        const updatedExpense = await Expense.update(
            {
                exp_number: n_expNum,
                exp_name: n_expName,
                exp_amount: n_expAmount,
                exp_date: n_expDate,
                exp_img: n_imgInput
            },
            {
                where: { exp_id: req.params.id } // Find expense by ID
            }
        );

        // Check if the expense was updated
        if (updatedExpense[0] === 1) {
            res.status(200).send('Expense updated successfully');
        } else {
            res.status(404).send('Expense not found');
        }
    } catch (error) {
        console.error('Error updating expense:', error);
        res.status(500).send('An error occurred while updating the expense');
    }
};


exports.deleteExpense = async (req, res, next) => {

    try {

        console.log(`Request-Param-Id to be deleted: {req.params.id}`);
        await Expense.destroy({ where: { exp_id: req.params.id } });
        res.status(200).send('User deleted successfully');

    } catch (err) {
        console.log(err);
        res.status(500).send('Error deleting user');
    }

};


exports.fetchAllExpense = async (req, res, next) => {

    try {
        
        const expenses = await Expense.findAll();
        console.log(`All-Expenses : ${expenses}`);

        res.json(expenses);
    
    } catch (error) {
        console.error('Error fetching expenses:', error);
        res.status(500).send('An error occurred while fetching expenses.');
    }

}


exports.postAddExpense = async (req, res, next) => {

    try {
        // Extract data from request body
        const { n_expNum, n_expName, n_expAmount, n_expDate, n_imgInput} = req.body;

        // Create expense object
        const expense = await Expense.create({
            exp_number: n_expNum,
            exp_name: n_expName,
            exp_amount: n_expAmount,
            exp_date: n_expDate,
            exp_img: n_imgInput,
        });

        // Return success response
        res.status(201).send("Exepense Added.")
    } catch (error) {
        // Handle errors
        console.error('Error creating expense:', error);
        res.status(500).send('Expense Not Added');
    }

};
