"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { AlignRight } from "lucide-react";
import Image from "next/image";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
  NavigationMenuContent,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

const components: { title: string; href: string; icon: string }[] = [
  {
    title: "General Procurement",
    href: "/services/general-procurement",
    icon: "/icons/general-procurement.svg",
  },
  {
    title: "Special Sourcing",
    href: "/services/special-sourcing",
    icon: "/icons/special-sourcing.svg",
  },
  {
    title: "Pay Supplier",
    href: "/services/pay-supplier",
    icon: "/icons/pay-supplier.svg",
  },
  {
    title: "Shipping Only",
    href: "/services/shipping-only",
    icon: "/icons/shipping.svg",
  },
];

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="absolute  flex min-h-[768px] w-full flex-col overflow-hidden px-20 pb-20 pt-6 max-md:max-w-full max-md:px-5">
      {!isMobile && (
        <div className="flex w-full flex-row justify-between">
          <div className="z-20 h-12 w-28">
            <Link href="/" passHref>
              <Image
                src="/images/logo-white.svg"
                alt="Spreadit"
                width={135}
                height={45}
                className=""
                quality={100}
              />
            </Link>
          </div>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/" legacyBehavior passHref>
                  <NavigationMenuLink
                    className={clsx(navigationMenuTriggerStyle(), {
                      "after:w-full after:scale-x-100": pathname === "/",
                    })}
                  >
                    Home
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Videos</NavigationMenuTrigger>
                <NavigationMenuContent className="rounded-2xl bg-transparent">
                  <ul className="grid w-72 gap-3 rounded-3xl bg-transparent p-6 lg:grid-cols-[.75fr_1fr]">
                    <ListItem
                      href="https://www.tiktok.com/@tochukwunkwocha"
                      title="TikTok"
                      icon="/icons/tiktok-app-symbol.svg"
                    />
                    <ListItem
                      href="https://youtube.com/@spreaditng"
                      title="YouTube"
                      icon="/icons/yt-app-symbol.svg"
                    />
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger
                  className={clsx(navigationMenuTriggerStyle(), {
                    "after:w-full after:scale-x-100":
                      pathname.startsWith("/services"),
                  })}
                >
                  Services
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-96 gap-3 p-4 md:grid-cols-2">
                    {components.map((component) => (
                      <ListItem
                        key={component.title}
                        title={component.title}
                        href={component.href}
                        icon={component.icon}
                        active={pathname.startsWith("/services")}
                      />
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link
                  href="/shop/deal-directly-with-suppliers"
                  legacyBehavior
                  passHref
                >
                  <NavigationMenuLink
                    className={clsx(navigationMenuTriggerStyle(), {
                      "after:w-full after:scale-x-100":
                        pathname === "/shop/deal-directly-with-suppliers",
                    })}
                  >
                    Shop
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link
                  href="https://spreaditglobal.com/calculator"
                  legacyBehavior
                  passHref
                  target="_blank"
                >
                  <NavigationMenuLink
                    className={clsx(navigationMenuTriggerStyle(), {
                      "after:w-full after:scale-x-100":
                        pathname === "/calculator",
                    })}
                  >
                    Calculator
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <Button asChild className="z-20 h-12 w-28">
            <Link href="/auth/login" passHref>
              Sign In
            </Link>
          </Button>
        </div>
      )}
      {isMobile && (
        <div className="z-30 flex w-full flex-row items-center justify-between">
          <Image
            src="/images/logo-white.png"
            alt="Kalhara JA"
            width={135}
            height={45}
            className="m-2 rounded-full"
          />
          <Sheet>
            <SheetTrigger asChild className="m-2 h-10">
              <Button className="text-white">
                <AlignRight />
              </Button>
            </SheetTrigger>
            <SheetContent className="bg-indigo-800 text-white">
              <NavigationMenu className="min-w-full">
                <nav className="w-full">
                  <SheetClose asChild>
                    <NavigationMenuLink
                      href="/"
                      className={clsx(
                        "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-white",
                        {
                          "after:w-full after:scale-x-100": pathname === "/",
                          "text-white": pathname !== "/",
                        }
                      )}
                    >
                      Home
                    </NavigationMenuLink>
                  </SheetClose>
                  <Accordion type="single" collapsible>
                    <AccordionItem value="videos" className="border-none">
                      <AccordionTrigger className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-white hover:no-underline">
                        Videos
                      </AccordionTrigger>
                      <AccordionContent>
                        <SheetClose asChild>
                          <NavigationMenuLink
                            href="https://www.tiktok.com/@tochukwunkwocha"
                            className="flex items-center gap-4 px-3 py-2 text-white"
                          >
                            <Image
                              src="/icons/tiktok-app-symbol.svg"
                              alt="TikTok"
                              width={20}
                              height={20}
                              className="mr-2 rounded-full bg-white p-1"
                            />
                            TikTok
                          </NavigationMenuLink>
                        </SheetClose>
                        <SheetClose asChild>
                          <NavigationMenuLink
                            href="https://youtube.com/@spreaditng"
                            className="flex items-center gap-4 px-3 py-2 text-white"
                          >
                            <Image
                              src="/icons/yt-app-symbol.svg"
                              alt="YouTube"
                              width={20}
                              height={20}
                              className="mr-2 rounded-full bg-white p-1"
                            />
                            YouTube
                          </NavigationMenuLink>
                        </SheetClose>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="services" className="border-none">
                      <AccordionTrigger className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-white hover:no-underline">
                        Services
                      </AccordionTrigger>
                      <AccordionContent>
                        {components.map((component) => (
                          <SheetClose asChild key={component.title}>
                            <NavigationMenuLink
                              href={component.href}
                              className={clsx(
                                "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-white",
                                {
                                  "after:w-full after:scale-x-100":
                                    pathname === component.href,
                                  "text-white": pathname !== component.href,
                                }
                              )}
                            >
                              <Image
                                src={component.icon}
                                alt={component.title}
                                width={20}
                                height={20}
                                className="mr-2 rounded-full bg-white p-1"
                              />
                              {component.title}
                            </NavigationMenuLink>
                          </SheetClose>
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  <SheetClose asChild>
                    <NavigationMenuLink
                      href="/shop/deal-directly-with-suppliers"
                      className={clsx(
                        "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-white",
                        {
                          "after:w-full after:scale-x-100":
                            pathname === "/shop/deal-directly-with-suppliers",
                          "text-white":
                            pathname !== "/shop/deal-directly-with-suppliers",
                        }
                      )}
                    >
                      Shop
                    </NavigationMenuLink>
                  </SheetClose>
                  <SheetClose asChild>
                    <NavigationMenuLink
                      href="https://spreaditglobal.com/calculator"
                      className={clsx(
                        "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-white",
                        {
                          "after:w-full after:scale-x-100":
                            pathname === "/calculator",
                          "text-white": pathname !== "/calculator",
                        }
                      )}
                      target="_blank"
                    >
                      Calculator
                    </NavigationMenuLink>
                  </SheetClose>
                </nav>
              </NavigationMenu>
              <SheetFooter className="w-full">
                <Button
                  variant="default"
                  asChild
                  className={clsx(
                    "w-30 m-7 h-12 w-full bg-white text-base text-indigo-800 hover:bg-indigo-100",
                    {
                      "ml-0": isMobile,
                    }
                  )}
                >
                  <Link href="/auth/login" passHref>
                    Sign In
                  </Link>
                </Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      )}
    </div>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<"div">,
  {
    className?: string;
    title: string;
    href: string;
    icon: string;
    active?: boolean;
  }
>(({ className, title, href, icon, active, ...props }, ref) => {
  return (
    <li>
      <Link href={href} passHref>
        <div
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-xl p-3 leading-none text-indigo-800 no-underline outline-none transition-colors hover:bg-indigo-800 hover:bg-opacity-10 focus:bg-indigo-800 focus:text-white focus:outline-none focus:ring-2 focus:ring-indigo-800 focus:ring-opacity-50",
            { "after:w-full after:scale-x-100": active }, // Apply active class
            className
          )}
          {...props}
        >
          <div className="flex items-center">
            <Image
              src={icon}
              alt={`${title} icon`}
              width={20}
              height={20}
              className="mr-2"
            />
            <div className="text-sm font-medium leading-none">{title}</div>
          </div>
        </div>
      </Link>
    </li>
  );
});
ListItem.displayName = "ListItem";

export default Navbar;
