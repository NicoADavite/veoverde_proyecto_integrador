const db = require("../database/models/index");
const sequelize = db.sequelize;
const Op = db.Sequelize.Op;

function userLoggedMiddleware(req, res, next) {
	res.locals.isLogged = false;

	let emailInCookie = req.cookies.userEmail;
	
	db.Users.findOne({
		where: {
			email: {[Op.like] : emailInCookie }
		}
	})
	.then(userFromCookie => {
		if (userFromCookie) {
			req.session.userLogged = userFromCookie;
		}
	
		if (req.session.userLogged) {
			res.locals.isLogged = true;
			res.locals.userLogged = req.session.userLogged;
		}

		next();
	})

	// let userFromCookie = User.findByField('email', emailInCookie);

	/*if (userFromCookie) {
		req.session.userLogged = userFromCookie;
	}

	if (req.session.userLogged) {
		res.locals.isLogged = true;
		res.locals.userLogged = req.session.userLogged;
	}

	next();
	*/
}

module.exports = userLoggedMiddleware;