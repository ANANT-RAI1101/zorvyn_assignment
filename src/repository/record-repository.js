const { Record } = require('../models/index');

const AppError = require("../utils/App-error");
const ValidationError = require("../utils/validation-error")
const { StatusCodes } = require('http-status-codes')

// Creating records
// Viewing records
// Updating records
// Deleting records
// Filtering records based on criteria such as date, category, or type
class RecordRepository {
    async createRecord(data) {
        try {
            const response = await Record.create(data);
            return response;
        } catch (error) {
            if (error.name === "SequelizeValidationError") {
                throw new ValidationError(error);
            }
            throw new AppError(
                "App Error",
                "Failed to create record",
                "An error occurred while creating the record",
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }
    async getRecords(recordId) {
        try {
            const response = await Record.findByPk(recordId);
            return response;
        } catch (error) {
            if (error.name === "SequelizeValidationError") {
                throw new ValidationError(error);
            }
            throw new AppError(
                "App Error",
                "Failed to get record",
                "An error occurred while fetching the record",
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }
    async getByFilters(filters) {
        try {
            const response = await Record.findAll({
                where: filters
            });

            return response;
        } catch (error) {
            if (error.name === "SequelizeValidationError") {
                throw new ValidationError(error);
            }

            throw new AppError(
                "App Error",
                "Failed to get records",
                "An error occurred while fetching the records",
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }

    async updateRecord(recordId, data) {
        try {
            const response = await Record.update(data, {
                where: {
                    recordId: recordId
                }
            });
            return response;
        } catch (error) {
            if (error.name === "SequelizeValidationError") {
                throw new ValidationError(error);
            }
            throw new AppError(
                "App Error",
                "Failed to update record",
                "An error occurred while updating the record",
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }

    async deleteRecord(recordId) {
        try {
            const response = await Record.destroy({
                where: {
                    recordId: recordId
                }
            });
            return response;
        } catch (error) {
            if (error.name === "SequelizeValidationError") {
                throw new ValidationError(error);
            }
            throw new AppError(
                "App Error",
                "Failed to delete record",
                "An error occurred while deleting the record",
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }
}

module.exports = RecordRepository;