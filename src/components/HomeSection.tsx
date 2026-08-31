import React, { useRef, useState, useCallback } from 'react';
import { motion } from 'motion/react';
import { 
  Briefcase, 
  Layers, 
  TrendingUp, 
  Sparkles, 
  ArrowRight, 
  Award, 
  CheckCircle2, 
  GraduationCap, 
  ShieldCheck, 
  ArrowUpRight,
  Phone
} from 'lucide-react';
import { ProfileData } from '../types';
import { translations } from '../data/portfolioData';
import { GlassCard } from './GlassCard';

interface HomeSectionProps {
  data: ProfileData;
  lang: 'en' | 'zh';
  onNavigate: (sectionId: string) => void;
}

export const HomeSection: React.FC<HomeSectionProps> = ({ data, lang, onNavigate }) => {
  const t = translations[lang];
  const avatarBoxRef = useRef<HTMLDivElement>(null);
  const [avatarHover, setAvatarHover] = useState(false);
  const [avatarTilt, setAvatarTilt] = useState({
    tiltX: 0,
    tiltY: 0,
    rotZ: 45,
    glintX: 50,
    glintY: 50,
    parallaxX: 0,
    parallaxY: 0,
  });

  const handleAvatarMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!avatarBoxRef.current) return;
    const rect = avatarBoxRef.current.getBoundingClientRect();
    const nx = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2); // -1 to 1
    const ny = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2); // -1 to 1

    const glintX = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const glintY = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));

    setAvatarTilt({
      tiltX: -ny * 16,
      tiltY: nx * 16,
      rotZ: 45 + nx * 6,
      glintX,
      glintY,
      parallaxX: -nx * 14,
      parallaxY: -ny * 10,
    });
  }, []);

  const handleAvatarMouseEnter = useCallback(() => {
    setAvatarHover(true);
  }, []);

  const handleAvatarMouseLeave = useCallback(() => {
    setAvatarHover(false);
    setAvatarTilt({
      tiltX: 0,
      tiltY: 0,
      rotZ: 45,
      glintX: 50,
      glintY: 50,
      parallaxX: 0,
      parallaxY: 0,
    });
  }, []);

  // Interactive tags placed around the central character with unified frosted glass translucent style
  const interactiveTags = [
    {
      id: 'tag-sungrow',
      size: 'lg', // Key Highlight - Large badge
      label: lang === 'en' ? 'Sungrow PM Lead' : '阳光电源项目负责人',
      sub: lang === 'en' ? '80M Key Account · Full Lifecycle' : '8000W大客户 · 全周期交付',
      icon: Award,
      target: 'works',
      bgColor: 'bg-white/75 hover:bg-white/95 text-zinc-950 border-amber-300/70 hover:border-amber-400 shadow-lg shadow-amber-500/10 hover:shadow-xl hover:shadow-amber-500/15',
      iconBg: 'bg-amber-500/90 text-white shadow-xs',
      iconColor: 'text-white',
      badgeClass: 'hidden sm:flex absolute -top-8 sm:-top-10 lg:-top-12 -left-4 sm:-left-12 lg:-left-20 z-20',
      floatDelay: 0,
    },
    {
      id: 'tag-edu',
      size: 'md', // Medium badge
      label: lang === 'en' ? 'Nanchang Univ. \'24' : '南昌大学24届',
      sub: lang === 'en' ? '211 Key Univ. · Digital Media' : '211双一流 · 数字传媒统招本科',
      icon: GraduationCap,
      target: 'experience',
      bgColor: 'bg-white/75 hover:bg-white/95 text-zinc-900 border-white/90 hover:border-zinc-300 shadow-md shadow-zinc-900/5 hover:shadow-lg',
      iconBg: 'bg-zinc-100/90 text-zinc-900 shadow-xs',
      iconColor: 'text-zinc-800',
      badgeClass: 'hidden sm:flex absolute -top-8 sm:-top-10 lg:-top-12 -right-4 sm:-right-10 lg:-right-16 z-20',
      floatDelay: 1.2,
    },
    {
      id: 'tag-huawei',
      size: 'lg', // Large badge
      label: lang === 'en' ? 'Huawei Trainee' : '华为管培生',
      sub: lang === 'en' ? 'KA Operations · 1M+ Deals' : '高端客群运营 · 百万级成单',
      icon: Briefcase,
      target: 'experience',
      bgColor: 'bg-white/75 hover:bg-white/95 text-zinc-950 border-white/90 hover:border-zinc-300 shadow-lg shadow-zinc-900/5 hover:shadow-xl',
      iconBg: 'bg-zinc-900/90 text-white shadow-xs',
      iconColor: 'text-white',
      badgeClass: 'hidden sm:flex absolute top-1/2 -translate-y-1/2 -left-8 sm:-left-20 lg:-left-28 z-20',
      floatDelay: 0.8,
    },
    {
      id: 'tag-huatu',
      size: 'md', // Medium badge
      label: lang === 'en' ? 'Branch Principal' : '地市校长',
      sub: lang === 'en' ? 'Top 3 in Province · Turnaround' : '全省第3 · 带领校区扭亏为盈',
      icon: TrendingUp,
      target: 'experience',
      bgColor: 'bg-white/75 hover:bg-white/95 text-zinc-900 border-white/90 hover:border-zinc-300 shadow-md shadow-zinc-900/5 hover:shadow-lg',
      iconBg: 'bg-zinc-100/90 text-zinc-900 shadow-xs',
      iconColor: 'text-zinc-800',
      badgeClass: 'hidden sm:flex absolute bottom-16 sm:bottom-20 lg:bottom-24 -right-8 sm:-right-16 lg:-right-20 z-20',
      floatDelay: 2.1,
    },
    {
      id: 'tag-contact',
      size: 'sm', // Compact Action badge
      label: lang === 'en' ? 'Available · WeChat' : '微信同号',
      sub: lang === 'en' ? 'Get in touch' : '查看完整联系方式',
      icon: Phone,
      target: 'contact',
      bgColor: 'bg-zinc-950/85 hover:bg-zinc-950/95 text-white border-zinc-700/60 shadow-xl shadow-zinc-950/20',
      iconBg: 'bg-amber-400 text-zinc-950 shadow-xs',
      iconColor: 'text-zinc-950',
      badgeClass: 'hidden sm:flex absolute -bottom-8 sm:-bottom-10 lg:-bottom-6 left-4 sm:left-12 lg:left-20 z-20',
      floatDelay: 1.8,
    },
  ];

  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-between pt-24 lg:pt-14 pb-12 px-6 lg:px-16 overflow-hidden bg-white">
      {/* Background Watermark 01 unified subtle tone */}
      <div 
        className="watermark-number absolute right-4 lg:right-12 top-1/4 transform -translate-y-1/3 text-[220px] sm:text-[320px] lg:text-[440px] font-black text-zinc-950/[0.04] -z-10 select-none pointer-events-none"
        aria-hidden="true"
      >
        01
      </div>

      {/* Main Hero Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-8 lg:gap-14 items-center my-auto">
        {/* Central Portrait Visual with Multi-layer Occlusion (Background Graphic -> Subject Portrait -> Frosted Badges) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 flex justify-center lg:justify-center relative py-6 select-none"
        >
          <div 
            ref={avatarBoxRef}
            data-hero-avatar="true"
            onMouseMove={handleAvatarMouseMove}
            onMouseEnter={handleAvatarMouseEnter}
            onMouseLeave={handleAvatarMouseLeave}
            className="relative w-80 h-80 sm:w-[420px] sm:h-[420px] flex items-center justify-center cursor-pointer group"
            style={{ perspective: 1200 }}
          >
            {/* 1. Deep Background Layer: Typographic Watermark & Radiant Golden Aura */}
            <div 
              className={`absolute inset-0 rounded-full blur-3xl -z-10 transition-all duration-500 pointer-events-none ${
                avatarHover 
                  ? 'bg-amber-400/40 scale-110' 
                  : 'bg-amber-400/20 scale-95'
              }`} 
            />
            
            {/* Background Graphic Text behind subject with parallax */}
            <div 
              className="absolute -top-6 sm:-top-8 left-1/2 -translate-x-1/2 z-0 font-black text-4xl sm:text-5xl lg:text-6xl text-zinc-950/[0.06] tracking-[0.25em] uppercase select-none pointer-events-none whitespace-nowrap transition-transform duration-200"
              style={{
                transform: `translateX(calc(-50% + ${avatarTilt.parallaxX * 0.4}px)) translateY(${avatarTilt.parallaxY * 0.4}px)`,
              }}
              aria-hidden="true"
            >
              PM LEAD
            </div>

            {/* 2. Interactive 3D Background Diamond Card */}
            <div 
              className="absolute inset-6 sm:inset-8 rounded-[52px] sm:rounded-[68px] z-0 overflow-hidden"
              style={{ 
                backgroundColor: data.heroBadgeColor || '#f59e0b',
                transform: avatarHover
                  ? `rotateZ(${avatarTilt.rotZ}deg) rotateX(${avatarTilt.tiltX}deg) rotateY(${avatarTilt.tiltY}deg) scale3d(1.06, 1.06, 1.06)`
                  : 'rotateZ(45deg) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
                boxShadow: avatarHover
                  ? '0 28px 65px -12px rgba(245, 158, 11, 0.55), 0 0 35px rgba(251, 191, 36, 0.45)'
                  : '0 20px 45px -10px rgba(245, 158, 11, 0.35)',
                transition: avatarHover
                  ? 'transform 0.08s ease-out, box-shadow 0.2s ease'
                  : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s ease',
              }}
            >
              {/* Inner geometric highlight line */}
              <div 
                className={`absolute inset-2 rounded-[44px] sm:rounded-[60px] border pointer-events-none transition-all duration-300 ${
                  avatarHover ? 'border-white/60 shadow-[inset_0_0_20px_rgba(255,255,255,0.4)]' : 'border-white/30'
                }`} 
              />

              {/* Dynamic Specular Glint on Diamond Card */}
              {avatarHover && (
                <div 
                  className="absolute inset-0 pointer-events-none transition-opacity duration-150"
                  style={{
                    background: `radial-gradient(280px circle at ${avatarTilt.glintX}% ${avatarTilt.glintY}%, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.15) 40%, transparent 80%)`,
                  }}
                />
              )}

              {/* Diagonal Light Sweep Sheen */}
              <div 
                className="absolute inset-0 pointer-events-none opacity-40 mix-blend-overlay"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.6) 0%, transparent 50%, rgba(0,0,0,0.15) 100%)',
                }}
              />
            </div>

            {/* Background Orbital Rings (Expands and glows brighter on hover) */}
            <div 
              className={`absolute w-60 h-60 sm:w-80 sm:h-80 rounded-full border -z-5 pointer-events-none transition-all duration-500 ${
                avatarHover 
                  ? 'border-amber-400/50 scale-105 shadow-[0_0_25px_rgba(251,191,36,0.3)] animate-spin-fast' 
                  : 'border-amber-500/20 animate-spin-slow'
              }`} 
            />

            {/* 3. Subject Portrait Layer (Z-10): Interactive 3D Parallax Separation */}
            <div 
              className="relative z-10 w-72 h-96 sm:w-96 sm:h-[460px] -mt-16 sm:-mt-20 overflow-visible flex items-end justify-center pointer-events-none"
              style={{
                transform: avatarHover
                  ? `translateX(${avatarTilt.parallaxX}px) translateY(${avatarTilt.parallaxY}px) scale(1.02)`
                  : 'translateX(0px) translateY(0px) scale(1)',
                transition: avatarHover
                  ? 'transform 0.08s ease-out'
                  : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              <div className="relative w-full h-full flex items-end justify-center">
                <img
                  src={data.heroImage}
                  alt={`${data.name} ${data.surname}`}
                  className={`w-full h-full object-contain object-bottom filter transition-all duration-300 ${
                    avatarHover 
                      ? 'drop-shadow-[0_25px_35px_rgba(0,0,0,0.35)] contrast-[1.06] brightness-105' 
                      : 'drop-shadow-2xl contrast-[1.03]'
                  }`}
                  loading="eager"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            {/* 4. Foreground Floating Frosted Glass Interactive Tags (Z-25) overlapping the portrait */}
            {interactiveTags.map((tag) => {
              const Icon = tag.icon;
              
              // Size-specific styling variations
              const isLg = tag.size === 'lg';
              const isSm = tag.size === 'sm';
              
              const containerPadding = isLg 
                ? 'px-4 py-2.5 rounded-2xl' 
                : isSm 
                ? 'px-3 py-1.5 rounded-xl' 
                : 'px-3.5 py-2 rounded-2xl';

              const titleFont = isLg 
                ? 'text-xs sm:text-sm font-black' 
                : isSm 
                ? 'text-[11px] sm:text-xs font-bold' 
                : 'text-xs sm:text-sm font-black';

              const iconBoxSize = isLg ? 'p-2 rounded-xl' : isSm ? 'p-1.5 rounded-lg' : 'p-1.5 rounded-lg';
              const iconSize = isLg ? 'w-4 h-4' : isSm ? 'w-3.5 h-3.5' : 'w-3.5 h-3.5';

              return (
                <motion.button
                  key={tag.id}
                  data-clickable-card="true"
                  data-interactive="true"
                  onClick={() => onNavigate(tag.target)}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    y: [0, -6, 0]
                  }}
                  transition={{ 
                    opacity: { duration: 0.5 },
                    scale: { duration: 0.5 },
                    y: {
                      repeat: Infinity,
                      duration: 3.5 + tag.floatDelay,
                      ease: 'easeInOut',
                      delay: tag.floatDelay * 0.4
                    }
                  }}
                  whileHover={{ 
                    scale: 1.15,
                    y: -8,
                    zIndex: 50,
                    boxShadow: '0 20px 35px -6px rgba(0, 0, 0, 0.16), 0 0 20px rgba(251, 191, 36, 0.35)',
                    transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] }
                  }}
                  whileTap={{ scale: 0.96 }}
                  className={`${tag.badgeClass} ${tag.bgColor} ${containerPadding} backdrop-blur-xl border shadow-lg items-center gap-2.5 cursor-pointer group text-left origin-center`}
                  title={`${tag.label} - ${lang === 'en' ? 'Click to view details' : '点击直达详情'}`}
                >
                  <div className={`${iconBoxSize} ${tag.iconBg || 'bg-white/80'} shrink-0 shadow-2xs group-hover:scale-115 group-hover:rotate-[-4deg] transition-transform duration-200`}>
                    <Icon className={`${iconSize} ${tag.iconColor}`} />
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <p className={`${titleFont} tracking-tight leading-none whitespace-nowrap ${tag.id === 'tag-contact' ? 'text-[#c19a57]' : 'text-zinc-900 group-hover:text-amber-600'} transition-colors`}>{tag.label}</p>
                      <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-amber-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                    </div>
                    {tag.sub && (
                      <p className={`${isSm ? 'text-[9.5px]' : 'text-[10.5px]'} text-zinc-500 group-hover:text-zinc-700 font-medium leading-tight mt-0.5 transition-colors`}>
                        {tag.sub}
                      </p>
                    )}
                  </div>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Hero Typography on Right */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-3 text-left flex flex-col justify-center"
        >
          {/* Role pill with color accent */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-50/80 backdrop-blur-md border border-amber-200/70 mb-4 shadow-2xs hover:scale-105 transition-transform duration-200 w-fit">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span className="text-xs font-extrabold tracking-wider text-amber-900 uppercase">
            MY NAME IS
          </span>
        </div>
          
          <h1 className="font-display font-black text-5xl sm:text-6xl lg:text-6xl text-zinc-950 tracking-tight leading-[0.95] mb-5">
            <span className="block">{data.chineseName || data.name}</span>
            <span className="block text-zinc-400 text-2xl sm:text-3xl lg:text-3xl font-bold font-sans mt-2">
              {data.name} {data.surname}
            </span>
          </h1>

          <p className="text-base sm:text-sm lg:text-base text-zinc-600 w-full font-normal leading-relaxed mb-6">
            {data.tagline}
          </p>

          {/* Interactive Navigation Tags Cloud */}
          <div className="space-y-2.5">
            <p className="text-[11px] font-extrabold tracking-wider uppercase text-zinc-400">
              {lang === 'en' ? 'Quick Jump Tags · Click to explore' : '核心标签 · 点击直达对应板块'}
            </p>
            <div className="flex flex-wrap gap-2">
              {interactiveTags.map((tag) => {
                const Icon = tag.icon;
                return (
                  <button
                    key={tag.id}
                    onClick={() => onNavigate(tag.target)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/70 hover:bg-white/95 backdrop-blur-md border border-zinc-200/80 hover:border-zinc-300 text-xs font-bold text-zinc-800 transition-all duration-200 hover:scale-105 hover:shadow-md active:scale-95 cursor-pointer shadow-2xs group"
                  >
                    <Icon className={`w-3.5 h-3.5 ${tag.iconColor} group-hover:scale-110 transition-transform`} />
                    <span>{tag.label}</span>
                    <ArrowRight className="w-3 h-3 text-zinc-400 group-hover:text-zinc-900 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Row: 3 Highlight Services + VIEW ALL WORK Button */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.35 }}
        className="mt-12 pt-8 border-t border-zinc-100/80 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 items-end"
      >
        {data.services.slice(0, 3).map((service, idx) => {
          return (
            <GlassCard 
              key={service.id || idx} 
              className="p-6 cursor-pointer group" 
              onClick={() => onNavigate('works')}
              tiltIntensity={8}
              interactiveScale={1.03}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-zinc-950 text-white group-hover:bg-amber-500 group-hover:scale-105 transition-all duration-200 shadow-xs">
                    {service.num || `0${idx + 1}`}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-950 group-hover:translate-x-1.5 transition-all duration-200" />
                </div>
                <h3 className="text-lg font-extrabold text-zinc-950 group-hover:text-amber-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-xs text-zinc-500 line-clamp-2 leading-relaxed">
                  {service.description}
                </p>
              </div>
            </GlassCard>
          );
        })}

        {/* View All Work Button */}
        <div className="flex justify-start lg:justify-end">
          <button
            onClick={() => onNavigate('works')}
            className="w-full sm:w-auto px-8 py-4 bg-zinc-950 hover:bg-black text-white text-xs font-extrabold tracking-[0.2em] uppercase rounded-2xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl active:translate-y-0 cursor-pointer text-center flex items-center justify-center gap-2 group shadow-md"
          >
            <span>{t.home.viewAllWork}</span>
            <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1.5 transition-transform" />
          </button>
        </div>
      </motion.div>
    </section>
  );
};

