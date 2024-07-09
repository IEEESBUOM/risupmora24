import React from "react";
import Registration from "./components/Registration";
import PrimaryButtonSmall from "@/components/ui/PrimaryButtonSmall";
// import PrimaryButtonSmall from "@/components/MainButton";

const Page = () => {
  return (
    <div className="p-10 flex flex-col gap-10 ">
      <PrimaryButtonSmall text="Registration" />
      <Registration />
    </div>
  );
};

export default Page;
