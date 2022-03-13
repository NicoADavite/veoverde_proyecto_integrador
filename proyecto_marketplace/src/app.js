// // ************ Require's ************
const express = require('express');
const path = require('path');
const methodOverride  = require("method-override");
const session = require('express-session');
const cookies = require('cookie-parser');
const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware');

// ************ express() - (don't touch) ************
const app = express(); // Guarda la funcionalidad de express

// ************ Template Engine - (don't touch) ************
app.set('view engine', 'ejs'); // Define a ejs como el motor de plantillas
app.set('views', path.join(__dirname, '/views')); // Define la ubicación de la carpeta de las Vistas


// ************ Middlewares - (don't touch) ************
app.use(session({ secret: "Esto es un secreto",	resave: false, saveUninitialized: false })); //Nos permite utilizar la funcionalidad de express-session en nuestra aplicacion
app.use(cookies()); // Nos permite utilizar la funcionalidad de cookie-parser en nuestra aplicacion
app.use(userLoggedMiddleware); // Nos permite utilizar la funcionalidad de userLoggedMiddleware en nuestra aplicacion
app.use(express.urlencoded({ extended: false })); // Nos permite guardar la información de los formularios como objetos literales 
app.use(express.json()); // Nos permite convertir la información de los formularios de objetos literales a formato JSON, en caso de ser necesario
app.use(express.static(path.join(__dirname, "../public"))); // Define la carpeta public para acceder a los elementos estaticos
app.use(methodOverride("_method")) // Define el string a utilizar para acceder a la funcionalidad de methodOverride


// ************ Route System require and use() ************
const mainRouter = require("./routes/mainRouter"); // Requiere el modulo: mainRouter
const usersRouter = require("./routes/usersRouter"); // Requiere el modulo: usersRouter
const productsRouter = require("./routes/productsRouter"); // Requiere el modulo: productsRouter

const apiProductRouter = require("./routes/api/apiProductsRouter"); // Requiere el modulo: apiProductsRouter

app.use("/", mainRouter); // define al mainRouter como enrutador para todos aquellas solicitudes con el prefijo "/"
app.use("/users", usersRouter); // define al usersRouter como enrutador para todos aquellas solicitudes con el prefijo "/users"
app.use("/products", productsRouter); // define al productsRouter como enrutador para todos aquellas solicitudes con el prefijo "/products"

app.use("/api/products", apiProductRouter); // define al apiProductsRouter como enrutador para todos aquellas solicitudes con el prefijo "/api/products"

// ************ app.listen to lift the server on port 3000 ************
app.listen(3000, ()=>{
    console.log('Servidor funcionando 3000'); //
});