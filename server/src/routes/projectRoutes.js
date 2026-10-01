import express from 'express';
import { dbService } from '../services/dbService.js';
import { CreateProjectSchema, UpdateProjectSchema, UpdateRecoveryItemsSchema } from '../validation/schemas.js';

const router = express.Router();

// GET all projects
router.get('/', async (req, res) => {
  try {
    const projects = await dbService.getAllProjects();
    res.json({ success: true, data: projects });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST Load/Reset Demo Project (PRD Section 5.B & 14)
router.post('/demo', async (req, res) => {
  try {
    const demo = await dbService.loadDemoProject();
    res.json({ success: true, message: 'Demo project loaded successfully', data: demo });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET Project details by ID
router.get('/:id', async (req, res) => {
  try {
    const projectData = await dbService.getProjectById(req.params.id);
    if (!projectData) {
      return res.status(404).json({ success: false, error: 'Project not found' });
    }
    res.json({ success: true, data: projectData });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST Create new project
router.post('/', async (req, res) => {
  try {
    const parsed = CreateProjectSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: parsed.error.issues
      });
    }

    const created = await dbService.createProject(parsed.data);
    res.status(201).json({ success: true, data: created });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// PATCH Update project
router.patch('/:id', async (req, res) => {
  try {
    const parsed = UpdateProjectSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: parsed.error.issues
      });
    }

    const updated = await dbService.updateProject(req.params.id, parsed.data);
    if (!updated) {
      return res.status(404).json({ success: false, error: 'Project not found' });
    }
    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// DELETE Project
router.delete('/:id', async (req, res) => {
  try {
    await dbService.deleteProject(req.params.id);
    res.json({ success: true, message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// PATCH Actual Recovery Items (PRD Section 12)
router.patch('/:id/recovery-items', async (req, res) => {
  try {
    const parsed = UpdateRecoveryItemsSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: parsed.error.issues
      });
    }

    const result = await dbService.updateActualRecovery(req.params.id, parsed.data.items);
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// PATCH Toggle Sequence completion
router.patch('/:id/sequences/:stepId', async (req, res) => {
  try {
    const { isCompleted } = req.body;
    const updated = await dbService.updateSequenceStep(req.params.id, req.params.stepId, isCompleted);
    if (!updated) {
      return res.status(404).json({ success: false, error: 'Sequence step not found' });
    }
    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
