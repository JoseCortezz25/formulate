"use client";
import { CheckCircle, Settings, Zap, Code, CopyCheckIcon, Download } from 'lucide-react';
import { motion, Variants } from "motion/react";

export default function StepsSection() {
  const cards = [
    {
      icon: <Settings className="text-blue-500 w-8 h-8" />,
      text: 'Select the fields you need for your form.'
    },
    {
      icon: <Zap className="text-blue-500 w-8 h-8" />,
      text: 'Apply validations in one click.'
    },
    {
      icon: <CopyCheckIcon className="text-blue-500 w-8 h-8" />,
      text: 'Make sure the generated code is exactly what you need, with no surprises by using the preview.'
    },
    {
      icon: <Download className="text-blue-500 w-8 h-8" />,
      text: 'Download the generated code and start using it in your project.'
    },
    {
      icon: <Code className="text-blue-500 w-8 h-8" />,
      text: 'Use the generated code in your React or native HTML project.'
    },
    {
      icon: <CheckCircle className="text-blue-500 w-8 h-8" />,
      text: 'No surprises, no complications. Just the code you need.'
    }
  ];

  const cardVariants: Variants = {
    offscreen: {
      opacity: 0,
      y: 50
    },
    onscreen: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring"
      }
    }
  };

  return (
    <section className="p-8 bg-white lg:max-w-[980px] mx-auto py-[140px]">
      <h2 className="text-[40px] leading-[43px] md:text-[80px] md:leading-[80px] font-bold mb-[62px] relative text-fm-black">
        Forms <span className="text-blue-500 italic">effortlessly</span>. <br />
        Create forms, save time.
      </h2>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ amount: 0.3, once: true }}
      >
        {cards.map((card, index) => (
          <motion.div
            className="p-6 bg-gray-50/80 rounded-2xl aspect-video md:aspect-square"
            key={index}
            variants={cardVariants}
          >
            <div className="flex flex-col items-start">
              <div className="size-[45px] rounded-full mb-3">
                {card.icon}
              </div>
              <p className="text-fm-black text-[20px] leading-[26px] font-bold">{card.text}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section >
  );
}
