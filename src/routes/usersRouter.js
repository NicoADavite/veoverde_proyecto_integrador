// ************ Require's ************
const express = require("express");
const router = express.Router();

// ************ Controller Require ************
const usersController = require("../controllers/usersController");

// ************ Middlewares ************ 
const multerMiddleware = require('../middlewares/multerMiddleware');
const upload = multerMiddleware('users', 'user');
const registerValidations = require('../middlewares/registerValidationMiddleware');
const loginValidations = require('../middlewares/loginValidationMiddleware');
const editUserValidations = require('../middlewares/editUserValidationsMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

// ************ Route System ************

/*** REGISTER FORM ***/ 
// ruta para obtener la vista del formulario de registro
router.get("/register", guestMiddleware, usersController.register);
// ruta POST para para cargar los datos del registro
router.post("/register", upload.single("image"), registerValidations, usersController.registerProcess);

/*** LOGIN FORM  ***/ 
// ruta GET para obtener la vista del formulario de login
router.get("/login", guestMiddleware, usersController.login);
// ruta POST para para cargar los datos del login
router.post("/login", loginValidations, usersController.loginProcess);

/*** GET PROFILE ***/ 
// ruta para obtener la vista de perfil de usuario
router.get("/profile", authMiddleware, usersController.profile)

// ruta para ejecutar el log out de un usuario
router.get('/logout', usersController.logout);


/*** EDIT ONE USER ***/ 
// ruta para obtener la vista de el formulario de edicion de un usuario en particular
router.get("/edit", authMiddleware, usersController.edit);

// ruta para puttear la edicion de un producto en particular
router.put("/edit", upload.single("image"), editUserValidations, usersController.update);

module.exports = router;