/**
 * 1. create user->{by default we give it a viewer role and the analyst and admin role can only be given by admins }
 * 2.login user->{hash password check and jwt generation}
 */

const { User } = require("../models/index");
const AppError  = require("../helper/app-error");
const ValidationError = require("../helper/validation-error");
const { StatusCodes } = require('http-status-codes');

class AuthRepository {

    async createUser(data) {
        try {
            const user = await User.create(data);
            return user;
        } catch (error) {
            if (error.name === "SequelizeValidationError") {
                throw new ValidationError(error);
            }
            throw new AppError(
                "App Error",
                "Failed to create user",
                "An error occurred while creating the user",
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }

    async destroyUser(userId) {
        try {
            const response = await User.destroy({
                where: {
                    id: userId
                }
            })
            if (!response) {
                throw new AppError(
                    "Not Found",
                    "Resource not found",
                    "Nothing to delete",
                    StatusCodes.NOT_FOUND
                );
            }
            return response;
        } catch (error) {
            if (error instanceof AppError) throw error;
            throw new AppError(
                "Repository Error",
                "cannot delete what requested ",
                "there is some error in deleting the request . Please try again later",
                StatusCodes.INTERNAL_SERVER_ERROR
            )
        }
    }

    async getUserById(userId) {
        try {
            const response = await User.findOne({
                where: {
                    id: userId
                }
            })
            if (!response) {
                throw new AppError(
                    "Not Found",
                    "Resource not found",
                    "The requested record doesn't exist",
                    StatusCodes.NOT_FOUND
                );
            }
            return response;
        } catch (error) {
            if (error instanceof AppError) throw error;
            throw new AppError(
                "Repository Error",
                "cannot get what requested ",
                "there is some error in getting the request . Please try again later",
                StatusCodes.INTERNAL_SERVER_ERROR
            )
        }
    }

    async getUserByEmail(userEmail) {
        try {
            const user = await User.findOne({
                where: {
                    email: userEmail
                }
            });
            if (!user) {
                throw new AppError(
                    "Not Found",
                    "User not found",
                    "No user exists with this email",
                    StatusCodes.NOT_FOUND
                );
            }
            return user;
        } catch (error) {
            if (error instanceof AppError) throw error;
            throw new AppError(
                "Repository Error",
                "cannot get what requested ",
                "there is some error in getting the request . Please try again later",
                StatusCodes.INTERNAL_SERVER_ERROR
            )
        }
    }
    async updateUser(userId, data) {
        try {
            const [response] = await User.update(data, {
                where: {
                    id: userId
                }
            });
            if (response === 0) {
                throw new AppError(
                    "Not Found",
                    "Resource not found",
                    "Nothing to update",
                    StatusCodes.NOT_FOUND
                );
            }
            return response;
        } catch (error) {
            if (error.name == "SequelizeValidationError") {
                throw new ValidationError(error);
            }
            if (error instanceof AppError) throw error;
            throw new AppError(
                "Repository Error",
                "cannot upadate what requested ",
                "there is some error in updating the request . Please try again later",
                StatusCodes.INTERNAL_SERVER_ERROR
            )
        }
    }
}

module.exports = AuthRepository;


