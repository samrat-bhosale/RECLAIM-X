import React from 'react';
import {
  PlusCircle,
  FolderKanban,
  Building2,
  MapPin,
  ArrowRight,
  Sparkles,
  Layers,
  Coins,
  BrainCircuit,
  ArrowUpRight,
  TrendingUp,
  Recycle
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
  const aiAssessmentsCount = projects.filter(
    (p) => p.status && p.status !== 'Draft'
  ).length || (totalProjectsCount > 0 ? totalProjectsCount : 0);

  return (
    <div className="space-y-8 py-2 max-w-6xl mx-auto animate-in fade-in duration-300">
      
      {/* 1. SaaS Dashboard Header: Brand + Primary & Secondary Actions */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-2 border-b border-zinc-800/60">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-md text-[11px] font-semibold tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 uppercase">
            <Recycle className="w-3 h-3 text-emerald-400" />
            <span>Circularity Platform</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-white tracking-tight">
            RECLAIM <span className="text-emerald-400">X</span>
          </h1>

          <p className="text-sm text-zinc-400 font-normal max-w-xl">
            {t('brand.oneLiner')}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setActiveTab('create')}
            className="saas-btn-primary cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>{t('dashboard.createProjectCta')}</span>
          </button>

          <button
            onClick={() => setActiveTab('projects')}
            className="saas-btn-secondary cursor-pointer"
          >
            <FolderKanban className="w-4 h-4 text-zinc-400" />
            <span>{t('dashboard.viewProjectsCta')}</span>
          </button>
        </div>
      </div>

      {/* 2. Real Database-Driven Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Projects */}
        <div className="saas-stat-card space-y-3">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-semibold uppercase tracking-wider">
              {t('dashboard.metrics.projects')}
            </span>
            <FolderKanban className="w-4 h-4 text-zinc-500" />
          </div>
          <div className="text-3xl sm:text-4xl font-black font-heading text-white tracking-tight">
            {totalProjectsCount}
          </div>
          <span className="text-xs text-zinc-400 block">
            {t('dashboard.metrics.projectsSub')}
          </span>
        </div>

        {/* Card 2: AI Assessments */}
        <div className="saas-stat-card space-y-3">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-semibold uppercase tracking-wider">
              {t('dashboard.metrics.aiAssessments')}
            </span>
            <BrainCircuit className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl sm:text-4xl font-black font-heading text-white tracking-tight">
            {aiAssessmentsCount}
          </div>
          <span className="text-xs text-zinc-400 block">
            {t('dashboard.metrics.aiAssessmentsSub')}
          </span>
        </div>

        {/* Card 3: Potential Recovery */}
        <div className="saas-stat-card space-y-3">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-semibold uppercase tracking-wider">
              {t('dashboard.metrics.potentialRecovery')}
            </span>
            <Coins className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black font-heading text-emerald-400 tracking-tight">
            ₹{(ledger.predictedNetValue || 0).toLocaleString('en-IN')}
          </div>
          <span className="text-xs text-zinc-400 block">
            {t('dashboard.metrics.potentialRecoverySub')}
          </span>
        </div>

        {/* Card 4: Recovery Value */}
        <div className="saas-stat-card space-y-3">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-semibold uppercase tracking-wider">
              {t('dashboard.metrics.recoveryValue')}
            </span>
            <TrendingUp className="w-4 h-4 text-teal-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black font-heading text-teal-300 tracking-tight">
            ₹{(ledger.actualNetValue || 0).toLocaleString('en-IN')}
          </div>
          <span className="text-xs text-zinc-400 block">
            {t('dashboard.metrics.recoveryValueSub')}
          </span>
        </div>

      </div>

      {/* 3. Recent Projects Section */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold font-heading text-white">
              {t('dashboard.existingProjects')}
            </h2>
            <p className="text-xs text-zinc-400">Sites currently undergoing circular recovery and salvage auditing</p>
          </div>

          {projects.length > 3 && (
            <button
              onClick={() => setActiveTab('projects')}
              className="text-xs font-medium text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5 transition"
            >
              <span>{t('dashboard.viewAll')} ({projects.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {projects.length === 0 ? (
          <div className="saas-card p-12 text-center space-y-4">
            <div className="w-12 h-12 rounded-xl bg-zinc-800/80 flex items-center justify-center text-zinc-500 mx-auto">
              <Building2 className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-semibold text-white">{t('dashboard.noProjects')}</h3>
              <p className="text-xs text-zinc-400">Start by creating your first demolition site audit or load the demo dataset.</p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setActiveTab('create')}
                className="saas-btn-primary"
              >
                <PlusCircle className="w-4 h-4" />
                <span>{t('dashboard.createFirst')}</span>
              </button>
              <button
                onClick={loadDemoProject}
                disabled={isLoading}
                className="saas-btn-secondary"
              >
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>{t('dashboard.loadDemoCta')}</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.slice(0, 3).map((p) => {
              const isActive = p.id === activeProjectData?.project?.id;
              return (
                <div
                  key={p.id}
                  onClick={() => selectProject(p.id, true)}
                  className={`saas-card p-6 flex flex-col justify-between space-y-5 transition-all cursor-pointer ${
                    isActive ? 'border-emerald-500/50 bg-[#14181f]' : 'hover:border-zinc-700'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-semibold tracking-wide bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {p.status || 'Planning'}
                      </span>
                      <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-zinc-300 transition" />
                    </div>

                    <div>
                      <h3 className="text-base font-bold text-white leading-snug line-clamp-1">
                        {p.name}
                      </h3>
                      <div className="flex items-center gap-1.5 text-xs text-zinc-400 pt-1">
                        <MapPin className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                        <span className="truncate">{p.location}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-zinc-400 pt-1 border-t border-zinc-800/80">
                      <div className="flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                        <span>{p.buildingType}</span>
                      </div>
                      <span>•</span>
                      <div className="flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                        <span>{Number(p.areaSqft || p.area_sqft || 0).toLocaleString()} sq.ft.</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs">
                    <span className="text-zinc-400">{t('dashboard.openProject')}</span>
                    <span className="text-emerald-400 font-medium flex items-center gap-1">
                      Explore <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
}
