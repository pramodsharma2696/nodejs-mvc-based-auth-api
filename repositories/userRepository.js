const User = require("../models/User");

const findByEmail = (email) => User.findOne({ where: { email } });
const findById = (id) => User.findByPk(id);
const createUser = (userData) => User.create(userData);

module.exports = { findByEmail, findById, createUser };
