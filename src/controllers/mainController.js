const db = require("../database/models/index");
const sequelize = db.sequelize;
const Op = db.Sequelize.Op;


const mainController = {
    index: (req, res) => {
        db.Products.findAll()
            .then(products => {
                res.render("index", { products })
            })
            .catch(err => {
                res.send(err)
            })
    },

    indexv2: (req, res) => {
        db.Products.findAll()
            .then(products => {
                res.render("index-v2", { products })
            })
            .catch(err => {
                res.send(err)
            })
    }
}

module.exports = mainController;