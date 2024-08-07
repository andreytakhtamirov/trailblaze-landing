"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Icon } from '@iconify/react';
// import { getOS } from '../../util/deviceDetect';

const CTA = () => {
  // const deviceType = getOS();
  return (
    <>
      {/* <!-- ===== CTA Start ===== --> */}
      <section className="overflow-hidden px-4 py-4 md:px-8 lg:py-5 xl:py-5 2xl:px-0">
        <div className="mx-auto max-w-c-1390 rounded-lg bg-gradient-to-t from-[#F8F9FF] to-[#DEE7FF] px-7.5 py-12.5 dark:bg-blacksection dark:bg-gradient-to-t dark:from-transparent dark:to-transparent dark:stroke-strokedark md:px-12.5 xl:px-17.5 xl:py-15">
          <div className="flex flex-wrap gap-8 md:flex-nowrap md:items-center md:justify-between md:gap-0 mb-8">
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
              className="animate_left lg:w-[60%]"
            >
              <h2 className="mb-4 w-11/12 text-3xl font-bold text-black dark:text-white xl:text-sectiontitle4">
                Discover Scenic Routes with Trailblaze
              </h2>
              <p>
                Ready to explore the great outdoors like never before? Whether you're cycling, hiking, or simply exploring, Trailblaze helps you find scenic trails and quieter paths, making your journeys more enjoyable.
                
                <br></br>
                <br></br>
                
                Join Trailblaze and start your adventure today.

              </p>
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
              <div className="mt-12 flex lg:flex-row md:flex-row sm:flex-row items-center xs:flex-col flex-col xs:gap-4">
                <a
                  href="https://apps.apple.com/ca/app/trailblaze/id6450859439"
                  className='inline-flex items-center gap-2.5 rounded-full px-6 py-10 font-medium hover:opacity-90 w-full sm:w-1/2 lg:w-[300px] h-[60px] justify-between text-md sm:text-base md:text-lg lg:text-xl bg-black text-white'
                >
                  <Icon icon="logos:apple" style={{ width: 30, height: 30, fill: 'white' }} />
                  Get for iOS
                  <Image
                    width={30}
                    height={30}
                    src="/images/icon/icon-arrow-dark.svg"
                    alt="Arrow"
                    className="dark:hidden"
                  />
                  <Image
                    width={30}
                    height={30}
                    src="/images/icon/icon-arrow-light.svg"
                    alt="Arrow"
                    className="hidden dark:block"
                  />
                </a>
                <a
                  href="https://github.com/andreytakhtamirov/trailblaze/releases/latest"
                  className='inline-flex items-center gap-2.5 rounded-full px-6 py-10 font-medium hover:opacity-90 w-full sm:w-1/2 lg:w-[300px] h-[60px] justify-between text-md sm:text-base md:text-lg lg:text-xl bg-black text-white'
                >
                  <Icon icon="mingcute:android-line" style={{ width: 30, height: 30, color: "white" }} />
                  Get for Android
                  <Image
                    width={30}
                    height={30}
                    src="/images/icon/icon-arrow-dark.svg"
                    alt="Arrow"
                    className="dark:hidden"
                  />
                  <Image
                    width={30}
                    height={30}
                    src="/images/icon/icon-arrow-light.svg"
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
