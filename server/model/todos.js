const todoList = [
    { id: '1', task: "Finish homework", completed: false },
    { id: '2', task: "Clean the house", completed: true }
];

function getAllTodos() {
    return todoList;
}

module.exports = {
    getAllTodos,
    todoList
};
