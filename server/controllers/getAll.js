const client = require("../connection");

function getAllController(req, res) {
    client.query('SELECT * FROM todos', (error, results) => {
        if (error) {
            console.error("Error retrieving todos:", error);
            return res.status(500).send("Error retrieving todos from the database");
        }
        res.status(200).send(results.rows);
    });
}

module.exports = {getAllController};


