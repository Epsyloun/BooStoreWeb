/**
 * Patrones Avanzados de Autenticación y Autorización
 * 
 * Este archivo contiene ejemplos de cómo implementar:
 * - Protección de rutas por rol
 * - Permisos granulares
 * - Verificación de permisos específicos
 */

import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/useAuthContext";
import { Box, CircularProgress, Alert } from "@mui/material";

/**
 * Componente para proteger rutas por rol
 * 
 * Uso:
 * <RoleProtectedRoute requiredRole="admin">
 *   <AdminDashboard />
 * </RoleProtectedRoute>
 */
export function RoleProtectedRoute({ children, requiredRole, redirectTo = "/unauthorized" }) {
  const { user, loading, isAuthenticated } = useAuthContext();

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user?.role !== requiredRole) {
    return <Navigate to={redirectTo} replace />;
  }

  return children;
}

/**
 * Componente para proteger rutas que requieren múltiples roles
 * 
 * Uso:
 * <MultiRoleProtectedRoute requiredRoles={["admin", "moderator"]}>
 *   <ContentManagement />
 * </MultiRoleProtectedRoute>
 */
export function MultiRoleProtectedRoute({ 
  children, 
  requiredRoles, 
  redirectTo = "/unauthorized" 
}) {
  const { user, loading, isAuthenticated } = useAuthContext();

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!requiredRoles.includes(user?.role)) {
    return <Navigate to={redirectTo} replace />;
  }

  return children;
}

/**
 * Componente para proteger rutas que requieren permisos específicos
 * 
 * Uso:
 * <PermissionProtectedRoute requiredPermission="write:products">
 *   <ProductEditor />
 * </PermissionProtectedRoute>
 */
export function PermissionProtectedRoute({ 
  children, 
  requiredPermission, 
  redirectTo = "/unauthorized" 
}) {
  const { user, loading, isAuthenticated } = useAuthContext();

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Verificar si el usuario tiene el permiso
  const hasPermission = user?.permissions?.includes(requiredPermission) || false;

  if (!hasPermission) {
    return <Navigate to={redirectTo} replace />;
  }

  return children;
}

/**
 * Hook para verificar si el usuario tiene un rol específico
 * 
 * Uso:
 * const isAdmin = useHasRole("admin");
 * if (isAdmin) { /* renderizar algo */ }
 */
export function useHasRole(role) {
  const { user } = useAuthContext();
  return user?.role === role;
}

/**
 * Hook para verificar si el usuario tiene uno de varios roles
 * 
 * Uso:
 * const canManageContent = useHasAnyRole(["admin", "moderator"]);
 */
export function useHasAnyRole(roles) {
  const { user } = useAuthContext();
  return roles.includes(user?.role);
}

/**
 * Hook para verificar si el usuario tiene un permiso específico
 * 
 * Uso:
 * const canDeleteProducts = useHasPermission("delete:products");
 */
export function useHasPermission(permission) {
  const { user } = useAuthContext();
  return user?.permissions?.includes(permission) || false;
}

/**
 * Hook para verificar si el usuario tiene todos los permisos requeridos
 * 
 * Uso:
 * const canManageUsers = useHasAllPermissions(["read:users", "write:users"]);
 */
export function useHasAllPermissions(permissions) {
  const { user } = useAuthContext();
  return permissions.every(perm => user?.permissions?.includes(perm));
}

/**
 * Hook para verificar si el usuario tiene al menos uno de los permisos
 * 
 * Uso:
 * const canViewReports = useHasAnyPermission(["read:reports", "admin"]);
 */
export function useHasAnyPermission(permissions) {
  const { user } = useAuthContext();
  return permissions.some(perm => user?.permissions?.includes(perm));
}

/**
 * Componente para renderizar condicional basado en rol
 * 
 * Uso:
 * <RoleGate roles={["admin", "moderator"]}>
 *   <AdminPanel />
 * </RoleGate>
 * <RoleGate roles={["admin", "moderator"]} fallback={<AccessDenied />}>
 *   <AdminPanel />
 * </RoleGate>
 */
export function RoleGate({ children, roles, fallback = null }) {
  const { user } = useAuthContext();

  if (roles.includes(user?.role)) {
    return children;
  }

  return fallback;
}

/**
 * Componente para renderizar condicional basado en permisos
 * 
 * Uso:
 * <PermissionGate permission="write:products">
 *   <EditButton />
 * </PermissionGate>
 */
export function PermissionGate({ children, permission, fallback = null }) {
  const hasPermission = useHasPermission(permission);

  if (hasPermission) {
    return children;
  }

  return fallback;
}

/**
 * Ejemplo de estructura de datos de usuario con roles y permisos
 * 
 * ```
 * user = {
 *   uid: "abc123",
 *   email: "admin@example.com",
 *   displayName: "Admin User",
 *   role: "admin",
 *   permissions: [
 *     "read:products",
 *     "write:products",
 *     "delete:products",
 *     "read:users",
 *     "write:users",
 *     "delete:users",
 *   ],
 * }
 * ```
 */

/**
 * Ejemplo de uso en AdminRoutes.jsx
 * 
 * ```jsx
 * import { RoleProtectedRoute, MultiRoleProtectedRoute } from "./patterns";
 * 
 * <Route
 *   path="/admin"
 *   element={
 *     <RoleProtectedRoute requiredRole="admin">
 *       <AdminDashboard />
 *     </RoleProtectedRoute>
 *   }
 * />
 * 
 * <Route
 *   path="/admin/content"
 *   element={
 *     <MultiRoleProtectedRoute requiredRoles={["admin", "editor"]}>
 *       <ContentManagement />
 *     </MultiRoleProtectedRoute>
 *   }
 * />
 * ```
 */
