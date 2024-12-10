import React from "react";
import { ThemeProvider } from "./theme-provider";
import { ToastProvider } from "../atoms/toast";

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    // Add your providers here
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ToastProvider>{children}</ToastProvider>
    </ThemeProvider>
  );
};

export default Providers;
