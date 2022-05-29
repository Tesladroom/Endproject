import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Table } from "react-bootstrap";

function ViewProducts() {
 
        const [products, setProducts] = useState([]);
        const url = "https://chikar-20c2b-default-rtdb.europe-west1.firebasedatabase.app/products.json"
        const searchRef = useRef();
        const [originalProducts, setOriginalProducts] = useState([]);
        const [isLoading, setIsLoading] = useState({productId: null, loading: false});

        useEffect(() => {
          fetch(url).then(response => response.json())
          .then(responseBody => {
            const productsFromDb = [];
            for (const key in responseBody) {
              productsFromDb.push(responseBody[key]);
            }
            setProducts(productsFromDb);
            setOriginalProducts(productsFromDb);
          })
        },[]);
      
        // Number("mingisugune-string")  <-- error, sest ei oska numbriks teha
        // Number("12312312");   <--- ok
        // 12312312.indexOf()   <-- error, kuna numbril ei ole indekseid
        // "12312312".indexOf() <-- ok
        // 12313123.toString()   <-- alati ok
      
        function searchProducts() {
          console.log(searchRef.current.value);
                                  //   .indexOf()
          // searchRef  - mida sisestasin
          // product.name.indexOf(searchRef)
          // KUI LEIAB, siis on index >= 0
          // KUI EI LEIA, siis on index -1
          // filterdan sisse kõik kellel on index suurem kui 0
          const searchedProduct = searchRef.current.value.toLowerCase();
          const productsFound = originalProducts.filter(element => 
            element.name.toLowerCase().indexOf(searchedProduct) >= 0 || 
              element.id.toString().indexOf(searchedProduct) >= 0 );
          setProducts(productsFound);
        }
      
        function decreaseStock(product) {
          const index = products.findIndex(element => element.id === product.id);
          if (index >= 0 && products[index].stock && products[index].stock > 0) {
            products[index].stock--;
            setProducts(products.slice());
            setIsLoading({productId: product.id, loading: true});
            fetch(url,{
              "method": "PUT", 
              "body": JSON.stringify(products), 
              "headers": {"Content-Type": "application/json"} 
            }).then(() => setIsLoading({productId: null, loading: false}));
          }
          // console.log("1")
          // if (index >= 0) {
          //   console.log("2")
          //   if (products[index].stock) {
          //     console.log("3")
          //     if (products[index].stock > 0) {
          //       console.log("4")
          //       products[index].stock--;
          //       setProducts(products.slice());
          //     }
          //   }
          // }
        }
      
        function increaseStock(product) {
          const index = products.findIndex(element => element.id === product.id);
          if (index >= 0) {
            if (products[index].stock === undefined) {
              products[index].stock = 0;
            }
            products[index].stock++;
            setProducts(products.slice());
            setIsLoading({productId: product.id, loading: true});
            fetch(url,{
              "method": "PUT", 
              "body": JSON.stringify(products), 
              "headers": {"Content-Type": "application/json"} 
            }).then(() => setIsLoading({productId: null, loading: false}));
          }
        }
      
        return (
        <div>
          <input ref={searchRef} onChange={() => searchProducts()} type="text" />
          <Table>
            <thead>
              <tr>
                <th>Pilt</th>
                <th>Nimi</th>
                <th>ID</th>
                <th>Hind</th>
                <th>Kirjeldus</th>
                <th>Kategooria</th>
                <th>Aktiivne</th>
                <th>Kogus</th>
                <th>Tegevused</th>
              </tr>
            </thead>
            <tbody>
              {products.map(element => 
                <tr key={element.id}>
                  <td><img className="admin-picture" src={element.imgSrc} alt="" /></td>
                  <td>{element.name}</td>
                  <td>{element.id}</td>
                  <td>{element.price} €</td>
                  <td>{element.description}</td>
                  <td>{element.category}</td>
                  <td>{element.isActive + 0}</td>
                  <td>{element.stock}</td>
                  <td>
                    { isLoading.loading === true && isLoading.productId === element.id && <div className="spinner-wrapper">
                      <div className="lds-ripple"><div></div><div></div></div>
                    </div>}
                    <Button onClick={() => decreaseStock(element)} variant="danger">-</Button>
                    <Button onClick={() => increaseStock(element)} variant="success">+</Button>
                    <Link to={"/admin/muuda/" + element.id}>
                      <Button>MUUDA</Button>
                    </Link>
                  </td>
                </tr>)}
            </tbody>
          </Table>
        </div>)
      }
      
      export default ViewProducts;