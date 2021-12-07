const fs = require('fs');
const path = require("path");

const productsFilePath = path.join(__dirname, '../data/products.json');
let products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"))


const mainController = {
    index: (req, res) => {
        res.render("index", {product: products});
    }
}

module.exports = mainController;