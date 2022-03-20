const { body } = require('express-validator');
const path = require('path');
    
module.exports = [
    body("firstName")
        .notEmpty().withMessage("Tienes que escribir un nombre").bail()
        .isLength({ min: 2 }).withMessage("El nombre debe tener al menos 2 caracteres"),

    body("lastName")
        .notEmpty().withMessage("Tienes que escribir un apellido").bail()
        .isLength({ min: 2 }).withMessage("El apellido debe tener al menos 2 caracteres"),

    body("email")
        .notEmpty().withMessage("Tienes que escribir un email").bail()
        .isEmail().withMessage("Debes ingresar un formato de correo valido"),

    body("image")
        .custom((value, { req }) => {

            let file = req.file;

            let acceptedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];

            if (file) {

                let fileExtension = path.extname(file.originalname);

                if (!acceptedExtensions.includes(fileExtension)) {
                    throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
                }
            }

            return true;
        })
]
