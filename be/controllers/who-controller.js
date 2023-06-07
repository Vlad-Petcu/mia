import pool from "../config/db.js";

export const createWHODefinition = (request, response) => {
    const {
      gender,
      glucoseIntolerance,
      diabetesMellitus,
      insulinResistance,
      systolicTension,
      diastolicTension,
      triglycerideLevel,
      waistCircumference,
      hipCircumference,
      albumin,
      creatine,
      userId,
      result,
    } = request.body;
  
    pool.query(
      "INSERT INTO who_definition (gender, glucose_intolerance, diabetes_mellitus, insulin_resistance, systolic_tension, diastolic_tension, triglyceride_level, waist_circumference, hip_circumference, albumin, creatine, user_id, result) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *",
      [
        gender,
        glucoseIntolerance,
        diabetesMellitus,
        insulinResistance,
        systolicTension,
        diastolicTension,
        triglycerideLevel,
        waistCircumference,
        hipCircumference,
        albumin,
        creatine,
        userId,
        result,
      ],
      (error, results) => {
        if (error) {
          throw error;
        }
        response.status(201).send(`who_definition input saved.`);
      }
    );
  };
  
  export const getWHOByUserId = (request, response) => {
    const id = parseInt(request.params.id);
  
    pool.query(
      "SELECT * FROM who_definition WHERE user_Id = $1 ORDER BY id ASC",
      [id],
      (error, results) => {
        if (error) {
          throw error;
        }
        response.status(200).json(results.rows);
      }
    );
  };

  export const deleteWHOById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM who_definition WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Definition deleted with ID: ${id}`)
    })
  };
  
  