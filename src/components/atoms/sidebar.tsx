import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/atoms/sheet";
import Logo from "./logo";
import { routes } from "../../utils/route";
import Anchor from "./anchor";

export const SideBar = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <Logo className="md:hidden " size={48} />
      </SheetTrigger>
      <SheetContent side={"left"} className="flex flex-col gap-6">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
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
