import { z } from 'zod';

export const BuildingTypeEnum = z.enum([
  'Commercial',
  'Residential',
  'Industrial',
  'Institutional',
  'Infrastructure',
  'Mixed-Use'
]);

export const ProjectStatusEnum = z.enum([
  'Planning',
  'Pre-Demolition',
  'Salvage in Progress',
  'Completed'
]);

export const EstimationBasisEnum = z.enum([
  'Visible Evidence',
  'Statistical Inference',
  'User Provided Data'
]);

export const ConditionRatingEnum = z.enum(['A', 'B', 'C', 'D']);

export const ConfidenceLevelEnum = z.enum(['clearly_visible', 'likely', 'uncertain']);

export const DetectedMaterialSchema = z.object({
  id: z.string().optional(),
  material: z.string().min(1),
  category: z.string().optional().default('General Materials'),
  confidence: z.number().min(0).max(1),
  confidenceLevel: ConfidenceLevelEnum.optional().default('likely'),
  evidence: z.string().min(1),
  recoverability: z.string().optional().default('potentially_recoverable'),
  estimatedCondition: ConditionRatingEnum.optional().default('B'),
  suggestedQuantityHint: z.string().optional(),
  included: z.boolean().optional().default(true)
});

export const DetectMaterialsInputSchema = z.object({
  images: z.array(z.object({
    data: z.string(), // base64 string
    mimeType: z.string().optional().default('image/jpeg'),
    name: z.string().optional().default('site-image.jpg')
  })).min(1, 'At least one image must be provided'),
  projectContext: z.object({
    name: z.string().optional(),
    location: z.string().optional(),
    buildingType: z.string().optional(),
    areaSqft: z.number().optional()
  }).optional()
});

export const CreateProjectSchema = z.object({
  name: z.string().min(2, 'Project name is required'),
  location: z.string().min(2, 'Location is required'),
  buildingType: BuildingTypeEnum,
  areaSqft: z.number().positive('Area must be greater than 0'),
  status: ProjectStatusEnum.default('Planning'),
  siteNotes: z.string().optional().default(''),
  siteImages: z.array(z.object({
    name: z.string().optional(),
    data: z.string().optional(),
    preview: z.string().optional()
  })).optional().default([]),
  confirmedMaterials: z.array(DetectedMaterialSchema).optional().default([])
});

export const UpdateProjectSchema = CreateProjectSchema.partial();

export const AIAnalyzeInputSchema = z.object({
  projectId: z.string().min(1, 'Project ID is required'),
  buildingType: BuildingTypeEnum,
  areaSqft: z.number().positive(),
  location: z.string().min(1),
  siteNotes: z.string().optional().default(''),
  confirmedMaterials: z.array(DetectedMaterialSchema).optional().default([])
});

export const EstimatedItemSchema = z.object({
  itemName: z.string(),
  category: z.string(),
  predictedQty: z.number().nonnegative(),
  unit: z.string(),
  conditionRating: ConditionRatingEnum,
  unitResaleValue: z.number().nonnegative(),
  tippingFeeAvoidedPerUnit: z.number().nonnegative(),
  extractionLaborCostPerUnit: z.number().nonnegative(),
  priorityScore: z.number().min(0).max(100),
  confidenceScore: z.number().min(0).max(1),
  estimationBasis: EstimationBasisEnum
});

export const RecommendedSequenceItemSchema = z.object({
  stepNumber: z.number().int().positive(),
  actionTitle: z.string(),
  targetCategory: z.string(),
  operationalJustification: z.string(),
  riskIfDelayed: z.string()
});

export const MacroFinancialProjectionSchema = z.object({
  estimatedGrossRevenue: z.number(),
  estimatedDisposalSavings: z.number(),
  estimatedSelectiveLaborCost: z.number(),
  projectedNetProfit: z.number()
});

export const AIAnalyzeOutputSchema = z.object({
  estimatedItems: z.array(EstimatedItemSchema),
  recommendedSequence: z.array(RecommendedSequenceItemSchema),
  macroFinancialProjection: MacroFinancialProjectionSchema
});

export const UpdateRecoveryItemsSchema = z.object({
  items: z.array(z.object({
    id: z.string(),
    actualRecoveredQty: z.number().nonnegative().optional(),
    damagedQty: z.number().nonnegative().optional(),
    notes: z.string().optional()
  }))
});

export const DiagnoseGapInputSchema = z.object({
  projectId: z.string().min(1),
  userNotes: z.string().optional().default('')
});

export const CounterfactualInputSchema = z.object({
  projectId: z.string().min(1),
  sequence: z.array(z.object({
    stepNumber: z.number(),
    actionTitle: z.string(),
    targetCategory: z.string()
  }))
});
