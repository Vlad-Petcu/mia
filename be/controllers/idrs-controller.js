import pool from "../config/db.js";

export const createIDRSDefinition = (request, response) => {
    const {
      gender,
      age,
      waistCircumference,
      physicalActivity,
      familyHistory,
      userId,
      result,
    } = request.body;
  
    pool.query(
      "INSERT INTO idrs_definition (gender, age, waist_circumference, physical_activity, family_history, user_id, result) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [
        gender,
        age,
        waistCircumference,
        physicalActivity,
        familyHistory,
        userId,
        result,
      ],
      (error, results) => {
        if (error) {
          throw error;
        }
        response.status(201).send(`idrs_definition input saved.`);
      }
    );
  };

  export const getIDRSByUserId = (request, response) => {
    const id = parseInt(request.params.id);
  
    pool.query(
      "SELECT * FROM idrs_definition WHERE user_Id = $1 ORDER BY id ASC",
      [id],
      (error, results) => {
        if (error) {
          throw error;
        }
        response.status(200).json(results.rows);
      }
    );
  };