import React, { useState } from "react";
import {
  Box,
  IconButton,
  Typography,
  Button,
  Stack,
  useTheme,
  Grid,
  Container,
  CircularProgress,
  alpha,
  Alert,
} from "@mui/material";
import {
  FaTrash,
  FaPlus,
  FaImage,
  FaImages,
  FaGripVertical,
} from "react-icons/fa";
import { TitleSection } from "../product/generalInfo";
import { optimizeImage } from "../../utils/optimizeImage";

export default function EditImage({ formData, onUpdateFormData }) {
  const theme = useTheme();
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [isProcessingGrid, setIsProcessingGrid] = useState(false);
  const [isProcessingCarousel, setIsProcessingCarousel] = useState(false);

  const images = formData?.images || [];

  // Manejar upload de imagen de grid
  const handleGridImageUpload = async (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    try {
      setIsProcessingGrid(true);

      const optimizedFile = await optimizeImage({
        file,
        convertToWebP: true,
        resize: true,
        width: 400,
        height: 400,
        quality: 0.8,
      });

      const preview = URL.createObjectURL(optimizedFile);

      onUpdateFormData({
        gridImage: {
          preview,
          file: optimizedFile,
          fileName: optimizedFile.name,
          status: "ready",
        },
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsProcessingGrid(false);
    }
  };

  // Eliminar imagen de grid
  const handleDeleteGridImage = () => {
    onUpdateFormData({
      gridImage: "",
    });
  };

  // Manejar upload de imágenes del carrusel
  const handleCarouselImageUpload = async (e) => {
    const files = e.target.files;
    const MAX_IMAGES = 20;

    if (!files) return;

    try {
      setIsProcessingCarousel(true);

      const remainingSlots = MAX_IMAGES - images.length;

      const filesToProcess = Array.from(files).slice(0, remainingSlots);

      const maxOrder =
        images.length > 0
          ? Math.max(...images.map((img) => img.order || 0))
          : 0;

      const optimizedImages = await Promise.all(
        filesToProcess.map(async (file, index) => {
          const optimizedFile = await optimizeImage({
            file,
            convertToWebP: true,
            resize: true,
            width: 1200,
            height: 1200,
            quality: 0.85,
          });

          return {
            order: maxOrder + index + 1,

            preview: URL.createObjectURL(optimizedFile),

            file: optimizedFile,

            fileName: optimizedFile.name,

            status: "ready",
          };
        }),
      );

      onUpdateFormData({
        images: [...images, ...optimizedImages],
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsProcessingCarousel(false);
    }
  };

  // Eliminar imagen del carrusel
  const handleDeleteCarouselImage = (index) => {
    const updatedImages = images
      .filter((_, i) => i !== index)
      .map((img, idx) => ({
        ...img,
        order: idx + 1,
      }));
    onUpdateFormData({
      images: updatedImages,
    });
  };

  // Drag start
  const handleDragStart = (index) => {
    setDraggedIndex(index);
  };

  // Drag over
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Drop
  const handleDrop = (dropIndex) => {
    if (draggedIndex === null || draggedIndex === dropIndex) return;

    const newImages = [...images];
    const draggedImage = newImages[draggedIndex];

    // Remover el elemento arrastra do
    newImages.splice(draggedIndex, 1);
    // Insertar en la nueva posición
    newImages.splice(dropIndex, 0, draggedImage);

    // Actualizar órdenes
    const reorderedImages = newImages.map((img, idx) => ({
      ...img,
      order: idx + 1,
    }));

    onUpdateFormData({
      images: reorderedImages,
    });

    setDraggedIndex(null);
  };

  return (
    <>
      {/* Contenido del formulario */}
      <Box
        sx={{
          py: 2,
          background: `linear-gradient(0deg, ${alpha(theme.palette.primary.background, 0.8)} 0%, ${alpha(theme.palette.primary.accent, 0.8)} 100%)`,
          overflowY: "auto",
          minHeight: "calc(100vh - 190px)",
          height: "100%",
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            {/* BLOQUE 1: IMAGEN DE GRID */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Box
                bgcolor={alpha(theme.palette.background.adminBox, 0.5)}
                p={4}
                borderRadius={2}
              >
                <Stack spacing={2}>
                  <TitleSection
                    title="Imagen de Grid"
                    subtitle="400x400 - Se muestra en la grilla de productos"
                    icon={
                      <FaImage size={24} color={theme.palette.primary.light} />
                    }
                    bgcolor={alpha(theme.palette.primary.main, 0.25)}
                  />

                  {/* Preview de imagen */}
                  {formData.gridImage?.preview || formData.gridImage?.url ? (
                    <Box
                      sx={{
                        position: "relative",
                        borderRadius: 2,
                        overflow: "hidden",
                        bgcolor: "#f5f5f5",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                        height: 300,
                      }}
                    >
                      {isProcessingGrid && (
                        <Box
                          sx={{
                            position: "absolute",
                            inset: 0,
                            bgcolor: "rgba(0,0,0,0.5)",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            zIndex: 20,
                          }}
                        >
                          <CircularProgress color="inherit" />
                        </Box>
                      )}
                      <img
                        src={
                          formData.gridImage.preview || formData.gridImage.url
                        }
                        alt="Grid"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                      <IconButton
                        onClick={handleDeleteGridImage}
                        sx={{
                          position: "absolute",
                          top: 8,
                          right: 8,
                          bgcolor: "rgba(0,0,0,0.7)",
                          color: "white",
                          "&:hover": {
                            bgcolor: "rgba(0,0,0,0.9)",
                          },
                        }}
                        size="small"
                      >
                        <FaTrash size={14} />
                      </IconButton>
                    </Box>
                  ) : (
                    <Box
                      sx={{
                        p: 3,
                        border: "2px dashed",
                        borderColor: theme.palette.primary.main,
                        borderRadius: 2,
                        textAlign: "center",
                        bgcolor: alpha(theme.palette.primary.main, 0.05),
                        height: 300,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <FaPlus size={32} color={theme.palette.primary.main} />
                      <Typography variant="body2" color="textSecondary" mt={1}>
                        Selecciona una imagen
                      </Typography>
                    </Box>
                  )}

                  {/* Upload button */}
                  <Button
                    variant="contained"
                    component="label"
                    fullWidth
                    startIcon={<FaPlus />}
                  >
                    Subir Imagen de Grid
                    <input
                      hidden
                      accept="image/*"
                      type="file"
                      onChange={handleGridImageUpload}
                    />
                  </Button>
                </Stack>
              </Box>
            </Grid>

            {/* BLOQUE 2: IMÁGENES DEL CARRUSEL */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Box
                bgcolor={alpha(theme.palette.background.adminBox, 0.5)}
                p={4}
                borderRadius={2}
              >
                <Stack spacing={2}>
                  <TitleSection
                    title="Imágenes del Carrusel"
                    subtitle="Máximo 20 imágenes para el detalle del producto"
                    icon={
                      <FaImages
                        size={24}
                        color={theme.palette.secondary.light}
                      />
                    }
                    bgcolor={alpha(theme.palette.secondary.main, 0.25)}
                  />

                  {images.length >= 20 && (
                    <Alert severity="warning">
                      Has alcanzado el límite máximo de 20 imágenes
                    </Alert>
                  )}

                  {/* Grid de imágenes del carrusel */}
                  <Grid container spacing={2}>
                    {images.map((image, index) => (
                      <Grid size={{ xs: 6, sm: 4 }} key={index}>
                        <Box
                          draggable
                          onDragStart={() => handleDragStart(index)}
                          onDragOver={handleDragOver}
                          onDrop={() => handleDrop(index)}
                          sx={{
                            position: "relative",
                            borderRadius: 1,
                            overflow: "hidden",
                            bgcolor: "#f5f5f5",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            aspectRatio: "1/1",
                            cursor: "grab",
                            "&:active": {
                              cursor: "grabbing",
                            },
                            opacity: draggedIndex === index ? 0.5 : 1,
                            transition: "opacity 0.2s ease",
                            border:
                              draggedIndex === index ? "2px dashed" : "none",
                            borderColor: theme.palette.primary.main,
                          }}
                        >
                          <img
                            src={image.preview || image.url}
                            alt={`Carrusel ${image.order}`}
                            style={{
                              position: "absolute",
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              pointerEvents: "none",
                            }}
                          />

                          {/* Drag handle icon */}
                          <Box
                            sx={{
                              position: "absolute",
                              top: 4,
                              left: 4,
                              bgcolor: "rgba(0,0,0,0.7)",
                              color: "white",
                              borderRadius: "4px",
                              p: 0.5,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              zIndex: 5,
                            }}
                          >
                            <FaGripVertical size={12} />
                          </Box>

                          {/* Order badge */}
                          <Box
                            sx={{
                              position: "absolute",
                              bottom: 4,
                              left: 4,
                              bgcolor: theme.palette.primary.main,
                              color: "white",
                              borderRadius: "50%",
                              width: 32,
                              height: 32,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: "14px",
                              fontWeight: "bold",
                              zIndex: 5,
                            }}
                          >
                            {image.order}
                          </Box>

                          {/* Delete button */}
                          <IconButton
                            onClick={() => handleDeleteCarouselImage(index)}
                            sx={{
                              position: "absolute",
                              top: 4,
                              right: 4,
                              bgcolor: "rgba(255,0,0,0.7)",
                              color: "white",
                              "&:hover": {
                                bgcolor: "rgba(255,0,0,0.9)",
                              },
                              zIndex: 10,
                            }}
                            size="small"
                          >
                            <FaTrash size={12} />
                          </IconButton>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>

                  {/* Upload button */}
                  <Button
                    variant="contained"
                    component="label"
                    fullWidth
                    startIcon={<FaPlus />}
                    disabled={images.length >= 20 || isProcessingCarousel}
                  >
                    {isProcessingCarousel
                      ? "Procesando imágenes..."
                      : "Agregar Imágenes al Carrusel"}
                    <input
                      hidden
                      accept="image/*"
                      type="file"
                      multiple
                      onChange={handleCarouselImageUpload}
                      disabled={images.length >= 20 || isProcessingCarousel}
                    />
                  </Button>

                  {images.length > 0 && (
                    <Typography variant="caption" color="textSecondary">
                      {images.length} / 20 imagen(es) agregada(s)
                    </Typography>
                  )}
                </Stack>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}
