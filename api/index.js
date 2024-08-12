const mysql = require("mysql2/promise");
const createUsersTable = require("./models/users");
require("dotenv").config();
const express = require("express");
const app = express();
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const { getUserByName } = require("./controllers/user");
const createCardsTable = require("./models/cards");
const {
  addCard,
  updateCard,
  deleteCard,
  getAllCards,
  getCardById,
} = require("./controllers/card");

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: "https://tuf-task-sage.vercel.app",
  })
);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
let connection;

async function initializeDatabase() {
  try {
    connection = await mysql.createConnection(process.env.DB_CONNECTION_URL);

    console.log("Connected to MySQL.");

    await connection.query(
      `CREATE DATABASE IF NOT EXISTS ${process.env.DB_DATABASE}`
    );
    console.log("Database created or already exists");

    await connection.changeUser({ database: process.env.DB_DATABASE });
    console.log(`You have entered database: ${process.env.DB_DATABASE}`);

    await connection.query(createUsersTable);
    console.log("Users table created or already exists");

    await connection.query(createCardsTable);
    console.log("Cards table created or already exists");
  } catch (err) {
    console.error("Error initializing database: ", err);
    throw err;
  }
}

function getUserDataFromToken(req) {
  return new Promise((resolve, reject) => {
    jwt.verify(
      req.cookies.token,
      process.env.JWT_SECRET,
      {},
      async (err, userData) => {
        if (err) throw err;
        resolve(userData);
      }
    );
  });
}

initializeDatabase()
  .then(() => {
    app.post("/api/login", async (req, res) => {
      const { name, password } = req.body;
      if (!name || !password)
        res.status(500).json({ error: "Provide all credentials!" });
      if (name !== "admin")
        res.status(401).json({ error: "You are not an admin!" });
      try {
        const user = await getUserByName(connection, name);
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
          return res.status(422).json({ error: "Invalid password" });
        }
        const token = jwt.sign(
          { id: user.id, name: user.name },
          process.env.JWT_SECRET,
          {}
        );
        res.cookie("token", token, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
        });

        res.status(200).json({ msg: "Successfully logged in! Welcome admin!" });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    app.get("/api/profile", async (req, res) => {
      try {
        const token = req.cookies.token;
        if (!token) {
          return res.status(401).json({ error: "Unauthorized" });
        }
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        if (!decodedToken) {
          return res.status(401).json({ error: "Unauthorized" });
        }
        const user = await getUserByName(connection, decodedToken.name);
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }
        res.json({
          id: user.id,
          name: user.name,
        });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    app.post("/api/logout", (req, res) => {
      res.clearCookie("token").json(true);
    });

    app.post("/api/add-card", async (req, res) => {
      const user = await getUserDataFromToken(req);
      const { question, answer } = req.body;
      if (!user) res.status(404).json({ Error: "User not logged in!" });
      if (!question || !answer) {
        return res.status(422).json({ error: "All fields are required" });
      }
      try {
        const newCard = await addCard(connection, question, answer, user.id);
        res.status(200).json(newCard);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    app.put("/api/edit-card", async (req, res) => {
      const user = await getUserDataFromToken(req);
      const { id, question, answer } = req.body;
      if (!user) res.status(404).json({ Error: "User not logged in!" });
      if (!question || !answer) {
        return res.status(422).json({ error: "Fields cannot be empty" });
      }
      try {
        const updatedCard = await updateCard(connection, id, question, answer);
        res.status(200).json(updatedCard);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    app.post("/api/delete-card", async (req, res) => {
      const user = await getUserDataFromToken(req);
      const { id } = req.body;
      if (!user) res.status(404).json({ Error: "User not logged in!" });
      if (!id) {
        return res.status(422).json({ error: "Send card id to be deleted" });
      }
      try {
        const deletedCard = await deleteCard(connection, id);
        res.status(200).json(deletedCard);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    app.get("/api/get-all-cards", async (req, res) => {
      try {
        const cards = await getAllCards(connection);
        res.status(200).json(cards);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    app.get("/api/get-card-by-id/:id", async (req, res) => {
      const { id } = req.params;
      try {
        const card = await getCardById(connection, id);
        res.json(card);
      } catch (error) {
        res.status(500).json({ msg: error });
      }
    });
  })
  .catch((err) => console.log(err));
