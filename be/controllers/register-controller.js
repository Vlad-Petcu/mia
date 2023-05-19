import pool from "../config/db.js";
import bcrypt from "bcrypt";

export const registerUser = async (request, response) => {
    const { isDoctor, doctorId, firstName, lastName, gender, email, password } =
      request.body;
    const hashPassword = await bcrypt.hash(request.body.password,10);
  
    pool.query(
      "INSERT INTO users (is_doctor, doctor_id, first_name, last_name, gender, email, password) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [isDoctor, doctorId, firstName, lastName, gender, email, hashPassword],
      (error, results) => {
        if (error) {
          throw error;
        }
        response.status(201).send(`User added with ID: ${results.rows[0].id}`);
      }
    );
  };