require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const session = require("express-session");
const authRoutes = require("./routes/authRoutes");
const errorHandler = require("./middleware/errorMiddleware");
const swaggerDocs = require("./config/swaggerConfig");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: process.env.CLIENT_URL, 
  credentials: true
}));

app.use(
  session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true },
  })
);

// Use user routes
app.use("/api/auth", authRoutes);
app.get("/", (req, res) => res.send("Welcome to Node Auth API"));
// Error handling middleware
app.use(errorHandler);
swaggerDocs(app, PORT);

module.exports = app;
