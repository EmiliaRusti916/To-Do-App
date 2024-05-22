const client = require('../connection');

function editTodoController(req, res) {
  const {id, task, completed, isEdited, categoryID} = req.body;
  
  // Construct SQL query to update the todo with the given id
  const sqlQuery = 'UPDATE todos SET "isEdited" = $1, completed = $2 WHERE id = $3';
  const values = [isEdited, completed, id];

  // Execute the SQL query
  client.query(sqlQuery, values, (error, results) => {
      if (error) {
          console.error('Error updating todo:', error);
          res.status(500).json({ message: 'Internal server error' });
          return;
      }
      
      // Check if any todo was updated
      if (results.rowCount === 0) {
          res.status(404).json({ message: 'Todo not found' });
      } else {
          // Send the updated todo as a response
          const result = { id, task, completed, isEdited, categoryID};
          res.status(200).json(result);
      }
  });
}


module.exports = {editTodoController};