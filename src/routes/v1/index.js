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

const express=require("express")
const RecordController=require("../../controllers/record-controller.js")
const Route=express.Router();

const recordController=new RecordController();
// middlewares for authentication and validation are yet to be added 
Route.post("/createRecord",recordController.createRecord);
Route.get("/getRecords/:id",recordController.getRecords);
Route.get("/getByFilters",recordController.getByFilters);
Route.patch("/updateRecord/:id",recordController.updateRecord);
Route.delete("/deleteRecord/:id",recordController.deleteRecord);
Route.get("/total-income/:userId",recordController.getTotalIncome);
Route.get("/total-expense/:userId",recordController.getTotalExpense);
Route.get("/net-balance/:userId",recordController.getNetBalance);
Route.get("/expense-by-category/:category/:userId",recordController.getExpenseByCategory);
Route.get("/recent-activity/:userId",recordController.recentActivity);
Route.get("/monthly-summary/:year/:userId",recordController.monthlySummary);

module.exports=Route;
