window.addEventListener("load", () => {

    // Capturo los elementos del DOM con los que voy a interactuar

    const cartForm = document.querySelector("#cart-form");
    const minusButton = document.querySelector(".menos");
    const plusButton = document.querySelector(".mas");
    const qtyInput = document.querySelector("#qty")
    const cartButton = document.querySelector("#cart-button");

    minusButton.addEventListener("click", () => {
        if(qtyInput.value >= 2){
            qtyInput.value = parseInt(qtyInput.value) - 1;
        }        
    })

    plusButton.addEventListener("click", () => {
        qtyInput.value = parseInt(qtyInput.value) + 1;     
    })

    cartForm.addEventListener("submit", (e) => {

        e.preventDefault();

        if(localStorage.getItem("cartProducts")){

            let cartProducts = JSON.parse(localStorage.getItem("cartProducts"));

            let productAlreadyInCart = cartProducts.filter(cartProduct => {

                return parseInt(cartProduct.id) == parseInt(cartButton.value);
                
            })

            if(productAlreadyInCart.length > 0){

                cartProducts.forEach(cartProduct => {

                    if(parseInt(cartProduct.id) == parseInt(cartButton.value)){

                        cartProduct.qty = parseInt(cartProduct.qty) + parseInt(qtyInput.value);
    
                    }
                })

                localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
                console.log(localStorage.cartProducts);

            } else{

                let newProduct = {
                    id: parseInt(cartButton.value),
                    qty: parseInt(qtyInput.value)
                };

                cartProducts.push(newProduct);

                localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
                console.log(localStorage.cartProducts);

            }               

        } else {

            let newProduct = {
                id: parseInt(cartButton.value),
                qty: parseInt(qtyInput.value)
            };

            let cartProducts = [];

            cartProducts.push(newProduct);

            localStorage.setItem("cartProducts", JSON.stringify(cartProducts));

            console.log(localStorage.cartProducts);

        }

    })    
    
})
