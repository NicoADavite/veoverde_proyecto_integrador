const { body } = require('express-validator');
const path = require('path');

module.exports = [
    body("email")
        .notEmpty().withMessage("Tienes que escribir un email").bail()
        .isEmail().withMessage("Debes ingrear un formato de correo valido"),
    body("password")
        .notEmpty().withMessage("Tienes que escribir una contraseña").bail()
        .isLength({ min : 8}).withMessage("La contraseña debe tener al menos 8 caracteres")//.bail()
        //.isStrongPassword({ minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 }).withMessage("La contraseña debe contener al menos una minuscula, una mayuscula, un numero y un simbolo o caracter especial"),
]