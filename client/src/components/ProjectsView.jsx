import React, { useState } from 'react';
import {
  FolderKanban,
  Building2,
  MapPin,
  Layers,
  PlusCircle,
  Search,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { useProject } from '../context/ProjectContext';

export default function ProjectsView() {
  const {
    projects,
    activeProjectId,
    selectProject,
    setActiveTab,
    loadDemoProject,
    isLoading,
    t
  } = useProject();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');

  const filteredProjects = projects.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'All' || p.buildingType === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto py-2 animate-in fade-in duration-300">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-zinc-800/80 pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-heading text-white">
            Demolition Projects
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Active and completed demolition salvage projects undergoing circular recovery audits.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('create')}
            className="saas-btn-primary cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Create Project</span>
          </button>

          <button
            onClick={loadDemoProject}
            disabled={isLoading}
            className="saas-btn-secondary cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Load Demo</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search by project name or city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-700 transition"
          />
        </div>

        <div className="flex items-center gap-1.5 bg-zinc-900 border border-zinc-800 p-1 rounded-xl">
          {['All', 'Commercial', 'Residential', 'Industrial'].map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
                selectedType === type
                  ? 'bg-zinc-800 text-white font-semibold shadow-xs'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="saas-card p-12 text-center space-y-4">
          <FolderKanban className="w-10 h-10 text-zinc-500 mx-auto" />
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-white">No projects found</h3>
            <p className="text-xs text-zinc-400">
              {searchTerm ? 'Try adjusting your search criteria' : 'Get started by creating your first demolition project.'}
            </p>
          </div>
          <button
            onClick={() => setActiveTab('create')}
            className="saas-btn-primary"
          >
            Create New Project
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProjects.map((p) => {
            const isActive = p.id === activeProjectId;
            return (
              <div
                key={p.id}
                onClick={() => selectProject(p.id, true)}
                className={`saas-card p-6 flex flex-col justify-between space-y-4 transition-all cursor-pointer ${
                  isActive
                    ? 'border-emerald-500/50 bg-[#14181f]'
                    : 'hover:border-zinc-700'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-semibold tracking-wide bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {p.status || 'Planning'}
                    </span>
                    <span className="text-[10px] text-zinc-500">
                      {p.createdAt ? new Date(p.createdAt).toLocaleDateString() : 'Active'}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-white leading-snug line-clamp-1">
                      {p.name}
                    </h3>
                  </div>

                  <div className="space-y-1.5 text-xs text-zinc-400">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                      <span className="truncate">{p.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Building2 className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                      <span>{p.buildingType}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Layers className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                      <span>{Number(p.areaSqft || p.area_sqft || 0).toLocaleString()} sq.ft.</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs">
                  <span className="text-zinc-500 text-[11px]">Click to view details</span>
                  <span className="text-emerald-400 font-medium flex items-center gap-1">
                    Open Project
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
