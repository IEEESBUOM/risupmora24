import * as React from "react";
import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import Link from "next/link";
import { usePathname, } from "next/navigation";
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
import { signOut, useSession } from "next-auth/react";
import NavBarProfile from "./NavBarProfile";
import { useGetUserData } from "@/hooks/user/useGetUserData";
import PageLoader from "./PageLoader";

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
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [userData, setUserData] = useState<any>(null);

  const router = useRouter();

  const [showProfile, setShowProfile] = useState<boolean>(false);

  const user = {
    email: session?.user.email as string,
    image: session?.user.image as string,
    firstName: session?.user.name as string,
    _id: session?.user.id as string,
  };
  const userData = useGetUserData({ userEmail: user.email });
   console.log(userData)

  function clickLogoutBtn() {
    signOut();
  }

  // useEffect(() => {
  //   const userData = useGetUserData({ userEmail: user.email });
  //   if (user.email) {
  //     setUserData(userData);
  //   }

  // }, [user.email]);

  useEffect(() => {
    setIsLoading(true);
    if (userData.user) {
      if (
        userData.user.candidate == null &&
        userData.user.role === "candidate"
      ) {
        router.push(`/candidate/registation/${userData.user.id}`);
      } else {
        setIsLoading(false);
      }
    }
    setIsLoading(false);
  }, [userData]);

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

  const handleUserProfile = () => {
    setShowProfile(true);
  };
  if (status == "loading" || isLoading || userData.isPending) {
    return <PageLoader />;
  }

  // console.log("userData", userData.user);

  return (
    <>
      <div className=" fixed  grid w-full bg-white   sm:overflow-hidden  sm:h-24    max-md:max-w-full z-20   ">
        <div className="flex sm:h-[90px] h-[65px]  justify-between sm:px-10 px-2 font-poppins     ">
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
          <div className="grid content-center cursor-pointer sm:hidden">
            {/* mobile view */}

            <Sheet>
              <SheetTrigger asChild>
                <div className="">
                  <HamburgerButton />
                </div>
              </SheetTrigger>
              <SheetContent className=" bg-custom-black">
                <div className="mx-4 grid gap-5 mb-8">
                  <div
                    onClick={() => handleScroll("home")}
                    className={clsx(navigationMenuTriggerStyle(), {
                      "after:w-full after:scale-x-100 font-semibold ":
                        pathname === "/",
                    })}
                  >
                    Home
                    {active == "home" && (
                      <div className=" grid   justify-center">
                        <div className="size-1.5 bg-white rounded-full"></div>
                      </div>
                    )}
                  </div>

                  <div
                    onClick={() => handleScroll("about")}
                    className={clsx(navigationMenuTriggerStyle(), {
                      "after:w-full after:scale-x-100 font-semibold":
                        pathname === "/",
                    })}
                  >
                    About
                    {active == "about" && (
                      <div className=" grid   justify-center">
                        <div className="size-1.5 bg-white rounded-full"></div>
                      </div>
                    )}
                  </div>

                  <div
                    onClick={() => handleScroll("timeline")}
                    className={clsx(navigationMenuTriggerStyle(), {
                      "after:w-full after:scale-x-100 font-semibold":
                        pathname === "/",
                    })}
                  >
                    Timeline
                    {active == "timeline" && (
                      <div className=" grid   justify-center">
                        <div className="size-1.5 bg-white rounded-full"></div>
                      </div>
                    )}
                  </div>

                  <div
                    onClick={() => handleScroll("contact")}
                    className={clsx(navigationMenuTriggerStyle(), {
                      "after:w-full after:scale-x-100 font-semibold ":
                        pathname === "/",
                    })}
                  >
                    Contact Us
                    {active == "contact" && (
                      <div className=" grid   justify-center">
                        <div className="size-1.5 bg-white rounded-full"></div>
                      </div>
                    )}
                  </div>
                </div>

                {/* <SheetFooter> */}
                <div className="h-[2px]  w-full bg-white"></div>
                {userData?.user?.role == "candidate" && (
                  <NavBarProfile
                    id={userData.user?.id}
                    name={userData.user?.name}
                    email={userData.user?.email}
                    image={userData.user?.image || ""}
                    clickLogoutBtn={clickLogoutBtn}
                    setShowProfile={setShowProfile}
                    showProfile={showProfile}
                    isInSheet={true}
                  />
                )}
                {status == "authenticated" &&
                  userData?.user?.role == "admin" && (
                    <div className=" grid mt-5   gap-5 justify-start ">
                      <div
                        className="grid justify-start"
                        onClick={() => {
                          signOut();
                        }}
                      >
                        <PrimaryButtonSmall text="< Logout" />
                      </div>
                      <Link href="/admin/add-company" passHref>
                        <PrimaryButtonSmall text="Admin >" />
                      </Link>
                    </div>
                  )}
                {status == "authenticated" &&
                  userData?.user?.role == "companyCoordinator" && (
                    <div className=" grid mt-5  gap-5 justify-start ">
                      <div
                        className="grid justify-start"
                        onClick={() => {
                          signOut();
                        }}
                      >
                        <PrimaryButtonSmall text="< Logout" />
                      </div>
                      <Link
                        href={`/admin/company-coordinator/${userData.user.id}`}
                        passHref
                      >
                        <PrimaryButtonSmall text="Dashboard >" />
                      </Link>
                    </div>
                  )}

                {status == "authenticated" &&
                  userData?.user?.role == "departmentCoordinator" && (
                    <div className=" grid mt-5   gap-5 justify-start   ">
                      <div
                        className="grid justify-start"
                        onClick={() => {
                          signOut();
                        }}
                      >
                        <PrimaryButtonSmall text="< Logout" />
                      </div>
                      <Link
                        href={`/admin/department-coordinator/${userData.user.id}`}
                        passHref
                      >
                        <PrimaryButtonSmall text="Dashboard >" />
                      </Link>
                    </div>
                  )}

                {/* </SheetFooter> */}
              </SheetContent>
            </Sheet>
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
          {/* {if (status == "authenticated" && userData.user) {
          <div
          onClick={handleUserProfile}
          className=" flex gap-2 cursor-pointer"
        >
          <div className="grid content-center font-quicksand font-semibold text-lg">
            {user.firstName}
          </div>
          <div className=" py-4 sm:py-2 grid content-center">
            {userData.user && (
            <Image
              src={userData.user?.image}
              alt="profile picture"
              width={50}
              height={50}
              className="rounded-full w-auto h-auto"
            />)}
          </div>
        </div>
         }else if (status == "unauthenticated") {
          <div></div>
            


         }
         else {
            <div className="grid content-center font-quicksand font-semibold text-lg">
                loading
              </div>
         }


         } */}

          <div className="  grid content-center min-w-36 justify-center">
            {status == "authenticated" &&
              userData?.user?.role == "candidate" && (
                <div
                  onClick={handleUserProfile}
                  className=" flex gap-2 cursor-pointer"
                >
                  <div className="grid content-center font-quicksand font-semibold text-lg">
                    {user.firstName}
                  </div>
                  <div className=" py-4 sm:py-2 grid content-center">
                    {userData.user?.image && (
                      <Image
                        src={userData.user?.image}
                        alt="profile picture"
                        width={40}
                        height={40}
                        className="rounded-full w-auto h-auto"
                      />
                    )}
                  </div>
                </div>
              )}

            {status == "authenticated" && userData?.user?.role == "admin" && (
              <div className="sm:flex hidden ">
                <div
                  className=""
                  onClick={() => {
                    signOut();
                  }}
                >
                  <PrimaryButtonSmall text="< Logout" />
                </div>
                <Link href="/admin/add-company" passHref>
                  <PrimaryButtonSmall text="Admin >" />
                </Link>
              </div>
            )}
            {status == "authenticated" &&
              userData?.user?.role == "companyCoordinator" && (
                <div className="sm:flex hidden ">
                  <div
                    className=""
                    onClick={() => {
                      signOut();
                    }}
                  >
                    <PrimaryButtonSmall text="< Logout" />
                  </div>
                  <Link
                    href={`/admin/company-coordinator/${userData.user.id}`}
                    passHref
                  >
                    <PrimaryButtonSmall text="Dashboard >" />
                  </Link>
                </div>
              )}

            {status == "authenticated" &&
              userData?.user?.role == "departmentCoordinator" && (
                <div className=" sm:flex hidden ">
                  <div
                    className=""
                    onClick={() => {
                      signOut();
                    }}
                  >
                    <PrimaryButtonSmall text="< Logout" />
                  </div>
                  <Link
                    href={`/admin/department-coordinator/${userData.user.id}`}
                    passHref
                  >
                    <PrimaryButtonSmall text="Dashboard >" />
                  </Link>
                </div>
              )}

{status == "authenticated" &&
              userData?.user?.role == "panelist" && (
                <div className=" sm:flex hidden ">
                  <div
                    className=""
                    onClick={() => {
                      signOut();
                    }}
                  >
                    <PrimaryButtonSmall text="< Logout" />
                  </div>
                  <Link
                    href={`/company/dashboard/${userData.user.id}`}
                    passHref
                  >
                    <PrimaryButtonSmall text="Dashboard >" />
                  </Link>
                </div>
              )}

            {status == "unauthenticated" && (
              <Link href="/auth/signin" passHref className=" grid ">
                <PrimaryButtonSmall text="Sign In" />
              </Link>
            )}

            {status != "authenticated" && status != "unauthenticated" && (
              <Image
                src="/spinner/loading-black.svg"
                width={28}
                height={28}
                alt="spinner"
              />
            )}
            {status == "authenticated" && !userData.user && (
              <Image
                src="/spinner/loading-black.svg"
                width={28}
                height={28}
                alt="spinner"
              />
            )}
          </div>
        </div>

        <div
          className=" h-[5px] w-full self-end"
          style={{
            background:
              "linear-gradient(to right, #0c2735 75%, #28a8e0 75%, #28a8e0 92%, #f1c232 92%, #f1c232 95%)",
          }}
        ></div>
      </div>
      <div className=" relative ">
        <div
          className={` fixed top-[96px] ${
            !showProfile
              ? "hidden"
              : "xl:w-3/12 lg:w-3/12 md:w-1/3 2xl:w-1/5 sm:block hidden"
          } rounded-b-2xl  right-0 z-50   bg-custom-black  `}
        >
          {userData?.user?.role == "candidate" && (
            <NavBarProfile
              id={userData.user?.id}
              name={userData.user?.name}
              email={userData.user?.email}
              image={userData.user?.image || ""}
              clickLogoutBtn={clickLogoutBtn}
              setShowProfile={setShowProfile}
              showProfile={showProfile}
              isInSheet={false}
            />
          )}
        </div>
      </div>
    </>
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
