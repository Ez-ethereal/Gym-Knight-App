const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const bcrypt = require("bcrypt")

// middleware
app.use(cors());
app.use(express.json());


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
      const newUser = await createUser(firstName, lastName, email, password);
      return res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
});

app.post('/auth/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        const result = await pool.query("SELECT * FROM users WHERE email=$1", [email])
        console.log(result)
        const user = result.rows[0]

        if (!user) {
            return res.status(401).json({ message: "Invalid email or password." })
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
        return res.status(401).json({ message: 'Invalid email or password' });
        }

        return res.status(200).json({
            message: 'Login successful',
            user: {
              id: user.id,
              first_name: user.first_name,
              last_name: user.last_name,
              email: user.email
            }
        });
    } catch (error) {
        console.error("Error during login:", error)
        return res.status(500).json({ message: "Internal server error"})
    }
})

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

app.listen(5000, () => {
    console.log("Listening on port 5000...");
});
