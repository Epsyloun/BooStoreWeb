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
        // Filtrar solo productos no archivados y visibles
        const cleanData = data
          .filter(
            (product) =>
              product.archived !== true && product.visibility === true,
          )
          .map((product) => {
            return {
              ...product,
            };
          });
        handleProducts(cleanData);
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
