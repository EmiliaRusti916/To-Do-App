const todoList = require('../model/todos');

function editTodoController(req, res) {
    const id = req.params.id;
    const updatedTodo = req.body;
    const todos = todoList.getAllTodos();
    const index = todos.findIndex(todo => todo.id === id);
    if (index === -1) {
      res.status(404).json({ message: 'Todo not found' });
    } else {
      todos[index] = { ...todos[index], ...updatedTodo };
      console.log(todos[index]);
      res.status(200).send(todos[index]);
    }
}
module.exports = {editTodoController};