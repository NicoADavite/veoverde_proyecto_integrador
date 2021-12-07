const fs = require('fs');
const path = require("path");

const productsFilePath = path.join(__dirname, '../data/products.json');
let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const productsController = {
    // metodo para mostrar la vista del listado de productos
    list: (req, res) => {
        res.render("./products/productList", {products});
    },

    // metodo para obtener la vista del detalle de un producto en particular
    detail: (req, res) => {
        let product = products.find(product => product.id == req.params.id);
        console.log(product)
        res.render("./products/productDetail", {product})
    },

    // metodo para obtener la vista de carrito de compras
    cart: (req, res) => {
        res.render("./products/productCart");
    },

    // metodo para obtener la vista de creacion del producto
    create: (req, res) => {
        res.render("./products/product-create-form");
    },

    // metodo para postear el formulario de creacion del producto
    store: (req, res) => {
        res.render("./products/productList");
    },

    // metodo para obtener la vista de edicion del producto
    edit: (req, res) => {
        let id = req.params.id
		let productToEdit = products.find(product => product.id == id)
        res.render("./products/product-edit-form", {
            product: productToEdit
        });
    },

    // metodo para puttear el formulario de edicion del producto
    update: (req, res) => {
        res.render("./products/productList");
    },

    // metodo para eliminar un producto 
    destroy: (req, res) => {
        res.render("./products/productList");
    }
};

module.exports = productsController;