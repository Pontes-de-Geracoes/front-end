import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/atoms/sheet";
import Logo from "./logo";
import { routes } from "../../utils/routes";
import Anchor from "./anchor";

export const SideBar = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <Logo className="md:hidden md:invisible" size={48} />
      </SheetTrigger>
      <SheetContent side={"left"} className="flex flex-col gap-6">
        <SheetHeader>
          <SheetTitle>
            <Logo size={48} className="self-center" />
          </SheetTitle>
          <SheetDescription>Conectando gerações</SheetDescription>
        </SheetHeader>
        <ul className="grid gap-2">
          {routes.map((route) => (
            <li key={route.name}>
              <Anchor
                href={route.href}
                className="hover:underline-offset-8 hover:underline hover:font-semibold "
              >
                {route.name}
              </Anchor>
            </li>
          ))}
        </ul>
      </SheetContent>
    </Sheet>
  );
};
