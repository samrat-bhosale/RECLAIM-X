-- RECLAIM X — Database Schema Migration
-- AI-Powered Circularity and Material Recovery Platform for Construction & Demolition

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Projects Table
CREATE TABLE IF NOT EXISTS projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    name TEXT NOT NULL,
    location TEXT NOT NULL,
    building_type TEXT NOT NULL,
    area_sqft NUMERIC NOT NULL CHECK (area_sqft > 0),
    status TEXT NOT NULL DEFAULT 'Planning' CHECK (status IN ('Planning', 'Pre-Demolition', 'Salvage in Progress', 'Completed')),
    site_notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Recovery Items Table
CREATE TABLE IF NOT EXISTS recovery_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    item_name TEXT NOT NULL,
    material_category TEXT NOT NULL,
    predicted_qty NUMERIC NOT NULL DEFAULT 0,
    actual_recovered_qty NUMERIC NOT NULL DEFAULT 0,
    damaged_qty NUMERIC NOT NULL DEFAULT 0,
    unit TEXT NOT NULL,
    condition_rating TEXT NOT NULL CHECK (condition_rating IN ('A', 'B', 'C', 'D')),
    unit_resale_value NUMERIC NOT NULL DEFAULT 0,
    tipping_fee_per_unit NUMERIC NOT NULL DEFAULT 0,
    labor_cost_per_unit NUMERIC NOT NULL DEFAULT 0,
    recovery_priority_score INTEGER NOT NULL DEFAULT 50 CHECK (recovery_priority_score BETWEEN 0 AND 100),
    confidence_score NUMERIC(3, 2) NOT NULL DEFAULT 0.70 CHECK (confidence_score BETWEEN 0 AND 1.00),
    estimation_basis TEXT NOT NULL DEFAULT 'Statistical Inference' CHECK (estimation_basis IN ('Visible Evidence', 'Statistical Inference', 'User Provided Data')),
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. Recovery Sequences Table
CREATE TABLE IF NOT EXISTS recovery_sequences (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    step_number INTEGER NOT NULL,
    action_title TEXT NOT NULL,
    target_category TEXT NOT NULL,
    justification TEXT NOT NULL,
    risk_if_delayed TEXT NOT NULL,
    is_completed BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. Project Ledgers Table
CREATE TABLE IF NOT EXISTS project_ledgers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL UNIQUE REFERENCES projects(id) ON DELETE CASCADE,
    predicted_gross_revenue NUMERIC NOT NULL DEFAULT 0,
    predicted_disposal_savings NUMERIC NOT NULL DEFAULT 0,
    predicted_recovery_cost NUMERIC NOT NULL DEFAULT 0,
    predicted_net_value NUMERIC NOT NULL DEFAULT 0,
    actual_revenue NUMERIC NOT NULL DEFAULT 0,
    actual_disposal_savings NUMERIC NOT NULL DEFAULT 0,
    actual_recovery_cost NUMERIC NOT NULL DEFAULT 0,
    actual_net_value NUMERIC NOT NULL DEFAULT 0,
    profit_gap NUMERIC NOT NULL DEFAULT 0,
    waste_diverted_tonnes NUMERIC NOT NULL DEFAULT 0,
    ai_root_cause_summary TEXT,
    ai_counterfactual_recommendation TEXT,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable Row Level Security (RLS) on all tables
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE recovery_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE recovery_sequences ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_ledgers ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Projects policy
CREATE POLICY "Users can only access their own projects"
    ON projects
    FOR ALL
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- Recovery Items policy: users can only access items of their projects
CREATE POLICY "Users can only access items belonging to their projects"
    ON recovery_items
    FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM projects
            WHERE projects.id = recovery_items.project_id
            AND projects.user_id = auth.uid()
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM projects
            WHERE projects.id = recovery_items.project_id
            AND projects.user_id = auth.uid()
        )
    );

-- Recovery Sequences policy
CREATE POLICY "Users can only access sequences belonging to their projects"
    ON recovery_sequences
    FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM projects
            WHERE projects.id = recovery_sequences.project_id
            AND projects.user_id = auth.uid()
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM projects
            WHERE projects.id = recovery_sequences.project_id
            AND projects.user_id = auth.uid()
        )
    );

-- Project Ledgers policy
CREATE POLICY "Users can only access ledgers belonging to their projects"
    ON project_ledgers
    FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM projects
            WHERE projects.id = project_ledgers.project_id
            AND projects.user_id = auth.uid()
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM projects
            WHERE projects.id = project_ledgers.project_id
            AND projects.user_id = auth.uid()
        )
    );

-- Indexes for optimal query performance
CREATE INDEX IF NOT EXISTS idx_projects_user_id ON projects(user_id);
CREATE INDEX IF NOT EXISTS idx_recovery_items_project_id ON recovery_items(project_id);
CREATE INDEX IF NOT EXISTS idx_recovery_sequences_project_id ON recovery_sequences(project_id);
CREATE INDEX IF NOT EXISTS idx_project_ledgers_project_id ON project_ledgers(project_id);
