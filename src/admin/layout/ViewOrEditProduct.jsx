import {
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  Stack,
  Tab,
  Tabs,
  Typography,
  useTheme,
  Snackbar,
  Alert,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import EditImage from "../components/product/EditImage";
import GeneralInfo from "../components/product/generalInfo";
import { useAuthContext } from "../context/useAuthContext";
import { getProductoInternoByProductId, saveOrUpdateProduct } from "../api/api";

const slideInFromRight = {
  "@keyframes slideInRight": {
    from: {
      opacity: 0,
      transform: "translateX(100px)",
    },
    to: {
      opacity: 1,
      transform: "translateX(0)",
    },
  },
  animation: "slideInRight 0.3s ease-out",
};

const slideInFromLeft = {
  "@keyframes slideInLeft": {
    from: {
      opacity: 0,
      transform: "translateX(-100px)",
    },
    to: {
      opacity: 1,
      transform: "translateX(0)",
    },
  },
  animation: "slideInLeft 0.3s ease-out",
};

export default function ViewOrEditProduct({ open, onClose, viewOrEditMode }) {
  const [value, setValue] = useState(0);
  const [prevValue, setPrevValue] = useState(0);
  const theme = useTheme();
  const handleChangeTab = (event, newValue) => {
    setPrevValue(value);
    setValue(newValue);
  };
  const getAnimationDirection = () => {
    return value > prevValue ? slideInFromRight : slideInFromLeft;
  };

  //Logica para cambio de datos del producto
  const { selectedProduct, setSelectedProduct } = useAuthContext();
  const [formData, setFormData] = useState(() =>
    JSON.parse(JSON.stringify(selectedProduct || {})),
  );
  const [isSaving, setIsSaving] = useState(false);
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success", // "success" | "error" | "warning" | "info"
  });

  //mandar a traer la informacion interna del producto cada vez que se seleccione uno nuevo desde el contexto
  // useEffect(() => {
  //   const fetchProductoInterno = async () => {
  //     if (selectedProduct && selectedProduct.id) {
  //       try {
  //         const result = await getProductoInternoByProductId(
  //           selectedProduct.id,
  //         );
  //         if (result.success && result.data) {
  //           setFormData((prevData) => ({
  //             ...prevData,
  //             ...result.data,
  //           }));
  //         } else {
  //           console.warn("No se encontraron datos internos para este producto");
  //         }
  //       } catch (error) {
  //         console.error("Error al obtener datos internos del producto:", error);
  //       }
  //     } else {
  //       console.warn(
  //         "No hay producto seleccionado para obtener datos internos",
  //       );
  //     }
  //   };

  //   fetchProductoInterno();
  // }, [selectedProduct]);

  useEffect(() => {
    // Actualizar formData cuando cambia selectedProduct desde el contexto
    const initialData = JSON.parse(JSON.stringify(selectedProduct || {}));
    if (!initialData.popularity) {
      initialData.popularity = "low";
    }
    setFormData(initialData);
  }, [selectedProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Solo actualizar la copia local, NO el contexto
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);

      // Guardar en Firebase/API
      const result = await saveOrUpdateProduct(formData);

      if (result.success) {
        // Actualizar el contexto con los cambios
        setSelectedProduct(JSON.parse(JSON.stringify(formData)));

        // Mostrar mensaje de éxito
        setNotification({
          open: true,
          message: result.message,
          severity: "success",
        });

        // Cerrar el modal después de 2 segundos
        setTimeout(() => {
          onClose();
        }, 2000);

        //console.log("Cambios guardados:", formData);
      } else {
        // Mostrar mensaje de error
        setNotification({
          open: true,
          message: result.message || "Error al guardar el producto",
          severity: "error",
        });
        console.error("Error al guardar:", result.error);
      }
    } catch (error) {
      console.error("Error:", error);
      setNotification({
        open: true,
        message: error.message || "Error inesperado al guardar",
        severity: "error",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleCloseNotification = (event, reason) => {
    if (reason === "clickaway") return;
    setNotification({ ...notification, open: false });
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: "100%",
          overflowX: "hidden",
          bgcolor: theme.palette.background.adminBackground,
        },
      }}
    >
      <TitleSection onClose={onClose} />
      <Box
        id="tabs-container"
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          width: "100%",
        }}
      >
        <Container>
          <Tabs
            value={value}
            onChange={handleChangeTab}
            aria-label="basic tabs"
            variant="fullWidth"
            sx={{
              width: "100%",
              "& .MuiTabs-flexContainer": {
                width: "100%",
              },
              "& .MuiTabs-indicator": {
                backgroundColor: theme.palette.secondary.main,
              },
              "& .MuiTab-root": {
                color: theme.palette.text.primary,
                flex: 1,
                "&.Mui-selected": {
                  color: theme.palette.secondary.main,
                },
              },
            }}
          >
            <Tab label="Información" />
            <Tab label="Imágenes" />
            <Tab label="Estadísticas" />
          </Tabs>
        </Container>
      </Box>
      {value === 0 && (
        <Box role="tabpanel" sx={getAnimationDirection()}>
          <GeneralInfo
            formData={formData}
            handleChange={handleChange}
            setFormData={setFormData}
          />
        </Box>
      )}
      {value === 1 && (
        <Box role="tabpanel" sx={getAnimationDirection()}>
          <EditImage />
        </Box>
      )}
      {value === 2 && (
        <Box role="tabpanel" sx={getAnimationDirection()}>
          Item Three
        </Box>
      )}
      <ActionButtons
        onClose={onClose}
        handleSave={handleSave}
        isSaving={isSaving}
      />

      {/* Snackbar para notificaciones */}
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseNotification}
          severity={notification.severity}
          sx={{ width: "100%" }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Drawer>
  );
}

/* Header con título y botón cerrar */
const TitleSection = ({ onClose }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        bgcolor: theme.palette.background.paper,
        justifyContent: "space-between",
        alignItems: "center",
        py: 2,
        px: 4,
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Typography variant="h6" fontWeight="bold">
        Editar Producto
      </Typography>
      <IconButton
        onClick={onClose}
        sx={{
          color: theme.palette.text.primary,
          "&:hover": {
            backgroundColor: theme.palette.action.hover,
          },
        }}
      >
        <FaTimes size={20} />
      </IconButton>
    </Box>
  );
};

/* Botones de acción */
const ActionButtons = ({ onClose, handleSave, isSaving }) => {
  return (
    <Box
      sx={{
        bgcolor: "background.paper",
      }}
    >
      <Container>
        <Stack direction="row" spacing={2} sx={{ px: 4, py: 2, width: "100%" }}>
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            onClick={onClose}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            fullWidth
            color="primary"
            loading={isSaving}
            onClick={handleSave}
          >
            Guardar Cambios
          </Button>
        </Stack>
      </Container>
    </Box>
  );
};
