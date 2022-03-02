window.onload(() => {

    // form
    let registerForm = document.querySelector("#register-form");

    // inputs
    let firstNameInput = document.querySelector("#user_firstName");
    let lastNameInput = document.querySelector("#user_lastName");
    let emailInput = document.querySelector("#user_email");
    let passwordInput = document.querySelector("#user_password");
    let rePasswordInput = document.querySelector("#user_password-confirmation");
    let imageInput = document.querySelector("#user_image");

    // div de errores
    let erroresFirstName = document.querySelector("#errores-firstName");
    let erroresLastName = document.querySelector("#errores-lastName");
    let erroresEmail = document.querySelector("#errores-email");
    let erroresPassword = document.querySelector("#errores-password");
    let erroresRePassword = document.querySelector("#errores-rePassword");
    let erroresImage = document.querySelector("#errores-image");


    // boton de envio de form
    let sendFormButton = document.querySelector("#form-submit-button");
    
    registerForm.addEventListener("submit", (event) => {
        
        event.preventDefault();

        let errores = {};

        if(firstNameInput.value == "" ){
            errores.firstName = "Este campo debe estar completo"
        } else if(firstNameInput.value.length < 2){
            errores.firstName = "El nombre debe tener al menos 2 caracteres"
        }

        if(lastNameInput.value == ""){
            errores.lastName = "Este campo debe estar completo"
        } else if(lastNameInput.value.length < 2){
            errores.lastName = "El apellido debe tener al menos 2 caracteres"
        }

        let emailRegex = /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3,4})+$/;
        if(emailInput.value == ""){
            errores.email = "Este campo debe estar completo"
        } else if(!(emailRegex.test(emailInput.value))){
            errores.email = "Debes ingrear un formato de correo valido";
        }

        if(passwordInput.value == ""){
            errores.password = "Este campo debe estar completo"
        } else if(passwordInput.value.length < 8){
            errores.password = "La contraseña debe tener al menos 8 caracteres"
        }

        
        if(rePasswordInput.value == ""){
            errores.rePassword = "Este campo debe estar completo"
        } else if(rePasswordInput.value.length < 8){
            errores.rePassword = "La contraseña debe tener al menos 8 caracteres"
        }

        // la validacion de la imagen te la debo rey

        if(Object.keys(errores).length >= 1){
            erroresFirstName.innerHTML = (errores.firstName) ? errores.firstName : "";
            erroresLastName.innerHTML = (errores.lastName) ? errores.lastName : "";
            erroresEmail.innerHTML = (errores.email) ? errores.email : "";
            erroresPassword.innerHTML = (errores.password) ? errores.password : "";
            erroresRePassword.innerHTML = (errores.rePassword) ? errores.rePassword : "";
        } else {
            registerForm.submit();
    })

})