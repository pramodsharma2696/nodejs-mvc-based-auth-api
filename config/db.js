const { Sequelize } = require("sequelize");

  const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false, // Turn off query logging
  });

  const connectDB = async () => {
    try {
      await sequelize.authenticate();
      console.log("MySQL connected");
    } catch (err) {
      console.error("Failed to connect to MySQL:", err.message);
      process.exit(1);
    }
  };
  
  module.exports = { sequelize, connectDB };