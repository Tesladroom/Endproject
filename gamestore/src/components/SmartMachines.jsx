import { useEffect, useState, useRef } from "react";
import { Button } from "react-bootstrap";



function SmartMachines(props) {

    const smartURL = "https://www.smartpost.ee/places.json";
    const [smartMachines, setSmartMachines] = useState([]);
    const [selectedSmart, setSelectedSmart] = useState(
      sessionStorage.getItem("selectedSmartMachine"));
    const smartRef = useState();
  
  
  
  
    useEffect(() => {
    fetch(smartURL).then(response => response.json())
      .then(responseBody => setSmartMachines(responseBody))
      },[]);
  
  function selectSmartMachine() {
   
    const smartValue = smartRef.current.value;
    const cartSmart = {product:{
        id: "332211",
        name: "Laagri Maksimarket",
        city: "Tallinn",
        address: "Pärnu mnt 558a",
        opened: "E-P 9.00-22.00",
        group_name: "Harjumaa",
        description: "Peasissepääsust vasakul koridori lõpus",
      price: 5,
      imgSrc: "/locker.png"
    },
    quantity: 1
} 
    
    props.cartItems.push(cartSmart);
    sessionStorage.setItem("products", JSON.stringify(props.cartItems));
    sessionStorage.setItem("selectedSmartMachine", JSON.stringify(smartValue));
    props.onSendCartProducts(props.cartItems.slice());
    setSelectedSmart(smartValue);
}

    function deleteSelectedSmart() {
        setSelectedSmart(null);
        sessionStorage.removeItem("selectedSmartMachine");
        props.onDeleteProduct({product: {id:"332211"}});
        
      }







    return (
    <div>
        
    { !selectedSmart && props.cartItems.length > 0 &&
    <select ref={smartRef} onChange={() => selectSmartMachine()}>
      { smartMachines.map(element => <option value={element.name}>{element.name}</option>) }
    </select>}
    { selectedSmart && 
    <div>
    {selectedSmart} <Button onClick={() => deleteSelectedSmart()}>X</Button>
    </div>}
   </div>)
}


export default SmartMachines;