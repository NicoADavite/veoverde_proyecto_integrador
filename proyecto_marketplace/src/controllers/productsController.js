const express = require("express");

const productsController = {
    productCart: (req, res) => {
        res.render("./products/productCart");
    },
    productDetail: (req, res) => {
        res.render("./products/productDetail");
    },
};

module.exports = productsController;