import React from 'react';
import { motion } from 'motion/react';
import { Building2, Quote } from 'lucide-react';
import { ProfileData } from '../types';
import { translations } from '../data/portfolioData';
import { GlassCard } from './GlassCard';

interface ExperienceSectionProps {
  data: ProfileData;
  lang: 'en' | 'zh';
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ data, lang }) => {
  const t = translations[lang];

  return (
    <section id="experience" className="relative min-h-screen py-16 px-6 lg:px-16 flex flex-col justify-center overflow-hidden bg-[#fafafa]">
      <div className="max-w-7xl mx-auto w-full">
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
        >
          {/* Section Header */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-zinc-200 mb-3 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              <span className="text-xs font-bold text-zinc-600 tracking-wider">
                {t.experience.biodata}
              </span>
            </div>

            <div className="space-y-2 mb-6">
              <h2 className="text-6xl sm:text-7xl font-black text-zinc-950 tracking-tight mb-2">
                {lang === 'en' ? 'Work Experience' : '工作经历'}
              </h2>
              <p className="text-4xl sm:text-5xl font-bold text-zinc-400">
                {lang === 'en' ? 'Track Record' : 'Work Experience'}
              </p>
            </div>
          </div>
        </motion.div>

        <div className="relative items-start space-y-10">
          {/* Work Experiences Timeline (Staggered Alternating Layout) */}
          <div className="w-full pt-6">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400 mb-8 flex items-center justify-center gap-2">
              <Building2 className="w-4 h-4 text-zinc-950" />
              <span>{t.experience.experiences}</span>
            </h3>

            <div className="relative w-full pb-12">
              {/* Central Timeline Line (Desktop) */}
              <motion.div 
                initial={{ height: 0 }}
                whileInView={{ height: '100%' }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
                className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-zinc-200/60 -translate-x-1/2" 
              />
              {/* Left Timeline Line (Mobile) */}
              <div className="lg:hidden absolute left-6 top-0 bottom-0 w-0.5 bg-zinc-200/60" />

              {/* Desktop 2-Column Grid */}
              <div className="hidden lg:grid grid-cols-2 gap-x-12 relative items-start">
                {/* Left Column (Evens: 0, 2) */}
                <div className="space-y-8">
                  {data.experiences.map((exp, idx) => {
                    if (idx % 2 !== 0) return null; // Only evens (0, 2)
                    const isLeadRole = idx === 0;

                    return (
                      <motion.div 
                        key={exp.id} 
                        initial={{ opacity: 0, x: -40, y: 20 }}
                        whileInView={{ opacity: 1, x: 0, y: 0 }}
                        viewport={{ once: true, margin: '-50px' }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="relative flex items-center justify-end w-full group"
                      >
                        {/* Timeline Dot (Right side of Left Column) */}
                        <motion.div 
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: 0.2, type: 'spring' }}
                          className="absolute top-10 -right-[calc(1.5rem+8px)] w-4 h-4 rounded-full bg-white border-4 border-amber-500 z-20 group-hover:scale-125 transition-transform duration-300 shadow-sm" 
                        />

                        {/* Content Card */}
                        <GlassCard 
                          tiltIntensity={8}
                          interactiveScale={1.02}
                          spotlightRadius={380}
                          className="p-6 sm:p-8 cursor-default relative overflow-hidden text-left w-full group"
                        >
                          <div className={`absolute top-0 left-0 bottom-0 w-1.5 ${isLeadRole ? 'bg-amber-500' : 'bg-zinc-900'} transition-all duration-300 z-10`} />

                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-100/90 pb-4 pl-3">
                            <div>
                              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-2">
                                <h4 className="text-xl sm:text-2xl font-black text-zinc-950 transition-colors">
                                  {exp.company}
                                </h4>
                                <span className="text-sm font-bold text-zinc-500">
                                  / {exp.role}
                                </span>
                              </div>
                              {exp.tag && (
                                <div className="flex flex-wrap gap-2">
                                  {exp.tag.split(' / ').map((tItem, tIdx) => (
                                    <span key={tIdx} className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded border ${isLeadRole ? 'bg-amber-50 text-amber-950 border-amber-200/80' : 'bg-zinc-50 text-zinc-800 border-zinc-200'} shadow-2xs`}>
                                      {tItem}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                            <span className="text-xs font-bold text-zinc-400 shrink-0 self-start sm:self-auto pt-1 sm:pt-0">
                              {exp.period}
                            </span>
                          </div>

                          <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal pl-3 mt-4">
                            {exp.description}
                          </p>

                          {exp.highlights && exp.highlights.length > 0 && (
                            <div className="pt-3 space-y-2.5 pl-3 mt-3">
                              {exp.highlights.map((highlight, hIdx) => {
                                const parts = highlight.split('：');
                                const hasTitle = parts.length > 1;
                                return (
                                  <div key={hIdx} className="text-xs text-zinc-600 flex items-start gap-3 leading-relaxed">
                                    <span className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${isLeadRole ? 'bg-amber-500' : 'bg-zinc-800'}`} />
                                    <div>
                                      {hasTitle ? (
                                        <>
                                          <span className="font-bold text-zinc-900">{parts[0]}：</span>
                                          <span>{parts.slice(1).join('：')}</span>
                                        </>
                                      ) : (
                                        <span>{highlight}</span>
                                      )}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </GlassCard>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Right Column (Odds: 1, 3) - Offset downwards for staggered effect */}
                <div className="space-y-8 pt-12">
                  {data.experiences.map((exp, idx) => {
                    if (idx % 2 === 0) return null; // Only odds (1, 3)
                    const isLeadRole = idx === 0;

                    return (
                      <motion.div 
                        key={exp.id} 
                        initial={{ opacity: 0, x: 40, y: 20 }}
                        whileInView={{ opacity: 1, x: 0, y: 0 }}
                        viewport={{ once: true, margin: '-50px' }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="relative flex items-center justify-start w-full group"
                      >
                        {/* Timeline Dot (Left side of Right Column) */}
                        <motion.div 
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: 0.2, type: 'spring' }}
                          className="absolute top-10 -left-[calc(1.5rem+8px)] w-4 h-4 rounded-full bg-white border-4 border-amber-500 z-20 group-hover:scale-125 transition-transform duration-300 shadow-sm" 
                        />

                        {/* Content Card */}
                        <GlassCard 
                          tiltIntensity={8}
                          interactiveScale={1.02}
                          spotlightRadius={380}
                          className="p-6 sm:p-8 cursor-default relative overflow-hidden text-left w-full group"
                        >
                          <div className={`absolute top-0 left-0 bottom-0 w-1.5 ${isLeadRole ? 'bg-amber-500' : 'bg-zinc-900'} transition-all duration-300 z-10`} />

                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-100/90 pb-4 pl-3">
                            <div>
                              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-2">
                                <h4 className="text-xl sm:text-2xl font-black text-zinc-950 transition-colors">
                                  {exp.company}
                                </h4>
                                <span className="text-sm font-bold text-zinc-500">
                                  / {exp.role}
                                </span>
                              </div>
                              {exp.tag && (
                                <div className="flex flex-wrap gap-2">
                                  {exp.tag.split(' / ').map((tItem, tIdx) => (
                                    <span key={tIdx} className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded border ${isLeadRole ? 'bg-amber-50 text-amber-950 border-amber-200/80' : 'bg-zinc-50 text-zinc-800 border-zinc-200'} shadow-2xs`}>
                                      {tItem}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                            <span className="text-xs font-bold text-zinc-400 shrink-0 self-start sm:self-auto pt-1 sm:pt-0">
                              {exp.period}
                            </span>
                          </div>

                          <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal pl-3 mt-4">
                            {exp.description}
                          </p>

                          {exp.highlights && exp.highlights.length > 0 && (
                            <div className="pt-3 space-y-2.5 pl-3 mt-3">
                              {exp.highlights.map((highlight, hIdx) => {
                                const parts = highlight.split('：');
                                const hasTitle = parts.length > 1;
                                return (
                                  <div key={hIdx} className="text-xs text-zinc-600 flex items-start gap-3 leading-relaxed">
                                    <span className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${isLeadRole ? 'bg-amber-500' : 'bg-zinc-800'}`} />
                                    <div>
                                      {hasTitle ? (
                                        <>
                                          <span className="font-bold text-zinc-900">{parts[0]}：</span>
                                          <span>{parts.slice(1).join('：')}</span>
                                        </>
                                      ) : (
                                        <span>{highlight}</span>
                                      )}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </GlassCard>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Mobile Single-Column Layout */}
              <div className="lg:hidden space-y-8 pl-14">
                {data.experiences.map((exp, idx) => {
                  const isLeadRole = idx === 0;

                  return (
                    <motion.div 
                      key={exp.id} 
                      initial={{ opacity: 0, x: 20, y: 20 }}
                      whileInView={{ opacity: 1, x: 0, y: 0 }}
                      viewport={{ once: true, margin: '-50px' }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      className="relative flex items-center justify-start w-full group"
                    >
                      {/* Timeline Dot */}
                      <motion.div 
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.2, type: 'spring' }}
                        className="absolute top-10 -left-10 w-4 h-4 rounded-full bg-white border-4 border-amber-500 z-20 group-hover:scale-125 transition-transform duration-300 shadow-sm" 
                      />

                      {/* Content Card */}
                      <GlassCard 
                        tiltIntensity={8}
                        interactiveScale={1.02}
                        spotlightRadius={380}
                        className="p-6 cursor-default relative overflow-hidden text-left w-full group"
                      >
                        <div className={`absolute top-0 left-0 bottom-0 w-1.5 ${isLeadRole ? 'bg-amber-500' : 'bg-zinc-900'} transition-all duration-300 z-10`} />

                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-100/90 pb-4 pl-3">
                          <div>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-2">
                              <h4 className="text-xl sm:text-2xl font-black text-zinc-950 transition-colors">
                                {exp.company}
                              </h4>
                              <span className="text-sm font-bold text-zinc-500">
                                / {exp.role}
                              </span>
                            </div>
                            {exp.tag && (
                              <div className="flex flex-wrap gap-2">
                                {exp.tag.split(' / ').map((tItem, tIdx) => (
                                  <span key={tIdx} className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded border ${isLeadRole ? 'bg-amber-50 text-amber-950 border-amber-200/80' : 'bg-zinc-50 text-zinc-800 border-zinc-200'} shadow-2xs`}>
                                    {tItem}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                          <span className="text-xs font-bold text-zinc-400 shrink-0 self-start sm:self-auto pt-1 sm:pt-0">
                            {exp.period}
                          </span>
                        </div>

                        <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal pl-3 mt-4">
                          {exp.description}
                        </p>

                        {exp.highlights && exp.highlights.length > 0 && (
                          <div className="pt-3 space-y-2.5 pl-3 mt-3">
                            {exp.highlights.map((highlight, hIdx) => {
                              const parts = highlight.split('：');
                              const hasTitle = parts.length > 1;
                              return (
                                <div key={hIdx} className="text-xs text-zinc-600 flex items-start gap-3 leading-relaxed">
                                  <span className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${isLeadRole ? 'bg-amber-500' : 'bg-zinc-800'}`} />
                                  <div>
                                    {hasTitle ? (
                                      <>
                                        <span className="font-bold text-zinc-900">{parts[0]}：</span>
                                        <span>{parts.slice(1).join('：')}</span>
                                      </>
                                    ) : (
                                      <span>{highlight}</span>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                            </div>
                          )}
                        </GlassCard>
                      </motion.div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Bottom Row: References */}
          <div className="w-full pt-10 border-t border-zinc-200/60 flex justify-center">
            <div className="w-full max-w-3xl">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400 mb-6 flex items-center justify-center gap-2">
                <Quote className="w-4 h-4 text-amber-500" />
                <span>{t.experience.references}</span>
              </h3>

              <div className="space-y-4">
                {data.references.map((ref) => (
                  <GlassCard 
                    key={ref.id}
                    tiltIntensity={8}
                    interactiveScale={1.02}
                    spotlightRadius={380}
                    className="p-6"
                  >
                    <div className="space-y-4 text-center sm:text-left">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                        <div className="flex flex-col space-y-1">
                          <span className="font-extrabold text-zinc-950 text-sm">{ref.name}</span>
                          <span className="text-zinc-500 font-semibold">{ref.title}</span>
                        </div>
                      </div>
                      <p className="text-xs text-zinc-600 leading-relaxed italic relative inline-block">
                        <span className="absolute -top-2 -left-2 text-2xl text-amber-200 opacity-50 font-serif">"</span>
                        {ref.quote}
                        <span className="absolute -bottom-4 -right-2 text-2xl text-amber-200 opacity-50 font-serif">"</span>
                      </p>
                    </div>
                  </GlassCard>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};