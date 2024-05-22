const client = require("../connection");
const { v4: uuidv4 } = require('uuid');

uuidv4();

function addController(req, res) {
    const {task, completed, isEdited, categoryID} = req.body;
    const id = uuidv4();
    const sqlQuery = 'INSERT INTO todos (id, task, completed, "isEdited", "categoryID") VALUES ($1, $2, $3, $4, $5)';
    const values = [id, task, completed, isEdited, categoryID];

    client.query(sqlQuery, values, (error, results) => {
      if (error) {
        console.error('Error adding todo:', error);
        res.status(500).json({ message: 'Internal server error' });
        return;
      }
      const newTodo = {id, task, completed, isEdited, categoryID};
      res.status(201).send(newTodo);
    });
  }

module.exports = {addController};