import React from "react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="w-full bg-[#112735] pb-10 mt-10 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-full flex justify-end items-end">
        <Image
          src="/img/Group-5.png"
          width={80}
          height={80}
          className="img-fluid col-md-1 col-3"
          alt="Corner Image"
        />
      </div>

      <div className="ml-[5vw] lg:ml-[10vw] z-5 flex flex-col gap-8 relative lg:w-10/12 mx-auto">
        <div className="flex flex-col items-center mx-40 justify-center gap-8 lg:w-8/12 -mt-12">
          <div className="flex flex-col lg:flex-row items-center mt-12 lg:mt-24 justify-center gap-8">
            <div className="relative w-72 mt-9 h-20 lg:mx-10 lg:w-64 lg:h-24">
              <Image
                src="/img/IEEE STUDENT LOGO WHITE.png"
                layout="fill"
                objectFit="contain"
                alt="IEEE Student Logo"
              />
            </div>
            <div className="relative mt-9 w-72 h-20 lg:mx-10 lg:w-64 lg:h-24">
              <Image
                src="/img/IEEEYoungProfessionalsLogoTM_White_Horiz.png"
                layout="fill"
                objectFit="contain"
                alt="IEEE Young Professionals Logo"
              />
            </div>
          </div>
        </div>
        <div className="text-white font-poppins text-center font-medium text-sm md:text-lg leading-6 lg:w-12/12 mt-8 px-4 lg:px-0">
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
          <div className="flex gap-4">
            <Link href="https://www.facebook.com/IEEEUOMSB?mibextid=b06tZ0">
              <div className="p-1 bg-[#112735] rounded-full cursor-pointer transform scale-90 transition duration-150 ease hover:scale-105">
                <Image
                  src="/img/facebook.png"
                  width={40}
                  height={40}
                  alt="Facebook"
                />
              </div>
            </Link>
            <Link href="https://www.linkedin.com/company/rise-up-mora">
              <div className="p-1 bg-[#112735] rounded-full cursor-pointer transform scale-90 transition duration-150 ease hover:scale-105">
                <Image
                  src="/img/zeeconvert-71.png"
                  width={40}
                  height={40}
                  alt="LinkedIn"
                />
              </div>
            </Link>
            <Link href="https://instagram.com/ieeesbuom?utm_source=qr&igshid=MzNlNGNkZWQ4Mg%3D%3D">
              <div className="p-1 bg-[#112735] rounded-full cursor-pointer transform scale-90 transition duration-150 ease hover:scale-105">
                <Image
                  src="/img/insta.png"
                  width={40}
                  height={40}
                  alt="Instagram"
                />
              </div>
            </Link>
            <Link href="https://site.ieee.org/sb-moratuwa/">
              <div className="p-1 bg-[#112735] rounded-full cursor-pointer transform scale-90 transition duration-150 ease hover:scale-105">
                <Image
                  src="/img/web.png"
                  width={40}
                  height={40}
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
