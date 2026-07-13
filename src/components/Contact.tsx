import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from('.reveal-contact', {
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

  return (
    <footer ref={sectionRef} id="contact" className="w-full bg-[#121212] pt-32 pb-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 flex flex-col gap-12">
        
        <div className="overflow-hidden py-2"><h2 className="reveal-contact font-mono text-2xl text-[#4EC9B0]">{'// Get in touch'}</h2></div>
        
        <div className="flex flex-col gap-12">
          <div className="overflow-hidden py-2">
            <a 
              href="mailto:aashishissac02@gmail.com" 
              className="reveal-contact block font-sans text-[5vw] sm:text-[4vw] md:text-[3.5vw] lg:text-[3vw] xl:text-[3.5rem] font-black tracking-tighter leading-[1.1] md:leading-none text-[#DCDCAA] hover:text-white transition-colors duration-500 text-center whitespace-nowrap"
            >
              aashishissac02@gmail.com
            </a>
          </div>
          
          <div className="reveal-contact flex flex-col sm:flex-row items-center justify-center gap-4 font-mono text-sm md:text-base w-full">
            <a 
              href="mailto:aashishissac02@gmail.com" 
              className="group px-6 py-4 border border-[#DCDCAA]/30 rounded-[4px] bg-[#1E1E1E] hover:border-[#DCDCAA] hover:bg-[#DCDCAA]/10 transition-all w-full sm:w-auto text-center flex items-center justify-center break-words"
            >
              <span className="text-[#4EC9B0] mr-2 shrink-0">{'>'}</span>
              <span className="text-[#DCDCAA] truncate">execute_email</span><span className="shrink-0 text-white">()</span>
            </a>
            
            <a 
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group px-6 py-4 border border-[#DCDCAA]/30 rounded-[4px] bg-[#1E1E1E] hover:border-[#DCDCAA] hover:bg-[#DCDCAA]/10 transition-all w-full sm:w-auto text-center flex items-center justify-center break-words"
            >
              <span className="text-[#4EC9B0] mr-2 shrink-0">{'>'}</span>
              <span className="text-[#DCDCAA] truncate">init_linkedin</span><span className="shrink-0 text-white">()</span>
            </a>
            
            <a 
              href="tel:+971547232044" 
              className="group px-6 py-4 border border-[#DCDCAA]/30 rounded-[4px] bg-[#1E1E1E] hover:border-[#DCDCAA] hover:bg-[#DCDCAA]/10 transition-all w-full sm:w-auto text-center flex items-center justify-center break-words"
            >
              <span className="text-[#4EC9B0] mr-2 shrink-0">{'>'}</span>
              <span className="text-[#DCDCAA] truncate">call_phone</span><span className="shrink-0 text-white">()</span>
            </a>
          </div>
        </div>
        
        <div className="w-full flex flex-col md:flex-row justify-between items-center gap-4 mt-12 md:mt-24 font-mono text-xs md:text-sm text-gray-500 border-t border-[#DCDCAA]/20 pt-8 text-center md:text-left">
          <span className="break-words w-full md:text-left">// © {new Date().getFullYear()} Aashish Issac Solomon</span>
          <span className="text-[#4EC9B0] break-words w-full md:text-right">SYSTEM.STATUS: ONLINE</span>
        </div>
      </div>
    </footer>
  );
}
