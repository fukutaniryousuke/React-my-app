"use client";

import { ThemeProvider } from "@mui/material/styles";
import Footer from "@/src/components/common/Footer/Footer";
import { MswProvider } from "@/src/components/providers/MswProvider";
import { theme } from "@/src/styles/theme";
import { ReactNode } from "react";
import HeaderContainer from "@/src/components/common/Header/HeaderContainer";

type Props = {
  children: ReactNode;
};

export default function Providers({ children }: Props) {
  return (
    <ThemeProvider theme={theme}>
      <HeaderContainer />
      <MswProvider>{children}</MswProvider>
      <Footer />
    </ThemeProvider>
  );
}
