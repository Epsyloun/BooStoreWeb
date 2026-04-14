import React, { useContext, useMemo, useState, useCallback } from "react";

const BooContext = React.createContext();

function BooProvider({ children }) {
  //states
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  //handlers
  const handleProducts = useCallback((newProducts) => {
    setProducts(newProducts);
    setLoading(false);
  }, []);

  const booExports = useMemo(() => {
    return {
      //values
      products,
      loading,
      //handlers
      handleProducts,
    };
  }, [products, loading, handleProducts]);
  return (
    <BooContext.Provider value={booExports}>{children}</BooContext.Provider>
  );
}

function useBooContext() {
  const booInfo = useContext(BooContext);
  if (booInfo === undefined) {
    throw new Error("useBooContext must be used within a BooProvider");
  }
  return booInfo;
}

// eslint-disable-next-line react-refresh/only-export-components
export { BooProvider, useBooContext };
