const client = require('../connection');

function deleteController(req, res) {
    const id = req.params.id;
    
    const sqlQuery = 'DELETE FROM todos WHERE id = $1';
    const values = [id];
  
    client.query(sqlQuery, values, (error, results) => {
        if (error) {
            console.error('Error deleting todo:', error);
            res.status(500).json({ message: 'Internal server error' });
            return;
        }
        
        if (results.rowCount === 0) {
            res.status(404).json({ message: 'Todo not found' });
        } else {
            client.query('SELECT * FROM todos', (error, results) => {
                if (error) {
                    console.error('Error fetching todos:', error);
                    res.status(500).json({ message: 'Internal server error' });
                    return;
                }
                res.status(200).json(results.rows);
            });
        }
    });
}

module.exports = { deleteController };
