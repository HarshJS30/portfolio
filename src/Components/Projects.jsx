import React from "react";
import '../assets/navbar.css';
import { FaExternalLinkAlt } from "react-icons/fa";
import pr1 from '../assets/pr1.png';
import pr2 from '../assets/pr2.png';
import pr3 from '../assets/pr3.png';
import pr4 from '../assets/pr4.png';
import pr5 from '../assets/pr5.png';
import pr6 from '../assets/pr6.png';
import pr7 from '../assets/pr7.png';
import pr8 from '../assets/pr8.png';

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
                    <p>Revamped the frontend of an agency’s website with clean interfaces, improving visual appeal. Collaborated to align design with brand identity.</p>
                    <div className="links">
                        <a href="https://dobay.vercel.app/"><FaExternalLinkAlt />Live Preview</a>
                    </div>
                </div>
            </div>
            <div className="project">
                <div className="pro">
                    <img src={pr3}></img>
                    <h4>Anon</h4>
                    <p>Anon lets you chat instantly without signing up. Create a room, share the code, and start conversations with anyone.</p>
                    <div className="links">
                        <a href="https://anon-mu-one.vercel.app/"><FaExternalLinkAlt />Live Preview</a>
                        <a href="https://github.com/HarshJS30/anon"><FaExternalLinkAlt />GitHub</a>
                    </div>
                </div>
                <div className="pro">
                    <img src={pr7}></img>
                    <h4>Dashboard</h4>
                    <p>Dashboard is a government personnel management system that enables quick access to departmental staff information.</p>
                    <div className="links">
                        <a href="https://dashboard-livid-two-18.vercel.app/"><FaExternalLinkAlt />Live Preview</a>
                    </div>
                </div>
            </div>
            <div className="project">
                <div className="pro">
                    <img src={pr5}></img>
                    <h4>OneDSA</h4>
                    <p>OneDSA is a website that helps you sharpen your coding skills one day at a time with a curated list of 100 DSA questions. Get a new challenge every day, complete with tags and direct links to try it out.</p>
                    <div className="links">
                        <a href="https://onedsa.vercel.app/"><FaExternalLinkAlt />Live Preview</a>
                        <a href="https://github.com/HarshJS30/onedsa"><FaExternalLinkAlt />GitHub</a>
                    </div>
                </div>
                <div className="pro">
                    <img src={pr8}></img>
                    <h4>Memory Drop</h4>
                    <p>A frontend design for a self-messaging app that enables users to schedule messages to themselves. Currently demonstrates the UI/UX concept without backend functionality.</p>
                    <div className="links">
                        <a href="https://memory-drop.vercel.app/"><FaExternalLinkAlt />Live Preview</a>
                        <a href="https://github.com/HarshJS30/memoryDrop"><FaExternalLinkAlt />GitHub</a>
                    </div>
                </div>
            </div>
            <div className="project">
                <div className="pro">
                    <img src={pr4}></img>
                    <h4>CodeJeet</h4>
                    <p>Codejeet is a website that helps you with currency exchange rates. It also has a quiz related to country's currency to make it more engaging</p>
                    <div className="links">
                        <a href="https://codejeet-iehl.vercel.app/"><FaExternalLinkAlt />Live Preview</a>
                        <a href="https://github.com/HarshJS30/codejeet"><FaExternalLinkAlt />GitHub</a>
                    </div>
                </div>
                <div className="pro">
                    <img src={pr6}></img>
                    <h4>Dump</h4>
                    <p>It is a personal website to jot down everything I read and think about—raw, unfiltered, and personal. From ideas to summaries, it’s just me making sense of things in my own words.</p>
                    <div className="links">
                        <a href="https://dump-nine.vercel.app/"><FaExternalLinkAlt />Live Preview</a>
                        <a href="https://github.com/HarshJS30/dump"><FaExternalLinkAlt />GitHub</a>
                    </div>
                </div>
            </div>
        </section>
    )
}