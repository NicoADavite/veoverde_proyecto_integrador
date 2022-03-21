// Usamos el evento load en window para que todas las instrucciones de este archivo js se ejecuten una vez que se renderizó por completo el html
window.addEventListener("load", () => {

    // Probamos la correcta vinculacion del js en el front
    console.log("estoy andando")

    // Guardamos los elementos HTML con los que vamos a interactuar en variables a traves de document.querySelector

    // Form
    let createProductForm = document.querySelector("#create-product-form");
    
    // Inputs
    let nameInput = document.querySelector("#name");
    let descriptionInput = document.querySelector("#description");
    let imageInput = document.querySelector("#image");
    let categoryInput = document.querySelector("#category");
    let priceInput = document.querySelector("#price");

    // h3 de la imagen
    let imageTitle = document.querySelector("#image-title")

    // Divs de errores del front
    let erroresName = document.querySelector("#errores-name");
    let erroresDescription = document.querySelector("#errores-description");
    let erroresImage = document.querySelector("#errores-image");
    let erroresCategory = document.querySelector("#errores-category");
    let erroresPrice = document.querySelector("#errores-price");

     // Divs de errores del back
    let errorBackName = document.querySelector("#error-back-name");
    let errorBackDescription = document.querySelector("#error-back-description");
    let errorBackImage = document.querySelector("#error-back-image");
    let errorBackCategory = document.querySelector("#error-back-category");
    let errorBackPrice = document.querySelector("#error-back-price");

    // Botón de envío del form
    let sendFormButton = document.querySelector("#form-submit-button");

    // Variables para manejar la validación de la imagen
    let allowedExtensions = /(.jpg|.jpeg|.png|.gif)$/i;
    let acceptedExtensions = [".jpg", ".jpeg", ".png", ".gif"]
    

    // DEFINIMOS LAS VALIDACIONES ON-TIME (se muetran a medida que interactuamos con los inputs)

    // Validaciones on-time para el Nombre del Producto
    if(errorBackName){
        nameInput.classList.add("is-invalid");
    }

    nameInput.addEventListener("focus", () => {

        if(errorBackName){
            errorBackName.style.display = "none";
        }

        if(nameInput.value == ""){
            nameInput.classList.remove("is-valid");
            nameInput.classList.add("is-invalid");

            erroresName.classList.add("error-invalid");
            erroresName.innerHTML = "Este campo debe estar completo";
        } else if(nameInput.value.length < 5){
            nameInput.classList.remove("is-valid");
            nameInput.classList.add("is-invalid");

            erroresName.classList.add("error-invalid");
            erroresName.innerHTML = "El nombre debe tener al menos 5 caracteres";
        } else {
            nameInput.classList.remove("is-invalid");
            nameInput.classList.add("is-valid");
        }

    })

    nameInput.addEventListener("input", () => {

        if(nameInput.value == ""){
            nameInput.classList.remove("is-valid");
            nameInput.classList.add("is-invalid");

            erroresName.classList.add("error-invalid");
            erroresName.innerHTML = "Este campo debe estar completo";
        } else if(nameInput.value.length < 5){
            nameInput.classList.remove("is-valid");
            nameInput.classList.add("is-invalid");

            erroresName.classList.add("error-invalid");
            erroresName.innerHTML = "El nombre debe tener al menos 5 caracteres";
        } else{
            nameInput.classList.remove("is-invalid");
            nameInput.classList.add("is-valid");

            erroresName.classList.remove("error-invalid");
            erroresName.innerHTML = "";
        }

    })

    // Validaciones on-time para la descripcion

    if(errorBackDescription){
        descriptionInput.classList.add("is-invalid");
    }

    descriptionInput.addEventListener("focus", () => {

        if(errorBackDescription){
            errorBackDescription.style.display = "none";
        }

        if(descriptionInput.value == ""){
            descriptionInput.classList.remove("is-valid");
            descriptionInput.classList.add("is-invalid");

            erroresDescription.classList.add("error-invalid");
            erroresDescription.innerHTML = "Este campo debe estar completo";
        } 

    })

    descriptionInput.addEventListener("input", () => {

        if(descriptionInput.value == ""){
            descriptionInput.classList.remove("is-valid");
            descriptionInput.classList.add("is-invalid");

            erroresDescription.classList.add("error-invalid");
            erroresDescription.innerHTML = "Este campo debe estar completo";
        } else if(descriptionInput.value.length < 20){
            descriptionInput.classList.remove("is-valid");
            descriptionInput.classList.add("is-invalid");

            erroresDescription.classList.add("error-invalid");
            erroresDescription.innerHTML = "La descripción debe tener al menos 20 caracteres";
        } else {
            descriptionInput.classList.remove("is-invalid");
            descriptionInput.classList.add("is-valid");

            erroresDescription.classList.remove("error-invalid");
            erroresDescription.innerHTML = "";
        }
    })


    // Validaciones on-time para la imagen
    imageInput.addEventListener("change", () => {

        if(imageInput.value != ""){
            imageTitle.innerText = imageInput.files[0].name;
        } else {
            imageTitle.innerText = "";
        }

        if(errorBackImage){
            errorBackImage.style.display = "none"
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

    // Validaciones on-time para la categoria

    if(errorBackCategory){
        categoryInput.classList.add("is-invalid");
    }

    categoryInput.addEventListener("focus", () => {

        if(errorBackCategory){
            errorBackCategory.style.display = "none";
        }

        if(categoryInput.value == ""){
            categoryInput.classList.remove("is-valid");
            categoryInput.classList.add("is-invalid");

            erroresCategory.classList.add("error-invalid");
            erroresCategory.innerHTML = "Este campo debe estar completo";
        } 

    })

    categoryInput.addEventListener("input", () => {

        if(categoryInput.value == ""){
            categoryInput.classList.remove("is-valid");
            categoryInput.classList.add("is-invalid");

            erroresCategory.classList.add("error-invalid");
            erroresCategory.innerHTML = "Este campo debe estar completo";
        } else {
            categoryInput.classList.remove("is-invalid");
            categoryInput.classList.add("is-valid");

            erroresCategory.classList.remove("error-invalid");
            erroresCategory.innerHTML = "";
        }
    })


    // Validaciones on-time para el precio

    if(errorBackPrice){
        priceInput.classList.add("is-invalid");
    }

    priceInput.addEventListener("focus", () => {

        if(errorBackPrice){
            errorBackPrice.style.display = "none";
        }

        if(priceInput.value == ""){
            priceInput.classList.remove("is-valid");
            priceInput.classList.add("is-invalid");

            erroresPrice.classList.add("error-invalid");
            erroresPrice.innerHTML = "Este campo debe estar completo";
        } 

    })

    priceInput.addEventListener("input", () => {

        if(priceInput.value == ""){
            priceInput.classList.remove("is-valid");
            priceInput.classList.add("is-invalid");

            erroresPrice.classList.add("error-invalid");
            erroresPrice.innerHTML = "Este campo debe estar completo";
        } else {
            priceInput.classList.remove("is-invalid");
            priceInput.classList.add("is-valid");

            erroresPrice.classList.remove("error-invalid");
            erroresPrice.innerHTML = "";
        }
    })


    // VALIDACIONES OFF-TIME (Se muestran una vez que se intente enviar el formulario)

    createProductForm.addEventListener("submit", (event) => {

        // prevenimos el envio del formulario
        event.preventDefault();

        // creamos un objeto vacio llamado errores
        let errores = {};

        // le agregamos al objeto errores la propiedad name (cuyo valor será dinamico) si cumple alguna de estas condicones
        if(nameInput.value == ""){
            errores.name = "Este campo debe estar completo";
        } else if(nameInput.value.length < 5){
            errores.name = "El nombre debe tener al menos 5 caracteres";
        }

         // le agregamos al objeto errores la propiedad description (cuyo valor será dinamico) si cumple alguna de estas condicones
         if(descriptionInput.value == ""){
            errores.description = "Este campo debe estar completo";
        } else if(descriptionInput.value.length < 20){
            errores.description = "La descripción debe tener al menos 20 caracteres";
        }

        // le agregamos al objeto errores la propiedad image (cuyo valor será dinamico) si cumple alguna de estas condicones
        if(imageInput.value != ""){
            if(!allowedExtensions.exec(imageInput.value)){
                errores.image = `Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`;
            }
        }

        // le agregamos al objeto errores la propiedad category (cuyo valor será dinamico) si cumple alguna de estas condicones
        if(categoryInput.value == ""){
            errores.category = "Debes seleccionar una opción";
        }

        // le agregamos al objeto errores la propiedad price (cuyo valor será dinamico) si cumple alguna de estas condicones
        if(priceInput.value == ""){
            errores.price = "Este campo debe estar completo";
        }

        // Preguntamos si el objeto errores tiene una o mas propiedas: Si es true, agregaremos los errores y estilos correspondientes a cada campo / Si es false se envia el formulario al back-end 
        if(Object.keys(errores).length >= 1){

            if(errores.name){
                nameInput.classList.add("is-invalid");
                erroresName.innerHTML = errores.name;
                erroresName.classList.add("error-invalid"); 
            } else{
                nameInput.classList.remove("is-invalid");
                nameInput.classList.add("is-valid");
                erroresName.innerHTML = "";
                erroresName.classList.remove("error-invalid"); 
            }

            if(errores.description){
                descriptionInput.classList.add("is-invalid");
                erroresDescription.innerHTML = errores.description;
                erroresDescription.classList.add("error-invalid"); 
            } else{
                descriptionInput.classList.remove("is-invalid");
                descriptionInput.classList.add("is-valid");
                erroresDescription.innerHTML = "";
                erroresDescription.classList.remove("error-invalid"); 
            }

            if(errores.image){
                imageInput.classList.add("is-invalid");
                erroresImage.innerHTML = errores.image;
                erroresImage.classList.add("error-invalid"); 
            } else{
                imageInput.classList.remove("is-invalid");
                imageInput.classList.add("is-valid");
                erroresImage.innerHTML = "";
                erroresImage.classList.remove("error-invalid"); 
            }

            if(errores.category){
                categoryInput.classList.add("is-invalid");
                erroresCategory.innerHTML = errores.category;
                erroresCategory.classList.add("error-invalid"); 
            } else{
                categoryInput.classList.remove("is-invalid");
                categoryInput.classList.add("is-valid");
                erroresCategory.innerHTML = "";
                erroresCategory.classList.remove("error-invalid"); 
            }

            if(errores.price){
                priceInput.classList.add("is-invalid");
                erroresPrice.innerHTML = errores.price;
                erroresPrice.classList.add("error-invalid"); 
            } else{
                priceInput.classList.remove("is-invalid");
                priceInput.classList.add("is-valid");
                erroresPrice.innerHTML = "";
                erroresPrice.classList.remove("error-invalid"); 
            }

        } else {
            createProductForm.submit();    
        }   
    })
})