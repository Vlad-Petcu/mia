import express from "express";
import bodyParser from "body-parser";
import {
  createAACEDDefinition,
  getAACEDByUserId,
} from "../controllers/aaced-controller.js";

import { authenticateToken } from "../middleware/authorization.js";

const router = express.Router();
const jsonParser = bodyParser.json();

/**
 * @openapi
 * /aaced:
 *  post:
 *     tags:
 *     - AACED
 *     summary: Create a new instance of aaced definition
 *     description: A new instance of a definition will be added to the database
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/AACED'
 *     responses:
 *      200:
 *        description: Success
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
router.post("/aaced", authenticateToken, jsonParser, createAACEDDefinition);

/**
 * @openapi
 * /aaced/{id}:
 *   get:
 *     summary: Get aaced data for specific user
 *     tags:
 *      - AACED
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The user id which you want to get the data
 *     responses:
 *       200:
 *         description: The aaced data for user by id
 *         contents:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AACED'
 *       404:
 *         description: This user does not have data for this definition
 */
router.get("/aaced/:id", authenticateToken, jsonParser, getAACEDByUserId);

export default router;
