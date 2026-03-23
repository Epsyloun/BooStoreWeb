import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/home";
import Products from "../pages/Products";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Navbar from "../containers/Navbar";

export default function MainApp() {
  return (
    <>
      <HashRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route
            path="/products/:category"
            element={<h1>Product category</h1>}
          />
          <Route path="/products/:id" element={<h1>Product Details</h1>} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </HashRouter>
    </>
  );
}
