import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "E-Commerce API",
      version: "1.0.0",
      description:
        "E-Commerce Platform API with role-based access control (Admin, Seller, Buyer)",
      contact: {
        name: "API Support",
        email: "support@ecommerce.com",
      },
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Development server",
      },
      {
        url: "https://api.ecommerce.com",
        description: "Production server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Enter JWT token",
        },
      },
      schemas: {
        User: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              description: "User ID",
            },
            name: {
              type: "string",
              description: "User's full name",
            },
            email: {
              type: "string",
              format: "email",
              description: "User's email address",
            },
            role: {
              type: "string",
              enum: ["admin", "seller", "buyer"],
              description: "User role",
            },
            addresses: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  street: { type: "string" },
                  city: { type: "string" },
                  country: { type: "string" },
                },
              },
            },
            phone: {
              type: "string",
              description: "Phone number",
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
            },
          },
        },
        LoginRequest: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: {
              type: "string",
              format: "email",
              example: "seller@techhub.com",
            },
            password: {
              type: "string",
              format: "password",
              example: "seller123",
            },
          },
        },
        SignupRequest: {
          type: "object",
          required: ["email", "password", "name"],
          properties: {
            email: {
              type: "string",
              format: "email",
              example: "buyer@example.com",
            },
            password: {
              type: "string",
              format: "password",
              example: "buyer123",
            },
            name: {
              type: "string",
              example: "John Buyer",
            },
            role: {
              type: "string",
              enum: ["admin", "seller", "buyer"],
              default: "buyer",
              example: "buyer",
            },
            addresses: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  street: { type: "string", example: "123 Main St" },
                  city: { type: "string", example: "New York" },
                  country: { type: "string", example: "USA" },
                },
              },
            },
            phone: {
              type: "string",
              example: "1234567890",
            },
            store: {
              type: "string",
              description: "Store ID (required for seller role)",
              example: "507f1f77bcf86cd799439011",
            },
          },
        },
        LoginResponse: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: true,
            },
            message: {
              type: "string",
              example: "Login successful",
            },
            data: {
              type: "object",
              properties: {
                user: {
                  $ref: "#/components/schemas/User",
                },
                token: {
                  type: "string",
                  description: "JWT token",
                  example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                },
              },
            },
          },
        },
        Product: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              description: "Product ID",
            },
            name: {
              type: "string",
              description: "Product name",
            },
            description: {
              type: "string",
              description: "Product description",
            },
            price: {
              type: "number",
              format: "float",
              description: "Product price",
            },
            images: {
              type: "array",
              items: {
                type: "string",
                format: "uri",
              },
              description: "Product images URLs",
            },
            category: {
              type: "string",
              description: "Category ID",
            },
            brand: {
              type: "string",
              description: "Product brand",
            },
            stock: {
              type: "number",
              description: "Available stock",
            },
            rating: {
              type: "number",
              format: "float",
              description: "Product rating",
            },
            reviews: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  user: { type: "string" },
                  comments: { type: "string" },
                  rating: { type: "number" },
                },
              },
            },
            store: {
              type: "string",
              description: "Store ID",
            },
            createdBy: {
              type: "string",
              description: "Seller user ID",
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
            },
          },
        },
        CreateProductRequest: {
          type: "object",
          required: ["name", "description", "price", "category"],
          properties: {
            name: {
              type: "string",
              example: "iPhone 15 Pro",
            },
            description: {
              type: "string",
              example: "Latest iPhone with A17 Pro chip",
            },
            price: {
              type: "number",
              format: "float",
              example: 999.99,
            },
            images: {
              type: "array",
              items: {
                type: "string",
                format: "uri",
              },
              example: ["https://example.com/iphone1.jpg"],
            },
            category: {
              type: "string",
              description: "Category ID",
              example: "507f1f77bcf86cd799439011",
            },
            brand: {
              type: "string",
              example: "Apple",
            },
            stock: {
              type: "number",
              example: 50,
            },
            rating: {
              type: "number",
              format: "float",
              example: 4.8,
            },
            reviews: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  user: { type: "string" },
                  comments: { type: "string" },
                  rating: { type: "number" },
                },
              },
            },
          },
        },
        UpdateProductRequest: {
          type: "object",
          properties: {
            name: {
              type: "string",
            },
            description: {
              type: "string",
            },
            price: {
              type: "number",
              format: "float",
            },
            images: {
              type: "array",
              items: {
                type: "string",
                format: "uri",
              },
            },
            category: {
              type: "string",
            },
            brand: {
              type: "string",
            },
            stock: {
              type: "number",
            },
            rating: {
              type: "number",
              format: "float",
            },
          },
        },
        Pagination: {
          type: "object",
          properties: {
            page: {
              type: "number",
              example: 1,
            },
            limit: {
              type: "number",
              example: 10,
            },
            total: {
              type: "number",
              example: 100,
            },
            totalPages: {
              type: "number",
              example: 10,
            },
          },
        },
        ProductsResponse: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: true,
            },
            message: {
              type: "string",
              example: "Products retrieved successfully",
            },
            data: {
              type: "array",
              items: {
                $ref: "#/components/schemas/Product",
              },
            },
            pagination: {
              $ref: "#/components/schemas/Pagination",
            },
          },
        },
        Error: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: false,
            },
            message: {
              type: "string",
              example: "Error message",
            },
            errors: {
              type: "object",
              description: "Validation errors (optional)",
            },
          },
        },
        SuccessResponse: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: true,
            },
            message: {
              type: "string",
              example: "Operation successful",
            },
            data: {
              type: "object",
              description: "Response data",
            },
          },
        },
      },
    },
    tags: [
      {
        name: "Authentication",
        description: "User authentication endpoints",
      },
      {
        name: "Products",
        description: "Product management endpoints",
      },
      {
        name: "Stores",
        description: "Store management endpoints (Admin only)",
      },
    ],
  },
  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;

