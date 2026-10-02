import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";

function Footer() {
  return (
    <footer className="w-full border-t border-white/10 bg-[#0A0E17]/80 backdrop-blur-md py-12 px-6 relative z-10 mt-auto">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between gap-12 md:gap-8">
        
        {/* Left Section - App Info */}
        <div className="flex flex-col max-w-sm">
          <div className="flex items-center gap-2 mb-3 font-display text-[11px] tracking-[0.25em] text-amber-400/80">
            <span className="relative flex h-2 w-2">
              <span className="blink-dot absolute inline-flex h-full w-full rounded-full bg-amber-400" />
            </span>
            SYSTEM DEVELOPER
          </div>
          <h3 className="font-display text-lg font-bold text-[#ECEDF1] mb-1">
            SIGNAL CAPTURE UNIT
          </h3>
          <p className="font-body text-[#8A93A6] text-sm mb-4">
            YouTube Media Downloader
          </p>
          <p className="font-body text-[#5B6478] text-xs leading-relaxed">
            A fast and simple tool for downloading available YouTube video and audio streams.
          </p>
        </div>

        {/* Right Section - Developer Info */}
        <div className="flex flex-col md:items-end text-left md:text-right">
          <h4 className="font-display text-[11px] tracking-[0.25em] text-[#5B6478] mb-3 uppercase">
            Developer
          </h4>
          <h3 className="font-display text-base font-bold text-[#ECEDF1] mb-1">
            Saurav Raikwar
          </h3>
          <p className="font-body text-amber-400 text-sm mb-5">
            Full Stack Developer
          </p>

          <div className="flex items-center gap-5">
            <a
              href="https://github.com/Saurav7985"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#8A93A6] hover:text-white transition-all duration-300 hover:-translate-y-1"
              aria-label="GitHub"
            >
              <FiGithub className="h-5 w-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/sauravraikwar"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#8A93A6] hover:text-[#0A66C2] transition-all duration-300 hover:-translate-y-1"
              aria-label="LinkedIn"
            >
              <FiLinkedin className="h-5 w-5" />
            </a>
            <a
              href="mailto:sauravraikwar26@gmail.com"
              className="text-[#8A93A6] hover:text-amber-400 transition-all duration-300 hover:-translate-y-1"
              aria-label="Email"
            >
              <FiMail className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-5xl mx-auto mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="font-body text-[11px] text-[#4B5468]">
          © 2026 Saurav Raikwar. All rights reserved.
        </p>
        <p className="font-body text-[11px] text-[#4B5468]">
          Built with React + Node.js
        </p>
      </div>
    </footer>
  );
}

export default Footer;
