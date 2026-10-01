import React, { useState, useEffect } from 'react';
import {
  Shield,
  ShieldAlert,
  Server,
  Activity,
  Cpu,
  Database,
  Lock,
  Clock,
  Layers,
  Building,
  Recycle,
  CheckCircle2,
  RefreshCw,
  UserCheck
} from 'lucide-react';
import { useProject } from '../context/ProjectContext';
import { api } from '../services/api';

export default function AdminPanelView() {
  const { currentUser, toggleUserRole, setActiveTab, showNotification } = useProject();

  const [stats, setStats] = useState(null);
  const [logs, setLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAdminData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const statsData = await api.getAdminStats(currentUser.role);
      const logsData = await api.getAdminAuditLogs(currentUser.role);
      setStats(statsData);
      setLogs(logsData);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Access Denied: Administrator role required on server');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser?.role === 'admin') {
      fetchAdminData();
    }
  }, [currentUser]);

  // Access Denied screen for normal users attempting to open admin
  if (currentUser?.role !== 'admin') {
    return (
      <div className="p-12 rounded-xl bg-white border border-rose-200 text-center space-y-4 max-w-lg mx-auto my-12 shadow-xs animate-fade-in-up font-sans">
        <div className="w-12 h-12 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600 mx-auto">
          <Lock className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-bold font-heading text-gray-900">
          Access Denied: Admin Privileges Required
        </h2>
        <p className="text-xs text-gray-500 leading-relaxed">
          The Admin Panel and server-side management endpoints are restricted to authenticated system administrators.
        </p>

        <div className="pt-2 flex items-center justify-center gap-3">
          <button
            onClick={() => setActiveTab('dashboard')}
            className="btn-outline-secondary text-xs"
          >
            Return to Dashboard
          </button>
          <button
            onClick={toggleUserRole}
            className="btn-petrol-primary text-xs"
          >
            Switch to Admin Role (Demo Mode)
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto py-2 font-sans animate-fade-in-up">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-200 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold tracking-widest bg-amber-50 text-amber-800 border border-amber-200 uppercase">
              Role: System Administrator
            </span>
            <span className="text-xs text-gray-500">• Server-Side Protected</span>
          </div>
          <h1 className="text-2xl font-bold font-heading text-gray-900">
            RECLAIM X Admin & Observability Panel
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Internal system health, security verification, API status, and audit logs.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={fetchAdminData}
            disabled={isLoading}
            className="btn-outline-secondary text-xs"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>

          <button
            onClick={toggleUserRole}
            className="btn-outline-secondary text-xs"
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>Switch to User View</span>
          </button>
        </div>
      </div>

      {error ? (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 shrink-0 text-rose-600" />
          <span>{error}</span>
        </div>
      ) : (
        <>
          {/* System Health Indicators */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-white border border-gray-200 space-y-1 shadow-xs">
              <span className="text-[10px] uppercase font-semibold text-gray-500 block">
                Platform Runtime
              </span>
              <div className="text-sm font-bold text-gray-900 flex items-center gap-2">
                <Server className="w-4 h-4 text-[#0D3B5E]" />
                <span>Node {stats?.nodeVersion || 'v20'}</span>
              </div>
              <span className="text-[10px] text-gray-400">Uptime: {stats?.serverUptimeSeconds || 0}s</span>
            </div>

            <div className="p-4 rounded-xl bg-white border border-gray-200 space-y-1 shadow-xs">
              <span className="text-[10px] uppercase font-semibold text-gray-500 block">
                Memory Footprint
              </span>
              <div className="text-sm font-bold text-gray-900 flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#0D3B5E]" />
                <span>{stats?.memoryUsageMB || 15} MB Heap</span>
              </div>
              <span className="text-[10px] text-gray-400">Optimal server resource</span>
            </div>

            <div className="p-4 rounded-xl bg-white border border-gray-200 space-y-1 shadow-xs">
              <span className="text-[10px] uppercase font-semibold text-gray-500 block">
                AI Vision Engine
              </span>
              <div className="text-sm font-bold text-[#0D3B5E] flex items-center gap-2">
                <Cpu className="w-4 h-4 text-[#0D3B5E]" />
                <span>{stats?.geminiConfigured ? 'Gemini 2.5 Flash' : 'Calibrated Vision'}</span>
              </div>
              <span className="text-[10px] text-gray-400">Multimodal active</span>
            </div>

            <div className="p-4 rounded-xl bg-white border border-gray-200 space-y-1 shadow-xs">
              <span className="text-[10px] uppercase font-semibold text-gray-500 block">
                Storage & Security
              </span>
              <div className="text-sm font-bold text-gray-900 flex items-center gap-2">
                <Database className="w-4 h-4 text-teal-800" />
                <span>{stats?.supabaseConfigured ? 'Supabase RLS' : 'Protected Store'}</span>
              </div>
              <span className="text-[10px] text-gray-400">Isolated credentials</span>
            </div>
          </div>

          {/* Aggregate Totals */}
          {stats?.systemStats && (
            <div className="p-5 rounded-xl bg-white border border-gray-200 space-y-3 shadow-xs">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                Aggregate Database Records
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                <div>
                  <span className="text-gray-500 block">Total Demolition Sites</span>
                  <span className="text-lg font-bold font-heading text-gray-900">{stats.systemStats.totalProjects}</span>
                </div>
                <div>
                  <span className="text-gray-500 block">Cataloged Material Streams</span>
                  <span className="text-lg font-bold font-heading text-gray-900">{stats.systemStats.totalRecoveryStreams}</span>
                </div>
                <div>
                  <span className="text-gray-500 block">Total Waste Diverted</span>
                  <span className="text-lg font-bold font-heading text-teal-800">{stats.systemStats.totalDivertedTonnes} T</span>
                </div>
                <div>
                  <span className="text-gray-500 block">Total Projected Salvage Value</span>
                  <span className="text-lg font-bold font-heading text-[#0D3B5E]">
                    ₹{stats.systemStats.totalProjectedSalvageNetValue?.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Audit Logs Table */}
          <div className="p-5 rounded-xl bg-white border border-gray-200 space-y-3 shadow-xs">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Recent System Audit Activity Logs
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 text-gray-500 text-[10px] uppercase font-semibold bg-gray-50">
                    <th className="py-2.5 px-3">Timestamp</th>
                    <th className="py-2.5 px-3">Action Type</th>
                    <th className="py-2.5 px-3">Target Context</th>
                    <th className="py-2.5 px-3">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-gray-700">
                  {logs.map((log) => (
                    <tr key={log.id} className="hover:bg-gray-50">
                      <td className="py-2 px-3 text-[11px] font-mono text-gray-500 whitespace-nowrap">
                        {new Date(log.timestamp).toLocaleTimeString()}
                      </td>
                      <td className="py-2 px-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-gray-100 text-gray-800 border border-gray-200">
                          {log.action}
                        </span>
                      </td>
                      <td className="py-2 px-3 text-gray-900 font-medium">
                        {log.projectContext || 'System'}
                      </td>
                      <td className="py-2 px-3 text-gray-600">
                        {log.details}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

    </div>
  );
}
