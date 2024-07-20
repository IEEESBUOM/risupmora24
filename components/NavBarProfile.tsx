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
  isInSheet: boolean;
}


const NavBarProfile = memo(function NavBarProfile({
  user,
  showProfile,
  setShowProfile,
  clickLogoutBtn,
  isInSheet,
}: NavBarProfileProps) {
 

 
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
   
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
     
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
      <div ref={profileRef} className=" text-white font-poppins">
        {!isInSheet && <div className="z-50 flex m-3 items-center justify-end">
        
          <button onClick={() => setShowProfile(false)}>
            <AiOutlineClose />
          </button>
        </div>}
        {!isInSheet && <div className="flex  pl-3 items-center  gap-2">
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
        </div>}
        
        <div className=" mt-5 mb-5 md:p-3 lg:p-0 w-full flex xl:w-full  justify-center">
          <div className="z-20  w-full max-w-sm   ounded-lg shadow  ">
            <Link  href={`/candidate/candidate-view/${user._id}`}><div className="  px-4 py-2 font-medium items-center flex justify-between text-white hover:bg-slate-600 transition duration-300 ease-in-out  ">
              
                <div className="flex gap-2   items-center">
                  {!isInSheet && <MdOutlineManageAccounts size={25} />}
                  <div className="2xl:text-base xl:text-base  ] md:text-sm">
                    Manage account
                  </div>
                </div>
              
            </div></Link>
            {!isInSheet && <div className="h-[2px] w-full bg-white"></div>}

            <button className="w-full" onClick={clickLogoutBtn}>
              <div className="items-center gap-2  flex px-4 py-2 font-medium  text-white hover:bg-slate-600 transition duration-300 ease-in-out">
                {!isInSheet && <MdOutlineLogout size={23} />}
                Sign out
              </div>
            </button>
          </div>
        </div>
        {isInSheet && <div className="ml-4">{user.email}</div>}
      </div>
    </>
  );
});

export default NavBarProfile;
