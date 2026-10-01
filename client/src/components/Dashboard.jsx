import React, { useState } from 'react';
import {
  ArrowRight,
  Play,
  ArrowUpRight,
  ShieldCheck,
  Lightbulb,
  Award,
  Users,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Building2,
  MapPin,
  Layers,
  ArrowDown
} from 'lucide-react';
import { useProject } from '../context/ProjectContext';

export default function Dashboard() {
  const {
    projects,
    activeProjectData,
    selectProject,
    setActiveTab,
    loadDemoProject,
    isLoading,
    t
  } = useProject();

  const [activeTestimonialIdx, setActiveTestimonialIdx] = useState(0);

  // Dynamic values or fallback
  const totalProjectsCount = projects.length || 250;
  const ledger = activeProjectData?.ledger || {
    predictedNetValue: 4200000,
    actualNetValue: 3850000,
    wasteDivertedTonnes: 1840
  };

  const serviceImages = [
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&auto=format&fit=crop&q=80'
  ];

  const projectImages = [
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1577495508048-b635879837f1?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=800&auto=format&fit=crop&q=80'
  ];

  // Default featured projects if none exist in database yet
  const displayProjects = projects.length > 0 ? projects.slice(0, 3) : [
    {
      id: 'demo-1',
      name: t('featuredProjects.theRidge'),
      location: 'Pune, Maharashtra',
      buildingType: t('featuredProjects.theRidgeCat'),
      areaSqft: 18500,
      image: projectImages[0]
    },
    {
      id: 'demo-2',
      name: t('featuredProjects.skyline'),
      location: 'BKC, Mumbai',
      buildingType: t('featuredProjects.skylineCat'),
      areaSqft: 64000,
      image: projectImages[1]
    },
    {
      id: 'demo-3',
      name: t('featuredProjects.riverside'),
      location: 'Thane Creek',
      buildingType: t('featuredProjects.riversideCat'),
      areaSqft: 32000,
      image: projectImages[2]
    }
  ];

  const valueIcons = [ShieldCheck, Lightbulb, Award, Users];

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full flex flex-col -mt-8 font-sans selection:bg-emerald-500 selection:text-black">
      
      {/* ========================================================
          1. HERO SECTION (Dark Architectural Background + Left Typography)
          ======================================================== */}
      <section className="relative min-h-[92vh] flex flex-col justify-between nexora-hero-bg px-6 sm:px-12 lg:px-24 py-16 text-white overflow-hidden">
        {/* Subtle Ambient Vignette */}
        <div className="absolute inset-0 bg-radial-at-c from-transparent via-black/40 to-black/80 pointer-events-none" />

        <div className="relative z-10 max-w-4xl pt-16 sm:pt-24 space-y-8 animate-fade-in-up">
          {/* Uppercase Kicker */}
          <div className="inline-flex items-center gap-2">
            <span className="text-xs sm:text-sm font-semibold tracking-[0.25em] text-zinc-300 uppercase">
              {t('hero.kicker')}
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold font-heading text-white tracking-tight leading-[1.08]">
            {t('hero.titleLine1')} <br className="hidden sm:inline" />
            <span className="text-white">{t('hero.titleLine2')}</span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base lg:text-lg text-zinc-300 font-normal max-w-2xl leading-relaxed">
            {t('hero.subtitle')}
          </p>

          {/* Dual CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <button
              onClick={() => setActiveTab('projects')}
              className="nexora-btn-solid group cursor-pointer"
            >
              <span>{t('hero.exploreCta')}</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>

            <button
              onClick={loadDemoProject}
              disabled={isLoading}
              className="nexora-btn-outline group cursor-pointer"
            >
              <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-white group-hover:bg-black group-hover:text-white transition-colors">
                <Play className="w-3 h-3 fill-current ml-0.5" />
              </div>
              <span>{t('hero.watchVideoCta')}</span>
            </button>
          </div>
        </div>

        {/* Bottom Hero Indicators: Scroll & Slide count */}
        <div className="relative z-10 flex items-center justify-between pt-12 border-t border-white/10 text-xs text-zinc-400">
          <button
            onClick={() => scrollToSection('services')}
            className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer group"
          >
            <div className="w-6 h-9 rounded-full border border-white/40 flex items-start justify-center p-1.5 group-hover:border-white transition-colors">
              <div className="w-1 h-2 bg-white rounded-full animate-bounce" />
            </div>
            <span className="tracking-widest uppercase text-[11px] font-medium">{t('hero.scroll')}</span>
          </button>

          <div className="font-mono text-zinc-400 tracking-wider">
            {t('hero.slideCount')}
          </div>
        </div>
      </section>

      {/* ========================================================
          2. SERVICES SECTION (Crisp White Background, 4-Card CSS Grid)
          ======================================================== */}
      <section id="services" className="bg-white text-zinc-900 py-20 lg:py-28 px-6 sm:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto space-y-16">
          
          {/* Section Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-4">
            <div className="space-y-3 max-w-2xl">
              <span className="text-xs font-bold tracking-[0.2em] text-zinc-400 uppercase">
                {t('services.kicker')}
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-zinc-900 tracking-tight leading-tight">
                {t('services.heading')}
              </h2>
            </div>

            <div className="space-y-4 max-w-md">
              <p className="text-sm text-zinc-600 leading-relaxed">
                {t('services.description')}
              </p>
              <button
                onClick={() => setActiveTab('create')}
                className="inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-zinc-900 hover:text-emerald-600 transition-colors group cursor-pointer"
              >
                <span>{t('services.viewAll')}</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* 4-Card Structured Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {(t('services.items') || []).map((item, idx) => (
              <div
                key={idx}
                onClick={() => {
                  if (idx === 0) setActiveTab('create');
                  else if (idx === 1) setActiveTab('intelligence');
                  else if (idx === 2) setActiveTab('plan');
                  else setActiveTab('actuals');
                }}
                className="nexora-service-card group"
              >
                {/* Photo */}
                <div className="relative h-48 w-full overflow-hidden bg-zinc-100">
                  <img
                    src={serviceImages[idx]}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                  <div className="space-y-3">
                    <span className="text-xs font-mono text-zinc-400 block">
                      {item.num}
                    </span>
                    <h3 className="text-lg font-bold text-zinc-900 font-heading leading-snug group-hover:text-emerald-700 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-zinc-500 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  {/* Circular Arrow Button */}
                  <div className="pt-2">
                    <div className="w-9 h-9 rounded-full bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-700 group-hover:bg-zinc-900 group-hover:text-white transition-all duration-300">
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================
          3. FEATURED PROJECTS SECTION (Deep Charcoal #111111 Background)
          ======================================================== */}
      <section className="bg-[#111111] text-white py-20 lg:py-28 px-6 sm:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto space-y-16">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div className="space-y-3 max-w-xl">
              <span className="text-xs font-bold tracking-[0.2em] text-emerald-400 uppercase">
                {t('featuredProjects.kicker')}
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white tracking-tight">
                {t('featuredProjects.heading')}
              </h2>
              <p className="text-sm text-zinc-400 leading-relaxed">
                {t('featuredProjects.subtitle')}
              </p>
            </div>

            <button
              onClick={() => setActiveTab('projects')}
              className="inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-zinc-300 hover:text-white transition-colors group cursor-pointer shrink-0"
            >
              <span>{t('featuredProjects.viewAll')}</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>

          {/* 3-Card Interactive Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {displayProjects.map((p, idx) => (
              <div
                key={p.id}
                onClick={() => {
                  if (p.id && !p.id.startsWith('demo-')) {
                    selectProject(p.id, true);
                  } else {
                    loadDemoProject();
                  }
                }}
                className="nexora-project-card group h-[420px] flex flex-col justify-end p-6 border border-zinc-800"
              >
                {/* Background Image with Dark Gradient */}
                <img
                  src={p.image || projectImages[idx % projectImages.length]}
                  alt={p.name}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90 group-hover:opacity-80 transition-opacity" />

                {/* Bottom Overlay Content */}
                <div className="relative z-10 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-white/20 backdrop-blur-md text-white border border-white/20">
                      {p.buildingType || 'Demolition Site'}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all duration-300">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold font-heading text-white group-hover:text-emerald-300 transition-colors">
                      {p.name}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-zinc-400 pt-1">
                      <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                      <span>{p.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================
          4. STATS COUNTER BAR (Crisp White Background)
          ======================================================== */}
      <section className="bg-white text-zinc-900 py-16 border-b border-zinc-200 px-6 sm:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-y lg:divide-y-0 lg:divide-x divide-zinc-200">
            
            {/* Stat 1 */}
            <div className="space-y-2 pt-4 lg:pt-0 lg:px-6">
              <div className="text-4xl sm:text-5xl font-black font-heading text-zinc-900 tracking-tight">
                {t('stats.completed')}
              </div>
              <p className="text-xs sm:text-sm text-zinc-500 font-medium">
                {t('stats.completedLabel')}
              </p>
            </div>

            {/* Stat 2 */}
            <div className="space-y-2 pt-4 lg:pt-0 lg:px-6">
              <div className="text-4xl sm:text-5xl font-black font-heading text-zinc-900 tracking-tight">
                {t('stats.experience')}
              </div>
              <p className="text-xs sm:text-sm text-zinc-500 font-medium">
                {t('stats.experienceLabel')}
              </p>
            </div>

            {/* Stat 3 */}
            <div className="space-y-2 pt-4 lg:pt-0 lg:px-6">
              <div className="text-4xl sm:text-5xl font-black font-heading text-zinc-900 tracking-tight">
                {t('stats.satisfaction')}
              </div>
              <p className="text-xs sm:text-sm text-zinc-500 font-medium">
                {t('stats.satisfactionLabel')}
              </p>
            </div>

            {/* Stat 4 */}
            <div className="space-y-2 pt-4 lg:pt-0 lg:px-6">
              <div className="text-4xl sm:text-5xl font-black font-heading text-zinc-900 tracking-tight">
                {t('stats.team')}
              </div>
              <p className="text-xs sm:text-sm text-zinc-500 font-medium">
                {t('stats.teamLabel')}
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================
          5. OUR PROCESS SECTION (Crisp White Background, 4-Step Timeline)
          ======================================================== */}
      <section id="process" className="bg-white text-zinc-900 py-20 lg:py-28 px-6 sm:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto space-y-16">
          
          <div className="space-y-3">
            <span className="text-xs font-bold tracking-[0.2em] text-zinc-400 uppercase">
              {t('process.kicker')}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-zinc-900 tracking-tight">
              {t('process.heading')}
            </h2>
          </div>

          {/* 4 Horizontal Steps */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {(t('process.steps') || []).map((step, idx) => (
              <div key={idx} className="space-y-4 pt-6 border-t-2 border-zinc-200 hover:border-zinc-900 transition-colors">
                <span className="text-xs font-mono font-bold text-zinc-400 block">
                  {step.num}
                </span>
                <h3 className="text-xl font-bold font-heading text-zinc-900">
                  {step.title}
                </h3>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================
          6. ABOUT US SECTION (Deep Charcoal #111111 Background + Split Photo)
          ======================================================== */}
      <section id="about" className="bg-[#111111] text-white py-20 lg:py-28 px-6 sm:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Engineer Photo */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl h-[480px]">
            <img
              src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&auto=format&fit=crop&q=80"
              alt="Construction Engineer"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>

          {/* Right Column: Values & Story */}
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="text-xs font-bold tracking-[0.2em] text-emerald-400 uppercase">
                {t('aboutUs.kicker')}
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white tracking-tight leading-tight">
                {t('aboutUs.heading')}
              </h2>
              <p className="text-sm text-zinc-400 leading-relaxed">
                {t('aboutUs.body')}
              </p>
              <div>
                <button
                  onClick={() => setActiveTab('intelligence')}
                  className="inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-zinc-300 hover:text-white transition-colors group cursor-pointer"
                >
                  <span>{t('aboutUs.learnMore')}</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </div>

            {/* 4 Values List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-zinc-800">
              {(t('aboutUs.values') || []).map((val, idx) => {
                const IconComponent = valueIcons[idx % valueIcons.length];
                return (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white shrink-0">
                      <IconComponent className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">{val.title}</h4>
                      <p className="text-xs text-zinc-400 mt-0.5">{val.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================
          7. CLIENT TESTIMONIALS SECTION (Crisp White Background)
          ======================================================== */}
      <section className="bg-white text-zinc-900 py-20 lg:py-24 px-6 sm:px-12 lg:px-24 border-b border-zinc-200">
        <div className="max-w-5xl mx-auto space-y-8">
          
          <div className="text-6xl font-serif text-zinc-300 leading-none select-none">
            “
          </div>

          <blockquote className="text-2xl sm:text-3xl lg:text-4xl font-bold font-heading text-zinc-900 tracking-tight leading-snug">
            {t('testimonial.quote')}
          </blockquote>

          {/* Author Block */}
          <div className="flex items-center justify-between pt-6 border-t border-zinc-100">
            <div className="flex items-center gap-4">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80"
                alt={t('testimonial.author')}
                className="w-12 h-12 rounded-full object-cover border-2 border-zinc-200"
              />
              <div>
                <h4 className="text-sm font-bold text-zinc-900">
                  {t('testimonial.author')}
                </h4>
                <p className="text-xs text-zinc-500">
                  {t('testimonial.role')}
                </p>
              </div>
            </div>

            {/* Prev/Next Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTestimonialIdx((prev) => (prev > 0 ? prev - 1 : 0))}
                className="w-9 h-9 rounded-full border border-zinc-200 flex items-center justify-center text-zinc-600 hover:bg-zinc-900 hover:text-white transition-colors cursor-pointer"
                title="Previous"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setActiveTestimonialIdx((prev) => prev + 1)}
                className="w-9 h-9 rounded-full border border-zinc-200 flex items-center justify-center text-zinc-600 hover:bg-zinc-900 hover:text-white transition-colors cursor-pointer"
                title="Next"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================
          8. BOTTOM CTA BANNER (Dark Architectural Overlay)
          ======================================================== */}
      <section className="relative nexora-banner-bg text-white py-20 lg:py-24 px-6 sm:px-12 lg:px-24 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-10">
          <div className="space-y-3 max-w-xl">
            <span className="text-xs font-bold tracking-[0.2em] text-zinc-400 uppercase">
              {t('ctaBanner.kicker')}
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-white tracking-tight">
              {t('ctaBanner.heading')}
            </h2>
            <p className="text-sm text-zinc-400">
              {t('ctaBanner.subtitle')}
            </p>
          </div>

          <div className="shrink-0">
            <button
              onClick={() => setActiveTab('create')}
              className="nexora-btn-solid text-sm font-bold tracking-wide group cursor-pointer"
            >
              <span>{t('ctaBanner.cta')}</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
