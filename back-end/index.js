import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import env from "dotenv";
import cors from "cors"

const app = express();
const port = 3004;
app.use(cors());

env.config();

const db = new pg.Client({
    user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
  });
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());

app.get("/",  async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM notes");
        console.log("ok")
        res.send(result.rows);  
    } catch (error) {
        console.log(error)
    }
});

app.post("/add",  async (req, res) => {
    const title = req.body.title;
    const description = req.body.content;

    try {
        const result = await db.query("INSERT INTO notes (title, description) VALUES ($1, $2) RETURNING *", [title, description]);
        res.send(result.rows[0]);
    } catch (error) {
        console.log(error)
    }
})


app.post("/delete",  async (req, res) => {
    const id = req.body.id;
    try {
        db.query("DELETE FROM notes WHERE id = $1", [id]);
    } catch (error) {
        console.log(error)       
    }
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
