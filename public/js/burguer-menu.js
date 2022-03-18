window.addEventListener("load", () => {

    const burguerMenu = document.querySelector(".burguer-menu");
    const contenido = document.querySelector(".contenido");

    burguerMenu.addEventListener("click", () => {
        contenido.classList.toggle("show");
        burguerMenu.classList.toggle("burguer-menu-opened");

    })
})