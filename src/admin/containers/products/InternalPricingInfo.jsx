import { alpha, Box, Stack, useTheme } from "@mui/material";
import { useEffect, useMemo } from "react";
import { TitleSection } from "../../components/product/generalInfo";
import { MdOutlineAttachMoney } from "react-icons/md";
import AdminStyledTxt from "../../components/generic/AdminStyledTxt";

export const InternalPricingInfo = ({
  formData,
  handleChange,
  setFormData,
}) => {
  const theme = useTheme();

  // Calcular el precio final como la suma de los 3 anteriores
  const finalPrice = useMemo(() => {
    const original = parseFloat(formData.originalPrice) || 0;
    const shipping = parseFloat(formData.shippingPrice) || 0;
    const taxes = parseFloat(formData.taxesPrice) || 0;
    return (original + shipping + taxes).toFixed(2);
  }, [formData.originalPrice, formData.shippingPrice, formData.taxesPrice]);

  // Guardar finalPrice en formData cuando cambie
  useEffect(() => {
    if (setFormData && finalPrice !== formData.finalPrice) {
      setFormData((prevData) => ({
        ...prevData,
        finalPrice: parseFloat(finalPrice),
      }));
    }
  }, [finalPrice]);
  return (
    <Box
      bgcolor={alpha(theme.palette.background.adminBox, 0.5)}
      p={4}
      borderRadius={2}
    >
      <TitleSection
        title="Precios Internos y Stock"
        subtitle="Datos para gestión interna"
        icon={
          <MdOutlineAttachMoney
            size={24}
            color={theme.palette.secondary.light}
          />
        }
        bgcolor={alpha(theme.palette.secondary.main, 0.25)}
      />
      <Stack spacing={2} mt={2}>
        <AdminStyledTxt
          fullWidth
          label="Precio Original"
          name="originalPrice"
          type="number"
          value={formData.originalPrice || ""}
          onChange={handleChange}
          size="small"
          inputProps={{ step: "0.01" }}
        />
        <AdminStyledTxt
          fullWidth
          label="Precio de envío"
          name="shippingPrice"
          type="number"
          value={formData.shippingPrice || ""}
          onChange={handleChange}
          size="small"
          inputProps={{ step: "0.01" }}
        />
        <AdminStyledTxt
          fullWidth
          label="Precio de impuestos"
          name="taxesPrice"
          type="number"
          value={formData.taxesPrice || ""}
          onChange={handleChange}
          size="small"
          inputProps={{ step: "0.01" }}
        />
        <AdminStyledTxt
          fullWidth
          label="Precio Final"
          name="finalPrice"
          type="number"
          value={formData.finalPrice || ""}
          disabled
          size="small"
          inputProps={{ step: "0.01" }}
        />
      </Stack>
    </Box>
  );
};
