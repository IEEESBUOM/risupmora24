import React, { useState, useEffect } from "react";
import {
  CldUploadWidget,
  CloudinaryUploadWidgetInfo,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import { FaCloudUploadAlt } from "react-icons/fa";
import { FaRegFilePdf } from "react-icons/fa6";
import Image from "next/image";

const CloudinaryUpload = ({
  setImgUrl,
}: {
  setImgUrl: (url: string) => void;
}) => {
  const [profileImage, setProfileImage] = useState("");

  useEffect(() => {
    if (profileImage) {
      setImgUrl(profileImage);
    }
  }, [profileImage, setImgUrl]);

  return (
    <div>
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
          // cropping: true,
          multiple: false,
          showSkipCropButton: false,
          // croppingAspectRatio: 0.75,
          // croppingDefaultSelectionRatio: 0.75,
          // croppingShowDimensions: true,
          // croppingCoordinatesMode: "custom",
          defaultSource: "local",
          resourceType: "image",
          folder: "organization",
          cropping: false,
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
        {({ open }) => (
          <button
            className="w-full   lg:w-full border border-[#0c2735] rounded-2xl border-size-2"
            type="button"
            onClick={() => {
              open();
            }}
          >
            <div className="p-2 w-full   lg:w-full text-black font-semibold flex items-center justify-center gap-2 bg-[#ffffff]  rounded-2xl">
              <FaCloudUploadAlt />
              Upload
            </div>
          </button>
        )}
      </CldUploadWidget>
      {profileImage && (
        <div className="mt-4">
          {profileImage.endsWith(".pdf") ? (
            <a
              href={profileImage}
              target="_blank"
              rel="noopener noreferrer"
              className="block h-16 text-center p-2 border border-gray-300 rounded-2xl bg-gray-100 flex items-center justify-center"
              title="Preview PDF"
            >
              <FaRegFilePdf className="text-4xl text-gray-500" />
              <span className="absolute inset-0 flex items-center justify-center text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
                Preview PDF
              </span>
            </a>
          ) : (
            <Image
              src={profileImage}
              alt="Uploaded"
              width={200}
              height={200}
              className="w-24 h-24 rounded-2xl"
            />
          )}
        </div>
      )}
    </div>
  );
};

export default CloudinaryUpload;
