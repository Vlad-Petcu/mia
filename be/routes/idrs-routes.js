import express from "express";
import bodyParser from "body-parser";

import {
  createIDRSDefinition,
  getIDRSByUserId,
  deleteIDRSById
} from "../controllers/idrs-controller.js";

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
router.post("/", jsonParser, createIDRSDefinition);

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
router.get("/:id", jsonParser, getIDRSByUserId);

/**
 * @openapi
 * /idrs/{id}:
 *   delete:
 *     summary: Delete definition result by id
 *     tags: 
 *      - IDRS
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The definition id
 *     responses:
 *       200:
 *         description: The definition description by id
 *         contents:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/IDRS'
 *       404:
 *         description: The user was not found
 */

router.delete("/:id", jsonParser, deleteIDRSById);

export default router;
