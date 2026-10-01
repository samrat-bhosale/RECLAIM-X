import React, { useState } from 'react';
import {
  Plus,
  ArrowUpRight,
  Building,
  Cpu,
  Coins,
  TrendingUp,
  Pencil,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ArrowRight
} from 'lucide-react';
import { useProject } from '../context/ProjectContext';

export default function Dashboard() {
  const {
    projects,
    activeProjectData,
    selectProject,
    setActiveTab,
    loadDemoProject,
    t
  } = useProject();

  const [selectedRows, setSelectedRows] = useState([]);

  const ledger = activeProjectData?.ledger || {
    predictedNetValue: 28500,
    actualNetValue: 24200,
    wasteDivertedTonnes: 1840
  };

  const defaultSampleRows = [
    {
      id: 'p-1',
      name: 'Site Alpha Salvage',
      location: 'NY site',
      status: 'Pending',
      statusType: 'pending',
      materialsCount: 18,
      materialsLabel: '18 Detected Materials',
      lastUpdated: 'Sep 6, 2026',
      thumbnail: 'https://images.unsplash.com/photo-1541888946425-d0fbb18615f3?w=120&auto=format&fit=crop&q=80'
    },
    {
      id: 'p-2',
      name: 'AI Salvage Scan',
      location: 'material',
      status: 'Active',
      statusType: 'active',
      materialsCount: 12,
      materialsLabel: '12 New Insights Materials Progress',
      lastUpdated: 'Sep 6, 2026',
      thumbnail: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=120&auto=format&fit=crop&q=80'
    },
    {
      id: 'p-3',
      name: 'Reclaimed Material Showcase',
      location: 'Architectura',
      status: 'Active',
      statusType: 'active',
      materialsCount: 45,
      materialsLabel: '45 Detected Materials',
      lastUpdated: 'Sep 6, 2026',
      thumbnail: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=120&auto=format&fit=crop&q=80'
    },
    {
      id: 'p-4',
      name: 'Warehouse Decon',
      location: 'chicago',
      status: 'Archived',
      statusType: 'archived',
      materialsCount: 12,
      materialsLabel: '12 Detected Materials',
      lastUpdated: 'Sep 6, 2026',
      thumbnail: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=120&auto=format&fit=crop&q=80'
    },
    {
      id: 'p-5',
      name: 'Bridge Demo',
      location: 'Demolition',
      status: 'Draft',
      statusType: 'draft',
      materialsCount: 45,
      materialsLabel: '45 Detected Materials',
      lastUpdated: 'Sep 6, 2026',
      thumbnail: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=120&auto=format&fit=crop&q=80'
    }
  ];

  // Map real database projects or combine with default rows
  const tableData = projects.length > 0 ? projects.map((p, idx) => ({
    id: p.id,
    name: p.name,
    location: p.location || 'Site Location',
    status: p.status || (idx % 2 === 0 ? 'Active' : 'Pending'),
    statusType: (p.status || '').toLowerCase() === 'draft' ? 'draft' : (p.status || '').toLowerCase() === 'completed' ? 'archived' : idx % 2 === 0 ? 'active' : 'pending',
    materialsCount: p.materials_detected_count || p.materials?.length || (idx === 0 ? 18 : idx === 1 ? 12 : 45),
    materialsLabel: `${p.materials_detected_count || p.materials?.length || (idx === 0 ? 18 : idx === 1 ? 12 : 45)} Detected Materials`,
    lastUpdated: p.created_at ? new Date(p.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Sep 6, 2026',
    thumbnail: defaultSampleRows[idx % defaultSampleRows.length].thumbnail,
    isReal: true
  })) : defaultSampleRows;

  const toggleSelectAll = () => {
    if (selectedRows.length === tableData.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(tableData.map((r) => r.id));
    }
  };

  const toggleRow = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  };

  const getStatusBadge = (status, type) => {
    switch (type) {
      case 'active':
        return (
          <span className="px-2.5 py-0.5 rounded-md text-xs font-medium bg-[#0D3B5E]/10 text-[#0D3B5E] border border-[#0D3B5E]/20">
            {status}
          </span>
        );
      case 'pending':
        return (
          <span className="px-2.5 py-0.5 rounded-md text-xs font-medium bg-amber-50 text-amber-800 border border-amber-200">
            {status}
          </span>
        );
      case 'archived':
        return (
          <span className="px-2.5 py-0.5 rounded-md text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
            {status}
          </span>
        );
      case 'draft':
      default:
        return (
          <span className="px-2.5 py-0.5 rounded-md text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="w-full space-y-10 py-6 max-w-7xl mx-auto font-sans animate-fade-in-up">
      
      {/* ========================================================
          1. HEADER / HERO SECTION (Matching Reference Image)
          ======================================================== */}
      <div className="space-y-4 pt-2">
        <h1 className="text-5xl sm:text-6xl font-black font-heading text-gray-900 tracking-tight">
          RECLAIM X
        </h1>
        
        <p className="text-base text-gray-600 max-w-2xl leading-relaxed">
          The intelligent solution for sustainable project asset recovery.
        </p>

        {/* Dual Action Buttons */}
        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={() => setActiveTab('create')}
            className="btn-petrol-primary text-sm font-semibold cursor-pointer"
          >
            <span>[ Create Project ]</span>
          </button>

          <button
            onClick={() => setActiveTab('projects')}
            className="btn-outline-secondary text-sm font-medium cursor-pointer"
          >
            <span>[ View Projects ↗ ]</span>
          </button>
        </div>
      </div>

      {/* ========================================================
          2. 4 RECTANGULAR KPI CARDS (Matching Reference Image)
          ======================================================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Active Projects */}
        <div className="saas-kpi-card flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between text-gray-500">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-600">
              Active Projects
            </span>
            <Building className="w-4 h-4 text-gray-600" />
          </div>
          <div className="text-4xl font-extrabold text-gray-900 tracking-tight">
            {projects.length || 4}
          </div>
          <div>
            <span className="inline-block px-2 py-0.5 rounded text-[11px] font-medium bg-gray-100 text-gray-700">
              Active
            </span>
          </div>
        </div>

        {/* Card 2: Pending AI Assessments */}
        <div className="saas-kpi-card flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between text-gray-500">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-600">
              Pending AI Assessments
            </span>
            <Cpu className="w-4 h-4 text-gray-600" />
          </div>
          <div className="text-4xl font-extrabold text-gray-900 tracking-tight">
            12
          </div>
          <div>
            <span className="inline-block px-2 py-0.5 rounded text-[11px] font-medium bg-amber-50 text-amber-800 border border-amber-200">
              Pending
            </span>
          </div>
        </div>

        {/* Card 3: Potential Recovery */}
        <div className="saas-kpi-card flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between text-gray-500">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-600">
              Potential Recovery
            </span>
            <Coins className="w-4 h-4 text-gray-600" />
          </div>
          <div className="text-4xl font-extrabold text-gray-900 tracking-tight">
            $28.5k
          </div>
          <div>
            <span className="inline-block px-2 py-0.5 rounded text-[11px] font-medium bg-gray-100 text-gray-700">
              Est.
            </span>
          </div>
        </div>

        {/* Card 4: Recovery Value */}
        <div className="saas-kpi-card flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between text-gray-500">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-600">
              Recovery Value
            </span>
            <TrendingUp className="w-4 h-4 text-gray-600" />
          </div>
          <div className="text-4xl font-extrabold text-gray-900 tracking-tight">
            High
          </div>
          <div>
            <span className="inline-block px-2 py-0.5 rounded text-[11px] font-medium bg-[#0D3B5E]/10 text-[#0D3B5E] border border-[#0D3B5E]/20">
              Predicted
            </span>
          </div>
        </div>

      </div>

      {/* ========================================================
          3. PROJECT LIST / DATA-DENSE TABLE (Matching Reference Image)
          ======================================================== */}
      <div className="space-y-4 pt-4">
        
        {/* Section Header with Banner & Primary CTA */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-2xl font-bold font-heading text-gray-900 tracking-tight">
            Project List
          </h2>

          {/* Right Banner Button */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-1.5 h-9 rounded-lg overflow-hidden border border-gray-200 bg-white p-0.5">
              <img
                src="https://images.unsplash.com/photo-1541888946425-d0fbb18615f3?w=80&auto=format&fit=crop&q=80"
                alt="Banner thumb"
                className="w-8 h-8 rounded object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1513694203232-719a280e022f?w=80&auto=format&fit=crop&q=80"
                alt="Banner thumb"
                className="w-8 h-8 rounded object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=80&auto=format&fit=crop&q=80"
                alt="Banner thumb"
                className="w-8 h-8 rounded object-cover"
              />
            </div>

            <button
              onClick={() => setActiveTab('create')}
              className="btn-petrol-primary text-xs font-semibold cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>[ + Create Project ]</span>
            </button>
          </div>
        </div>

        {/* Hyper-Clean Structured Data Table */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="saas-data-table">
              <thead>
                <tr>
                  <th className="w-12 text-center">
                    <input
                      type="checkbox"
                      checked={selectedRows.length === tableData.length && tableData.length > 0}
                      onChange={toggleSelectAll}
                      className="rounded border-gray-300 text-[#0D3B5E] focus:ring-[#0D3B5E] cursor-pointer"
                    />
                  </th>
                  <th className="w-24">Thumbnail</th>
                  <th>Project Name</th>
                  <th>Location</th>
                  <th>Status</th>
                  <th>Detected Materials</th>
                  <th>Last Updated</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row) => {
                  const isSelected = selectedRows.includes(row.id);
                  return (
                    <tr
                      key={row.id}
                      className={isSelected ? 'bg-gray-50/80' : ''}
                    >
                      {/* Checkbox */}
                      <td className="text-center">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleRow(row.id)}
                          className="rounded border-gray-300 text-[#0D3B5E] focus:ring-[#0D3B5E] cursor-pointer"
                        />
                      </td>

                      {/* Thumbnail */}
                      <td>
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 border border-gray-200 shrink-0">
                          <img
                            src={row.thumbnail}
                            alt={row.name}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                      </td>

                      {/* Project Name */}
                      <td>
                        <button
                          onClick={() => {
                            if (row.isReal) {
                              selectProject(row.id, true);
                            } else {
                              loadDemoProject();
                            }
                          }}
                          className="font-bold text-gray-900 hover:text-[#0D3B5E] transition-colors text-left cursor-pointer"
                        >
                          {row.name}
                        </button>
                      </td>

                      {/* Location */}
                      <td className="text-gray-600">
                        {row.location}
                      </td>

                      {/* Status */}
                      <td>
                        {getStatusBadge(row.status, row.statusType)}
                      </td>

                      {/* Detected Materials */}
                      <td className="text-gray-700 font-medium">
                        {row.materialsLabel}
                      </td>

                      {/* Last Updated */}
                      <td className="text-gray-500 text-xs">
                        {row.lastUpdated}
                      </td>

                      {/* Actions */}
                      <td className="text-right">
                        <div className="flex items-center justify-end gap-2 text-gray-400">
                          <button
                            onClick={() => {
                              if (row.isReal) {
                                selectProject(row.id, true);
                              } else {
                                loadDemoProject();
                              }
                            }}
                            className="p-1 hover:text-gray-700 transition-colors cursor-pointer"
                            title="Edit / View Details"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              if (row.isReal) {
                                selectProject(row.id, true);
                              } else {
                                loadDemoProject();
                              }
                            }}
                            className="p-1 hover:text-gray-700 transition-colors cursor-pointer"
                            title="More Options"
                          >
                            <MoreHorizontal className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Table Footer with Pagination Controls */}
          <div className="px-6 py-3.5 bg-gray-50/50 border-t border-gray-200 flex items-center justify-between text-xs text-gray-500">
            <div>
              Randing 1 - {tableData.length} rows
            </div>

            <div className="flex items-center gap-2">
              <button className="p-1 hover:text-gray-900 transition-colors disabled:opacity-40" disabled>
                <ChevronsLeft className="w-3.5 h-3.5" />
              </button>
              <button className="p-1 hover:text-gray-900 transition-colors disabled:opacity-40" disabled>
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button className="p-1 hover:text-gray-900 transition-colors">
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
              <button className="p-1 hover:text-gray-900 transition-colors">
                <ChevronsRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
