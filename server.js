import express from "express";
import dotenv from "dotenv";
import { client } from "./client.js";

dotenv.config();

const app = express();
app.use(express.json());

app.post("/users", async (req, res) => {
    const { name, username, password, year_of_birth } = req.body;
    try {
        const result = await client.query(
            `INSERT INTO MovieUser (Name, Username, Password, YearOfBirth) 
             VALUES ($1, $2, $3, $4) RETURNING *`,
            [name, username, password, year_of_birth]
        );
        res.status(201).send(result.rows[0]);
    } catch (err) {
        res.status(500).send({ message: "Error adding user", error: err });
    }
});

app.get("/users", async (req, res) => {
    try {
        const result = await client.query("SELECT * FROM MovieUser");
        res.send(result.rows);
    } catch (err) {
        res.status(500).send({ message: "Error retrieving users", error: err });
    }
});

app.get("/users/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const result = await client.query("SELECT * FROM MovieUser WHERE UserID = $1", [id]);
        if (result.rows.length === 0) {
            return res.status(404).send({ message: "User not found" });
        }
        res.send(result.rows[0]);
    } catch (err) {
        res.status(500).send({ message: "Error retrieving user", error: err });
    }
});

app.put("/users/:id", async (req, res) => {
    const { id } = req.params;
    const { name, username, password, year_of_birth } = req.body;
    try {
        const result = await client.query(
            `UPDATE MovieUser 
             SET Name = $1, Username = $2, Password = $3, YearOfBirth = $4 
             WHERE UserID = $5 RETURNING *`,
            [name, username, password, year_of_birth, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).send({ message: "User not found" });
        }
        res.send(result.rows[0]);
    } catch (err) {
        res.status(500).send({ message: "Error updating user", error: err });
    }
});

app.delete("/users/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const result = await client.query("DELETE FROM MovieUser WHERE UserID = $1 RETURNING *", [id]);
        if (result.rows.length === 0) {
            return res.status(404).send({ message: "User not found" });
        }
        res.send({ message: "User deleted successfully" });
    } catch (err) {
        res.status(500).send({ message: "Error deleting user", error: err });
    }
});

app.post("/movies", async (req, res) => {
    const { name, year, genre_id } = req.body;
    try {
        const result = await client.query(
            `INSERT INTO Movie (Name, Year, GenreID) 
             VALUES ($1, $2, $3) RETURNING *`,
            [name, year, genre_id]
        );
        res.status(201).send(result.rows[0]);
    } catch (err) {
        res.status(500).send({ message: "Error adding movie", error: err });
    }
});

app.get("/movies", async (req, res) => {
    try {
        const result = await client.query("SELECT * FROM Movie");
        res.send(result.rows);
    } catch (err) {
        res.status(500).send({ message: "Error retrieving movies", error: err });
    }
});

app.post("/reviews", async (req, res) => {
    const { user_id, movie_id, stars, review_text } = req.body;
    if (stars < 1 || stars > 5) {
        return res.status(400).send({ message: "Stars must be between 1 and 5" });
    }
    try {
        const result = await client.query(
            `INSERT INTO Review (UserID, MovieID, Stars, ReviewText) 
             VALUES ($1, $2, $3, $4) RETURNING *`,
            [user_id, movie_id, stars, review_text]
        );
        res.status(201).send(result.rows[0]);
    } catch (err) {
        res.status(500).send({ message: "Error adding review", error: err });
    }
});

app.get("/reviews", async (req, res) => {
    try {
        const result = await client.query("SELECT * FROM Review");
        res.send(result.rows);
    } catch (err) {
        res.status(500).send({ message: "Error retrieving reviews", error: err });
    }
});

app.listen(3001, () => {
    console.log("Server running on http://localhost:3001");
});
