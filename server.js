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

app.get("/users/search", async (req, res) => {
    const { keyword } = req.query;
    if (!keyword) {
        return res.status(400).send({ message: "Keyword is required" });
    }
    try {
        const result = await client.query(
            "SELECT * FROM MovieUser WHERE Name ILIKE $1 OR Username ILIKE $1",
            [`%${keyword}%`]
        );
        res.send(result.rows);
    } catch (err) {
        res.status(500).send({ message: "Error searching users", error: err });
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

app.get("/movies/search", async (req, res) => {
    const { keyword } = req.query;
    if (!keyword) {
        return res.status(400).send({ message: "Keyword is required" });
    }
    try {
        const result = await client.query(
            "SELECT * FROM Movie WHERE Name ILIKE $1",
            [`%${keyword}%`]
        );
        res.send(result.rows);
    } catch (err) {
        res.status(500).send({ message: "Error searching movies", error: err });
    }
});

app.listen(3001, () => {
    console.log("Server running on http://localhost:3001");
});
