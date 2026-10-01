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
  Building2,
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
      <div className="p-12 rounded-2xl bg-slate-900/60 border border-rose-500/30 text-center space-y-4 max-w-lg mx-auto my-12 animate-in fade-in">
        <div className="w-12 h-12 rounded-xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-400 mx-auto">
          <Lock className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-bold font-heading text-white">
          Access Denied: Admin Privileges Required
        </h2>
        <p className="text-xs text-slate-400 leading-relaxed">
          The Admin Panel and server-side management endpoints are restricted to authenticated system administrators.
        </p>

        <div className="pt-2 flex items-center justify-center gap-3">
          <button
            onClick={() => setActiveTab('dashboard')}
            className="px-4 py-2 rounded-xl text-xs font-medium bg-slate-800 text-slate-300 hover:bg-slate-700 transition"
          >
            Return to Dashboard
          </button>
          <button
            onClick={toggleUserRole}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-amber-500 hover:bg-amber-400 text-slate-950 transition"
          >
            Switch to Admin Role (Demo Mode)
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto py-2 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold tracking-widest bg-amber-500/15 text-amber-400 border border-amber-500/30 uppercase">
              Role: System Administrator
            </span>
            <span className="text-xs text-slate-400">• Server-Side Protected</span>
          </div>
          <h1 className="text-2xl font-bold font-heading text-white">
            RECLAIM X Admin & Observability Panel
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Internal system health, security verification, API status, and audit logs.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={fetchAdminData}
            disabled={isLoading}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </button>

          <button
            onClick={toggleUserRole}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium bg-slate-800 text-slate-300 hover:bg-slate-700 transition"
          >
            <UserCheck className="w-3.5 h-3.5" />
            Switch to User View
          </button>
        </div>
      </div>

      {error ? (
        <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-500/40 text-xs text-rose-300 flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      ) : (
        <>
          {/* System Health Indicators */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
              <span className="text-[10px] uppercase font-semibold text-slate-400 block">
                Platform Runtime
              </span>
              <div className="text-sm font-bold text-white flex items-center gap-2">
                <Server className="w-4 h-4 text-emerald-400" />
                <span>Node {stats?.nodeVersion || 'v20'}</span>
              </div>
              <span className="text-[10px] text-slate-500">Uptime: {stats?.serverUptimeSeconds || 0}s</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
              <span className="text-[10px] uppercase font-semibold text-slate-400 block">
                Memory Footprint
              </span>
              <div className="text-sm font-bold text-white flex items-center gap-2">
                <Activity className="w-4 h-4 text-cyan-400" />
                <span>{stats?.memoryUsageMB || 15} MB Heap</span>
              </div>
              <span className="text-[10px] text-slate-500">Optimal server resource</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
              <span className="text-[10px] uppercase font-semibold text-slate-400 block">
                AI Vision Engine
              </span>
              <div className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-emerald-400" />
                <span>{stats?.geminiConfigured ? 'Gemini 2.5 Flash' : 'Calibrated Vision'}</span>
              </div>
              <span className="text-[10px] text-slate-500">Multimodal active</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
              <span className="text-[10px] uppercase font-semibold text-slate-400 block">
                Storage & Security
              </span>
              <div className="text-sm font-bold text-white flex items-center gap-2">
                <Database className="w-4 h-4 text-teal-400" />
                <span>{stats?.supabaseConfigured ? 'Supabase RLS' : 'Protected Store'}</span>
              </div>
              <span className="text-[10px] text-slate-500">Isolated credentials</span>
            </div>
          </div>

          {/* Aggregate Totals */}
          {stats?.systemStats && (
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Aggregate Database Records
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                <div>
                  <span className="text-slate-400 block">Total Demolition Sites</span>
                  <span className="text-lg font-bold font-heading text-white">{stats.systemStats.totalProjects}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Cataloged Material Streams</span>
                  <span className="text-lg font-bold font-heading text-white">{stats.systemStats.totalRecoveryStreams}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Total Waste Diverted</span>
                  <span className="text-lg font-bold font-heading text-teal-300">{stats.systemStats.totalDivertedTonnes} T</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Total Projected Salvage Value</span>
                  <span className="text-lg font-bold font-heading text-emerald-400">
                    ₹{stats.systemStats.totalProjectedSalvageNetValue?.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Audit Logs Table */}
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Recent System Audit Activity Logs
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-[10px] uppercase font-semibold">
                    <th className="py-2.5 px-3">Timestamp</th>
                    <th className="py-2.5 px-3">Action Type</th>
                    <th className="py-2.5 px-3">Target Context</th>
                    <th className="py-2.5 px-3">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  {logs.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-800/30">
                      <td className="py-2 px-3 text-[11px] font-mono text-slate-400 whitespace-nowrap">
                        {new Date(log.timestamp).toLocaleTimeString()}
                      </td>
                      <td className="py-2 px-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-slate-800 text-slate-200">
                          {log.action}
                        </span>
                      </td>
                      <td className="py-2 px-3 text-white font-medium">
                        {log.projectContext || 'System'}
                      </td>
                      <td className="py-2 px-3 text-slate-300">
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
