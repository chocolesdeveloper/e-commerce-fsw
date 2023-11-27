"use client";

import {
  HomeIcon,
  ListOrderedIcon,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
  PackageSearchIcon,
  PercentIcon,
  ShoppingCartIcon,
} from "lucide-react";
import { Button } from "./button";
import { Card } from "./card";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "./sheet";
import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Separator } from "./separator";
import Link from "next/link";
import { Cart } from "./cart";

export function Header() {
  const { status, data } = useSession();

  async function handleLoginClick() {
    await signIn();
  }
  async function handleLogoutClick() {
    await signOut();
  }

  return (
    <Card className="flex items-center justify-between p-[1.875rem]">
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline">
              <MenuIcon />
            </Button>
          </SheetTrigger>

          <SheetContent side="left">
            <SheetHeader className="text-left text-lg font-semibold">
              Menu
            </SheetHeader>

            {status === "authenticated" && data?.user && (
              <div className="flex flex-col">
                <div className="flex items-center gap-2 py-4">
                  <Avatar>
                    <AvatarFallback>
                      {data.user.name?.[0].toUpperCase()}
                    </AvatarFallback>

                    {data.user.image && <AvatarImage src={data.user.image} />}
                  </Avatar>

                  <div className="flex flex-col">
                    <p className="font-medium">{data.user.name}</p>
                    <p className="text-sm opacity-75">Boas compras!</p>
                  </div>
                </div>
                <Separator />
              </div>
            )}

            <div className="mt-4 flex flex-col gap-2">
              {status === "unauthenticated" && (
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2"
                  onClick={handleLoginClick}
                >
                  <LogInIcon size={18} />
                  Fazer Login
                </Button>
              )}

              {status === "authenticated" && (
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2"
                  onClick={handleLogoutClick}
                >
                  <LogOutIcon size={18} />
                  Fazer Logout
                </Button>
              )}
              <SheetClose asChild>
                <Link href="/">
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-2"
                  >
                    <HomeIcon size={18} />
                    Início
                  </Button>
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link href="/orders">
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-2"
                  >
                    <PackageSearchIcon size={18} />
                    Meus pedidos
                  </Button>
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link href="/deals">
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-2"
                  >
                    <PercentIcon size={18} />
                    Ofertas
                  </Button>
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link href="/catalog">
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-2"
                  >
                    <ListOrderedIcon size={18} />
                    Catálogo
                  </Button>
                </Link>
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <Link href="/">
        <h1 className="text-lg font-semibold ">
          <span className="text-primary">FSW</span> STORE
        </h1>
      </Link>

      <nav className="hidden h-full items-center gap-6 font-bold md:flex">
        <Link href="/" className="border-white transition-all hover:border-b">
          Início
        </Link>
        <Separator orientation="vertical" />
        <Link
          href="/catalog"
          className="border-white transition-all hover:border-b"
        >
          Catálogo
        </Link>
        <Separator orientation="vertical" />
        <Link
          href="/deals"
          className="border-white transition-all hover:border-b"
        >
          Ofertas
        </Link>
        {status !== "unauthenticated" && (
          <>
            <Separator orientation="vertical" />
            <Link
              href="/orders"
              className="border-white transition-all hover:border-b"
            >
              Meus pedidos
            </Link>
          </>
        )}
      </nav>

      <div className="flex items-center gap-4">
        {status === "authenticated" && (
          <Button
            variant="outline"
            size="icon"
            className="hidden w-full items-center justify-center
            rounded-xl border-red-700 md:flex"
            onClick={handleLogoutClick}
          >
            <LogOutIcon size={18} className="text-red-700" />
          </Button>
        )}

        {status === "unauthenticated" && (
          <Button
            variant="outline"
            className="w-full justify-start gap-2"
            onClick={handleLoginClick}
          >
            <LogInIcon size={18} />
          </Button>
        )}

        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline">
              <ShoppingCartIcon />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <Cart />
          </SheetContent>
        </Sheet>
      </div>
    </Card>
  );
}
