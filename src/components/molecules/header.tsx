import { routes } from "../../utils/route";
import Anchor from "../atoms/anchor";
import { Button } from "../atoms/button";
import Container from "../atoms/container";
import Logo from "../atoms/logo";
import { SideBar } from "../atoms/sidebar";

const Header = () => {
  return (
    <header className="flex justify-center p-6">
      <Container as="div" className="flex justify-between items-center">
        <Logo className="hidden md:block" />
        <SideBar />
        <nav className="hidden md:block">
          <ul className="flex gap-10">
            {routes.map((route) => (
              <li key={route.name}>
                <Anchor href={route.href}>{route.name}</Anchor>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex gap-3">
          <Button>Login</Button>
          <Button variant={"outline"}>Sign Up</Button>
        </div>
      </Container>
    </header>
  );
};

export default Header;
