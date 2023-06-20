import sql from 'mssql';
import config from '../db/config.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Middleware to check if user is logged in
export const loginRequired = (req, res, next) => {
    if (req.user) {
        next(); // Proceed to next middleware if user is logged in
    } else {
        return res.status(401).json({ message: 'detected unauthorized user!' }); // Send unauthorized access error if user is not logged in
    }
};

// Register a new user
export const register = async (req, res) => {
    const { username, password, email } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10); // Hash the provided password

    try {
        let pool = await sql.connect(config.sql); // Connect to the database

        // Check if the username or email already exists
        const result = await pool.request()
            .input('username', sql.VarChar, username)
            .input('email', sql.VarChar, email)
            .query('SELECT * FROM users WHERE username = @username OR email = @email');

        const user = result.recordset[0];

        if (user) {
            res.status(400).json({ error: 'User already exists' }); // User already exists, send error response
        } else {
            // Insert the new user into the database
            await pool.request()
                .input('username', sql.VarChar, username)
                .input('hashedpassword', sql.VarChar, hashedPassword)
                .input('email', sql.VarChar, email)
                .query('INSERT INTO users (username, hashedpassword, email) VALUES (@username, @hashedpassword, @email)');
            
            res.status(200).send({ message: 'User created successfully' }); // User created successfully, send success response
        }
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while creating the user' }); // Error occurred, send error response
    } finally {
        sql.close(); // Close the database connection
    }
};

// User login
export const login = async (req, res) => {
    const { username, password } = req.body;

    let pool = await sql.connect(config.sql); // Connect to the database

    // Retrieve the user with the provided username
    const result = await pool.request()
        .input('username', sql.VarChar, username)
        .query('SELECT * FROM users WHERE username = @username');

    const user = result.recordset[0];

    if (!user) {
        res.status(400).json({ error: 'Authentication failed. Wrong credentials.' }); // User not found, send error response
    } else {
        if (!bcrypt.compareSync(password, user.hashedpassword)) {
            res.status(400).json({ error: 'Authentication failed. Wrong credentials.' }); // Passwords don't match, send error response
        } else {
            const token = `JWT ${jwt.sign({ username: user.username, email: user.email }, config.jwt_secret)}`; // Generate JWT token
            res.status(200).json({ email: user.email, username: user.username, id: user.id, token: token }); // Send success response with user details and token
        }
    }
};
