import express from "express";
import bodyParser from "body-parser";

import {
  createNCEPATPIIIDefinition,
  getNCEPATPIIIByUserId,
} from "../controllers/ncepatpiii-controller.js";

const router = express.Router();
const jsonParser = bodyParser.json();

/**
 * @openapi
 * /ncepatpIII:
 *  post:
 *     tags:
 *     - NCEPATPIII
 *     summary: Create a new instance of ncepatpiii definition
 *     description: A new instance of a definition will be added to the database
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/NCEPATPIII'
 *     responses:
 *      200:
 *        description: Success
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
router.post("/", jsonParser, createNCEPATPIIIDefinition);

/**
 * @openapi
 * /ncepatpIII/{id}:
 *   get:
 *     summary: Get ncepatpIII data for specific user
 *     tags:
 *      - NCEPATPIII
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The user id which you want to get the data
 *     responses:
 *       200:
 *         description: The ncepatpIII data by user id
 *         contents:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NCEPATPIII'
 *       404:
 *         description: This user does not have data for this definition
 */
router.get("/:id", jsonParser, getNCEPATPIIIByUserId);

export default router;
