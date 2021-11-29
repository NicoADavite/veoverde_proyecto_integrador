const express = require("express");
const productList = require("../database/productList")

const productsController = {
    productCart: (req, res) => {
        res.render("./products/productCart");
    },
    productDetail: (req, res) => {
        let product = productList.find(product => product.id == req.params.productId);
        console.log(product)
        res.render("./products/productDetail", {product: product})
    },
    productCreation: (req, res) => {
        res.render("./products/productCreation");
    },
    productEdit: (req, res) => {
        res.render("./products/productEdit");
    },
};

module.exports = productsController;