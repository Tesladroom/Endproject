import { useEffect, useState } from "react";
import React from "react-bootstrap";
import Slider from "react-slick";


function CarouselGallery() {
    const [images, setImages] = useState(
        [
            {name: "https://picsum.photos/id/130/900/200"},
            {name: "https://picsum.photos/id/53/900/200"},
            {name: "https://picsum.photos/id/900/900/200"}

    ])
  

    const settings = {
        dots: true,
        infinite: true,
        speed: 200,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true
      };

      const dbUrl = "https://chikar-20c2b-default-rtdb.europe-west1.firebasedatabase.app/carouselpic.json"
      

      useEffect(() => {
        fetch(dbUrl).then(respone => respone.json())
        .then(responseBody => {
            const picturesFromDB = [];
            for (const key in responseBody) {
                picturesFromDB.push(responseBody[key]);
            }
            setImages(picturesFromDB);
            console.log(picturesFromDB);
        })
    },[]);




      return (
        <div>
          <Slider {...settings}>
          { images.map(element => 
              <div>
                  <img src={element.name} alt="" />
              </div>) }
          </Slider>
        </div>
      );
    }
  
export default CarouselGallery; 