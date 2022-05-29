import { Button } from "react-bootstrap";


function Payment (props) {

    function pay() {
        const data = {
          "api_username": "92ddcfab96e34a5f",
          "account_name": "EUR3D1",
          "amount": props.totalSum,
          "order_reference": Math.random() * 999999,
          "nonce": "92ddcfab96e34a5f" + new Date() + Math.random() * 999999,
          "timestamp": new Date(),
          "customer_url": "www.neti.ee"
        }
    
    
        fetch("https://igw-demo.every-pay.com/api/v4/payments/oneoff",{
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Basic OTJkZGNmYWI5NmUzNGE1Zjo4Y2QxOWU5OWU5YzJjMjA4ZWU1NjNhYmY3ZDBlNGRhZA=="
          }
        }).then(response => response.json())
        .then(body => window.location.href = body.payment_link);
    
      }


    return (<div>


<Button onClick ={() => pay()}>Maksa</Button>



    </div>)


}


export default Payment;
