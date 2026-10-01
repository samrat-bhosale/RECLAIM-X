import React, { useState } from 'react';
import {
  Building,
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
  CheckCircle
} from 'lucide-react';
import { useProject } from '../context/ProjectContext';

// Built-in realistic sample site photos for 1-click evaluation
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

  // Step 1: Simplified Project Details
  const [details, setDetails] = useState({
    name: '',
    location: '',
    buildingType: 'Commercial',
    areaSqft: ''
  });

  // Step 1: Uploaded Site Images (Integrated prominently)
  const [uploadedImages, setUploadedImages] = useState([]);
  const [isDragOver, setIsDragOver] = useState(false);

  // Step 2: AI Detection State & Progress
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);

  // Step 3: Detected & Confirmed Materials
  const [detectedMaterials, setDetectedMaterials] = useState([]);
  const [unclearNotice, setUnclearNotice] = useState(null);
  const [newMaterialName, setNewMaterialName] = useState('');
  const [isAddingCustom, setIsAddingCustom] = useState(false);

  // Step 4: Final Submission
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

  // Trigger Gemini AI Image Material Detection
  const handleAnalyzeImages = async () => {
    if (!details.name.trim() || !details.location.trim()) {
      showNotification('Please provide project name and location', 'error');
      return;
    }

    if (uploadedImages.length === 0) {
      showNotification('Please upload at least one site photo or use sample photos', 'error');
      return;
    }

    try {
      setIsAnalyzing(true);
      setCurrentStep(2);
      setAnalysisStep(1);

      await new Promise(r => setTimeout(r, 650));
      setAnalysisStep(2);
      await new Promise(r => setTimeout(r, 650));

      const response = await detectSiteMaterials(uploadedImages, {
        name: details.name,
        location: details.location,
        buildingType: details.buildingType,
        areaSqft: Number(details.areaSqft) || 12000
      });

      setAnalysisStep(3);
      await new Promise(r => setTimeout(r, 450));

      setDetectedMaterials(response.detectedMaterials || []);
      setUnclearNotice(response.unclearImageNotice || null);
      
      setCurrentStep(3);
    } catch (err) {
      console.error(err);
      showNotification('Image analysis encountered an issue', 'error');
      setCurrentStep(1);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Toggle material confirmation
  const toggleMaterialIncluded = (id) => {
    setDetectedMaterials(prev => prev.map(m => 
      m.id === id ? { ...m, included: !m.included } : m
    ));
  };

  // Add custom unlisted material
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

  const removeMaterialItem = (id) => {
    setDetectedMaterials(prev => prev.filter(m => m.id !== id));
  };

  // Final Project Creation & Assessment Run
  const handleFinalSubmit = async () => {
    try {
      setIsSubmitting(true);
      const confirmed = detectedMaterials.filter(m => m.included !== false);

      const projectPayload = {
        name: details.name,
        location: details.location,
        buildingType: details.buildingType,
        areaSqft: Number(details.areaSqft) || 12000,
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
    { num: 1, title: 'Project & Site Images' },
    { num: 2, title: 'AI Detection' },
    { num: 3, title: 'Confirm Materials' },
    { num: 4, title: 'Generate Assessment' }
  ];

  return (
    <div className="max-w-4xl mx-auto py-4 space-y-6 font-sans animate-fade-in-up">
      
      {/* Clean Monochromatic Stepper */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-xs">
        <div className="flex items-center justify-between text-xs font-semibold px-2">
          {steps.map(step => (
            <div
              key={step.num}
              className={`flex items-center gap-2 ${
                currentStep === step.num
                  ? 'text-[#0D3B5E] font-bold'
                  : currentStep > step.num
                  ? 'text-gray-900'
                  : 'text-gray-400'
              }`}
            >
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                currentStep > step.num
                  ? 'bg-[#0D3B5E] text-white'
                  : currentStep === step.num
                  ? 'bg-[#0D3B5E] text-white ring-2 ring-[#0D3B5E]/30'
                  : 'border border-gray-300 text-gray-400 bg-white'
              }`}>
                {currentStep > step.num ? '✓' : step.num}
              </span>
              <span className="hidden sm:inline font-medium">STEP {step.num}: {step.title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================
          STEP 1: SIMPLIFIED FORM + PROMINENT SITE IMAGE UPLOAD
          ======================================================== */}
      {currentStep === 1 && (
        <div className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8 space-y-8 shadow-xs">
          
          {/* Header */}
          <div className="border-b border-gray-200 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-gray-900">
              Create Demolition Project
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              Enter basic site parameters and upload site photos for automated AI vision salvage detection.
            </p>
          </div>

          {/* Reduced Form Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
            <div>
              <label className="block font-semibold uppercase tracking-wider text-gray-700 mb-1.5">
                Project Name <span className="text-[#0D3B5E]">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Sterling Plaza Commercial Demolition"
                value={details.name}
                onChange={(e) => setDetails({ ...details, name: e.target.value })}
                className="w-full bg-white border border-gray-300 rounded-lg px-3.5 py-2.5 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#0D3B5E] focus:ring-1 focus:ring-[#0D3B5E] transition"
              />
            </div>

            <div>
              <label className="block font-semibold uppercase tracking-wider text-gray-700 mb-1.5">
                Location / City <span className="text-[#0D3B5E]">*</span>
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Mumbai, Maharashtra"
                  value={details.location}
                  onChange={(e) => setDetails({ ...details, location: e.target.value })}
                  className="w-full bg-white border border-gray-300 rounded-lg pl-9 pr-3.5 py-2.5 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#0D3B5E] focus:ring-1 focus:ring-[#0D3B5E] transition"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold uppercase tracking-wider text-gray-700 mb-1.5">
                Building Typology
              </label>
              <select
                value={details.buildingType}
                onChange={(e) => setDetails({ ...details, buildingType: e.target.value })}
                className="w-full bg-white border border-gray-300 rounded-lg px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-[#0D3B5E] focus:ring-1 focus:ring-[#0D3B5E] transition cursor-pointer"
              >
                <option value="Commercial">Commercial (Office / Retail)</option>
                <option value="Residential">Residential (Apartments / Housing)</option>
                <option value="Industrial">Industrial (Warehouses / Plants)</option>
                <option value="Institutional">Institutional (Schools / Hospitals)</option>
                <option value="Mixed-Use">Mixed-Use Complex</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold uppercase tracking-wider text-gray-700 mb-1.5">
                Approximate Area (Sq.Ft.)
              </label>
              <div className="relative">
                <Layers className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                <input
                  type="number"
                  min="100"
                  step="500"
                  placeholder="e.g. 15000"
                  value={details.areaSqft}
                  onChange={(e) => setDetails({ ...details, areaSqft: e.target.value })}
                  className="w-full bg-white border border-gray-300 rounded-lg pl-9 pr-3.5 py-2.5 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#0D3B5E] focus:ring-1 focus:ring-[#0D3B5E] transition"
                />
              </div>
            </div>
          </div>

          {/* Prominent Site Image Upload Area (Requirement 6) */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-gray-900">
                  Upload Site Images
                </h3>
                <p className="text-xs text-gray-500">
                  Provide demolition site photos, room interiors, structural frames, or facade glazing.
                </p>
              </div>

              <button
                type="button"
                onClick={loadSamplePhotos}
                className="text-xs font-semibold text-[#0D3B5E] hover:underline flex items-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Use Sample Photos (3)</span>
              </button>
            </div>

            {/* Drop Zone */}
            <div
              onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
              onDragLeave={() => setIsDragOver(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsDragOver(false);
                handleFileSelection(e.dataTransfer.files);
              }}
              className={`saas-upload-zone p-8 text-center transition flex flex-col items-center justify-center space-y-3 cursor-pointer ${
                isDragOver ? 'dragover' : ''
              }`}
            >
              <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-gray-600">
                <Upload className="w-6 h-6" />
              </div>

              <div className="space-y-1">
                <p className="text-sm font-semibold text-gray-900">
                  Drag & drop site images here
                </p>
                <p className="text-xs text-gray-500">or click to browse from your device</p>
              </div>

              <label className="cursor-pointer btn-outline-secondary text-xs py-1.5 px-4">
                <span>Choose Photos</span>
                <input
                  type="file"
                  multiple
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden"
                  onChange={(e) => handleFileSelection(e.target.files)}
                />
              </label>

              <span className="text-[10px] font-medium text-gray-400">
                Supports JPG, PNG, WEBP (Up to 10MB per file)
              </span>
            </div>

            {/* Uploaded Images Thumbnails */}
            {uploadedImages.length > 0 && (
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between text-xs text-gray-600">
                  <span className="font-semibold">Selected Photos ({uploadedImages.length})</span>
                  <button
                    onClick={() => setUploadedImages([])}
                    className="text-gray-400 hover:text-rose-600 text-xs transition cursor-pointer"
                  >
                    Clear all
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {uploadedImages.map((img, index) => (
                    <div
                      key={index}
                      className="group relative rounded-lg overflow-hidden border border-gray-200 aspect-video bg-gray-100"
                    >
                      <img
                        src={img.preview}
                        alt={img.name}
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={() => removeImage(index)}
                        className="absolute top-1.5 right-1.5 p-1 rounded-md bg-black/60 hover:bg-rose-600 text-white transition cursor-pointer"
                        title="Remove photo"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action Footer */}
          <div className="pt-4 border-t border-gray-200 flex items-center justify-between">
            <button
              onClick={() => setActiveTab('dashboard')}
              className="btn-outline-secondary text-xs"
            >
              <span>Cancel</span>
            </button>

            <button
              onClick={handleAnalyzeImages}
              disabled={uploadedImages.length === 0}
              className="btn-petrol-primary text-xs font-semibold cursor-pointer disabled:opacity-40"
            >
              <span>[ Analyze Images & Detect Materials → ]</span>
            </button>
          </div>

        </div>
      )}

      {/* ========================================================
          STEP 2: AI DETECTION PROGRESS SCREEN
          ======================================================== */}
      {currentStep === 2 && (
        <div className="bg-white border border-gray-200 rounded-xl p-12 text-center space-y-6 shadow-xs">
          <div className="w-16 h-16 rounded-2xl bg-[#0D3B5E]/10 border border-[#0D3B5E]/20 flex items-center justify-center text-[#0D3B5E] mx-auto animate-pulse">
            <Cpu className="w-8 h-8" />
          </div>

          <div className="space-y-3 max-w-md mx-auto">
            <h2 className="text-xl font-bold font-heading text-gray-900">
              AI Vision Material Scan
            </h2>

            <div className="space-y-2.5 text-left bg-gray-50 p-4 rounded-xl border border-gray-200">
              <div className={`flex items-center gap-2.5 text-xs ${analysisStep >= 1 ? 'text-[#0D3B5E] font-semibold' : 'text-gray-400'}`}>
                {analysisStep > 1 ? <CheckCircle className="w-4 h-4 text-[#0D3B5E]" /> : <div className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin" />}
                <span>Analyzing site images...</span>
              </div>
              <div className={`flex items-center gap-2.5 text-xs ${analysisStep >= 2 ? 'text-[#0D3B5E] font-semibold' : 'text-gray-400'}`}>
                {analysisStep > 2 ? <CheckCircle className="w-4 h-4 text-[#0D3B5E]" /> : analysisStep === 2 ? <div className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin" /> : <div className="w-4 h-4 rounded-full border border-gray-300" />}
                <span>Extracting material evidence & confidence...</span>
              </div>
              <div className={`flex items-center gap-2.5 text-xs ${analysisStep >= 3 ? 'text-[#0D3B5E] font-semibold' : 'text-gray-400'}`}>
                {analysisStep === 3 ? <div className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin" /> : <div className="w-4 h-4 rounded-full border border-gray-300" />}
                <span>Structuring circular recovery streams...</span>
              </div>
            </div>

            <p className="text-xs text-gray-500">
              Gemini Vision is inspecting facade glazing, interior timber doors, structural steel, and MEP conduits.
            </p>
          </div>
        </div>
      )}

      {/* ========================================================
          STEP 3: CONFIRM MATERIALS (HUMAN-IN-THE-LOOP)
          ======================================================== */}
      {currentStep === 3 && (
        <div className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8 space-y-6 shadow-xs">
          
          <div className="border-b border-gray-200 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-gray-900">
              Materials Detected from Site Photos
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              Verify the materials detected by the AI. You can include, exclude, or add custom materials before executing the audit.
            </p>
          </div>

          {unclearNotice && (
            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-2.5 text-xs text-amber-800">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>{unclearNotice}</span>
            </div>
          )}

          {/* Detected Materials List */}
          <div className="space-y-3">
            {detectedMaterials.map((mat) => {
              const isIncluded = mat.included !== false;

              return (
                <div
                  key={mat.id}
                  className={`p-4 rounded-xl border transition flex items-start justify-between gap-4 ${
                    isIncluded
                      ? 'bg-white border-gray-200'
                      : 'bg-gray-50 border-gray-200 opacity-60'
                  }`}
                >
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <span className="font-bold text-gray-900 text-sm">
                        {mat.material}
                      </span>
                      
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#0D3B5E]/10 text-[#0D3B5E] border border-[#0D3B5E]/20">
                        {Math.round(mat.confidence * 100)}% confidence
                      </span>

                      <span className="text-[10px] text-gray-500 font-medium">
                        {mat.category}
                      </span>
                    </div>

                    <p className="text-xs text-gray-600 leading-relaxed">
                      {mat.evidence}
                    </p>

                    {mat.suggestedQuantityHint && (
                      <p className="text-[10px] text-gray-500 italic">
                        Estimated quantity: {mat.suggestedQuantityHint}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => toggleMaterialIncluded(mat.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                        isIncluded
                          ? 'bg-[#0D3B5E] text-white hover:bg-[#082840]'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {isIncluded ? 'Included' : 'Excluded'}
                    </button>

                    <button
                      onClick={() => removeMaterialItem(mat.id)}
                      className="px-2.5 py-1.5 rounded-lg text-xs font-medium text-gray-400 hover:text-rose-600 hover:bg-gray-100 transition cursor-pointer"
                      title="Remove material"
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
            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl border border-gray-200">
              <input
                type="text"
                placeholder="e.g. Copper plumbing pipes & brass valves..."
                value={newMaterialName}
                onChange={(e) => setNewMaterialName(e.target.value)}
                className="flex-1 bg-white border border-gray-300 rounded px-3 py-1.5 text-xs text-gray-900 focus:outline-none focus:border-[#0D3B5E]"
              />
              <button
                onClick={handleAddCustomMaterial}
                className="btn-petrol-primary text-xs py-1.5 px-3"
              >
                Add
              </button>
              <button
                onClick={() => setIsAddingCustom(false)}
                className="btn-outline-secondary text-xs py-1.5 px-3"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsAddingCustom(true)}
              className="inline-flex items-center gap-1.5 text-xs text-[#0D3B5E] hover:underline font-semibold cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Unlisted Material Manually</span>
            </button>
          )}

          {/* Navigation */}
          <div className="pt-4 border-t border-gray-200 flex items-center justify-between">
            <button
              onClick={() => setCurrentStep(1)}
              className="btn-outline-secondary text-xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Project Setup</span>
            </button>

            <button
              onClick={() => setCurrentStep(4)}
              className="btn-petrol-primary text-xs font-semibold cursor-pointer"
            >
              <span>Proceed to Assessment →</span>
            </button>
          </div>

        </div>
      )}

      {/* ========================================================
          STEP 4: FINAL REVIEW & GENERATE RECOVERY ASSESSMENT
          ======================================================== */}
      {currentStep === 4 && (
        <div className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8 space-y-6 shadow-xs">
          
          <div className="border-b border-gray-200 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-gray-900">
              Generate Recovery Assessment
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              Confirm your project configuration before running the AI circularity recovery audit.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-gray-50 border border-gray-200 space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-3 text-gray-700">
              <div>
                <span className="text-gray-400 block text-[10px] uppercase font-semibold">Project Name</span>
                <span className="font-bold text-gray-900 text-sm">{details.name}</span>
              </div>
              <div>
                <span className="text-gray-400 block text-[10px] uppercase font-semibold">Location</span>
                <span className="font-bold text-gray-900 text-sm">{details.location}</span>
              </div>
              <div>
                <span className="text-gray-400 block text-[10px] uppercase font-semibold">Typology</span>
                <span className="font-semibold text-gray-900">{details.buildingType}</span>
              </div>
              <div>
                <span className="text-gray-400 block text-[10px] uppercase font-semibold">Gross Area</span>
                <span className="font-semibold text-gray-900">{Number(details.areaSqft || 12000).toLocaleString()} sq.ft.</span>
              </div>
            </div>

            <div className="pt-3 border-t border-gray-200 space-y-2">
              <span className="text-gray-500 block text-[10px] uppercase font-semibold">
                Confirmed Material Streams ({detectedMaterials.filter(m => m.included !== false).length})
              </span>
              <div className="flex flex-wrap gap-2">
                {detectedMaterials.filter(m => m.included !== false).map(m => (
                  <span key={m.id} className="px-2.5 py-1 rounded-md bg-white text-[11px] text-[#0D3B5E] font-medium border border-gray-200">
                    {m.material}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4 border-t border-gray-200 flex items-center justify-between">
            <button
              onClick={() => setCurrentStep(3)}
              className="btn-outline-secondary text-xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Edit Materials</span>
            </button>

            <button
              onClick={handleFinalSubmit}
              disabled={isSubmitting}
              className="btn-petrol-primary text-xs font-semibold cursor-pointer disabled:opacity-50"
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
