import React from "react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="w-full bg-gray-900 p-4">
      <div className="relative">
        <div className="absolute top-0 left-0">
          <Image
            src="/img/Group-5.png"
            width={50}
            height={50}
            className="img-fluid col-md-1 col-3"
            alt="Corner Image"
          />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row justify-center items-center lg:w-10/12 mx-auto">
        <div className="w-full lg:w-8/12 flex flex-col md:flex-row justify-center items-center gap-5">
          <div className="mb-4 md:mb-0">
            <Image
              className="img-fluid"
              src="/img/IEEE STUDENT LOGO WHITE.png"
              width={200}
              height={100}
              alt="IEEE Student Logo"
            />
          </div>
          <div>
            <Image
              className="img-fluid mt-1"
              src="/img/IEEEYoungProfessionalsLogoTM_White_Horiz.png"
              width={200}
              height={100}
              alt="IEEE Young Professionals Logo"
            />
          </div>
        </div>
        <div className="text-white text-center lg:text-left w-full lg:w-12/12 mt-4 lg:mt-0">
          The Institute of Electrical and Electronics Engineers (IEEE) is a
          professional organization dedicated to advancing technology for
          humanity. With over 400,000 members in over 160 countries, IEEE is the
          world&apos;s largest technical professional organization. IEEE
          produces over 30% of the world&apos;s literature in the electrical and
          electronics engineering and computer science fields, and sponsors over
          1,900 conferences and events annually. Its mission is to foster
          technological innovation and excellence for the benefit of humanity.
        </div>
        <div className="flex justify-center mt-4">
          <div className="flex space-x-4">
            <Link href="https://www.facebook.com/IEEEUOMSB?mibextid=b06tZ0">
              <div className="p-2 bg-blue-600 rounded-full cursor-pointer">
                <Image
                  src="/img/facebook.png"
                  width={30}
                  height={30}
                  alt="Facebook"
                />
              </div>
            </Link>
            <Link href="https://www.linkedin.com/company/rise-up-mora">
              <div className="p-2 bg-blue-700 rounded-full cursor-pointer">
                <Image
                  src="/img/zeeconvert-71.png"
                  width={30}
                  height={30}
                  alt="LinkedIn"
                />
              </div>
            </Link>
            <Link href="https://instagram.com/ieeesbuom?utm_source=qr&igshid=MzNlNGNkZWQ4Mg%3D%3D">
              <div className="p-2 bg-pink-500 rounded-full cursor-pointer">
                <Image
                  src="/img/insta.png"
                  width={30}
                  height={30}
                  alt="Instagram"
                />
              </div>
            </Link>
            <Link href="https://site.ieee.org/sb-moratuwa/">
              <div className="p-2 bg-gray-700 rounded-full cursor-pointer">
                <Image
                  src="/img/facebook.png"
                  width={30}
                  height={30}
                  alt="Website"
                />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
