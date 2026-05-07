import React from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import ProtectedRoutes from "../utils/ProtectedRoutes";
import { AuthProvider } from "../context/useAuthContext";
import AdminLayout from "../../layouts/AdminLayout";
import AdminDashboard from "../pages/AdminDashboard";
import AdminUsers from "../pages/AdminUsers";
import AdminProducts from "../pages/AdminProducts";
import AdminSettings from "../pages/AdminSettings";
import AdminLogin from "../pages/AdminLogin";

/**
 * Componente que define todas las rutas del panel de admin
 * Estructura:
 * - Ruta de login: /admin/login (sin protección, pero redirige si ya está autenticado)
 * - Rutas protegidas: /admin/home, /admin/users, /admin/products, /admin/settings
 *
 * Todas envueltas en AuthProvider para tener contexto de autenticación
 * Las rutas protegidas usan AdminLayout (sin Navbar ni Footer)
 */
export default function AdminRoutes() {
  return (
    <AuthProvider>
      <Routes>
        {/* Rutas protegidas - con AdminLayout */}
        <Route element={<AdminLayout />}>
          {/* Ruta de login - no protegida, pero AdminLogin redirige si ya está autenticado */}
          <Route path="/login" element={<AdminLogin />} />

          {/* Ruta raíz de admin - PROTEGIDA */}
          <Route
            path="/home"
            element={
              <ProtectedRoutes>
                <AdminDashboard />
              </ProtectedRoutes>
            }
          />

          {/* Gestión de usuarios - PROTEGIDA */}
          <Route
            path="/users"
            element={
              <ProtectedRoutes>
                <AdminUsers />
              </ProtectedRoutes>
            }
          />

          {/* Gestión de productos - PROTEGIDA */}
          <Route
            path="/products"
            element={
              <ProtectedRoutes>
                <AdminProducts />
              </ProtectedRoutes>
            }
          />

          {/* Configuraciones - PROTEGIDA */}
          <Route
            path="/settings"
            element={
              <ProtectedRoutes>
                <AdminSettings />
              </ProtectedRoutes>
            }
          />

          {/* Ruta por defecto para /admin/* - redirige a /admin/home */}
          <Route path="*" element={<Navigate to="/admin/home" replace />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}
