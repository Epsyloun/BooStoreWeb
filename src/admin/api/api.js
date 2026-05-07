import {
  getFirestore,
  collection,
  getDocs,
  setDoc,
  updateDoc,
  addDoc,
  doc,
  query,
  where,
} from "firebase/firestore";

const db = getFirestore();

// Obtener todos los productos con su información interna combinada
export const getAllProductsWithInternal = async () => {
  try {
    // Obtener todos los productos públicos
    const querySnapshot = await getDocs(collection(db, "productos"));

    const products = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Para cada producto, obtener su información interna
    const productsWithInternal = await Promise.all(
      products.map(async (product) => {
        try {
          const q = query(
            collection(db, "ProductoInterno"),
            where("productId", "==", product.id),
          );

          const internalSnapshot = await getDocs(q);

          if (!internalSnapshot.empty) {
            const internalData = internalSnapshot.docs[0].data();
            return {
              ...product,
              ...internalData,
            };
          }

          return product;
        } catch (error) {
          console.warn(
            `No se encontró ProductoInterno para producto ${product.id}:`,
            error,
          );
          return product;
        }
      }),
    );

    return productsWithInternal;
  } catch (error) {
    console.error("Error obteniendo productos con información interna:", error);
    return [];
  }
};

// traer todos los productos (DEPRECATED - usar getAllProductsWithInternal)
export const getProducts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "productos"));

    //console.log("Productos obtenidos:", querySnapshot);

    const products = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    //console.log("Productos formateados:", products);

    return products;
  } catch (error) {
    console.error("Error obteniendo productos:", error);
    return [];
  }
};

// Guardar o actualizar producto con datos públicos y privados
export const saveOrUpdateProduct = async (formData) => {
  try {
    // Datos públicos del producto
    const publicProductData = {
      sku: formData.sku || "",
      title: formData.title || "",
      description: formData.description || "",
      gridImage: formData.gridImage || "",
      images: formData.images || [],
      categories: formData.categories || [],
      tags: formData.tags || [],
      price: parseFloat(formData.price) || 0,
      discountPrice: parseFloat(formData.discountPrice) || 0,
      discountPercentage: parseFloat(formData.discountPercentage) || 0,
      featured: formData.featured || false,
      visibility: formData.visibility || false,
      popularity: formData.popularity || "low",
      createdAt: formData.createdAt || new Date(),
      updatedAt: new Date(),
    };

    // Datos privados del producto
    const privateProductData = {
      stock: parseFloat(formData.stock) || 0,
      profit: parseFloat(formData.profit) || 0,
      profitMargin: parseFloat(formData.profitMargin) || 0,
      initialStock: parseFloat(formData.initialStock) || 0,
      originalPrice: parseFloat(formData.originalPrice) || 0,
      shippingPrice: parseFloat(formData.shippingPrice) || 0,
      taxesPrice: parseFloat(formData.taxesPrice) || 0,
      finalPrice: parseFloat(formData.finalPrice) || 0,
      createdAt: formData.createdAt || new Date(),
      updatedAt: new Date(),
    };

    let productId = formData.id;

    // Si es un nuevo producto
    if (!productId) {
      // Insertar en collection "productos"
      const docRef = await addDoc(
        collection(db, "productos"),
        publicProductData,
      );
      productId = docRef.id;

      // Insertar en collection "ProductoInterno" con el mismo ID
      privateProductData.productId = productId;
      await setDoc(doc(db, "ProductoInterno", productId), privateProductData);

      //console.log("Producto creado exitosamente con ID:", productId);
      return {
        success: true,
        id: productId,
        message: "Producto creado exitosamente",
      };
    } else {
      // Si es una actualización
      // Actualizar en collection "productos"
      await updateDoc(doc(db, "productos", productId), publicProductData);

      // Actualizar o crear en collection "ProductoInterno" (merge: true crea si no existe)
      privateProductData.productId = productId;
      await setDoc(doc(db, "ProductoInterno", productId), privateProductData, {
        merge: true,
      });

      //console.log("Producto actualizado exitosamente con ID:", productId);
      return {
        success: true,
        id: productId,
        message: "Producto actualizado exitosamente",
      };
    }
  } catch (error) {
    console.error("Error al guardar/actualizar producto:", error);
    return {
      success: false,
      error: error.message,
      message: "Error al procesar el producto",
    };
  }
};

// Obtener ProductoInterno por productId
export const getProductoInternoByProductId = async (productId) => {
  try {
    if (!productId) {
      return {
        success: false,
        error: "productId es requerido",
        message: "productId no proporcionado",
      };
    }

    const q = query(
      collection(db, "ProductoInterno"),
      where("productId", "==", productId),
    );

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return {
        success: false,
        error: "No se encontró ProductoInterno",
        message: "No hay datos privados para este producto",
        data: null,
      };
    }

    // Tomar el primer documento (debería haber solo uno)
    const doc = querySnapshot.docs[0];
    const productoInterno = {
      id: doc.id,
      ...doc.data(),
    };

    //console.log("ProductoInterno obtenido:", productoInterno);
    return {
      success: true,
      message: "ProductoInterno obtenido exitosamente",
      data: productoInterno,
    };
  } catch (error) {
    console.error("Error al obtener ProductoInterno:", error);
    return {
      success: false,
      error: error.message,
      message: "Error al obtener datos privados del producto",
      data: null,
    };
  }
};
