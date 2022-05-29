import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "react-bootstrap";

function EditProducts() {

    const idRef = useRef();
    const nameRef = useRef();
    const priceRef = useRef();
    const imgSrcRef = useRef();
    const categoryRef = useRef();
    const activeRef = useRef();
    const descriptionRef = useRef();
    const stockRef = useRef();
    const {id} = useParams();
    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState({});
    const [categories, setCategories] = useState([]);
    const dbUrl = "https://chikar-20c2b-default-rtdb.europe-west1.firebasedatabase.app"


    useEffect(()=>{
        fetch(dbUrl + "/products.json").then(response => response.json())
        .then(body => {
            const newArray = [];
            for (const key in body) {
            const value = body[key];
            newArray.push(value);
            }
            setProducts(newArray);
            const productFound = newArray.find(element => Number(element.id) === Number(id));
            setProduct(productFound);
        })
    },[id]);

    useEffect(() => {
        fetch(dbUrl + "/categories.json").then(respone => respone.json())
        .then(responseBody => {
            const categoriesFromDB = [];
            for (const key in responseBody) {
                categoriesFromDB.push(responseBody[key]);
            }
            setCategories(categoriesFromDB);
            console.log(categoriesFromDB);
        })
    },[]);


    function onEditProduct() {
        const newProduct = {
          "category": categoryRef.current.value,
          "description": descriptionRef.current.value,
          "id": Number(idRef.current.value),
          "imgSrc": imgSrcRef.current.value,
          "isActive": activeRef.current.checked,
          "name": nameRef.current.value,
          "price": Number(priceRef.current.value),
          "stock": Number(stockRef.current.value)
        }

      const index = products.findIndex(element => element.id === product.id);
      products[index] = newProduct;

      fetch(dbUrl,{
          "method": "PUT",
          "body": JSON.stringify(products),
          "headers": {"Content-Type": "application/json"}
      });

    }

return (
<div>
    { product && <div>
    <label>ID</label> <br />
    <input ref={idRef} defaultValue={product.id} type="number" required /> <br />
    <label>Nimi</label> <br />
    <input ref={nameRef} defaultValue={product.name} type="text" required /> <br />
    <label>Hind</label> <br />
    <input ref={priceRef} defaultValue={product.price} type="number" required /> <br />
    <label>Pilt</label> <br />
    <input ref={imgSrcRef} defaultValue={product.imgSrc} type="text" required /> <br />
    <label>Kategooria</label> <br />
    <select ref={categoryRef}>
      {categories.map(element => <option value={element.name}>{element.name}</option>)}
      

    </select>
    <label>Kogus</label> <br />
    <input ref={stockRef} defaultValue={product.stock} type="number" required /> <br />
    <label>Kirjeldus</label> <br />
    <input ref={descriptionRef} defaultValue={product.description} type="text" required /> <br />
    <label>Aktiivne</label> <br />
    <input ref={activeRef} defaultChecked={product.isActive} type="checkbox" required /> <br />
    <Button onClick={() => onEditProduct()}>Muuda toode</Button>
    </div>}
</div>)


}
   
    export default EditProducts;