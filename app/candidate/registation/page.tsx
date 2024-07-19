import React from "react";
import Registration from "./components/Registration";
import MainBtn from "@/components/MainBtn";
// import PrimaryButtonSmall from "@/components/MainButton";

const Page = () => {
  return (
    <div className="p-10 flex flex-col gap-10 ">
      <MainBtn text="Registration" />
      <div className="lg:pl-0 md:pl-10 pl-3">
        <Registration />
      </div>
    </div>
  );
};

export default Page;
