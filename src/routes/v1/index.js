//     1. create a record
//     2.get records
//     3.get records by filters
//     4.update a record
//     5.delete a record
//     6.get total income
//     7.get total expense
//     8.get net balance
//     9.get totalbalance by category
//     10.recent transactions
//     11.monthly summary

const express = require("express")
const RecordController = require("../../controllers/record-controller.js")
const AuthController = require("../../controllers/auth-controller.js")
const Route = express.Router();


const recordController = new RecordController();
const authController = new AuthController();
const {
    validateUserSignUpInput, validateUserLoginInput, validateEmail, validateFiltersInput, validateExpenseByCategoryParams, validateParams, validateRecordInput, validateUpdateRecordInput, validateMontlySummaryInput
} = require("../../middlewares/input-validators.js");
const {
    isAuthenticated, adminOnly, adminOrAnalystOnly
} = require("../../middlewares/auth-middlewares.js");


// middlewares for authentication and validation are yet to be added 
Route.post("/createRecord", isAuthenticated, adminOnly, validateRecordInput, recordController.createRecord);
Route.get("/getRecords/:id", isAuthenticated, validateParams, recordController.getRecords);
Route.get("/getByFilters", isAuthenticated, validateFiltersInput, recordController.getByFilters);
Route.patch("/updateRecord/:id", isAuthenticated, adminOnly, validateUpdateRecordInput, recordController.updateRecord);
Route.delete("/deleteRecord/:id", isAuthenticated, adminOnly, validateParams, recordController.deleteRecord);
Route.get("/total-income/:userId", isAuthenticated, validateParams, recordController.getTotalIncome);
Route.get("/total-expense/:userId", isAuthenticated, validateParams, recordController.getTotalExpense);
Route.get("/net-balance/:userId", isAuthenticated, validateParams, recordController.getNetBalance);
Route.get("/expense-by-category/:category/:userId", isAuthenticated, validateExpenseByCategoryParams, recordController.getExpenseByCategory);
Route.get("/recent-activity/:userId", isAuthenticated, validateParams, recordController.recentActivity);
Route.get("/monthly-summary/:year/:userId", isAuthenticated, validateMontlySummaryInput, recordController.monthlySummary);

// Auth routes

Route.post("/signup", validateUserSignUpInput, authController.signUp);
Route.post("/login", validateUserLoginInput, authController.login);
Route.get("/getUserById/:id", isAuthenticated, validateParams, authController.getUserById);
Route.get("/getUserByEmail", isAuthenticated, validateEmail, authController.getUserByEmail);
Route.patch("/updateUser/:id", isAuthenticated, validateParams, authController.updateUser);
Route.delete("/deleteUser/:id", isAuthenticated, validateParams, authController.deleteUser);
Route.patch("/changeUserRole/:id", isAuthenticated, adminOnly, validateParams, authController.changeUserRole);


module.exports = Route;
