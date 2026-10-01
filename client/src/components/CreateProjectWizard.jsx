import React, { useState } from 'react';
import {
  Building2,
  MapPin,
  Layers,
  Upload,
  Image as ImageIcon,
  X,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Plus,
  ArrowRight,
  ArrowLeft,
  Cpu,
  Trash2,
  Check,
  Edit2
} from 'lucide-react';
import { useProject } from '../context/ProjectContext';

// Built-in realistic sample site photos for instant 1-click test by hackathon judges
const SAMPLE_DEMO_IMAGES = [
  {
    name: 'commercial_bay_glazing.jpg',
    mimeType: 'image/jpeg',
    preview: 'https://images.unsplash.com/photo-1541888946425-d0fbb18615f3?w=600&auto=format&fit=crop&q=80',
    data: 'sample_glazing_base64_marker'
  },
  {
    name: 'interior_hallway_timber_doors.jpg',
    mimeType: 'image/jpeg',
    preview: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&auto=format&fit=crop&q=80',
    data: 'sample_timber_base64_marker'
  },
  {
    name: 'structural_steel_framing.jpg',
    mimeType: 'image/jpeg',
    preview: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&auto=format&fit=crop&q=80',
    data: 'sample_steel_base64_marker'
  }
];

export default function CreateProjectWizard() {
  const { createProject, detectSiteMaterials, setActiveTab, showNotification } = useProject();

  const [currentStep, setCurrentStep] = useState(1);

  // Step 1: Project Details
  const [details, setDetails] = useState({
    name: '',
    location: '',
    buildingType: 'Commercial',
    areaSqft: ''
  });

  // Step 2: Uploaded Site Images
  const [uploadedImages, setUploadedImages] = useState([]);
  const [isDragOver, setIsDragOver] = useState(false);

  // Step 3: AI Detection State & Progress
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgressText, setAnalysisProgressText] = useState('');

  // Step 4: Detected & Confirmed Materials
  const [detectedMaterials, setDetectedMaterials] = useState([]);
  const [unclearNotice, setUnclearNotice] = useState(null);
  const [newMaterialName, setNewMaterialName] = useState('');
  const [isAddingCustom, setIsAddingCustom] = useState(false);

  // Step 5: Final Submission
  const [isSubmitting, setIsSubmitting] = useState(false);

  // File Upload Handlers (Supports JPG, JPEG, PNG, WebP)
  const handleFileSelection = (files) => {
    const validFiles = Array.from(files).filter(file => 
      file.type.match(/^image\/(jpeg|jpg|png|webp)$/i)
    );

    if (validFiles.length === 0) {
      showNotification('Please upload valid images (JPG, PNG, or WebP)', 'error');
      return;
    }

    validFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64Data = e.target.result;
        setUploadedImages(prev => [
          ...prev,
          {
            name: file.name,
            mimeType: file.type,
            preview: base64Data,
            data: base64Data
          }
        ]);
      };
      reader.readAsDataURL(file);
    });

    showNotification(`Added ${validFiles.length} photo(s)`, 'success');
  };

  const removeImage = (index) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };

  const loadSamplePhotos = () => {
    setUploadedImages(SAMPLE_DEMO_IMAGES);
    showNotification('Sample commercial demolition site photos loaded', 'info');
  };

  // Step 3: Run AI Image Material Identification
  const handleAnalyzeImages = async () => {
    if (uploadedImages.length === 0) {
      showNotification('Please upload at least one site photo', 'error');
      return;
    }

    try {
      setIsAnalyzing(true);
      setCurrentStep(3);

      setAnalysisProgressText('Analyzing site images...');
      await new Promise(r => setTimeout(r, 600));

      setAnalysisProgressText('Identifying visible materials from visual assemblies...');
      await new Promise(r => setTimeout(r, 600));

      const response = await detectSiteMaterials(uploadedImages, {
        name: details.name,
        location: details.location,
        buildingType: details.buildingType,
        areaSqft: Number(details.areaSqft) || 10000
      });

      setAnalysisProgressText('Assessing recovery opportunities & confidence scores...');
      await new Promise(r => setTimeout(r, 400));

      setDetectedMaterials(response.detectedMaterials || []);
      setUnclearNotice(response.unclearImageNotice || null);
      
      setCurrentStep(4);
    } catch (err) {
      console.error(err);
      showNotification('Image analysis encountered an issue', 'error');
      setCurrentStep(2);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Step 4: Toggle material inclusion
  const toggleMaterialIncluded = (id) => {
    setDetectedMaterials(prev => prev.map(m => 
      m.id === id ? { ...m, included: !m.included } : m
    ));
  };

  // Step 4: Add custom material
  const handleAddCustomMaterial = () => {
    if (!newMaterialName.trim()) return;
    const newEntry = {
      id: `custom-${Date.now()}`,
      material: newMaterialName.trim(),
      category: 'User Added Material',
      confidence: 1.0,
      confidenceLevel: 'clearly_visible',
      evidence: 'Directly verified on site by project manager',
      recoverability: 'potentially_recoverable',
      estimatedCondition: 'B',
      included: true
    };
    setDetectedMaterials(prev => [newEntry, ...prev]);
    setNewMaterialName('');
    setIsAddingCustom(false);
    showNotification(`Added ${newEntry.material}`, 'success');
  };

  // Remove material
  const removeMaterialItem = (id) => {
    setDetectedMaterials(prev => prev.filter(m => m.id !== id));
  };

  // Step 5: Final Submission
  const handleFinalSubmit = async () => {
    try {
      setIsSubmitting(true);
      const confirmed = detectedMaterials.filter(m => m.included !== false);

      const projectPayload = {
        name: details.name,
        location: details.location,
        buildingType: details.buildingType,
        areaSqft: Number(details.areaSqft),
        siteNotes: `Verified ${confirmed.length} recoverable material streams from uploaded site photos.`,
        siteImages: uploadedImages.map(img => ({ name: img.name, preview: img.preview })),
        confirmedMaterials: confirmed
      };

      await createProject(projectPayload, true);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const stepsList = [
    { num: 1, title: 'Project Details' },
    { num: 2, title: 'Upload Site Photos' },
    { num: 3, title: 'AI Detection' },
    { num: 4, title: 'Confirm Materials' },
    { num: 5, title: 'Review & Create' }
  ];

  return (
    <div className="max-w-3xl mx-auto py-4 space-y-8 animate-in fade-in duration-300">
      
      {/* Wizard Progress Bar */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-slate-400 font-medium px-1">
          {stepsList.map(step => (
            <span
              key={step.num}
              className={`flex items-center gap-1.5 ${
                currentStep === step.num
                  ? 'text-emerald-400 font-bold'
                  : currentStep > step.num
                  ? 'text-slate-300'
                  : 'text-slate-600'
              }`}
            >
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                currentStep > step.num
                  ? 'bg-emerald-500 text-slate-950 font-bold'
                  : currentStep === step.num
                  ? 'border border-emerald-400 text-emerald-400 font-bold'
                  : 'border border-slate-700 text-slate-500'
              }`}>
                {currentStep > step.num ? '✓' : step.num}
              </span>
              <span className="hidden sm:inline">{step.title}</span>
            </span>
          ))}
        </div>

        <div className="w-full bg-slate-800/80 rounded-full h-1.5 overflow-hidden">
          <div
            className="bg-emerald-500 h-full rounded-full transition-all duration-300"
            style={{ width: `${((currentStep - 1) / 4) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* STEP 1: Project Details */}
      {currentStep === 1 && (
        <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-6">
          <div>
            <h2 className="text-xl font-bold font-heading text-white">
              Step 1: Demolition Project Specifications
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Enter primary location, structure typology, and gross area to calibrate baseline material calculations.
            </p>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Project Name <span className="text-emerald-400">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Sterling Commercial Plaza Demolition"
                value={details.name}
                onChange={(e) => setDetails({ ...details, name: e.target.value })}
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500 transition"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Location / City <span className="text-emerald-400">*</span>
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-500 absolute left-3.5 top-2.5" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Pune, Maharashtra"
                    value={details.location}
                    onChange={(e) => setDetails({ ...details, location: e.target.value })}
                    className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Building Typology <span className="text-emerald-400">*</span>
                </label>
                <select
                  value={details.buildingType}
                  onChange={(e) => setDetails({ ...details, buildingType: e.target.value })}
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500 transition"
                >
                  <option value="Commercial">Commercial (Office / Retail)</option>
                  <option value="Residential">Residential (Apartments / Housing)</option>
                  <option value="Industrial">Industrial (Warehouses / Plants)</option>
                  <option value="Institutional">Institutional (Schools / Labs)</option>
                  <option value="Mixed-Use">Mixed-Use Facility</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Approximate Area (Sq.Ft.) <span className="text-emerald-400">*</span>
              </label>
              <div className="relative">
                <Layers className="w-4 h-4 text-slate-500 absolute left-3.5 top-2.5" />
                <input
                  type="number"
                  min="100"
                  step="500"
                  required
                  placeholder="e.g. 12000"
                  value={details.areaSqft}
                  onChange={(e) => setDetails({ ...details, areaSqft: e.target.value })}
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500 transition"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 flex justify-end">
            <button
              onClick={() => {
                if (!details.name.trim() || !details.location.trim() || !details.areaSqft) {
                  showNotification('Please fill in all project fields', 'error');
                  return;
                }
                setCurrentStep(2);
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition"
            >
              Next: Upload Site Photos
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: Upload Site Images (Section 4 & 12) */}
      {currentStep === 2 && (
        <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-6">
          <div>
            <h2 className="text-xl font-bold font-heading text-white">
              Step 2: Upload Site Photos for Material Identification
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed mt-1">
              Upload photos of the site, materials, rooms, structures, or demolition area.
              RECLAIM X will analyze the images and identify potentially recoverable materials.
            </p>
          </div>

          {/* Drag & Drop Upload Zone */}
          <div
            onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
            onDragLeave={() => setIsDragOver(false)}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragOver(false);
              handleFileSelection(e.dataTransfer.files);
            }}
            className={`border-2 border-dashed rounded-2xl p-8 text-center transition flex flex-col items-center justify-center space-y-3 ${
              isDragOver
                ? 'border-emerald-400 bg-emerald-500/10'
                : 'border-slate-700 bg-slate-950/60 hover:border-slate-600'
            }`}
          >
            <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-emerald-400">
              <Upload className="w-6 h-6" />
            </div>

            <div>
              <p className="text-xs font-semibold text-slate-200">
                Drag & drop photos here, or click below
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Supported formats: JPG, JPEG, PNG, WebP
              </p>
            </div>

            <label className="cursor-pointer px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition">
              <span>Choose Images</span>
              <input
                type="file"
                multiple
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={(e) => handleFileSelection(e.target.files)}
              />
            </label>
          </div>

          {/* Pre-Loaded Demo Option */}
          <div className="flex items-center justify-between text-xs bg-slate-950/70 p-3.5 rounded-xl border border-slate-800">
            <span className="text-slate-400">
              Need immediate photos for testing?
            </span>
            <button
              type="button"
              onClick={loadSamplePhotos}
              className="text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Use Sample Demolition Photos (3)
            </button>
          </div>

          {/* Uploaded Photos Thumbnails Preview */}
          {uploadedImages.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-300">
                <span>Selected Photos ({uploadedImages.length})</span>
                <button
                  onClick={() => setUploadedImages([])}
                  className="text-slate-400 hover:text-rose-400 text-[11px]"
                >
                  Clear all
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {uploadedImages.map((img, index) => (
                  <div
                    key={index}
                    className="group relative rounded-xl overflow-hidden border border-slate-800 aspect-video bg-slate-950"
                  >
                    <img
                      src={img.preview}
                      alt={img.name}
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => removeImage(index)}
                      className="absolute top-1.5 right-1.5 p-1 rounded-lg bg-black/70 hover:bg-rose-900 text-white transition"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                    <span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded bg-black/60 text-[9px] text-slate-200 truncate max-w-[85%]">
                      {img.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            <button
              onClick={() => setCurrentStep(1)}
              className="px-4 py-2.5 rounded-xl text-xs text-slate-400 hover:text-white flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back
            </button>

            <button
              onClick={handleAnalyzeImages}
              disabled={uploadedImages.length === 0}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition disabled:opacity-40"
            >
              <Cpu className="w-4 h-4" />
              Analyze Images with AI
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: AI Analyzing Progress Screen (Section 13) */}
      {currentStep === 3 && (
        <div className="p-12 rounded-2xl bg-slate-900/60 border border-slate-800 text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto animate-pulse">
            <Cpu className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-bold font-heading text-white">
              AI Vision Analysis in Progress
            </h2>
            <p className="text-xs text-emerald-400 font-mono">
              {analysisProgressText}
            </p>
            <p className="text-[11px] text-slate-400">
              Examining facade glazing, interior doorways, structural steel assemblies, and electrical infrastructure.
            </p>
          </div>
        </div>
      )}

      {/* STEP 4: User Confirmation Required (Sections 6 & 7) */}
      {currentStep === 4 && (
        <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <h2 className="text-xl font-bold font-heading text-white">
                Materials Detected from Your Images
              </h2>
            </div>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              Review and confirm the materials identified by the AI. You can include, exclude, or add custom materials before proceeding to the recovery assessment.
            </p>
          </div>

          {/* Graceful Unclear Image Handling (Section 7) */}
          {unclearNotice && (
            <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-500/30 flex items-start gap-2.5 text-xs text-amber-300">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>{unclearNotice}</span>
            </div>
          )}

          {/* Detected Materials List with Confidence & Confirmation */}
          <div className="space-y-3">
            {detectedMaterials.map((mat) => {
              const isHigh = mat.confidence >= 0.85;
              const isMedium = mat.confidence >= 0.65 && mat.confidence < 0.85;
              const isIncluded = mat.included !== false;

              return (
                <div
                  key={mat.id}
                  className={`p-4 rounded-xl border transition flex items-start justify-between gap-3 ${
                    isIncluded
                      ? 'bg-slate-950/80 border-slate-800'
                      : 'bg-slate-950/30 border-slate-900 opacity-50'
                  }`}
                >
                  <div className="flex items-start gap-3 flex-1">
                    <input
                      type="checkbox"
                      checked={isIncluded}
                      onChange={() => toggleMaterialIncluded(mat.id)}
                      className="mt-1 w-4 h-4 rounded text-emerald-500 focus:ring-0 cursor-pointer accent-emerald-500"
                    />

                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-white text-xs">
                          {mat.material}
                        </span>
                        
                        {/* Confidence score badge with explicit level (Section 5 & 6) */}
                        <span className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${
                          isHigh
                            ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                            : isMedium
                            ? 'bg-blue-500/15 text-blue-400 border-blue-500/30'
                            : 'bg-amber-500/15 text-amber-400 border-amber-500/30'
                        }`}>
                          {Math.round(mat.confidence * 100)}% Confidence • {
                            isHigh ? 'Clearly Visible' : isMedium ? 'Likely' : 'Uncertain Evidence'
                          }
                        </span>

                        <span className="text-[10px] text-slate-400">
                          {mat.category}
                        </span>
                      </div>

                      <p className="text-[11px] text-slate-300 leading-relaxed">
                        {mat.evidence}
                      </p>

                      {mat.suggestedQuantityHint && (
                        <p className="text-[10px] text-slate-400 italic">
                          Visual hint: {mat.suggestedQuantityHint}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => toggleMaterialIncluded(mat.id)}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold transition ${
                        isIncluded
                          ? 'bg-emerald-500/20 text-emerald-300 hover:bg-rose-500/20 hover:text-rose-300'
                          : 'bg-slate-800 text-slate-400 hover:bg-emerald-500/20 hover:text-emerald-300'
                      }`}
                    >
                      {isIncluded ? 'Included' : 'Excluded'}
                    </button>

                    <button
                      onClick={() => removeMaterialItem(mat.id)}
                      className="p-1 text-slate-500 hover:text-rose-400 transition"
                      title="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Add Custom Material Section */}
          {isAddingCustom ? (
            <div className="flex items-center gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
              <input
                type="text"
                placeholder="e.g. Copper plumbing pipes & brass valves..."
                value={newMaterialName}
                onChange={(e) => setNewMaterialName(e.target.value)}
                className="flex-1 bg-transparent text-xs text-white focus:outline-none"
              />
              <button
                onClick={handleAddCustomMaterial}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-500 text-slate-950"
              >
                Add
              </button>
              <button
                onClick={() => setIsAddingCustom(false)}
                className="px-2 py-1.5 rounded-lg text-xs text-slate-400"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsAddingCustom(true)}
              className="inline-flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 font-medium"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Unlisted Material Manually
            </button>
          )}

          {/* Navigation */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            <button
              onClick={() => setCurrentStep(2)}
              className="px-4 py-2.5 rounded-xl text-xs text-slate-400 hover:text-white flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Re-upload Photos
            </button>

            <button
              onClick={() => setCurrentStep(5)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition"
            >
              Proceed to Review
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 5: Final Review & Project Creation (Section 8) */}
      {currentStep === 5 && (
        <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-6">
          <div>
            <h2 className="text-xl font-bold font-heading text-white">
              Step 5: Review & Generate Recovery Assessment
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Verify your project configuration. Creating the project will immediately run the AI recovery intelligence engine.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 text-xs">
            <div className="grid grid-cols-2 gap-2 text-slate-300">
              <div>
                <span className="text-slate-500 block text-[10px] uppercase">Project Name</span>
                <span className="font-semibold text-white">{details.name}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase">Location</span>
                <span className="font-semibold text-white">{details.location}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase">Typology</span>
                <span className="font-semibold text-white">{details.buildingType}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase">Gross Area</span>
                <span className="font-semibold text-white">{Number(details.areaSqft).toLocaleString()} sq.ft.</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800/80">
              <span className="text-slate-500 block text-[10px] uppercase mb-1">Confirmed Material Streams ({detectedMaterials.filter(m => m.included !== false).length})</span>
              <div className="flex flex-wrap gap-1.5">
                {detectedMaterials.filter(m => m.included !== false).map(m => (
                  <span key={m.id} className="px-2 py-0.5 rounded bg-slate-800 text-[11px] text-emerald-300">
                    {m.material}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Final Submit Button */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            <button
              onClick={() => setCurrentStep(4)}
              className="px-4 py-2.5 rounded-xl text-xs text-slate-400 hover:text-white flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Edit Materials
            </button>

            <button
              onClick={handleFinalSubmit}
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition shadow-md shadow-emerald-500/20 disabled:opacity-50"
            >
              <Check className="w-4 h-4" />
              {isSubmitting ? 'Creating Project & Assessment...' : 'Create Project'}
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
