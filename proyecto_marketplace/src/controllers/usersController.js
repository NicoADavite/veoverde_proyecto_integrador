const express = require("express");
const fs = require("fs");
const path = require("path");
const bcryptjs = require('bcryptjs');
const {	validationResult } = require('express-validator');

const db = require("../database/models/index");
const sequelize = db.sequelize;
const Op = db.Sequelize.Op;


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
					.then(result => {
						return res.redirect('/users/login');
					})

			})

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
								password: {
									msg : "La contraseña es incorrecta"
								}
							}
						})
					}

				} else {

					return res.render("./users/login", {
						oldData: req.body,
						errors: {
							email: {
								msg: "El email que ingresó no se encuentra registrado"
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