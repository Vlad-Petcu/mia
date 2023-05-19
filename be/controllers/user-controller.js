import pool from "../config/db.js";

export const getDoctorUsers = (request, response) => {
  pool.query(
    "SELECT * FROM users WHERE is_doctor=true ORDER BY id ASC",
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

