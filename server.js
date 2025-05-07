const app = require("./app");
const { connectDB, sequelize } = require("./config/db");

const PORT = process.env.PORT || 3000;

// Connect DB and sync models
connectDB()
  .then(() => sequelize.sync({ alter: false }))
  .then(() => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
  })
  .catch((err) => console.error("DB Sync failed:", err));

