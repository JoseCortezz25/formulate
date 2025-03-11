import Hero from "@/components/home/hero";
import StepsSection from "@/components/home/steps-sections";
import { Github } from "@/components/icons";
import Link from "next/link";

export default function Home() {

  return (
    <main>
      {/* Hero Section */}
      <Hero />
      {/* Icons Sections */}
      <StepsSection />

      {/* Footer */}
      <section className="bg-[#F5F5F7] pt-[144px] pb-[144px] px-4º">
        <div className="mx-auto lg:max-w-[980px] flex flex-col md:flex-row justify-between items-center">
          <div className="lg:max-w-[50%]">
            <h2 className="text-fm-black text-[25px] leading-[30px] font-bold mb-[20px] text-center md:text-left">
              Simple, easy and fast. <br />
              Export your forms in seconds.
            </h2>
          </div>

          <div className="flex flex-col lg:max-w-[50%]">
            <Link href="builder">
              <button className="border-2 border-fm-black py-3 px-6 rounded-full font-semibold hover:bg-fm-black hover:text-white transition-colors duration-200 ease-in-out cursor-pointer mb-[20px]">
                Get Started Right Now
              </button>
            </Link>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#F5F5F7] py-5 px-6">
        <div className="max-w-[980px] mx-auto flex flex-col md:flex-row justify-between">
          <div className="flex space-x-4 mb-4 md:mb-0 flex-col text-center md:text-left">
            <h3 className="font-bold text-xl text-fm-black">
              Formulate
            </h3>
            <span className="text-fm-black/50 text-sm">
              For developers, by developers. {"<3"}
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <a
              href="https://github.com/JoseCortezz25"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="size-6 text-black" />
            </a>
          </div>
        </div>
      </footer>
    </main >
  );
}
