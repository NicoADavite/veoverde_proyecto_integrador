const express = require("express");

const productList = require("../database/productList")

const mainController = {
    index: (req, res) => {
        res.render("index", {product: productList});
    }
}

module.exports = mainController;