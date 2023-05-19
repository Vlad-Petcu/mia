import express from "express";

import { getDoctorUsers } from "../controllers/user-controller.js";

const router = express.Router();

/**
 * @openapi
 * /users/doctors:
 *  get:
 *     tags:
 *     - User
 *     summary: Get all users who are doctors
 *     description: Returns all users who are doctors in the app
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/doctors", getDoctorUsers);

export default router;
