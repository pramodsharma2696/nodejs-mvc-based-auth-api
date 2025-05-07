const { hashPassword, comparePassword } = require("./authService");
const { generateToken } = require("./jwtService");
const userRepository = require("../repositories/userRepository");

const registerUser = async ({ name, email, password }) => {
  const existingUser = await userRepository.findByEmail(email);
  if (existingUser) throw new Error("User already exists");

  const hashedPassword = await hashPassword(password);
  return await userRepository.createUser({ name, email, password: hashedPassword });
};

const authenticateUser = async (email, password) => {
  const user = await userRepository.findByEmail(email);
  if (!user || !(await comparePassword(password, user.password))) {
    throw new Error("Invalid email or password");
  }

  const token = generateToken(user);
  const userData = { id: user.id, name: user.name, email: user.email, createdAt: user.createdAt, updatedAt: user.updatedAt };
  return { user: userData, token };
};

const getUserProfile = (userId) => userRepository.findById(userId);

module.exports = { registerUser, authenticateUser, getUserProfile };
