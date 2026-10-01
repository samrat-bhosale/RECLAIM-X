import React, { useState } from 'react';
import {
  FolderKanban,
  Building2,
  MapPin,
  Layers,
  PlusCircle,
  Search,
  ArrowRight,
  Trash2,
  Sparkles,
  Calendar
} from 'lucide-react';
import { useProject } from '../context/ProjectContext';

export default function ProjectsView() {
  const {
    projects,
    activeProjectId,
    selectProject,
    setActiveTab,
    loadDemoProject,
    isLoading
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
    <div className="space-y-6 max-w-6xl mx-auto py-2">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl font-bold font-heading text-white">
            Demolition Projects
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Active and completed demolition salvage projects undergoing circular recovery audits.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setActiveTab('create')}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition shadow-sm"
          >
            <PlusCircle className="w-4 h-4" />
            Create Project
          </button>

          <button
            onClick={loadDemoProject}
            disabled={isLoading}
            className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-medium bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            Load Demo
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search by project name or city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-900/80 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 focus:outline-none focus:border-slate-700 transition"
          />
        </div>

        <div className="flex items-center gap-2">
          {['All', 'Commercial', 'Residential', 'Industrial'].map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                selectedType === type
                  ? 'bg-slate-800 text-emerald-400 border border-slate-700 font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="p-12 rounded-2xl bg-slate-900/40 border border-slate-800 text-center space-y-3">
          <FolderKanban className="w-10 h-10 text-slate-500 mx-auto" />
          <h3 className="text-sm font-bold text-white">No projects found</h3>
          <p className="text-xs text-slate-400">
            {searchTerm ? 'Try adjusting your search criteria' : 'Get started by creating your first demolition project.'}
          </p>
          <button
            onClick={() => setActiveTab('create')}
            className="px-4 py-2 rounded-lg text-xs font-semibold bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition"
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
                className={`p-5 rounded-2xl border transition cursor-pointer flex flex-col justify-between space-y-4 hover:border-slate-700 ${
                  isActive
                    ? 'bg-slate-900 border-emerald-500/40 shadow-sm'
                    : 'bg-slate-900/60 border-slate-800'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">
                      {p.status || 'Planning'}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {p.createdAt ? new Date(p.createdAt).toLocaleDateString() : 'Active'}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-white leading-snug line-clamp-1">
                      {p.name}
                    </h3>
                  </div>

                  <div className="space-y-1.5 text-xs text-slate-400">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      <span className="truncate">{p.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Building2 className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      <span>{p.buildingType}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Layers className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      <span>{Number(p.areaSqft || p.area_sqft || 0).toLocaleString()} sq.ft.</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="text-slate-400 text-[11px]">Click to view details</span>
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
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
