const API_BASE = '/api/v1';

export const api = {
  async getHealth() {
    const res = await fetch('/api/health');
    return res.json();
  },

  async getAllProjects() {
    const res = await fetch(`${API_BASE}/projects`);
    const data = await res.json();
    if (!data.success) throw new Error(data.error || 'Failed to fetch projects');
    return data.data;
  },

  async getProjectById(id) {
    const res = await fetch(`${API_BASE}/projects/${id}`);
    const data = await res.json();
    if (!data.success) throw new Error(data.error || 'Failed to fetch project details');
    return data.data;
  },

  async createProject(projectData) {
    const res = await fetch(`${API_BASE}/projects`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(projectData),
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.error || 'Failed to create project');
    return data.data;
  },

  async updateProject(id, updates) {
    const res = await fetch(`${API_BASE}/projects/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.error || 'Failed to update project');
    return data.data;
  },

  async deleteProject(id) {
    const res = await fetch(`${API_BASE}/projects/${id}`, { method: 'DELETE' });
    const data = await res.json();
    if (!data.success) throw new Error(data.error || 'Failed to delete project');
    return data;
  },

  async loadDemoProject() {
    const res = await fetch(`${API_BASE}/projects/demo`, { method: 'POST' });
    const data = await res.json();
    if (!data.success) throw new Error(data.error || 'Failed to load demo project');
    return data.data;
  },

  async updateActualRecovery(projectId, items) {
    const res = await fetch(`${API_BASE}/projects/${projectId}/recovery-items`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items }),
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.error || 'Failed to update recovery items');
    return data.data;
  },

  async toggleSequenceStep(projectId, stepId, isCompleted) {
    const res = await fetch(`${API_BASE}/projects/${projectId}/sequences/${stepId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isCompleted }),
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.error || 'Failed to toggle sequence');
    return data.data;
  },

  async detectMaterials(images, projectContext = {}) {
    const res = await fetch(`${API_BASE}/ai/detect-materials`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ images, projectContext }),
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.error || 'Failed to analyze site images');
    return data.data;
  },

  async analyzeSalvage(payload) {
    const res = await fetch(`${API_BASE}/ai/analyze-salvage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.error || 'Failed to run AI salvage analysis');
    return data.data;
  },

  async diagnoseGap(projectId, userNotes = '') {
    const res = await fetch(`${API_BASE}/ai/diagnose-gap`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ projectId, userNotes }),
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.error || 'Failed to run root-cause diagnosis');
    return data.data;
  },

  async simulateCounterfactual(projectId, sequence) {
    const res = await fetch(`${API_BASE}/ai/simulate-counterfactual`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ projectId, sequence }),
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.error || 'Failed to run counterfactual simulation');
    return data.data;
  },

  async getAdminStats(role = 'admin') {
    const res = await fetch(`${API_BASE}/admin/stats`, {
      headers: { 'x-user-role': role }
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.error || 'Failed to fetch admin stats');
    return data.data;
  },

  async getAdminAuditLogs(role = 'admin') {
    const res = await fetch(`${API_BASE}/admin/audit-logs`, {
      headers: { 'x-user-role': role }
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.error || 'Failed to fetch admin audit logs');
    return data.data;
  }
};
