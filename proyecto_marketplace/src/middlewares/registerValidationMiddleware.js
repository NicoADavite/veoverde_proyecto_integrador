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
		.isEmail().withMessage("Debes ingrear un formato de correo valido"),
	body("password")
		.notEmpty().withMessage("Tienes que escribir una contraseña").bail()
		.isLength({ min: 8 }).withMessage("La contraseña debe tener al menos 8 caracteres"),//.bail()
		//.isStrongPassword({ minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 }).withMessage("La contraseña debe contener al menos una minuscula, una mayuscula, un numero y un simbolo o caracter especial"),
	body("repassword")
		.notEmpty().withMessage("Tienes que escribir una contraseña").bail()
		.isLength({ min: 8 }).withMessage("La contraseña debe tener al menos 8 caracteres"),
	body('repassword').custom((value, { req }) => {
		if (value !== req.body.password) {
			throw new Error('Las contraseñas que escribiste no coinciden');
		}
		return true;
	}),
	body("image").custom((value, { req }) => {

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