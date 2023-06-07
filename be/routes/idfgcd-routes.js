import express from "express";
import bodyParser from "body-parser";

import {
  createIDFGCDDefinition,
  getIDFGCDByUserId,
  deleteIDFGCDById,
} from "../controllers/idfgcd-controller.js";

const router = express.Router();
const jsonParser = bodyParser.json();

/**
 * @openapi
 * /idfgcd:
 *  post:
 *     tags:
 *     - IDFGCD
 *     summary: Create a new instance of idfgcd definition
 *     description: A new instance of a definition will be added to the database
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/IDFGCD'
 *     responses:
 *      200:
 *        description: Success
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
router.post("/", jsonParser, createIDFGCDDefinition);

/**
 * @openapi
 * /idfgcd/{id}:
 *   get:
 *     summary: Get idfgcd data for specific user
 *     tags:
 *      - IDFGCD
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The user id which you want to get the data
 *     responses:
 *       200:
 *         description: The idfgcd data by user id
 *         contents:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/IDFGCD'
 *       404:
 *         description: This user does not have data for this definition
 */
router.get("/:id", jsonParser, getIDFGCDByUserId);

/**
 * @openapi
 * /idfgcd/{id}:
 *   delete:
 *     summary: Delete definition result by id
 *     tags: 
 *      - IDFGCD
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
 *               $ref: '#/components/schemas/IDFGCD'
 *       404:
 *         description: The user was not found
 */

router.delete("/:id", jsonParser, deleteIDFGCDById);

export default router;
