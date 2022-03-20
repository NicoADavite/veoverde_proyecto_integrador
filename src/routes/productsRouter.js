// ************ Require's ************
const express = require("express");
const router = express.Router();
const multer = require('multer');
const path = require('path');


// ************ Controller Require ************
const productsController = require("../controllers/productsController");


// ************ Middlewares ************ 
const upload = require('../middlewares/productMulterMiddleware');
const productValidationMiddleware = require("../middlewares/productValidationMiddleware");
const adminMiddleware = require('../middlewares/adminMiddleware');


// ************ Route System ************

/*** GET ALL PRODUCTS ***/ 
// ruta para obtener la vista de la lista de productos
router.get("/", productsController.list);

// ruta para obtener la vista del carrito de compras
router.get("/productCart", productsController.cart);

// ruta para obtener los resultados del search
router.post("/search", productsController.search);

/*** CREATE ONE PRODUCT ***/ 
// ruta para obtener la vista de el formulario de creacion de un producto (solo administrador)
router.get("/create", adminMiddleware, productsController.create);
// ruta para postear la creacion de un producto (solo administrador)
router.post("/", upload.single("image"), productValidationMiddleware, productsController.store);

/*** EDIT ONE PRODUCT ***/ 
// ruta para obtener la vista de el formulario de edicion de un producto en particular (solo administrador)
router.get("/edit/:id", adminMiddleware, productsController.edit);
// ruta para puttear la edicion de un producto en particular (solo administrador)
router.put("/:id", upload.single("image"), productValidationMiddleware, productsController.update);

/*** GET ONE PRODUCT ***/ 
// ruta para obtener la vista del detalle de un producto en particular
router.get("/:id", productsController.detail);


/*** DELETE ONE PRODUCT***/ 
// ruta para eliminar un producto en particular (solo administrador)
router.delete("/:id", adminMiddleware, productsController.destroy);


module.exports = router;