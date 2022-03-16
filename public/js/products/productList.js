window.addEventListener("load", () => {

    let cartButtons = document.querySelectorAll(".product-article-cart-button");

    cartButtons.forEach(cartButton => {
        cartButton.addEventListener("click", () => {

            let id = cartButton.value;

            if(localStorage.getItem("cartProducts")){

              let cartProducts = JSON.parse(localStorage.getItem("cartProducts"));
  
              let productAlreadyInCart = cartProducts.filter(cartProduct => {
  
                  return parseInt(cartProduct.id) == parseInt(id);
                  
              })
  
              if(productAlreadyInCart.length > 0){
  
                  cartProducts.forEach(cartProduct => {
  
                      if(parseInt(cartProduct.id) == parseInt(cartButton.value)){
  
                          cartProduct.qty = parseInt(cartProduct.qty) + 1;
      
                      }
                  })
  
                  localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
                  console.log(localStorage.cartProducts);
  
              } else{
  
                  let newProduct = {
                      id: parseInt(id),
                      qty: 1
                  };
  
                  cartProducts.push(newProduct);
  
                  localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
                  console.log(localStorage.cartProducts);
  
              }               
  
          } else {
  
              let newProduct = {
                  id: parseInt(id),
                  qty: 1
              };
  
              let cartProducts = [];
  
              cartProducts.push(newProduct);
  
              localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
  
              console.log(localStorage.cartProducts);
  
          }

        })
    });



})