import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';
import { createClient } from '@supabase/supabase-js';
import { calculateProjectLedger } from './ledgerService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, '../../data');
const DB_FILE = path.join(DATA_DIR, 'store.json');

import WebSocket from 'ws';

// Initialize Supabase client if keys exist
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const isSupabaseEnabled = Boolean(supabaseUrl && supabaseKey && supabaseUrl.startsWith('http'));

export const supabase = isSupabaseEnabled
  ? createClient(supabaseUrl, supabaseKey, {
      auth: { persistSession: false },
      realtime: { transport: WebSocket }
    })
  : null;

// Built-in JSON Database for zero-config out-of-the-box hackathon reliability
let memoryDb = {
  projects: [],
  recovery_items: [],
  recovery_sequences: [],
  project_ledgers: []
};

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function loadLocalDb() {
  ensureDataDir();
  if (fs.existsSync(DB_FILE)) {
    try {
      const data = fs.readFileSync(DB_FILE, 'utf8');
      memoryDb = JSON.parse(data);
    } catch (e) {
      console.error('[RECLAIM X] Error reading db file, reinitializing', e.message);
    }
  }
  if (!memoryDb.projects || memoryDb.projects.length === 0) {
    seedDemoProjectInternal();
  }
}

function saveLocalDb() {
  ensureDataDir();
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(memoryDb, null, 2), 'utf8');
  } catch (e) {
    console.error('[RECLAIM X] Error saving db file', e.message);
  }
}

