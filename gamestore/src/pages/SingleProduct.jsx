import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function SingleProduct() {

const [product, updateProduct] = useState({});
const url = "https://chikar-20c2b-default-rtdb.europe-west1.firebasedatabase.app/products.json"
const { productId } = useParams();

useEffect(() => {  
    fetch(url)
    .then(returned => returned.json())
    .then(returnedbody => {
      console.log(returnedbody);
      const newArray = [];
      for (const key in returnedbody) {
        newArray.push(returnedbody[key]);
      }
      
      const productFound = newArray.find(product =>
        product.name.replaceAll(" ", "-").toLowerCase() === productId);
        updateProduct(productFound);
        
    });
  }, []);







    return (
    <div>
              {product &&<div>
               <img className="product-img" src={product.imgSrc} alt="" /> 
               <div>{product.name}</div>
               <div>{Number(product.price).toFixed(2)}</div>
               <div>{product.description}</div>
               <div>{product.id}</div>
               </div>}
    </div>);
    
    
    }
    export default SingleProduct;