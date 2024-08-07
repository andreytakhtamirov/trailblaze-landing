"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import TextTransition, { presets } from 'react-text-transition';

const PainPoints = ['Busy Roads?', 'Planning Routes?', 'Unclear Trail Info?', 'Repetitive Routes?'];

const Hero = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(
      () => setIndex((index) => index + 1),
      4000,
    );
    return () => clearTimeout(intervalId);
  }, []);

  return (
    <>
      <section className="overflow-hidden pb-10 pt-35 md:pt-40 lg:pb-15 xl:pb-15 xl:pt-46">
        <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
          <div className="flex lg:items-center lg:gap-8 xl:gap-32.5 flex-col md:flex-row">
            <div className="md:w-1/2 xs:w-full">
              <h4 className="mb-4.5 text-lg font-medium text-black dark:text-white">
                Trailblaze - Explore Scenic Routes and Trails
              </h4>
              <h1 className="mb-4 pr=16 md:text-3xl font-bold text-black dark:text-white xl:text-hero sm:text-2xl xs:text-xl">
                Tired of
                &#8239;
                <span className="relative inline-block before:absolute before:top-6 xs:before:top-6 sm:before:top-7 md:before:top-8 lg:before:top-8 xl:before:top-13 before:left-0 before:-z-1 before:h-1 before:w-full before:bg-titlebg dark:before:bg-titlebgdark ">
                  <TextTransition inline={true} springConfig={presets.gentle}>{PainPoints[index % PainPoints.length]}</TextTransition>
                </span>
              </h1>
              <p>
                Trailblaze - Offering bike-friendly routing that goes beyond basic directions. Customize your journey to be as scenic or direct as you like, exploring picturesque trails and avoiding busy roads for a more enjoyable ride.
              </p>
              <br></br>
              <p className="text-md font-semibold">
                Available across all of North America
              </p>
            </div>

            <div className="mt-10 animate_right md:w-1/2 s:w-full">
              <div className="relative 2xl:-mr-7.5">
                <div className="relative aspect-[2/3] sm:w-sm xs:w-xs bg-transparent w-full">
                  <Image
                    className="object-contain drop-shadow-2xl"
                    src="/images/features/app-screenshot.png"
                    alt="Hero"
                    fill
                  />
                </div>
                <div className="mt-10">
                  <p className="mt-5 text-black dark:text-white text-center">
                    Get the app for free on iOS and Android.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
