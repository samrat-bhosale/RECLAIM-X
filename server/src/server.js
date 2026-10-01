import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

import projectRoutes from './routes/projectRoutes.js';
import aiRoutes from './routes/aiRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env') });

const app = express();
const PORT = process.env.PORT || 5001;

// CORS configuration
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-user-role']
}));

// Body parser with 25mb limit for site image uploads
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ limit: '25mb', extended: true }));

// Request logger for hackathon observability
app.use((req, res, next) => {
  if (!req.url.startsWith('/assets/')) {
    console.log(`[RECLAIM X API] ${req.method} ${req.url}`);
  }
  next();
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'RECLAIM X Circularity Engine',
    geminiConfigured: Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.length > 5),
    supabaseConfigured: Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY),
    timestamp: new Date().toISOString()
  });
});

// Mount API Routes
app.use('/api/v1/projects', projectRoutes);
app.use('/api/v1/ai', aiRoutes);
app.use('/api/v1/admin', adminRoutes);

// API 404 handler
app.use('/api/*', (req, res) => {
  res.status(404).json({ success: false, error: `API route ${req.originalUrl} not found` });
});

// Serve frontend static build if present
const clientDistPath = path.join(__dirname, '../../client/dist');
if (fs.existsSync(clientDistPath)) {
  app.use(express.static(clientDistPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(clientDistPath, 'index.html'));
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('[RECLAIM X API Unhandled Error]', err);
  res.status(500).json({
    success: false,
    error: err.message || 'Internal server error'
  });
});

app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`🚀 RECLAIM X Backend API running on http://localhost:${PORT}`);
  console.log(`🌿 Material Recovery & Circularity Engine Initialized`);
  console.log(`🤖 Gemini AI Mode: ${process.env.GEMINI_API_KEY ? 'Active (API Key detected)' : 'Calibrated Statistical Engine (Fallback)'}`);
  if (fs.existsSync(clientDistPath)) {
    console.log(`🌐 Static Web Application mounted from ${clientDistPath}`);
  }
  console.log(`=======================================================`);
});
