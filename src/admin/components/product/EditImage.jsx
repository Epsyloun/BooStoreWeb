import React, { useEffect, useState } from "react";
import {
  Drawer,
  Box,
  IconButton,
  Typography,
  TextField,
  Button,
  Stack,
  Divider,
  useTheme,
  Grid,
  Container,
} from "@mui/material";
import { FaTimes } from "react-icons/fa";
import { useAuthContext } from "../../context/useAuthContext";

export default function EditImage() {
  const { selectedProduct } = useAuthContext();
  const theme = useTheme();
  const [formData, setFormData] = useState(selectedProduct || {});

  useEffect(() => {
    setFormData(selectedProduct || {});
  }, [selectedProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <>
      {/* Contenido del formulario */}
      <Box
        sx={{
          py: 2,
          bgcolor: theme.palette.background.adminBackground,
          display: "flex",
          minHeight: "calc(100vh - 190px)",

          height: "100%",
        }}
      >
        <Container>
          <Grid container spacing={4}>
            <Grid
              size={{
                xs: 12,
                sm: 6,
                md: 4,
              }}
            >
              {/* Imagen */}
              <Box>
                <Typography variant="subtitle2" fontWeight="600" mb={1}>
                  Imagen Principal
                </Typography>
                {formData.gridImage && (
                  <img
                    src={formData.gridImage}
                    alt={formData.title}
                    style={{
                      width: "100%",
                      maxHeight: 300,
                      objectFit: "cover",
                      borderRadius: 8,
                      marginBottom: 16,
                    }}
                  />
                )}
                <TextField
                  fullWidth
                  label="URL de Imagen"
                  name="gridImage"
                  value={formData.gridImage || ""}
                  onChange={handleChange}
                  size="small"
                />
              </Box>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 8 }}>
              <Divider />

              {/* Precios */}
              <Box>
                <Typography variant="subtitle2" fontWeight="600" mb={2}>
                  Precios
                </Typography>
                <Stack spacing={2}>
                  <TextField
                    fullWidth
                    label="Precio"
                    name="price"
                    type="number"
                    value={formData.price || ""}
                    onChange={handleChange}
                    size="small"
                    inputProps={{ step: "0.01" }}
                  />
                  <TextField
                    fullWidth
                    label="Precio con Descuento"
                    name="discountPrice"
                    type="number"
                    value={formData.discountPrice || ""}
                    onChange={handleChange}
                    size="small"
                    inputProps={{ step: "0.01" }}
                  />
                  <TextField
                    fullWidth
                    label="Porcentaje de Descuento"
                    name="discountPercentage"
                    type="number"
                    value={formData.discountPercentage || ""}
                    onChange={handleChange}
                    size="small"
                    inputProps={{ step: "0.01" }}
                  />
                </Stack>
              </Box>

              <Divider />

              {/* Stock e Inventario */}
              <Box>
                <Typography variant="subtitle2" fontWeight="600" mb={2}>
                  Inventario
                </Typography>
                <Stack spacing={2}>
                  <TextField
                    fullWidth
                    label="Stock"
                    name="stock"
                    type="number"
                    value={formData.stock || ""}
                    onChange={handleChange}
                    size="small"
                  />
                </Stack>
              </Box>

              <Divider />

              {/* Visibilidad */}
              <Box>
                <Typography variant="subtitle2" fontWeight="600" mb={2}>
                  Configuración
                </Typography>
                <Stack spacing={2}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <input
                      type="checkbox"
                      name="visibility"
                      checked={formData.visibility || false}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          visibility: e.target.checked,
                        })
                      }
                    />
                    <Typography variant="body2">Visible en tienda</Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <input
                      type="checkbox"
                      name="featured"
                      checked={formData.featured || false}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          featured: e.target.checked,
                        })
                      }
                    />
                    <Typography variant="body2">Producto destacado</Typography>
                  </Box>
                </Stack>
              </Box>

              <Divider />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}
