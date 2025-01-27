require('dotenv').config()
const express = require("express");
const app = express();
const cookieParser = require('cookie-parser');
const { verify } = require("jsonwebtoken")
const cors = require("cors");
const pool = require("./db");
const bcrypt = require("bcrypt")
const { createAccessToken, createRefreshToken, sendAccessToken, sendRefreshToken } = require("./tokens")

// middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());


// REGISTER USER
async function createUser(firstName, lastName, email, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = 
    `INSERT INTO users (first_name, last_name, email, password, created_at, updated_at)
     VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
     RETURNING *
    `
    const values = [firstName, lastName, email, hashedPassword]

    try {
        const result = await pool.query(query, values)
        return result.rows[0]
    } catch (error) {
        console.error('Error inserting user:', error);
        throw new Error('User creation failed');
    }
}

app.post('/users', async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    try {
        const user = await pool.query("SELECT * FROM users WHERE email=$1", [email])
        if (user) {
            return res.status(400).json({ error: 'User already exists'})
        }
        const newUser = await createUser(firstName, lastName, email, password);
        return res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        console.error(error.message)
        return res.status(500).json({ error: 'An error occurred while processing this request' });
    }
});


// LOGIN USER
app.post('/auth/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
        const result = await pool.query("SELECT * FROM users WHERE email=$1", [email])
        const user = result.rows[0]

        if (!user) {
            return res.status(401).json({ error: "Invalid email or password." })
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
        return res.status(401).json({ error: 'Invalid email or password' });
        }

        // create refresh and access tokens if email and password are valid
        // access token authenticates requests to protected endpoints by verifying identity
        // refresh token is used to obtain a new access token after the original expires, should be stored securely
        const accessToken = createAccessToken(user.id)
        const refreshToken = createRefreshToken(user.id) // simultaneously stores refresh token in database

        // send tokens to client - access as a response, refresh as a cookie
        // send refresh first to include cookie in response before sending response to client
        sendRefreshToken(res, refreshToken)
        sendAccessToken(res, accessToken)


        return res.status(200).json({
            message: 'Login successful',
            user: {
              id: user.id,
              first_name: user.first_name,
              last_name: user.last_name,
              email: user.email
            },
            accessToken: res.locals.accessToken
        });

    } catch (error) {
        console.error("Error during login:", error)
        return res.status(500).json({ error: "Internal server error"})
    }
})

// LOGOUT USER

app.post('/auth/logout', async (_req, res) => {
    res.clearCookie('refreshtoken')
    return res.send
})

// PROTECTED ROUTE

// NEW ACCESS TOKEN WITH REFRESH TOKEN






// TEST ROUTES
app.get('/users', async (req, res) => {
    try {
        const allUsers = await pool.query("SELECT * FROM users")
        res.json(allUsers.rows)
    } catch (error) {
        console.error(error.message)
    }
})

app.get('/users/:id', async (req, res) => {
    try {
        const {id} = req.params
        const user = await pool.query("SELECT * FROM users WHERE id=$1", [id])
        res.json(user.rows[0])
    } catch (error) {
        console.error(error.message)
    }
})

app.delete('/users/:id', async (req, res) => {
    try {
        const {id} = req.params
        const deleteUser = await pool.query(
            "DELETE FROM users WHERE id=$1",
            [id]
        )
        res.json("user deleted successfully!")
    } catch (error) {
        console.error(error.message)
    }
})

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}...`);
});