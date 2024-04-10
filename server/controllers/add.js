const todos = require('../model/todos');
const { v4: uuidv4 } = require('uuid');

uuidv4();

function addController(req, res){
    const newTodo = {id: uuidv4(),...req.body};
    const todoList = todos.getAllTodos();
    todoList.push(newTodo);
    res.status(201).send(newTodo);
}

module.exports = {addController};