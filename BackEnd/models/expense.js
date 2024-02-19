const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const Expense = sequelize.define('expense', {

    exp_id: {
        type: DataTypes.INTEGER,
        //type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    exp_number: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    exp_name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    exp_amount: {
        type: DataTypes.STRING,
        allowNull: false
    },

    exp_date: {
        type: DataTypes.DATE,
        allowNull: false
    },

    exp_img: {
        type: DataTypes.TEXT,
        allowNull: false
    },

});

module.exports = Expense;
