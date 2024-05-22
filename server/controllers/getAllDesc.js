const client = require("../connection");

function getAllDescController(req, res) {
    const field = req.query.field;
    const sqlQuery = `SELECT * FROM todos ORDER BY ${field} DESC`;
    client.query(sqlQuery,  (error, results) => {
        if (error) {
            console.error("Error retrieving todos:", error);
            return res.status(500).send("Error retrieving todos from the database");
        }
        res.status(200).send(results.rows);
    });
}

module.exports = {getAllDescController};


