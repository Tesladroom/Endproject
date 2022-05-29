import {useRef} from "react";
import { Button } from "react-bootstrap";
import { useContext } from 'react';
import AuthContext from "../store/AuthContext";
import { useNavigate } from "react-router-dom";



function SignIn() {
    const firebaseURL = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDQHli_1nt1RP7GY0nwRYWZtVzIFpiAC9E";
    const emailRef = useRef();
    const passwordRef = useRef();
    const authCtx = useContext(AuthContext);
    const navigate = useNavigate();

function onSignIn() {
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
            if (body.registered) {
                let today = new Date(); // uus tänane kuupäev praeguse kellaajaga
                let expirationDate = new Date(today.getTime()+body.expiresIn*1000);
                const userData = {
                  token: body.idToken,
                  expires: expirationDate
                }
                sessionStorage.setItem("userData", JSON.stringify(userData));
                authCtx.onLogin();
                navigate("/admin");
              }
        });


}
    return (
    <div>
        <label>Email</label> <br />
        <input ref={emailRef} type="text" /> <br />
        <label>Parool</label> <br />
        <input ref={passwordRef} type="text" /> <br />
        <Button onClick={() => onSignIn()}>Logi sisse</Button>
        </div>)
}

export default SignIn;