import { useRef } from "react";





function SendEmail() {
    const nameRef = useRef();
    const headerRef = useRef();
    const contentRef = useRef();

function sendEmail() {
    window.Email.send({
        Host : "smtp.elasticemail.com",
        Username : "vanquisher.1991@hotmail.com",
        Password : "E3D2567896EA9F698637E60E89A6D9ED6B5E",
        To : 'vanquisher-1991@hotmail.com',
        From : "tesladroom@gmail.com",
        Subject : "Sulle kirjutas:" + nameRef.current.value,
        Body : "Tema soov: " + headerRef.current.value +"<br/>" + contentRef.current.value
    }).then(
      message => alert(message)
    );
    }





    return (<div>
        <span>Nimi</span> <input ref={nameRef} type="text" /> <br />
        <span>Pealkiri</span> <input ref={headerRef} type="text" /> <br />
        <span>Sisu</span> <input ref={contentRef} type="text" /> <br />
        <button onClick={() => sendEmail()}>Saada email</button>
        </div>)
}

export default SendEmail