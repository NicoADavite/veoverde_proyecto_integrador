const fs = require('fs');
const { resolve } = require('path');
const path = require("path");

const db = require("../database/models/index");
const sequelize = db.sequelize;
const Op = db.Sequelize.Op;

const productsFilePath = path.join(__dirname, '../data/products.json');
let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const categoriesFilePath = path.join(__dirname, '../data/productCategories.json');
let categories = JSON.parse(fs.readFileSync(categoriesFilePath, 'utf-8'));

const productsController = {
    
    // metodo para mostrar la vista del listado de productos
    list: (req, res) => {
        //res.render("./products/productList", {products});
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
        //let product = products.find(product => product.id == req.params.id);
        //res.render("./products/productDetail", {product});
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
        let userLogged = req.session.userLogged
        db.ProductCategories.findAll()
            .then(categories => {
                res.render("./products/product-create-form", {
                    categories,
                    userLogged
            })
            .catch(err => {
                res.send(err)
            })
        })
    },

    // metodo para postear el formulario de creacion del producto
    store: (req, res) => {

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
        

    /*    let nuevoId;

		if(products != undefined){
            nuevoId = products[products.length - 1].id  + 1;
        } else {
            nuevoId = 1;
        };        

        let img;

		if(req.file != undefined){
			img = req.file.filename
		} else {
			img = 'default-image.png'
		};

		let newProduct = {
			id: nuevoId,
			name: req.body.name,
            description: req.body.description,
            image: img,
            category: req.body.category,
            size: req.body.size,
			price: req.body.price
		};

		products.push(newProduct);
		let productsJSON = JSON.stringify(products);
		fs.writeFileSync(productsFilePath, productsJSON);
	
        res.redirect("/products");*/
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

        // let id = req.params.id;
		// let productToEdit = products.find(product => product.id == id)
        // res.render("./products/product-edit-form", {
        //     product: productToEdit,
        //     categories
        // });        
    },

    // metodo para puttear el formulario de edicion del producto
    update: (req, res) => {

        let id = req.params.id;

        let img;

        db.Products.findByPk(id)
            .then(product => {

                if(req.file != undefined){
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

        // let productoElegido = products.find(producto => {
        //     return producto.id == req.params.id;
        // });
// 
        // let idxProdEleg = products.indexOf(productoElegido);
// 
        // let img;
// 
		// if(req.file != undefined){
		// 	img = req.file.filename;
		// } else {
        //     if(productoElegido.image){
        //         img = productoElegido.image;
        //     } else {
        //         img = 'default-image.png';
        //     }			
		// };
// 
        // products[idxProdEleg] = {
        //     id: products[idxProdEleg].id, // otra posibilidad sería id : req.params.id;
        //     name: req.body.name,
        //     description: req.body.description,
        //     image: img,
        //     category: req.body.category,
        //     size: req.body.size,
        //     price: parseInt(req.body.price)
        // };
// 
        // let productsJSON = JSON.stringify(products);
// 
        // fs.writeFileSync(productsFilePath, productsJSON);
// 
        // res.redirect("/products");
    },

    // metodo para eliminar un producto 
    destroy: (req, res) => {
        db.Products.destroy({
            where: {
                id: req.params.id
            }
        })
            .then(result => {
                res.redirect("/products")
            })
            .catch(err => {
                res.send(err)
            });

        // let productoElegido = products.find((producto) => {
		// 	return producto.id == req.params.id;
		// });
// 
		// products = products.filter(producto => {
		// 	return producto != productoElegido;
		// });
// 
		// let productsJSON = JSON.stringify(products);
// 
		// fs.writeFileSync(productsFilePath, productsJSON);
// 
		// res.redirect("/products");
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