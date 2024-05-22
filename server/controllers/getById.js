const client = require("../connection");

// getByIdController function
function getByIdController(req, res) {
  const id = req.params.id;

  // Execute the SQL query with proper parameterization
  client.query('SELECT * FROM todos WHERE id = $1', [id], (error, results) => {
    if (error) {
      console.error('Error fetching todo:', error);
      res.status(500).json({ message: 'Internal server error' });
      return;
    }

    // Check if a todo with the given ID was found
    if (results.length === 0) {
      res.status(404).json({ message: 'Todo not found' });
    } else {
      // Send the todo as a response
      res.status(200).send(results[0]);
    }
  });
}

  
  module.exports = { getByIdController };