const AuthService = require("../services/auth-service.js");
const { StatusCodes } = require("http-status-codes");

const authService = new AuthService();

/*
 1. signUp
 2. login 
 3.update
 4.delete
 5.get by id
 6. get by email
 7. change role 
*/


class AuthController {

    async signUp(req, res) {
        try {
            const user = await authService.signUp(req.body);
            return res.status(StatusCodes.CREATED).json({
                success: true,
                message: "User created successfully",
                data: {
                    userEmail: user.email,
                    userRole: user.role,
                    userId: user.id
                },
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

    async login(req, res) {
        try {
            const loggedInUser = await authService.login(req.body);
            return res.status(StatusCodes.OK).json({
                success: true,
                message: "User logged in successfully",
                data: loggedInUser,
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

    async updateUser(req, res) {
        try {
            const response = await authService.updateUser(req.params.id, req.body);
            return res.status(StatusCodes.OK).json({
                success: true,
                message: "User updated successfully",
                data: response,
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

    async deleteUser(req, res) {
        try {
            const response = await authService.destroyUser(req.params.id);
            return res.status(StatusCodes.OK).json({
                success: true,
                message: "User deleted successfully",
                data: response,
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

    async getUserById(req, res) {
        try {
            const user = await authService.getUserById(req.params.id);
            return res.status(StatusCodes.OK).json({
                success: true,
                message: "User fetched successfully",
                data: user,
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

    async getUserByEmail(req, res) {
        try {
            const user = await authService.getUserByEmail(req.body);
            return res.status(StatusCodes.OK).json({
                success: true,
                message: "User fetched successfully",
                data: user,
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

    async changeUserRole(req, res) {
        try {
            const response = await authService.makeAdminOrAnalyst(req.params.id, req.body);
            return res.status(StatusCodes.OK).json({
                success: true,
                message: "User role updated successfully",
                data: response,
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

module.exports = AuthController;
