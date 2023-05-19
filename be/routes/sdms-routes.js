import express from "express";
import bodyParser from "body-parser";

import {
  createSDMSDefinition,
  getSDMSByUserId,
} from "../controllers/sdms-controller.js";

const router = express.Router();
const jsonParser = bodyParser.json();

/**
 * @openapi
 * /smds:
 *  post:
 *     tags:
 *     - SDMS
 *     summary: Create a new instance of sdms definition
 *     description: A new instance of a definition will be added to the database
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/SDMS'
 *     responses:
 *      200:
 *        description: Success
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
router.post("/", jsonParser, createSDMSDefinition);

/**
 * @openapi
 * /sdms/{id}:
 *   get:
 *     summary: Get sdms data for specific user
 *     tags:
 *      - SDMS
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The user id which you want to get the data
 *     responses:
 *       200:
 *         description: The sdms data by user id
 *         contents:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SDMS'
 *       404:
 *         description: This user does not have data for this definition
 */
router.get("/:id", jsonParser, getSDMSByUserId);

export default router;
