const client = require("../connection");

function addCategoriesController(req, res) {
    const {description, deadline} = req.body;
    const sqlQuery = 'INSERT INTO categories (description, deadline) VALUES ($1, $2)';
    const values = [description, deadline];

    client.query(sqlQuery, values, (error, results) => {
      if (error) {
        console.error('Error adding category:', error);
        res.status(500).json({ message: 'Internal server error' });
        return;
      }
      const newCategory = { description, deadline };
      res.status(201).send(results);
    });
  }

module.exports = {addCategoriesController};