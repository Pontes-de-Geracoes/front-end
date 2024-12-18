import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/atoms/button";
import { useTheme } from "../providers/theme-provider";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <Button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      variant="outline"
      size="icon"
      className="fixed top-20 right-2 p-5"
      aria-label="Alterar tema"
    >
      {theme == "dark" ? <Sun /> : <Moon />}
    </Button>
  );
}
