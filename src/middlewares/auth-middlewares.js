/**
 * so inputs are now validated now we need to check whether the person is authenticated and setup middlewares for the accessing of different routes based on the role of the user.
 */

const jwt = require('jsonwebtoken');
const { JWT_KEY } = require('../config/server-config');
const { StatusCodes } = require('http-status-codes');
const { User } = require('../models/index');
const ServiceError = require('../helper/service-error');

const isAuthenticated = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            success: false,
            message: "Unauthorized",
            data: {},
            err: "No token provided"
        });
    }
    if (!authHeader.startsWith("Bearer ")) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            success: false,
            message: "Unauthorized",
            data: {},
            err: "Invalid token format"
        });
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = verifyToken(token);
        const user = await User.findByPk(decoded.id);
        if (!user) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                success: false,
                message: "Unauthorized",
                data: {},
                err: "User not found"
            });
        }
        const userDetails = {
            email: user.email,
            id: user.id,
            role: user.role
        };
        req.user = userDetails;
        next();
    } catch (error) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            success: false,
            message: "Unauthorized",
            data: {},
            err: error.message
        });
    }
}

const adminOnly = (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.status(StatusCodes.FORBIDDEN).json({
            success: false,
            message: "Forbidden",
            data: {},
            err: "Access denied. Admin privileges required."
        });
    }
    next();
}

const adminOrAnalystOnly = (req, res, next) => {
    if (req.user.role !== "admin" && req.user.role !== "analyst") {
        return res.status(StatusCodes.FORBIDDEN).json({
            success: false,
            message: "Forbidden",
            data: {},
            err: "Access denied. Admin or Analyst privileges required."
        });
    }
    next();
};


function verifyToken(token) {
    try {
        const response = jwt.verify(token, JWT_KEY);
        return response;
    } catch (error) {
        throw new ServiceError(
            error.message,
            error.explanation,
            error.statusCode
        )
    }
}

module.exports = {
    isAuthenticated,
    adminOnly,
    adminOrAnalystOnly
}