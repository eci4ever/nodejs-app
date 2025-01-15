import pool from "./connection.js";

// This function will be used to get all users from the database
export const getAllUsers = async () => {
  const [rows] = await pool.query(`SELECT * FROM users`);
  return rows;
};

// This function will be used to get a single user from the database
export const getUserById = async (id) => {
  const [rows] = await pool.query(`SELECT * FROM users WHERE id = ?`, [id]);
  return rows[0];
};

// This function will be used to create a new user in the database
export const createUser = async (name, email, password) => {
  const [result] = await pool.query(`INSERT INTO users (name, email, password)
    VALUES (?, ?, ?)`, [name, email, password]);
  return result.insertId;
};

// update user
export const updateUser = async (id, name, email, password) => {
  const [result] = await pool.query(`UPDATE users SET 
    name = ?, email = ?, password = ? WHERE id = ?`, [name, email, password, id]);
  return result.affectedRows;
};

// This function will be used to delete a user from the database
export const deleteUser = async (id) => {
  const [result] = await pool.query(`DELETE FROM users WHERE id = ?`, [id]);
  return result.affectedRows;
};

