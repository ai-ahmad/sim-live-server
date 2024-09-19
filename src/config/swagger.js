// config/swagger.js
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API Documentation',
    version: '2.0.0',
    description: 'API Documentation for the application',
  },
  servers: [
    {
      url: 'http://localhost:5000', // Adjust to your server's URL if needed
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['../routes/*.js'], 
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = { swaggerUi, swaggerSpec };
