window.addEventListener("load", () => {

    const cartNumber = document.querySelector(".cart-number");

    let productsLength = JSON.parse(localStorage.getItem("cartProducts")).length;

    if ( productsLength != undefined) {
        cartNumber.innerHTML = productsLength;
        cartNumber.classList.add("cart-number-show")
    }

})