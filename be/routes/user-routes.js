import express from "express";
// import bodyParser from "body-parser";

import {
  getDoctorUsers,
  getPatientsByDoctorId,
  // deleteUserById,
} from "../controllers/user-controller.js"; 

const router = express.Router();
// const jsonParser = bodyParser.json();

/**
 * @openapi
 * /user/doctors:
 *  get:
 *     tags:
 *     - User
 *     summary: Get all users who are doctors
 *     description: Get all users who are doctors
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/doctors", getDoctorUsers);

/**
 * @openapi
 * /user/patients/{id}:
 *  get:
 *     tags:
 *     - User
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: The user id which you want to get the data
 *     summary: Get all patients for specific doctor
 *     description: Get all patients for specific doctor
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/patients/:id", getPatientsByDoctorId);

// /**
//  * @openapi
//  * /user/{id}:
//  *   delete:
//  *     summary: Delete user by id
//  *     tags: 
//  *      - User
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         schema:
//  *           type: integer
//  *         required: true
//  *         description: The user id
//  *     responses:
//  *       200:
//  *         description: The user by id
//  *         contents:
//  *           application/json:
//  *       404:
//  *         description: The user was not found
//  */

// router.delete("/:id", jsonParser, deleteUserById);

export default router;
