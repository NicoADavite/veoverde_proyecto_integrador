const express = require("express");
const fs = require("fs");
const path = require("path");
const bcryptjs = require('bcryptjs');
const {	validationResult } = require('express-validator');
const User = require("../models/User")

const db = require("../database/models/index");
const sequelize = db.sequelize;
const Op = db.Sequelize.Op;

// const usersFilePath = path.join(__dirname, '../data/users.json');

const usersController = {
    register: (req, res) => {
        res.render("./users/register");
    },

    registerProcess: (req, res) => {
        let errors = validationResult(req);

		if (errors.errors.length > 0) {
			return res.render('./users/register', {
				errors: errors.mapped(),
				oldData: req.body
			});
		}

		// let userInDB = User.findByField('email', req.body.email);

		db.Users.findOne({
			where: {
				email: {[Op.like] : req.body.email}
			}
		})
			.then(user => {

				if (user) {
					return res.render('./users/register', {
						errors: {
							email: {
								msg: 'Este email ya está registrado'
							}
						},
						oldData: req.body
					});
				}

				let img;

				if(req.file != undefined){
					img = req.file.filename
				} else {
					img = 'default-user-image.png'
				};
				
				db.Users.create({
					firstName: req.body.firstName,
					lastName: req.body.lastName,
					email: req.body.email,
					password: bcryptjs.hashSync(req.body.password, 10),
					image: img,
					category_id: 1
				})
				
				// let userToCreate = {
				// 	...req.body,
				// 	password: bcryptjs.hashSync(req.body.password, 10),
				// 	image: img,
				// 	category: "User"
				// }
		// 
				// let userCreated = User.create(userToCreate);
		
				return res.redirect('/users/login');

			})


		/*
		if (userInDB) {
			return res.render('./users/register', {
				errors: {
					email: {
						msg: 'Este email ya está registrado'
					}
				},
				oldData: req.body
			});
		}

        let img;

		if(req.file != undefined){
			img = req.file.filename
		} else {
			img = 'default-user-image.png'
		};

		let userToCreate = {
			...req.body,
			password: bcryptjs.hashSync(req.body.password, 10),
			image: img,
			category: "User"
		}

		let userCreated = User.create(userToCreate);

		return res.redirect('/users/login'); */
    },

    login: (req, res) => {
        res.render("./users/login");
    },

    loginProcess: (req, res) => {

		let errors = validationResult(req);

		if (errors.isEmpty()) {

			db.Users.findOne({
				where: {
					email: {[Op.like] : req.body.email}
				}
			})
			.then( user => {

				if(user){

					let checkPassword = bcryptjs.compareSync(req.body.password, user.password)

					if(checkPassword){

						delete user.password;
	
						req.session.userLogged = user;
	
						if(req.body.remember_user) {
							res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 60 })
						}
	
						return res.redirect("/users/profile")
	
					} else {
	
						return res.render("./users/login", {
							oldData: req.body,
							errors: {
								email: {
									msg : "Las credenciales son invalidas"
								}
							}
						})
					}

				} else {

					return res.render("./users/login", {
						oldData: req.body,
						errors: {
							email: {
								msg: "Este email no se encuentra en nuestra base de datos"
							}
						}
					})
				}
				
			})

		} else {
			return res.render('./users/login', {
				errors: errors.mapped(),
				oldData: req.body
			});
		}

		/*
		let errors = validationResult(req);

		if (errors.isEmpty()) {
			
			let userToLogin = User.findByField("email", req.body.email);

			if(userToLogin){

				let checkPassword = bcryptjs.compareSync(req.body.password, userToLogin.password)

				if(checkPassword){

					delete userToLogin.password;

					req.session.userLogged = userToLogin;

					if(req.body.remember_user) {
						res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 60 })
					}

					return res.redirect("/users/profile")

				} else {

					return res.render("./users/login", {
						oldData: req.body,
						errors: {
							email: {
								msg : "Las credenciales son invalidas"
							}
						}
					})
				}
			} else {
				return res.render("./users/login", {
					oldData: req.body,
					errors: {
						email: {
							msg: "Este email no se encuentra en nuestra base de datos"
						}
					}
				})
			}
			
		} else {
			return res.render('./users/login', {
				errors: errors.mapped(),
				oldData: req.body
			});
		}
		*/
    },  

    profile: (req, res) => {
        res.render("./users/profile", {
			user: req.session.userLogged
		})
    },

	logout: (req, res) => {
		res.clearCookie("userEmail");
		req.session.destroy();
		return res.redirect("/");
	}
};

module.exports = usersController;