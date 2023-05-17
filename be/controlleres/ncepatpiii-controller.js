import pool from "../config/db.js";

export const createNCEPATPIIIDefinition = (request, response) => {
  const {
    gender,
    waistCircumference,
    hypertriglyceridemia,
    HDLC,
    systolicTension,
    diastolicTension,
    fastingGlucose,
    userId,
    result,
  } = request.body;

  pool.query(
    "INSERT INTO ncep_atp_iii_definition (gender, waist_circumference, hypertriglyceridemia, hdlc, systolic_tension, diastolic_tension, fasting_glucose, user_id, result) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",
    [
      gender,
      waistCircumference,
      hypertriglyceridemia,
      HDLC,
      systolicTension,
      diastolicTension,
      fastingGlucose,
      userId,
      result,
    ],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`ncep_atp_III_definition input saved.`);
    }
  );
};

export const getNCEPATPIIIByUserId = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query(
    "SELECT * FROM ncep_atp_iii_definition WHERE user_Id = $1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};
