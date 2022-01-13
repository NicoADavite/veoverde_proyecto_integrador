const fs = require('fs');
const path = require("path");

const productsFilePath = path.join(__dirname, '../data/products.json');
let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const categoriesFilePath = path.join(__dirname, '../data/productCategories.json');
let categories = JSON.parse(fs.readFileSync(categoriesFilePath, 'utf-8'));

const productsController = {
    // metodo para mostrar la vista del listado de productos
    list: (req, res) => {
        res.render("./products/productList", {products});
    },

    // metodo para obtener la vista del detalle de un producto en particular
    detail: (req, res) => {
        let product = products.find(product => product.id == req.params.id);
        res.render("./products/productDetail", {product});
    },

    // metodo para obtener la vista de carrito de compras
    cart: (req, res) => {
        res.render("./products/productCart");
    },

    // metodo para obtener la vista de creacion del producto
    create: (req, res) => {
        res.render("./products/product-create-form", {categories});
    },

    // metodo para postear el formulario de creacion del producto
    store: (req, res) => {
        let nuevoId;

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
	
        res.redirect("/products");
    },

    // metodo para obtener la vista de edicion del producto
    edit: (req, res) => {
        let id = req.params.id;
		let productToEdit = products.find(product => product.id == id)
        res.render("./products/product-edit-form", {
            product: productToEdit,
            categories
        });
    },

    // metodo para puttear el formulario de edicion del producto
    update: (req, res) => {
        let productoElegido = products.find(producto => {
            return producto.id == req.params.id;
        });

        let idxProdEleg = products.indexOf(productoElegido);

        let img;

		if(req.file != undefined){
			img = req.file.filename;
		} else {
            if(productoElegido.image){
                img = productoElegido.image;
            } else {
                img = 'default-image.png';
            }			
		};

        products[idxProdEleg] = {
            id: products[idxProdEleg].id, // otra posibilidad sería id : req.params.id;
            name: req.body.name,
            description: req.body.description,
            image: img,
            category: req.body.category,
            size: req.body.size,
            price: parseInt(req.body.price)
        };

        let productsJSON = JSON.stringify(products);

        fs.writeFileSync(productsFilePath, productsJSON);

        res.redirect("/products");
    },

    // metodo para eliminar un producto 
    destroy: (req, res) => {

        let productoElegido = products.find((producto) => {
			return producto.id == req.params.id;
		});

		products = products.filter(producto => {
			return producto != productoElegido;
		});

		let productsJSON = JSON.stringify(products);

		fs.writeFileSync(productsFilePath, productsJSON);

		res.redirect("/products");
    }
};

module.exports = productsController;