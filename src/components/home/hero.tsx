"use client";

import { motion, Variants } from "motion/react";
import Link from "next/link";
import { Github } from "../icons";

const Hero = () => {
  const showImage: Variants = {
    offscreen: {
      scale: 0.8,
      opacity: 0,
      y: 50
    },
    onscreen: {
      opacity: 1,
      y: 0,
      scale: 1.2,
      transition: {
        type: "spring"
      }
    }
  };

  return (
    <section className="w-full pt-[144px] pb-[50px] md:pb-[144px] min-h-screen flex items-center px-6">
      <div className="w-full mx-auto lg:max-w-[980px] flex lg:justify-center flex-col lg:items-center relative">
        <div className="w-full mb-8">
          <h1 className="text-fm-black text-center text-[25px] md:text-[38.75px] font-bold leading-[44px] mb-[8px]">
            With Formulate
          </h1>

          <h2 className="text-fm-black text-center font-bold text-[40px] leading-[46px] lg:text-[82px] lg:leading-[82px] mb-[20px]">
            Create forms.<br />
            <span className="blue-mark">Save time.</span>
          </h2>

          <p className="text-center justify-center text-[#6e6e73] text-lg leading-snug lg:text-2xl lg:leading-8 font-semibold tracking-tight">
            Generate forms for React (with Shadcn + React Hook Form) or native HTML (with Just Validate), ready for production, without the headache.
          </p>
        </div>

        <div className="text-center mx-auto flex space-x-2 mt-[20px]">
          <button className="border-2 border-fm-black py-3 px-6 rounded-full font-semibold hover:bg-fm-black hover:text-white transition-colors duration-200 ease-in-out cursor-pointer">
            <Link href="builder">
              Get Started
            </Link>
          </button>

          <button className="bg-fm-black border-2 border-fm-black p-3 rounded-full font-semibold cursor-pointer">
            <a href="https://github.com/JoseCortezz25/formulate" target="_blank" rel="noopener noreferrer">
              <Github className="text-white size-6" />
            </a>
          </button>
        </div>

        <motion.div
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ amount: 0.75, once: true }}
        >
          <motion.div
            className="hidden md:flex"
            variants={showImage}
          >
            <img src="/screenshot.png" alt="Screenshot of page" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero