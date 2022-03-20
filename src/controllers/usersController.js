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
	},

	edit: (req, res) => {

		let user = req.session.userLogged;

		res.render("./users/user-edit-form", { user })

		// let id = req.params.id;

		// db.Users.findByPK(id)
		// 	.then(user => {
		// 		res.render("./users/edit-user-form", { user })
		// 	})
	},

	update: (req, res) => {
		 
		let usuario = req.session.userLogged;

		let id = usuario.id;

        let errores = validationResult(req);

		if (errores.errors.length > 0) {

			delete usuario.password;

            return res.render('./users/user-edit-form', {
				user: usuario,
                errors: errores.mapped(),
                oldData: req.body
            })            

		} else {

			db.Users.findByPk(id)
				.then(user => {
	
					let img;
	
					if(req.file != undefined){
						img = req.file.filename;
					} else {
						if(user.image){
							img = user.image;
						} else {
							img = 'default-user-image.png';
						}			
					};
	
					let password;

					console.log(req.body.oldPassword.length);
	
					if(req.body.oldPassword.length > 0){

						let checkPassword = bcryptjs.compareSync(req.body.oldPassword, user.password);

						if(checkPassword){

							password = bcryptjs.hashSync(req.body.newPassword, 10);

						} else {
							
							return res.render("./users/user-edit-form", {
								oldData: req.body,
								errors: {
									oldPassword: {
										msg: "La contraseña antigua que ingresó no es la correcta, pruebe nuevamente"
									}
								}
							})
						}

					} else{
						password = user.password;
					}
	
					let category_id;
	
					if(user.category_id == 2){ 
						category_id = 2;
					}else{
						category_id = 1;	
					}
	
					db.Users.update({
						firstName: req.body.firstName,
						lastName: req.body.lastName,
						email: req.body.email,
						password: password,
						image: img,
						category_id: category_id
					},{
						where: {
							id: id
						}
					})
						.then(result => {
							db.Users.findByPk(id)
								.then(user => {
									req.session.userLogged = user;
									res.redirect("/users/profile")
								})
						})
						.catch(err => {
							res.send(err)
						}); 
	
	
				})
				.catch(err => {
					res.send(err)
				}); 


		}

	}
};

module.exports = usersController;