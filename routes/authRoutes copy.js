const express = require("express");
const router = express.Router();
const { register, login, profile, logout } = require("../controllers/authController");

// Middlewares
const authMiddleware = require("../middleware/authMiddleware");
const loginLimiter  = require('../middleware/rateLimiter');
const { registerValidation, loginValidation } = require("../middleware/validators/authValidator");
const validateResult = require("../middleware/validateResult");

// route
router.post("/register", registerValidation, validateResult, register);
router.post("/login",loginValidation,validateResult, loginLimiter,login);
router.post("/logout", logout);

// Protected Route
router.get("/profile",authMiddleware, profile);

module.exports = router;
