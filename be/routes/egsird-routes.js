import express from "express";
import bodyParser from "body-parser";

import {
  createEGSIRDDefinition,
  getEGSIRDByUserId,
} from "../controllers/egsird-controller.js";

const router = express.Router();
const jsonParser = bodyParser.json();

/**
 * @openapi
 * /egsird:
 *  post:
 *     tags:
 *     - EGSIRD
 *     summary: Create a new instance of egsird definition
 *     description: A new instance of a definition will be added to the database
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/EGSIRD'
 *     responses:
 *      200:
 *        description: Success
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
router.post("/", jsonParser, createEGSIRDDefinition);

/**
 * @openapi
 * /egsird/{id}:
 *   get:
 *     summary: Get egsird data for specific user
 *     tags:
 *      - EGSIRD
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The user id which you want to get the data
 *     responses:
 *       200:
 *         description: The egsird data by user id
 *         contents:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EGSIRD'
 *       404:
 *         description: This user does not have data for this definition
 */
router.get("/:id", jsonParser, getEGSIRDByUserId);

export default router;
