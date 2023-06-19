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
      resultDate
    } = request.body;
  
    pool.query(
      "INSERT INTO idrs_definition (gender, age, waist_circumference, physical_activity, family_history, user_id, result, result_date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      [
        gender,
        age,
        waistCircumference,
        physicalActivity,
        familyHistory,
        userId,
        result,
        resultDate
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

  export const deleteIDRSById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM idrs_definition WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Definition deleted with ID: ${id}`)
    })
  };
  