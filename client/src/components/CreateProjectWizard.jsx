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
  Plus,
  ArrowRight,
  ArrowLeft,
  Cpu,
  Trash2,
  Check,
  CheckCircle,
  FileCheck
} from 'lucide-react';
import { useProject } from '../context/ProjectContext';

// Built-in realistic sample site photos for 1-click test
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
  const { createProject, detectSiteMaterials, setActiveTab, showNotification, t } = useProject();

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
  const [analysisStep, setAnalysisStep] = useState(0);

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
    showNotification(`Uploaded ${validFiles.length} photo(s)`, 'success');
  };

  const removeImage = (index) => {
    setUploadedImages(prev => prev.filter((_, idx) => idx !== index));
  };

  const loadSamplePhotos = () => {
    setUploadedImages(SAMPLE_DEMO_IMAGES);
    showNotification('Loaded 3 sample demolition photos', 'info');
  };

  // Step 3: AI Image Material Detection
  const handleAnalyzeImages = async () => {
    if (uploadedImages.length === 0) {
      showNotification('Please upload at least one site photo', 'error');
      return;
    }

    try {
      setIsAnalyzing(true);
      setCurrentStep(3);
      setAnalysisStep(1);

      await new Promise(r => setTimeout(r, 650));
      setAnalysisStep(2);
      await new Promise(r => setTimeout(r, 650));

      const response = await detectSiteMaterials(uploadedImages, {
        name: details.name,
        location: details.location,
        buildingType: details.buildingType,
        areaSqft: Number(details.areaSqft) || 10000
      });

      setAnalysisStep(3);
      await new Promise(r => setTimeout(r, 450));

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

  // Step 4: Toggle material confirmation
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

  // Remove material from detected list
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

  const steps = [
    { num: 1, title: 'Project Details' },
    { num: 2, title: 'Upload Site Images' },
    { num: 3, title: 'AI Detection' },
    { num: 4, title: 'Confirm Materials' },
    { num: 5, title: 'Generate Assessment' }
  ];

  return (
    <div className="max-w-3xl mx-auto py-2 space-y-8 animate-in fade-in duration-300">
      
      {/* Visual Stepper */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-semibold px-1">
          {steps.map(step => (
            <div
              key={step.num}
              className={`flex items-center gap-2 ${
                currentStep === step.num
                  ? 'text-emerald-400'
                  : currentStep > step.num
                  ? 'text-zinc-200'
                  : 'text-zinc-600'
              }`}
            >
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                currentStep > step.num
                  ? 'bg-emerald-500 text-zinc-950 font-black'
                  : currentStep === step.num
                  ? 'border-2 border-emerald-400 text-emerald-400 font-bold bg-emerald-500/10'
                  : 'border border-zinc-700 text-zinc-500'
              }`}>
                {currentStep > step.num ? '✓' : step.num}
              </span>
              <span className="hidden sm:inline font-medium">STEP {step.num}: {step.title}</span>
            </div>
          ))}
        </div>

        <div className="w-full bg-zinc-800/80 rounded-full h-1 overflow-hidden">
          <div
            className="bg-emerald-500 h-full rounded-full transition-all duration-300"
            style={{ width: `${((currentStep - 1) / 4) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* STEP 1: Project Details */}
      {currentStep === 1 && (
        <div className="saas-card p-6 sm:p-8 space-y-6">
          <div className="border-b border-zinc-800/80 pb-4">
            <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block">Step 1 of 5</span>
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-white mt-1">
              Project Details
            </h2>
            <p className="text-xs text-zinc-400 mt-1">
              Specify site name, location, and structural parameters to calibrate material recoverability.
            </p>
          </div>

          <div className="space-y-5 text-xs">
            <div>
              <label className="block font-semibold uppercase tracking-wider text-zinc-300 mb-1.5">
                Project Name <span className="text-emerald-400">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Sterling Commercial Plaza Demolition"
                value={details.name}
                onChange={(e) => setDetails({ ...details, name: e.target.value })}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 transition"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold uppercase tracking-wider text-zinc-300 mb-1.5">
                  Location / City <span className="text-emerald-400">*</span>
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Pune, Maharashtra"
                    value={details.location}
                    onChange={(e) => setDetails({ ...details, location: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold uppercase tracking-wider text-zinc-300 mb-1.5">
                  Building Typology <span className="text-emerald-400">*</span>
                </label>
                <select
                  value={details.buildingType}
                  onChange={(e) => setDetails({ ...details, buildingType: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-emerald-500 transition cursor-pointer"
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
              <label className="block font-semibold uppercase tracking-wider text-zinc-300 mb-1.5">
                Approximate Area (Sq.Ft.) <span className="text-emerald-400">*</span>
              </label>
              <div className="relative">
                <Layers className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3" />
                <input
                  type="number"
                  min="100"
                  step="500"
                  required
                  placeholder="e.g. 12000"
                  value={details.areaSqft}
                  onChange={(e) => setDetails({ ...details, areaSqft: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 transition"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-zinc-800/80 flex justify-end">
            <button
              onClick={() => {
                if (!details.name.trim() || !details.location.trim() || !details.areaSqft) {
                  showNotification('Please fill in all project fields', 'error');
                  return;
                }
                setCurrentStep(2);
              }}
              className="saas-btn-primary cursor-pointer"
            >
              <span>Next: Upload Site Images</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: Upload Site Images (Visually Prominent!) */}
      {currentStep === 2 && (
        <div className="saas-card p-6 sm:p-8 space-y-6">
          <div className="border-b border-zinc-800/80 pb-4">
            <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block">Step 2 of 5</span>
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-white mt-1">
              Upload Site Images
            </h2>
            <p className="text-xs text-zinc-400 mt-1">
              Upload photos of the site, rooms, facade, or deconstruction areas for Gemini AI material identification.
            </p>
          </div>

          {/* Large Prominent Drag & Drop Zone */}
          <div
            onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
            onDragLeave={() => setIsDragOver(false)}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragOver(false);
              handleFileSelection(e.dataTransfer.files);
            }}
            className={`saas-upload-zone p-10 sm:p-12 text-center transition flex flex-col items-center justify-center space-y-4 cursor-pointer ${
              isDragOver ? 'dragover' : ''
            }`}
          >
            <div className="w-14 h-14 rounded-2xl bg-zinc-800/80 border border-zinc-700/80 flex items-center justify-center text-emerald-400 shadow-sm">
              <Upload className="w-7 h-7" />
            </div>

            <div className="space-y-1">
              <h3 className="text-base font-bold text-white">
                Upload Site Images
              </h3>
              <p className="text-xs text-zinc-400">
                Drag & drop images here
              </p>
              <p className="text-xs text-zinc-500 font-medium">or</p>
            </div>

            <label className="cursor-pointer saas-btn-secondary py-2 px-5">
              <span>Choose Images</span>
              <input
                type="file"
                multiple
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={(e) => handleFileSelection(e.target.files)}
              />
            </label>

            <span className="text-[11px] font-semibold text-zinc-500 tracking-wider">
              JPG • PNG • WEBP
            </span>
          </div>

          {/* Quick Demo Option */}
          <div className="flex items-center justify-between text-xs bg-zinc-900/60 p-4 rounded-xl border border-zinc-800">
            <span className="text-zinc-400">
              Need sample photos for evaluation?
            </span>
            <button
              type="button"
              onClick={loadSamplePhotos}
              className="text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1.5 transition cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Use Sample Demolition Photos (3)
            </button>
          </div>

          {/* Uploaded Photos Thumbnails Preview */}
          {uploadedImages.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-zinc-300">
                <span className="font-semibold">Selected Images ({uploadedImages.length})</span>
                <button
                  onClick={() => setUploadedImages([])}
                  className="text-zinc-500 hover:text-rose-400 text-xs transition cursor-pointer"
                >
                  Clear all
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {uploadedImages.map((img, index) => (
                  <div
                    key={index}
                    className="group relative rounded-xl overflow-hidden border border-zinc-800 aspect-video bg-zinc-950"
                  >
                    <img
                      src={img.preview}
                      alt={img.name}
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => removeImage(index)}
                      className="absolute top-1.5 right-1.5 p-1 rounded-md bg-black/70 hover:bg-rose-900 text-white transition cursor-pointer"
                      title="Remove image"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                    <span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded bg-black/70 text-[9px] text-zinc-300 truncate max-w-[85%]">
                      {img.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between">
            <button
              onClick={() => setCurrentStep(1)}
              className="saas-btn-secondary"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>

            <button
              onClick={handleAnalyzeImages}
              disabled={uploadedImages.length === 0}
              className="saas-btn-primary cursor-pointer disabled:opacity-40"
            >
              <Cpu className="w-4 h-4" />
              <span>Analyze Images with AI</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: AI Analyzing Progress Screen */}
      {currentStep === 3 && (
        <div className="saas-card p-12 text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto animate-pulse">
            <Cpu className="w-8 h-8" />
          </div>

          <div className="space-y-3 max-w-md mx-auto">
            <h2 className="text-xl font-bold font-heading text-white">
              AI Vision Analysis
            </h2>

            <div className="space-y-2 text-left bg-zinc-900/60 p-4 rounded-xl border border-zinc-800">
              <div className={`flex items-center gap-2.5 text-xs ${analysisStep >= 1 ? 'text-emerald-400 font-semibold' : 'text-zinc-500'}`}>
                {analysisStep > 1 ? <CheckCircle className="w-4 h-4" /> : <div className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin" />}
                <span>Analyzing site images...</span>
              </div>
              <div className={`flex items-center gap-2.5 text-xs ${analysisStep >= 2 ? 'text-emerald-400 font-semibold' : 'text-zinc-500'}`}>
                {analysisStep > 2 ? <CheckCircle className="w-4 h-4" /> : analysisStep === 2 ? <div className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin" /> : <div className="w-4 h-4 rounded-full border border-zinc-700" />}
                <span>Identifying visible materials...</span>
              </div>
              <div className={`flex items-center gap-2.5 text-xs ${analysisStep >= 3 ? 'text-emerald-400 font-semibold' : 'text-zinc-500'}`}>
                {analysisStep === 3 ? <div className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin" /> : <div className="w-4 h-4 rounded-full border border-zinc-700" />}
                <span>Assessing recovery opportunities...</span>
              </div>
            </div>

            <p className="text-[11px] text-zinc-500">
              Examining facade glazing, interior doorways, structural steel assemblies, and electrical conduits.
            </p>
          </div>
        </div>
      )}

      {/* STEP 4: Confirm Materials (Human-in-the-Loop) */}
      {currentStep === 4 && (
        <div className="saas-card p-6 sm:p-8 space-y-6">
          <div className="border-b border-zinc-800/80 pb-4">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <h2 className="text-xl sm:text-2xl font-bold font-heading text-white">
                Materials Detected from Your Images
              </h2>
            </div>
            <p className="text-xs text-zinc-400 mt-1">
              Verify the materials detected by the AI. Confirm which items should be included in the recovery assessment.
            </p>
          </div>

          {unclearNotice && (
            <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-500/30 flex items-start gap-2.5 text-xs text-amber-300">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>{unclearNotice}</span>
            </div>
          )}

          {/* Clean Material Confirmation Cards */}
          <div className="space-y-3">
            {detectedMaterials.map((mat) => {
              const isIncluded = mat.included !== false;

              return (
                <div
                  key={mat.id}
                  className={`p-4 rounded-xl border transition flex items-start justify-between gap-4 ${
                    isIncluded
                      ? 'bg-zinc-900/80 border-zinc-800'
                      : 'bg-zinc-950/40 border-zinc-900 opacity-60'
                  }`}
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <span className="font-bold text-white text-sm">
                        {mat.material}
                      </span>
                      
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {Math.round(mat.confidence * 100)}% confidence
                      </span>

                      <span className="text-[10px] text-zinc-500 font-medium">
                        {mat.category}
                      </span>
                    </div>

                    <p className="text-xs text-zinc-400 leading-relaxed">
                      {mat.evidence}
                    </p>

                    {mat.suggestedQuantityHint && (
                      <p className="text-[10px] text-zinc-500 italic">
                        Hint: {mat.suggestedQuantityHint}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => toggleMaterialIncluded(mat.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                        isIncluded
                          ? 'bg-emerald-500 text-zinc-950 hover:bg-emerald-400'
                          : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
                      }`}
                    >
                      {isIncluded ? 'Confirm' : 'Include'}
                    </button>

                    <button
                      onClick={() => removeMaterialItem(mat.id)}
                      className="px-2.5 py-1.5 rounded-lg text-xs font-medium text-zinc-500 hover:text-rose-400 hover:bg-zinc-800/80 transition cursor-pointer"
                      title="Remove item"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Add Custom Material */}
          {isAddingCustom ? (
            <div className="flex items-center gap-2 p-3 bg-zinc-900 rounded-xl border border-zinc-800">
              <input
                type="text"
                placeholder="e.g. Copper plumbing pipes & brass fixtures..."
                value={newMaterialName}
                onChange={(e) => setNewMaterialName(e.target.value)}
                className="flex-1 bg-transparent text-xs text-white focus:outline-none placeholder-zinc-500"
              />
              <button
                onClick={handleAddCustomMaterial}
                className="saas-btn-primary py-1 px-3 text-xs"
              >
                Add
              </button>
              <button
                onClick={() => setIsAddingCustom(false)}
                className="saas-btn-secondary py-1 px-3 text-xs"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsAddingCustom(true)}
              className="inline-flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 font-medium cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Unlisted Material Manually
            </button>
          )}

          {/* Navigation */}
          <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between">
            <button
              onClick={() => setCurrentStep(2)}
              className="saas-btn-secondary"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Upload</span>
            </button>

            <button
              onClick={() => setCurrentStep(5)}
              className="saas-btn-primary cursor-pointer"
            >
              <span>Proceed to Assessment</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 5: Final Review & Project Creation */}
      {currentStep === 5 && (
        <div className="saas-card p-6 sm:p-8 space-y-6">
          <div className="border-b border-zinc-800/80 pb-4">
            <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block">Step 5 of 5</span>
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-white mt-1">
              Generate Recovery Assessment
            </h2>
            <p className="text-xs text-zinc-400 mt-1">
              Review project specifications and confirmed material streams before executing the AI circularity audit.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-3 text-zinc-300">
              <div>
                <span className="text-zinc-500 block text-[10px] uppercase font-semibold">Project Name</span>
                <span className="font-bold text-white text-sm">{details.name}</span>
              </div>
              <div>
                <span className="text-zinc-500 block text-[10px] uppercase font-semibold">Location</span>
                <span className="font-bold text-white text-sm">{details.location}</span>
              </div>
              <div>
                <span className="text-zinc-500 block text-[10px] uppercase font-semibold">Typology</span>
                <span className="font-semibold text-white">{details.buildingType}</span>
              </div>
              <div>
                <span className="text-zinc-500 block text-[10px] uppercase font-semibold">Gross Area</span>
                <span className="font-semibold text-white">{Number(details.areaSqft).toLocaleString()} sq.ft.</span>
              </div>
            </div>

            <div className="pt-3 border-t border-zinc-800/80 space-y-2">
              <span className="text-zinc-400 block text-[10px] uppercase font-semibold">
                Confirmed Material Streams ({detectedMaterials.filter(m => m.included !== false).length})
              </span>
              <div className="flex flex-wrap gap-2">
                {detectedMaterials.filter(m => m.included !== false).map(m => (
                  <span key={m.id} className="px-2.5 py-1 rounded-lg bg-zinc-800 text-[11px] text-emerald-400 font-medium border border-zinc-700">
                    {m.material}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between">
            <button
              onClick={() => setCurrentStep(4)}
              className="saas-btn-secondary"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Edit Materials</span>
            </button>

            <button
              onClick={handleFinalSubmit}
              disabled={isSubmitting}
              className="saas-btn-primary cursor-pointer disabled:opacity-50"
            >
              <Check className="w-4 h-4" />
              <span>{isSubmitting ? 'Generating Assessment...' : 'Create Project & Generate Assessment'}</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
