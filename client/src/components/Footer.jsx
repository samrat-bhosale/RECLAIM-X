import React from 'react';
import {
  Recycle,
  ArrowUp
} from 'lucide-react';
import { useProject } from '../context/ProjectContext';

export default function Footer() {
  const { setActiveTab, t } = useProject();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#111111] text-zinc-400 border-t border-zinc-800 pt-16 pb-12 px-6 sm:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Top Banner Callout (Matching Reference Bottom Banner) */}
        <div className="pb-10 border-b border-zinc-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <span className="text-[10px] font-bold tracking-[0.2em] text-zinc-400 uppercase">
              DATE TIGHT TOGETHER
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-white tracking-tight">
              Your vision. Our expertise.
            </h3>
            <p className="text-xs text-zinc-400 max-w-xl">
              The intelligent solution for sustainable project asset recovery and zero-landfill demolition.
            </p>
          </div>

          <div>
            <button
              onClick={() => { setActiveTab('create'); scrollToTop(); }}
              className="btn-petrol-primary text-xs font-semibold cursor-pointer"
            >
              <span>[ + Create Project ]</span>
            </button>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Col 1 & 2: Brand & Tagline */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center text-white shadow-xs">
                <Recycle className="w-4 h-4 text-zinc-200" />
              </div>
              <span className="text-xl font-bold font-heading text-white tracking-wider">
                RECLAIM <span className="text-[#0D3B5E]">X</span>
              </span>
            </div>

            <p className="text-xs text-zinc-400 max-w-sm leading-relaxed">
              The intelligent enterprise solution for sustainable project asset recovery, circular deconstruction, and salvage auditing.
            </p>
          </div>

          {/* Col 3: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white tracking-wider uppercase">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => { setActiveTab('dashboard'); scrollToTop(); }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('projects'); scrollToTop(); }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Projects
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('create'); scrollToTop(); }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Create Project
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('intelligence'); scrollToTop(); }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Analysis
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('actuals'); scrollToTop(); }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Recovery
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white tracking-wider uppercase">
              Services
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="hover:text-white transition-colors cursor-pointer">
                Site Material Audit
              </li>
              <li className="hover:text-white transition-colors cursor-pointer">
                AI Vision Detection
              </li>
              <li className="hover:text-white transition-colors cursor-pointer">
                Sequence Planning
              </li>
              <li className="hover:text-white transition-colors cursor-pointer">
                Salvage Reconciliation
              </li>
            </ul>
          </div>

          {/* Col 5: Contact & Social */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white tracking-wider uppercase">
              Contact
            </h4>
            <div className="space-y-1.5 text-xs text-zinc-400">
              <p>+91 98765 43210</p>
              <p>hello@reclaimx.com</p>
              <p>Mumbai, Maharashtra, India</p>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-3">
              {/* LinkedIn */}
              <a
                href="#linkedin"
                className="w-7 h-7 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors"
                title="LinkedIn"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="#instagram"
                className="w-7 h-7 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors"
                title="Instagram"
              >
                <svg className="w-3.5 h-3.5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="#youtube"
                className="w-7 h-7 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors"
                title="YouTube"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>

              {/* X / Twitter */}
              <a
                href="#twitter"
                className="w-7 h-7 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors"
                title="X"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-8 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500">
          <div>
            © 2026 RECLAIM X. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <span className="hover:text-zinc-300 transition-colors cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-zinc-300 transition-colors cursor-pointer">Terms of Service</span>
            <span>•</span>
            <span className="hover:text-zinc-300 transition-colors cursor-pointer">Sitemap</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            title="Scroll to top"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}
