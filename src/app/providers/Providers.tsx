"use client";

import { ThemeProvider } from "@mui/material/styles";
import Header from "@/src/components/common/Header/Header";
import Footer from "@/src/components/common/Footer/Footer";
import { MswProvider } from "@/src/components/providers/MswProvider";
import { theme } from "@/src/styles/theme";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function Providers({ children }: Props) {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <MswProvider>{children}</MswProvider>
      <Footer />
    </ThemeProvider>
  );
}
