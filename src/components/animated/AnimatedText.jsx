import { Typography, Box } from "@mui/material";
import { keyframes } from "@mui/system";

const fall = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-20px);
    filter: blur(4px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
    filter: blur(0);
  }
`;

export const AnimatedText = ({
  text = "",
  variant = "h6",
  delay = 0.05,
  allDelay = 0,
}) => {
  return (
    <Typography variant={variant} color="white.main">
      {text.split("").map((char, index) => (
        <Box
          key={index}
          component="span"
          sx={{
            display: "inline-block",
            whiteSpace: "pre",
            opacity: 0,
            animation: `${fall} 0.5s ease forwards`,
            animationDelay: `${index * delay + allDelay}s`,
          }}
        >
          {char}
        </Box>
      ))}
    </Typography>
  );
};