// Demo Project Dataset (Section 14 of PRD)
export function getDemoProjectData() {
  const projectId = 'demo-project-abc-tech-park';
  const now = new Date().toISOString();

  const project = {
    id: projectId,
    user_id: 'hackathon-judge-user',
    name: 'ABC Tech Park — Demo Project',
    location: 'Pune, Maharashtra',
    buildingType: 'Commercial',
    areaSqft: 12000,
    status: 'Pre-Demolition',
    siteNotes: '3-storey commercial office facility slated for redevelopment. Rich architectural interior with intact hardwood panel doors, double-glazed aluminium perimeter windows, heavy structural mezzanine framing, and high-spec electrical infrastructure.',
    createdAt: now,
    updatedAt: now
  };

  const recoveryItems = [
    {
      id: 'demo-item-1',
      projectId,
      itemName: 'Teak & Flush Architectural Doors',
      materialCategory: 'Wood & Timber',
      predictedQty: 42,
      actualRecoveredQty: 34,
      damagedQty: 5,
      unit: 'units',
      conditionRating: 'B',
      unitResaleValue: 5200,
      tippingFeePerUnit: 350,
      laborCostPerUnit: 800,
      recoveryPriorityScore: 92,
      confidenceScore: 0.85,
      estimationBasis: 'Visible Evidence',
      notes: '34 salvageable door leafs recovered; 5 suffered edge splintering during expedited jamb detachment.'
    },
    {
      id: 'demo-item-2',
      projectId,
      itemName: 'Aluminium Window Frames & Insulated Glazing',
      materialCategory: 'Aluminium & Glass',
      predictedQty: 68,
      actualRecoveredQty: 46,
      damagedQty: 18,
      unit: 'panels',
      conditionRating: 'B',
      unitResaleValue: 3400,
      tippingFeePerUnit: 280,
      laborCostPerUnit: 650,
      recoveryPriorityScore: 89,
      confidenceScore: 0.78,
      estimationBasis: 'Visible Evidence',
      notes: 'High shatter rate (18 units damaged) caused by early heavy vibration from northern bay demo.'
    },
    {
      id: 'demo-item-3',
      projectId,
      itemName: 'Mezzanine Structural Steel I-Beams & Channels',
      materialCategory: 'Structural Steel',
      predictedQty: 210,
      actualRecoveredQty: 195,
      damagedQty: 10,
      unit: 'linear meters',
      conditionRating: 'A',
      unitResaleValue: 1450,
      tippingFeePerUnit: 190,
      laborCostPerUnit: 320,
      recoveryPriorityScore: 86,
      confidenceScore: 0.82,
      estimationBasis: 'Statistical Inference',
      notes: 'High recovery yield using cold flame-cutting and crane rigging.'
    },
    {
      id: 'demo-item-4',
      projectId,
      itemName: 'Commercial LED Luminares & Copper Distribution Cabling',
      materialCategory: 'Electrical & Fixtures',
      predictedQty: 140,
      actualRecoveredQty: 90,
      damagedQty: 25,
      unit: 'fixtures/spools',
      conditionRating: 'B',
      unitResaleValue: 1750,
      tippingFeePerUnit: 120,
      laborCostPerUnit: 380,
      recoveryPriorityScore: 78,
      confidenceScore: 0.72,
      estimationBasis: 'Statistical Inference',
      notes: 'Subcontractor crew skipped conduit pull-out on floor 3 due to compressed schedule.'
    },
    {
      id: 'demo-item-5',
      projectId,
      itemName: 'Sanitaryware Suites & Ceramic Basins',
      materialCategory: 'Plumbing & Ceramics',
      predictedQty: 48,
      actualRecoveredQty: 28,
      damagedQty: 15,
      unit: 'sets',
      conditionRating: 'C',
      unitResaleValue: 2200,
      tippingFeePerUnit: 210,
      laborCostPerUnit: 480,
      recoveryPriorityScore: 68,
      confidenceScore: 0.65,
      estimationBasis: 'Statistical Inference',
      notes: 'Impact shock from adjacent jackhammering broke 15 washbasins prior to de-plumbing.'
    }
  ];

  const recoverySequences = [
    {
      id: 'demo-seq-1',
      projectId,
      stepNumber: 1,
      actionTitle: 'Careful Deconstruction of Reusable Architectural Doors',
      targetCategory: 'Wood & Timber',
      justification: 'Soft-strip prior to mechanical shock and weather exposure preserves 90%+ resale value.',
      riskIfDelayed: 'High moisture and impact hazard if walls are penetrated before door leaf salvage.',
      isCompleted: true
    },
    {
      id: 'demo-seq-2',
      projectId,
      stepNumber: 2,
      actionTitle: 'Dismantle Perimeter Glazing & Aluminium Extrusions',
      targetCategory: 'Aluminium & Glass',
      justification: 'Remove glass panels from exterior envelope before structural vibration starts.',
      riskIfDelayed: 'Vibrations from heavy equipment cause window glass to shatter, forfeiting salvage value.',
      isCompleted: true
    },
    {
      id: 'demo-seq-3',
      projectId,
      stepNumber: 3,
      actionTitle: 'De-energize & Recover Copper Wiring & Modular Lighting',
      targetCategory: 'Electrical & Fixtures',
      justification: 'Systematic electrical trace-and-pull yields clean, high-grade copper scrap and reusable fixtures.',
      riskIfDelayed: 'Once gypsum drywall is crushed, copper recovery costs exceed market value.',
      isCompleted: true
    },
    {
      id: 'demo-seq-4',
      projectId,
      stepNumber: 4,
      actionTitle: 'Unbolt & Rig Structural Steel Mezzanines & Trusses',
      targetCategory: 'Structural Steel',
      justification: 'Cold unfastening preserves structural integrity for direct secondary reuse.',
      riskIfDelayed: 'Hydraulic shearing converts high-value beam sections into commodity scrap.',
      isCompleted: false
    },
    {
      id: 'demo-seq-5',
      projectId,
      stepNumber: 5,
      actionTitle: 'Extract Ceramic Sanitaryware & Brass Fittings',
      targetCategory: 'Plumbing & Ceramics',
      justification: 'Shut valves and disconnect porcelain assets before slab penetration.',
      riskIfDelayed: 'Brittle porcelain shatters instantaneously under heavy equipment movements.',
      isCompleted: false
    },
    {
      id: 'demo-seq-6',
      projectId,
      stepNumber: 6,
      actionTitle: 'Initiate Heavy Mechanical Demolition & Masonry Processing',
      targetCategory: 'Masonry & Concrete',
      justification: 'Bulk concrete crushing and rubble sorting proceeds with zero contamination from soft assets.',
      riskIfDelayed: 'Standard final deconstruction milestone.',
      isCompleted: false
    }
  ];

  const ledger = calculateProjectLedger(recoveryItems);
  const projectLedger = {
    id: 'demo-ledger-1',
    projectId,
    ...ledger,
    aiRootCauseSummary: 'Operational sequence overlap: Mechanical excavators initiated bay vibration before Floor 2 glazing and Floor 3 electrical extraction had concluded, resulting in ₹1,82,450 lost recovery value.',
    aiCounterfactualRecommendation: 'Simulations demonstrate that strictly gating heavy excavator entry behind complete soft-strip would have preserved an additional 23% of glazing and salvaged 35 extra electrical fixtures.'
  };

  return { project, recoveryItems, recoverySequences, projectLedger };
}

