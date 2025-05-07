const { createLogger, transports, format } = require("winston");
require("winston-daily-rotate-file");

// Setup the logger
const logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.printf(({ timestamp, level, message }) => `${timestamp} [${level.toUpperCase()}]: ${message}`)
  ),
  transports: [
    // Console output for immediate feedback
    // new transports.Console(),

    // Single rotating file
    new transports.DailyRotateFile({
      filename: `logs/app-%DATE%.log`,
      datePattern: "YYYY-MM-DD",
      zippedArchive: false,
      maxFiles: "7d", // Keep logs for 7 days
    }),
  ],
});
// Ensure logging errors don't crash the app
logger.on("error", (err) => {
    console.error("Logger failed:", err);
  });
  
module.exports = logger;
