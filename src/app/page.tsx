import Hero from "@/components/home/hero";
import Footer from "@/components/layout/footer";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <Hero />

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
      <Footer />
    </main >
  );
}
