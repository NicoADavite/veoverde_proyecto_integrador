const express = require("express");
const router = express.Router();

const productsController = require("../controllers/productsController");

router.get("/productDetail", productsController.productDetail);
router.get("/productCart", productsController.productCart);
router.get("/productCreation", productsController.productCreation);
router.get("/productEdit", productsController.productEdit);

module.exports = router;