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

const limiter = require("../../middlewares/rate-limiter-middleware.js");

// we can also apply this limiter globally for all routes in index.js file but for demonstration purpose I am applying it here.

// we can also get this userId from the token instead of passing it in the params but for demonstration purpose I am passing it in the params. some function like getByFilters gets userId from token(req.user.id) instead of params

Route.post("/createRecord", isAuthenticated, limiter, adminOnly, validateRecordInput, recordController.createRecord);
Route.get("/getRecords/:id", isAuthenticated, limiter, validateParams, recordController.getRecords);
Route.get("/getByFilters", isAuthenticated, limiter, validateFiltersInput, recordController.getByFilters);
Route.patch("/updateRecord/:id", isAuthenticated, limiter, adminOnly, validateUpdateRecordInput, recordController.updateRecord);
Route.delete("/deleteRecord/:id", isAuthenticated, limiter, adminOnly, validateParams, recordController.deleteRecord);
Route.get("/total-income/:userId", isAuthenticated, limiter, validateParams, recordController.getTotalIncome);
Route.get("/total-expense/:userId", isAuthenticated, limiter, validateParams, recordController.getTotalExpense);
Route.get("/net-balance/:userId", isAuthenticated, limiter, validateParams, recordController.getNetBalance);
Route.get("/expense-by-category/:category/:userId", isAuthenticated, limiter, validateExpenseByCategoryParams, recordController.getExpenseByCategory);
Route.get("/recent-activity/:userId", isAuthenticated, limiter, validateParams, recordController.recentActivity);
Route.get("/monthly-summary/:year/:userId", isAuthenticated, limiter, validateMontlySummaryInput, recordController.monthlySummary);

// Auth routes

Route.post("/signup", limiter, validateUserSignUpInput, authController.signUp);
Route.post("/login", limiter, validateUserLoginInput, authController.login);
Route.get("/getUserById/:id", isAuthenticated, limiter, validateParams, authController.getUserById);
Route.get("/getUserByEmail", isAuthenticated, limiter, validateEmail, authController.getUserByEmail);
Route.patch("/updateUser/:id", isAuthenticated, limiter, validateParams, authController.updateUser);
Route.delete("/deleteUser/:id", isAuthenticated, limiter, validateParams, authController.deleteUser);
Route.patch("/changeUserRole/:id", isAuthenticated, limiter, adminOnly, validateParams, authController.changeUserRole);


module.exports = Route;
