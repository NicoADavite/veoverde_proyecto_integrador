const express = require("express");

const productsController = {
    productCart: (req, res) => {
        res.render("./products/productCart");
    },
    productDetail: (req, res) => {
        res.render("./products/productDetail");
    },
    productCreation: (req, res) => {
        res.render("./products/productCreation");
    },
    productEdit: (req, res) => {
        res.render("./products/productEdit");
    },
};

module.exports = productsController;