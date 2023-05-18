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
  } = request.body;

  pool.query(
    "INSERT INTO idfgcd_definition (gender, location, tryglycerides, hdlc, systolic_tension, diastolic_tension, fpg, user_id, result) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",
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
    "SELECT * FROM idfgcd_definition WHERE user_Id = $1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};
