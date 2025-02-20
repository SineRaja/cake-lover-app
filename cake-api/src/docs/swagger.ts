import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Cake API',
      version: '1.0.0',
      description: 'A simple CRUD API for managing cake recipes',
      contact: {
        name: 'API Support',
        email: 'support@cakeapi.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:8000',
        description: 'Development server',
      },
      {
        url: 'https://api.cakeapp.com',
        description: 'Production server',
      },
    ],
    components: {
      schemas: {
        Cake: {
          type: 'object',
          required: ['name', 'comment', 'imageUrl', 'yumFactor'],
          properties: {
            id: {
              type: 'string',
              description: 'Auto-generated unique identifier',
            },
            name: {
              type: 'string',
              description: 'Name of the cake',
            },
            comment: {
              type: 'string',
              description: 'Review or comment about the cake',
              minLength: 5,
              maxLength: 200,
            },
            imageUrl: {
              type: 'string',
              format: 'uri',
              description: 'URL to the cake image',
            },
            yumFactor: {
              type: 'integer',
              description: 'Rating from 1 to 5',
              minimum: 1,
              maximum: 5,
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Creation timestamp',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Last update timestamp',
            },
          },
          example: {
            id: '60d21b4667d0d8992e610c85',
            name: 'Chocolate Fudge Cake',
            comment: 'Rich, moist and absolutely delicious!',
            imageUrl: 'https://example.com/images/chocolate-cake.jpg',
            yumFactor: 5,
            createdAt: '2023-02-01T12:00:00.000Z',
            updatedAt: '2023-02-01T12:00:00.000Z',
          },
        },
        Error: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'Error message',
            },
            field: {
              type: 'string',
              description: 'Field causing the error (if applicable)',
            },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.ts', './src/models/*.ts'],
};

const specs = swaggerJsdoc(options);

export const setupSwagger = (app: Express): void => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
    explorer: true,
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'Cake API Documentation',
  }));
  
  // Serve swagger spec as JSON
  app.get('/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(specs);
  });
};