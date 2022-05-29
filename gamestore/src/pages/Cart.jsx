import { useEffect, useState } from "react";
import cartStyles from "./css/Cart.module.css";
import OmnivaMachines from "../components/OmnivaMachines";
import SmartMachines from "../components/SmartMachines";
import Payment from "../components/Payment";
import { cartSumService } from "../store/cartSumService";

function Cart() {
  const [cartProducts, setCartProducts] = useState(getCartFromSS());
 

  function getCartFromSS() {
    const products = sessionStorage.getItem("products");
    if (products) {
      return JSON.parse(products);
    } else {
      return [];
    }
  }

  function decreaseQuantity(clickedProduct) {
    if (clickedProduct.product.id !== "11122333" & "332211") {
    const index = cartProducts.findIndex(
      element => element.product.id === clickedProduct.product.id);
    cartProducts[index].quantity--;
    if (cartProducts[index].quantity === 0) {
      removeFromCart(clickedProduct);
    }
    setCartProducts(cartProducts.slice());
    sessionStorage.setItem("products", JSON.stringify(cartProducts));
  } }

  function increaseQuantity(clickedProduct) {
    if (clickedProduct.product.id !== "11122333" & "332211") {
    const index = cartProducts.findIndex(
      element => element.product.id === clickedProduct.product.id);
    cartProducts[index].quantity++;
    setCartProducts(cartProducts.slice());
    sessionStorage.setItem("products", JSON.stringify(cartProducts));
    // 1. uuendama HTMLi
    // 2. uuendama sessionStorage-t
  }}

  function removeFromCart(clickedProduct) {
    const index = cartProducts.findIndex(
      element => element.product.id === clickedProduct.product.id);
    cartProducts.splice(index,1);
    setCartProducts(cartProducts.slice());
    sessionStorage.setItem("products", JSON.stringify(cartProducts));
    // if (clickedProduct.product.id === "11122333") {
    //   deleteSelectedOmniva();
    
  }

  function totalPrice() {
    let totalSum = 0;
    cartProducts.forEach(element => totalSum = totalSum + element.product.price * element.quantity);
    cartSumService.sendCartSUm(totalSum);
    return totalSum;
  }

  



  
 

  

  return (
    <div>
    {cartProducts.length > 0 && 
    <div>
      <div>Kokku on {cartProducts.length} toodet ostukorvis</div>
    </div>}
    <div>
    {cartProducts.length === 0 && <div>Ostukorv on tühi</div>}
   
      </div>
    { cartProducts.map(element => 
      <div className={cartStyles.cartProduct}>
        <img className={cartStyles.cartProductImg } src={element.product.imgSrc} alt="" />
        <div className={cartStyles.cartProductName}>Toode:{element.product.name}</div>
        <div className={cartStyles.cartProductPrice}>Hind:{element.product.price}€</div>
        <div className={cartStyles.cartProductQuantityControls}>
        { element.product.id !== "11122333" & "332211" && <img 
                      className={element.product.id === "11122333" & "332211" ? 
                        cartStyles.cartProductButtonDisabled : cartStyles.cartProductButton
                      } 
                      onClick={() => decreaseQuantity(element)} 
                      src="/cart/minus.png" 
                      alt="" />}
            <div className={cartStyles.cartProductQuantity}>{element.quantity} tk</div>
          { element.product.id !== "11122333" & "332211" && <img 
                      className={element.product.id === "11122333" & "332211" ? 
                          cartStyles.cartProductButtonDisabled : cartStyles.cartProductButton} 
                      onClick={() => increaseQuantity(element)} 
                      src="/cart/plus.png" 
                      alt="" />}    
        </div>




        <div className={cartStyles.cartProductSum}>{(element.product.price * element.quantity).toFixed(2)} € </div>
        <img className={cartStyles.cartProductButton} onClick={() => removeFromCart(element)} src="/cart/delete.png" alt="" />
      </div>) 
    }
     
    <br />
    
    <OmnivaMachines cartItems={cartProducts}
    
     onDeleteProduct={removeFromCart}
     onSendCartProducts={setCartProducts}/>
      <br />

      <SmartMachines cartItems={cartProducts}
    
     onDeleteProduct={removeFromCart}
     onSendCartProducts={setCartProducts}/>
      <br />
    
   
    {cartProducts.length > 0 && <div>
      <div>KOKKU: {totalPrice()} €</div> 
      
      <Payment totalSum={totalPrice()} />
      </div>}    
  </div>)
}

// camelCase  --- esimene täht on väike, iga järgnev sõna algab suurega 
//                (atribuudid, muutujad ja funktsioonid)
// PascalCase --- iga sõna on suure tähega (klassid   <Home/> --- <ToastContainer/> -- <Link>)
// kebab-case --- iga sõna lahutab sidekriips  (css)
// snake_case --- iga sõna lahutab alumine kriips (failid_asdas.pdf)

export default Cart;