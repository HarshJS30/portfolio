// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Portfolio from "./Components/Portfolio";
import Projects from "./Components/Projects";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/projects" element={<Projects />} />
      </Routes>
    </BrowserRouter>
  );
}