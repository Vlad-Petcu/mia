import pool from "../config/db.js";

export const createIDFGCDDefinition = (request, response) => {
  const {
    gender,
    location,
    tryglycerides,
    HDLC,
    systolicTension,
    diastolicTension,
    FPG,
    userId,
    result,
    resultDate
  } = request.body;

  pool.query(
    "INSERT INTO idfgcd_definition (gender, location, tryglycerides, hdlc, systolic_tension, diastolic_tension, fpg, user_id, result, result_date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *",
    [
      gender,
      location,
      tryglycerides,
      HDLC,
      systolicTension,
      diastolicTension,
      FPG,
      userId,
      result,
      resultDate
    ],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`idfgcd_definition input saved.`);
    }
  );
};

export const getIDFGCDByUserId = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query(
    "SELECT * FROM idfgcd_definition WHERE user_Id = $1 ORDER BY id ASC",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

export const deleteIDFGCDById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM idfgcd_definition WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Definition deleted with ID: ${id}`)
  })
};

