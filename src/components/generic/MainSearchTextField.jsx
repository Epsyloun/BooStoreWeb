import {
  Autocomplete,
  TextField,
  InputAdornment,
  useTheme,
  alpha,
  Box,
  Typography,
} from "@mui/material";
import { FiSearch } from "react-icons/fi";
import { useBooContext } from "../../context/useBooContext";
import { useState, useCallback, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";

export default function MainSearchTextField() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { products } = useBooContext();
  const [inputValue, setInputValue] = useState("");
  const debounceTimer = useRef(null);
  const [debouncedValue, setDebouncedValue] = useState("");

  // Debounce para la búsqueda
  const handleInputChange = useCallback((event, value) => {
    setInputValue(value);

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      setDebouncedValue(value);
    }, 300); // 300ms de debounce
  }, []);

  // Filtrar productos basados en el valor debounceado
  const filteredProducts = useMemo(() => {
    if (!debouncedValue.trim()) return [];

    return products
      .filter((product) =>
        product.title.toLowerCase().includes(debouncedValue.toLowerCase()),
      )
      .slice(0, 5); // Primeras 5 coincidencias
  }, [debouncedValue, products]);

  // Manejar selección de producto
  const handleSelectProduct = (event, value) => {
    if (value && typeof value === "object" && value.id) {
      setInputValue("");
      navigate(`/products/${value.id}`);
    }
  };

  return (
    <Autocomplete
      freeSolo
      options={filteredProducts}
      getOptionLabel={(option) =>
        typeof option === "string" ? option : option.title
      }
      inputValue={inputValue}
      onInputChange={handleInputChange}
      onChange={handleSelectProduct}
      noOptionsText="No se encontraron productos"
      PaperComponent={(props) => (
        <Box
          {...props}
          sx={{
            bgcolor: theme.palette.background.paper,
            "& ul": {
              scrollbarWidth: "thin",
              scrollbarColor: `${theme.palette.primary.main} ${alpha(
                theme.palette.primary.main,
                0.1,
              )}`,
              "&::-webkit-scrollbar": {
                width: "8px",
              },
              "&::-webkit-scrollbar-track": {
                background: alpha(theme.palette.primary.main, 0.05),
                borderRadius: "4px",
              },
              "&::-webkit-scrollbar-thumb": {
                background: theme.palette.primary.main,
                borderRadius: "4px",
                "&:hover": {
                  background: theme.palette.primary.dark,
                },
              },
            },
          }}
        />
      )}
      renderOption={(props, option) => (
        <Box
          component="li"
          {...props}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            py: 1,
            px: 2,
            "&:hover": {
              backgroundColor: alpha(theme.palette.primary.main, 0.1),
            },
          }}
        >
          {/* Imagen a la izquierda */}
          <Box
            component="img"
            src={option.gridImage}
            alt={option.title}
            sx={{
              width: "80px",
              height: "80px",
              objectFit: "cover",
              borderRadius: 1,
              flexShrink: 0,
            }}
          />
          {/* Título truncado */}
          <Typography
            sx={{
              fontSize: "0.95rem",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              flex: 1,
            }}
          >
            {option.title}
          </Typography>
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          placeholder="Buscar..."
          color="primary"
          autoComplete="off"
          sx={{
            "& .MuiOutlinedInput-root": {
              height: "50px",
              "& fieldset": {
                border: `1px solid ${alpha(theme.palette.white.main, 0.5)}`,
                transition: "border-color 0.25s ease",
                borderRadius: "50px",
              },
              "&:hover fieldset": {
                borderColor: theme.palette.primary.main,
              },
            },
          }}
          fullWidth
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start" sx={{ marginRight: "8px" }}>
                <FiSearch color={theme.palette.white.main} />
              </InputAdornment>
            ),
          }}
        />
      )}
    />
  );
}
