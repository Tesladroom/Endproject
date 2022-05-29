import { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { Button } from "react-bootstrap";

function Categories() {
    const [categories, setCategories] = useState([]);
    const categoryRef = useRef();
    const dbUrl = "https://chikar-20c2b-default-rtdb.europe-west1.firebasedatabase.app/categories.json"


    useEffect(() => {
        fetch(dbUrl).then(response => response.json())
        .then(responseBody => {
          const categoriesFromDb = [];
          for (const key in responseBody) {
            categoriesFromDb.push(responseBody[key]);
          }
          setCategories(categoriesFromDb);
        });
      },[]);
      function addCategory() {
          const newCategory = {
              name: categoryRef.current.value
          }

        fetch(dbUrl, {
            method: "POST",
            body: JSON.stringify(newCategory),
            "headers": {
                "Content-Type": "application/json"
            }

        })

        categories.push(newCategory);
        setCategories(categories.slice());
        categoryRef.current.value = "";
      }

      function deleteCategory(category) {
          const index = categories.findIndex(element => element.name === category.name);
          categories.splice(index,1);
          setCategories(categories.slice());
          fetch (dbUrl, {
              method: "PUT",
              body: JSON.stringify(categories),
              "headers": {
                  "Content-Type": "application/json"
              }
          })
          toast.error("Kategooria kustutatud");
      }

      return (
        <div>
          <label>Kategooria</label>
          <input ref={categoryRef} type="text" />
          <Button onClick={() => addCategory()}>Lisa</Button>
          {categories.length === 0 && <div>Kategooriaid ei ole!</div>}
          {categories.map(element => 
          <div>
              <span>{element.name}</span>
              <button onClick={() => deleteCategory(element)}>X</button>
              </div>)}
              <ToastContainer />
        </div>
        )
    
    
    }
    export default Categories;