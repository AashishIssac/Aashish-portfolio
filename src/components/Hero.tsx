import { useEffect, useRef } from "react";
import gsap from "gsap";
import ashPortrait from "/media/ash-portrait.svg";

export default function Hero() {
  const textRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".reveal-text", {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power4.out",
        delay: 0.2,
      });

      gsap.fromTo(
        imgRef.current,
        { scale: 0.95, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.5, ease: "power2.out", delay: 0.5 },
      );
    }, textRef);

    return () => ctx.revert();
  }, []);

  return (
    <header className="relative w-full min-h-[100svh] flex items-center pt-24 pb-12 sm:pt-28 md:pt-32 lg:py-16 overflow-hidden">
      <div className="max-w-8xl mx-auto px-8 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div ref={textRef} className="flex flex-col gap-6 z-10">
          <div className="overflow-hidden px-8 -mx-8 py-2">
            <h1 className="reveal-text text-[9.5vw] sm:text-[8.5vw] md:text-[7.5vw] lg:text-[5vw] xl:text-[5rem] font-sans font-extrabold leading-[0.9] tracking-tighter uppercase whitespace-nowrap pr-6">
              Aashish
              <br />
              Issac
              <br />
              Solomon
            </h1>
          </div>
          <div className="overflow-hidden mt-6">
            <p className="reveal-text font-sans text-xl md:text-2xl lg:text-3xl font-medium tracking-wide text-gray-400">
              Designing Precision. Engineering Performance.
            </p>
          </div>
        </div>

        <div className="relative w-full h-[50vh] lg:h-full flex justify-center lg:justify-end items-end">
          <img
            ref={imgRef}
            src={ashPortrait}
            alt="Aashish Issac Solomon Portrait"
            className="w-full h-full max-w-lg object-contain will-change-transform"
          />
        </div>
      </div>

      <div className="absolute bottom-0 w-full border-b border-[#DCDCAA]/30"></div>
    </header>
  );
}
