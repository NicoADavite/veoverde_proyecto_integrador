// Require de Express y Path
//const { application } = require('express');
const express = require('express');
const app = express();
const path = require('path');

const mainRouter = require("./routes/mainRouter")
const usersRouter = require("./routes/usersRouter")
const productsRouter = require("./routes/productsRouter")

app.set("view engine", "ejs")

// Definimos la carpeta public para acceder a los elementos estaticos

app.use(express.static(path.join(__dirname, "../public")));

// lineas de codigo app.get para recibir las distintas views de la página

/* 
app.get("/",(req,res) => {
    res.sendFile(path.resolve(__dirname + "/views/index.html")
)});

app.get("/login",(req,res) => {
    res.sendFile(path.resolve(__dirname + "/views/login.html")
)});

app.get("/productCart",(req,res) => {
    res.sendFile(path.resolve(__dirname + "/views/productCart.html")
)});

app.get("/productDetail",(req,res) => {
    res.sendFile(path.resolve(__dirname + "/views/productDetail.html")
)});

app.get("/register",(req,res) => {
    res.sendFile(path.resolve(__dirname + "/views/register.html")
)});
*/

//rutas
app.use("/", mainRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);

// app.get para levantar el servidor

app.listen(3000, ()=>{
    console.log('Servidor funcionando 3000');
});