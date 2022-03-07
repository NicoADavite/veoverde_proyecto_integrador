// Usamos el evento load en window para que todas las instrucciones de este archivo js se ejecuten una vez que se renderizó por completo el html
window.addEventListener("load", () => {

    // Probamos la correcta vinculacion del js en el front
    console.log("estoy andando")

    // Guardamos los elementos HTML con los que vamos a interactuar en variables a traves de document.querySelector

    // Form
    let loginForm = document.querySelector("#login-form");
    
    // Inputs
    let emailInput = document.querySelector("#user-email");
    let passwordInput = document.querySelector("#user-password");

    // Divs de errores del front
    let erroresEmail = document.querySelector("#errores-email");
    let erroresPassword = document.querySelector("#errores-password");

     // Divs de errores del back
    let errorBackEmail = document.querySelector("#error-back-email");
    let errorBackPassword = document.querySelector("#error-back-password");

    // Botón de envío del form
    let sendFormButton = document.querySelector("#form-submit-button");

    // Declaramos las expresiones regulares para la validacion del email y la contraseña
    const emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");



    // DEFINIMOS LAS VALIDACIONES ON-TIME (se muetran a medida que interactuamos con los inputs)

    // Validaciones on-time para el email

    if(errorBackEmail){
        emailInput.classList.add("is-invalid");
    }

    emailInput.addEventListener("focus", () => {

        if(errorBackEmail){
            errorBackEmail.style.display = "none"
        }

        if(emailInput.value == ""){
            emailInput.classList.remove("is-valid");
            emailInput.classList.add("is-invalid");

            erroresEmail.classList.add("error-invalid");
            erroresEmail.innerHTML = "Este campo debe estar completo";
        } else {
            if((emailRegex.test(emailInput.value))){
                emailInput.classList.remove("is-invalid");
                emailInput.classList.add("is-valid");
            }            
        }

    })

    emailInput.addEventListener("input", () => {

        if(emailInput.value == ""){
            emailInput.classList.remove("is-valid");
            emailInput.classList.add("is-invalid");

            erroresEmail.classList.add("error-invalid");
            erroresEmail.innerHTML = "Este campo debe estar completo";
        } else if(!(emailRegex.test(emailInput.value))){
            emailInput.classList.remove("is-valid");
            emailInput.classList.add("is-invalid");

            erroresEmail.classList.add("error-invalid");
            erroresEmail.innerHTML = "Debes ingrear un formato de correo valido";
        } else{
            emailInput.classList.remove("is-invalid");
            emailInput.classList.add("is-valid");

            erroresEmail.classList.remove("error-invalid");
            erroresEmail.innerHTML = "";
        }

    })

    // Validaciones on-time para la contraseña

    if(errorBackPassword){
        passwordInput.classList.add("is-invalid");
    }

    passwordInput.addEventListener("focus", () => {

        if(errorBackPassword){
            errorBackPassword.style.display = "none"
        }

        if(passwordInput.value == ""){
            passwordInput.classList.remove("is-valid");
            passwordInput.classList.add("is-invalid");

            erroresPassword.classList.add("error-invalid");
            erroresPassword.innerHTML = "Este campo debe estar completo";
        } 

    })

    passwordInput.addEventListener("input", () => {

        if(passwordInput.value == ""){
            passwordInput.classList.remove("is-valid");
            passwordInput.classList.add("is-invalid");

            erroresPassword.classList.add("error-invalid");
            erroresPassword.innerHTML = "Este campo debe estar completo";
        } else if(passwordInput.value.length < 8){
            passwordInput.classList.remove("is-valid");
            passwordInput.classList.add("is-invalid");

            erroresPassword.classList.add("error-invalid");
            erroresPassword.innerHTML = "La contraseña debe tener al menos 8 caracteres";
        } else if(!(strongRegex.test(passwordInput.value))){
            passwordInput.classList.remove("is-valid");
            passwordInput.classList.add("is-invalid");

            erroresPassword.classList.add("error-invalid");
            erroresPassword.innerHTML = "La contraseña debe contener al menos una minúscula, una mayúscula, un número y uno de estos carateres especiales !@#$%^&*";
        } else {
            passwordInput.classList.remove("is-invalid");
            passwordInput.classList.add("is-valid");

            erroresPassword.classList.remove("error-invalid");
            erroresPassword.innerHTML = "";
        }
    })

    // VALIDACIONES OFF-TIME (Se muestran una vez que se intente enviar el formulario)

    loginForm.addEventListener("submit", (event) => {

        // prevenimos el envio del formulario
        event.preventDefault();

        // creamos un objeto vacio llamado errores
        let errores = {};

        // le agregamos al objeto errores la propiedad email (cuyo valor será dinamico) si cumple alguna de estas condicones
        if(emailInput.value == ""){
            errores.email = "Este campo debe estar completo";
        } else if(!(emailRegex.test(emailInput.value))){
            errores.email = "Debes ingrear un formato de correo valido";
        }

        // le agregamos al objeto errores la propiedad password (cuyo valor será dinamico) si cumple alguna de estas condicones
        if(passwordInput.value == ""){
            errores.password = "Este campo debe estar completo";
        } else if(passwordInput.value.length < 8){
            errores.password = "La contraseña debe tener al menos 8 caracteres";
        } else if (!(strongRegex.test(passwordInput.value))){
            errores.password = "La contraseña debe contener al menos una minúscula, una mayúscula, un número y uno de estos carateres especiales !@#$%^&*";
        }


        // Preguntamos si el objeto errores tiene una o mas propiedas: Si es true, agregaremos los errores y estilos correspondientes a cada campo / Si es false se envia el formulario al back-end 
        if(Object.keys(errores).length >= 1){

            if(errores.email){
                emailInput.classList.add("is-invalid");
                erroresEmail.innerHTML = errores.email;
                erroresEmail.classList.add("error-invalid"); 
            } else{
                emailInput.classList.remove("is-invalid");
                emailInput.classList.add("is-valid");
                erroresEmail.innerHTML = "";
                erroresEmail.classList.remove("error-invalid"); 
            }

            if(errores.password){
                passwordInput.classList.add("is-invalid");
                erroresPassword.innerHTML = errores.password;
                erroresPassword.classList.add("error-invalid"); 
            } else{
                passwordInput.classList.remove("is-invalid");
                passwordInput.classList.add("is-valid");
                erroresPassword.innerHTML = "";
                erroresPassword.classList.remove("error-invalid"); 
            }

        } else {
            loginForm.submit();    
        }   
    })
})