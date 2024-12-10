import { Link } from "react-router";
import { routes } from "../../utils/route";
import Anchor from "../atoms/anchor";
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
              <li key={route.name}>
                <Anchor href={route.href}>{route.name}</Anchor>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={user.photo} alt={user.username} />
                    <AvatarFallback>{user.username.charAt(0)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user.username}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link to={"/profile"} className="flex gap-3">
                    <User /> Profile
                  </Link>
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
                <Link to={"/login"}>Login</Link>
              </Button>
              <Button variant={"outline"}>
                <Link to={"/register"}>Criar conta</Link>
              </Button>
            </div>
          )}
        </div>
      </Container>
    </header>
  );
};

export default Header;
