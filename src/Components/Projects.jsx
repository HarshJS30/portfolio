import React from "react";
import '../assets/navbar.css';
import { FaExternalLinkAlt } from "react-icons/fa";
import pr1 from '../assets/pr1.png';
import pr2 from '../assets/pr2.png';
import pr3 from '../assets/pr3.png';
import pr4 from '../assets/pr4.png';

export default function Projects(){
    return(
        <section className="projects">
            <h2>My <span>Projects</span></h2>
            <div className="project">
                <div className="pro">
                    <img src={pr1}></img>
                    <h4>GrindBook</h4>
                    <p>GrindBook lets users create an account and log their DSA questions with question url and what they learned from that question for an effective revsion.</p>
                    <div className="links">
                        <a href="https://grindbook.vercel.app/"><FaExternalLinkAlt /> Live Preview</a>
                        <a href="https://github.com/HarshJS30/grindbook"><FaExternalLinkAlt />GitHub</a>
                    </div>
                </div>
                <div className="pro">
                    <img src={pr2}></img>
                    <h4>Dobay</h4>
                    <p>Revamped the frontend of an agency’s website with clean, user-friendly interfaces, improving visual appeal. Collaborated to align design with brand identity.</p>
                    <div className="links">
                        <a href="https://dobay.vercel.app/"><FaExternalLinkAlt />Live Preview</a>
                    </div>
                </div>
            </div>
            <div className="project">
                <div className="pro">
                    <img src={pr3}></img>
                    <h4>Blojeet</h4>
                    <p>Blogjeet is a blogging website that lets people create blogs after signing up/logging in or they can guest login and view the blogs posted out there.</p>
                    <div className="links">
                        <a href="https://blogjeet.vercel.app/"><FaExternalLinkAlt />Live Preview</a>
                        <a href="https://github.com/HarshJS30/blogjeet"><FaExternalLinkAlt />GitHub</a>
                    </div>
                </div>
                <div className="pro">
                    <img src={pr4}></img>
                    <h4>Codejeet</h4>
                    <p>Codejeet is a website that helps you with currency exchange rates. It also has a quiz related to country's currency to make it more engaging.</p>
                    <div className="links">
                        <a href="https://codejeet-iehl.vercel.app/"><FaExternalLinkAlt />Live Preview</a>
                        <a href="https://github.com/HarshJS30/codejeet"><FaExternalLinkAlt />GitHub</a>
                    </div>
                </div>
            </div>
        </section>
    )
}