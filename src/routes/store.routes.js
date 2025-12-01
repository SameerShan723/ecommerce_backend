import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/authorize.middleware.js";
import storeController from "../controllers/store.controller.js";

const router = Router();

// All store management routes require admin role
router.use(authenticate);
router.use(authorize("admin"));

/**
 * @swagger
 * /api/stores:
 *   get:
 *     summary: Get all stores (Admin only)
 *     tags: [Stores]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Stores retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Stores retrieved successfully"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       description:
 *                         type: string
 *                       logo:
 *                         type: string
 *                       address:
 *                         type: object
 *                       contact:
 *                         type: object
 *                       user_id:
 *                         type: string
 *                       isActive:
 *                         type: boolean
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin role required
 */
router.get("/", storeController.getAllStores);
/**
 * @swagger
 * /api/stores:
 *   post:
 *     summary: Create a new store (Admin only)
 *     tags: [Stores]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - seller
 *             properties:
 *               name:
 *                 type: string
 *                 example: "New Store"
 *               description:
 *                 type: string
 *               logo:
 *                 type: string
 *               address:
 *                 type: object
 *                 properties:
 *                   street:
 *                     type: string
 *                   city:
 *                     type: string
 *                   country:
 *                     type: string
 *               contact:
 *                 type: object
 *                 properties:
 *                   email:
 *                     type: string
 *                   phone:
 *                     type: string
 *               seller:
 *                 type: string
 *                 description: Seller user ID
 *     responses:
 *       201:
 *         description: Store created successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin role required
 */
router.post("/", storeController.createStore);
/**
 * @swagger
 * /api/stores/{id}:
 *   get:
 *     summary: Get a single store by ID (Admin only)
 *     tags: [Stores]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Store ID
 *     responses:
 *       200:
 *         description: Store retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Store retrieved successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     description:
 *                       type: string
 *                     logo:
 *                       type: string
 *                     address:
 *                       type: object
 *                       properties:
 *                         street:
 *                           type: string
 *                         city:
 *                           type: string
 *                         country:
 *                           type: string
 *                     contact:
 *                       type: object
 *                       properties:
 *                         email:
 *                           type: string
 *                         phone:
 *                           type: string
 *                     user_id:
 *                       type: string
 *                     isActive:
 *                       type: boolean
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin role required
 *       404:
 *         description: Store not found
 */
router.get("/:id", storeController.getStoreById);
/**
 * @swagger
 * /api/stores/{id}:
 *   put:
 *     summary: Update a store (Admin only)
 *     tags: [Stores]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Store ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               logo:
 *                 type: string
 *               address:
 *                 type: object
 *                 properties:
 *                   street:
 *                     type: string
 *                   city:
 *                     type: string
 *                   country:
 *                     type: string
 *               contact:
 *                 type: object
 *                 properties:
 *                   email:
 *                     type: string
 *                   phone:
 *                     type: string
 *     responses:
 *       200:
 *         description: Store updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Store updated successfully"
 *                 data:
 *                   type: object
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin role required
 *       404:
 *         description: Store not found
 */
router.put("/:id", storeController.updateStore);
/**
 * @swagger
 * /api/stores/{id}:
 *   delete:
 *     summary: Delete a store (Admin only)
 *     tags: [Stores]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Store ID
 *     responses:
 *       200:
 *         description: Store deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Store deleted successfully"
 *                 data:
 *                   type: null
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin role required
 *       404:
 *         description: Store not found
 */
router.delete("/:id", storeController.deleteStore);
/**
 * @swagger
 * /api/stores/{id}/status:
 *   patch:
 *     summary: Pause or activate a store (Admin only)
 *     tags: [Stores]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Store ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - isActive
 *             properties:
 *               isActive:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       200:
 *         description: Store status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Store status updated successfully"
 *                 data:
 *                   type: object
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin role required
 *       404:
 *         description: Store not found
 */

/**
 * @swagger
 * /api/stores/{id}/assign-seller:
 *   post:
 *     summary: Create a new seller user and their store (Admin only)
 *     description: |
 *       This endpoint creates a new seller user account first, then creates a new store for that seller.
 *       The store's user_id field is automatically set to the newly created seller's ID.
 *       Note: The {id} path parameter is not used in the current implementation.
 *     tags: [Stores]
 *     security:
 *       - bearerAuth: []
 *    
 *        
 *      
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - description
 *               - store_name
 *               - contact
 *               - address
 *             properties:
 *               name:
 *                 type: string
 *                 description: Seller's full name
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Seller's email address (used for login)
 *                 example: "seller@example.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Seller's password (will be hashed before storage)
 *                 example: "password123"
 *               description:
 *                 type: string
 *                 description: Description of the store
 *                 example: "A great store for electronics"
 *               store_name:
 *                 type: string
 *                 description: Name of the store to be created
 *                 example: "Electronics Store"
 *               contact:
 *                 type: object
 *                 required:
 *                   - phone
 *                 description: Store contact information
 *                 properties:
 *                   email:
 *                     type: string
 *                     format: email
 *                     description: Store contact email (optional)
 *                     example: "store@example.com"
 *                   phone:
 *                     type: string
 *                     description: Store contact phone number
 *                     example: "+1234567890"
 *               address:
 *                 type: object
 *                 description: Store address
 *                 properties:
 *                   street:
 *                     type: string
 *                     example: "123 Main St"
 *                   city:
 *                     type: string
 *                     example: "New York"
 *                   country:
 *                     type: string
 *                     example: "USA"
 *     responses:
 *       200:
 *         description: Seller user and store created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Seller assigned to store successfully"
 *                 data:
 *                   type: object
 *                   description: Summary of created seller and store
 *                   properties:
 *                     user_name:
 *                       type: string
 *                       description: Name of the created seller user
 *                       example: "John Doe"
 *                     email:
 *                       type: string
 *                       format: email
 *                       description: Email of the created seller user
 *                       example: "seller@example.com"
 *                     store_name:
 *                       type: string
 *                       description: Name of the created store
 *                       example: "Electronics Store"
 *       400:
 *         description: Bad request - Missing required fields or validation error
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       403:
 *         description: Forbidden - Admin role required
 *       409:
 *         description: Conflict - Email already exists
 */
router.post("/:id/assign-seller", storeController.assignSeller);



export default router;
