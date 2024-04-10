const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const { getAllController } = require('./controllers/getAll');
const { addController } = require('./controllers/add');
const { deleteController } = require('./controllers/delete');
const { editTodoController } = require('./controllers/editTodo');
const { editTaskController } = require('./controllers/editTask');
const { getByIdController } = require('./controllers/getById');


const app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());


app.get('/all', getAllController);

app.post('/add', addController);


app.delete('/delete/:id', deleteController);

app.patch('/editTodo/:id', editTodoController);

app.patch('/editTask/:id', editTaskController);

app.get('/:id', getByIdController);

const port = 8000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
