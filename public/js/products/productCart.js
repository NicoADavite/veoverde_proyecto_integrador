window.addEventListener("load", () => {

    const main = document.querySelector("main")
    
    let cartProductsString = localStorage.getItem("cartProducts");

    if(cartProductsString !== null){

        let cartProductsArray = cartProductsString.split(',');

        let cartProducts = Array.from(new Set(cartProductsArray));

        cartProducts.forEach(id => {
            fetch(`https://veoverde.herokuapp.com/api/products/${id}/`)
                .then(response => response.json())
                .then(product => {
                    let cartProduct = product.data;

                    const cartProductDiv = document.createElement("div");
                    cartProductDiv.setAttribute("class", "main-shopping-cart");
                    main.appendChild(cartProductDiv);

                    const cartProductDescription = document.createElement("div");
                    cartProductDescription.setAttribute("class", "description-cart");
                    cartProductDiv.appendChild(cartProductDescription);

                    const cartProductImg = document.createElement("img");
                    cartProductImg.setAttribute("src", `/images/products/${cartProduct.image}`);
                    cartProductDescription.appendChild(cartProductImg);

                    const cartProductName = document.createElement("p");
                    cartProductName.setAttribute("class", "product-description");
                    cartProductName.innerText = `${cartProduct.name}`;
                    cartProductDescription.appendChild(cartProductName);

                    const cartProductQty = document.createElement("p");
                    cartProductQty.setAttribute("class", "quantity-product");
                    cartProductQty.innerText = `1`;
                    cartProductDescription.appendChild(cartProductQty);

                    const cartProductPrice = document.createElement("p");
                    cartProductPrice.setAttribute("class", "product-price");
                    cartProductPrice.innerText = `$${cartProduct.price}`;
                    cartProductDescription.appendChild(cartProductPrice);
                    
                    const cartProductOptions = document.createElement("ul");
                    cartProductOptions.setAttribute("class", "shopping-cart-options");
                    cartProductDiv.appendChild(cartProductOptions);

                    const cartProductDelete = document.createElement("li");
                    cartProductDelete.innerHTML = '<a href="#">Eliminar</a>';
                    cartProductOptions.appendChild(cartProductDelete);   
                
                })
        })

        const cartTotalAmount = document.createElement("div");
        cartTotalAmount.setAttribute("class", "total-amount-cart");
        cartTotalAmount.innerHTML = "<p>Total compra</p>";
        cartTotalAmount.innerHTML += "<p>$500</p>";
        main.appendChild(cartTotalAmount);
        
        const cartCheckOut = document.createElement("div");
        cartCheckOut.setAttribute("class", "check-out");
        cartCheckOut.innerHTML = "<button>Continuar compra</button>";
        main.appendChild(cartCheckOut);

    } else {

        const emptyCart = document.createElement("div");
        emptyCart.setAttribute("class", "empty-cart")
        emptyCart.innerHTML = "<h1>El carrito de productos esta vacío</h1>";
        emptyCart.innerHTML += "<p><a href='/products'>Volver a la lista de productos</a></p>";
        main.appendChild(emptyCart);

    }
})