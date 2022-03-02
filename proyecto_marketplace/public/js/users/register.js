// Usamos el evento load en window para que todas las instrucciones de este archivo js se ejecuten una vez que se renderizó por completo el html

window.addEventListener("load", function() {

    // Probamos la correcta vinculacion del js en el front
    console.log("estoy andando")

    // Guardamos los elementos HTML con los que vamos a interactuar en variables a traves de document.querySelector

    // Form
    let registerForm = document.querySelector("#register-form");

    // Inputs
    let firstNameInput = document.querySelector("#user_firstName");
    let lastNameInput = document.querySelector("#user_lastName");
    let emailInput = document.querySelector("#user_email");
    let passwordInput = document.querySelector("#user_password");
    let rePasswordInput = document.querySelector("#user_password-confirmation");
    let imageInput = document.querySelector("#user_image");

    // Divs de errores
    let erroresFirstName = document.querySelector("#errores-firstName");
    let erroresLastName = document.querySelector("#errores-lastName");
    let erroresEmail = document.querySelector("#errores-email");
    let erroresPassword = document.querySelector("#errores-password");
    let erroresRePassword = document.querySelector("#errores-rePassword");
    let erroresImage = document.querySelector("#errores-image");


    // Botón de envío del form
    let sendFormButton = document.querySelector("#form-submit-button");

    // Declaramos las expresiones regulares
    const emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");


    // DEFINIMOS LAS VALIDACIONES ON-TIME (se muetran a medida que interactuamos con los inputs)

    // Validaciones on-time para el nombre

    firstNameInput.addEventListener("focus", () => {
        if(firstNameInput.value == "" ){
            erroresFirstName.innerHTML = "Este campo debe estar completo"
        }
    })

    firstNameInput.addEventListener("input", () => {
        if(firstNameInput.value == "" ){
            erroresFirstName.innerHTML = "Este campo debe estar completo"
        } else if(firstNameInput.value.length < 2){
            erroresFirstName.innerHTML = "El nombre debe tener al menos 2 caracteres"
        } else {
            erroresFirstName.innerHTML = ""
        }
    })

    // Validaciones on-time para el apellido

    lastNameInput.addEventListener("focus", () => {
        if(lastNameInput.value == "" ){
            erroresLastName.innerHTML = "Este campo debe estar completo"
        }
    })

    lastNameInput.addEventListener("input", () => {
        if(lastNameInput.value == "" ){
            erroresLastName.innerHTML = "Este campo debe estar completo"
        } else if(lastNameInput.value.length < 2){
            erroresLastName.innerHTML = "El apellido debe tener al menos 2 caracteres"
        } else {
            erroresLastName.innerHTML = ""
        }
    })

    // Validaciones on-time para el email

    emailInput.addEventListener("focus", () => {
        if(emailInput.value == "" ){
            erroresEmail.innerHTML = "Este campo debe estar completo"
        }
    })

    emailInput.addEventListener("input", () => {
        if(emailInput.value == "" ){
            erroresEmail.innerHTML = "Este campo debe estar completo"
        } else if(!(emailRegex.test(emailInput.value))){
            erroresEmail.innerHTML = "Debes ingrear un formato de correo valido"
        } else {
            erroresEmail.innerHTML = ""
        }
    })

    // Validaciones on-time para la contraseña
    passwordInput.addEventListener("focus", () => {
        if(passwordInput.value == "" ){
            erroresPassword.innerHTML = "Este campo debe estar completo"
        }
    })

    passwordInput.addEventListener("input", () => {
        if(passwordInput.value == "" ){
            erroresPassword.innerHTML = "Este campo debe estar completo"
        } else if(passwordInput.value.length < 8){
            erroresPassword.innerHTML = "La contraseña debe tener al menos 8 caracteres"
        } else if(!(strongRegex.test(passwordInput.value))){
            erroresPassword.innerHTML = "La contraseña debe contener al menos una minúscula, una mayúscula, un número y uno de estos carateres especiales !@#$%^&*"
        } else {
            erroresPassword.innerHTML = ""
        }
    })

    // Validaciones on-time para la confirmacion de la contraseña
    rePasswordInput.addEventListener("focus", () => {
        if(rePasswordInput.value == "" ){
            erroresRePassword.innerHTML = "Este campo debe estar completo"
        }
    })
    
    rePasswordInput.addEventListener("input", () => {
        if(rePasswordInput.value == "" ){
            erroresRePassword.innerHTML = "Este campo debe estar completo"
        } else if(rePasswordInput.value.length < 8){
            erroresRePassword.innerHTML = "La contraseña debe tener al menos 8 caracteres"
        } else if(!(strongRegex.test(rePasswordInput.value))){
            erroresRePassword.innerHTML = "La contraseña debe contener al menos una minúscula, una mayúscula, un número y uno de estos carateres especiales !@#$%^&*"
        } else {
            erroresRePassword.innerHTML = ""
        }
    })


    // VALIDACIONES OFF-TIME (Se muestran una vez que se intente enviar el formulario)
    
    registerForm.addEventListener("submit", (event) => {

        // prevenimos el envio del formulario
        event.preventDefault();

        // creamos un objeto vacio llamado errores
        let errores = {};

        // le agregamos al objeto errores la propiedad firstName (cuyo valor será dinamico) si cumple alguna de estas condicones
        if(firstNameInput.value == "" ){
            errores.firstName = "Este campo debe estar completo"
        } else if(firstNameInput.value.length < 2){
            errores.firstName = "El nombre debe tener al menos 2 caracteres"
        }

        // le agregamos al objeto errores la propiedad lastName (cuyo valor será dinamico) si cumple alguna de estas condicones
        if(lastNameInput.value == ""){
            errores.lastName = "Este campo debe estar completo"
        } else if(lastNameInput.value.length < 2){
            errores.lastName = "El apellido debe tener al menos 2 caracteres"
        }

        // le agregamos al objeto errores la propiedad email (cuyo valor será dinamico) si cumple alguna de estas condicones
        if(emailInput.value == ""){
            errores.email = "Este campo debe estar completo"
        } else if(!(emailRegex.test(emailInput.value))){
            errores.email = "Debes ingrear un formato de correo valido";
        }

        // le agregamos al objeto errores la propiedad password (cuyo valor será dinamico) si cumple alguna de estas condicones
        if(passwordInput.value == ""){
            errores.password = "Este campo debe estar completo"
        } else if(passwordInput.value.length < 8){
            errores.password = "La contraseña debe tener al menos 8 caracteres"
        } else if (!(strongRegex.test(passwordInput.value))){
            errores.password = "La contraseña debe contener al menos una minúscula, una mayúscula, un número y uno de estos carateres especiales !@#$%^&*";
        }

        // le agregamos al objeto errores la propiedad rePassword (cuyo valor será dinamico) si cumple alguna de estas condicones
        if(rePasswordInput.value == ""){
            errores.rePassword = "Este campo debe estar completo"
        } else if(rePasswordInput.value.length < 8){
            errores.rePassword = "La contraseña debe tener al menos 8 caracteres"
        } else if (!(strongRegex.test(rePasswordInput.value))){
            errores.rePassword = "La contraseña debe contener al menos una minúscula, una mayúscula, un número y uno de estos carateres especiales !@#$%^&*";
        }

        // la validacion de la imagen te la debo rey

        // Preguntamos si el objeto errores tiene una o mas propiedas: Si es true, agregaremos los errores correspondientes a cada campo / Si es false se envia el formulario al back-end 
        if(Object.keys(errores).length >= 1){
            erroresFirstName.innerHTML = (errores.firstName) ? errores.firstName : "";
            erroresLastName.innerHTML = (errores.lastName) ? errores.lastName : "";
            erroresEmail.innerHTML = (errores.email) ? errores.email : "";
            erroresPassword.innerHTML = (errores.password) ? errores.password : "";
            erroresRePassword.innerHTML = (errores.rePassword) ? errores.rePassword : "";
        } else {
            registerForm.submit();
    
        }   
     })

})