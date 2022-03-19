window.addEventListener("load", () => {

    const burguerMenu = document.querySelector(".burguer-menu");
    const burguerMenuButton = document.querySelector(".burguer-menu-button");
    const contenido = document.querySelector(".contenido");

    burguerMenu.addEventListener("click", () => {

        if(burguerMenuButton.innerHTML == '<i class="fas fa-times" aria-hidden="true"></i>'){
            burguerMenuButton.innerHTML = '<i class="fa-solid fa-seedling"></i>'
        } else{
            burguerMenuButton.innerHTML = '<i class="fas fa-times"></i>'
        }
        
        contenido.classList.toggle("contenido-opened");
        contenido.classList.toggle("contenido-closed");
        burguerMenu.classList.toggle("burguer-menu-opened");
        burguerMenu.classList.toggle("burguer-menu-closed");
    })
})