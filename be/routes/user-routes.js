import express from "express";
import bodyParser from "body-parser";

import {
  getUsers,
  getDoctorUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/user-controller.js";
import { authenticateToken } from "../middleware/authorization.js";

const router = express.Router();
const jsonParser = bodyParser.json();

/**
 * @openapi
 * /users:
 *  post:
 *     tags:
 *     - User
 *     summary: Register a user
 *     description: A new user will be added to the database
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *     responses:
 *      200:
 *        description: Success
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
router.post("/", jsonParser, createUser);

/**
 * @openapi
 * /users:
 *  get:
 *     tags:
 *     - User
 *     summary: Get all users
 *     description: Returns all users in the app
 *     responses:
 *       200:
 *         description: Success
 */

router.get("/", authenticateToken, getUsers);

/**
 * @openapi
 * /users/doctors:
 *  get:
 *     tags:
 *     - User
 *     summary: Get all users who are doctors
 *     description: Returns all users who are doctors in the app
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/doctors", getDoctorUsers);

/**
 * @openapi
 * /users/{id}:
 *   get:
 *     summary: Get the user by id
 *     tags:
 *      - User
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The user id
 *     responses:
 *       200:
 *         description: The user description by id
 *         contents:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: The user was not found
 */
router.get("/:id", jsonParser, getUserById);

/**
 * @openapi
 * /users/{id}:
 *  put:
 *     tags:
 *     - User
 *     summary: Update a user
 *     description: A user will be updated
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The user id
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *     responses:
 *      200:
 *        description: Success
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
router.put("/:id", authenticateToken, jsonParser, updateUser);

/**
 * @openapi
 * /users/{id}:
 *   delete:
 *     summary: Delete the user by id
 *     tags:
 *      - User
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The user id
 *     responses:
 *       200:
 *         description: The user description by id
 *         contents:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: The user was not found
 */
router.delete("/:id", authenticateToken, jsonParser, deleteUser);

export default router;
