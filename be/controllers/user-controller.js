import pool from "../config/db.js";

export const getDoctorUsers = (request, response) => {
  pool.query(
    "SELECT * FROM users WHERE is_doctor = true ORDER BY id ASC",
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

export const getPatientsByDoctorId = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query(
    "SELECT * FROM users WHERE doctor_id = $1 ORDER BY id ASC",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

// export const deleteUserById = (request, response) => {
//   const id = parseInt(request.params.id)

//   pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
//     if (error) {
//       throw error
//     }
//     response.status(200).send(`User deleted with ID: ${id}`)
//   })
// };

