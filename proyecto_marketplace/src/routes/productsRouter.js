// ************ Require's ************
const express = require("express");
const router = express.Router();
const multer = require('multer');
const path = require('path');


// ************ Controller Require ************
const productsController = require("../controllers/productsController");


// ************ Multer ************ 
/*var storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null, 'public/images/products')
    },
    filename: function(req,file,cb){
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
var upload = multer({storage: storage})*/


// ************ Route System ************

/*** GET ALL PRODUCTS ***/ 
// ruta para obtener la vista de la lista de productos (solo administrador)
router.get("/", productsController.list);

// ruta para obtener la vista del carrito de compras
router.get("/productCart", productsController.cart);

/*** CREATE ONE PRODUCT ***/ 
// ruta para obtener la vista de el formulario de creacion de un producto (solo administrador)
router.get("/create", productsController.create);
// ruta para postear la creacion de un producto (solo administrador)
router.post("/", productsController.store);

/*** GET ONE PRODUCT ***/ 
// ruta para obtener la vista del detalle de un producto en particular
router.get("/:id", productsController.detail);

/*** EDIT ONE PRODUCT ***/ 
// ruta para obtener la vista de el formulario de edicion de un producto en particular (solo administrador)
router.get("/edit/:id", productsController.edit);
// ruta para puttear la edicion de un producto en particular (solo administrador)
router.put("/:id", productsController.update);

/*** DELETE ONE PRODUCT***/ 
// ruta para eliminar un producto en particular (solo administrador)
router.delete("/:id", productsController.destroy);




module.exports = router;