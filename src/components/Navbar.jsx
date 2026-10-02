import { useState } from 'react';
import { FiGithub, FiLinkedin, FiMenu, FiX } from 'react-icons/fi';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollTo = (id) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A0E17]/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 cursor-pointer" onClick={() => scrollTo('home')}>
            <span className="font-display text-sm tracking-[0.2em] text-[#ECEDF1] font-bold uppercase">
              Signal Capture <span className="text-amber-400">Unit</span>
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              <button onClick={() => scrollTo('home')} className="text-xs font-display tracking-wider text-[#8A93A6] hover:text-amber-400 transition-colors uppercase">
                Home
              </button>
              <button onClick={() => scrollTo('how-it-works')} className="text-xs font-display tracking-wider text-[#8A93A6] hover:text-amber-400 transition-colors uppercase">
                How It Works
              </button>
              <button onClick={() => scrollTo('analyzer')} className="text-xs font-display tracking-wider text-[#8A93A6] hover:text-amber-400 transition-colors uppercase">
                Download
              </button>
              <button onClick={() => scrollTo('history')} className="text-xs font-display tracking-wider text-[#8A93A6] hover:text-amber-400 transition-colors uppercase">
                History
              </button>
            </div>
          </div>



          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-[#8A93A6] hover:text-white focus:outline-none p-2">
              {isOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#121826] border-b border-white/10 px-2 pt-2 pb-3 space-y-1 sm:px-3 shadow-xl">
          <button onClick={() => scrollTo('home')} className="block w-full text-left px-3 py-3 text-sm font-display tracking-wider text-[#8A93A6] hover:text-amber-400 hover:bg-white/5 rounded-md uppercase">
            Home
          </button>
          <button onClick={() => scrollTo('how-it-works')} className="block w-full text-left px-3 py-3 text-sm font-display tracking-wider text-[#8A93A6] hover:text-amber-400 hover:bg-white/5 rounded-md uppercase">
            How It Works
          </button>
          <button onClick={() => scrollTo('analyzer')} className="block w-full text-left px-3 py-3 text-sm font-display tracking-wider text-[#8A93A6] hover:text-amber-400 hover:bg-white/5 rounded-md uppercase">
            Download
          </button>
          <button onClick={() => scrollTo('history')} className="block w-full text-left px-3 py-3 text-sm font-display tracking-wider text-[#8A93A6] hover:text-amber-400 hover:bg-white/5 rounded-md uppercase">
            History
          </button>

        </div>
      )}
    </nav>
  );
}

export default Navbar;
