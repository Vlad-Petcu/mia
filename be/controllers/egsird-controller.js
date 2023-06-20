import pool from "../config/db.js";

export const createEGSIRDDefinition = (request, response) => {
    const {
      gender,
      plasmaInsulin,
      waistCircumference,
      systolicTension,
      diastolicTension,
      triglycerideLevel,
      impairedFastingGlucose,
      userId,
      result,
      resultDate
    } = request.body;
  
    pool.query(
      "INSERT INTO egsird_definition (gender, plasma_insulin, waist_circumference, systolic_tension, diastolic_tension, triglyceride_level, impaired_fasting_glucose, user_id, result, result_date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *",
      [
        gender,
        plasmaInsulin,
        waistCircumference,
        systolicTension,
        diastolicTension,
        triglycerideLevel,
        impairedFastingGlucose,
        userId,
        result,
        resultDate,
      ],
      (error, results) => {
        if (error) {
          throw error;
        }
        response.status(201).send(`egsird_definition input saved.`);
      }
    );
  };


export const getEGSIRDByUserId = (request, response) => {
    const id = parseInt(request.params.id);
  
    pool.query(
      "SELECT * FROM egsird_definition WHERE user_Id = $1 ORDER BY id ASC",
      [id],
      (error, results) => {
        if (error) {
          throw error;
        }
        response.status(200).json(results.rows);
      }
    );
  };

  export const deleteEGSIRDById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM egsird_definition WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(id)
    })
  };
  


  