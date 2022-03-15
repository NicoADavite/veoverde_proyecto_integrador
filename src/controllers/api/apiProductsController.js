const res = require('express/lib/response');
const fs = require('fs');
const { resolve } = require('path');
const path = require("path");

const db = require("../../database/models/index");
const sequelize = db.sequelize;
const Op = db.Sequelize.Op;


const apiProductsController = {

    // metodo para llamar a la api de lista de productos
    list: (req, res) => {

        // let productsPromise = db.Products.findAll();

        // let productCategoriesPromise = db.ProductCategories.findAll();

        // Promise.all([productsPromise, productCategoriesPromise])
        //     .then(([products, productCategories]) => {

        //         const categories = Object.create()

        //         categories.



        //         productCategories.map(productCategory => {
        //             return productCategory.name
        //         })                
                
        //         let response = {
        //             meta: {
        //                 status: 200,
        //                 url: "/api/products"
        //             },
        //             count: products.length,
        //             countByCategory: {
        //                 ...productCategories.name
        //             }
        //         }
        //         res.json(response);

        //     })
        //     .catch(err => {
        //         res.send(err)
        //     })

    
        db.Products.findAll()
            .then(products => {
                let response = {
                    meta: {
                        status: 200,
                        count: products.length,
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
