const client = require("../connection");

function getAllCategoriesController(req, res) {
    client.query('SELECT * FROM categories', (error, results) => {
        if (error) {
            console.error("Error retrieving categories:", error);
            return res.status(500).send("Error retrieving categories from the database");
        }
        res.status(200).send(results.rows);
    });
}

module.exports = {getAllCategoriesController};


