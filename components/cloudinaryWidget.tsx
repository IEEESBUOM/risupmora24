import React, { useState } from "react";
import {
  CldUploadWidget,
  CloudinaryUploadWidgetInfo,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import { FaCloudUploadAlt } from "react-icons/fa";

const CloudinaryUpload = () => {
  const [profileImage, setProfileImage] = useState("");

  console.log(profileImage);
 
  

  return (
    <CldUploadWidget
      uploadPreset="peu0blg2"
      onOpen={() => {
        console.log("isPhotographer");
      }}
      onSuccess={(results: CloudinaryUploadWidgetResults) => {
        const uploadedResult = results.info as CloudinaryUploadWidgetInfo;
        const profileImageURL = {
          image: uploadedResult.secure_url,
        };
        setProfileImage(profileImageURL.image);
      }}
      options={{
        tags: ["organization image"],
        sources: ["local"],
        googleApiKey: "<image_search_google_api_key>",
        showAdvancedOptions: false,
        cropping: true,
        multiple: false,
        showSkipCropButton: false,
        croppingAspectRatio: 0.75,
        croppingDefaultSelectionRatio: 0.75,
        croppingShowDimensions: true,
        croppingCoordinatesMode: "custom",
        defaultSource: "local",
        resourceType: "image",
        folder: "organization",
        styles: {
          palette: {
            window: "#ffffff",
            sourceBg: "#f4f4f5",
            windowBorder: "#90a0b3",
            tabIcon: "#000000",
            inactiveTabIcon: "#555a5f",
            menuIcons: "#555a5f",
            link: "#000000",
            action: "#000000",
            inProgress: "#464646",
            complete: "#000000",
            error: "#cc0000",
            textDark: "#000000",
            textLight: "#fcfffd",
            theme: "white",
          },
        },
      }}
    >
      {({ open }) => {
        return (
          <button
            onClick={() => {
              open();
            }}
          >
            <div className="p-2 text-white font-semibold flex items-center justify-center gap-2 bg-slate-400 rounded-2xl w-full">
              <FaCloudUploadAlt />
              Upload 
            </div>
          </button>
        );
      }}
    </CldUploadWidget>
  );
};
export default CloudinaryUpload;
