const todos = require('../model/todos');

function getAllController(req, res) {
    const todoList = todos.getAllTodos();
    res.status(200).send(todoList);
}

module.exports = {getAllController};


