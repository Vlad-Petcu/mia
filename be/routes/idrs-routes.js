import express from "express";
import bodyParser from "body-parser";

import {
  createIDRSDefinition,
  getIDRSByUserId,
} from "../controllers/idrs-controller.js";
import { authenticateToken } from "../middleware/authorization.js";

const router = express.Router();
const jsonParser = bodyParser.json();

/**
 * @openapi
 * /idrs:
 *  post:
 *     tags:
 *     - IDRS
 *     summary: Create a new instance of idrs definition
 *     description: A new instance of a definition will be added to the database
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/IDRS'
 *     responses:
 *      200:
 *        description: Success
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
router.post("/", authenticateToken, jsonParser, createIDRSDefinition);

/**
 * @openapi
 * /idrs/{id}:
 *   get:
 *     summary: Get idrs data for specific user
 *     tags:
 *      - IDRS
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The user id which you want to get the data
 *     responses:
 *       200:
 *         description: The idrs data by user id
 *         contents:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/IDRS'
 *       404:
 *         description: This user does not have data for this definition
 */
router.get("/:id", authenticateToken, jsonParser, getIDRSByUserId);

export default router;
