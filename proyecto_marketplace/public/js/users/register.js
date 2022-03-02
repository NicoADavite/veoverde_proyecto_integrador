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
    
    registerForm.addEventListener("submit", (e) => {
        
        e.preventDefault();

        let errores = {};

        if(firstNameInput.value == "" ){
            errores.firsName = "Este campo debe estar completo"
        } else if(firstNameInput.value.length < 2){
            errores.firsName = "El nombre debe tener al menos 2 caracteres"
        }

        if(lastNameInput.value == ""){
            errores.lastName = "Este campo debe estar completo"
        } else if(){
            
        }


    })

})