const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const express = require("express");

const router = express.Router();

const option = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "LocalRunway api with swagger",
      version: "0.0.1",
      description: "This is a semester 7 project made by team NLCT",

      contact: {
        name: "Team NLCT",
        url: "https://drive.google.com/drive/u/1/folders/1bSgk621tKv0us-xCFOMS09eLUCPNrTz6",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./swagger/*.js"],
};

const specs = swaggerJsDoc(option);

router.use("/", swaggerUi.serve, swaggerUi.setup(specs));

module.exports = { apiDocRouter: router };
