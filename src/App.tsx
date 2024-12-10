import { ModeToggle } from "./components/atoms/mode-toggle";
import Providers from "./components/providers/providers";
import Routing from "./components/templates/routing";

function App() {
  return (
    <Providers>
      <Routing />
      <ModeToggle />
    </Providers>
  );
}

export default App;
