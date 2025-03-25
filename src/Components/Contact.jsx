import React, { useState } from "react";
import emailjs from '@emailjs/browser';
import { FaGithub, FaInstagram } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { CiMail } from "react-icons/ci";
import '../assets/navbar.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Replace these with your EmailJS IDs
    emailjs.send(
      'service_pb94wph',   // EmailJS Service ID
      'template_foisjm2',  // EmailJS Template ID
      formData,
      'ZaJtUhFqr4yuXPSBy'       // EmailJS User ID (Public Key)
    )
    .then((response) => {
      setSubmitStatus("success");
      setFormData({ name: "", email: "", message: "" });
    })
    .catch((error) => {
      setSubmitStatus("error");
      console.error("EmailJS error:", error);
    })
    .finally(() => {
      setIsSubmitting(false);
    });
  };

  return (
    <section className="contact">
      <div className="connect">
        <h4>Get in Touch</h4>
        <p>Have questions? Reach out anytime or connect via socials.</p>
        <div className="icons">
          <FaGithub className="icon git-icon" onClick={() => window.open("https://github.com/HarshJS30", "_blank")}/>
          <FaInstagram className="icon insta-icon" onClick={() => window.open("https://www.instagram.com/notreallyy.harsh/", "_blank")}/>
          <BsTwitterX className="icon twitter-icon" onClick={() => window.open("https://x.com/except1onn", "_blank")}/>
          <CiMail className="icon mail-icon" onClick={() => window.location.href = "mailto:srivastavaharsh894@gmail.com"}/>
        </div>
      </div>

      <div className="form">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="input-field"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            className="input-field"
            required
          />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message..."
            className="input-field textarea"
            rows="5"
            required
          />
          <button 
            type="submit" 
            className="submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>

          {submitStatus === "success" && (
            <p className="success-message">Message sent successfully!</p>
          )}
          {submitStatus === "error" && (
            <p className="error-message">Failed to send. Please try again.</p>
          )}
        </form>
      </div>
    </section>
  );
}