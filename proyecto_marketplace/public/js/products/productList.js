window.addEventListener("load", () => {

    console.log("probando productList.js");

    let cartButtons = document.querySelectorAll(".product-article-cart-button");

    cartButtons.forEach(cartButton => {
        cartButton.addEventListener("click", () => {
            let id = cartButton.value;

            let cartProducts = localStorage.getItem('cartProducts');
            
            if(cartProducts !== null) {
              let arr = cartProducts.split(',');
              arr.push(id);
              localStorage.setItem('cartProducts', arr);
              console.log(localStorage.cartProducts);
            } else {
              localStorage.setItem('cartProducts', id);
              console.log(localStorage.cartProducts);
            }

        })
    });



})