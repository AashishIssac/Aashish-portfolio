import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const [videoEl, setVideoEl] = useState<HTMLVideoElement | null>(null);

  // Lazy-play video only when scrolled into view (performance)
  useEffect(() => {
    if (!videoEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoEl.play().catch(() => {});
        } else {
          videoEl.pause();
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(videoEl);
    return () => observer.disconnect();
  }, [videoEl]);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Reveal entire section
      gsap.from(".reveal-project", {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      const logs = document.querySelectorAll(".log-line");

      gsap.from(logs, {
        opacity: 0,
        y: 10,
        stagger: 0.8,
        duration: 0.1,
        ease: "steps(1)",
        scrollTrigger: {
          trigger: terminalRef.current,
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="w-full border-b border-[#DCDCAA]/30 py-32 bg-[#121212]"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="overflow-hidden py-2 mb-12">
          <h2 className="reveal-project font-mono text-2xl text-[#4EC9B0]">
            {"// Selected Projects"}
          </h2>
        </div>

        <div className="flex flex-col gap-8 max-w-4xl mx-auto">
          {/* Carpe Diem Screen Recording */}
          <a
            href="https://carpediemeventskerala.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="reveal-project relative block w-full aspect-video bg-[#1A1A1A] border border-[#DCDCAA]/30 rounded-[4px] overflow-hidden group cursor-pointer"
          >
            {/* Video – explicit width/height reserves layout to prevent CLS */}
            <video
              ref={setVideoEl}
              src={`${import.meta.env.BASE_URL}media/carpe-screen-record.webm`}
              width="1280"
              height="720"
              preload="none"
              muted
              loop
              playsInline
              disableRemotePlayback
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
            />

            {/* Play icon overlay */}
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors z-10 flex items-center justify-center">
              <svg
                className="w-20 h-20 text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>

            {/* Gradient overlay so text remains readable */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none z-[5]" />

            {/* Grid background (behind video) */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none"></div>
          </a>

          {/* Mock Terminal Window */}
          <div
            ref={terminalRef}
            className="reveal-project w-full bg-[#1E1E1E] border border-[#DCDCAA]/30 rounded-[4px] p-6 overflow-hidden shadow-2xl"
          >
            <div className="flex gap-2 mb-6 border-b border-[#DCDCAA]/20 pb-4">
              <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
              <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
              <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
              <a
                href="https://carpediemeventskerala.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-4 font-mono text-xs text-gray-500 hover:text-[#4EC9B0] transition-colors"
              >
                Carpe Diem Events
              </a>
            </div>

            <div className="flex flex-col gap-3 text-gray-300 font-mono text-xs sm:text-sm md:text-base break-words">
              <div className="log-line flex items-start gap-2">
                <span className="text-[#4EC9B0] mr-1 shrink-0 select-none">
                  {">"}
                </span>
                <span className="text-[#DCDCAA] shrink-0 w-16 sm:w-20">
                  [init]
                </span>
                <span className="flex-1 text-gray-300">
                  Booting project: Carpe Diem (Premium Event Marketing)...
                </span>
              </div>
              <div className="log-line flex items-start gap-2">
                <span className="text-[#4EC9B0] mr-1 shrink-0 select-none">
                  {">"}
                </span>
                <span className="text-[#DCDCAA] shrink-0 w-16 sm:w-20">
                  [dev]
                </span>
                <span className="flex-1 text-gray-300">
                  Concept-to-production delivery:{" "}
                  <span className="text-[#CE9178]">20 Days</span>. Sleep:{" "}
                  <span className="text-[#CE9178]">Optional</span>.
                </span>
              </div>

              <div className="log-line flex items-start gap-2">
                <span className="text-[#4EC9B0] mr-1 shrink-0 select-none">
                  {">"}
                </span>
                <span className="text-[#DCDCAA] shrink-0 w-16 sm:w-20">
                  [ux]
                </span>
                <span className="flex-1 text-gray-300">
                  Orchestrated heavy GSAP scroll motion and dual-theme
                  architecture without failing WCAG accessibility checks.
                </span>
              </div>
              <div className="log-line flex items-start gap-2">
                <span className="text-[#4EC9B0] mr-1 shrink-0 select-none">
                  {">"}
                </span>
                <span className="text-[#DCDCAA] shrink-0 w-16 sm:w-20">
                  [seo]
                </span>
                <span className="flex-1 text-gray-300">
                  Structured payload for modern Answer Engines (GEO/AEO).
                  Result: Top <span className="text-[#CE9178]">10%</span> local
                  search rankings and a{" "}
                  <span className="text-[#CE9178]">50%</span> spike in client
                  inquiries.
                </span>
              </div>
              <div className="log-line flex items-start gap-2">
                <span className="text-[#4EC9B0] mr-1 shrink-0 select-none">
                  {">"}
                </span>
                <span className="text-[#DCDCAA] shrink-0 w-16 sm:w-20">
                  [audit]
                </span>
                <span className="flex-1 text-gray-300">
                  Final Lighthouse Score:{" "}
                  <span className="text-[#CE9178]">95+</span>. Because beautiful
                  motion design shouldn't require a loading screen.
                </span>
              </div>
              <div className="log-line mt-4 flex items-center">
                <span className="text-[#4EC9B0] mr-1 shrink-0 select-none">
                  {">"}
                </span>
                <span className="w-2 h-5 bg-[#DCDCAA] inline-block align-middle animate-pulse"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
