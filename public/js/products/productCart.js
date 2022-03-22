function deleteFromCart(id) {
  
    let cartProductsToDelete = JSON.parse(localStorage.getItem('cartProducts'));
    if(cartProductsToDelete !== null) {
      
      let cartProductsToDeleteFiltrado = cartProductsToDelete.filter(producto => {
        return producto.id != id
      })
      if(cartProductsToDeleteFiltrado.length >= 1){
        localStorage.setItem('cartProducts', JSON.stringify(cartProductsToDeleteFiltrado));  
        location.reload()
      } else {
        localStorage.removeItem('cartProducts');
        location.reload()
      }
    } else {
      localStorage.removeItem('cartProducts');
      console.log(localStorage.cartProducts);
    }
    
}

function editLocalStorage(id, qty){

  let cartProducts = JSON.parse(localStorage.getItem("cartProducts"));    

  cartProducts.forEach(cartProduct => {

      if(parseInt(cartProduct.id) == parseInt(id)){
          
          cartProduct.qty = parseInt(qty); 

      }
  })

  localStorage.setItem("cartProducts", JSON.stringify(cartProducts)); 
  console.log(localStorage.cartProducts);

}

window.addEventListener("load", () => {

    const main = document.querySelector("main");
    
    const loadingDiv = document.querySelector(".lds-dual-ring");
    
    let cartProductsJSON = localStorage.getItem("cartProducts");

    if(cartProductsJSON !== null){

        const cartTotalAmount = document.createElement("div");
        cartTotalAmount.style.display = "none";
        cartTotalAmount.setAttribute("class", "total-amount-cart");
        main.appendChild(cartTotalAmount);

        const cartTotalAmountString = document.createElement("strong");
        cartTotalAmountString.innerHTML = "Total compra  $";
        cartTotalAmount.appendChild(cartTotalAmountString);

        const cartTotalAmountNumber = document.createElement("strong");
        cartTotalAmountNumber.innerHTML = "0";
        cartTotalAmount.appendChild(cartTotalAmountNumber);
        
        const cartCheckOut = document.createElement("div");
        cartCheckOut.style.display = "none";
        cartCheckOut.setAttribute("class", "check-out");
        cartCheckOut.innerHTML = "<button>COMPRAR</button>";
        main.appendChild(cartCheckOut);
        cartCheckOut.addEventListener("click", () => {
          alert("Genial ya hiciste la compra! Te mandamos un email con los detalles de la compra!");
          location.href= "/";
          localStorage.removeItem("cartProducts");

        })

        const cartKeepBuying = document.createElement("div");
        cartKeepBuying.style.display = "none";
        cartKeepBuying.setAttribute("class", "keep-buying");
        cartKeepBuying.innerHTML = "<button><a href='/products'>SEGUIR COMPRANDO</a></button>";
        main.appendChild(cartKeepBuying);

        let cartProducts = JSON.parse(cartProductsJSON);

        cartProducts.forEach(cartProduct => {
            fetch(`https://veoverde.herokuapp.com/api/products/${cartProduct.id}/`)
                .then(response => response.json())
                .then(product => {

                  loadingDiv.style.display = "none";

                  let cartProductData = product.data;

                  const cartProductDiv = document.createElement("div");
                  cartProductDiv.setAttribute("class", "main-shopping-cart");
                  main.appendChild(cartProductDiv);

                  const cartProductDescription = document.createElement("div");
                  cartProductDescription.setAttribute("class", "description-cart");
                  cartProductDiv.appendChild(cartProductDescription);

                  const cartProductImg = document.createElement("img");
                  cartProductImg.setAttribute("src", cartProductData.imageURL);
                  cartProductImg.classList.add("cart-product-img");
                  cartProductDescription.appendChild(cartProductImg);

                  const cartProductName = document.createElement("p");
                  cartProductName.setAttribute("class", "product-description");
                  cartProductName.innerText = `${cartProductData.name}`;
                  cartProductDescription.appendChild(cartProductName);

                  const cartProductQty = document.createElement("p");
                  cartProductQty.setAttribute("class", "quantity-product");
                  cartProductDescription.appendChild(cartProductQty);

                  const cartProductQtyNumber = document.createElement("strong");
                  cartProductQtyNumber.setAttribute("class", "quantity-number-product");
                  cartProductQtyNumber.innerHTML = `${cartProduct.qty}`;
                  cartProductQty.appendChild(cartProductQtyNumber);

                  const cartProductQtyMinus = document.createElement("button");
                  cartProductQtyMinus.setAttribute("class", "quantity-product-minus");
                  cartProductQtyMinus.innerHTML = '<i class="fas fa-minus"></i>';
                  cartProductQty.appendChild(cartProductQtyMinus);
                  cartProductQtyMinus.addEventListener("click", () => {
                    let cantidadActual = parseInt(cartProductQtyNumber.innerText);
                    if(cantidadActual > 1){
                      cartProductQtyNumber.innerText = `${cantidadActual - 1}`;
                      editLocalStorage(cartProduct.id, cartProductQtyNumber.innerText);
                      cartProductSubTotalNumber.innerText =  `${cartProductData.price * parseInt(cartProductQtyNumber.innerText) }`;
                      cartTotalAmountNumber.innerText = `${parseInt(cartTotalAmountNumber.innerText) - parseInt(cartProductData.price)}`;
                    }                 
                                      
                  })

                  const cartProductQtyPlus = document.createElement("button");
                  cartProductQtyPlus.setAttribute("class", "quantity-product-plus");
                  cartProductQtyPlus.innerHTML = '<i class="fas fa-plus"></i>';
                  cartProductQty.appendChild(cartProductQtyPlus);
                  cartProductQtyPlus.addEventListener("click", () => {
                    let cantidadActual = parseInt(cartProductQtyNumber.innerText)
                    cartProductQtyNumber.innerText = `${cantidadActual + 1}`;
                    editLocalStorage(cartProduct.id, cartProductQtyNumber.innerText);
                    cartProductSubTotalNumber.innerText =  `${cartProductData.price * parseInt(cartProductQtyNumber.innerText) }`;
                    cartTotalAmountNumber.innerText = `${parseInt(cartTotalAmountNumber.innerText) + parseInt(cartProductData.price)}`;
                  })

                  const cartProductPrice = document.createElement("p");
                  cartProductPrice.setAttribute("class", "product-price");
                  cartProductPrice.innerText = `$${cartProductData.price}`;
                  cartProductDescription.appendChild(cartProductPrice);

                  const cartProductSubTotal = document.createElement("p");
                  cartProductSubTotal.setAttribute("class", "product-subtotal");
                  cartProductDescription.appendChild(cartProductSubTotal);

                  const cartProductSubTotalString = document.createElement("strong");
                  cartProductSubTotalString.innerText = `$`;
                  cartProductSubTotal.appendChild(cartProductSubTotalString);

                  const cartProductSubTotalNumber = document.createElement("strong");
                  cartProductSubTotalNumber.innerText = `${cartProductData.price * cartProduct.qty }`;
                  cartProductSubTotal.appendChild(cartProductSubTotalNumber);

                  cartTotalAmount.style.display = "flex";
                  cartCheckOut.style.display = "flex";
                  cartKeepBuying.style.display = "flex";
                  cartTotalAmountNumber.innerText = `${parseInt(cartTotalAmountNumber.innerText) + parseInt(cartProductSubTotalNumber.innerText)}`;
                    
                  const cartProductOptions = document.createElement("ul");
                  cartProductOptions.setAttribute("class", "shopping-cart-options");
                  cartProductDiv.appendChild(cartProductOptions);

                  const cartProductDelete = document.createElement("li");
                  cartProductDelete.innerHTML = `<button class="delete-product-button" onclick="deleteFromCart(${cartProductData.id})"><i class="fa-solid fa-trash-can"></i></button>`;
                  cartProductOptions.appendChild(cartProductDelete);   
                    
                })
        })

    } else {

      loadingDiv.style.display = "none";

      const emptyCart = document.createElement("div");
      emptyCart.setAttribute("class", "empty-cart")
      emptyCart.innerHTML = "<h1>El carrito de productos esta vacío</h1>";
      emptyCart.innerHTML += "<button><a href='/products'>Volver a la lista de productos</a></button>";
      main.appendChild(emptyCart);

    }
})