import React from 'react';
import {
  PlusCircle,
  FolderKanban,
  Building2,
  MapPin,
  ArrowRight,
  Sparkles,
  Recycle,
  Coins,
  BrainCircuit,
  ArrowUpRight
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

  const ledger = activeProjectData?.ledger || {
    predictedNetValue: 0,
    actualNetValue: 0,
    wasteDivertedTonnes: 0
  };

  const totalProjectsCount = projects.length;
  // Count projects that have completed AI assessments
  const aiAssessmentsCount = projects.filter(
    (p) => p.status && p.status !== 'Draft'
  ).length || (totalProjectsCount > 0 ? totalProjectsCount : 0);

  return (
    <div className="space-y-10 py-4 max-w-5xl mx-auto animate-in fade-in duration-300">
      
      {/* 1. Header: RECLAIM X, One-line Explanation & Actions */}
      <div className="text-center space-y-4 pt-4 pb-2 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <Recycle className="w-3.5 h-3.5 text-emerald-400" />
          <span>{t('brand.tagline')}</span>
        </div>
        
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white tracking-tight leading-tight">
          RECLAIM <span className="text-emerald-400">X</span>
        </h1>
        
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
          {t('brand.oneLiner')}
        </p>

        {/* Primary and Secondary Actions */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
          <button
            onClick={() => setActiveTab('create')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md shadow-emerald-500/20 transition hover:scale-102"
          >
            <PlusCircle className="w-4 h-4" />
            <span>{t('dashboard.createProjectCta')}</span>
          </button>

          <button
            onClick={() => setActiveTab('projects')}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 transition"
          >
            <FolderKanban className="w-4 h-4 text-slate-400" />
            <span>{t('dashboard.viewProjectsCta')}</span>
          </button>

          <button
            onClick={loadDemoProject}
            disabled={isLoading}
            className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl text-sm font-medium text-slate-400 hover:text-emerald-300 hover:bg-slate-900 transition"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>{t('dashboard.loadDemoCta')}</span>
          </button>
        </div>
      </div>

      {/* 2. Focused 4 Summary Cards (Projects, AI Assessments, Potential Recovery, Recovery Value) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Projects */}
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 transition hover:border-slate-700">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">
              {t('dashboard.metrics.projects')}
            </span>
            <FolderKanban className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
            {totalProjectsCount}
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">
            {t('dashboard.metrics.projectsSub')}
          </span>
        </div>

        {/* Card 2: AI Assessments */}
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 transition hover:border-slate-700">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">
              {t('dashboard.metrics.aiAssessments')}
            </span>
            <BrainCircuit className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
            {aiAssessmentsCount}
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">
            {t('dashboard.metrics.aiAssessmentsSub')}
          </span>
        </div>

        {/* Card 3: Potential Recovery */}
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 transition hover:border-slate-700">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">
              {t('dashboard.metrics.potentialRecovery')}
            </span>
            <Coins className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold font-heading text-emerald-400">
            ₹{(ledger.predictedNetValue || 0).toLocaleString('en-IN')}
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">
            {t('dashboard.metrics.potentialRecoverySub')}
          </span>
        </div>

        {/* Card 4: Recovery Value */}
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 transition hover:border-slate-700">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">
              {t('dashboard.metrics.recoveryValue')}
            </span>
            <Recycle className="w-4 h-4 text-teal-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold font-heading text-teal-300">
            ₹{(ledger.actualNetValue || 0).toLocaleString('en-IN')}
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">
            {t('dashboard.metrics.recoveryValueSub')}
          </span>
        </div>

      </div>

      {/* 3. Small List of Projects */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold font-heading text-white">
            {t('dashboard.existingProjects')}
          </h2>
          {projects.length > 3 && (
            <button
              onClick={() => setActiveTab('projects')}
              className="text-xs font-medium text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
            >
              <span>{t('dashboard.viewAll')} ({projects.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {projects.length === 0 ? (
          <div className="p-8 rounded-2xl bg-slate-900/40 border border-slate-800 text-center space-y-3">
            <Building2 className="w-8 h-8 text-slate-500 mx-auto" />
            <p className="text-xs text-slate-400">{t('dashboard.noProjects')}</p>
            <button
              onClick={() => setActiveTab('create')}
              className="px-4 py-2 rounded-lg text-xs font-semibold bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition"
            >
              {t('dashboard.createFirst')}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.slice(0, 3).map((p) => {
              const isActive = p.id === activeProjectData?.project?.id;
              return (
                <div
                  key={p.id}
                  onClick={() => selectProject(p.id, true)}
                  className={`p-5 rounded-2xl border transition cursor-pointer flex flex-col justify-between space-y-4 hover:border-slate-700 ${
                    isActive
                      ? 'bg-slate-900 border-emerald-500/40'
                      : 'bg-slate-900/60 border-slate-800'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">
                        {p.status || 'Planning'}
                      </span>
                      <ArrowUpRight className="w-4 h-4 text-slate-400 hover:text-white" />
                    </div>
                    
                    <h3 className="text-sm font-bold text-white leading-snug line-clamp-1">
                      {p.name}
                    </h3>

                    <div className="space-y-1 text-xs text-slate-400 pt-1">
                      <div className="flex items-center gap-1.5 truncate">
                        <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                        <span className="truncate">{p.location}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                        <span>{p.buildingType}</span>
                        <span>•</span>
                        <span>{Number(p.areaSqft || p.area_sqft || 0).toLocaleString()} sq.ft.</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                    <span className="text-slate-400">{t('dashboard.openProject')}</span>
                    <span className="text-emerald-400 font-medium">Explore →</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 4. Four-Step Project Flow Guide */}
      <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 text-center sm:text-left">
          {t('dashboard.howItWorks')}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs text-slate-300">
          <div className="flex items-start gap-2.5">
            <span className="w-5 h-5 rounded-md bg-emerald-500/15 text-emerald-400 font-bold flex items-center justify-center shrink-0">1</span>
            <div>
              <strong className="text-white block">{t('dashboard.step1Title')}</strong>
              <span className="text-slate-400 text-[11px]">{t('dashboard.step1Desc')}</span>
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <span className="w-5 h-5 rounded-md bg-teal-500/15 text-teal-400 font-bold flex items-center justify-center shrink-0">2</span>
            <div>
              <strong className="text-white block">{t('dashboard.step2Title')}</strong>
              <span className="text-slate-400 text-[11px]">{t('dashboard.step2Desc')}</span>
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <span className="w-5 h-5 rounded-md bg-cyan-500/15 text-cyan-400 font-bold flex items-center justify-center shrink-0">3</span>
            <div>
              <strong className="text-white block">{t('dashboard.step3Title')}</strong>
              <span className="text-slate-400 text-[11px]">{t('dashboard.step3Desc')}</span>
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <span className="w-5 h-5 rounded-md bg-blue-500/15 text-blue-400 font-bold flex items-center justify-center shrink-0">4</span>
            <div>
              <strong className="text-white block">{t('dashboard.step4Title')}</strong>
              <span className="text-slate-400 text-[11px]">{t('dashboard.step4Desc')}</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