function seedDemoProjectInternal() {
  const demoData = getDemoProjectData();
  memoryDb.projects = [demoData.project];
  memoryDb.recovery_items = [...demoData.recoveryItems];
  memoryDb.recovery_sequences = [...demoData.recoverySequences];
  memoryDb.project_ledgers = [demoData.projectLedger];
  saveLocalDb();
}

// Initialize on boot
loadLocalDb();

export const dbService = {
  async getAllProjects() {
    if (isSupabaseEnabled) {
      const { data, error } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
      if (!error && data) return data;
    }
    return memoryDb.projects;
  },

  async getProjectById(id) {
    if (isSupabaseEnabled) {
      const { data: project } = await supabase.from('projects').select('*').eq('id', id).single();
      if (project) {
        const { data: items } = await supabase.from('recovery_items').select('*').eq('project_id', id);
        const { data: sequences } = await supabase.from('recovery_sequences').select('*').eq('project_id', id).order('step_number', { ascending: true });
        const { data: ledger } = await supabase.from('project_ledgers').select('*').eq('project_id', id).single();
        return { project, items: items || [], sequences: sequences || [], ledger };
      }
    }

    const project = memoryDb.projects.find(p => p.id === id);
    if (!project) return null;

    const items = memoryDb.recovery_items.filter(i => (i.projectId || i.project_id) === id);
    const sequences = memoryDb.recovery_sequences
      .filter(s => (s.projectId || s.project_id) === id)
      .sort((a, b) => (a.stepNumber || a.step_number) - (b.stepNumber || b.step_number));
    const ledger = memoryDb.project_ledgers.find(l => (l.projectId || l.project_id) === id) || calculateProjectLedger(items);

    return { project, items, sequences, ledger };
  },

  async createProject(data) {
    const id = uuidv4();
    const now = new Date().toISOString();
    const newProject = {
      id,
      user_id: 'authenticated-user',
      name: data.name,
      location: data.location,
      buildingType: data.buildingType,
      areaSqft: Number(data.areaSqft),
      status: data.status || 'Planning',
      siteNotes: data.siteNotes || '',
      siteImages: data.siteImages || [],
      confirmedMaterials: data.confirmedMaterials || [],
      createdAt: now,
      updatedAt: now
    };

    if (isSupabaseEnabled) {
      await supabase.from('projects').insert([{
        id,
        user_id: '00000000-0000-0000-0000-000000000000',
        name: data.name,
        location: data.location,
        building_type: data.buildingType,
        area_sqft: Number(data.areaSqft),
        status: data.status || 'Planning',
        site_notes: data.siteNotes || ''
      }]);
    }

    memoryDb.projects.unshift(newProject);
    
    // Automatically record admin audit log
    if (!memoryDb.admin_audit_logs) memoryDb.admin_audit_logs = [];
    memoryDb.admin_audit_logs.unshift({
      id: uuidv4(),
      timestamp: now,
      action: 'PROJECT_CREATED',
      details: `Created project "${newProject.name}" (${newProject.buildingType}, ${newProject.areaSqft} sq.ft)`,
      projectContext: newProject.name
    });

    saveLocalDb();
    return newProject;
  },

  async updateProject(id, updates) {
    const projIndex = memoryDb.projects.findIndex(p => p.id === id);
    if (projIndex !== -1) {
      memoryDb.projects[projIndex] = {
        ...memoryDb.projects[projIndex],
        ...updates,
        updatedAt: new Date().toISOString()
      };
      saveLocalDb();
      return memoryDb.projects[projIndex];
    }
    return null;
  },

  async deleteProject(id) {
    const proj = memoryDb.projects.find(p => p.id === id);
    memoryDb.projects = memoryDb.projects.filter(p => p.id !== id);
    memoryDb.recovery_items = memoryDb.recovery_items.filter(i => (i.projectId || i.project_id) !== id);
    memoryDb.recovery_sequences = memoryDb.recovery_sequences.filter(s => (s.projectId || s.project_id) !== id);
    memoryDb.project_ledgers = memoryDb.project_ledgers.filter(l => (l.projectId || l.project_id) !== id);
    
    if (proj) {
      if (!memoryDb.admin_audit_logs) memoryDb.admin_audit_logs = [];
      memoryDb.admin_audit_logs.unshift({
        id: uuidv4(),
        timestamp: new Date().toISOString(),
        action: 'PROJECT_DELETED',
        details: `Deleted project "${proj.name}"`,
        projectContext: proj.name
      });
    }

    saveLocalDb();
    return true;
  },

  async saveRecoveryAnalysis(projectId, analysisResult) {
    const { estimatedItems, recommendedSequence, macroFinancialProjection } = analysisResult;
    const now = new Date().toISOString();

    // Map and store items
    const newItems = estimatedItems.map(item => ({
      id: uuidv4(),
      projectId,
      itemName: item.itemName,
      materialCategory: item.category,
      predictedQty: item.predictedQty,
      actualRecoveredQty: 0,
      damagedQty: 0,
      unit: item.unit,
      conditionRating: item.conditionRating,
      unitResaleValue: item.unitResaleValue,
      tippingFeePerUnit: item.tippingFeeAvoidedPerUnit,
      laborCostPerUnit: item.extractionLaborCostPerUnit,
      recoveryPriorityScore: item.priorityScore,
      confidenceScore: item.confidenceScore,
      estimationBasis: item.estimationBasis,
      createdAt: now,
      updatedAt: now
    }));

    // Map and store sequence
    const newSequences = recommendedSequence.map(seq => ({
      id: uuidv4(),
      projectId,
      stepNumber: seq.stepNumber,
      actionTitle: seq.actionTitle,
      targetCategory: seq.targetCategory,
      justification: seq.operationalJustification,
      riskIfDelayed: seq.riskIfDelayed,
      isCompleted: false,
      createdAt: now
    }));

    // Calculate initial ledger
    const ledger = calculateProjectLedger(newItems);
    const newLedger = {
      id: uuidv4(),
      projectId,
      ...ledger,
      updatedAt: now
    };

    // Remove old items for this project and append new
    memoryDb.recovery_items = memoryDb.recovery_items.filter(i => (i.projectId || i.project_id) !== projectId).concat(newItems);
    memoryDb.recovery_sequences = memoryDb.recovery_sequences.filter(s => (s.projectId || s.project_id) !== projectId).concat(newSequences);
    memoryDb.project_ledgers = memoryDb.project_ledgers.filter(l => (l.projectId || l.project_id) !== projectId).concat([newLedger]);

    saveLocalDb();
    return { items: newItems, sequences: newSequences, ledger: newLedger };
  },

  async updateActualRecovery(projectId, itemUpdates) {
    for (const update of itemUpdates) {
      const idx = memoryDb.recovery_items.findIndex(i => i.id === update.id && (i.projectId || i.project_id) === projectId);
      if (idx !== -1) {
        if (update.actualRecoveredQty !== undefined) memoryDb.recovery_items[idx].actualRecoveredQty = Number(update.actualRecoveredQty);
        if (update.damagedQty !== undefined) memoryDb.recovery_items[idx].damagedQty = Number(update.damagedQty);
        if (update.notes !== undefined) memoryDb.recovery_items[idx].notes = update.notes;
        memoryDb.recovery_items[idx].updatedAt = new Date().toISOString();
      }
    }

    // Recalculate project ledger
    const items = memoryDb.recovery_items.filter(i => (i.projectId || i.project_id) === projectId);
    const calculatedLedger = calculateProjectLedger(items);

    const ledgerIdx = memoryDb.project_ledgers.findIndex(l => (l.projectId || l.project_id) === projectId);
    if (ledgerIdx !== -1) {
      memoryDb.project_ledgers[ledgerIdx] = {
        ...memoryDb.project_ledgers[ledgerIdx],
        ...calculatedLedger,
        updatedAt: new Date().toISOString()
      };
    } else {
      memoryDb.project_ledgers.push({
        id: uuidv4(),
        projectId,
        ...calculatedLedger,
        updatedAt: new Date().toISOString()
      });
    }

    saveLocalDb();
    return {
      items,
      ledger: memoryDb.project_ledgers.find(l => (l.projectId || l.project_id) === projectId)
    };
  },

  async updateSequenceStep(projectId, stepId, isCompleted) {
    const seq = memoryDb.recovery_sequences.find(s => s.id === stepId && (s.projectId || s.project_id) === projectId);
    if (seq) {
      seq.isCompleted = Boolean(isCompleted);
      saveLocalDb();
      return seq;
    }
    return null;
  },

  async loadDemoProject() {
    seedDemoProjectInternal();
    return this.getProjectById('demo-project-abc-tech-park');
  },

  async recordAdminAuditLog(logEntry) {
    if (!memoryDb.admin_audit_logs) memoryDb.admin_audit_logs = [];
    const entry = {
      id: uuidv4(),
      timestamp: new Date().toISOString(),
      ...logEntry
    };
    memoryDb.admin_audit_logs.unshift(entry);
    if (memoryDb.admin_audit_logs.length > 100) memoryDb.admin_audit_logs.pop();
    saveLocalDb();
    return entry;
  },

  async getAdminAuditLogs() {
    if (!memoryDb.admin_audit_logs || memoryDb.admin_audit_logs.length === 0) {
      memoryDb.admin_audit_logs = [
        {
          id: 'log-seed-1',
          timestamp: new Date().toISOString(),
          action: 'SYSTEM_BOOT',
          details: 'RECLAIM X Circularity Engine initialized',
          projectContext: 'System'
        }
      ];
    }
    return memoryDb.admin_audit_logs;
  },

  async getAdminSystemStats() {
    const totalProjects = memoryDb.projects?.length || 0;
    const totalItems = memoryDb.recovery_items?.length || 0;
    const totalSequences = memoryDb.recovery_sequences?.length || 0;
    let totalDivertedTonnes = 0;
    let totalNetValue = 0;

    for (const ledger of (memoryDb.project_ledgers || [])) {
      totalDivertedTonnes += Number(ledger.wasteDivertedTonnes || ledger.waste_diverted_tonnes || 0);
      totalNetValue += Number(ledger.predictedNetValue || ledger.predicted_net_value || 0);
    }

    const auditCount = memoryDb.admin_audit_logs ? memoryDb.admin_audit_logs.length : 1;

    return {
      totalProjects,
      totalRecoveryStreams: totalItems,
      totalSequenceSteps: totalSequences,
      totalDivertedTonnes: Number(totalDivertedTonnes.toFixed(2)),
      totalProjectedSalvageNetValue: Math.round(totalNetValue),
      auditEventsRecorded: auditCount
    };
  }
};
