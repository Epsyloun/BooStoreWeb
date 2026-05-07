import React, { useEffect } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";

import { getProducts } from "../api";
import { useBooContext } from "../context/useBooContext";
import AdminRoutes from "../admin/routes/AdminRoutes";
import PublicLayout from "../layouts/PublicLayout";
import PublicRoutes from "./PublicRoutes";

export default function MainApp() {
  const { handleProducts } = useBooContext();
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        handleProducts(data);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <HashRouter>
      <Routes>
        {/* RUTAS PÚBLICAS */}
        <Route path="/*" element={<PublicRoutes />} />

        {/* RUTAS DE ADMIN */}
        <Route path="/admin/*" element={<AdminRoutes />} />
      </Routes>
    </HashRouter>
  );
}
