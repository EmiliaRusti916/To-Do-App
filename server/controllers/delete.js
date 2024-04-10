const {todoList} = require('../model/todos.js');

function deleteController(req, res) {
    const id = req.params.id;
    const index = todoList.findIndex( todo => todo.id === id);
    if(index !== -1)
    {
        todoList.splice(index, 1);
        res.status(200).send(todoList);
    }
    else{
        res.status(404).send({message: "Todo not found"});
    }
}
module.exports = {deleteController};
