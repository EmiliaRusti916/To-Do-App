const todoList = require('../model/todos');
function getByIdController(req, res){
    const id = req.params.id;
    const todos = todoList.getAllTodos();
    const todo = todos.find(todo => todo.id === id);
    if (!todo) {
        res.status(404).json({ message: 'Todo not found' });
    } else {
        res.status(200).send(todo);
    }
}
module.exports = {getByIdController};