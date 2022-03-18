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

        let productsPromise =   db.Products.findAll({include:['category']})

        let productCategoriesPromise =  db.ProductCategories.findAll({include:['products']})
                                
        Promise.all([productsPromise, productCategoriesPromise])
            .then(([products, productCategories]) => {

                let arrayCategorias = [];

                productCategories.forEach((category) => {
                    arrayCategorias.push({
                        nombre: category.dataValues.name,
                        total: category.dataValues.products.length
                    })
                })

                let papel = products.filter(product => product.category_id == 1);
                let kits = products.filter(product => product.category_id == 2);
                let productosDeOficina = products.filter(product => product.category_id == 3);
                let calendarios = products.filter(product => product.category_id == 4);
                let tarjetasPlantables = products.filter(product => product.category_id == 5);
                let bolsasCompostables = products.filter(product => product.category_id == 6);
                let otros = products.filter(product => product.category_id == 7);

                let productsUpdated = [];

                products.forEach(product => {
                    let newProduct = {
                        id: product.id,
                        name: product.name,
                        description: product.description,
                        price: product.price,
                        image: product.image,
                        category_id: product.category_id,
                        category: product.category.name,
                        detail: `https://veoverde.herokuapp.com/api/products/${product.id}`
                    }
                    productsUpdated.push(newProduct);
                })

                let response = {
                    meta: {
                        status: 200,
                        count: products.length,
                        url: "/api/products",
                        categories: productCategories.length,
                        categoryNames: arrayCategorias,
                        countByCategory: {
                            papel: papel.length,
                            kits: kits.length,
                            productosDeOficina: productosDeOficina.length,
                            calendarios: calendarios.length,
                            tarjetasPlantables: tarjetasPlantables.length,
                            bolsasCompostables: bolsasCompostables.length,
                            otros: otros.length
                        }
                    },
                    products: productsUpdated
                }

                res.json(response);                

            })
            .catch(err => {
                res.send(err)
            })

    
    },

    // metodo para llamar a la api de detalle de producto

    detail: (req, res) => {
    
        let id = req.params.id;

        db.Products.findByPk(id, {
            include: ["category"]
        })
            .then(product => {

                let productUpdated = {
                    id: product.id,
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    category_id: product.category_id,
                    category: product.category.name,
                    imageURL: `/images/products/${product.image}`
                }

                let response = {
                    meta: {
                        status: 200,
                        length: product.length,
                        url: "/api/products/:id"
                    },
                    data: productUpdated
                }
                res.json(response);
            })
            .catch(err => {
                res.send(err)
            })
    
    },

    // metodo para llamar a la api de ultimo producto en la base de datos

    lastProduct: (req, res) => {

        db.Products.findAll({
            include: ["category"],
            order: [
                ["id", "DESC"],
            ],
            limit: 1
        })
            .then(product => {

                let productUpdated = {
                    id: product[0].id,
                    name: product[0].name,
                    description: product[0].description,
                    price: product[0].price,
                    category_id: product[0].category_id,
                    category: product[0].category,
                    image: `/images/products/${product[0].image}`
                }

                let response = {
                    meta: {
                        status: 200,
                        length: product.length,
                        url: "/api/products/lastproduct"
                    },
                    data: productUpdated
                }
                res.json(response);

            })
            .catch(err => {
                res.send(err)
            })

    } 

}

module.exports = apiProductsController;
