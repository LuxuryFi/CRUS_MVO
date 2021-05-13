const connection = require("../../database/dbconnect");

class Category {

    async findAll() {
        let query = "SELECT * FROM category";
        const [rows, fields] = await connection.execute(query);
        console.log(rows)
    }

}

module.exports = new Category;