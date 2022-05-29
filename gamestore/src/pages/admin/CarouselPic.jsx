import { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { Button } from "react-bootstrap";



function CarouselPic() {

const [pictures, setPictures] = useState([]);
const pictureRef = useRef();
const dbUrl = "https://chikar-20c2b-default-rtdb.europe-west1.firebasedatabase.app/carouselpic.json"


useEffect(() => {
    fetch(dbUrl).then(response => response.json())
    .then(responseBody => {
      const picturesFromDb = [];
      for (const key in responseBody) {
        picturesFromDb.push(responseBody[key]);
      }
      setPictures(picturesFromDb);
    });
  },[]);
  function addPicture() {
      const newPicture = {
          name: pictureRef.current.value
      }

    fetch(dbUrl, {
        method: "POST",
        body: JSON.stringify(newPicture),
        "headers": {
            "Content-Type": "application/json"
        }

    })

    pictures.push(newPicture);
    setPictures(pictures.slice());
    pictureRef.current.value = "";
  }

  function deletePicture(Picture) {
      const index = pictures.findIndex(element => element.name === Picture.name);
      pictures.splice(index,1);
      setPictures(pictures.slice());
      fetch (dbUrl, {
          method: "PUT",
          body: JSON.stringify(pictures),
          "headers": {
              "Content-Type": "application/json"
          }
      })
      toast.error("Pilt kustutatud");
  }

  return (
    <div>
      <label>Karuselli Pildid</label>
      <input ref={pictureRef} type="text" />
      <Button onClick={() => addPicture()}>Lisa</Button>
      {pictures.length === 0 && <div>Pilte ei ole!</div>}
      {pictures.map(element => 
      <div>
          <span>{element.name}</span>
          <button onClick={() => deletePicture(element)}>X</button>
          </div>)}
          <ToastContainer />
    </div>




)





}
export default CarouselPic;