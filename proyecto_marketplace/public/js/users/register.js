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

    // Divs de errores del front
    let erroresFirstName = document.querySelector("#errores-firstName");
    let erroresLastName = document.querySelector("#errores-lastName");
    let erroresEmail = document.querySelector("#errores-email");
    let erroresPassword = document.querySelector("#errores-password");
    let erroresRePassword = document.querySelector("#errores-rePassword");
    let erroresImage = document.querySelector("#errores-image");

    // Botón de envío del form
    let sendFormButton = document.querySelector("#form-submit-button");

    // Declaramos las expresiones regulares para la validacion del email y la contraseña
    const emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

    // Variables para manejar la validación de la imagen
    let allowedExtensions = /(.jpg|.jpeg|.png|.gif)$/i;
    let acceptedExtensions = [".jpg", ".jpeg", ".png", ".gif"]

    // DEFINIMOS LAS VALIDACIONES ON-TIME (se muetran a medida que interactuamos con los inputs)

    // Validaciones on-time para el nombre

    firstNameInput.addEventListener("focus", () => {

        if(document.querySelector("#error-back-firstName")){
            document.querySelector("#error-back-firstName").style.display = "none"
        }

        if(firstNameInput.value == "" ){
            firstNameInput.classList.remove("is-valid");
            firstNameInput.classList.add("is-invalid");

            erroresFirstName.innerHTML = "Este campo debe estar completo";
            erroresFirstName.classList.add("error-invalid");            
        }
    })

    firstNameInput.addEventListener("input", () => {
        if(firstNameInput.value == "" ){
            firstNameInput.classList.remove("is-valid");
            firstNameInput.classList.add("is-invalid");

            erroresFirstName.innerHTML = "Este campo debe estar completo";
            erroresFirstName.classList.add("error-invalid"); 
            
        } else if(firstNameInput.value.length < 2){
            firstNameInput.classList.remove("is-valid");
            firstNameInput.classList.add("is-invalid");

            erroresFirstName.innerHTML = "El nombre debe tener al menos 2 caracteres";
            erroresFirstName.classList.add("error-invalid"); 

        } else {
            firstNameInput.classList.remove("is-invalid");
            firstNameInput.classList.add("is-valid");

            erroresFirstName.innerHTML = "";
            erroresFirstName.classList.remove("error-invalid");

        }
    })

    // Validaciones on-time para el apellido

    lastNameInput.addEventListener("focus", () => {

        if(document.querySelector("#error-back-lastName")){
            document.querySelector("#error-back-lastName").style.display = "none"
        } 

        if(lastNameInput.value == "" ){
            lastNameInput.classList.remove("is-valid");
            lastNameInput.classList.add("is-invalid");

            erroresLastName.innerHTML = "Este campo debe estar completo";
            erroresLastName.classList.add("error-invalid");
        }
    })

    lastNameInput.addEventListener("input", () => {
        if(lastNameInput.value == "" ){
            lastNameInput.classList.remove("is-valid");
            lastNameInput.classList.add("is-invalid");

            erroresLastName.innerHTML = "Este campo debe estar completo";
            erroresLastName.classList.add("error-invalid");
        } else if(lastNameInput.value.length < 2){
            lastNameInput.classList.remove("is-valid");
            lastNameInput.classList.add("is-invalid");

            erroresLastName.innerHTML = "El apellido debe tener al menos 2 caracteres";
            erroresLastName.classList.add("error-invalid");
        } else {
            lastNameInput.classList.remove("is-invalid");
            lastNameInput.classList.add("is-valid");

            erroresLastName.innerHTML = "";
            erroresLastName.classList.remove("error-invalid");
        }
    })

    // Validaciones on-time para el email

    emailInput.addEventListener("focus", () => {

        if(document.querySelector("#error-back-email")){
            document.querySelector("#error-back-email").style.display = "none"
        } 

        if(emailInput.value == "" ){
            emailInput.classList.remove("is-valid");
            emailInput.classList.add("is-invalid");

            erroresEmail.innerHTML = "Este campo debe estar completo";
            erroresEmail.classList.add("error-invalid");
        }
    })

    emailInput.addEventListener("input", () => {
        if(emailInput.value == "" ){
            emailInput.classList.remove("is-valid");
            emailInput.classList.add("is-invalid");

            erroresEmail.innerHTML = "Este campo debe estar completo";
            erroresEmail.classList.add("error-invalid");
        } else if(!(emailRegex.test(emailInput.value))){
            emailInput.classList.remove("is-valid");
            emailInput.classList.add("is-invalid");

            erroresEmail.innerHTML = "Debes ingrear un formato de correo valido";
            erroresEmail.classList.add("error-invalid");
        } else {
            emailInput.classList.remove("is-invalid");
            emailInput.classList.add("is-valid");

            erroresEmail.innerHTML = "";
            erroresEmail.classList.remove("error-invalid");
        }
    })

    // Validaciones on-time para la contraseña
    passwordInput.addEventListener("focus", () => {

        if(document.querySelector("#error-back-password")){
            document.querySelector("#error-back-password").style.display = "none"
        } 

        if(passwordInput.value == "" ){
            passwordInput.classList.remove("is-valid");
            passwordInput.classList.add("is-invalid");

            erroresPassword.innerHTML = "Este campo debe estar completo";            
            erroresPassword.classList.add("error-invalid");
        }
    })

    passwordInput.addEventListener("input", () => {
        if(passwordInput.value == "" ){            
            passwordInput.classList.remove("is-valid");
            passwordInput.classList.add("is-invalid");

            erroresPassword.innerHTML = "Este campo debe estar completo";            
            erroresPassword.classList.add("error-invalid");
        } else if(passwordInput.value.length < 8){            
            passwordInput.classList.remove("is-valid");
            passwordInput.classList.add("is-invalid");

            erroresPassword.innerHTML = "La contraseña debe tener al menos 8 caracteres";            
            erroresPassword.classList.add("error-invalid");
        } else if(!(strongRegex.test(passwordInput.value))){            
            passwordInput.classList.remove("is-valid");
            passwordInput.classList.add("is-invalid");

            erroresPassword.innerHTML = "La contraseña debe contener al menos una minúscula, una mayúscula, un número y uno de estos carateres especiales !@#$%^&*";
            erroresPassword.classList.add("error-invalid");
        } else if(passwordInput.value != rePasswordInput.value){
            passwordInput.classList.remove("is-invalid");
            passwordInput.classList.add("is-valid");
            erroresPassword.innerHTML = "";            
            erroresPassword.classList.remove("error-invalid");

            rePasswordInput.classList.remove("is-valid");
            rePasswordInput.classList.add("is-invalid");
            erroresRePassword.innerHTML = "Las contraseñas no coinciden";            
            erroresRePassword.classList.add("error-invalid");
        } else if(passwordInput.value == rePasswordInput.value){
            passwordInput.classList.remove("is-invalid");
            passwordInput.classList.add("is-valid");
            erroresPassword.innerHTML = "";            
            erroresPassword.classList.remove("error-invalid");

            rePasswordInput.classList.remove("is-invalid");
            rePasswordInput.classList.add("is-valid");
            erroresRePassword.innerHTML = "";            
            erroresRePassword.classList.remove("error-invalid");
        } else {            
            passwordInput.classList.remove("is-invalid");
            passwordInput.classList.add("is-valid");

            erroresPassword.innerHTML = "";            
            erroresPassword.classList.remove("error-invalid");
        }
    })

    // Validaciones on-time para la confirmacion de la contraseña
    rePasswordInput.addEventListener("focus", () => {

        if(document.querySelector("#error-back-repassword")){
            document.querySelector("#error-back-repassword").style.display = "none"
        } 
        
        if(rePasswordInput.value == "" ){
            
            rePasswordInput.classList.remove("is-valid");
            rePasswordInput.classList.add("is-invalid");

            erroresRePassword.innerHTML = "Este campo debe estar completo";
            erroresRePassword.classList.add("error-invalid");
        }
    })
    
    rePasswordInput.addEventListener("input", () => {
        if(rePasswordInput.value == "" ){                        
            rePasswordInput.classList.remove("is-valid");
            rePasswordInput.classList.add("is-invalid");

            erroresRePassword.innerHTML = "Este campo debe estar completo";
            erroresRePassword.classList.add("error-invalid");            
        } else if(rePasswordInput.value.length < 8){                                    
            rePasswordInput.classList.remove("is-valid");
            rePasswordInput.classList.add("is-invalid");

            erroresRePassword.innerHTML = "La contraseña debe tener al menos 8 caracteres";            
            erroresRePassword.classList.add("error-invalid"); 
        } else if(!(strongRegex.test(rePasswordInput.value))){                                                
            rePasswordInput.classList.remove("is-valid");
            rePasswordInput.classList.add("is-invalid");

            erroresRePassword.innerHTML = "La contraseña debe contener al menos una minúscula, una mayúscula, un número y uno de estos carateres especiales !@#$%^&*";
            erroresRePassword.classList.add("error-invalid"); 
        } else if(rePasswordInput.value != passwordInput.value){
            rePasswordInput.classList.remove("is-valid");
            rePasswordInput.classList.add("is-invalid");

            erroresRePassword.innerHTML = "Las contraseñas no coinciden";            
            erroresRePassword.classList.add("error-invalid");
        } else {                                                
            rePasswordInput.classList.remove("is-invalid");
            rePasswordInput.classList.add("is-valid");

            erroresRePassword.innerHTML = "";
            erroresRePassword.classList.remove("error-invalid");          
        }
    })

    // Validaciones on-time para la confirmacion de la imagen
    imageInput.addEventListener("change", () => {
        if(document.querySelector("#error-back-repassword")){
            document.querySelector("#error-back-repassword").style.display = "none"
        }

        if(imageInput.value != ""){
            if(!allowedExtensions.exec(imageInput.value)){
                imageInput.classList.remove("is-valid");
                imageInput.classList.add("is-invalid");

                erroresImage.innerHTML = `Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`;            
                erroresImage.classList.add("error-invalid");
            } else {
                imageInput.classList.remove("is-invalid");
                imageInput.classList.add("is-valid");
    
                erroresImage.innerHTML = "";
                erroresImage.classList.remove("error-invalid");
            }
        } else {
            imageInput.classList.remove("is-invalid");
            imageInput.classList.add("is-valid");

            erroresImage.innerHTML = "";
            erroresImage.classList.remove("error-invalid");  
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
        } else if(rePasswordInput.value != passwordInput.value){
            errores.rePassword = "Las contraseñas no coinciden";
        }

        // le agregamos al objeto errores la propiedad image (cuyo valor será dinamico) si cumple alguna de estas condicones
        if(imageInput.value != ""){
            if(!allowedExtensions.exec(imageInput.value)){
                errores.image = `Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`;
            }
        }


        // Preguntamos si el objeto errores tiene una o mas propiedas: Si es true, agregaremos los errores y estilos correspondientes a cada campo / Si es false se envia el formulario al back-end 
        if(Object.keys(errores).length >= 1){
            if(errores.firstName){
                firstNameInput.classList.add("is-invalid");
                erroresFirstName.innerHTML = errores.firstName;
                erroresFirstName.classList.add("error-invalid");                
            }
            if(errores.lastName){
                lastNameInput.classList.add("is-invalid");
                erroresLastName.innerHTML = errores.lastName;
                erroresLastName.classList.add("error-invalid"); 
            }
            if(errores.email){
                emailInput.classList.add("is-invalid");
                erroresEmail.innerHTML = errores.email;
                erroresEmail.classList.add("error-invalid"); 
            }
            if(errores.password){
                passwordInput.classList.add("is-invalid");
                erroresPassword.innerHTML = errores.password;
                erroresPassword.classList.add("error-invalid"); 
            }
            if(errores.rePassword){
                rePasswordInput.classList.add("is-invalid");
                erroresRePassword.innerHTML = errores.rePassword;
                erroresRePassword.classList.add("error-invalid"); 
            }
            if(errores.image){
                imageInput.classList.add("is-invalid");
                erroresImage.innerHTML = errores.image;
                erroresImage.classList.add("error-invalid"); 
            }
        } else {
            registerForm.submit();    
        }   
    })

})
