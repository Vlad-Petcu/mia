import pool from "../config/db.js";
import bcrypt from 'bcrypt';
import { jwtTokens } from '../utils/jwt-helpers.js';

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const users = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (users.rows.length === 0)
      return res.status(401).json({ error: "Email is incorrect!" });
    const validPassword = await bcrypt.compare(
      password,
      users.rows[0].password
    );
    if (!validPassword)
      return res.status(401).json({ error: "Password is incorrect!" });
    let tokens = jwtTokens(users.rows[0]);
    res.cookie("refresh_token", tokens.refreshToken, {
      ...(process.env.COOKIE_DOMAIN && { domain: process.env.COOKIE_DOMAIN }),
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });
    res.json(tokens);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};
