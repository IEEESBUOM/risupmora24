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
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { MutableRefObject } from "react";
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
import PrimaryButtonSmall from "./ui/PrimaryButtonSmall";
import HamburgerButton from "./ui/HamburgerButton";

interface SectionRefs {
  heroSectionRef: MutableRefObject<HTMLDivElement | null>;
  aboutRef: MutableRefObject<HTMLDivElement | null>;
  timelineRef: MutableRefObject<HTMLDivElement | null>;
  contactUsRef: MutableRefObject<HTMLDivElement | null>;
}

const Navbar: React.FC<{ sectionRefs: SectionRefs }> = ({ sectionRefs }) => {
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();
  const [active, setActive] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const hamburgerClick = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleScroll = (scrollTo: string) => {
    setActive(scrollTo);

    const navbarHeight = isMobile ? 70 : 90;
    switch (scrollTo) {
      case "home":
        if (sectionRefs.heroSectionRef.current) {
          window.scrollTo({
            top: sectionRefs.heroSectionRef.current.offsetTop - navbarHeight,
            behavior: "smooth",
          });
        } else {
          //navigate to home
          window.location.href = "/";
        }
        break;
      case "about":
        if (sectionRefs.aboutRef.current) {
          window.scrollTo({
            top: sectionRefs.aboutRef.current.offsetTop - navbarHeight,
            behavior: "smooth",
          });
        }
        break;
      case "timeline":
        if (sectionRefs.timelineRef.current) {
          window.scrollTo({
            top: sectionRefs.timelineRef.current.offsetTop - navbarHeight,
            behavior: "smooth",
          });
        }
        break;
      case "contact":
        if (sectionRefs.contactUsRef.current) {
          window.scrollTo({
            top: sectionRefs.contactUsRef.current.offsetTop - navbarHeight,
            behavior: "smooth",
          });
        }
        break;
      default:
        break;
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <div className=" fixed  grid w-full bg-white   sm:overflow-hidden  sm:h-24    max-md:max-w-full z-20   ">
     
      <div className="flex sm:h-[90px] h-[65px]  justify-between sm:justify-around font-poppins  lg:px-24   ">
        <div
          className="z-20  sm:grid content-center w-28 cursor-pointer hidden   "
          onClick={() => handleScroll("home")}
        >
          <Image
            src="/images/navbar-logo-large.png"
            alt="riseupmora-logo"
            width={145}
            height={145}
            className=""
            quality={100}
          />
        </div>
        <div onClick={hamburgerClick}  className="grid content-center cursor-pointer sm:hidden">
          <HamburgerButton />
        </div>

        


        {/* desktop view */}
        <NavigationMenu className="max-sm:hidden">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink
                onClick={() => handleScroll("home")}
                className={clsx(navigationMenuTriggerStyle(), {
                  "after:w-full after:scale-x-100 ": pathname === "/",
                })}
              >
                Home
                {active == "home" && (
                  <div className=" grid   justify-center">
                    <div className="size-1.5 bg-white rounded-full"></div>
                  </div>
                )}
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                onClick={() => handleScroll("about")}
                className={clsx(navigationMenuTriggerStyle(), {
                  "after:w-full after:scale-x-100": pathname === "/",
                })}
              >
                About
                {active == "about" && (
                  <div className=" grid   justify-center">
                    <div className="size-1.5 bg-white rounded-full"></div>
                  </div>
                )}
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                onClick={() => handleScroll("timeline")}
                className={clsx(navigationMenuTriggerStyle(), {
                  "after:w-full after:scale-x-100": pathname === "/",
                })}
              >
                Timeline
                {active == "timeline" && (
                  <div className=" grid   justify-center">
                    <div className="size-1.5 bg-white rounded-full"></div>
                  </div>
                )}
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                onClick={() => handleScroll("contact")}
                className={clsx(navigationMenuTriggerStyle(), {
                  "after:w-full after:scale-x-100 ": pathname === "/",
                })}
              >
                Contact Us
                {active == "contact" && (
                  <div className=" grid   justify-center">
                    <div className="size-1.5 bg-white rounded-full"></div>
                  </div>
                )}
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        

        <Link href="/auth/signin" passHref className=" grid ">
          <PrimaryButtonSmall text="Sign In" />
        </Link>
      </div>

      <div
        className=" h-[5px] w-full self-end"
        style={{
          background:
            "linear-gradient(to right, #0c2735 75%, #28a8e0 75%, #28a8e0 92%, #f1c232 92%, #f1c232 95%)",
        }}
      ></div>

      {/* mobile view */}
      {isMobileMenuOpen && <NavigationMenu className="sm:hidden  mt-[65px]  absolute grid justify-self-center    ">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink
                onClick={() => handleScroll("home")}
                className={clsx(navigationMenuTriggerStyle(), {
                  "after:w-full after:scale-x-100 ": pathname === "/",
                })}
              >
                Home
                {active == "home" && (
                  <div className=" grid   justify-center">
                    <div className="size-1.5 bg-white rounded-full"></div>
                  </div>
                )}
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                onClick={() => handleScroll("about")}
                className={clsx(navigationMenuTriggerStyle(), {
                  "after:w-full after:scale-x-100": pathname === "/",
                })}
              >
                About
                {active == "about" && (
                  <div className=" grid   justify-center">
                    <div className="size-1.5 bg-white rounded-full"></div>
                  </div>
                )}
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                onClick={() => handleScroll("timeline")}
                className={clsx(navigationMenuTriggerStyle(), {
                  "after:w-full after:scale-x-100": pathname === "/",
                })}
              >
                Timeline
                {active == "timeline" && (
                  <div className=" grid   justify-center">
                    <div className="size-1.5 bg-white rounded-full"></div>
                  </div>
                )}
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                onClick={() => handleScroll("contact")}
                className={clsx(navigationMenuTriggerStyle(), {
                  "after:w-full after:scale-x-100 ": pathname === "/",
                })}
              >
                Contact Us
                {active == "contact" && (
                  <div className=" grid   justify-center">
                    <div className="size-1.5 bg-white rounded-full"></div>
                  </div>
                )}
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        }
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
