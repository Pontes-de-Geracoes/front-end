import { ModeToggle } from "./components/atoms/mode-toggle";
import { Toaster } from "./components/atoms/toaster";
import Providers from "./components/providers/providers";
import Routing from "./components/templates/routing";

function App() {
  return (
    <Providers>
      <Routing />
      <Toaster />
      <ModeToggle />
    </Providers>
  );
}

export default App;
