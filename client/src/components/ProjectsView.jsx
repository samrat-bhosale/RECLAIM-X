import React, { useState } from 'react';
import {
  FolderKanban,
  Building,
  MapPin,
  Layers,
  Plus,
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
      (p.location || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'All' || p.buildingType === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto py-2 font-sans animate-fade-in-up">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-200 pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-heading text-gray-900">
            Demolition Projects
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Active and completed demolition salvage sites undergoing AI circularity recovery audits.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('create')}
            className="btn-petrol-primary text-xs font-semibold cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Create Project</span>
          </button>

          <button
            onClick={loadDemoProject}
            disabled={isLoading}
            className="btn-outline-secondary text-xs font-medium cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#0D3B5E]" />
            <span>Load Demo</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search by project name or city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-gray-300 rounded-lg pl-10 pr-4 py-2 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#0D3B5E] focus:ring-1 focus:ring-[#0D3B5E] transition"
          />
        </div>

        <div className="flex items-center gap-1.5 bg-white border border-gray-200 p-1 rounded-lg">
          {['All', 'Commercial', 'Residential', 'Industrial'].map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition cursor-pointer ${
                selectedType === type
                  ? 'bg-[#0D3B5E] text-white font-semibold'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-xl p-12 text-center space-y-4 shadow-xs">
          <FolderKanban className="w-10 h-10 text-gray-400 mx-auto" />
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-gray-900">No projects found</h3>
            <p className="text-xs text-gray-500">
              {searchTerm ? 'Try adjusting your search criteria' : 'Get started by creating your first demolition project.'}
            </p>
          </div>
          <button
            onClick={() => setActiveTab('create')}
            className="btn-petrol-primary text-xs"
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
                className={`bg-white border rounded-xl p-5 flex flex-col justify-between space-y-4 transition-all cursor-pointer shadow-xs ${
                  isActive
                    ? 'border-[#0D3B5E] ring-1 ring-[#0D3B5E]/30 bg-slate-50/50'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50/50'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-semibold tracking-wide bg-[#0D3B5E]/10 text-[#0D3B5E] border border-[#0D3B5E]/20">
                      {p.status || 'Active'}
                    </span>
                    <span className="text-[10px] text-gray-400">
                      {p.createdAt || p.created_at ? new Date(p.createdAt || p.created_at).toLocaleDateString() : 'Active'}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-gray-900 leading-snug line-clamp-1">
                      {p.name}
                    </h3>
                  </div>

                  <div className="space-y-1.5 text-xs text-gray-600">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                      <span className="truncate">{p.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Building className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                      <span>{p.buildingType}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Layers className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                      <span>{Number(p.areaSqft || p.area_sqft || 0).toLocaleString()} sq.ft.</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                  <span className="text-gray-400 text-[11px]">Click to view details</span>
                  <span className="text-[#0D3B5E] font-medium flex items-center gap-1">
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
