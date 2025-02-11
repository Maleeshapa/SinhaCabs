const { DataTypes } = require("sequelize");
const sequelize = require("../dbConfig");

const ExpensesCat = sequelize.define(
    "ExpensesCat",
    {
        expensesCatId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        expensesCatName: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        expensesCatType: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        tableName: "expensescat",
        timestamps: false,
    }
);
module.exports = ExpensesCat;