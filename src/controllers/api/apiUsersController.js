const fs = require('fs');
const { resolve } = require('path');
const path = require("path");

const db = require("../../database/models/index");
const sequelize = db.sequelize;
const Op = db.Sequelize.Op;


const apiUsersController = {

    // metodo para llamar a la api de lista de usuarios
    list: (req, res) => {
    
        db.Users.findAll()
            .then(users => {

                let usersFiltered = users.map(user => {
                    let id = user.id;
                    let fullName =  user.firstName + " " + user.lastName;
                    let email = user.email;

                    let newUser = {
                        id: id,
                        name: fullName,
                        email: email,
                        detail: `https://veoverde.herokuapp.com/api/users/${user.id}`
                    }

                    return newUser
                })
                
                let response = {
                    meta: {
                        status: 200,
                        count: users.length,
                        url: "/api/users"
                    },
                    users: usersFiltered
                }
                res.json(response)
            })
            .catch(err => {
                res.send(err)
            })
    
    },

    // metodo para llamar a la api de detalle de usuario
    detail: (req, res) => {
    
        let id = req.params.id;

        db.Users.findByPk(id)
            .then(user => {

                let newUser = {
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    profile_img: `/images/users/${user.image}`
                }

                let response = {
                    meta: {
                        status: 200,
                        count: user.length,
                        url: "/api/users/:id"
                    },
                    user: newUser
                }
                res.json(response);
            })
            .catch(err => {
                res.send(err)
            })
    
    }

}

module.exports = apiUsersController;
