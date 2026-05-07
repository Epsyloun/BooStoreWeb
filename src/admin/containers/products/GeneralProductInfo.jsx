import { alpha, Box, Stack, useTheme } from "@mui/material";
import { TitleSection } from "../../components/product/generalInfo";
import { FaArchive } from "react-icons/fa";
import AdminStyledTxt from "../../components/generic/AdminStyledTxt";
import { categories, tags } from "../../utils/categoriesAndTags";
import AdminAutocomplete from "../../components/generic/AdminAutocomplete";

export const GeneralProductInfo = ({ formData, handleChange }) => {
  const theme = useTheme();

  return (
    <Box
      bgcolor={alpha(theme.palette.background.adminBox, 0.5)}
      p={4}
      borderRadius={2}
    >
      <Stack spacing={2}>
        <TitleSection
          title="Información General"
          subtitle="Detalles básicos del producto"
          icon={<FaArchive size={24} color={theme.palette.primary.light} />}
          bgcolor={alpha(theme.palette.primary.main, 0.25)}
        />
        <AdminStyledTxt
          label="Título"
          name="title"
          value={formData.title || ""}
          onChange={handleChange}
          size="small"
        />
        <AdminStyledTxt
          label="SKU"
          name="sku"
          value={formData.sku || ""}
          onChange={handleChange}
          size="small"
        />
        <AdminAutocomplete
          label="Categorías"
          name="categories"
          value={formData.categories || []}
          onChange={handleChange}
          options={categories}
          multiple={true}
          placeholder="Selecciona o escribe categorías..."
          size="small"
        />
        <AdminAutocomplete
          label="Tags"
          name="tags"
          value={formData.tags || []}
          onChange={handleChange}
          options={tags}
          multiple={true}
          placeholder="Selecciona o escribe tags..."
          size="small"
        />
        <AdminStyledTxt
          label="Descripción"
          name="description"
          value={formData.description || ""}
          onChange={handleChange}
          multiline
          rows={4}
          size="small"
        />
      </Stack>
    </Box>
  );
};
