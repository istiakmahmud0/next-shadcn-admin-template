"use client";
import type { Metadata } from "next";
import React, { useState } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  ChevronDown,
  Icon,
  Layers3,
  MenuIcon,
  PackageSearch,
  UsersRound,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navItems = [
    {
      title: "User",
      path: "/users",
      icon: <UsersRound />,
    },
    {
      title: "Category",
      path: "/category",
      icon: <Layers3 />,
      subMenu: true,
      subMenuItems: [
        {
          title: "Category Submenu",
          path: "/category",
          icon: <Layers3 />,
        },
      ],
    },
    {
      title: "Products",
      path: "/products",
      icon: <PackageSearch />,
      subMenu: true,
      subMenuItems: [
        {
          title: "Pro Submenu",
          path: "/products",
          icon: <Layers3 />,
        },
      ],
    },
  ];

  const pathName = usePathname();
  const [openSubMenus, setOpenSubMenus] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [position, setPosition] = React.useState("bottom");

  const toggleSubMenu = (path: string) => {
    setOpenSubMenus((prevOpenSubMenus) => ({
      ...prevOpenSubMenus,
      [path]: !prevOpenSubMenus[path],
    }));
  };

  const renderNavItems = (inSheet?: boolean) => {
    if (inSheet) {
      return (
        <div className="flex-grow w-full">
          {navItems.map((navItem) => (
            <SheetClose asChild key={navItem.path}>
              <Link
                href={navItem.path}
                className={cn(
                  "w-full px-4 py-2 flex gap-2 items-center justify-start hover:bg-primary/35",
                  { "bg-blue-400": pathName.includes(navItem.path) }
                )}
              >
                {navItem.icon}
                {navItem.title}
              </Link>
            </SheetClose>
          ))}
        </div>
      );
    } else {
      return (
        <div className="flex-grow w-full">
          {navItems.map((navItem) =>
            navItem.subMenu ? (
              <div key={navItem.path}>
                <div
                  className="flex"
                  onClick={() => toggleSubMenu(navItem.path)}
                >
                  <Link
                    href={navItem.path}
                    className={cn(
                      "w-full px-4 py-2 flex gap-2 items-center justify-start hover:bg-primary/35",
                      {
                        "bg-blue-400": pathName.includes(navItem.path),
                      }
                    )}
                  >
                    {navItem.icon}
                    {navItem.title}
                    <div
                      className={cn(
                        "transform transition-transform duration-300",
                        {
                          "rotate-180": openSubMenus[navItem.path],
                        }
                      )}
                    >
                      <ChevronDown />
                    </div>
                  </Link>
                </div>
                {/* Submenu loop */}
                <div
                  className={cn(
                    "transition-max-height duration-300 ease-in-out overflow-hidden",
                    {
                      "max-h-0": !openSubMenus[navItem.path],
                      "max-h-screen": openSubMenus[navItem.path],
                    }
                  )}
                >
                  {openSubMenus[navItem.path] && (
                    <div className="my-2 ml-12 flex flex-col space-y-4">
                      {navItem.subMenuItems?.map((subItem) => (
                        <Link
                          key={subItem.path}
                          href={subItem.path}
                          className={cn({
                            "font-bold": subItem.path === pathName,
                          })}
                        >
                          <span>{subItem.title}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <Link
                href={navItem.path}
                key={navItem.path}
                className={cn(
                  "w-full px-4 py-2 flex gap-2 items-center justify-start hover:bg-primary/35",
                  { "bg-blue-400": pathName.includes(navItem.path) }
                )}
              >
                {navItem.icon}
                {navItem.title}
              </Link>
            )
          )}
        </div>
      );
    }
  };

  return (
    <html lang="en">
      <body className={cn("antialiased overflow-hidden", inter.className)}>
        <div className="h-full w-full grid grid-cols-12">
          <aside className="bg-primary/10 col col-span-0 hidden sm:col-span-3 lg:col-span-2 sm:flex flex-col items-start justify-start">
            <Link
              href="/"
              className="py-4 w-full px-4 text-2xl transition-all leading-none uppercase tracking-tighter font-black"
            >
              Dashboard
            </Link>
            {renderNavItems()}
          </aside>
          <div className="col-span-12 sm:col-span-9 lg:col-span-10 flex flex-col">
            <div className="h-14 items-center px-2 flex justify-between bg-primary/5">
              <div className="hidden sm:block min-w-2"></div>
              <div className="flex items-center sm:hidden">
                <Sheet>
                  <SheetTrigger>
                    <MenuIcon />
                  </SheetTrigger>
                  <SheetContent side="left" className="px-0">
                    <SheetHeader>
                      <SheetTitle>
                        <Link
                          href="/"
                          className="py-4 w-full px-4 text-2xl transition-all leading-none uppercase tracking-tighter font-black"
                        >
                          Dashboard
                        </Link>
                      </SheetTitle>
                      {renderNavItems(true)}
                    </SheetHeader>
                  </SheetContent>
                </Sheet>
                <Link
                  href="/"
                  className="py-4 w-full px-4 text-2xl transition-all leading-none uppercase tracking-tighter font-black"
                >
                  Dashboard
                </Link>
              </div>
              {/* Toggle dropdown menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">Open</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup
                    value={position}
                    onValueChange={setPosition}
                  >
                    <DropdownMenuRadioItem value="top">
                      Top
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="bottom">
                      Bottom
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="right">
                      Right
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="flex flex-col h-[calc(100vh-3.9rem)] w-full container mx-auto py-10">
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
