import pool from "../config/db.js";

export const createUser = (request, response) => {
  const { isDoctor, doctorId, firstName, lastName, gender, email, password } =
    request.body;

  pool.query(
    "INSERT INTO users (is_doctor, doctor_id, first_name, last_name, gender, email, password) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
    [isDoctor, doctorId, firstName, lastName, gender, email, password],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`User added with ID: ${results.rows[0].id}`);
    }
  );
};

export const getUsers = (request, response) => {
  pool.query("SELECT * FROM users ORDER BY id ASC", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

export const getDoctorUsers = (request, response) => {
  pool.query(
    "SELECT * FROM users WHERE is_doctor=true ORDER BY id ASC",
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

export const getUserById = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query("SELECT * FROM users WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

export const updateUser = (request, response) => {
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

export const deleteUser = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query("DELETE FROM users WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`User deleted with ID: ${id}`);
  });
};
