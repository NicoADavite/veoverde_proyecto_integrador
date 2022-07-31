const fs = require('fs');
const { resolve } = require('path');
const path = require("path");

const {	validationResult } = require('express-validator');

const db = require("../database/models/index");
const sequelize = db.sequelize;
const Op = db.Sequelize.Op;


const productsController = {
    
    // metodo para mostrar la vista del listado de productos
    list: (req, res) => {

        db.Products.findAll()
            .then(products => {
                res.render("./products/productList", { products })
            })
            .catch(err => {
                res.send(err)
            })

    },

    // metodo para obtener la vista del detalle de un producto en particular
    detail: (req, res) => {

        let id = req.params.id;
        db.Products.findByPk(id)
            .then(product => {
                res.render("./products/productDetail", { product });
            })
            .catch(err => {
                res.send(err)
            })

    },

    // metodo para obtener la vista de carrito de compras
    cart: (req, res) => {
        res.render("./products/productCart");
    },

    // metodo para obtener la vista de creacion del producto
    create: (req, res) => {

        db.ProductCategories.findAll()
            .then(categories => {
                res.render("./products/product-create-form", {
                    categories
                })
            })
            .catch(err => {
                res.send(err)
            })       

    },

    // metodo para postear el formulario de creacion del producto
    store: (req, res) => {

        let errors = validationResult(req);

		if (errors.errors.length > 0) {

            db.ProductCategories.findAll()
            .then(categories => {
                return res.render('./products/product-create-form', {
                    categories,
                    errors: errors.mapped(),
                    oldData: req.body
                });
            })
            .catch(err => {
                res.send(err)
            })  

		} else {

            let img;

            if(req.file != undefined){
                img = req.file.filename
            } else {
                img = 'default-image.png'
            };
            
            db.Products.create({
                name: req.body.name,
                description: req.body.description,
                image: img,
                category_id: req.body.category_id,
                price: req.body.price
            })
                .then(result => {
                    res.redirect("/products");
                })
                .catch(err => {
                    res.send(err)
                });

        }

    },

    // metodo para obtener la vista de edicion del producto
    edit: (req, res) => {

        let id = req.params.id;

        let categoriesPromise = db.ProductCategories.findAll();

        let productPromise = db.Products.findByPk(id);

        Promise.all([categoriesPromise, productPromise])
            .then(([categories, product]) => {
                res.render("./products/product-edit-form", {
                    categories,
                    product                    
                })
            })
            .catch(err => {
                res.send(err)
            });
      
    },

    // metodo para puttear el formulario de edicion del producto
    update: async (req, res) => {

        let id = req.params.id;
        
        let errors = validationResult(req);

		if (errors.errors.length > 0) {

            let categoriesPromise = db.ProductCategories.findAll();

            let productPromise = db.Products.findByPk(id);

            Promise.all([categoriesPromise, productPromise])
                .then(([categories, product]) => {
                    return res.render('./products/product-edit-form', {
                        categories,
                        product,
                        errors: errors.mapped(),
                        oldData: req.body
                    })
                })
                .catch(err => {
                    res.send(err)
                })  

		} else {
            
            let img;
            
            db.Products.findByPk(id)
                .then(product => {
                
                    if(req.file != undefined){
                        const imagePath = path.join(__dirname, `../../public/images/products/${product.image}`);
                        fs.unlinkSync(imagePath);
                        img = req.file.filename;
                    } else {
                        if(product.image){
                            img = product.image;
                        } else {
                            img = 'default-image.png';
                        }			
                    };
                
                    db.Products.update({
                        name: req.body.name,
                        description: req.body.description,
                        image: img,
                        category_id: req.body.category_id,
                        price: req.body.price
                    },{
                        where: {
                            id: id
                        }
                    })
                        .then(result => {
                            res.redirect("/products")
                        })
                        .catch(err => {
                            res.send(err)
                        });                
                    
                })
        }

    },

    // metodo para eliminar un producto 
    destroy: async (req, res) => {
        const id = req.params.id;

        const productToDelete = await db.Products.findByPk(id);

        const imagePath = path.join(__dirname, `../../public/images/products/${productToDelete.image}`);
        fs.unlinkSync(imagePath);

        db.Products.destroy({
            where: {
                id
            }
        })
            .then(result => {
                res.redirect("/products")
            })
            .catch(err => {
                res.send(err)
            });

    }, 

    search: (req, res) =>{
        db.Products.findAll({
            where:{
                name: {[Op.like] : "%" + req.body.name + "%"}
            }
        })
            .then(products => {
                res.render("./products/productList", { products })
            })
    }
};

module.exports = productsController;