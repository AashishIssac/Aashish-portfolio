import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const commits = [
  {
    id: 1,
    role: "Front End Dev/Designer",
    entity: "Oasys",
    location: "Dubai",
    period: "August 2023 - Present",
    type: "feat"
  },
  {
    id: 2,
    role: "MBA (IT)",
    entity: "SGVU",
    location: "Jaipur, Rajasthan",
    period: "June 2025 - Present",
    type: "build"
  },
  {
    id: 3,
    role: "Full Stack Intern",
    entity: "Primefotech",
    location: "Kochi, Kerala",
    period: "July 2022 - Jan 2023",
    type: "feat"
  },
  {
    id: 4,
    role: "BCA",
    entity: "Saintgits, MGU",
    location: "Kottayam, Kerala",
    period: "June 2020 - June 2025",
    type: "build"
  }
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const svgWrapperRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const nodesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Reveal about text
      gsap.from('.reveal-about', {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: 'power4.out',
        stagger: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        }
      });

      // Pinning the right side SVG wrapper for large screens
      ScrollTrigger.matchMedia({
        "(min-width: 1024px)": () => {
          ScrollTrigger.create({
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom bottom',
            pin: svgWrapperRef.current,
            pinSpacing: false,
          });
        }
      });

      // Animate branch line
      gsap.to(lineRef.current, {
        height: '100%',
        ease: 'none',
        scrollTrigger: {
          trigger: '.timeline-container',
          start: 'top center',
          end: 'bottom center',
          scrub: true,
        },
      });

      // Animate nodes
      nodesRef.current.forEach((node) => {
        if (!node) return;
        gsap.from(node, {
          opacity: 0,
          x: -20,
          scrollTrigger: {
            trigger: node,
            start: 'top center+=100',
            toggleActions: 'play none none reverse',
          }
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="relative w-full min-h-[120vh] border-b border-[#DCDCAA]/30">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 relative h-full">
        
        {/* Left Side (Scrolls) */}
        <div className="py-32 flex flex-col gap-24">
          <div className="flex flex-col gap-6">
            <div className="overflow-hidden py-2"><h2 className="reveal-about font-mono text-2xl text-[#4EC9B0]">{'// About'}</h2></div>
            <div className="font-sans text-lg lg:text-xl text-gray-300 leading-loose tracking-wide space-y-6 max-w-xl">
              <div className="overflow-hidden py-1"><p className="reveal-about">
                I'm a Front-End Engineer and UI/UX Designer, which is a polite way of saying I spend half my time obsessing over Figma auto-layouts and the other half aggressively eliminating front-end bloat. I specialize in translating high-fidelity designs into lightning-fast, accessible DOM elements that actually look like the original mockups—a surprisingly rare phenomenon in modern development. Whether I'm architecting utility-driven CSS or hunting down that elusive final Lighthouse performance point, my goal is simple: engineer interfaces that feel as fast as they look, without breaking the moment an user interacts.
              </p></div>
            </div>
          </div>

          <div className="timeline-container relative pl-8 mt-4 flex flex-col gap-20 font-mono text-sm md:text-base">
            {/* Git Main Branch Line */}
            <div className="absolute left-[3px] top-2 bottom-2 w-px bg-[#DCDCAA]/10"></div>
            <div ref={lineRef} className="absolute left-[3px] top-2 w-px bg-[#DCDCAA] h-0"></div>

            {commits.map((item, idx) => (
              <div 
                key={item.id}
                ref={el => nodesRef.current[idx] = el}
                className="relative flex flex-col gap-2 w-full"
              >
                <span className="text-gray-500 font-mono text-sm ml-4">[{item.period}]</span>
                <div className="relative flex items-center w-full">
                  {/* Git Node */}
                  <div className="absolute -left-[37px] w-3 h-3 rounded-full bg-[#121212] border-2 border-[#DCDCAA] z-10 shrink-0"></div>
                  
                  {/* Node Line connecting to text */}
                  <div className="absolute -left-[24px] w-4 h-px bg-[#DCDCAA]/50 shrink-0"></div>
                  
                  <div className="ml-4 bg-[#1E1E1E] px-4 py-3 border border-[#DCDCAA]/20 rounded-[4px] break-words flex-1 min-w-0">
                    <span className="text-[#4EC9B0]">{item.type}:</span>{' '}
                    <span className="text-white">{item.role}</span>{' '}
                    <span className="text-gray-400">@</span>{' '}
                    <span className="text-[#CE9178]">"{item.entity}, {item.location}"</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side (Pinned SVG) */}
        <div className="hidden lg:block relative h-screen">
          <div ref={svgWrapperRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center pointer-events-none">
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full max-w-md opacity-20 text-[#DCDCAA]"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
            >
              <path d="M 20 80 Q 50 10 80 80 T 20 80" strokeDasharray="1 3" />
              <path d="M 10 50 Q 50 0 90 50 T 10 50" strokeDasharray="2 4" />
              <circle cx="50" cy="50" r="20" />
              <circle cx="50" cy="50" r="45" strokeDasharray="2 2" />
              <line x1="0" y1="50" x2="100" y2="50" strokeDasharray="1 5" />
              <line x1="50" y1="0" x2="50" y2="100" strokeDasharray="1 5" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
