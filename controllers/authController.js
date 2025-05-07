const logger = require('../utils/logger');
const userService = require("../services/userService");
const { sendEmail } = require("../services/mailService");
const apiResponse = require("../utils/responseHelper");

const register = async (req, res, next) => {
    try {
      const user = await userService.registerUser(req.body);
      const userData = { id: user.id, name: user.name, email: user.email, createdAt: user.createdAt, updatedAt: user.updatedAt };
      // Send welcome email
     await sendEmail(
        user.email,
        "Welcome to Our Platform!",
        `Hi ${user.name}, welcome to our app!`,
        `<h1>Welcome, ${user.name}!</h1><p>We’re glad to have you with us.</p>`
      );
      apiResponse(res, true, 201, "User created successfully", userData);
    } catch (err) {
      next(err);
    }
  };
  const login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const data = { user, token } = await userService.authenticateUser(email, password);
      logger.info(`User logged in: ${email}`);
      res.cookie("token", token, { httpOnly: true });
      apiResponse(res, true, 200, "Login successful", data);
    } catch (err) {
      next(err);
    }
  };

  const profile = async (req, res) => {
    const user = await userService.getUserProfile(req.user.id);
    const userData = { id: user.id, name: user.name, email: user.email, createdAt: user.createdAt, updatedAt: user.updatedAt };
    apiResponse(res, true, 200, "Welcome to your profile", userData);
  };

const logout = (req, res) => {
  res.clearCookie("token");
  apiResponse(res, true, 200, "Logged out successfully");
};

module.exports = { register, profile, login, logout };
