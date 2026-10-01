import express from 'express';
import { dbService } from '../services/dbService.js';
import { analyzeSalvageWithGemini, diagnoseRecoveryGapWithGemini, simulateCounterfactualSequence } from '../services/geminiService.js';
import { AIAnalyzeInputSchema, DiagnoseGapInputSchema, CounterfactualInputSchema } from '../validation/schemas.js';

const router = express.Router();

// POST /api/v1/ai/analyze-salvage
router.post('/analyze-salvage', async (req, res) => {
  try {
    const parsed = AIAnalyzeInputSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: parsed.error.issues
      });
    }

    const inputData = parsed.data;
    const projectRecord = await dbService.getProjectById(inputData.projectId);
    if (!projectRecord) {
      return res.status(404).json({ success: false, error: 'Project not found' });
    }

    // Call Gemini intelligence engine
    const analysisResult = await analyzeSalvageWithGemini(inputData);

    // Persist analysis to database
    const saved = await dbService.saveRecoveryAnalysis(inputData.projectId, analysisResult);

    // Update project status to 'Pre-Demolition' if currently 'Planning'
    if (projectRecord.project.status === 'Planning') {
      await dbService.updateProject(inputData.projectId, { status: 'Pre-Demolition' });
    }

    res.json({
      success: true,
      data: {
        analysis: analysisResult,
        savedData: saved
      }
    });
  } catch (error) {
    console.error('[RECLAIM X] Error in analyze-salvage:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST /api/v1/ai/diagnose-gap
router.post('/diagnose-gap', async (req, res) => {
  try {
    const parsed = DiagnoseGapInputSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: parsed.error.issues
      });
    }

    const { projectId, userNotes } = parsed.data;
    const projectData = await dbService.getProjectById(projectId);
    if (!projectData) {
      return res.status(404).json({ success: false, error: 'Project not found' });
    }

    const diagnosis = await diagnoseRecoveryGapWithGemini(
      projectData.project,
      projectData.items,
      projectData.ledger,
      userNotes
    );

    res.json({ success: true, data: diagnosis });
  } catch (error) {
    console.error('[RECLAIM X] Error in diagnose-gap:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST /api/v1/ai/simulate-counterfactual
router.post('/simulate-counterfactual', async (req, res) => {
  try {
    const parsed = CounterfactualInputSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: parsed.error.issues
      });
    }

    const { projectId, sequence } = parsed.data;
    const projectData = await dbService.getProjectById(projectId);
    if (!projectData) {
      return res.status(404).json({ success: false, error: 'Project not found' });
    }

    const simulation = simulateCounterfactualSequence(projectData.items, sequence);
    res.json({ success: true, data: simulation });
  } catch (error) {
    console.error('[RECLAIM X] Error in simulate-counterfactual:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
