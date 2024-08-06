"use client";
import Image from "next/image";
import { useState, useEffect} from "react";
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
      <section className="overflow-hidden pb-20 pt-35 md:pt-40 xl:pb-25 xl:pt-46">
        <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
          <div className="flex lg:items-center lg:gap-8 xl:gap-32.5">
            <div className=" md:w-2/3">
              <h4 className="mb-4.5 text-lg font-medium text-black dark:text-white">
                Trailblaze - Explore Scenic Routes and Trails
              </h4>
              <h1 className="mb-10 pr=16 text-3xl font-bold text-black dark:text-white xl:text-hero">
              Tired of <TextTransition inline={true} springConfig={presets.gentle}>{PainPoints[index % PainPoints.length]}</TextTransition>
              </h1>
              <p>
              Trailblaze - Offering bike-friendly routing that goes beyond basic directions. Customize your journey to be as scenic or direct as you like, exploring picturesque trails and avoiding busy roads for a more enjoyable ride.
              </p>

              <div className="mt-10">
                <p className="mt-5 text-black dark:text-white">
                  Get the app for free on iOS and Android.
                </p>
              </div>
            </div>

            <div className="animate_right hidden md:w-1/2 lg:block">
              <div className="relative 2xl:-mr-7.5">
                <Image
                  src="/images/shape/shape-01.png"
                  alt="shape"
                  width={46}
                  height={246}
                  className="absolute -left-11.5 top-0"
                />
                <Image
                  src="/images/shape/shape-02.svg"
                  alt="shape"
                  width={36.9}
                  height={36.7}
                  className="absolute bottom-0 right-0 z-10"
                />
                <Image
                  src="/images/shape/shape-03.svg"
                  alt="shape"
                  width={21.64}
                  height={21.66}
                  className="absolute -right-6.5 bottom-0 z-1"
                />
                <div className=" relative aspect-[700/444] w-full">
                  <Image
                    className="shadow-solid-l dark:hidden"
                    src="/images/hero/hero-light.svg"
                    alt="Hero"
                    fill
                  />
                  <Image
                    className="hidden shadow-solid-l dark:block"
                    src="/images/hero/hero-dark.svg"
                    alt="Hero"
                    fill
                  />
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
