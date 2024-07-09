"use client";
import React from "react";
import Alert from "./Alert";
import Form from "./Form";

const Registration = () => {
  return (
    <div className="flex justify-center">
      <div className="flex flex-col w-2/3 justify-center items-center">
        <Alert />
        <Form />
      </div>
    </div>
  );
};

export default Registration;
