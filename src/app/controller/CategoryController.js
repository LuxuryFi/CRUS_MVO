const categoryModel = require('../model/Category')
const connection = require("../../database/dbconnect");


class CategoryController {
    async index(req, res) {
        let result = await categoryModel.findAll();
        console.log('hi')
        res.render('category/index',{categories : result})

    }

    async create(req, res) {
        let query = "SELECT * FROM category";
        let categories;
        await connection.query(query, (err, result) => {
            if (err) throw err;
            res.render('category/create',{categories:result})

        })
    }

    createOne(req,res) {
        let name = req.body.name;
        let description = req.body.description;
        let parent = req.body.parent;

        let query = "INSERT INTO category (category_name, description, parent) VALUES ('" + name + "','" + description + "','" + parent + "')";
        connection.query(query, (err, result) => {
            if (err) throw err;
            console.log("1 result inserted")
            res.redirect('/category/index')

        })
    }

    update(req,res) {
        let id = req.params.id;
        let query1 = "SELECT * FROM category WHERE id = " + id +";SELECT * FROM category";

        connection.query(query1, [1,2], (err, results) => {
            if (err) throw err;
            console.log(results[1])
            res.render('category/update',{category : results[0][0], categories: results[1]})
        })
    }
    async updateOne(req,res) {
        let id = req.body.id;
        let parent = req.body.parent;
        let description = req.body.description;
        let name = req.body.name;

        console.log(req.body)
        // let query1 = "UPDATE TABLE category SET category_name = '" + name + 'AND" description =' + description +'"AND parent =' + parent +'" WHERE id='+ id + "'";
        let query2 =  "UPDATE category set category_name = '" + name + "', description = '" + description + "', parent = '"+ parent + "' WHERE id = '" + id +"'";
        connection.query(query2, (err, result) => {
            if (err) throw err;
            res.redirect('index')
        })
    }

    async delete(req,res) {
        let id = req.params.id;
        let query =  "DELETE FROM category where id = '" + id +"'";
        await connection.query(query, (err, result) => {
            if (err) throw err;
            console.log('delete sucess')
            res.redirect('/category/index')
        })
    }
}

module.exports = new CategoryController