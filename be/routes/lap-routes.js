import express from "express";
import bodyParser from "body-parser";

import {
  createLAPDefinition,
  getLAPByUserId,
} from "../controllers/lap-controller.js";
import { authenticateToken } from "../middleware/authorization.js";

const router = express.Router();
const jsonParser = bodyParser.json();

/**
 * @openapi
 * /lap:
 *  post:
 *     tags:
 *     - LAP
 *     summary: Create a new instance of lap definition
 *     description: A new instance of a definition will be added to the database
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/LAP'
 *     responses:
 *      200:
 *        description: Success
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
router.post("/", authenticateToken, jsonParser, createLAPDefinition);

/**
 * @openapi
 * /lap/{id}:
 *   get:
 *     summary: Get lap data for specific user
 *     tags:
 *      - LAP
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The user id which you want to get the data
 *     responses:
 *       200:
 *         description: The lap data by user id
 *         contents:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LAP'
 *       404:
 *         description: This user does not have data for this definition
 */
router.get("/:id", authenticateToken, jsonParser, getLAPByUserId);

export default router;
