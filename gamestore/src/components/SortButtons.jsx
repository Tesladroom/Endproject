import { Button } from "react-bootstrap";


function SortButtons(props) {

    function onSortAZ() {
        props.homeProducts.sort((a,b) => a.name.localeCompare(b.name));
        props.onSetProducts(props.homeProducts.slice());
    }

    function onSortZA() {
        props.homeProducts.sort((a,b) => b.name.localeCompare(a.name));
        props.onSetProducts(props.homeProducts.slice());
    }

    function onSortPriceAsc() {
       
        props.homeProducts.sort((a,b) =>a.price- b.price);
        props.onSetProducts(props.homeProducts.slice());
    }

    function onSortPriceDesc() {
       
        props.homeProducts.sort((a, b)=>b.price-a.price);
        props.onSetProducts(props.homeProducts.slice());
    }


    return (
        <div>
            <Button onClick={() => onSortAZ()}>Sorteeri A-Z</Button>
        <Button onClick={() => onSortZA()}>Sorteeri Z-A</Button>
        <Button onClick={() => onSortPriceAsc()}>Sorteeri hind kasvavalt</Button>
        <Button onClick={() => onSortPriceDesc()}>Sorteeri hind kahanevalt</Button><br />










        </div>)
}

export default SortButtons