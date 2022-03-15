// ************ Require's ************
const express = require("express");
const router = express.Router();

// ************ Controller Require ************
const apiUsersController = require("../../controllers/api/apiUsersController");

// ************ Route System ************

/*** GET ALL USERS ***/ 
// ruta para obtener la vista de la lista de usuarios (solo administrador)
router.get("/", apiUsersController.list);

/*** GET ONE USERS ***/ 
// ruta para obtener la vista del detalle de un usuario en particular
router.get("/:id", apiUsersController.detail);

module.exports = router;