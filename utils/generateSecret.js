// helpers/generateSecret.js
const crypto = require("crypto");

const generateSecretKey = (length = 64) => {
  return crypto.randomBytes(length).toString("hex");
};

// If run directly, output the key
if (require.main === module) {
  console.log("Generated JWT Secret:", generateSecretKey());
}

module.exports = generateSecretKey;
