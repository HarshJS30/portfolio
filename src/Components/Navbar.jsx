import React from "react";
import '../assets/navbar.css';
import logo from '../assets/logo.png'

export default function Navbar(){
    return(
        <>
            <section className="navbar">
                <img src={logo}></img>
                <div className="buttons">
                    <button className="home">Home</button>
                    <button onClick={()=>window.location.href = "mailto:srivastavaharsh894@gmail.com"}>Contact</button>
                </div>
            </section>
        </>
    )
}