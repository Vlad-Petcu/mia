import pool from "../config/db.js";

export const createSDMSDefinition = (request, response) => {
  const { height, waistCircumference, userId, result } = request.body;

  pool.query(
    "INSERT INTO sdms_definition (height, waist_circumference, user_id, result) VALUES ($1, $2, $3, $4) RETURNING *",
    [height, waistCircumference, userId, result],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`sdms_definition input saved.`);
    }
  );
};

export const getSDMSByUserId = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query(
    "SELECT * FROM sdms_definition WHERE user_Id = $1 ORDER BY id ASC",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};
