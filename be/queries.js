const Pool = require("pg").Pool;
const pool = new Pool({
  user: "me",
  host: "localhost",
  database: "api",
  password: "password",
  port: 5432,
});

const getUsers = (request, response) => {
  pool.query("SELECT * FROM users ORDER BY id ASC", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const createUser = (request, response) => {
  const { firstName, lastName, gender, email, password } = request.body;

  pool.query(
    "INSERT INTO users (first_name, last_name, gender, email, password) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [firstName, lastName, gender, email, password],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`User added with ID: ${results.rows[0].id}`);
    }
  );
};

const getUserById = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query("SELECT * FROM users WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const updateUser = (request, response) => {
  const id = parseInt(request.params.id);
  const { firstName, lastName, email, gender, password } = request.body;

  pool.query(
    "UPDATE users SET first_name = $1, last_name = $2, email = $3, gender = $4, password = $5 WHERE id = $6",
    [firstName, lastName, email, gender, password, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`User modified with ID: ${id}`);
    }
  );
};

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query("DELETE FROM users WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`User deleted with ID: ${id}`);
  });
};

const createAACEDDefinition = (request, response) => {
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

const createEGSIRDDefinition = (request, response) => {
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
  } = request.body;

  pool.query(
    "INSERT INTO egsird_definition (gender, plasma_insulin, waist_circumference, systolic_tension, diastolic_tension, triglyceride_level, impaired_fasting_glucose, user_id, result) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",
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
    ],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`egsird_definition input saved.`);
    }
  );
};

const createIDFGCDDefinition = (request, response) => {
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

const createIDRSDefinition = (request, response) => {
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

const createLAPDefinition = (request, response) => {
  const { gender, triglycerideLevel, waistCircumference, userId, result } =
    request.body;

  pool.query(
    "INSERT INTO lap_definition (gender, triglyceride_level, waist_circumference, user_id, result) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [gender, triglycerideLevel, waistCircumference, userId, result],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`lap_definition input saved.`);
    }
  );
};

const createNCEPATPIIIDefinition = (request, response) => {
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

const createSDMSDefinition = (request, response) => {
  const { height, waistCircumference, userId, result } = request.body;

  pool.query(
    "INSERT INTO sdms_definition (height, waist_circumference, user_id, result) VALUES ($1, $2, $3, $4) RETURNING *",
    [height, waistCircumference, userId, result],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`sdms_definition input saved.`);
    }
  );
};

const createWHODefinition = (request, response) => {
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

const getAACEDByUserId = (request, response) => {
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

const getEGSIRDByUserId = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query(
    "SELECT * FROM egsird_definition WHERE user_Id = $1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const getIDFGCDByUserId = (request, response) => {
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

const getIDRSByUserId = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query(
    "SELECT * FROM idrs_definition WHERE user_Id = $1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const getLAPByUserId = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query(
    "SELECT * FROM lap_definition WHERE user_Id = $1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const getNCEPATPIIIByUserId = (request, response) => {
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

const getSDMSByUserId = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query(
    "SELECT * FROM sdms_definition WHERE user_Id = $1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const getWHOByUserId = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query(
    "SELECT * FROM who_definition WHERE user_Id = $1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  createAACEDDefinition,
  createEGSIRDDefinition,
  createIDFGCDDefinition,
  createIDRSDefinition,
  createLAPDefinition,
  createNCEPATPIIIDefinition,
  createSDMSDefinition,
  createWHODefinition,
  getAACEDByUserId,
  getEGSIRDByUserId,
  getIDFGCDByUserId,
  getIDRSByUserId,
  getLAPByUserId,
  getNCEPATPIIIByUserId,
  getSDMSByUserId,
  getWHOByUserId,
};
