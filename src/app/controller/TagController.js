const connection = require("../../database/dbconnect");

class TagController {
    async index(req, res) {
        let query = "SELECT * FROM tag";
        
    }

    async create(req, res) {
        let query = "SELECT * FROM tag";
        let tags;
        connection.query(query, (err, result) => {
            if (err) throw err;
            res.render('tag/create',{tags:result})
        })
    }

    createOne(req,res) {
        let name = req.body.name;
        let description = req.body.description;

        let query = "INSERT INTO tag (tag_name, description) VALUES ('" + name + "','" + description + "')";
        connection.query(query, (err, result) => {
            if (err) throw err;
            console.log("1 result inserted")
            res.redirect('/tag/index')

        })
    }ca

    update(req,res) {
        let id = req.params.id;
        let query1 = "SELECT * FROM tag WHERE id = " + id +";SELECT * FROM tag";
        connection.query(query1, [1,2], (err, results) => {
            if (err) throw err;
            console.log(results[1])
            console.log(results[0][0])

            res.render('tag/update',{tag : results[0][0], tags: results[1]})
        })
    }

    async updateOne(req,res) {
        let id = req.body.id;
    
        let description = req.body.description;
        let name = req.body.name;

        console.log(req.body)
        let query2 =  "UPDATE tag set tag_name = '" + name + "', description = '" + description + "' WHERE id = '" + id +"'";
        connection.query(query2, (err, result) => {
            if (err) throw err;
            console.log(result)
        })
    }

    async delete(req,res) {
        let id = req.params.id;
        let query =  "DELETE FROM tag where id = '" + id +"'";
        await connection.query(query, (err, result) => {
            if (err) throw err;
            console.log('delete sucess')
            res.redirect('/tag/index')
        })
    }
}

module.exports = new TagController