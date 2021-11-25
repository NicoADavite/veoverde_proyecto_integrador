const express = require("express");
const router = express.Router();

const productsController = require("../controllers/productsController");

router.get("/productDetail", productsController.productDetail);
router.get("/productCart", productsController.productCart);

module.exports = router;