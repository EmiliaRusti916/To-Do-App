const express = require('express');
const bodyParser = require('body-parser');
const client = require('./connection');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const { getAllController } = require('./controllers/getAll');
const { addController } = require('./controllers/add');
const { deleteController } = require('./controllers/delete');
const { editTodoController } = require('./controllers/editTodo');
const { editTaskController } = require('./controllers/editTask');
const { getByIdController } = require('./controllers/getById');
const { getAllDescController } = require('./controllers/getAllDesc');

const { getAllCategoriesController } = require('./categoriesController/getAllCategoriesController');
const { addCategoriesController } = require('./categoriesController/addCategoriesController');
const { deleteCategoriesController } = require('./categoriesController/deleteCategoriesController');
const { editCategoriesController } = require('./categoriesController/editCategoriesController');


const app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());


app.get('/all', getAllController);

app.get('/all/?field=task', getAllDescController);

app.get('/allcategories', getAllCategoriesController);

app.post('/add', addController);
app.post('/addcategories', addCategoriesController);

app.delete('/delete/:id', deleteController);
app.delete('/deletecategories/:id', deleteCategoriesController);

app.patch('/editTodo/:id', editTodoController);
app.patch('/editcategories/:id', editCategoriesController);

app.patch('/editTask/:id', editTaskController);
app.get('/:id', getByIdController);

const port = 8000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

client.connect()
  .then(() => {
    console.log('Connected to the database');
  })
  .catch(error => {
    console.error('Error connecting to the database:', error);
  });

  const verifyUser = (req, res, next)=>{
    const token =  req.cookies.token;
    if(!token){
        return res.json({Message: 'please provide a token'})
    }
    else{
        jwt.verify(token, 'secret', (err, decoded)=>{
            if(err){
                 return res.json({Message: 'authentification error'})
            }
            else{
                req.username = decoded.username;
                next();
            }
        })
    }
}
  app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const client = await pool.connect();
        const query = 'SELECT * FROM users WHERE Username = $1 ';
        const values = [username];
        const result = await client.query(query, values);
        
        if (result.rows.length > 0) {
            const hashedPassword = result.rows[0].password;
            const match = await bcrypt.compare(password, hashedPassword);
            if(match){
            const token = jwt.sign({ username: username }, 'secret', { expiresIn: '1h' });
            res.cookie('token', token);
            res.status(200).json({Status: 'Success'});
            }else {
                res.json({ Message: 'Invalid username or password' });
            }
        } else {
            res.json({ Message: 'Invalid username or password' });
        }
        
        client.release();
        
    } catch (err) {
        console.error('Error at login:', err); 
        res.status(500).json({ Message: 'Internal server error' });
    }
});

app.get('/', verifyUser, (req, res)=>{
    return res.json({Status: 'Success', username: req.username});
})

app.get('/logout', (req, res)=>{
    res.clearCookie('token');
    return res.json({Status: 'Success'});

})