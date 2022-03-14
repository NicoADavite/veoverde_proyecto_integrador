const fs = require('fs');
const { resolve } = require('path');
const path = require("path");

const {	validationResult } = require('express-validator');

const db = require("../../database/models/index");
const sequelize = db.sequelize;
const Op = db.Sequelize.Op;


const apiProductsController = {

    // metodo para llamar a la api de lista de productos
    list: (req, res) => {
    
        db.Products.findAll()
            .then(products => {
                let response = {
                    meta: {
                        status: 200,
                        total: products.length,
                        url: "/api/products"
                    },
                    data: products
                }
                res.json(response)
            })
            .catch(err => {
                res.send(err)
            })
    
    },

    // metodo para llamar a la api de detalle de producto
    detail: (req, res) => {
    
        let id = req.params.id;

        db.Products.findByPk(id)
            .then(product => {
                let response = {
                    meta: {
                        status: 200,
                        length: product.length,
                        url: "/api/products/:id"
                    },
                    data: product
                }
                res.json(response);
            })
            .catch(err => {
                res.send(err)
            })
    
    }

}

module.exports = apiProductsController;
