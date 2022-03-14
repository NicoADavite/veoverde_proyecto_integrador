const { body } = require('express-validator');
const path = require('path');

module.exports = [
    body("name")
        .notEmpty().withMessage("Tienes que escribir un nombre para el producto").bail()
        .isLength({ min : 5}).withMessage("El producto debe tener al menos 5 caracteres"),
    body("description")
        .notEmpty().withMessage("Tienes que escribir una descripción").bail()
        .isLength({ min : 20 }).withMessage("La descripción del producto debe tener al menos 20 carcteres"),
    body("image").custom((value, { req }) => {

		let file = req.file;

        if(file){

            let acceptedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
		
		    let fileExtension = path.extname(file.originalname);

		    if (!acceptedExtensions.includes(fileExtension)) {
		    	throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
		    }
        }

		return true;
	}),        
	body("category_id")
        .notEmpty().withMessage("Tienes que elegir una categoria"),
	body("price")
        .notEmpty().withMessage("Tienes que escribir un precio para el producto").bail()
        .isDecimal({force_decimal: false}).withMessage("Solo puedes ingresar numeros y el caracter '.' ")
]