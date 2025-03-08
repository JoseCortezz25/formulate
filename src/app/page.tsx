import StepsSection from "@/components/home/steps-sections";
import { Github } from "@/components/icons";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="w-full pt-[144px] pb-[144px] h-screen flex items-center px-6">
        <div className="w-full mx-auto lg:max-w-[980px] flex lg:justify-center flex-col lg:items-center relative">
          <div className="w-full mb-8">
            <h1 className="text-fm-black text-center text-[25px] md:text-[38.75px] font-bold leading-[44px] mb-[8px]">
              With Formulate
            </h1>

            <h2 className="text-fm-black text-center font-bold text-[40px] leading-[46px] lg:text-[82px] lg:leading-[82px] mb-[20px]">
              Create forms.<br />
              Save time.
            </h2>

            <p className="text-center justify-center text-[#6e6e73] text-lg leading-snug lg:text-2xl lg:leading-8 font-semibold tracking-tight">
              Generate forms for React (with Shadcn + React Hook Form) or native HTML (with Just Validate), ready for production, without the headache.
            </p>
          </div>

          <div className="text-center flex space-x-2 mt-[20px]">
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

        </div>
      </section>

      {/* Icons */}
      <StepsSection />

      {/* Footer */}
      <section className="bg-[#F5F5F7] pt-[144px] pb-[144px] px-4º">
        <div className="mx-auto lg:max-w-[980px] flex flex-col md:flex-row justify-between items-center">
          <div className="lg:max-w-[50%]">
            <h2 className="text-fm-black text-[25px] leading-[30px] font-bold mb-[20px] text-center md:text-left">
              Simple, sencillo y rápido. <br />
              Exporta tu formulario en segundos.
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
