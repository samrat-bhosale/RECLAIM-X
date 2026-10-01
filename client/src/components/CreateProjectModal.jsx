import React, { useState } from 'react';
import { X, Building2, MapPin, Layers, FileText, CheckCircle2 } from 'lucide-react';
import { useProject } from '../context/ProjectContext';

export default function CreateProjectModal({ isOpen, onClose }) {
  const { createProject, showNotification } = useProject();
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    buildingType: 'Commercial',
    areaSqft: '',
    status: 'Planning',
    siteNotes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.location.trim() || !formData.areaSqft) {
      showNotification('Please fill in all required fields', 'error');
      return;
    }

    try {
      setIsSubmitting(true);
      await createProject({
        ...formData,
        areaSqft: Number(formData.areaSqft)
      });
      onClose();
    } catch (err) {
      // Error handled in context
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white border border-gray-200 rounded-2xl shadow-2xl p-6 sm:p-8 text-gray-900">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-900 p-1.5 rounded-lg hover:bg-gray-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-[#0D3B5E]/10 border border-[#0D3B5E]/20 flex items-center justify-center text-[#0D3B5E]">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold font-heading text-gray-900">Create Demolition Project</h2>
            <p className="text-xs text-gray-500">Setup project metadata for AI circularity recovery assessment</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">
              Project Name <span className="text-[#0D3B5E]">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Skyline Heights Redevelopment"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-[#0D3B5E] focus:ring-1 focus:ring-[#0D3B5E] transition"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">
                Location <span className="text-[#0D3B5E]">*</span>
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Pune, Maharashtra"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full bg-white border border-gray-300 rounded-xl pl-10 pr-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-[#0D3B5E] focus:ring-1 focus:ring-[#0D3B5E] transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">
                Building Typology <span className="text-[#0D3B5E]">*</span>
              </label>
              <select
                value={formData.buildingType}
                onChange={(e) => setFormData({ ...formData, buildingType: e.target.value })}
                className="w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-[#0D3B5E] focus:ring-1 focus:ring-[#0D3B5E] transition"
              >
                <option value="Commercial">Commercial (Office / Retail)</option>
                <option value="Residential">Residential (Apartments / Villas)</option>
                <option value="Industrial">Industrial (Warehouses / Plants)</option>
                <option value="Institutional">Institutional (Schools / Hospitals)</option>
                <option value="Mixed-Use">Mixed-Use Complex</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">
                Gross Floor Area (Sq.Ft.) <span className="text-[#0D3B5E]">*</span>
              </label>
              <div className="relative">
                <Layers className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                <input
                  type="number"
                  required
                  min="100"
                  step="100"
                  placeholder="e.g. 15000"
                  value={formData.areaSqft}
                  onChange={(e) => setFormData({ ...formData, areaSqft: e.target.value })}
                  className="w-full bg-white border border-gray-300 rounded-xl pl-10 pr-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-[#0D3B5E] focus:ring-1 focus:ring-[#0D3B5E] transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">
                Current Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-[#0D3B5E] focus:ring-1 focus:ring-[#0D3B5E] transition"
              >
                <option value="Planning">Planning</option>
                <option value="Pre-Demolition">Pre-Demolition Audit</option>
                <option value="Salvage in Progress">Salvage in Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">
              Site Inspection Notes / Key Materials
            </label>
            <div className="relative">
              <FileText className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
              <textarea
                rows="3"
                placeholder="Mention presence of doors, aluminium windows, HVAC, electrical transformers, copper conduit runs, steel structures..."
                value={formData.siteNotes}
                onChange={(e) => setFormData({ ...formData, siteNotes: e.target.value })}
                className="w-full bg-white border border-gray-300 rounded-xl pl-10 pr-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-[#0D3B5E] focus:ring-1 focus:ring-[#0D3B5E] transition"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-[#0D3B5E] hover:bg-[#0A2E4A] text-white transition shadow-sm disabled:opacity-50"
            >
              <CheckCircle2 className="w-4 h-4" />
              {isSubmitting ? 'Creating...' : 'Create Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
