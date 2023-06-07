import express from "express";
import bodyParser from "body-parser";

import {
  createWHODefinition,
  getWHOByUserId,
  deleteWHOById,
} from "../controllers/who-controller.js";

const router = express.Router();
const jsonParser = bodyParser.json();

/**
 * @openapi
 * /who:
 *  post:
 *     tags:
 *     - WHO
 *     summary: Create a new instance of who definition
 *     description: A new instance of a definition will be added to the database
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/WHO'
 *     responses:
 *      200:
 *        description: Success
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
router.post("/", jsonParser, createWHODefinition);

/**
 * @openapi
 * /who/{id}:
 *   get:
 *     summary: Get who data for specific user
 *     tags:
 *      - WHO
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The user id which you want to get the data
 *     responses:
 *       200:
 *         description: The who data by user id
 *         contents:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/WHO'
 *       404:
 *         description: This user does not have data for this definition
 */
router.get("/:id", jsonParser, getWHOByUserId);

/**
 * @openapi
 * /who/{id}:
 *   delete:
 *     summary: Delete definition result by id
 *     tags:
 *      - WHO
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
 *               $ref: '#/components/schemas/WHO'
 *       404:
 *         description: The user was not found
 */

router.delete("/:id", jsonParser, deleteWHOById);

export default router;
