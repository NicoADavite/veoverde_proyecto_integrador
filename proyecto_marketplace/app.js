// Require de Express y Path
const { application } = require('express');
const express = require('express');
const app = express();
const path = require('path');

app.set("view engine", "ejs")

// Definimos la carpeta public para acceder a los elementos estaticos

app.use(express.static(path.resolve(__dirname, "./public")));

// lineas de codigo app.get para recibir las distintas views de la página

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

// app.get para levantar el servidor

app.listen(3000, ()=>{
    console.log('Servidor funcionando 3000');
});