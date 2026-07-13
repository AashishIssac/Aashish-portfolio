import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -60% 0px' }
    );

    const sections = document.querySelectorAll('section[id], footer[id]');
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const navLinks = [
    { id: 'about', label: '// About' },
    { id: 'skills', label: '// Skills' },
    { id: 'projects', label: '// Projects' },
    { id: 'contact', label: '// Get in touch' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-[#121212]/70 border-b border-[#DCDCAA]/30">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between font-mono text-sm md:text-base">
        <div className="text-[#DCDCAA] font-bold tracking-tight">
          <span className="text-[#4EC9B0]">{'< '}</span>
          A.I.S
          <span className="text-[#4EC9B0]">{' />'}</span>
        </div>
        <div className="hidden md:flex gap-8 text-[#CE9178]">
          {navLinks.map((link) => (
            <a 
              key={link.id}
              href={`#${link.id}`} 
              className={`transition-colors ${activeSection === link.id ? 'text-[#4EC9B0]' : 'hover:text-[#4EC9B0]'}`}
            >
              {link.label}
            </a>
          ))}
        </div>
        <button 
          className="md:hidden text-[#DCDCAA] p-2 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-[#121212] border-b border-[#DCDCAA]/30 font-mono text-sm text-[#CE9178]">
          <div className="flex flex-col px-6 py-4 gap-4">
            {navLinks.map((link) => (
              <a 
                key={link.id}
                href={`#${link.id}`} 
                onClick={() => setIsMenuOpen(false)} 
                className={`transition-colors py-2 ${activeSection === link.id ? 'text-[#4EC9B0]' : 'hover:text-[#4EC9B0] border-b border-[#DCDCAA]/10'}`}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

