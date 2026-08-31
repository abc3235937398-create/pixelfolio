import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, RotateCcw, Save, Check, Sparkles, Image, User, Briefcase, Plus, Trash2 } from 'lucide-react';
import { ProfileData } from '../types';
import { defaultProfileData } from '../data/portfolioData';

interface DataCustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: ProfileData;
  onSave: (newData: ProfileData) => void;
  lang: 'en' | 'zh';
}

export const DataCustomizerModal: React.FC<DataCustomizerModalProps> = ({
  isOpen,
  onClose,
  data,
  onSave,
  lang,
}) => {
  const [formData, setFormData] = useState<ProfileData>(data);
  const [isSaved, setIsSaved] = useState(false);
  const [activeTab, setActiveTab] = useState<'basic' | 'experience' | 'projects'>('basic');

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(formData);
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 600);
  };

  const handleResetDefaults = () => {
    if (window.confirm(lang === 'en' ? 'Reset all data back to original defaults?' : '确定恢复为初始默认数据吗？')) {
      setFormData(defaultProfileData);
      onSave(defaultProfileData);
    }
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

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-white w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden z-10 my-8 max-h-[85vh] flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100 bg-zinc-50">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <h3 className="font-bold text-zinc-950 text-base">
                {lang === 'en' ? 'Live Profile Customizer' : '实时个人资料与展示设置'}
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleResetDefaults}
                className="flex items-center gap-1 text-xs text-zinc-500 hover:text-zinc-900 px-2 py-1 rounded hover:bg-zinc-200 transition-colors cursor-pointer"
                title="Reset to default values"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{lang === 'en' ? 'Reset' : '重置'}</span>
              </button>
              <button
                onClick={onClose}
                className="p-1 rounded text-zinc-400 hover:text-zinc-900 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Tabs Navigation */}
          <div className="flex items-center gap-6 px-6 border-b border-zinc-100 bg-zinc-50/50">
            <button
              onClick={() => setActiveTab('basic')}
              className={`py-3 text-xs font-bold border-b-2 transition-colors ${activeTab === 'basic' ? 'border-amber-500 text-amber-600' : 'border-transparent text-zinc-500 hover:text-zinc-800'}`}
            >
              {lang === 'en' ? 'Basic Info' : '基础资料'}
            </button>
            <button
              onClick={() => setActiveTab('experience')}
              className={`py-3 text-xs font-bold border-b-2 transition-colors ${activeTab === 'experience' ? 'border-amber-500 text-amber-600' : 'border-transparent text-zinc-500 hover:text-zinc-800'}`}
            >
              {lang === 'en' ? 'Experiences' : '工作经历'}
            </button>
            <button
              onClick={() => setActiveTab('projects')}
              className={`py-3 text-xs font-bold border-b-2 transition-colors ${activeTab === 'projects' ? 'border-amber-500 text-amber-600' : 'border-transparent text-zinc-500 hover:text-zinc-800'}`}
            >
              {lang === 'en' ? 'Projects' : '精选项目'}
            </button>
          </div>

          {/* Form Scroll Area */}
          <div className="p-6 overflow-y-auto space-y-6 text-xs h-[500px]">
            {activeTab === 'basic' && (
              <>
                {/* Basic Info */}
                <div className="space-y-3">
              <h4 className="font-extrabold uppercase tracking-wider text-zinc-400">
                {lang === 'en' ? 'Basic Identity' : '基础身份'}
              </h4>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-700 font-semibold mb-1">{lang === 'en' ? 'Chinese Name' : '中文姓名'}</label>
                  <input
                    type="text"
                    value={formData.chineseName || ''}
                    onChange={(e) => setFormData({ ...formData, chineseName: e.target.value })}
                    className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded text-zinc-900"
                  />
                </div>
                <div>
                  <label className="block text-zinc-700 font-semibold mb-1">{lang === 'en' ? 'Experience Years' : '工作年限'}</label>
                  <input
                    type="text"
                    value={formData.experienceYears || ''}
                    onChange={(e) => setFormData({ ...formData, experienceYears: e.target.value })}
                    className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded text-zinc-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-zinc-700 font-semibold mb-1">{lang === 'en' ? 'Gender' : '性别'}</label>
                  <input
                    type="text"
                    value={formData.gender || ''}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded text-zinc-900"
                  />
                </div>
                <div>
                  <label className="block text-zinc-700 font-semibold mb-1">{lang === 'en' ? 'Age' : '年龄'}</label>
                  <input
                    type="number"
                    value={formData.age || 24}
                    onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded text-zinc-900"
                  />
                </div>
                <div>
                  <label className="block text-zinc-700 font-semibold mb-1">{lang === 'en' ? 'Birth Date' : '出生年月'}</label>
                  <input
                    type="text"
                    value={formData.birthDate || ''}
                    onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                    className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded text-zinc-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-700 font-semibold mb-1">{lang === 'en' ? 'Sidebar Logo Text' : '侧边栏 Logo 文本'}</label>
                  <input
                    type="text"
                    value={formData.logoText}
                    onChange={(e) => setFormData({ ...formData, logoText: e.target.value })}
                    className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded text-zinc-900"
                  />
                </div>
                <div>
                  <label className="block text-zinc-700 font-semibold mb-1">{lang === 'en' ? 'Job Title / Role' : '专业头衔 / 岗位'}</label>
                  <input
                    type="text"
                    value={formData.roleTitle}
                    onChange={(e) => setFormData({ ...formData, roleTitle: e.target.value })}
                    className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded text-zinc-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-zinc-700 font-semibold mb-1">{lang === 'en' ? 'Hero Tagline' : '首页一句话介绍'}</label>
                <input
                  type="text"
                  value={formData.tagline}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded text-zinc-900"
                />
              </div>

              <div>
                <label className="block text-zinc-700 font-semibold mb-1">{lang === 'en' ? 'Hero Photo URL' : '首页个人照片 URL'}</label>
                <input
                  type="text"
                  value={formData.heroImage}
                  onChange={(e) => setFormData({ ...formData, heroImage: e.target.value })}
                  className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded text-zinc-900 font-mono text-[11px]"
                />
              </div>
            </div>

            {/* Contact Details */}
            <div className="space-y-3 pt-4 border-t border-zinc-100">
              <h4 className="font-extrabold uppercase tracking-wider text-zinc-400">
                {lang === 'en' ? 'Contact & Location' : '联系方式与住址'}
              </h4>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-700 font-semibold mb-1">{lang === 'en' ? 'Email' : '邮箱'}</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded text-zinc-900"
                  />
                </div>
                <div>
                  <label className="block text-zinc-700 font-semibold mb-1">{lang === 'en' ? 'Phone' : '电话'}</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded text-zinc-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-700 font-semibold mb-1">{lang === 'en' ? 'Residence' : '常住国家/城市'}</label>
                  <input
                    type="text"
                    value={formData.residence}
                    onChange={(e) => setFormData({ ...formData, residence: e.target.value })}
                    className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded text-zinc-900"
                  />
                </div>
                <div>
                  <label className="block text-zinc-700 font-semibold mb-1">{lang === 'en' ? 'Address' : '详细地址'}</label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded text-zinc-900"
                  />
                </div>
              </div>
            </div>
            </>
            )}

            {activeTab === 'experience' && (
              <div className="space-y-6">
                {formData.experiences.map((exp, idx) => (
                  <div key={exp.id} className="p-4 border border-zinc-200 rounded-xl space-y-3 bg-zinc-50/50">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-zinc-900">{lang === 'en' ? 'Experience' : '经历'} {idx + 1}</h4>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-zinc-700 font-semibold mb-1">{lang === 'en' ? 'Company' : '公司'}</label>
                        <input
                          type="text"
                          value={exp.company}
                          onChange={(e) => {
                            const newExps = [...formData.experiences];
                            newExps[idx].company = e.target.value;
                            setFormData({ ...formData, experiences: newExps });
                          }}
                          className="w-full px-3 py-2 bg-white border border-zinc-200 rounded text-zinc-900"
                        />
                      </div>
                      <div>
                        <label className="block text-zinc-700 font-semibold mb-1">{lang === 'en' ? 'Role' : '职位'}</label>
                        <input
                          type="text"
                          value={exp.role}
                          onChange={(e) => {
                            const newExps = [...formData.experiences];
                            newExps[idx].role = e.target.value;
                            setFormData({ ...formData, experiences: newExps });
                          }}
                          className="w-full px-3 py-2 bg-white border border-zinc-200 rounded text-zinc-900"
                        />
                      </div>
                      <div>
                        <label className="block text-zinc-700 font-semibold mb-1">{lang === 'en' ? 'Period' : '时间段'}</label>
                        <input
                          type="text"
                          value={exp.period}
                          onChange={(e) => {
                            const newExps = [...formData.experiences];
                            newExps[idx].period = e.target.value;
                            setFormData({ ...formData, experiences: newExps });
                          }}
                          className="w-full px-3 py-2 bg-white border border-zinc-200 rounded text-zinc-900"
                        />
                      </div>
                      <div>
                        <label className="block text-zinc-700 font-semibold mb-1">{lang === 'en' ? 'Tag' : '标签 (如: 大客户管理)'}</label>
                        <input
                          type="text"
                          value={exp.tag || ''}
                          onChange={(e) => {
                            const newExps = [...formData.experiences];
                            newExps[idx].tag = e.target.value;
                            setFormData({ ...formData, experiences: newExps });
                          }}
                          className="w-full px-3 py-2 bg-white border border-zinc-200 rounded text-zinc-900"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-zinc-700 font-semibold mb-1">{lang === 'en' ? 'Description' : '简介'}</label>
                      <textarea
                        value={exp.description}
                        onChange={(e) => {
                          const newExps = [...formData.experiences];
                          newExps[idx].description = e.target.value;
                          setFormData({ ...formData, experiences: newExps });
                        }}
                        className="w-full px-3 py-2 bg-white border border-zinc-200 rounded text-zinc-900 resize-none h-20"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'projects' && (
              <div className="space-y-6">
                {formData.projects.map((proj, idx) => (
                  <div key={proj.id} className="p-4 border border-zinc-200 rounded-xl space-y-3 bg-zinc-50/50">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-zinc-900">{lang === 'en' ? 'Project' : '项目'} {idx + 1}</h4>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="col-span-2">
                        <label className="block text-zinc-700 font-semibold mb-1">{lang === 'en' ? 'Title' : '项目标题'}</label>
                        <input
                          type="text"
                          value={proj.title}
                          onChange={(e) => {
                            const newProjs = [...formData.projects];
                            newProjs[idx].title = e.target.value;
                            setFormData({ ...formData, projects: newProjs });
                          }}
                          className="w-full px-3 py-2 bg-white border border-zinc-200 rounded text-zinc-900"
                        />
                      </div>
                      <div>
                        <label className="block text-zinc-700 font-semibold mb-1">{lang === 'en' ? 'Category' : '分类'}</label>
                        <input
                          type="text"
                          value={proj.category}
                          onChange={(e) => {
                            const newProjs = [...formData.projects];
                            newProjs[idx].category = e.target.value as any;
                            setFormData({ ...formData, projects: newProjs });
                          }}
                          className="w-full px-3 py-2 bg-white border border-zinc-200 rounded text-zinc-900"
                        />
                      </div>
                      <div>
                        <label className="block text-zinc-700 font-semibold mb-1">{lang === 'en' ? 'Image URL' : '封面图 URL'}</label>
                        <input
                          type="text"
                          value={proj.image}
                          onChange={(e) => {
                            const newProjs = [...formData.projects];
                            newProjs[idx].image = e.target.value;
                            setFormData({ ...formData, projects: newProjs });
                          }}
                          className="w-full px-3 py-2 bg-white border border-zinc-200 rounded text-zinc-900 font-mono text-[10px]"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-zinc-700 font-semibold mb-1">{lang === 'en' ? 'Description' : '项目简介'}</label>
                      <textarea
                        value={proj.description || ''}
                        onChange={(e) => {
                          const newProjs = [...formData.projects];
                          newProjs[idx].description = e.target.value;
                          setFormData({ ...formData, projects: newProjs });
                        }}
                        className="w-full px-3 py-2 bg-white border border-zinc-200 rounded text-zinc-900 resize-none h-16"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer Save Button */}
          <div className="px-6 py-3 border-t border-zinc-100 bg-zinc-50 flex items-center justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-zinc-600 hover:text-zinc-900 cursor-pointer"
            >
              {lang === 'en' ? 'Cancel' : '取消'}
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-1.5 px-5 py-2 bg-zinc-950 hover:bg-black text-white text-xs font-bold rounded-md shadow-xs transition-colors cursor-pointer"
            >
              {isSaved ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Save className="w-3.5 h-3.5" />}
              <span>{isSaved ? (lang === 'en' ? 'Saved!' : '已保存！') : (lang === 'en' ? 'Save Changes' : '保存设置')}</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
