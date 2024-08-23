import Image from "next/image";
import { motion, useInView, useAnimationControls } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Topic from "./ui/topic";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

interface ImageProps {
  src: string;
}

const Gallery = () => {
  const topicRef = useRef<HTMLDivElement>(null);
  const [overlay, toggleOverlay] = useState<boolean>(false);
  const [overlayImage, setOverlayImage] = useState<string | null>(null);
  const controls = useAnimationControls();
  const overlayRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(galleryRef, { once: false });

  useEffect(() => {
    if (overlay) {
      if (overlayRef.current) {
        overlayRef.current.style.display = "block";
      }
    } else {
      if (overlayRef.current) {
        overlayRef.current.style.display = "none";
      }
    }
  }, [overlay, overlayImage]);

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
    toggleOverlay(false);
  }, [controls, isInView]);

  const container = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: 0,
      },
    },
  };

  const item = (delay: number, i: number) => ({
    hidden: { x: i * 800, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "tween",
        delay: delay * 0.1,
      },
    },
  });

  const images: ImageProps[] = [
    { src: "/assets/img/wso2.png" },
    { src: "/assets/img/pickme.png" },
    { src: "/images/gallery/img3.jpg" },
    { src: "/images/gallery/img4.jpg" },
    { src: "/images/gallery/img5.jpg" },
    { src: "/images/gallery/img6.jpg" },
    { src: "/images/gallery/img7.jpg" },
    { src: "/images/gallery/img8.jpg" },
    { src: "/images/gallery/img9.jpg" },
    { src: "/images/gallery/img10.jpg" },
    { src: "/images/gallery/img11.jpg" },
    { src: "/images/gallery/img12.jpg" },
  ];

  useEffect(() => {
    if (topicRef.current) {
      gsap.fromTo(
        topicRef.current,
        { transform: "translate3d(-100px, 0, 0)", opacity: 0.5 }, // Start off-screen to the left
        {
          transform: "translate3d(0, 0, 0)", // End at its final position
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: topicRef.current,
            start: "top 80%",
            end: "bottom 20%",
            scrub: true,
            // Remove 'once: true' to allow re-triggering of the animation
          },
        }
      );
    }
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 relative">
      <div className="mb-64 absolute top-0 left-0 " ref={topicRef}>
        <Topic text="Gallery" />
      </div>
      <motion.div
        className="grid grid-cols-3 gap-4 mt-16"
        variants={container}
        initial="hidden"
        animate={controls}
        ref={galleryRef}
      >
        {images.map((image, index) => (
          <motion.div
            className="relative"
            key={index}
            variants={item(
              Math.floor(Math.random() * 13),
              Math.random() < 0.5 ? -1 : 1
            )}
            onClick={() => {
              toggleOverlay(true);
              setOverlayImage(image.src);
            }}
          >
            <Image
              width={300}
              height={300}
              className="w-full h-full object-cover"
              src={image.src}
              quality={60}
              alt=""
            />
          </motion.div>
        ))}
      </motion.div>
      <div
        className={`fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center ${
          overlay ? "block" : "hidden"
        }`}
        ref={overlayRef}
        onClick={() => {
          toggleOverlay(false);
        }}
      >
        {overlayImage && (
          <img className="max-w-full max-h-full" src={overlayImage} alt="" />
        )}
      </div>
    </div>
  );
};

export default Gallery;
