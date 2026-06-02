import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    greyCustom: Palette["primary"];
  }

  interface PaletteOptions {
    greyCustom?: PaletteOptions["primary"];
  }
}
