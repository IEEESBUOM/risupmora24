import React from "react";
import Registration from "./components/Registration";
import PrimaryButtonSmall from "@/components/ui/PrimaryButtonSmall";
// import PrimaryButtonSmall from "@/components/MainButton";

const Page = () => {
  return (
    <div>
      <PrimaryButtonSmall text="Registration" />
      <Registration />
    </div>
  );
};

export default Page;
