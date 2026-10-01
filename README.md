# RECLAIM X 🌿🏗️

> **Predict what can be saved. Prove what was saved. Measure what was recovered.**

[![AI Engine](https://img.shields.io/badge/AI-Google%20Gemini-06b6d4)](https://aistudio.google.com/)
[![Circularity Platform](https://img.shields.io/badge/Platform-C%26D%20Circularity-10b981)](https://github.com/)
[![Stack](https://img.shields.io/badge/Stack-React%20%2B%20Vite%20%7C%20Node%20Express-3b82f6)](https://nodejs.org/)
[![Database](https://img.shields.io/badge/DB-Supabase%20PostgreSQL-3ecf8e)](https://supabase.com/)

**RECLAIM X** is an AI-powered circularity and material recovery platform for Construction & Demolition (C&D). It bridges the critical **Recovery Gap** by helping demolition contractors, circularity teams, and project owners plan deconstruction, quantify expected versus actual recovery, diagnose lost circular value, and simulate optimal salvage sequences.

---

## 🧭 The Core Problem: The Recovery Gap

Demolition projects generate massive volumes of recyclable and reusable architectural and structural materials. However, contractors frequently face a structural information asymmetry:
1. **Uncertainty:** Contractors do not know before demolition which materials can realistically be saved.
2. **Timing & Sequence:** Failure to extract soft assets (doors, glazing, fixtures) *before* heavy equipment operations causes high impact shatter and contamination.
3. **The Recovery Gap:**
   $$\text{Expected Recovery} \longrightarrow \text{Actual Recovery} \longrightarrow \text{Lost Material \& Economic Opportunity}$$
4. **Economic Blindspot:** Disposal fees avoided and salvage revenues are rarely modeled together against labor extraction costs.

**RECLAIM X makes this gap visible, measurable, and actionable.**

---

## 🔄 The Complete Circularity Loop

```
        ┌──────────────────────────────────────────────┐
        │                    PLAN                      │
        │  AI Pre-Demolition Audit & Material Yields   │
        └──────────────────────┬───────────────────────┘
                               │
                               ▼
        ┌──────────────────────────────────────────────┐
        │                   RECOVER                    │
        │   Sequenced Deconstruction Milestones        │
        └──────────────────────┬───────────────────────┘
                               │
                               ▼
        ┌──────────────────────────────────────────────┐
        │                   MEASURE                    │
        │    Field Actuals, Recovery Gap & Ledgers     │
        └──────────────────────┬───────────────────────┘
                               │
                               ▼
        ┌──────────────────────────────────────────────┐
        │                    LEARN                     │
        │  Gemini Root-Cause AI & Counterfactual Sim   │
        └──────────────────────────────────────────────┘
```

---

## ⚡ Core Features & MVP Capabilities

1. **Dashboard & Executive KPIs:**
   - Real-time aggregation of Potential Recovery Value, Actual Reclaimed Value, Recovery Gap Deficit, and Landfill Waste Diverted (Tonnes).
   - **1-Click Judge Demo Loader** for immediate presentation without manual data entry.

2. **Pre-Demolition AI Salvage Intelligence:**
   - Powered by Google Gemini AI (with built-in calibrated statistical fallback engine).
   - Classifies architectural wood, aluminium frames, structural steel, electrical fixtures, and ceramics.
   - Outputs quantity, unit resale value, tipping fee avoided, extraction labor cost, priority score, and confidence percentage.
   - Assigns explicit **Estimation Basis** tags (`Visible Evidence`, `Statistical Inference`, `User Provided Data`).

3. **Recommended Deconstruction Sequence:**
   - Sequenced chronological cards prioritizing non-structural soft-stripping prior to heavy equipment mobilization.
   - Highlights operational justification and explicit **"Risk if delayed"** impact warnings.

4. **Transparent Circular Economic Accounting:**
   $$\text{Gross Salvage Revenue} = \sum (\text{Recovered Qty} \times \text{Resale Value})$$
   $$\text{Disposal Cost Avoided} = \text{Diverted Material} \times \text{Disposal Tipping Fee}$$
   $$\text{Recovery Cost} = \text{Labor Cost} + \text{Logistics Cost}$$
   $$\mathbf{Potential\ Net\ Recovery\ Value} = \text{Gross Salvage Revenue} + \text{Disposal Cost Avoided} - \text{Recovery Cost}$$

5. **Field Actuals & Recovery Gap Calculator:**
   - Inline editable logging of Actual Recovered, Damaged, and Unrecovered material.
   - Instant live calculation of **Recovery Gap** $(\text{Predicted} - \text{Actual})$ and **Potential Value Lost** (₹).

6. **Circularity Control Tower:**
   - Multi-stream yield comparison bars (Predicted vs. Recovered vs. Damaged).
   - Recovery Accuracy gauge (%) and Landfill Diversion tonnage tracker.

7. **Root-Cause Analysis Engine & Counterfactual Simulator:**
   - **Root Cause AI:** Gemini diagnoses site bottlenecks, sequence overlap, and machinery vibration damage.
   - **What-If Simulator:** Reorder deconstruction steps using drag/arrow controls to simulate sensitivity to premature mechanical wrecking.
   - Strictly labeled: *"Scenario estimate — not a guaranteed outcome."*

---

## 🏛️ Technical Architecture

```
                       React + Vite + Tailwind CSS
                                   │
                                   ▼
                            Express.js API
                                   │
                    ┌──────────────┴──────────────┐
                    ▼                             ▼
             Supabase Auth / DB             Zod Validation
             (or In-Memory Store)                 │
                    │                             ▼
                    └──────────────┬──────────────┘
                                   │
                                   ▼
                         Google Gemini AI API
                    (Pre-Demolition Audit & Diagnosis)
```

---

## 🚀 Quickstart & Running Locally

### Prerequisites
- Node.js (v20+ recommended)
- npm or yarn

### 1. Installation
Clone the repository and install all dependencies:
```bash
# Install root dependencies
npm install

# Install client dependencies
cd client && npm install && cd ..

# Install server dependencies
cd server && npm install && cd ..
```

### 2. Configure Environment Variables
Copy `.env.example` to `server/.env`:
```bash
cp .env.example server/.env
```
*(Optional: add your `GEMINI_API_KEY` from Google AI Studio. If left blank, RECLAIM X automatically runs its high-precision calibrated statistical engine so the demo operates flawlessly with zero setup hurdles!)*

### 3. Launch Development Environment
Run both backend Express server and Vite frontend concurrently:
```bash
npm run dev
```

- **Frontend Client (Vite):** [http://localhost:5173](http://localhost:5173)
- **Backend API (Express):** [http://localhost:5001](http://localhost:5001)
- **Health Check:** [http://localhost:5001/api/health](http://localhost:5001/api/health)

---

## ⏱️ 3-Minute Hackathon Judge Demo Walkthrough

1. Open [http://localhost:5173](http://localhost:5173).
2. Click the glowing **"Load Demo Project"** button in the navbar or hero card.
   - Instantly loads *ABC Tech Park (Pune, Maharashtra)* — 12,000 sq.ft. commercial facility.
3. Switch to the **AI Intelligence** tab:
   - Observe the 5 recoverable material streams, priority scores, and Estimation Basis badges.
   - Review the 6-step recommended deconstruction sequence.
4. Click **Economics** to inspect the mathematical breakdown of Gross Salvage, Tipping Fees Avoided, and Selective Labor Costs.
5. Click **Actuals & Gap** to view the live editable ledger where actual vs. damaged material creates the **Recovery Gap**.
6. Click **Control Tower** to review circularity realization and landfill diversion metrics.
7. Click **Root Cause & Sim**:
   - Click **"Ask Gemini: Why Was Recovery Lost?"** for instant AI diagnosis.
   - Reorder the sequence steps (e.g. move Heavy Demolition earlier) and click **"Simulate Changed Sequence"** to test sensitivity projections.

---

## 🛡️ AI Safety, Ethics & Calibration Rules

In strict adherence to the RECLAIM X PRD specification:
- **No Hallucinated Safety Claims:** The engine never certifies structural integrity or claims that materials are safe for structural reuse without on-site licensed professional inspection.
- **Estimation Basis Transparency:** Every generated projection is labeled with its derivation basis:
  - `Visible Evidence`: Direct inspection logs
  - `Statistical Inference`: Building typology models
  - `User Provided Data`: Field measurements
- **Scenario Estimates Disclaimer:** All counterfactual simulation numbers are explicitly watermarked as non-binding sensitivity estimates.

---

## 🔮 Future Scope
- Computer vision aerial & smartphone site scanning for automated volumetric estimation.
- Direct integration with certified B2B circular secondary-material marketplaces.
- Live regional landfill tipping fee index feeds.
- Automated embodied carbon (Scope 3) avoided certificates.

---

## 📄 License
MIT License. Built for the Hackathon by the RECLAIM X Team.
