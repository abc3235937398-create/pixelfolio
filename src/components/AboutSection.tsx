import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Sparkles, Compass, Camera, Waves, BookOpen, Heart } from 'lucide-react';
import { ProfileData } from '../types';
import { translations } from '../data/portfolioData';

interface AboutSectionProps {
  data: ProfileData;
  lang: 'en' | 'zh';
}

export const AboutSection: React.FC<AboutSectionProps> = ({ data, lang }) => {
  const t = translations[lang];
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 90]);

  // Framer Motion variants for stagger animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="relative min-h-screen py-24 px-6 lg:px-16 flex flex-col justify-center overflow-hidden bg-[#fafafa]"
    >
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none translate-y-1/3 -translate-x-1/3" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">
        
        {/* Left Column: Content (Matches reference image) */}
        <motion.div 
          className="lg:col-span-6 space-y-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {/* Header Area */}
          <div className="space-y-6">
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-zinc-200 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              <span className="text-xs font-bold text-zinc-600 tracking-wider">
                {lang === 'en' ? 'ABOUT ME' : '个人简介'}
              </span>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <h2 className="text-6xl sm:text-7xl font-black text-zinc-950 tracking-tight mb-2">
                {lang === 'en' ? 'About Me' : '关于我'}
              </h2>
              <p className="text-4xl sm:text-5xl font-bold text-zinc-400">
                {lang === 'en' ? 'Profile' : 'About me'}
              </p>
            </motion.div>
            
            <motion.p variants={itemVariants} className="text-sm sm:text-base text-zinc-600 leading-loose max-w-2xl font-medium">
              {data.introDescription}
            </motion.p>
          </div>

          {/* Cards Area */}
          <div className="space-y-6">
            {/* Profile Info Card */}
            <motion.div 
              variants={itemVariants}
              whileHover={{ y: -4, boxShadow: '0 20px 40px -10px rgba(0,0,0,0.08)' }}
              className="bg-white rounded-[2rem] border border-zinc-100 shadow-[0_8px_30px_rgb(0,0,0,0.03)] p-6 sm:p-8 transition-all duration-300"
            >
              <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-6 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>{lang === 'en' ? 'Candidate Profile' : '个人档案与基础信息'}</span>
              </h3>

              <div className="divide-y divide-zinc-100">
                <div className="py-3.5 flex justify-between items-center text-sm">
                  <span className="font-bold text-zinc-900">{t.about.gender} / {t.about.birthDate}</span>
                  <span className="text-zinc-600 font-medium">{data.gender} · {data.birthDate}</span>
                </div>
                <div className="py-3.5 flex justify-between items-center text-sm">
                  <span className="font-bold text-zinc-900">{t.about.experienceYears}</span>
                  <span className="font-bold text-amber-950 bg-amber-50 border border-amber-200/60 px-2.5 py-1 rounded-md text-xs">
                    两年
                  </span>
                </div>
                <div className="py-3.5 flex justify-between items-center text-sm">
                  <span className="font-bold text-zinc-900">{lang === 'en' ? 'Education' : '毕业院校'}</span>
                  <span className="text-zinc-900 font-bold text-right text-xs sm:text-sm">
                    南昌大学 (211双一流) · 本科
                  </span>
                </div>
                <div className="py-3.5 flex justify-between items-center text-sm">
                  <span className="font-bold text-zinc-900">{t.about.email}</span>
                  <a href={`mailto:${data.email}`} className="text-zinc-900 font-bold hover:text-amber-600 transition-colors">
                    {data.email}
                  </a>
                </div>
                <div className="py-3.5 flex justify-between items-center text-sm">
                  <span className="font-bold text-zinc-900">{t.about.phone}</span>
                  <a href={`tel:${data.phone}`} className="text-zinc-900 font-bold hover:text-amber-600 transition-colors">
                    {data.phone}
                  </a>
                </div>
                <div className="py-3.5 flex justify-between items-center text-sm border-b-0 pb-0">
                  <span className="font-bold text-zinc-900">{t.about.freelance}</span>
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    开放工作机会
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Core Positioning Card */}
            <motion.div 
              variants={itemVariants}
              whileHover={{ y: -4, boxShadow: '0 20px 40px -10px rgba(0,0,0,0.08)' }}
              className="bg-white rounded-[2rem] border border-zinc-100 shadow-[0_8px_30px_rgb(0,0,0,0.03)] p-6 sm:p-8 transition-all duration-300"
            >
              <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-4 flex items-center gap-2">
                <Compass className="w-3.5 h-3.5 text-amber-500" />
                <span>{lang === 'en' ? 'Core Positioning' : '核心定位与求职方向'}</span>
              </h3>
              <p className="text-sm text-zinc-500 font-medium leading-relaxed">
                大客户经理/售前解决方案经理/行业市场经理/B 端运营/
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Right Column: Rich Abstract Animation (Fills the empty space creatively) */}
        <div className="hidden lg:flex lg:col-span-6 relative h-[700px] w-full items-center justify-center pointer-events-none select-none">
          
          {/* Animated 3D-like Composition */}
          <div className="relative w-[450px] h-[450px]">
            {/* Central Glow */}
            <motion.div 
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 bg-gradient-to-tr from-amber-400/20 to-orange-300/20 rounded-full blur-3xl"
            />
            
            {/* Spinning Rings */}
            <motion.div 
              style={{ rotate: rotate1 }}
              className="absolute inset-4 border border-zinc-200/80 rounded-full border-dashed"
            />
            
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute inset-12 border-[0.5px] border-amber-300/40 rounded-full"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-amber-400 rounded-full shadow-[0_0_15px_rgba(251,191,36,0.8)]" />
            </motion.div>

            {/* Floating Glass Panels */}
            <motion.div 
              style={{ y: y1 }}
              whileHover={{ 
                scale: 1.08, 
                zIndex: 50,
                boxShadow: '0 30px 60px -12px rgba(0,0,0,0.2), 0 0 40px rgba(251,191,36,0.2)' 
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="absolute top-[10%] -left-[10%] w-52 h-auto bg-white/40 hover:bg-white/60 backdrop-blur-2xl border border-white/60 hover:border-amber-300/50 rounded-3xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] p-5 flex flex-col gap-4 pointer-events-auto cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
                  <Heart className="w-4 h-4 text-amber-500" />
                </div>
                <span className="text-[11px] font-black tracking-widest text-zinc-800 uppercase">Hobbies</span>
              </div>
              
              <div className="space-y-3 w-full">
                <div className="flex items-center gap-3 p-2 rounded-xl bg-white/40 border border-white/50">
                  <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shrink-0 shadow-sm">
                    <Camera className="w-4 h-4 text-zinc-600" />
                  </div>
                  <span className="text-sm font-bold text-zinc-700">摄影 <span className="text-[10px] text-zinc-400 font-medium ml-1">Photo</span></span>
                </div>
                <div className="flex items-center gap-3 p-2 rounded-xl bg-white/40 border border-white/50">
                  <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shrink-0 shadow-sm">
                    <Waves className="w-4 h-4 text-blue-500" />
                  </div>
                  <span className="text-sm font-bold text-zinc-700">游泳 <span className="text-[10px] text-zinc-400 font-medium ml-1">Swim</span></span>
                </div>
                <div className="flex items-center gap-3 p-2 rounded-xl bg-white/40 border border-white/50">
                  <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shrink-0 shadow-sm">
                    <BookOpen className="w-4 h-4 text-emerald-500" />
                  </div>
                  <span className="text-sm font-bold text-zinc-700">阅读 <span className="text-[10px] text-zinc-400 font-medium ml-1">Read</span></span>
                </div>
              </div>
            </motion.div>

            <motion.div 
              style={{ y: y2 }}
              whileHover={{ 
                scale: 1.08, 
                zIndex: 50,
                boxShadow: '0 30px 60px -12px rgba(0,0,0,0.2), 0 0 40px rgba(251,191,36,0.2)' 
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="absolute bottom-[8%] -right-[5%] w-64 h-auto bg-white/50 hover:bg-white/70 backdrop-blur-3xl border border-white/80 hover:border-amber-300/50 rounded-3xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.08)] flex flex-col p-6 pointer-events-auto cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center">
                  <Compass className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-zinc-900">Life & Work</h4>
                  <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Balance</p>
                </div>
              </div>
              <p className="text-xs text-zinc-600 font-medium leading-relaxed">
                用脚步丈量世界，用镜头记录生活，在阅读中沉淀思想。
              </p>
            </motion.div>

            {/* Decorative Typographic Elements */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="absolute top-[40%] right-[10%] w-24 h-24 rounded-full bg-zinc-900 flex items-center justify-center shadow-xl shadow-zinc-900/20"
            >
              <span className="text-white font-black text-2xl tracking-tighter">PM.</span>
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
};
