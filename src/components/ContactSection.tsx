import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Send, CheckCircle2, AlertCircle, Phone, Mail, MapPin, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ProfileData } from '../types';
import { translations } from '../data/portfolioData';
import { GlassCard } from './GlassCard';

interface ContactSectionProps {
  data: ProfileData;
  lang: 'en' | 'zh';
}

export const ContactSection: React.FC<ContactSectionProps> = ({ data, lang }) => {
  const [openFaqId, setOpenFaqId] = useState<string | null>(data.faqs[0]?.id || null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const t = translations[lang];

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMsg(lang === 'en' ? 'Please fill in all fields before submitting.' : '请填写所有必填项后再提交。');
      return;
    }

    if (!formData.email.includes('@') || !formData.email.includes('.')) {
      setErrorMsg(lang === 'en' ? 'Please provide a valid email address.' : '请输入有效的电子邮箱地址。');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      try {
        confetti({
          particleCount: 90,
          spread: 70,
          origin: { y: 0.7 },
          colors: ['#f59e0b', '#3b82f6', '#10b981', '#f43f5e', '#8b5cf6'],
        });
      } catch (err) {
        // graceful
      }
    }, 600);
  };

  const handleReset = () => {
    setFormData({ name: '', email: '', message: '' });
    setIsSubmitted(false);
  };

  return (
    <section id="contact" className="relative min-h-screen py-24 px-6 lg:px-16 flex flex-col justify-center overflow-hidden border-t border-zinc-100/80 bg-white">
      <div 
        className="watermark-number absolute right-4 lg:right-16 top-1/2 transform -translate-y-1/2 text-[240px] sm:text-[340px] lg:text-[440px] font-black text-zinc-950/[0.04] -z-10 select-none pointer-events-none"
        aria-hidden="true"
      >
        05
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto w-full"
      >
        {/* Section Header */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 mb-3">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            <span className="text-xs font-bold tracking-[0.2em] text-zinc-900 uppercase">
              {t.contact.eyebrow}
            </span>
          </div>

          <h2 className="font-display font-black text-4xl sm:text-6xl lg:text-[76px] text-zinc-950 tracking-tight leading-[0.98] mb-5">
            {t.contact.title}
          </h2>
          <p className="text-base sm:text-lg text-zinc-600 max-w-2xl font-normal leading-relaxed">
            {t.contact.subtitle}
          </p>
        </div>

        {/* Quick Contact Ribbon */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
          <a
            href={`tel:${data.phone}`}
            className="block"
          >
            <GlassCard
              tiltIntensity={8}
              interactiveScale={1.05}
              spotlightRadius={280}
              className="p-5 flex items-center gap-4 group cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(245,158,11,0.15)]"
            >
              <div className="w-12 h-12 rounded-2xl bg-zinc-900 text-white group-hover:bg-amber-500 group-hover:shadow-lg group-hover:shadow-amber-500/35 flex items-center justify-center shrink-0 shadow-md group-hover:scale-115 group-hover:rotate-3 transition-all duration-300">
                <Phone className="w-5 h-5 text-amber-400 group-hover:text-white transition-colors duration-300" />
              </div>
              <div>
                <span className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider group-hover:text-amber-600/80 transition-colors">{lang === 'en' ? 'Direct Phone' : '联系电话 / 微信同号'}</span>
                <span className="block text-sm sm:text-base font-extrabold text-zinc-950 group-hover:text-amber-600 transition-colors">{data.phone}</span>
              </div>
            </GlassCard>
          </a>

          <a
            href={`mailto:${data.email}`}
            className="block"
          >
            <GlassCard
              tiltIntensity={8}
              interactiveScale={1.05}
              spotlightRadius={280}
              className="p-5 flex items-center gap-4 group cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(245,158,11,0.15)]"
            >
              <div className="w-12 h-12 rounded-2xl bg-zinc-900 text-white group-hover:bg-amber-500 group-hover:shadow-lg group-hover:shadow-amber-500/35 flex items-center justify-center shrink-0 shadow-md group-hover:scale-115 group-hover:rotate-3 transition-all duration-300">
                <Mail className="w-5 h-5 text-amber-400 group-hover:text-white transition-colors duration-300" />
              </div>
              <div>
                <span className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider group-hover:text-amber-600/80 transition-colors">{lang === 'en' ? 'Email Address' : '电子邮箱'}</span>
                <span className="block text-sm sm:text-base font-extrabold text-zinc-950 group-hover:text-amber-600 transition-colors truncate">{data.email}</span>
              </div>
            </GlassCard>
          </a>

          <div className="block">
            <GlassCard
              tiltIntensity={8}
              interactiveScale={1.05}
              spotlightRadius={280}
              isClickable={true}
              className="p-5 flex items-center gap-4 group cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(245,158,11,0.15)]"
            >
              <div className="w-12 h-12 rounded-2xl bg-zinc-900 text-white group-hover:bg-amber-500 group-hover:shadow-lg group-hover:shadow-amber-500/35 flex items-center justify-center shrink-0 shadow-md group-hover:scale-115 group-hover:rotate-3 transition-all duration-300">
                <MapPin className="w-5 h-5 text-amber-400 group-hover:text-white transition-colors duration-300" />
              </div>
              <div>
                <span className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider group-hover:text-amber-600/80 transition-colors">{lang === 'en' ? 'Availability' : '求职状态'}</span>
                <span className="block text-sm sm:text-base font-extrabold text-zinc-950 group-hover:text-amber-600 transition-colors">{data.freelanceStatus}</span>
              </div>
            </GlassCard>
          </div>
        </div>

        {/* 2-Column FAQs & Contact Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Frequently Asked Questions */}
          <div className="lg:col-span-6 space-y-6">
            <h3 className="font-display font-bold text-2xl sm:text-3xl text-zinc-950">
              {t.contact.faqTitle}
            </h3>

            <div className="space-y-3">
              {data.faqs.map((faq) => {
                const isOpen = openFaqId === faq.id;
                return (
                  <GlassCard 
                    key={faq.id} 
                    className="p-5 cursor-pointer"
                    tiltIntensity={4}
                    interactiveScale={1.01}
                    spotlightRadius={280}
                    onClick={() => toggleFaq(faq.id)}
                  >
                    <div className="w-full flex items-center justify-between text-left group">
                      <span className="text-sm sm:text-base font-bold text-zinc-900 group-hover:text-amber-600 transition-colors pr-4">
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-zinc-400 shrink-0 transition-transform duration-200 ${
                          isOpen ? 'rotate-180 text-amber-500' : ''
                        }`}
                      />
                    </div>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          <p className="pt-3 text-xs sm:text-sm text-zinc-600 leading-relaxed border-t border-zinc-100/90 mt-3">
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </GlassCard>
                );
              })}
            </div>
          </div>

          {/* Right Column: Contact Message Form */}
          <div className="lg:col-span-6 space-y-6">
            <h3 className="font-display font-bold text-2xl sm:text-3xl text-zinc-950 leading-snug">
              {t.contact.formTitle}
            </h3>

            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 sm:p-10 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/90 shadow-[0_12px_40px_rgb(0,0,0,0.06)] text-center space-y-4"
              >
                <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-2xl font-black text-zinc-950">
                  {t.contact.formSuccessTitle}
                </h4>
                <p className="text-sm text-zinc-600 max-w-md mx-auto leading-relaxed">
                  {t.contact.formSuccessDesc}
                </p>
                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 rounded-xl bg-zinc-950 text-white text-xs font-bold hover:bg-black transition-all cursor-pointer shadow-sm hover:scale-105"
                >
                  {t.contact.formSendAnother}
                </button>
              </motion.div>
            ) : (
              <GlassCard
                tiltIntensity={5}
                interactiveScale={1.01}
                spotlightRadius={360}
                className="p-6 sm:p-8 space-y-4"
              >
                <form onSubmit={handleSubmit} className="space-y-4">
                  {errorMsg && (
                    <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold text-zinc-700 mb-1">
                      {t.contact.formName} *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={lang === 'en' ? 'Your Name or HR / Recruiter' : '您的称谓 / 招聘负责人'}
                      className="w-full px-4 py-3 rounded-xl border border-zinc-200/90 bg-white/70 backdrop-blur-md focus:bg-white focus:outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 text-sm transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-700 mb-1">
                      {t.contact.formEmail} *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="email@company.com"
                      className="w-full px-4 py-3 rounded-xl border border-zinc-200/90 bg-white/70 backdrop-blur-md focus:bg-white focus:outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 text-sm transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-700 mb-1">
                      {t.contact.formMessage} *
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={lang === 'en' ? 'Share your opportunity, project or schedule an interview...' : '请简要说明岗位机会、业务交流或面试安排...'}
                      className="w-full px-4 py-3 rounded-xl border border-zinc-200/90 bg-white/70 backdrop-blur-md focus:bg-white focus:outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 text-sm transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 bg-zinc-950 hover:bg-black text-white text-xs font-extrabold tracking-[0.15em] uppercase rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0 flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-50 group"
                  >
                    <span>{isSubmitting ? (lang === 'en' ? 'Sending...' : '正在提交...') : t.contact.formSubmit}</span>
                    <Send className="w-3.5 h-3.5 text-amber-400 group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>
              </GlassCard>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
};
