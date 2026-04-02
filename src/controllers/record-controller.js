const { StatusCodes } = require('http-status-codes');
const RecordService = require("../services/record-service");

const recordService = new RecordService();

/*
    1. create a record
    2.get records
    3.get records by filters
    4.update a record
    5.delete a record
    6.get total income
    7.get total expense
    8.get net balance
    9.get totalbalance by category
    10.recent transactions
    11.monthly summary
*/
class RecordController {

    async createRecord(req, res) {
        try {
            const record = await recordService.createRecord(req.body);
            return res.status(StatusCodes.CREATED).json({
                success: true,
                message: "Record created successfully",
                data: record,
                err: {}
            })
        } catch (error) {
            return res.status(error.statusCode).json({
                success: false,
                message: error.message,
                data: {},
                err: error.explanation
            })
        }
    }

    async getRecords(req, res) {
        try {
            const record = await recordService.getRecords(req.params.id);
            return res.status(StatusCodes.OK).json({
                success: true,
                message: "Record fetched successfully",
                data: record,
                err: {}
            })
        } catch (error) {
            return res.status(error.statusCode).json({
                success: false,
                message: error.message,
                data: {},
                err: error.explanation
            })
        }
    }

    async getByFilters(req, res) {
        try {
            const records = await recordService.getByFilters(req.query);
            return res.status(StatusCodes.OK).json({
                success: true,
                message: "Records fetched successfully",
                data: records,
                err: {}
            })
        } catch (error) {
            return res.status(error.statusCode).json({
                success: false,
                message: error.message,
                data: {},
                err: error.explanation
            })
        }
    }

    async updateRecord(req, res) {
        try {
            const record = await recordService.updateRecord(req.params.id, req.body);
            return res.status(StatusCodes.OK).json({
                success: true,
                message: "Record updated successfully",
                data: record,
                err: {}
            })
        } catch (error) {
            return res.status(error.statusCode).json({
                success: false,
                message: error.message,
                data: {},
                err: error.explanation
            })
        }
    }

    async deleteRecord(req, res) {
        try {
            const record = await recordService.deleteRecord(req.params.id);
            return res.status(StatusCodes.OK).json({
                success: true,
                message: "Record deleted successfully",
                data: record,
                err: {}
            })
        } catch (error) {
            return res.status(error.statusCode).json({
                success: false,
                message: error.message,
                data: {},
                err: error.explanation
            })
        }
    }

    async getTotalIncome(req, res) {
        try {
            const totalIncome = await recordService.getTotalIncomeAndExpense(req.params.userId);
            return res.status(StatusCodes.OK).json({
                success: true,
                message: "Total income and expense fetched successfully",
                data: totalIncome.totalIncome,
                err: {}
            })
        } catch (error) {
            return res.status(error.statusCode).json({
                success: false,
                message: error.message,
                data: {},
                err: error.explanation
            })
        }
    }

    async getTotalExpense(req, res) {
        try {
            const totalExpense = await recordService.getTotalIncomeAndExpense(req.params.userId);
            return res.status(StatusCodes.OK).json({
                success: true,
                message: "Total expense fetched successfully",
                data: totalExpense.totalExpense,
                err: {}
            })
        } catch (error) {
            return res.status(error.statusCode).json({
                success: false,
                message: error.message,
                data: {},
                err: error.explanation
            })
        }
    }

    async getNetBalance(req, res) {
        try {
            const netBalance = await recordService.getTotalIncomeAndExpense(req.params.userId);
            return res.status(StatusCodes.OK).json({
                success: true,
                message: "Net balance fetched successfully",
                data: netBalance.netBalance,
                err: {}
            })
        } catch (error) {
            return res.status(error.statusCode).json({
                success: false,
                message: error.message,
                data: {},
                err: error.explanation
            })
        }
    }

    async getExpenseByCategory(req, res) {
        try {
            const balance = await recordService.getTotalExpenseByCategory(req.params.category,req.params.userId);
            return res.status(StatusCodes.OK).json({
                success: true,
                message: "Total expense by category fetched successfully",
                data: balance,
                err: {}
            })
        } catch (error) {
            return res.status(error.statusCode).json({
                success: false,
                message: error.message,
                data: {},
                err: error.explanation
            })
        }
    }

    async recentActivity(req, res) {
        try {
            const records = await recordService.recentActivity(req.params.userId);
            return res.status(StatusCodes.OK).json({
                success: true,
                message: "Recent activity fetched successfully",
                data: records,
                err: {}
            })
        } catch (error) {
            return res.status(error.statusCode).json({
                success: false,
                message: error.message,
                data: {},
                err: error.explanation
            })
        }
    }

    async monthlySummary(req, res) {
        try {
            const summary = await recordService.monthlySummary(req.params.year, req.params.userId);
            return res.status(StatusCodes.OK).json({
                success: true,
                message: "Monthly summary fetched successfully",
                data: summary,
                err: {}
            })
        } catch (error) {
            return res.status(error.statusCode).json({
                success: false,
                message: error.message,
                data: {},
                err: error.explanation
            })
        }
    }
}

module.exports = RecordController;

