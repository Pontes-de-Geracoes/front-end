import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useTheme } from "../providers/theme-provider";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <div>
      <Button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        variant="outline"
        size="icon"
        className="fixed top-4 right-4 p-7"
      >
        {theme == "dark" ? <Sun /> : <Moon />}
      </Button>
    </div>
  );
}
