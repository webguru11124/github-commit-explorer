import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";
// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
    grey: {
      600: "#37374A",
      900: "#272736",
    },
    background: {
      default: "#FFF",
    },
    text: {
      secondary: "#BFBDD9",
    },
  },
  components: {
    // Name of the component
    MuiButtonBase: {
      defaultProps: {
        // The props to change the default for.
        disableRipple: true, // No more ripple, on the whole application 💣!
      },
      styleOverrides: {
        root: {
          textTransform: "none", // This will apply to all buttons
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
  },
});

export default theme;
