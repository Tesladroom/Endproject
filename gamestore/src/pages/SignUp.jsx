import {useRef} from "react";
import { Button } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';


function SignUp() {
    const firebaseURL = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDQHli_1nt1RP7GY0nwRYWZtVzIFpiAC9E";
    const emailRef = useRef();
    const passwordRef = useRef();


function onSignUp() {
    const data = {
        email: emailRef.current.value,
        password: passwordRef.current.value,
        returnSecureToken: true
    }
    fetch(firebaseURL,{

        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"

        }

    }).then(res => res.json())
        .then(body => {
            let today = new Date();
            let expirationDate = new Date(today.getTime()+body.expiresIn*1000);
            const userData = {
                token: body.idToken,
                expires: expirationDate
            }
            sessionStorage.setItem("userData", JSON.stringify(userData));
            toast.success("Edukalt lisatud uus kasutaja!", {
                position: "bottom-right",
                theme: "dark"
            });

            
        });


}
    return (
    <div>
        <label>Email</label> <br />
        <input ref={emailRef} type="text" /> <br />
        <label>Parool</label> <br />
        <input ref={passwordRef} type="text" /> <br />
        <Button onClick={() => onSignUp()}>Registreeri</Button>
        <ToastContainer/>
        </div>)
}

export default SignUp;