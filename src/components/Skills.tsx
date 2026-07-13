import { useState, useRef, useEffect, ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type SkillSection = {
  id: string;
  trigger: ReactNode;
  closeBracket: string | null;
  type: 'css' | 'js' | 'md';
  items: any[];
};

const skillsData: SkillSection[] = [
  {
    id: "Design",
    trigger: (
      <span>
        <span className="text-[#DCDCAA]">.design</span> <span className="text-white">{'{'}</span>
      </span>
    ),
    closeBracket: "}",
    type: "css",
    items: [
      { key: "translation", value: '"Translating static designs into responsive, pixel-perfect UI components";' },
      { key: "architecture", value: '"Engineering scalable, utility-driven CSS architectures with zero bloat";' },
      { key: "validation", value: '"Validating layouts through rapid iteration and stakeholder usability testing";' },
      { key: "scalability", value: '"Building reusable component libraries that maintain brand consistency across scale";' }
    ]
  },
  {
    id: "Execution",
    trigger: (
      <span>
        <span className="text-[#4EC9B0]">const</span> <span className="text-[#DCDCAA]">Execution</span> <span className="text-white">= {'['}</span>
      </span>
    ),
    closeBracket: "];",
    type: "js",
    items: [
      '"Shipping ultra-fast static configurations with minimal client-side JS overhead."',
      '"Orchestrating hardware-accelerated motion and dynamic, fluid scroll animations."',
      '"Directing AI-agentic workflows to accelerate rapid development and complex refactoring."',
      '"Engineering robust front-end architectures capable of handling complex, data-heavy interfaces."'
    ]
  },
  {
    id: "Flow",
    trigger: (
      <span>
        <span className="text-[#4EC9B0]">###</span> <span className="text-white font-bold ml-2">Flow</span>
      </span>
    ),
    closeBracket: null,
    type: "md",
    items: [
      "- Driving end-to-end execution, from initial client strategy to final production handoff.",
      "- Bridging the critical communication gap between visual designers and backend engineering teams.",
      "- Leveraging narrative-driven storytelling to craft digital experiences that build trust and drive conversions.",
      "- Taking absolute ownership of delivery timelines to ensure uncompromising quality on every milestone."
    ]
  }
];

export default function Skills() {
  const [openSection, setOpenSection] = useState<string | null>("Design");
  const contentRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const sectionRef = useRef<HTMLElement>(null);

  const toggleSection = (id: string) => {
    if (openSection === id) {
      setOpenSection(null);
      if (contentRefs.current[id]) {
        gsap.to(contentRefs.current[id], {
          height: 0,
          duration: 0.4,
          ease: 'power2.out'
        });
      }
      return;
    }
    
    // Close the currently open one
    if (openSection && contentRefs.current[openSection]) {
      gsap.to(contentRefs.current[openSection], {
        height: 0,
        duration: 0.4,
        ease: 'power2.out'
      });
    }

    // Open the new one
    setOpenSection(id);
    if (contentRefs.current[id]) {
      gsap.to(contentRefs.current[id], {
        height: 'auto',
        duration: 0.4,
        ease: 'power2.out'
      });
    }
  };

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Reveal entire section
      gsap.from('.reveal-skill', {
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

    // Initial state: animate the default open section
    if (openSection && contentRefs.current[openSection]) {
      gsap.set(contentRefs.current[openSection], { height: 'auto' });
    }
    // Set others to height 0
    skillsData.forEach((section) => {
      if (section.id !== openSection && contentRefs.current[section.id]) {
        gsap.set(contentRefs.current[section.id], { height: 0 });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="skills" className="w-full border-b border-[#DCDCAA]/30 bg-[#121212]">
      <div className="max-w-7xl mx-auto px-6 py-32">
        <div className="overflow-hidden py-2 mb-12"><h2 className="reveal-skill font-mono text-2xl text-[#4EC9B0]">{'// Skills'}</h2></div>
        
        <div className="reveal-skill flex flex-col gap-4">
          {skillsData.map((section) => {
            const isOpen = openSection === section.id;
            
            return (
              <div 
                key={section.id} 
                className="border border-[#DCDCAA]/30 rounded-[4px] bg-[#1E1E1E] flex flex-col overflow-hidden"
              >
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full px-4 md:px-8 py-6 md:py-8 flex items-center gap-4 font-mono text-left focus:outline-none hover:bg-white/[0.02] transition-colors"
                >
                  <span className="text-[#DCDCAA] text-xl min-w-[20px] transition-transform duration-300">
                    {isOpen ? 'v' : '>'}
                  </span>
                  <span className="text-base sm:text-lg md:text-2xl break-words break-all sm:break-normal flex-1">
                    {section.trigger}
                    {!isOpen && section.closeBracket && <span className="text-gray-500 ml-2">...</span>}
                    {!isOpen && section.closeBracket && <span className="ml-2 text-[#DCDCAA]">{section.closeBracket}</span>}
                  </span>
                </button>
                
                <div 
                  ref={el => { contentRefs.current[section.id] = el }}
                  className="overflow-hidden font-mono bg-[#1E1E1E] h-0"
                >
                  <div className="px-6 pb-8 md:pb-12 pl-12 md:pl-20">
                    <ul className="flex flex-col gap-6 border-l-2 border-[#DCDCAA]/10 pl-6 md:pl-12 py-2">
                      {section.type === 'css' && section.items.map((item, itemIdx) => (
                        <li key={itemIdx} className="text-sm sm:text-base md:text-xl relative pl-6 -indent-6">
                          <span className="text-[#9CDCFE]">{item.key}</span>
                          <span className="text-white">: </span>
                          <span className="text-[#CE9178]">{item.value}</span>
                        </li>
                      ))}
                      {section.type === 'js' && section.items.map((item, itemIdx) => (
                        <li key={itemIdx} className="text-sm sm:text-base md:text-xl relative pl-6 -indent-6 text-[#CE9178]">
                          {item}{itemIdx < section.items.length - 1 ? ',' : ''}
                        </li>
                      ))}
                      {section.type === 'md' && section.items.map((item, itemIdx) => (
                        <li key={itemIdx} className="text-sm sm:text-base md:text-xl relative pl-6 -indent-6 text-[#D4D4D4] font-sans">
                          {item}
                        </li>
                      ))}
                    </ul>
                    {section.closeBracket && (
                      <div className="text-[#DCDCAA] mt-6 text-base sm:text-lg md:text-2xl">{section.closeBracket}</div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
