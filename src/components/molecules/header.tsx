import { NavLink } from "react-router";
import { routes } from "../../utils/route";
import { Button } from "../atoms/button";
import Container from "../atoms/container";
import Logo from "../atoms/logo";
import { SideBar } from "../atoms/sidebar";
import { useContext } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../atoms/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../atoms/dropdown-menu";
import { LogOut, User } from "lucide-react";
import { UserContext, UserContextSchema } from "../../contexts/user.context";

const Header = () => {
  const { isAuthenticated, logOut, user } = useContext(
    UserContext
  ) as UserContextSchema;

  return (
    <header className="flex justify-center p-6">
      <Container as="div" className="flex justify-between items-center">
        <div className="max-h-12">
          <Logo className="hidden md:block " />
          <SideBar />
        </div>
        <nav className="hidden md:block">
          <ul className="flex gap-10">
            {routes.map((route) => (
              <NavLink
                key={route.name}
                className="px-3 py-2 hover:underline-offset-4 hover:underline"
                to={route.href}
              >
                <li>{route.name}</li>
              </NavLink>
            ))}
          </ul>
        </nav>
        <div>
          {isAuthenticated && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={user.photo} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user.name}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <NavLink to={"/profile"} className="flex gap-3">
                    <User /> Perfil
                  </NavLink>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Button onClick={logOut} className="flex gap-3">
                    <LogOut /> Log out
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex gap-3">
              <Button>
                <NavLink to={"/login"}>Login</NavLink>
              </Button>
              <Button variant={"outline"}>
                <NavLink to={"/register"}>Criar conta</NavLink>
              </Button>
            </div>
          )}
        </div>
      </Container>
    </header>
  );
};

export default Header;
