const express = require("express");
const cors = require("cors");
const pool = require("./db");
const app = express();

app.use(express.json());
app.use(cors());

// Routes

// create todo

app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "insert into todo (description) values($1) returning *",
      [description]
    );
    res.json(newTodo.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

// get todos
app.get("/todos", async (req, res) => {
  try {
    const allTodo = await pool.query("select * from todo");
    res.json(allTodo.rows);
  } catch (error) {
    console.error(error.message);
  }
});

// get indivisual todo

app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("select * from todo where todo_id = $1", [
      id,
    ]);
    res.json(todo.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

// update todo
app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateTodo = await pool.query(
      "update todo set description = $1 where todo_id = $2",
      [description, id]
    );
    res.json("todo updated !!");
  } catch (error) {
    console.error(error.message);
  }
});

// delete todo
app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query("delete from todo where todo_id = $1", [
      id,
    ]);
    res.json("todo deleted !!");
  } catch (error) {
    console.error(error.message);
  }
});


app.listen(3000, () => {
  console.log("listening to 3000");
});
