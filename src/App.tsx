import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { HomeSection } from './components/HomeSection';
import { AboutSection } from './components/AboutSection';
import { ExperienceSection } from './components/ExperienceSection';
import { WorksSection } from './components/WorksSection';
import { ContactSection } from './components/ContactSection';
import { ProjectModal } from './components/ProjectModal';
import { ResumeModal } from './components/ResumeModal';
import { DataCustomizerModal } from './components/DataCustomizerModal';
import { ProfileData, ProjectItem } from './types';
import { defaultProfileData } from './data/portfolioData';
import { ArrowUp, Sliders } from 'lucide-react';
import { CursorSpotlight } from './components/CursorSpotlight';
import { MouseProvider } from './context/MouseContext';

const STORAGE_KEY = 'zhu_portfolio_data_v2';
const LANG_KEY = 'zhu_portfolio_lang_v2';

export default function App() {
  const [data, setData] = useState<ProfileData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to load portfolio data from localStorage', e);
    }
    return defaultProfileData;
  });

  const [lang, setLang] = useState<'en' | 'zh'>(() => {
    try {
      const saved = localStorage.getItem(LANG_KEY);
      if (saved === 'en' || saved === 'zh') return saved;
    } catch (e) {
      // ignore
    }
    return 'zh';
  });

  const [activeSection, setActiveSection] = useState<string>('home');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Persist data updates
  const handleSaveData = (newData: ProfileData) => {
    setData(newData);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
    } catch (e) {
      console.error('Failed to save portfolio data', e);
    }
  };

  const handleToggleLang = () => {
    const nextLang = lang === 'en' ? 'zh' : 'en';
    setLang(nextLang);
    try {
      localStorage.setItem(LANG_KEY, nextLang);
    } catch (e) {
      // ignore
    }
  };

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Scroll spy & back to top monitor
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);

      const sections = ['home', 'about', 'experience', 'works', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <MouseProvider>
      <div className="min-h-screen bg-white text-[#18181b] flex font-sans selection:bg-[#ffc83b] selection:text-black">
        {/* Global Interactive Cursor Spotlight */}
        <CursorSpotlight />

        {/* Fixed Top Navbar */}
        <Sidebar
          activeSection={activeSection}
          onNavigate={handleNavigate}
          data={data}
          lang={lang}
          onToggleLang={handleToggleLang}
          onOpenResume={() => setIsResumeOpen(true)}
          onOpenCustomizer={() => setIsCustomizerOpen(true)}
        />

        {/* Main Content Pane */}
        <main className="pt-20 w-full flex-1 flex flex-col min-w-0">
          <HomeSection 
            data={data} 
            lang={lang} 
            onNavigate={handleNavigate} 
          />
          
          <AboutSection 
            data={data} 
            lang={lang} 
          />

          <ExperienceSection 
            data={data} 
            lang={lang} 
          />

          <WorksSection 
            data={data} 
            lang={lang} 
            onSelectProject={(proj) => setSelectedProject(proj)} 
          />

          <ContactSection 
            data={data} 
            lang={lang} 
          />

          {/* Footer info for mobile / wide screens */}
          <footer className="py-8 px-6 lg:px-16 border-t border-zinc-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400 bg-zinc-50">
            <p>© {new Date().getFullYear()} {data.name} {data.surname}. All rights reserved.</p>
            <div className="flex flex-wrap items-center gap-4">
              <button 
                onClick={() => setIsCustomizerOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-bold transition-all shadow-sm hover:shadow-md cursor-pointer hover:-translate-y-0.5"
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>{lang === 'en' ? 'Edit Portfolio Content' : '修改项目与个人资料'}</span>
              </button>
              <button 
                onClick={() => setIsResumeOpen(true)}
                className="text-zinc-600 hover:text-zinc-950 font-medium transition-colors cursor-pointer px-2 py-2"
              >
                {lang === 'en' ? 'Curriculum Vitae' : '个人简历'}
              </button>
            </div>
          </footer>
        </main>

        {/* Floating Action Controls */}
        <div className="fixed bottom-6 right-6 z-30 flex flex-col gap-2">
          {showScrollTop && (
            <button
              onClick={scrollToTop}
              className="p-3 rounded-full bg-zinc-950 hover:bg-black text-white shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              aria-label="Scroll to top"
              title="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Modals */}
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          lang={lang}
        />

        <ResumeModal
          isOpen={isResumeOpen}
          onClose={() => setIsResumeOpen(false)}
          data={data}
          lang={lang}
        />

        <DataCustomizerModal
          isOpen={isCustomizerOpen}
          onClose={() => setIsCustomizerOpen(false)}
          data={data}
          onSave={handleSaveData}
          lang={lang}
        />
      </div>
    </MouseProvider>
  );
}
