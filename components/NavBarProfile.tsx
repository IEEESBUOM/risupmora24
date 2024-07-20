import Image from "next/image";
import React, {
  Dispatch,
  SetStateAction,
  memo,
  useEffect,
  useRef,
  // useState,
} from "react";
import {
  AiOutlineClose,
  // AiOutlineDownCircle,
  // AiOutlineUpCircle,
} from "react-icons/ai";
import { MdOutlineLogout, MdOutlineManageAccounts } from "react-icons/md";
// import { OrganizationProps } from "./NavBar";
import Link from "next/link";

interface UserType {
  _id: string;
  email: string;
  firstName: string;
  image: string;
}

// import { useAuth } from "@/app/AuthContext";
// import { UserType } from "@/app/Type";

interface NavBarProfileProps {
  user: UserType;
  showProfile: boolean;
  setShowProfile: Dispatch<SetStateAction<boolean>>;
  clickLogoutBtn: () => void;
}
// type Organization = {
//   organization: OrganizationProps[];
// };

const NavBarProfile = memo(function NavBarProfile({
  user,
  showProfile,
  setShowProfile,
  clickLogoutBtn,
}: NavBarProfileProps) {
  // const [isOrganizationShowButton, setIsOrganizationShowButton] =
  //   useState<boolean>(false);

  // const { organization } = useAuth() as unknown as Organization;
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // console.log(organization)
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        // Clicked outside of modal, so close it
        setShowProfile(false);
      }
    };

    // Add event listener when the modal is open
    if (showProfile) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      // Remove event listener when the modal is closed
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Cleanup function to remove event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showProfile, setShowProfile]);

  return (
    <>
      <div ref={profileRef} className="bg-slate-100 text-black .modal-content">
        <div className="z-50 flex m-3 items-center justify-end">
          {/* <div className="2xl:text-base  xl:text-base lg:text-xs text-xs	 font-medium	">
            {user?.email}
          </div> */}
          <button onClick={() => setShowProfile(false)}>
            <AiOutlineClose />
          </button>
        </div>
        <div className="flex  items-center  gap-2">
          <div>
            <Image
              src={
                "https://res.cloudinary.com/dumh5befg/image/upload/v1720951327/users/clyld3pa40000wb6y5trem706/image.jpg"
              }
              alt="profile picture"
              width={40}
              height={15}
              className="rounded-full w-auto h-auto"
            />
          </div>
          <div className="flex flex-col">
            <div>{user.firstName}</div>
            <div> {user?.email}</div>
          </div>
        </div>
        <div>
          {/* <div className="font-medium	">{`Hi ${user?.firstName} !`}</div> */}

          {/* <Link href={""}>
            <button
              onClick={() => setShowProfile(false)}
              className="rounded-full 2xl:text-base py-2 px-2 md:px-1 md:py-1 md:text-sm lg:text-sm xl:text-base xl:py-1 xl:px-2 lg:px-2 bg-gray-200 text-gray-600 font-semibold  shadow-md hover:bg-gray-300 "
            >
              Manage your account
            </button>
          </Link> */}
        </div>
        <div className=" mt-5 mb-5 md:p-3 lg:p-0 w-full flex xl:w-full  justify-center">
          <div className="z-20  w-full max-w-sm bg-gray-200  divide-gray-50 rounded-lg shadow  ">
            <div className="  px-4 py-2 font-medium items-center flex justify-between text-gray-700 rounded-full bg-gray-200 ">
              <Link href={`/candidate/candidate-view/${user._id}`}>
                <div className="flex gap-2  items-center">
                  <MdOutlineManageAccounts size={25} />
                  <div className="2xl:text-base xl:text-base   md:text-sm">
                    Manage accounts
                  </div>
                </div>
              </Link>
            </div>
            <div className="h-1 w-full bg-white"></div>

            <button className="" onClick={clickLogoutBtn}>
              <div className="items-center gap-2  flex px-4 py-2 font-medium  text-gray-700 rounded-t-lg bg-gray-200  2xl:text-base xl:text-base   md:text-sm text-sm">
                <MdOutlineLogout size={23} />
                Sign out
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
});

export default NavBarProfile;
