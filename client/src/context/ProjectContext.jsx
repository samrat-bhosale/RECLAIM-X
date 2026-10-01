import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { api } from '../services/api';
import { translations } from '../i18n/translations';
import confetti from 'canvas-confetti';

const ProjectContext = createContext(null);

export function ProjectProvider({ children }) {
  const [projects, setProjects] = useState([]);
  const [activeProjectId, setActiveProjectId] = useState(null);
  const [activeProjectData, setActiveProjectData] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(true);
  const [isAiAnalyzing, setIsAiAnalyzing] = useState(false);
  const [notification, setNotification] = useState(null);
  const [systemHealth, setSystemHealth] = useState(null);

  // Multilingual Support: 'en' (Default), 'hi', 'mr'
  const [language, setLanguage] = useState('en');

  const t = useCallback((path) => {
    const keys = path.split('.');
    let current = translations[language] || translations['en'];
    for (const key of keys) {
      if (current && current[key] !== undefined) {
        current = current[key];
      } else {
        // Fallback to English
        let fallback = translations['en'];
        for (const fbKey of keys) {
          if (fallback && fallback[fbKey] !== undefined) {
            fallback = fallback[fbKey];
          } else {
            return path;
          }
        }
        return fallback || path;
      }
    }
    return current;
  }, [language]);

  // User Profile & Role (Default: normal user; toggleable for Admin Panel testing)
  const [currentUser, setCurrentUser] = useState({
    id: 'user-01',
    name: 'Alex Morgan',
    email: 'alex.m@circulardemo.io',
    role: 'user' // 'user' or 'admin'
  });

  const toggleUserRole = useCallback(() => {
    setCurrentUser(prev => {
      const newRole = prev.role === 'admin' ? 'user' : 'admin';
      showNotification(`Switched role to ${newRole.toUpperCase()}`, 'info');
      // If switching to user while on admin tab, redirect to dashboard
      if (newRole === 'user' && activeTab === 'admin') {
        setActiveTab('dashboard');
      }
      return { ...prev, role: newRole };
    });
  }, [activeTab]);

  const showNotification = useCallback((message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(prev => (prev?.message === message ? null : prev));
    }, 4500);
  }, []);

  const loadProjects = useCallback(async (selectId = null) => {
    try {
      setIsLoading(true);
      const list = await api.getAllProjects();
      setProjects(list);
      
      const targetId = selectId || activeProjectId || (list.length > 0 ? list[0].id : null);
      if (targetId) {
        await selectProject(targetId, false);
      }
    } catch (err) {
      console.error('Failed to load projects:', err);
      showNotification('Failed to load projects from server', 'error');
    } finally {
      setIsLoading(false);
    }
  }, [activeProjectId, showNotification]);

  const selectProject = useCallback(async (projectId, switchToOverview = false) => {
    try {
      setIsLoading(true);
      setActiveProjectId(projectId);
      const fullData = await api.getProjectById(projectId);
      setActiveProjectData(fullData);
      if (switchToOverview) {
        setActiveTab('overview');
      }
    } catch (err) {
      console.error('Failed to load project details:', err);
      showNotification('Could not retrieve project data', 'error');
    } finally {
      setIsLoading(false);
    }
  }, [showNotification]);

  const handleLoadDemoProject = useCallback(async () => {
    try {
      setIsLoading(true);
      const demoData = await api.loadDemoProject();
      showNotification('Loaded demo project: ABC Tech Park (Pune)', 'success');
      
      try {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.2 },
          colors: ['#10b981', '#06b6d4', '#3b82f6']
        });
      } catch (e) {
        // ignore if canvas not ready
      }

      await loadProjects(demoData.project.id);
      setActiveTab('overview');
    } catch (err) {
      console.error('Failed to load demo:', err);
      showNotification('Error loading demo project', 'error');
    } finally {
      setIsLoading(false);
    }
  }, [loadProjects, showNotification]);

  const handleCreateProject = useCallback(async (formData, runImmediateAudit = true) => {
    try {
      setIsLoading(true);
      const created = await api.createProject(formData);
      showNotification(`Project "${created.name}" created!`, 'success');
      
      // Optionally run immediate salvage analysis
      if (runImmediateAudit) {
        setIsAiAnalyzing(true);
        try {
          await api.analyzeSalvage({
            projectId: created.id,
            buildingType: created.buildingType,
            areaSqft: Number(created.areaSqft),
            location: created.location,
            siteNotes: created.siteNotes || '',
            confirmedMaterials: formData.confirmedMaterials || []
          });
        } catch (auditErr) {
          console.warn('Initial audit warning:', auditErr);
        } finally {
          setIsAiAnalyzing(false);
        }
      }

      await loadProjects(created.id);
      setActiveTab('overview');
      return created;
    } catch (err) {
      console.error('Creation error:', err);
      showNotification(err.message || 'Failed to create project', 'error');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [loadProjects, showNotification]);

  const detectSiteMaterials = useCallback(async (images, projectContext = {}) => {
    try {
      const result = await api.detectMaterials(images, projectContext);
      return result;
    } catch (err) {
      console.error('Image analysis error:', err);
      throw err;
    }
  }, []);

  const handleRunAiAnalysis = useCallback(async () => {
    if (!activeProjectData?.project) return;
    try {
      setIsAiAnalyzing(true);
      const { project } = activeProjectData;
      const result = await api.analyzeSalvage({
        projectId: project.id,
        buildingType: project.buildingType,
        areaSqft: Number(project.areaSqft),
        location: project.location,
        siteNotes: project.siteNotes || '',
        confirmedMaterials: project.confirmedMaterials || []
      });

      showNotification('AI Recovery Intelligence analysis completed!', 'success');
      await selectProject(project.id, false);
      setActiveTab('intelligence');
      return result;
    } catch (err) {
      console.error('AI Analysis failed:', err);
      showNotification(err.message || 'AI Recovery Engine encountered an issue', 'error');
    } finally {
      setIsAiAnalyzing(false);
    }
  }, [activeProjectData, selectProject, showNotification]);

  const handleUpdateActuals = useCallback(async (itemUpdates) => {
    if (!activeProjectId) return;
    try {
      const updated = await api.updateActualRecovery(activeProjectId, itemUpdates);
      showNotification('Field recovery records updated & ledger recalculated', 'success');
      await selectProject(activeProjectId, false);
      return updated;
    } catch (err) {
      console.error('Update actuals error:', err);
      showNotification('Failed to save actuals', 'error');
    }
  }, [activeProjectId, selectProject, showNotification]);

  const handleToggleStep = useCallback(async (stepId, isCompleted) => {
    if (!activeProjectId) return;
    try {
      await api.toggleSequenceStep(activeProjectId, stepId, isCompleted);
      await selectProject(activeProjectId, false);
    } catch (err) {
      console.error('Toggle step error:', err);
    }
  }, [activeProjectId, selectProject]);

  useEffect(() => {
    loadProjects();
    api.getHealth()
      .then(h => setSystemHealth(h))
      .catch(e => console.warn('Backend health check error:', e));
  }, []);

  return (
    <ProjectContext.Provider
      value={{
        projects,
        activeProjectId,
        activeProjectData,
        activeTab,
        setActiveTab,
        isLoading,
        isAiAnalyzing,
        notification,
        showNotification,
        systemHealth,
        currentUser,
        toggleUserRole,
        language,
        setLanguage,
        t,
        loadProjects,
        selectProject,
        loadDemoProject: handleLoadDemoProject,
        createProject: handleCreateProject,
        detectSiteMaterials,
        runAiAnalysis: handleRunAiAnalysis,
        updateActuals: handleUpdateActuals,
        toggleSequenceStep: handleToggleStep,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}

export function useProject() {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
}
