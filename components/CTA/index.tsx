"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
// import { getOS } from '../../util/deviceDetect';

const CTA = () => {
  // const deviceType = getOS();
  return (
    <>
      {/* <!-- ===== CTA Start ===== --> */}
      <section id="download" className="overflow-hidden px-4 py-20">
        <div className="mx-auto max-w-c-1390 rounded-lg bg-gradient-to-t from-[#F8F9FF] to-[#DEE7FF] px-7.5 py-7 dark:bg-blacksection dark:bg-gradient-to-t dark:from-transparent dark:to-transparent dark:stroke-strokedark md:px-12.5 xl:px-17.5 xl:py-15">
          <div className="mb-8 flex flex-col gap-8 xs:flex-nowrap sm:flex-col md:flex-row md:items-center md:justify-between md:gap-0">
            <motion.div
              variants={{
                hidden: {
                  opacity: 0,
                  x: -20,
                },

                visible: {
                  opacity: 1,
                  x: 0,
                },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 1, delay: 0.1 }}
              viewport={{ once: true }}
              className="animate_left w-[60%] xs:w-[100%] sm:w-[100%]"
            >
              <h2 className="mb-4 text-3xl font-bold text-black dark:text-white xl:text-sectiontitle4">
                Discover Scenic Routes with Trailblaze
              </h2>
              <p>
                Ready to explore the great outdoors like never before? Whether
                you're cycling, hiking, or simply exploring, Trailblaze helps
                you find scenic trails and quieter paths, making your journeys
                more enjoyable.
                <br></br>
                <br></br>
                Join Trailblaze and start your adventure today.
              </p>
            </motion.div>
            <motion.div
              className="animate_right mx-auto mt-10 w-1/2 drop-shadow-2xl xs:mt-0 xs:w-full"
              variants={{
                hidden: {
                  opacity: 0,
                  x: -20,
                },

                visible: {
                  opacity: 1,
                  x: 0,
                },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 1, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="relative 2xl:-mr-7.5">
                <div className="relative mx-auto aspect-[2/3] w-2/3 overflow-hidden bg-transparent">
                  <Image
                    className="object-cover object-top drop-shadow-2xl"
                    src="/trailblaze-landing/images/features/app-screenshot-2.png"
                    alt="Hero"
                    fill
                    sizes="(max-width: 768px) 90vw, 66vw"
                    style={{
                      maskImage:
                        "linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 70%, rgba(0, 0, 0, 0) 100%)",
                      WebkitMaskImage:
                        "linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 70%, rgba(0, 0, 0, 0) 100%)",
                    }}
                    draggable="false"
                  />
                </div>
              </div>
            </motion.div>
          </div>
          <div>
            <motion.div
              variants={{
                hidden: {
                  opacity: 0,
                  x: 20,
                },

                visible: {
                  opacity: 1,
                  x: 0,
                },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 1, delay: 0.1 }}
              viewport={{ once: true }}
              className="animate_right lg:w-[60%]"
            >
              <div className="mt-12 flex flex-col items-center gap-4 xs:flex-col sm:flex-row md:flex-row lg:flex-row">
                <a
                  href="https://apps.apple.com/ca/app/trailblaze/id6450859439"
                  target="_blank"
                  className="text-md inline-flex h-[30px] w-full items-center justify-between gap-2.5 rounded-full bg-black px-6 py-8 font-medium text-white hover:opacity-90 sm:w-1/2 sm:text-base md:text-lg lg:w-[300px] lg:text-xl"
                >
                  <Icon icon="logos:apple" className="h-7 w-10 fill-white" />
                  Get for iOS
                  <Image
                    width={30}
                    height={30}
                    src="/trailblaze-landing/images/icon/icon-arrow-dark.svg"
                    alt="Arrow"
                    className="dark:hidden"
                  />
                  <Image
                    width={30}
                    height={30}
                    src="/trailblaze-landing/images/icon/icon-arrow-light.svg"
                    alt="Arrow"
                    className="hidden dark:block"
                  />
                </a>
                <a
                  href="https://github.com/andreytakhtamirov/trailblaze/releases/latest"
                  target="_blank"
                  className="text-md font-small inline-flex h-[30px] w-full items-center justify-between gap-2.5 rounded-full bg-black px-6 py-8 text-white hover:opacity-90 sm:w-1/2 sm:text-base md:text-lg lg:w-[300px] lg:text-xl"
                >
                  <Icon
                    icon="mingcute:android-line"
                    className="h-8 w-10 text-white"
                  />
                  Get for Android
                  <Image
                    width={30}
                    height={30}
                    src="/trailblaze-landing/images/icon/icon-arrow-dark.svg"
                    alt="Arrow"
                    className="dark:hidden"
                  />
                  <Image
                    width={30}
                    height={30}
                    src="/trailblaze-landing/images/icon/icon-arrow-light.svg"
                    alt="Arrow"
                    className="hidden dark:block"
                  />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* <!-- ===== CTA End ===== --> */}
    </>
  );
};

export default CTA;
