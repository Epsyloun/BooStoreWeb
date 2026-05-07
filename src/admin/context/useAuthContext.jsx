import React, {
  useContext,
  useMemo,
  useState,
  useCallback,
  useEffect,
} from "react";

const AuthContext = React.createContext();

//initial states
const initialProductState = {
  id: null,
  productId: null,
  sku: "",
  title: "",
  description: "",
  gridImage: "",
  images: [],
  categories: [],
  tags: [],
  price: 0,
  discountPrice: 0,
  discountPercentage: 0,
  featured: false,
  visibility: false,
  popularity: "low",
};
const privateProductState = {
  id: null,
  productId: null,
  stock: 0,
  profit: 0,
  profitMargin: 0,
  initialStock: 0,
  originalPrice: 0,
  shippingPrice: 0,
  taxesPrice: 0,
  finalPrice: 0,
};

function AuthProvider({ children }) {
  // Estados de autenticación
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState({
    ...initialProductState,
    ...privateProductState,
  });

  // Recuperar sesión guardada en localStorage al cargar la app
  useEffect(() => {
    const savedUser = localStorage.getItem("adminUser");
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
        setIsAuthenticated(true);
      } catch (e) {
        console.error("Error recuperando sesión:", e);
        localStorage.removeItem("adminUser");
      }
    }
    setLoading(false);
  }, []);

  // Handlers
  const login = useCallback((userData) => {
    if (!userData) {
      setError("Error: datos de usuario inválidos");
      return false;
    }
    // Guardar en localStorage para persistir la sesión
    localStorage.setItem("adminUser", JSON.stringify(userData));
    setUser(userData);
    setIsAuthenticated(true);
    setError(null);
    return true;
  }, []);

  const logout = useCallback(() => {
    // Limpiar localStorage
    localStorage.removeItem("adminUser");
    setUser(null);
    setIsAuthenticated(false);
    setError(null);
  }, []);

  const setAuthError = useCallback((errorMsg) => {
    setError(errorMsg);
  }, []);

  const finishLoading = useCallback(() => {
    setLoading(false);
  }, []);

  const authExports = useMemo(() => {
    return {
      // Values
      user,
      isAuthenticated,
      loading,
      error,
      selectedProduct,
      // Handlers
      login,
      logout,
      setAuthError,
      finishLoading,
      setSelectedProduct,
    };
  }, [
    user,
    isAuthenticated,
    loading,
    error,
    selectedProduct,
    login,
    logout,
    setAuthError,
    finishLoading,
  ]);

  return (
    <AuthContext.Provider value={authExports}>{children}</AuthContext.Provider>
  );
}

function useAuthContext() {
  const authInfo = useContext(AuthContext);
  if (authInfo === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return authInfo;
}

export { AuthProvider, useAuthContext };
