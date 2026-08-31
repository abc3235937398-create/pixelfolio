import React, { useState } from 'react';
import { 
  Phone,
  Mail,
  ChevronRight, 
  Menu, 
  X,
  FileText,
  Sliders,
  Globe,
  Award,
  Sparkles
} from 'lucide-react';
import { ProfileData } from '../types';
import { translations } from '../data/portfolioData';

interface SidebarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  data: ProfileData;
  lang: 'en' | 'zh';
  onToggleLang: () => void;
  onOpenResume: () => void;
  onOpenCustomizer: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeSection,
  onNavigate,
  data,
  lang,
  onToggleLang,
  onOpenResume,
  onOpenCustomizer,
}) => {
  const [isOpenMobile, setIsOpenMobile] = useState(false);
  const [isPagesOpen, setIsPagesOpen] = useState(false);
  const t = translations[lang];

  const navItems = [
    { id: 'home', label: t.nav.home },
    { id: 'about', label: t.nav.about },
    { id: 'experience', label: t.nav.experience },
    { id: 'works', label: t.nav.works },
    { id: 'contact', label: t.nav.contact },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setIsOpenMobile(false);
  };

  return (
    <>
      {/* Desktop & Mobile Navbar Container */}
      <header className="fixed top-0 left-0 right-0 z-50 h-20 bg-white/90 backdrop-blur-xl border-b border-zinc-100 flex items-center justify-between px-6 lg:px-16 transition-all duration-300">
        {/* Left: Logo & Branding */}
        <div className="flex items-center gap-8">
          <button
            onClick={() => handleNavClick('home')}
            className="text-3xl font-black tracking-tighter text-zinc-950 text-left hover:opacity-80 transition-opacity flex items-center"
          >
            <span>{data.logoText || 'Zhu.'}</span>
            <span className="w-2 h-2 rounded-full bg-amber-500 ml-0.5 inline-block" />
          </button>
        </div>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-2">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-200 cursor-pointer ${
                  isActive 
                    ? 'text-zinc-950 bg-amber-500/10' 
                    : 'text-zinc-500 hover:text-zinc-950 hover:bg-zinc-100/80'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right: Actions (Desktop & Mobile) */}
        <div className="flex items-center gap-3">
          {/* Language Toggle */}
          <button
            onClick={onToggleLang}
            className="hidden sm:flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-700 transition-colors cursor-pointer"
            title={lang === 'en' ? '切换为中文' : 'Switch to English'}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{lang === 'en' ? '中' : 'EN'}</span>
          </button>

          {/* Settings Customizer */}
          <button
            onClick={onOpenCustomizer}
            className="hidden sm:flex p-2 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-600 hover:text-zinc-900 transition-colors cursor-pointer"
            title="Edit profile & data / 自定义修改资料"
          >
            <Sliders className="w-4 h-4" />
          </button>

          {/* Resume Button */}
          <button
            onClick={onOpenResume}
            className="hidden sm:flex items-center gap-2 text-sm font-black text-white bg-zinc-950 hover:bg-black px-5 py-2 rounded-full transition-all cursor-pointer group shadow-xs hover:scale-105 active:scale-95"
          >
            <FileText className="w-4 h-4 text-amber-400" />
            <span>{t.nav.getPro}</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpenMobile(!isOpenMobile)}
            className="lg:hidden p-2 rounded-lg text-zinc-800 hover:bg-zinc-100 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {isOpenMobile ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {isOpenMobile && (
        <div 
          className="lg:hidden fixed inset-0 top-20 bg-black/40 backdrop-blur-xs z-40"
          onClick={() => setIsOpenMobile(false)}
        />
      )}

      {/* Mobile Drawer Menu */}
      <div className={`
        lg:hidden fixed top-20 left-0 right-0 bg-white border-b border-zinc-100 p-6 shadow-xl z-50 transition-all duration-300 origin-top
        ${isOpenMobile ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 pointer-events-none'}
      `}>
        <nav className="space-y-2 mb-6">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`block w-full text-left text-base font-bold px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer ${
                  isActive 
                    ? 'text-zinc-950 bg-amber-500/10' 
                    : 'text-zinc-500 hover:text-zinc-950 hover:bg-zinc-100/80'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{item.label}</span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-amber-500 shadow-xs" />}
                </div>
              </button>
            );
          })}
        </nav>

        <div className="flex flex-col gap-3 pt-4 border-t border-zinc-100">
          <button
            onClick={onOpenResume}
            className="flex items-center justify-center gap-2 w-full text-sm font-black text-white bg-zinc-950 hover:bg-black px-4 py-3 rounded-xl transition-all cursor-pointer shadow-xs"
          >
            <FileText className="w-4 h-4 text-amber-400" />
            <span>{t.nav.getPro}</span>
          </button>
          
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={onToggleLang}
              className="flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-700 transition-colors cursor-pointer"
            >
              <Globe className="w-4 h-4" />
              <span>{lang === 'en' ? '切换为中文' : 'Switch to English'}</span>
            </button>
            <button
              onClick={onOpenCustomizer}
              className="flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-700 transition-colors cursor-pointer"
            >
              <Sliders className="w-4 h-4" />
              <span>编辑资料</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
