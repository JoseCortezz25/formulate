"use client";

import Link from "next/link";
import { Github } from "../icons";
import { sendGAEvent } from "@next/third-parties/google";

const Hero = () => {
  return (
    <section className="w-full pt-[144px] pb-[50px] md:pt-[184px] md:pb-[144px] min-h-screen flex items-center px-6">
      <div className="w-full mx-auto lg:max-w-[980px] flex lg:justify-center flex-col lg:items-center relative">
        <div className="w-full mb-8">
          <h1 className="text-fm-black text-center text-[25px] md:text-[38.75px] font-bold leading-[44px] mb-[8px]">
            With Formulate
          </h1>

          <h2 className="text-fm-black text-center font-bold text-[40px] leading-[46px] lg:text-[82px] lg:leading-[82px] mb-[20px] relative">
            
            Create forms.<br />
            <span className="blue-mark">Save time.</span>
          </h2>

          <p className="text-center justify-center text-[#6e6e73] text-lg leading-snug lg:text-2xl lg:leading-8 font-semibold tracking-tight">
            Generate forms for React (with Shadcn + React Hook Form) or native HTML (with Just Validate), ready for production, without the headache.
          </p>
        </div>

        <div className="text-center mx-auto flex space-x-2 mt-[20px] z-10">
          <Link href="/builder" onClick={() => sendGAEvent('event', 'buttonClicked', { value: 'Get Started' })}>
            <button 
              className="z-10 border-2 border-fm-black bg-fm-black text-white py-3 px-6 rounded-full font-semibold hover:bg-fm-black hover:text-white transition-colors duration-200 ease-in-out cursor-pointer"
            >
              Get Started
            </button>
          </Link>

          <a 
            href="https://github.com/JoseCortezz25/formulate" 
            target="_blank" 
            rel="noopener noreferrer" 
            onClick={() => sendGAEvent('event', 'buttonClicked', { value: 'GitHub' })}
          >
            <button 
              className="bg-fm-black/2 border-2 border-fm-black/2 p-3 rounded-full font-semibold cursor-pointer"
            >
              <Github className="text-fm-black size-6" />
            </button>
          </a>
        </div>

        <div className="hidden md:flex relative">
          <div className="blob-gradient absolute top-[125px] w-full h-[220px] opacity-50 pointer-events-none"></div>
          <img src="/screenshot.png" alt="Screenshot of page" className="relative z-10 scale-115 pointer-events-none" />
        </div>
      </div>
    </section>
  );
};

export default Hero;