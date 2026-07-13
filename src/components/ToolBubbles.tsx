import { CSSProperties, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  siFigma, 
  siTailwindcss, 
  siHtml5, 
  siCss, 
  siJavascript, 
  siTypescript, 
  siReact, 
  siNextdotjs,
  siAstro,
  siFramer,
  siWebflow,
  siWordpress,
  siBootstrap,
  siGsap,
  siClaude,
  siGooglegemini,
  siGit,
  siGithub,
  siVercel
} from 'simple-icons';

gsap.registerPlugin(ScrollTrigger);

const tools = [
  { name: 'Figma', icon: siFigma, color: '#CE9178' },
  { name: 'Tailwind CSS', icon: siTailwindcss, color: '#4EC9B0' },
  { name: 'HTML5', icon: siHtml5, color: '#DCDCAA' },
  { name: 'CSS3', icon: siCss, color: '#4EC9B0' },
  { name: 'JavaScript', icon: siJavascript, color: '#DCDCAA' },
  { name: 'TypeScript', icon: siTypescript, color: '#4EC9B0' },
  { name: 'React', icon: siReact, color: '#4EC9B0' },
  { name: 'Next.js', icon: siNextdotjs, color: '#CE9178' },
  { name: 'Astro', icon: siAstro, color: '#DCDCAA' },
  { name: 'Framer Motion', icon: siFramer, color: '#4EC9B0' },
  { name: 'Webflow', icon: siWebflow, color: '#CE9178' },
  { name: 'WordPress', icon: siWordpress, color: '#4EC9B0' },
  { name: 'Bootstrap', icon: siBootstrap, color: '#DCDCAA' },
  { name: 'GSAP', icon: siGsap, color: '#4EC9B0' },
  { name: 'Claude', icon: siClaude, color: '#CE9178' },
  { name: 'Gemini', icon: siGooglegemini, color: '#4EC9B0' },
  { name: 'Git', icon: siGit, color: '#DCDCAA' },
  { name: 'GitHub', icon: siGithub, color: '#4EC9B0' },
  { name: 'Vercel', icon: siVercel, color: '#CE9178' },
];

const displayTools = [...tools, ...tools, ...tools];

export default function ToolBubbles() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from('.reveal-toolbubbles', {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const bubbles = displayTools.map((tool, index) => (
    <div 
      key={`${tool.name}-${index}`}
      className="animate-wave shrink-0 flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full border border-[#DCDCAA]/30 bg-[#1E1E1E] backdrop-blur-md transition-colors hover:bg-white/10"
      style={{ '--bubble-index': index } as CSSProperties}
      title={tool.name}
    >
      <svg 
        viewBox="0 0 24 24" 
        fill="currentColor" 
        className="w-6 h-6 md:w-8 md:h-8 transition-colors duration-300"
        style={{ color: tool.color }}
      >
        <path d={tool.icon.path} />
      </svg>
    </div>
  ));

  return (
    <section ref={sectionRef} id="tool-bubbles" className="w-full border-y border-[#DCDCAA]/20 bg-[#121212] py-16 overflow-hidden select-none">
      <div className="reveal-toolbubbles relative flex w-full flex-row items-center py-8">
        <div className="flex animate-marquee min-w-max gap-8 md:gap-16 px-4 md:px-8">
          {bubbles}
        </div>
        <div className="flex animate-marquee min-w-max gap-8 md:gap-16 px-4 md:px-8" aria-hidden="true">
          {bubbles}
        </div>
      </div>
    </section>
  );
}
