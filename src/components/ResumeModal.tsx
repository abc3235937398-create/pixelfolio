import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Printer, Download, Mail, Phone, MapPin, CheckCircle2, User, Award, Building2, GraduationCap, Briefcase } from 'lucide-react';
import { ProfileData } from '../types';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: ProfileData;
  lang: 'en' | 'zh';
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose, data, lang }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

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

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-white/95 backdrop-blur-2xl border border-white/90 w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden z-10 my-8 max-h-[90vh] flex flex-col"
        >
          {/* Header Action Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100/90 bg-white/80 backdrop-blur-md">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
              <h3 className="font-black text-base text-zinc-950">
                {lang === 'en' ? 'Resume / Curriculum Vitae' : '朱泽嘉 · 个人简历'}
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-zinc-950 text-white text-xs font-bold hover:bg-black transition-all hover:scale-105 cursor-pointer shadow-sm"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>{lang === 'en' ? 'Print / Save PDF' : '打印 / 导出PDF'}</span>
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-xl hover:bg-zinc-100 text-zinc-500 hover:text-zinc-900 transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Printable Document Body */}
          <div className="p-8 sm:p-12 overflow-y-auto space-y-8 bg-white/60 print:p-0">
            {/* Top Resume Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start gap-6 border-b border-zinc-200/80 pb-8">
              <div>
                <h1 className="font-display text-4xl font-black text-zinc-950 tracking-tight flex items-baseline gap-3">
                  <span>{data.chineseName || data.name}</span>
                  <span className="text-zinc-400 text-xl font-normal">({data.name} {data.surname})</span>
                </h1>
                <p className="text-xs font-black text-amber-600 tracking-widest uppercase mt-2">
                  {data.roleTitle}
                </p>
                <div className="flex flex-wrap gap-2 mt-3 text-xs text-zinc-600 font-medium">
                  <span className="bg-white/80 border border-zinc-200/80 px-2.5 py-1 rounded-lg shadow-2xs">性别：{data.gender}</span>
                  <span className="bg-white/80 border border-zinc-200/80 px-2.5 py-1 rounded-lg shadow-2xs">工作经验：{data.experienceYears}</span>
                  <span className="bg-white/80 border border-zinc-200/80 px-2.5 py-1 rounded-lg shadow-2xs">出生年月：{data.birthDate} ({data.age}岁)</span>
                  <span className="bg-amber-50/90 text-amber-950 font-bold px-2.5 py-1 rounded-lg border border-amber-200/80 shadow-2xs">南昌大学 (双一流211) · 数字传媒 本科</span>
                </div>
              </div>

              {/* Contact Pill Column */}
              <div className="space-y-1.5 text-xs text-zinc-700 sm:text-right shrink-0 bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-white/90 shadow-xs">
                <div className="flex sm:justify-end items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-amber-500" />
                  <span className="font-bold">{data.phone}</span>
                </div>
                <div className="flex sm:justify-end items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-zinc-600" />
                  <span>{data.email}</span>
                </div>
                <div className="flex sm:justify-end items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-zinc-600" />
                  <span>{data.freelanceStatus}</span>
                </div>
              </div>
            </div>

            {/* 专业技能 */}
            <div className="space-y-3">
              <h2 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400 flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-500" />
                <span>{lang === 'en' ? 'Core Capabilities' : '专业技能'}</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-zinc-700">
                {data.skills.map((skill) => (
                  <div key={skill.id} className="p-3.5 bg-white/80 hover:bg-white backdrop-blur-md rounded-2xl border border-white/90 hover:border-zinc-300/80 shadow-2xs hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 space-y-1 group">
                    <div className="flex justify-between items-center font-bold text-zinc-950">
                      <span className="group-hover:text-amber-600 transition-colors">{skill.name}</span>
                      <span className="text-amber-600 font-extrabold">{skill.percentage}%</span>
                    </div>
                    {skill.description && (
                      <p className="text-[11px] text-zinc-500 leading-normal">{skill.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* 工作经历 */}
            <div className="space-y-4">
              <h2 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-zinc-950" />
                <span>{lang === 'en' ? 'Work Experience' : '工作经历'}</span>
              </h2>
              <div className="space-y-6">
                {data.experiences.map((exp) => (
                  <div key={exp.id} className="space-y-2.5 p-4 rounded-2xl bg-white/70 hover:bg-white backdrop-blur-md border border-white/90 hover:border-zinc-300/80 transition-all duration-200 hover:shadow-md">
                    <div className="flex justify-between items-center text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-black text-zinc-950 text-sm">{exp.company}</span>
                        <span className="text-zinc-600 font-bold">| {exp.role}</span>
                        {exp.tag && <span className="text-[10px] bg-amber-50 text-amber-950 border border-amber-200/80 px-2 py-0.5 rounded-md font-bold">{exp.tag}</span>}
                      </div>
                      <span className="text-zinc-400 font-semibold">{exp.period}</span>
                    </div>
                    <p className="text-xs text-zinc-600 leading-relaxed">{exp.description}</p>
                    {exp.highlights && exp.highlights.length > 0 && (
                      <ul className="space-y-1.5 pt-1">
                        {exp.highlights.map((h, i) => (
                          <li key={i} className="text-xs text-zinc-600 flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* 教育经历 */}
            <div className="space-y-3">
              <h2 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400 flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-amber-500" />
                <span>{lang === 'en' ? 'Education' : '教育背景'}</span>
              </h2>
              {data.education.map((edu) => (
                <div key={edu.id} className="p-4 bg-white/80 hover:bg-white backdrop-blur-md rounded-2xl border border-white/90 flex justify-between items-center text-xs shadow-2xs hover:shadow-md transition-all duration-200">
                  <div>
                    <h4 className="font-bold text-zinc-950 text-sm">{edu.institution} · {edu.degree}</h4>
                    <p className="text-zinc-600 mt-0.5">专业：{edu.major} ({edu.period})</p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-zinc-950 text-white font-bold text-[10px]">
                    双一流 / 211
                  </span>
                </div>
              ))}
            </div>

            {/* 自我评价 */}
            <div className="space-y-3">
              <h2 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400">
                {lang === 'en' ? 'Self Evaluation' : '自我评价'}
              </h2>
              <div className="p-5 bg-white/80 backdrop-blur-md rounded-2xl border border-white/90 space-y-2.5 text-xs text-zinc-600 shadow-2xs">
                {data.selfEvaluations.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
