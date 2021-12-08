// // ************ Require's ************
const express = require('express');
const path = require('path');
const methodOverride  = require("method-override");

// ************ express() - (don't touch) ************
const app = express(); // Guarda la funcionalidad de express

// ************ Template Engine - (don't touch) ************
app.set('view engine', 'ejs'); // Define a ejs como el motor de plantillas
app.set('views', path.join(__dirname, '/views')); // Define la ubicación de la carpeta de las Vistas


// ************ Middlewares - (don't touch) ************
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "../public"))); // Define la carpeta public para acceder a los elementos estaticos
app.use(methodOverride("_method")) // Define el string a utilizar para acceder a la funcionalidad de methodOverride


// ************ Route System require and use() ************
const mainRouter = require("./routes/mainRouter")
const usersRouter = require("./routes/usersRouter")
const productsRouter = require("./routes/productsRouter")

app.use("/", mainRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);


// ************ app.listen to lift the server ************
app.listen(3000, ()=>{
    console.log('Servidor funcionando 3000');
});