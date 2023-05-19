import express from "express";
import bodyParser from "body-parser";

import { registerUser } from "../controllers/register-controller.js";

const router = express.Router();
const jsonParser = bodyParser.json();

/**
 * @openapi
 * /users:
 *  post:
 *     tags:
 *     - Register
 *     summary: Register a user
 *     description: A new user will be added to the database
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Register'
 *     responses:
 *      200:
 *        description: Success
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
router.post("/", jsonParser, registerUser);

export default router;
