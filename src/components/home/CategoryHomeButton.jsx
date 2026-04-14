import { alpha, Box, Typography, useTheme } from "@mui/material";

export default function CategoryHomeButton({
  title = "example-icon",
  icon = "📦",
}) {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <Box
        sx={{
          display: "inline-flex",
          flexDirection: "column",
          alignItems: "center",
          cursor: "pointer",
          "&:hover .icon": {
            color: "white.main",
          },
          "&:hover .title": {
            color: "white.main",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            p: 2,
            width: "100%",
            height: "100px",
            aspectRatio: "1 / 1",
            borderRadius: "8px",
            backgroundColor: alpha(theme.palette.white.main, 0.1),
            border: "1px solid",
            borderColor: "white.main",
            transition: "box-shadow 0.2s ease",
            "&:hover": {
              boxShadow: `0 0 16px ${alpha(theme.palette.white.main, 0.7)}`,
            },
          }}
        >
          <Box
            className="icon"
            sx={{
              color: "white.main",
              transition: "color 0.2s ease",
            }}
          >
            {icon}
          </Box>
        </Box>

        <Typography
          className="title"
          sx={{
            mt: 1,
            fontSize: "1.125rem",
            fontWeight: 600,
            textAlign: "center",
            color: "white.main",
            transition: "color 0.2s ease",
          }}
        >
          {title}
        </Typography>
      </Box>
    </Box>
  );
}
