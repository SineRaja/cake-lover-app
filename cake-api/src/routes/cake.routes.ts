import { Router } from 'express';
import * as cakeController from '../controllers/cake.controller';
import { validateCake, validateObjectId } from '../middleware/validation.middleware';

const router = Router();

/**
 * @swagger
 * /api/cakes:
 *   get:
 *     summary: Get all cakes
 *     description: Retrieve a list of all cakes with name and image URL
 *     responses:
 *       200:
 *         description: A list of cakes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   imageUrl:
 *                     type: string
 */
router.get('/', cakeController.getAllCakes);

/**
 * @swagger
 * /api/cakes/{id}:
 *   get:
 *     summary: Get a cake by ID
 *     description: Retrieve a single cake by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A cake object
 *       404:
 *         description: Cake not found
 */
router.get('/:id', validateObjectId, cakeController.getCakeById);

/**
 * @swagger
 * /api/cakes:
 *   post:
 *     summary: Create a new cake
 *     description: Add a new cake to the collection
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - comment
 *               - imageUrl
 *               - yumFactor
 *             properties:
 *               name:
 *                 type: string
 *               comment:
 *                 type: string
 *                 minLength: 5
 *                 maxLength: 200
 *               imageUrl:
 *                 type: string
 *                 format: uri
 *               yumFactor:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *     responses:
 *       201:
 *         description: Cake created successfully
 *       400:
 *         description: Invalid request data
 *       409:
 *         description: A cake with this name already exists
 */
router.post('/', validateCake, cakeController.createCake);

/**
 * @swagger
 * /api/cakes/{id}:
 *   put:
 *     summary: Update a cake
 *     description: Update an existing cake by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               comment:
 *                 type: string
 *                 minLength: 5
 *                 maxLength: 200
 *               imageUrl:
 *                 type: string
 *                 format: uri
 *               yumFactor:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *     responses:
 *       200:
 *         description: Cake updated successfully
 *       400:
 *         description: Invalid request data
 *       404:
 *         description: Cake not found
 *       409:
 *         description: A cake with this name already exists
 */
router.put('/:id', validateObjectId, validateCake, cakeController.updateCake);

/**
 * @swagger
 * /api/cakes/{id}:
 *   delete:
 *     summary: Delete a cake
 *     description: Remove a cake by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Cake deleted successfully
 *       404:
 *         description: Cake not found
 */
router.delete('/:id', validateObjectId, cakeController.deleteCake);

export default router;