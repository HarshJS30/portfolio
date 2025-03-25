import React from "react";
import './App.css';
import Navbar from "./Components/Navbar";
import About from "./Components/About";
import Tools from "./Components/Tool";
import Projects from "./Components/Projects";
import Contact from "./Components/Contact";

function App(){
    return(
        <>
            <Navbar />
            <About />
            <Tools />
            <Projects />
            <Contact /> 
        </>
    )
}

export default App;