import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, Tag, Calendar, User, Wrench, CheckCircle2, TrendingUp, Sparkles, Layers } from 'lucide-react';
import { ProjectItem } from '../types';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  lang: 'en' | 'zh';
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, lang }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs"
          onClick={onClose}
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative bg-white/95 backdrop-blur-2xl border border-white/90 w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden z-10 my-8 max-h-[90vh] flex flex-col"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100/90 bg-white/80 backdrop-blur-md">
            <div className="flex items-center gap-2">
              <span 
                className="w-3 h-3 rounded-full shadow-xs"
                style={{ backgroundColor: project.badgeColor || '#f59e0b' }}
              />
              <span className="text-xs font-black uppercase tracking-wider text-zinc-800">
                {project.client} · {project.tag}
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-zinc-100 text-zinc-500 hover:text-zinc-900 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Scrollable Body */}
          <div className="overflow-y-auto p-6 sm:p-8 space-y-6 bg-white/60">
            {/* Title & Category */}
            <div>
              <span 
                className="inline-block px-3 py-1 rounded-full text-white text-[10px] font-black uppercase tracking-wider mb-2 shadow-2xs"
                style={{ backgroundColor: project.badgeColor || '#f59e0b' }}
              >
                {project.category}
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-zinc-950">
                {project.title}
              </h3>
            </div>

            {/* Key Metrics Grid */}
            {project.metrics && project.metrics.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-white/80 backdrop-blur-md border border-white/90 shadow-2xs">
                {project.metrics.map((m, idx) => (
                  <div key={idx} className="space-y-1 p-2 rounded-xl bg-white/60 border border-white/80 hover:bg-white transition-all duration-200">
                    <span className="text-[10px] font-bold text-zinc-400 block uppercase">{m.label}</span>
                    <span className="text-sm sm:text-base font-black text-zinc-950 block">{m.value}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Background Block */}
            {project.background && (
              <div className="space-y-2 p-4 rounded-2xl bg-white/70 backdrop-blur-md border border-white/90">
                <h4 className="text-xs font-black uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-zinc-700" />
                  <span>{lang === 'en' ? 'Project Background' : '项目背景'}</span>
                </h4>
                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                  {project.background}
                </p>
              </div>
            )}

            {/* Responsibilities Block */}
            {project.responsibilities && project.responsibilities.length > 0 && (
              <div className="space-y-2.5 p-4 rounded-2xl bg-white/70 backdrop-blur-md border border-white/90">
                <h4 className="text-xs font-black uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>{lang === 'en' ? 'Key Responsibilities' : '核心职责与方案设计'}</span>
                </h4>
                <ul className="space-y-2">
                  {project.responsibilities.map((resp, idx) => (
                    <li key={idx} className="text-xs sm:text-sm text-zinc-600 flex items-start gap-2 leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Results Block */}
            {project.results && project.results.length > 0 && (
              <div className="space-y-2.5 p-5 rounded-2xl bg-emerald-50/70 backdrop-blur-md border border-emerald-200/70 shadow-2xs">
                <h4 className="text-xs font-black uppercase tracking-wider text-emerald-900 flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{lang === 'en' ? 'Business Results & Value' : '项目成果与业务价值'}</span>
                </h4>
                <ul className="space-y-1.5">
                  {project.results.map((res, idx) => (
                    <li key={idx} className="text-xs sm:text-sm text-emerald-950 font-medium flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                      <span>{res}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tools Used */}
            {project.tools && project.tools.length > 0 && (
              <div className="space-y-2.5 pt-3 border-t border-zinc-100/90">
                <h4 className="text-xs font-black uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                  <Wrench className="w-3.5 h-3.5" />
                  <span>{lang === 'en' ? 'Methodologies & Tools' : '方法论与工具'}</span>
                </h4>
                <div className="flex flex-wrap gap-2 pt-1">
                  {project.tools.map((tool, idx) => (
                    <span 
                      key={idx}
                      className="px-3 py-1 bg-white/80 hover:bg-white backdrop-blur-md rounded-xl border border-white/90 hover:border-zinc-300/80 text-xs font-bold text-zinc-700 shadow-2xs hover:shadow-xs transition-all duration-200 hover:-translate-y-0.5"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
