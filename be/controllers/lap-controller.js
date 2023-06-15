import pool from "../config/db.js";

export const createLAPDefinition = (request, response) => {
  const { gender, triglycerideLevel, waistCircumference, userId, result, resultDate } =
    request.body;

  pool.query(
    "INSERT INTO lap_definition (gender, triglyceride_level, waist_circumference, user_id, result, resultDate) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
    [gender, triglycerideLevel, waistCircumference, userId, result, resultDate],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`lap_definition input saved.`);
    }
  );
};

export const getLAPByUserId = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query(
    "SELECT * FROM lap_definition WHERE user_Id = $1 ORDER BY id ASC",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

export const deleteLAPById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM lap_definition WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Definition deleted with ID: ${id}`)
  })
};
