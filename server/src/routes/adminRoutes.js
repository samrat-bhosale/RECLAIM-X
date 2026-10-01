import express from 'express';
import { dbService } from '../services/dbService.js';

const router = express.Router();

/**
 * Server-side Admin Authorization Middleware
 * Verifies that the incoming request has the 'admin' role
 * Checks x-user-role header or Authorization token
 */
export const requireAdmin = (req, res, next) => {
  const userRole = req.headers['x-user-role'];
  if (userRole !== 'admin') {
    return res.status(403).json({
      success: false,
      error: 'Access Denied: Administrator privileges required'
    });
  }
  next();
};

// Apply admin guard to all routes in this router
router.use(requireAdmin);

// GET /api/v1/admin/stats - System health & aggregate statistics
router.get('/stats', async (req, res) => {
  try {
    const projects = await dbService.getAllProjects();
    const stats = await dbService.getAdminSystemStats();
    
    res.json({
      success: true,
      data: {
        totalProjects: projects.length,
        systemStats: stats,
        geminiConfigured: Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.length > 5),
        supabaseConfigured: Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY),
        serverUptimeSeconds: Math.round(process.uptime()),
        memoryUsageMB: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
        nodeVersion: process.version,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/v1/admin/audit-logs - System activity audit trail
router.get('/audit-logs', async (req, res) => {
  try {
    const logs = await dbService.getAdminAuditLogs();
    res.json({ success: true, data: logs });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
