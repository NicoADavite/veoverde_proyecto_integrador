/*const fs = require('fs');
const path = require("path");*/

const db = require("../database/models/index");
const sequelize = db.sequelize;
const Op = db.Sequelize.Op;

// Esto lo usabamos antes de tener sequelize
// const productsFilePath = path.join(__dirname, '../data/products.json');
// let products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));


const mainController = {
    index: (req, res) => {
        db.Products.findAll()
            .then(products => {
                res.render("index", { products })
            })
            .catch(err => {
                res.send(err)
            })
    }
}

module.exports = mainController;