import React from "react";
import { useNavigate } from "react-router-dom";

export default function Products() {
  const navigate = useNavigate();
  return (
    <div>
      <main>
        <h1>Products</h1>
        <button onClick={() => navigate("/")}>back home</button>
      </main>
    </div>
  );
}
