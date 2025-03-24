import React from "react";
import Marquee from "react-fast-marquee";
import '../assets/navbar.css';

export default function Tools() {
    return (
        <section className="tools">
            <h2><span>Tools</span>I Have Used</h2>
            <Marquee pauseOnHover="true" speed={30}>
                <div className="tool">
                    <i class="devicon-html5-plain colored"></i>
                    <p>HTML</p>
                </div>
                <div className="tool">
                    <i class="devicon-css3-plain colored"></i>
                    <p>CSS</p>
                </div>
                <div className="tool">
                    <i class="devicon-javascript-plain colored"></i>
                    <p>Javascript</p>
                </div>
                <div className="tool">
                    <i class="devicon-typescript-plain colored"></i>
                    <p>Typescript</p>
                </div>
                <div className="tool">
                    <i class="devicon-python-plain colored"></i>
                    <p>Python</p>
                </div>
                <div className="tool">
                    <i class="devicon-python-plain colored"></i>
                    <p>React</p>
                </div>
            </Marquee>
            <Marquee pauseOnHover="true" direction="right" className="mar2" speed={30}>
                <div className="tool">
                    <i class="devicon-mongodb-plain colored"></i>
                    <p>MongoDB</p>
                </div>
                <div className="tool">
                    <i class="devicon-bootstrap-plain colored"></i>
                    <p>Bootstrap</p>
                </div>
                <div className="tool">
                    <i class="devicon-tailwindcss-original colored"></i>
                    <p>Tailwind</p>
                </div>
                <div className="tool">
                    <i class="devicon-tailwindcss-original colored"></i>
                    <p>Node.js</p>
                </div>
                <div className="tool">
                    <i class="devicon-express-original"></i>
                    <p>Express.js</p>
                </div>
                <div className="tool">
                    <p>Zod</p>
                </div>
                <div className="tool">
                    <i class="devicon-git-plain colored"></i>
                    <p>Git</p>
                </div>
                <div className="tool">
                    <i class="devicon-vercel-original"></i>
                    <p>Vercel</p>
                </div>
            </Marquee>
        </section>
    );
}