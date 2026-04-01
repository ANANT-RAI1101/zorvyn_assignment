const RecordRepository = require('../repository/record-repository');
const AppError = require('../helper/app-error');
const ServiceError = require('../helper/service-error');
const { StatusCodes } = require('http-status-codes');
const { Op } = require("sequelize");

class RecordService {
    constructor() {
        this.recordRepository = new RecordRepository();
    }

    async createRecord(data) {
        try {
            const record = await this.recordRepository.createRecord(data);
            return record;
        } catch (error) {
            if (error.name == "SequelizeValidationError" || error.name == "Repository Error") {
                throw error
            }
            throw new ServiceError(
                error.message,
                error.explanation,
                error.statusCode

            )
        }
    }

    async getRecords(recordId) {
        try {
            const record = await this.recordRepository.getRecords(recordId);
            return record;
        } catch (error) {
            if (error.name == "SequelizeValidationError" || error.name == "Repository Error") {
                throw error
            }
            throw new ServiceError(
                error.message,
                error.explanation,
                error.statusCode
            )
        }
    }

    async getByFilters(filters) {
        try {
            const page = parseInt(filters.page) || 1;
            const limit = parseInt(filters.limit) || 10;

            const offset = (page - 1) * limit;

            const options = {
                limit,
                offset,
                order: [["date", "DESC"]]
            };
            const filter = {};
            if (filters.type) {
                filter.type = filters.type;
            }

            if (filters.category) {
                filter.category = filters.category;
            }

            if (filters.startDate && filters.endDate) {
                filter.date = {
                    [Op.between]: [filters.startDate, filters.endDate]
                };
            }

            const records = await this.recordRepository.getByFilters(filter, options);
            if (records.length === 0 && page > 1) {
                throw new AppError({
                    name: "No Records Found",
                    message: "No more records available",
                    explanation: "The requested page does not have any records",
                    statusCode: StatusCodes.NOT_FOUND
                })
            }
            return records;
        } catch (error) {
            if (error.name == "SequelizeValidationError" || error.name == "Repository Error") {
                throw error
            }
            throw new ServiceError(
                error.message,
                error.explanation,
                error.statusCode
            );
        }
    }

    async updateRecord(recordId, data) {
        try {
            const record = await this.recordRepository.updateRecord(recordId, data);
            return record;
        } catch (error) {
            if (error.name == "SequelizeValidationError" || error.name == "Repository Error") {
                throw error
            }
            throw new ServiceError(
                error.message,
                error.explanation,
                error.statusCode
            );
        }
    }

    async deleteRecord(recordId) {
        try {
            const record = await this.recordRepository.deleteRecord(recordId);
            return record;
        } catch (error) {
            if (error.name == "SequelizeValidationError" || error.name == "Repository Error") {
                throw error
            }
            throw new ServiceError(
                error.message,
                error.explanation,
                error.statusCode
            );
        }
    }

    async getTotalIncomeAndExpense() {
        try {
            // for income 
            // it is implemented through js logic instead of sql query
            const income = await this.recordRepository.getByFilters({ type: "income" });
            const totalIncome = income.reduce((total, record) => {
                return total + record.amount;
            }, 0)

            // for expense
            const expense = await this.recordRepository.getByFilters({ type: "expense" });
            const totalexpense = expense.reduce((total, record) => {
                return total + record.amount;
            }, 0)

            const netBalance = totalIncome - totalexpense;

            return {
                totalIncome,
                totalexpense,
                netBalance
            }
        } catch (error) {
            throw new ServiceError(
                error.message,
                error.explanation,
                error.statusCode
            );
        }
    }

    async getTotalExpenseByCategory(category) {
        try {
            const filter = {
                type: "expense",
                category: category
            };
            const categoryExpenses = await this.recordRepository.getByFilters(filter)
            const totalCategoryExpense = categoryExpenses.reduce((total, record) => {
                return total + record.amount;
            }, 0)
            return totalCategoryExpense;
        } catch (error) {
            throw new ServiceError(
                error.message,
                error.explanation,
                error.statusCode
            );
        }
    }

    async recentActivity() {
        try {
            const options = {
                limit: 5,
                offset: 0,
                order: [["date", "DESC"]]
            };
            const records = await this.recordRepository.getByFilters({}, options);
            return records;
        } catch (error) {
            throw new ServiceError(
                error.message,
                error.explanation,
                error.statusCode
            );
        }
    }

    async monthlySummary(year) {
        try {
            const monthlyRecords = await this.recordRepository.getMonthlySummary(year);
            const trends = monthlyRecords.map(record => ({
                month: monthNames[record.get('month') - 1],
                totalIncome: parseFloat(record.get('totalIncome') || 0),
                totalExpense: parseFloat(record.get('totalExpense') || 0),
                netBalance: parseFloat(record.get('totalIncome')) - parseFloat(record.get('totalExpense'))
            }));
            return trends;
        } catch (error) {
            throw new ServiceError(
                error.message,
                error.explanation,
                error.statusCode
            );
        }
    }

}