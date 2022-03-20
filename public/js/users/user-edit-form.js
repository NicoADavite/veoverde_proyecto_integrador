window.addEventListener("load", () => {

    // edit-user-form
    const editUserForm = document.querySelector(".edit-user-form")

    // Inputs 
    const firstNameInput = document.querySelector("#firstName");
    const lastNameInput = document.querySelector("#lastName");
    const emailInput = document.querySelector("#email");
    const oldPasswordInput = document.querySelector("#oldPassword");
    const newPasswordInput = document.querySelector("#newPassword");
    const newPasswordRepeatInput = document.querySelector("#newPasswordRepeat");
    const imageInput = document.querySelector("#image-file-input");

    // Divs de errores del front
    const erroresFirstName = document.querySelector("#errores-firstName");
    const erroresLastName = document.querySelector("#errores-lastName");
    const erroresEmail = document.querySelector("#errores-email");
    const erroresOldPassword = document.querySelector("#errores-oldPassword");
    const erroresNewPassword = document.querySelector("#errores-newPassword");
    const erroresNewPasswordRepeat = document.querySelector("#errores-newPasswordRepeat");
    const erroresImage = document.querySelector("#errores-image");


    // submit-button
    const submitButton = document.querySelector(".submit-button");

    // Elementos relacionados a las passwords
    const showPasswordButton = document.querySelector(".show-password-button");
    const passwordsDiv = document.querySelector(".passwords");
    const passwordCheckbox = document.querySelector(".password-checkbox");
    const passwordInputs = document.querySelectorAll(".password-input");

    // Declaramos las expresiones regulares para la validacion del email y la contraseña
    const emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

    // Variables para manejar la validación de la imagen
    const allowedExtensions = /(.jpg|.jpeg|.png|.gif)$/i;
    const acceptedExtensions = [".jpg", ".jpeg", ".png", ".gif"]

    // Eventos

    // Evento para que desaparezca la imagen precargada cuando se selecciona una imagen nueva
    
    imageInput.addEventListener("change", () => {
        if(imageInput.value != ""){
            document.querySelector(".image-name").innerText = imageInput.files[0].name;
            document.querySelector(".pre-loaded-image").style.display = "none";
        } else {
            document.querySelector(".image-name").innerText = "";
            document.querySelector(".pre-loaded-image").style.display = "block";
        }
    })

    // Evento para mostrar u ocultar las contraseñas
    
    passwordsDiv.style.display = "none";

    showPasswordButton.addEventListener("click", () => {

        if (passwordsDiv.style.display == "none"){
            passwordsDiv.style.display = "flex";
            showPasswordButton.innerHTML = 'Cambiar Contraseña <i class="fas fa-angle-up" aria-hidden="false"></i>'
        } else {
            passwordsDiv.style.display = "none";
            showPasswordButton.innerHTML = 'Cambiar Contraseña <i class="fas fa-angle-down" aria-hidden="true"></i>'
            // showPasswordButton.innerHTML = 
        }

    })

    passwordCheckbox.addEventListener("click",  () => {

        passwordInputs.forEach(passwordInput => {
            let x = passwordInput;
            if (x.type === "password") {
              x.type = "text";
            } else {
              x.type = "password";
            }
        })

    })


    // Validaciones del back end

    editUserForm.addEventListener("submit", (e) => {

        // prevenimos el envio del formulario
        e.preventDefault();

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

        // le agregamos al objeto errores la propiedad oldPassword (cuyo valor será dinamico) si cumple alguna de estas condicones
        if(oldPasswordInput.value != ""){
            if(oldPasswordInput.value.length < 8){
                errores.oldPassword = "La contraseña debe tener al menos 8 caracteres";
            } else if (!(strongRegex.test(oldPasswordInput.value))){
                errores.oldPassword = "La contraseña debe contener al menos una minúscula, una mayúscula, un número y uno de estos carateres especiales !@#$%^&*";
            } else if(newPasswordInput.value == ""){
                errores.oldPassword = "Si deseas cambiar la contraseña debes llenar los siguientes dos campos";
            } else if(newPasswordRepeatInput.value == ""){
                errores.oldPassword = "Si deseas cambiar la contraseña debes llenar los siguientes dos campos";
            }
        }

        // le agregamos al objeto errores la propiedad newPassword (cuyo valor será dinamico) si cumple alguna de estas condicones
        if(newPasswordInput.value != ""){
            if(oldPasswordInput.value == ""){
                errores.oldPassword = "Ingresa la contraseña antigua para poder cambiarla por una nueva";
            }
            if(newPasswordInput.value.length < 8){
                errores.newPassword = "La contraseña debe tener al menos 8 caracteres";
            } else if (!(strongRegex.test(newPasswordInput.value))){
                errores.newPassword = "La contraseña debe contener al menos una minúscula, una mayúscula, un número y uno de estos carateres especiales !@#$%^&*";
            }
            if(newPasswordRepeatInput.value == ""){
                errores.newPasswordRepeat = "Debes repetir la nueva contraseña para poder cambiarla";
            }
        }

        // le agregamos al objeto errores la propiedad newPasswordRepeat (cuyo valor será dinamico) si cumple alguna de estas condicones
        if(newPasswordRepeatInput.value != ""){
            if(oldPasswordInput.value == ""){
                errores.oldPassword = "Ingresa la contraseña antigua para poder cambiarla por una nueva";
            } 
            if(newPasswordInput.value == ""){
                errores.newPassword = "Debes repetir la nueva contraseña para poder cambiarla";
            }
            if(newPasswordRepeatInput.value.length < 8){
                errores.newPasswordRepeat = "La contraseña debe tener al menos 8 caracteres";
            } else if (!(strongRegex.test(newPasswordRepeatInput.value))){
                errores.newPasswordRepeat = "La contraseña debe contener al menos una minúscula, una mayúscula, un número y uno de estos carateres especiales !@#$%^&*";
            } else if(newPasswordRepeatInput.value != newPasswordInput.value){
                errores.newPasswordRepeat = "Las contraseñas no coinciden";
            }
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
            if(errores.oldPassword){
                oldPasswordInput.classList.add("is-invalid");
                erroresOldPassword.innerHTML = errores.oldPassword;
                erroresOldPassword.classList.add("error-invalid"); 
            }
            if(errores.newPassword){
                newPasswordInput.classList.add("is-invalid");
                erroresNewPassword.innerHTML = errores.newPassword;
                erroresNewPassword.classList.add("error-invalid"); 
            }
            if(errores.newPasswordRepeat){
                newPasswordRepeatInput.classList.add("is-invalid");
                erroresNewPasswordRepeat.innerHTML = errores.newPasswordRepeat;
                erroresNewPasswordRepeat.classList.add("error-invalid"); 
            }
            if(errores.image){
                imageInput.classList.add("is-invalid");
                erroresImage.innerHTML = errores.image;
                erroresImage.classList.add("error-invalid"); 
            }
        } else {
            editUserForm.submit();    
        }

    })

})