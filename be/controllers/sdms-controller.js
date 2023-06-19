import pool from "../config/db.js";

export const createSDMSDefinition = (request, response) => {
  const { height, waistCircumference, userId, result, resultDate } = request.body;

  pool.query(
    "INSERT INTO sdms_definition (height, waist_circumference, user_id, result, result_date) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [height, waistCircumference, userId, result, resultDate],
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

export const deleteSDMSById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM sdms_definition WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Definition deleted with ID: ${id}`)
  })
};
