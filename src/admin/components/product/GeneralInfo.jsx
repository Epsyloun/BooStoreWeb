import {
  Grid,
  useTheme,
  Divider,
  Box,
  Typography,
  Stack,
  TextField,
  Container,
  alpha,
  Switch,
  Collapse,
  InputAdornment,
  Checkbox,
  Button,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../context/useAuthContext";
import AdminStyledTxt from "../generic/AdminStyledTxt";
import { FaArchive } from "react-icons/fa";
import { MdOutlineAttachMoney } from "react-icons/md";
import { FaArrowTrendUp } from "react-icons/fa6";
import { FaPercentage } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { MdContentPasteGo } from "react-icons/md";
import AdminAutocomplete from "../generic/AdminAutocomplete";
import { categories, tags } from "../../utils/categoriesAndTags";
import { StockInfo } from "../../containers/products/StockInfo";
import { InternalPricingInfo } from "../../containers/products/InternalPricingInfo";
import { VisibilitySettings } from "../../containers/products/VisibilitySettings";
import { PricingInfo } from "../../containers/products/PrincingInfo";
import { GeneralProductInfo } from "../../containers/products/GeneralProductInfo";

export default function GeneralInfo({ formData, handleChange, setFormData }) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        py: 2,
        background: `linear-gradient(0deg, ${alpha(theme.palette.primary.background, 0.8)} 0%, ${alpha(theme.palette.primary.accent, 0.8)} 100%)`,
        overflowY: "auto",
        minHeight: "calc(100vh - 190px)",
        height: "100%",
      }}
    >
      <Container>
        <Grid container spacing={2}>
          {/* Información General*/}
          <Grid size={{ xs: 12, sm: 6, md: 8 }}>
            {/* Información General y precios internos */}
            <GeneralProductInfo
              formData={formData}
              handleChange={handleChange}
              setFormData={setFormData}
            />
            <Box mt={2} />
            {/* Precios internos */}
            <InternalPricingInfo
              formData={formData}
              handleChange={handleChange}
              setFormData={setFormData}
            />
          </Grid>
          {/* Precios, Visibilidad, Destacado y Stock */}
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            {/* Precios */}
            <PricingInfo
              formData={formData}
              handleChange={handleChange}
              setFormData={setFormData}
            />
            <Box mt={2} />
            {/* Visibilidad y Destacado */}
            <VisibilitySettings
              formData={formData}
              handleChange={handleChange}
              setFormData={setFormData}
            />
            <Box mt={2} />
            {/* Stock */}
            <StockInfo
              formData={formData}
              handleChange={handleChange}
              setFormData={setFormData}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export const TitleSection = ({ title, subtitle, icon, bgcolor }) => {
  return (
    <Stack direction="row" alignItems="center" spacing={2} mb={2}>
      <Box
        p={2}
        bgcolor={bgcolor}
        sx={{
          borderRadius: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          aspectRatio: "1 / 1",
        }}
      >
        {icon}
      </Box>
      <Stack direction={"column"}>
        <Typography variant="h6" fontWeight="600">
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="body2" color="text.secondary">
            {subtitle}
          </Typography>
        )}
      </Stack>
    </Stack>
  );
};
