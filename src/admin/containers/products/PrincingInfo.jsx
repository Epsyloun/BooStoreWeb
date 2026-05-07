import {
  alpha,
  Box,
  Collapse,
  Divider,
  Grid,
  InputAdornment,
  Stack,
  Switch,
  Typography,
  useTheme,
} from "@mui/material";
import { TitleSection } from "../../components/product/generalInfo";
import { MdOutlineAttachMoney } from "react-icons/md";
import AdminStyledTxt from "../../components/generic/AdminStyledTxt";
import { FaArrowTrendUp } from "react-icons/fa6";
import { FaPercentage } from "react-icons/fa";
import { useEffect, useState } from "react";

export const PricingInfo = ({ formData, handleChange, setFormData }) => {
  const theme = useTheme();
  const [showDiscount, setShowDiscount] = useState(
    parseFloat(formData.discountPrice) > 0,
  );

  // Manejar cambio del switch
  const handleDiscountToggle = (e) => {
    const isChecked = e.target.checked;
    setShowDiscount(isChecked);

    // Si se apaga el descuento, limpiar el campo
    if (!isChecked) {
      setFormData((prevData) => ({
        ...prevData,
        discountPrice: "",
        discountPercentage: 0,
      }));
    }
  };

  // Validar y limpiar discountPrice cuando se sale del campo
  const handleDiscountPriceBlur = () => {
    const discountValue = parseFloat(formData.discountPrice) || 0;

    // Si el valor es menor o igual a 0, limpiar
    if (discountValue <= 0) {
      setFormData((prevData) => ({
        ...prevData,
        discountPrice: "",
        discountPercentage: 0,
      }));
      setShowDiscount(false);
    } else {
      // Si es válido, actualizar el switch
      setShowDiscount(true);
    }
  };

  // Calcular ganancia normal (sin descuento) - usando finalPrice como costo total
  const normalProfit =
    (parseFloat(formData.price) || 0) - (parseFloat(formData.finalPrice) || 0);
  const normalProfitMargin =
    (parseFloat(formData.finalPrice) || 0) > 0
      ? (normalProfit / (parseFloat(formData.finalPrice) || 1)) * 100
      : 0;

  // Calcular ganancia con descuento - usando finalPrice como costo total
  const discountedProfit =
    (parseFloat(formData.discountPrice) || 0) -
    (parseFloat(formData.finalPrice) || 0);
  const discountedProfitMargin =
    (parseFloat(formData.finalPrice) || 0) > 0
      ? (discountedProfit / (parseFloat(formData.finalPrice) || 1)) * 100
      : 0;

  // Calcular ganancia automáticamente cuando cambian los precios
  useEffect(() => {
    const price = parseFloat(formData.price) || 0;
    const finalPrice = parseFloat(formData.finalPrice) || 0;
    const discountPrice = parseFloat(formData.discountPrice) || 0;

    if (price > 0 && finalPrice > 0) {
      // Calcular profit y profitMargin basado en precio normal
      let profit = price - finalPrice;
      let profitMargin = (profit / finalPrice) * 100;

      // Si hay descuento activo, cumple condiciones, usa la ganancia del descuento
      if (showDiscount && discountPrice > 0 && discountPrice < price) {
        profit = discountPrice - finalPrice;
        profitMargin = (profit / finalPrice) * 100;
      }

      // Calcular discountPercentage
      let discountPercentage = 0;
      if (discountPrice > 0 && price > discountPrice) {
        discountPercentage = ((price - discountPrice) / price) * 100;
      }

      setFormData((prevData) => ({
        ...prevData,
        profit: parseFloat(profit.toFixed(2)),
        profitMargin: parseFloat(profitMargin.toFixed(2)),
        discountPercentage: parseFloat(discountPercentage.toFixed(2)),
      }));
    }
  }, [
    formData.price,
    formData.finalPrice,
    formData.discountPrice,
    showDiscount,
  ]);

  return (
    <Box
      bgcolor={alpha(theme.palette.background.adminBox, 0.5)}
      p={4}
      borderRadius={2}
    >
      <TitleSection
        title="Precios"
        subtitle="Precios visibles para clientes"
        icon={
          <MdOutlineAttachMoney
            size={24}
            color={theme.palette.secondary.light}
          />
        }
        bgcolor={alpha(theme.palette.secondary.main, 0.25)}
      />
      {/* Switch para activar descuentos */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Typography variant="body2">Aplicar descuento</Typography>
        <Switch
          checked={showDiscount}
          onChange={handleDiscountToggle}
          color="secondary"
        />
      </Box>
      <Stack spacing={2}>
        <AdminStyledTxt
          fullWidth
          label="Precio"
          name="price"
          type="number"
          value={formData.price || ""}
          onChange={handleChange}
          size="small"
          inputProps={{ step: "0.01" }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <MdOutlineAttachMoney
                    size={20}
                    color={theme.palette.text.light}
                  />
                </InputAdornment>
              ),
            },
          }}
        />
        {/* Campo de cuanto se gana  */}
        <Grid container spacing={1}>
          <Grid item size={6}>
            <AdminStyledTxt
              fullWidth
              label="Ganancia Normal"
              name="profit"
              type="number"
              value={normalProfit.toFixed(2) || ""}
              onChange={handleChange}
              size="small"
              inputProps={{ step: "0.01" }}
              labelColor={theme.palette.text.primaryLight}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <MdOutlineAttachMoney
                        size={20}
                        color={theme.palette.text.primaryLight}
                      />
                    </InputAdornment>
                  ),
                },
              }}
              disabled
            />
          </Grid>
          <Grid item size={6}>
            <AdminStyledTxt
              fullWidth
              label="Ganancia (%) Normal"
              name="profitMargin"
              type="number"
              value={normalProfitMargin.toFixed(2) || ""}
              onChange={handleChange}
              size="small"
              inputProps={{ step: "0.01" }}
              labelColor={theme.palette.text.secondaryLight}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <FaArrowTrendUp
                        size={20}
                        color={theme.palette.text.secondaryLight}
                      />
                    </InputAdornment>
                  ),
                },
              }}
              disabled
            />
          </Grid>
        </Grid>

        {/* Campo de descuento con animación */}
        <Collapse in={showDiscount} timeout="auto">
          <Divider
            sx={{
              borderWidth: 2,
              borderRadius: 24,
              mb: 1,
            }}
          />
          <Grid container spacing={1}>
            <Grid item size={6}>
              <AdminStyledTxt
                fullWidth
                label="Precio con Descuento"
                name="discountPrice"
                type="number"
                value={formData.discountPrice || ""}
                onChange={handleChange}
                onBlur={handleDiscountPriceBlur}
                size="small"
                inputProps={{ step: "0.01" }}
                labelColor={theme.palette.text.primaryLight}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <MdOutlineAttachMoney
                          size={20}
                          color={theme.palette.primary.main}
                        />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Grid>
            <Grid item size={6}>
              <AdminStyledTxt
                fullWidth
                label="%"
                name="discountPercentage"
                type="number"
                value={formData.discountPercentage || ""}
                onChange={handleChange}
                size="small"
                inputProps={{ step: "0.01" }}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <FaPercentage
                          size={20}
                          color={theme.palette.primary.main}
                        />
                      </InputAdornment>
                    ),
                  },
                }}
                disabled
              />
            </Grid>
            <Grid item size={6}>
              <AdminStyledTxt
                fullWidth
                label="Ganancia"
                name="profit"
                type="number"
                value={formData.profit || ""}
                onChange={handleChange}
                size="small"
                inputProps={{ step: "0.01" }}
                labelColor={theme.palette.text.primaryLight}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <MdOutlineAttachMoney
                          size={20}
                          color={theme.palette.text.primaryLight}
                        />
                      </InputAdornment>
                    ),
                  },
                }}
                disabled
              />
            </Grid>
            <Grid item size={6}>
              <AdminStyledTxt
                fullWidth
                label="Ganancia (%)"
                name="profitMargin"
                type="number"
                value={formData.profitMargin || ""}
                onChange={handleChange}
                size="small"
                inputProps={{ step: "0.01" }}
                labelColor={theme.palette.text.secondaryLight}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <FaArrowTrendUp
                          size={20}
                          color={theme.palette.text.secondaryLight}
                        />
                      </InputAdornment>
                    ),
                  },
                }}
                disabled
              />
            </Grid>
            <Grid item size={6}>
              <AdminStyledTxt
                fullWidth
                label="Ganancia c/ Dscto"
                name="discountedProfit"
                type="number"
                value={discountedProfit.toFixed(2) || ""}
                onChange={handleChange}
                size="small"
                inputProps={{ step: "0.01" }}
                labelColor={theme.palette.text.primaryLight}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <MdOutlineAttachMoney
                          size={20}
                          color={theme.palette.text.primaryLight}
                        />
                      </InputAdornment>
                    ),
                  },
                }}
                disabled
              />
            </Grid>
            <Grid item size={6}>
              <AdminStyledTxt
                fullWidth
                label="Ganancia (%) c/ Dscto"
                name="discountedProfitMargin"
                type="number"
                value={discountedProfitMargin.toFixed(2) || ""}
                onChange={handleChange}
                size="small"
                inputProps={{ step: "0.01" }}
                labelColor={theme.palette.text.secondaryLight}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <FaArrowTrendUp
                          size={20}
                          color={theme.palette.text.secondaryLight}
                        />
                      </InputAdornment>
                    ),
                  },
                }}
                disabled
              />
            </Grid>
          </Grid>
        </Collapse>
      </Stack>
    </Box>
  );
};
