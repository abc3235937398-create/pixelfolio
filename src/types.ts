export interface EducationItem {
  id: string;
  period: string;
  degree: string;
  institution: string;
  major?: string;
  description?: string;
  accentColor?: string;
}

export interface ExperienceItem {
  id: string;
  period: string;
  company: string;
  role: string;
  tag?: string;
  accentColor?: string;
  description: string;
  highlights?: string[];
  subProjects?: {
    name: string;
    detail: string;
  }[];
}

export interface ReferenceItem {
  id: string;
  period: string;
  name: string;
  title?: string;
  quote: string;
}

export interface InterestItem {
  id: string;
  period: string;
  title: string;
  institution: string;
  accentColor?: string;
}

export interface ServiceItem {
  id: string;
  num: string;
  title: string;
  description: string;
  iconName?: string;
  accentColor?: string;
}

export interface SkillItem {
  id: string;
  name: string;
  percentage: number;
  color?: string;
  category?: string;
  description?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  tag: string;
  category: 'all' | 'product' | 'project' | 'operation' | 'business';
  image: string;
  accentColor?: string;
  badgeColor?: string;
  client?: string;
  year?: string;
  metrics?: { label: string; value: string }[];
  description?: string;
  background?: string;
  responsibilities?: string[];
  results?: string[];
  tools?: string[];
  link?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface ProfileData {
  name: string;
  surname: string;
  chineseName: string;
  logoText: string;
  roleTitle: string;
  tagline: string;
  introHeading: string;
  introDescription: string;
  email: string;
  phone: string;
  gender: string;
  age: string;
  birthDate: string;
  experienceYears: string;
  residence: string;
  address: string;
  freelanceStatus: string;
  heroImage: string;
  heroBadgeColor: string;
  selfEvaluations: string[];
  socials: {
    wechat?: string;
    github?: string;
    linkedin?: string;
    email?: string;
    phone?: string;
  };
  services: ServiceItem[];
  education: EducationItem[];
  experiences: ExperienceItem[];
  interests: InterestItem[];
  references: ReferenceItem[];
  skills: SkillItem[];
  projects: ProjectItem[];
  faqs: FAQItem[];
}
