const { body } = require('express-validator');
const path = require('path');

module.exports = [
    body("email")
        .notEmpty().withMessage("Tienes que escribir un email").bail()
        .isEmail().withMessage("Debes ingrear un formato de correo valido"),
    body("password")
        .notEmpty().withMessage("Tienes que escribir una contraseña").bail()
        .isLength({ min : 8}).withMessage("La contraseña debe tener al menos 8 caracteres")
]