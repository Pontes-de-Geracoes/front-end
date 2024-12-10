import React from "react";
import { ThemeProvider } from "./theme-provider";
import { ToastProvider } from "../atoms/toast";
import { Toast } from "@radix-ui/react-toast";

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    // Add your providers here
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ToastProvider>
        {children}
        <Toast />
      </ToastProvider>
    </ThemeProvider>
  );
};

export default Providers;
