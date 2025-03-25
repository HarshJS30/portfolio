import React from "react";
import { motion } from "framer-motion";
import '../assets/navbar.css';
import UnderlineSvg from "./Underlinesvg";

const transition = { 
  duration: 1.3, 
  ease: [0.25, 0.1, 0.25, 1] 
};

const textVariants = {
  hidden: { filter: "blur(10px)", opacity: 0, y: 20 },
  visible: { filter: "blur(0px)", opacity: 1, y: 0 }
};

export default function About() {
  return (
    <motion.section 
      className="about"
      initial="hidden"
      animate="visible"
      transition={{ staggerChildren: 0.1 }}
    >
      <div className="text">
        <motion.h2 variants={textVariants} transition={transition}>
          Hi, I'm <span className="name-span">Harsh Srivastava</span>
        </motion.h2>
        
        <motion.p variants={textVariants} transition={transition}>
          I'm curious about how things work—whether it's 
          <motion.u className="custom-underline" variants={textVariants}>
            code<UnderlineSvg />
          </motion.u>, history, or everyday problems. I enjoy building, breaking, and learning as I go. I've had the chance to mess around with a few real projects, nothing too fancy, but it's taught me a lot. Still figuring things out, and I reckon that's the <motion.u className="custom-underline" variants={textVariants}>
            good part<UnderlineSvg />
          </motion.u>. Feel free to <motion.u className="custom-underline" variants={textVariants}>
            reach out<UnderlineSvg />
          </motion.u> to me anytime.
        </motion.p>
      </div>
      
      <motion.div 
        className="cta"
        variants={textVariants}
        transition={transition}
      >
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={()=>window.open("https://x.com/except1onn", "_blank", "noopener,noreferrer")}>
          Say Hi
        </motion.button>
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => window.location.href = "mailto:srivastavaharsh894@gmail.com"}>
          Collaborate?
        </motion.button>
      </motion.div>
    </motion.section>
  );
}