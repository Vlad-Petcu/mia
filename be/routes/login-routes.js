import express from "express";
import bodyParser from "body-parser";
import { loginUser } from "../controllers/login-controller.js";

const router = express.Router();
const jsonParser = bodyParser.json();

/**
 * @openapi
 * /login:
 *  post:
 *     tags:
 *     - Login
 *     summary: Login with a specific user account
 *     description: Login with a specific user account
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Login'
 *     responses:
 *      200:
 *        description: Success
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
router.post("/", jsonParser, loginUser);

export default router;
