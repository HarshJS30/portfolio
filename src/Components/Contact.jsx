import React from "react";
import '../assets/navbar.css';
import { FaGithub, FaInstagram } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { CiMail } from "react-icons/ci";

export default function Contact() {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData); // Replace with your logic
    alert(`Thanks for reaching out, ${formData.name}!`);
  };

  return (
    <section className="contact">
      <div className="connect">
        <h4>Get in Touch</h4>
        <p>Have questions? Reach out anytime or connect via socials.</p>
        <div className="icons">
          <FaGithub className="icon git-icon" />
          <FaInstagram className="icon insta-icon" />
          <BsTwitterX className="icon twitter-icon" />
          <CiMail className="icon mail-icon" />
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
          <button type="submit" className="submit-btn">
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}