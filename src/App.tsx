import { ModeToggle } from "./components/atoms/mode-toggle";
import { Toast } from "./components/atoms/toast";
import Providers from "./components/providers/providers";
import Routing from "./components/templates/routing";

function App() {
  return (
    <Providers>
      <Routing />
      <Toast />
      <ModeToggle />
    </Providers>
  );
}

export default App;
