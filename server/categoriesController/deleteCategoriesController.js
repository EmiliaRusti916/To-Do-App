const client = require('../connection');

function deleteCategoriesController(req, res) {
    const id = req.params.id;
    
    const sqlQuery = 'DELETE FROM categories WHERE id = $1';
    const values = [id];
  
    client.query(sqlQuery, values, (error, results) => {
        if (error) {
            console.error('Error deleting category:', error);
            res.status(500).json({ message: 'Internal server error' });
            return;
        }
        
        if (results.rowCount === 0) {
            res.status(404).json({ message: 'Category not found' });
        } else {
            client.query('SELECT * FROM categories', (error, results) => {
                if (error) {
                    console.error('Error fetching categories:', error);
                    res.status(500).json({ message: 'Internal server error' });
                    return;
                }
                res.status(200).json(results.rows);
            });
        }
    });
}

module.exports = { deleteCategoriesController };
