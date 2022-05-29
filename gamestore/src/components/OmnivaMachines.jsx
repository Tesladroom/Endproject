import { useEffect, useState, useRef } from "react";
import { Button } from "react-bootstrap";



function OmnivaMachines(props) {

    const omnivaURL = "https://www.omniva.ee/locations.json";
    const [omnivaMachines, setOmnivaMachines] = useState([]);
    const [selectedOmniva, setSelectedOmniva] = useState(
      sessionStorage.getItem("selectedOmnivaMachine"));
    const omnivaRef = useState();
  
  
  
  
    useEffect(() => {
    fetch(omnivaURL).then(response => response.json())
      .then(responseBody => setOmnivaMachines(responseBody))
      },[]);
  
  function selectOmnivaMachine() {
    // console.log(omnivaRef.current.value);
    const omnivaValue = omnivaRef.current.value;
    const cartOmniva = {product:{
      id:"11122333",
      name: "Omniva Pakiautomaadi tasu",
      price: 3.5,
      imgSrc: "/locker.png"
    },
    quantity: 1
} 
    
    props.cartItems.push(cartOmniva);
    sessionStorage.setItem("products", JSON.stringify(props.cartItems));
    sessionStorage.setItem("selectedOmnivaMachine", JSON.stringify(omnivaValue));
    props.onSendCartProducts(props.cartItems.slice());
    setSelectedOmniva(omnivaValue);
}

    function deleteSelectedOmniva() {
        setSelectedOmniva(null);
        sessionStorage.removeItem("selectedOmnivaMachine");
        props.onDeleteProduct({product: {id:"11122333"}});
        
      }







    return (
    <div>
        
    { !selectedOmniva && props.cartItems.length > 0 &&
    <select ref={omnivaRef} onChange={() => selectOmnivaMachine()}>
      { omnivaMachines.map(element => <option value={element.NAME}>{element.NAME}</option>) }
    </select>}
    { selectedOmniva && 
    <div>
    {selectedOmniva} <Button onClick={() => deleteSelectedOmniva()}>X</Button>
    </div>}
   </div>)
}


export default OmnivaMachines;