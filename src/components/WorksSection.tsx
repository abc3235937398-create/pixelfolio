import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Eye, ArrowUpRight } from 'lucide-react';
import { ProfileData, ProjectItem } from '../types';
import { translations } from '../data/portfolioData';
import { GlassCard } from './GlassCard';

interface WorksSectionProps {
  data: ProfileData;
  lang: 'en' | 'zh';
  onSelectProject: (project: ProjectItem) => void;
}

export const WorksSection: React.FC<WorksSectionProps> = ({ data, lang, onSelectProject }) => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const t = translations[lang];

  const filterTabs = [
    { key: 'all', label: t.works.filterAll },
    { key: 'project', label: t.works.filterProject },
    { key: 'operation', label: t.works.filterOperation },
    { key: 'business', label: t.works.filterBusiness },
  ];

  const filteredProjects = activeFilter === 'all'
    ? data.projects
    : data.projects.filter(p => p.category === activeFilter);

  return (
    <section id="works" className="relative min-h-screen py-24 px-6 lg:px-16 flex flex-col justify-center overflow-hidden border-t border-zinc-100/80 bg-white">
      {/* Background Watermark 04 unified subtle tone */}
      <div 
        className="watermark-number absolute right-4 lg:right-16 top-1/2 transform -translate-y-1/2 text-[240px] sm:text-[340px] lg:text-[440px] font-black text-zinc-950/[0.04] -z-10 select-none pointer-events-none"
        aria-hidden="true"
      >
        04
      </div>

      <div className="max-w-7xl mx-auto w-full">
        {/* Header Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-14">
          {/* Left Title */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 mb-3">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span className="text-xs font-bold tracking-[0.2em] text-zinc-900 uppercase">
                {t.works.eyebrow}
              </span>
            </div>

            <h2 className="font-display font-black text-4xl sm:text-6xl lg:text-[76px] text-zinc-950 tracking-tight leading-[0.98]">
              {t.works.title}
            </h2>
          </div>

          {/* Right Subtitle & Actions */}
          <div className="lg:col-span-6 space-y-5">
            <p className="text-sm sm:text-base text-zinc-600 font-normal leading-relaxed">
              {t.works.subtitle}
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              {/* Filter Tabs */}
              <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-white/70 backdrop-blur-xl rounded-2xl border border-white/90 shadow-[0_4px_20px_rgb(0,0,0,0.03)]">
                {filterTabs.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveFilter(tab.key)}
                    className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                      activeFilter === tab.key
                        ? 'bg-zinc-950 text-white shadow-sm scale-105'
                        : 'text-zinc-600 hover:text-zinc-950 hover:bg-white/80'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Projects Cards Showcase (3 Columns Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="h-full"
              >
                <GlassCard
                  tiltIntensity={8}
                  interactiveScale={1.02}
                  spotlightRadius={380}
                  className="group cursor-pointer flex flex-col h-full overflow-hidden"
                  onClick={() => onSelectProject(project)}
                >
                  {/* Artwork Container */}
                  <div className="aspect-video w-full p-4 bg-zinc-100/80 flex items-center justify-center relative overflow-hidden transition-all duration-300">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover rounded-2xl shadow-xs transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Client Badge */}
                    <div className="absolute top-4 left-4 z-10">
                      <span className="px-3.5 py-1.5 rounded-full bg-zinc-950/90 backdrop-blur-md text-white text-[11px] font-extrabold shadow-md border border-white/20">
                        {project.client}
                      </span>
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                      <span className="px-4 py-2 bg-white/95 backdrop-blur-md text-zinc-950 font-bold text-xs rounded-full shadow-lg flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        <Eye className="w-3.5 h-3.5 text-amber-500" />
                        {lang === 'en' ? 'View Deep Case Study' : '查看完整案例'}
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 sm:p-7 space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-950 bg-amber-50/90 border border-amber-200/80 px-2.5 py-0.5 rounded-lg shadow-2xs">
                          {project.tag}
                        </span>
                        <span className="text-xs font-semibold text-zinc-400">
                          {project.year}
                        </span>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-extrabold text-zinc-950 group-hover:text-amber-600 transition-colors flex items-center justify-between">
                        <span>{project.title}</span>
                        <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-amber-600 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-200" />
                      </h3>

                      <p className="text-xs sm:text-sm text-zinc-600 line-clamp-3 leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    {/* Key Metrics Chips */}
                    {project.metrics && (
                      <div className="grid grid-cols-2 gap-2.5 pt-3.5 border-t border-zinc-100/90">
                        {project.metrics.slice(0, 2).map((m, mIdx) => (
                          <div key={mIdx} className="p-2.5 rounded-xl bg-white/60 hover:bg-white/90 border border-white/90 backdrop-blur-md transition-all duration-200 shadow-2xs">
                            <span className="block text-[10px] font-bold text-zinc-400 uppercase">{m.label}</span>
                            <span className="block text-xs font-black text-zinc-900 mt-0.5">{m.value}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
