import { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import FileUpload from "../../components/FileUpload";

function AddProduct() {
    const idRef = useRef();
    const nameRef = useRef();
    const priceRef = useRef();
    const imgSrcRef = useRef();
    const categoryRef = useRef();
    const activeRef = useRef();
    const descriptionRef = useRef();
    const stockRef = useRef();
    const dbUrl = "https://chikar-20c2b-default-rtdb.europe-west1.firebasedatabase.app"
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [idNotUnique, setIdNotUnique] = useState(false);
    const [pictureURL, setPictureUrl] = useState(null);
   

    useEffect(() => {
        fetch(dbUrl + "/products.json").then(respone => respone.json())
        .then(responseBody => {
            const productsFromDB = [];
            for (const key in responseBody) {
                productsFromDB.push(responseBody[key]);
            }
            setProducts(productsFromDB);
            console.log(productsFromDB);
        })
    },[]);

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


    function onAddProduct() {
        const newProduct = {
          "category": categoryRef.current.value,
          "description": descriptionRef.current.value,
          "id": Number(idRef.current.value),
          "imgSrc": pictureURL,
          "isActive": activeRef.current.checked,
          "name": nameRef.current.value,
          "price": Number(priceRef.current.value)
        }
      

      fetch(dbUrl + "/products.json",{
          "method": "POST",
          "body": JSON.stringify(newProduct),
          "headers": {"Content-Type": "application/json"}
      });

    }
    function checkIdUniqueness() {
      console.log(idRef.current.value);
      const index = products.findIndex(element => Number(element.id) === Number(idRef.current.value));
      if (index >= 0) {
        setIdNotUnique(true);
      } else {
        setIdNotUnique(false);
      }
    }



return (
<div>
    { idNotUnique && <div>ID on mitteunikaalne</div>}
    <label>ID</label> <br />
    <input onChange={() => checkIdUniqueness()} ref={idRef} type="number" required /> <br />
    <label>Nimi</label> <br />
    <input ref={nameRef} type="text" required /> <br />
    <label>Hind</label> <br />
    <input ref={priceRef} type="number" required /> <br />
    <label>Pilt</label> <br />
    < FileUpload onSendPictureUrl={setPictureUrl} />
    {/* <input ref={imgSrcRef} type="text" required /> <br /> */}
    <label>Kategooria</label> <br />
    {/*<input ref={categoryRef} type="text" required /> <br /> */}
    <select ref={categoryRef}>
      {categories.map(element => <option value={element.name}>{element.name}</option>)}
      

    </select>
    <label>Kogus</label> <br />
    <input ref={stockRef} type="number" required /> <br />
    <label>Kirjeldus</label> <br />
    <input ref={descriptionRef} type="text" required /> <br />
    <label>Aktiivne</label> <br />
    <input ref={activeRef} type="checkbox" required /> <br />
    <Button disabled={idNotUnique} onClick={() => onAddProduct()}>LISA</Button>
</div>)


}
export default AddProduct;