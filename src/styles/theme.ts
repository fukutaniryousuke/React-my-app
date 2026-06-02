import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#3b82f6",
    },
    success: {
      main: "#2cdf35",
    },
    greyCustom: {
      main: "#b2b8bb",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          color: "#fff",
        },
      },
    },
  },
});
