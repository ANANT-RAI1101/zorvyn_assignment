/**
 * all routes like creation and login signup and all params , query , body needs to be validated  requires input validation
 */

const { StatusCodes } = require('http-status-codes');

const validateUserSignUpInput = (req, res, next) => {
    if (!req.body.email || !req.body.password) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: "something went wrong",
            err: "email or password is missing",
            success: false,
        });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(req.body.email)) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: "Invalid email format",
            err: "Email validation failed",
        });
    }


    if (req.body.password.length < 8 && req.body.password.length > 100) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: "Password must be at least 8 characters and not exceed 100 characters",
            err: "Invalid password length",
        });
    }
    next();
}

const validateUserLoginInput = (req, res, next) => {
    if (!req.body.email || !req.body.password) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: "something went wrong",
            err: "email or password is missing",
            success: false,
        });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(req.body.email)) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: "Invalid email format",
            err: "Email validation failed",
        });
    }


    if (req.body.password.length < 8 && req.body.password.length > 100) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: "Password must be at least 8 characters and not exceed 100 characters",
            err: "Invalid password length",
        });
    }
    next();
}

const validateRecordInput = (req, res, next) => {
    if (!req.body.amount || !req.body.category || !req.body.date || !req.body.userId || !req.body.type) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: "something went wrong",
            err: "amount or category or date or userId or type is missing",
            success: false,
        });
    }
    if (req.body.amount <= 0) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: "Invalid amount",
            err: "Amount must be greater than zero",
            success: false,
        });
    }
    if (req.body.type !== "income" && req.body.type !== "expense") {
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: "Invalid type",
            err: "Type must be either 'income' or 'expense'",
            success: false,
        });
    }

    const dateRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
    if (!dateRegex.test(req.body.date)) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: "Invalid date format",
            err: "Date must be in the format 'YYYY-MM-DD HH:MM:SS'",
            success: false,
        });
    }
    next();
}

const validateParams = (req, res, next) => {
    if (!req.params.id) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: "something went wrong",
            err: "id is missing",
            success: false,
        });
    }
    if (Number.isNaN(req.params.id)) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: "Invalid id format",
            err: "Id must be a number",
            success: false,
        });
    }

    next();
}

const validateUpdateRecordInput = (req, res, next) => {
    if (!req.params.id) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: "something went wrong",
            err: "id is missing",
            success: false,
        });
    }
    if (Number.isNaN(req.params.id)) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: "Invalid id format",
            err: "Id must be a number",
            success: false,
        });
    }

    if (!req.body.amount || !req.body.category || !req.body.date || !req.body.userId || !req.body.type) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: "something went wrong",
            err: "amount or category or date or userId or type is missing",
            success: false,
        });
    }
    if (req.body.amount <= 0) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: "Invalid amount",
            err: "Amount must be greater than zero",
            success: false,
        });
    }
    if (req.body.type !== "income" && req.body.type !== "expense") {
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: "Invalid type",
            err: "Type must be either 'income' or 'expense'",
            success: false,
        });
    }

    const dateRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
    if (!dateRegex.test(req.body.date)) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: "Invalid date format",
            err: "Date must be in the format 'YYYY-MM-DD HH:MM:SS'",
            success: false,
        });
    }
    next();
}

const validateMontlySummaryInput = (req, res, next) => {
    const { year, userId } = req.query;
    if (!year || !userId) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: "something went wrong",
            err: "year or userId is missing",
            success: false,
        });
    }
    if (Number.isNaN(userId)) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: "Invalid userId format",
            err: "userId must be a number",
            success: false,
        });
    }
    if (Number.isNaN(year) ) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: "Invalid year format",
            err: "year must be a number",
            success: false,
        });
    }
    next();
}


module.exports = {
    validateUserSignUpInput,
    validateUserLoginInput,
    validateParams,
    validateUpdateRecordInput,
    validateMontlySummaryInput
}