const AuthRepository = require("../repository/auth-repository.js");
const AppError = require("../helper/app-error.js");
const ServiceError = require("../helper/service-error.js");
const jwt = require('jsonwebtoken');
const { StatusCodes } = require("http-status-codes");

class AuthService {
    constructor() {
        this.authRepository = new AuthRepository();
    }

    async signUp(data) {
        try {
            /**
             * user only sends email and password through body. We will hash the password and then save it to the database,and also assign viewer role by default
             */
            const userData = {
                ...data,
                role: "viewers"
            };
            const user = await this.authRepository.createUser(userData);
            return user;
        } catch (error) {
            if (error.name == "SequelizeValidationError" || error.name == "Repository Error") {
                throw error
            }
            if (error.name === "SequelizeUniqueConstraintError") {
                throw new AppError(
                    "Duplicate Email",
                    "User already exists",
                    "A user with this email already exists",
                    StatusCodes.BAD_REQUEST
                );
            }
            throw new ServiceError(
                error.message,
                error.explanation,
                error.statusCode

            )
        }
    }

    async login(data) {
        try {
            const user = await this.authRepository.getUserByEmail(data.email);
            if (!user) {
                throw new AppError(
                    "Invalid Credentials",
                    "User not found",
                    "No user found with the provided email",
                    StatusCodes.NOT_FOUND
                );
            }
            const isPasswordValid = await this.comparePassword(data.password, user.password);
            if (!isPasswordValid) {
                throw new AppError(
                    "Invalid Credentials",
                    "Incorrect password",
                    "The password you entered is incorrect",
                    StatusCodes.UNAUTHORIZED
                );
            }
            const jwtToken = this.createToken({ email: user.email, id: user.id });
            return {
                token: jwtToken,
                user: {
                    email: user.email,
                    id: user.id,
                    role: user.role
                }
            };
        } catch (error) {
            if (error instanceof AppError) throw error;
            throw new ServiceError(
                error.message,
                error.explanation,
                error.statusCode
            );
        }
    }
    createToken(user) {
        try {
            const result = jwt.sign(user, JWT_KEY, { expiresIn: '1d' });
            return result;
        } catch (error) {
            throw new ServiceError(
                error.message,
                error.explanation,
                error.statusCode
            )
        }

    }

    async comparePassword(userPlainPassword, encryptedPassword) {
        try {
            return await bcrypt.compareSync(userPlainPassword, encryptedPassword)
        } catch (error) {
            throw new ServiceError(
                error.message,
                error.explanation,
                error.statusCode
            )
        }
    }

    async destroyUser(userId) {
        try {
            const response = await this.authRepository.destroyUser(userId);
            return response;
        } catch (error) {
            throw new ServiceError(
                error.message,
                error.explanation,
                error.statusCode
            );
        }
    }

    async updateUser(userId, data) {
        try {
            const response = await this.authRepository.updateUser(userId, data);
            return response;
        } catch (error) {
            throw new ServiceError(
                error.message,
                error.explanation,
                error.statusCode
            );
        }
    }

    async getUserById(userId) {
        try {
            const response = await this.authRepository.getUserById(userId);
            return response;
        } catch (error) {
            throw new ServiceError(
                error.message,
                error.explanation,
                error.statusCode
            );
        }
    }

    async getUserByEmail(userEmail) {
        try {
            const response = await this.authRepository.getUserByEmail(userEmail);
            return response;
        } catch (error) {

            throw new ServiceError(
                error.message,
                error.explanation,
                error.statusCode
            );
        }
    }

    async makeAdminOrAnalyst(userId, role) {
        try {
            const response = await this.authRepository.updateUser(userId, role);
            return response;
        } catch (error) {
            throw new ServiceError(
                error.message,
                error.explanation,
                error.statusCode
            );
        }
    }
}

module.exports = AuthService;