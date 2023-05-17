import pool from "../config/db.js";

export const createAACEDDefinition = (request, response) => {
  const {
    glucoseIntolerance,
    abnormalUricAcidMetabolism,
    dyslipidemia,
    hemodynamicChanges,
    prothromboticFactors,
    markersOfInflammation,
    endothelialDysfunction,
    userId,
    result,
  } = request.body;

  pool.query(
    "INSERT INTO aaced_definition (glucose_intolerance, abnormal_uric_acid_metabolism, dyslipidemia, hemodynamic_changes, prothrombotic_factors, markers_of_inflammation, endothelial_dysfunction, user_id, result) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",
    [
      glucoseIntolerance,
      abnormalUricAcidMetabolism,
      dyslipidemia,
      hemodynamicChanges,
      prothromboticFactors,
      markersOfInflammation,
      endothelialDysfunction,
      userId,
      result,
    ],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`aaced_definition input saved.`);
    }
  );
};

export const getAACEDByUserId = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query(
    "SELECT * FROM aaced_definition WHERE user_Id = $1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};
