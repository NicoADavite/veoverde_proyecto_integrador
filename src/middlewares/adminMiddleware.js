function adminMiddleware(req, res, next) {
	if ((!req.session.userLogged) || (req.session.userLogged.category_id == "1")) {
		return res.redirect('/products');
	}
	next();
}

module.exports = adminMiddleware;