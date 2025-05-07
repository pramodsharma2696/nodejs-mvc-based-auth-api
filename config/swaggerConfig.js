const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Swagger options
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Node Auth API",
      version: "1.0.0",
      description: "API documentation for authentication system",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Local server",
      },
    ],
  },
  apis: ["./routes/*.js"], // Path to API route files
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJsdoc(options);

const swaggerDocs = (app, port) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log(`📘 Swagger Docs available at http://localhost:${port}/api-docs`);
};

module.exports = swaggerDocs;
