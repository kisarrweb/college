import {
  HomeIcon,
  File,
  UsersRound,
  LogOut,
  Edit2Icon,
  LogIn,
} from "lucide-react";
import Link from "next/link";
import { LogoutLink, LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import { Button } from "@/components/ui/button";
import { NavButton } from "@/components/NavButton";
import { ModeToggle } from "@/components/ModeToggle";
import { NavButtonMenu } from "./NavButtonMenu";

export async function Header() {
  const { getPermissions } = getKindeServerSession();
  const permissions = await getPermissions();
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  console.log(user);
  console.log(permissions);
  return (
    <header className="animate-slide bg-background h-12 p-2 border-b sticky top-0 z-20">
      <div className="flex h-8 items-center justify-between w-8/12 mx-auto">
        <div className="flex items-center gap-2">
          <NavButton href="/tickets" label="Home" icon={HomeIcon} />

          <Link
            href="/tickets"
            className="flex justify-center items-center gap-2 ml-0"
            title="Home"
          >
            <h1 className="hidden sm:block text-xl font-bold m-0 mt-1">
              CEMAS
            </h1>
          </Link>
        </div>

        <div className="flex items-center">
          <NavButton href="/tickets" label="Tickets" icon={File} />

          <NavButtonMenu
            icon={Edit2Icon}
            label="Articles"
            choices={[
              { title: "Search Articles", href: "/articles" },
              { title: "Ajouter un article", href: "/articles/form" },
            ]}
          />
          <NavButtonMenu
            icon={UsersRound}
            label="Customers Menu"
            choices={[
              { title: "Search Customers", href: "/customers" },
              { title: "New Customer", href: "/customers/form" },
            ]}
          />

          <ModeToggle />
          {user ? (
            <div>
              <Button
                variant="ghost"
                size="icon"
                aria-label="LogOut"
                title="LogOut"
                className="rounded-full"
                asChild
              >
                <LogoutLink>
                  <LogOut />
                </LogoutLink>
              </Button>
              {user?.email}

            
            </div>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              aria-label="LogIn"
              title="LogIn"
              className="rounded-full"
              asChild
            >
              <LoginLink>
                <LogIn />
              </LoginLink>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
