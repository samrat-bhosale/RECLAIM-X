export const translations = {
  en: {
    brand: {
      name: 'RECLAIM X',
      tagline: 'Circularity & Material Recovery Platform',
      oneLiner: 'Predict what can be saved. Prove what was saved. Measure what was recovered.'
    },
    nav: {
      dashboard: 'Dashboard',
      projects: 'Projects',
      createProject: 'Create Project',
      analysis: 'Analysis',
      recovery: 'Recovery',
      simulator: 'Simulator',
      admin: 'Admin Panel',
      activeProject: 'Active Project',
      switchProject: 'Switch Project',
      loadDemo: 'Load Demo',
      role: 'Role'
    },
    dashboard: {
      title: 'Predict what can be saved.',
      titleHighlight: 'Prove what was recovered.',
      description: 'An AI-powered circularity platform for Construction & Demolition. Identify recoverable architectural materials from site images, sequence deconstruction, and measure the recovery gap.',
      createProjectCta: 'Create Project',
      viewProjectsCta: 'View Projects',
      loadDemoCta: 'Load Demo Project',
      metrics: {
        projects: 'Projects',
        projectsSub: 'Monitored demolition sites',
        aiAssessments: 'AI Assessments',
        aiAssessmentsSub: 'Material recovery audits',
        potentialRecovery: 'Potential Recovery',
        potentialRecoverySub: 'Estimated salvage yield',
        recoveryValue: 'Recovery Value',
        recoveryValueSub: 'Actual confirmed value'
      },
      existingProjects: 'Existing Projects',
      viewAll: 'View all',
      noProjects: 'No demolition projects created yet.',
      createFirst: 'Create First Project',
      openProject: 'Open Project',
      howItWorks: 'How RECLAIM X Works',
      step1Title: 'Create Project',
      step1Desc: 'Enter building details and location.',
      step2Title: 'Upload Site Photos',
      step2Desc: 'AI vision identifies visible materials.',
      step3Title: 'Confirm Materials',
      step3Desc: 'Verify detected items before assessment.',
      step4Title: 'Measure Gap',
      step4Desc: 'Log field actuals and evaluate lost value.'
    },
    create: {
      wizardTitle: 'New Demolition Project',
      step1: 'Project Details',
      step2: 'Upload Site Images',
      step3: 'AI Detection',
      step4: 'Confirm Materials',
      step5: 'Review & Create',
      projectName: 'Project Name',
      projectNamePlaceholder: 'e.g. Sterling Commercial Plaza Demolition',
      location: 'Location / City',
      locationPlaceholder: 'e.g. Pune, Maharashtra',
      typology: 'Building Typology',
      commercial: 'Commercial (Office / Retail)',
      residential: 'Residential (Housing)',
      industrial: 'Industrial (Warehouse / Plant)',
      institutional: 'Institutional (School / Hospital)',
      mixedUse: 'Mixed-Use Facility',
      area: 'Approximate Area (Sq.Ft.)',
      areaPlaceholder: 'e.g. 12000',
      nextPhotos: 'Next: Upload Site Images',
      back: 'Back',
      uploadTitle: 'Upload Site Images',
      uploadDesc: 'Upload photos of the site, materials, rooms, structures, or demolition area. RECLAIM X will analyze the images and identify potentially recoverable materials.',
      dragDropText: 'Drag & drop images here',
      orText: 'or',
      chooseImages: 'Choose Images',
      formats: 'JPG • PNG • WEBP',
      samplePhotosBtn: 'Use Sample Demolition Photos (3)',
      selectedPhotos: 'Selected Photos',
      clearAll: 'Clear all',
      analyzeBtn: 'Analyze Images with AI',
      analyzingTitle: 'Analyzing Site Images...',
      analyzingSub: 'Examining facade glazing, interior doorways, structural steel, and electrical runs.',
      confirmTitle: 'Materials Detected from Your Images',
      confirmDesc: 'Review and confirm the materials identified by the AI. You can include, exclude, or add custom materials before generating the recovery assessment.',
      confidence: 'Confidence',
      clearlyVisible: 'Clearly Visible',
      likely: 'Likely',
      uncertain: 'Uncertain Evidence',
      included: 'Included',
      excluded: 'Excluded',
      addCustom: 'Add Unlisted Material Manually',
      addBtn: 'Add',
      cancelBtn: 'Cancel',
      proceedReview: 'Proceed to Review',
      reviewTitle: 'Review & Generate Recovery Assessment',
      reviewDesc: 'Confirm project configuration. Creating the project will immediately run the AI recovery assessment with your confirmed materials.',
      confirmedStreams: 'Confirmed Material Streams',
      createAndAuditBtn: 'Create Project & Generate Assessment',
      creatingBtn: 'Creating Project & Assessment...'
    },
    overview: {
      title: 'Project Overview',
      status: 'Status',
      planning: 'Planning',
      preDemolition: 'Pre-Demolition Audit',
      salvageInProgress: 'Salvage in Progress',
      completed: 'Completed',
      reRunAi: 'Re-Run AI Assessment',
      analyzing: 'Analyzing...',
      summary: {
        potentialMaterials: 'Potential Recoverable Materials',
        estimatedValue: 'Estimated Recovery Value',
        actualRecovery: 'Actual Recovery',
        recoveryGap: 'Recovery Gap',
        streams: 'Streams',
        netSalvage: 'Net salvage value',
        confirmedRealized: 'Confirmed realized',
        unrecoveredDeficit: 'Lost circular potential'
      },
      actions: {
        sectionTitle: 'Project Intelligence & Recovery Modules',
        intelligenceTitle: 'AI Recovery Intelligence',
        intelligenceDesc: 'Detected materials, recoverability estimates, and AI reasoning evidence.',
        planTitle: 'Recovery Plan',
        planDesc: 'Recommended chronological deconstruction sequence and impact risk alerts.',
        economicTitle: 'Economic Impact',
        economicDesc: 'Gross salvage revenue, disposal tipping fee avoidance, and labor extraction costs.',
        actualsTitle: 'Actual Recovery',
        actualsDesc: 'Record field reclaimed quantities, broken materials, and on-site notes.',
        gapTitle: 'Recovery Gap',
        gapDesc: 'Quantify expected vs actual recovery and evaluate lost salvage opportunity.',
        rootCauseTitle: 'Root Cause Analysis',
        rootCauseDesc: 'Explain documented project-data-based reasons for recovery deficits.',
        simulatorTitle: 'Simulator',
        simulatorDesc: 'Reorder deconstruction steps to simulate sensitivity to premature demolition.'
      }
    },
    projects: {
      title: 'Demolition Projects',
      subtitle: 'Manage demolition sites undergoing AI circularity recovery audits.',
      searchPlaceholder: 'Search by project name or city...',
      all: 'All',
      commercial: 'Commercial',
      residential: 'Residential',
      industrial: 'Industrial',
      noProjectsFound: 'No projects match your search.',
      createProjectBtn: 'Create Project'
    },
    admin: {
      title: 'RECLAIM X Admin & Observability Panel',
      subtitle: 'Internal system health, security verification, API status, and audit logs.',
      runtime: 'Platform Runtime',
      memory: 'Memory Footprint',
      aiVision: 'AI Vision Engine',
      storage: 'Storage & Security',
      totalSites: 'Total Demolition Sites',
      totalStreams: 'Cataloged Material Streams',
      totalDiverted: 'Total Waste Diverted',
      totalValue: 'Total Projected Salvage Value',
      recentAudit: 'Recent System Audit Activity Logs',
      accessDenied: 'Access Denied: Admin Privileges Required',
      accessDeniedDesc: 'The Admin Panel is restricted to authenticated system administrators.',
      switchRoleDemo: 'Switch to Admin Role (Demo Mode)',
      returnDashboard: 'Return to Dashboard'
    },
    common: {
      backToHub: 'Back to Project Hub',
      next: 'Next',
      save: 'Save',
      open: 'Open',
      close: 'Close',
      tonnes: 'Tonnes',
      viewAll: 'View all'
    },
    hero: {
      kicker: 'BUILDING A STRONGER TOMORROW',
      titleLine1: 'Modern construction',
      titleLine2: 'for a better future.',
      subtitle: 'We design and build sustainable, high-quality circular recovery workflows that stand the test of time. From residential to commercial, we bring circular demolition visions to life with precision and integrity.',
      exploreCta: 'Explore Our Projects',
      watchVideoCta: 'Launch Demo Audit',
      scroll: 'Scroll',
      slideCount: '01 / 04'
    },
    services: {
      kicker: 'OUR SERVICES',
      heading: 'End-to-end circular deconstruction solutions.',
      description: 'From planning to salvage delivery, we offer a full spectrum of circular recovery services tailored to your projects. Our AI team ensures every structural and architectural detail is handled with expertise and care.',
      viewAll: 'View all services',
      items: [
        {
          num: '01',
          title: 'Residential Deconstruction',
          desc: 'Custom material audits built for modern living, with a focus on interior salvage quality and architectural detail.'
        },
        {
          num: '02',
          title: 'Commercial Deconstruction',
          desc: 'Efficient, functional and future-ready material recovery strategies for enterprise office complexes and retail spaces.'
        },
        {
          num: '03',
          title: 'Infrastructure Salvage',
          desc: 'Heavy structural steel, concrete aggregates, and MEP recovery building the backbone for circular communities.'
        },
        {
          num: '04',
          title: 'Renovation & Remodeling',
          desc: 'Transforming existing spaces with zero-landfill salvage, circularity ledgers, and recovery gap analytics.'
        }
      ]
    },
    featuredProjects: {
      kicker: 'FEATURED PROJECTS',
      heading: 'Spaces that inspire.',
      subtitle: 'Explore some of our recent demolition audits and salvage projects where innovation meets environmental craftsmanship.',
      viewAll: 'View all projects',
      theRidge: 'The Ridge Residence',
      theRidgeCat: 'Residential',
      skyline: 'Skyline Office Tower',
      skylineCat: 'Commercial',
      riverside: 'Riverside Bridge Deconstruction',
      riversideCat: 'Infrastructure'
    },
    stats: {
      completed: '250+',
      completedLabel: 'Projects Completed',
      experience: '15+',
      experienceLabel: 'Years of Experience',
      satisfaction: '98%',
      satisfactionLabel: 'Client Satisfaction',
      team: '50+',
      teamLabel: 'Team Members'
    },
    process: {
      kicker: 'OUR PROCESS',
      heading: 'How we build your vision.',
      steps: [
        {
          num: '01',
          title: 'Plan',
          desc: 'We understand your goals, demolition site constraints, and material salvage budget.'
        },
        {
          num: '02',
          title: 'Design & Detect',
          desc: 'Our AI vision engine analyzes site photos and creates detailed 3D circularity recovery plans.'
        },
        {
          num: '03',
          title: 'Sequence',
          desc: 'Skilled deconstruction teams bring the extraction sequence to life with safety and precision.'
        },
        {
          num: '04',
          title: 'Deliver & Measure',
          desc: 'We reconcile field actuals, confirm landfill diversion, and guarantee on-time recovery completion.'
        }
      ]
    },
    aboutUs: {
      kicker: 'ABOUT US',
      heading: 'Built on trust, engineered for excellence.',
      body: 'We are a team of builders, engineers, thinkers and problem-solvers committed to creating circular spaces that make a lasting impact. With a focus on quality, sustainability and client satisfaction, we turn demolition waste into valuable material assets.',
      learnMore: 'Learn more',
      values: [
        { title: 'Integrity', desc: 'We do what’s right for the environment.' },
        { title: 'Innovation', desc: 'We build smarter circular AI systems.' },
        { title: 'Quality', desc: 'We never compromise on salvage yields.' },
        { title: 'Partnership', desc: 'Your circular goals are our highest priority.' }
      ]
    },
    testimonial: {
      kicker: 'CLIENT TESTIMONIALS',
      quote: 'Working with RECLAIM X was a seamless experience. Their pre-demolition AI vision audit identified ₹4.2M in recoverable materials with meticulous attention to detail and environmental excellence.',
      author: 'Daniel Carter',
      role: 'Director, Horizon Properties & Demolition'
    },
    ctaBanner: {
      kicker: "LET'S BUILD TOGETHER",
      heading: 'Your vision. Our expertise.',
      subtitle: 'Tell us about your demolition site or salvage requirements and let’s create something extraordinary together.',
      cta: 'Get a Quote'
    },
    footer: {
      tagline: 'Modern construction & circular recovery for a sustainable tomorrow.',
      quickLinks: 'Quick Links',
      services: 'Services',
      contact: 'Contact',
      phone: '+91 98765 43210',
      email: 'hello@reclaimx.com',
      address: 'Mumbai, Maharashtra, India',
      copyright: '© 2026 RECLAIM X. All rights reserved.',
      privacy: 'Privacy',
      terms: 'Terms',
      sitemap: 'Sitemap'
    }
  },

  hi: {
    brand: {
      name: 'रिक्लेम X',
      tagline: 'सर्कुलरिटी एवं सामग्री पुनर्प्राप्ति प्लेटफॉर्म',
      oneLiner: 'अनुमान लगाएं क्या बचाया जा सकता है। साबित करें क्या बचाया गया। मापें क्या पुनर्प्राप्त हुआ।'
    },
    nav: {
      dashboard: 'डैशबोर्ड',
      projects: 'परियोजनाएं',
      createProject: 'परियोजना बनाएं',
      analysis: 'विश्लेषण',
      recovery: 'पुनर्प्राप्ति',
      simulator: 'सिम्युलेटर',
      admin: 'व्यवस्थापक पैनल',
      activeProject: 'सक्रिय परियोजना',
      switchProject: 'परियोजना बदलें',
      loadDemo: 'डेमो लोड करें',
      role: 'भूमिका'
    },
    dashboard: {
      title: 'अनुमान लगाएं क्या बचाया जा सकता है।',
      titleHighlight: 'साबित करें क्या पुनर्प्राप्त हुआ।',
      description: 'निर्माण और विध्वंस के लिए एआई-संचालित सर्कुलरिटी प्लेटफॉर्म। साइट की तस्वीरों से सामग्री की पहचान करें, अनुक्रम योजना बनाएं और पुनर्प्राप्ति अंतर मापें।',
      createProjectCta: 'परियोजना बनाएं',
      viewProjectsCta: 'परियोजनाएं देखें',
      loadDemoCta: 'डेमो परियोजना लोड करें',
      metrics: {
        projects: 'परियोजनाएं',
        projectsSub: 'निगरानी स्थल',
        aiAssessments: 'एआई ऑडिट',
        aiAssessmentsSub: 'सामग्री मूल्यांकन',
        potentialRecovery: 'संभावित पुनर्प्राप्ति',
        potentialRecoverySub: 'अनुमानित मूल्य',
        recoveryValue: 'पुनर्प्राप्त मूल्य',
        recoveryValueSub: 'वास्तविक मूल्य'
      },
      existingProjects: 'मौजूदा परियोजनाएं',
      viewAll: 'सभी देखें',
      noProjects: 'अभी तक कोई परियोजना नहीं बनाई गई है।',
      createFirst: 'पहली परियोजना बनाएं',
      openProject: 'परियोजना खोलें',
      howItWorks: 'रिक्लेम X कैसे काम करता है',
      step1Title: 'परियोजना बनाएं',
      step1Desc: 'इमारत का प्रकार और स्थान दर्ज करें।',
      step2Title: 'साइट तस्वीरें अपलोड करें',
      step2Desc: 'एआई दृश्य पहचान से सामग्री ढूंढता है।',
      step3Title: 'सामग्री की पुष्टि करें',
      step3Desc: 'मूल्यांकन से पहले पहचान सत्यापित करें।',
      step4Title: 'अंतर मापें',
      step4Desc: 'वास्तविक रिकॉर्ड दर्ज करें और अंतर जांचें।'
    },
    create: {
      wizardTitle: 'नई विध्वंस परियोजना',
      step1: 'परियोजना विवरण',
      step2: 'साइट तस्वीरें अपलोड करें',
      step3: 'एआई पहचान',
      step4: 'सामग्री की पुष्टि',
      step5: 'समीक्षा एवं निर्माण',
      projectName: 'परियोजना का नाम',
      projectNamePlaceholder: 'उदा. स्टर्लिंग प्लाजा विध्वंस',
      location: 'स्थान / शहर',
      locationPlaceholder: 'उदा. पुणे, महाराष्ट्र',
      typology: 'भवन प्रकार',
      commercial: 'वाणिज्यिक (कार्यालय / दुकान)',
      residential: 'आवासीय (आवास)',
      industrial: 'औद्योगिक (गोदाम / संयंत्र)',
      institutional: 'संस्थागत (स्कूल / अस्पताल)',
      mixedUse: 'मिश्रित उपयोग',
      area: 'अनुमानित क्षेत्रफल (वर्ग फुट)',
      areaPlaceholder: 'उदा. 12000',
      nextPhotos: 'आगे: तस्वीरें अपलोड करें',
      back: 'पीछे',
      uploadTitle: 'साइट तस्वीरें अपलोड करें',
      uploadDesc: 'साइट, सामग्री, कमरों या विध्वंस क्षेत्र की तस्वीरें अपलोड करें। रिक्लेम X सामग्री की पहचान करेगा।',
      dragDropText: 'तस्वीरें यहाँ खींचें और छोड़ें',
      orText: 'या',
      chooseImages: 'तस्वीरें चुनें',
      formats: 'JPG • PNG • WEBP',
      samplePhotosBtn: 'नमूना विध्वंस तस्वीरें उपयोग करें (3)',
      selectedPhotos: 'चयनित तस्वीरें',
      clearAll: 'सभी हटाएं',
      analyzeBtn: 'एआई से विश्लेषण करें',
      analyzingTitle: 'तस्वीरों का विश्लेषण जारी है...',
      analyzingSub: 'खिड़कियों, दरवाजों, स्टील और तारों का निरीक्षण हो रहा है।',
      confirmTitle: 'तस्वीरों से पहचानी गई सामग्रियां',
      confirmDesc: 'एआई द्वारा खोजी गई सामग्रियों की समीक्षा करें। आप मूल्यांकन से पहले आइटम शामिल या बाहर कर सकते हैं।',
      confidence: 'सटीकता',
      clearlyVisible: 'स्पष्ट दृश्य',
      likely: 'संभावित',
      uncertain: 'अनिश्चित साक्ष्य',
      included: 'शामिल',
      excluded: 'बहिष्कृत',
      addCustom: 'अन्य सामग्री मैन्युअल जोड़ें',
      addBtn: 'जोड़ें',
      cancelBtn: 'रद्द करें',
      proceedReview: 'समीक्षा के लिए आगे बढ़ें',
      reviewTitle: 'समीक्षा एवं पुनर्प्राप्ति मूल्यांकन',
      reviewDesc: 'परियोजना विवरण की पुष्टि करें। परियोजना बनते ही एआई मूल्यांकन शुरू होगा।',
      confirmedStreams: 'पुष्ट सामग्री धाराएं',
      createAndAuditBtn: 'परियोजना बनाएं और मूल्यांकन करें',
      creatingBtn: 'परियोजना बन रही है...'
    },
    overview: {
      title: 'परियोजना अवलोकन',
      status: 'स्थिति',
      planning: 'योजना',
      preDemolition: 'पूर्व-विध्वंस ऑडिट',
      salvageInProgress: 'पुनर्प्राप्ति प्रगति पर',
      completed: 'पूर्ण',
      reRunAi: 'पुनः एआई मूल्यांकन करें',
      analyzing: 'विश्लेषण जारी...',
      summary: {
        potentialMaterials: 'संभावित पुनर्प्राप्त सामग्री',
        estimatedValue: 'अनुमानित पुनर्प्राप्ति मूल्य',
        actualRecovery: 'वास्तविक पुनर्प्राप्ति',
        recoveryGap: 'पुनर्प्राप्ति अंतर',
        streams: 'सामग्रियां',
        netSalvage: 'शुद्ध निस्तारण मूल्य',
        confirmedRealized: 'पुष्ट प्राप्त मूल्य',
        unrecoveredDeficit: 'खोई हुई आर्थिक क्षमता'
      },
      actions: {
        sectionTitle: 'परियोजना बुद्धिमत्ता एवं मॉड्यूल',
        intelligenceTitle: 'एआई पुनर्प्राप्ति बुद्धिमत्ता',
        intelligenceDesc: 'पहचानी गई सामग्री, संभावित उपज और एआई साक्ष्य।',
        planTitle: 'पुनर्प्राप्ति अनुक्रम योजना',
        planDesc: 'सुरक्षित विखंडन का अनुक्रम और देरी से होने वाले जोखिम।',
        economicTitle: 'आर्थिक प्रभाव',
        economicDesc: 'बिक्री राजस्व, लैंडफिल शुल्क बचत और निष्कर्षण लागत।',
        actualsTitle: 'वास्तविक पुनर्प्राप्ति दर्ज करें',
        actualsDesc: 'क्षेत्र से प्राप्त वास्तविक और क्षतिग्रस्त सामग्री लिखें।',
        gapTitle: 'पुनर्प्राप्ति अंतर',
        gapDesc: 'अपेक्षित बनाम वास्तविक अंतर और खोए हुए अवसरों का विश्लेषण।',
        rootCauseTitle: 'मूल कारण विश्लेषण',
        rootCauseDesc: 'परियोजना डेटा के आधार पर सामग्री नुकसान का कारण समझें।',
        simulatorTitle: 'सिम्युलेटर',
        simulatorDesc: 'क्रम बदलकर देखें कि शुरुआती विध्वंस से क्या प्रभाव पड़ता है।'
      }
    },
    projects: {
      title: 'विध्वंस परियोजनाएं',
      subtitle: 'एआई सर्कुलरिटी ऑडिट के तहत सक्रिय परियोजनाएं प्रबंधित करें।',
      searchPlaceholder: 'परियोजना या शहर के नाम से खोजें...',
      all: 'सभी',
      commercial: 'वाणिज्यिक',
      residential: 'आवासीय',
      industrial: 'औद्योगिक',
      noProjectsFound: 'कोई परियोजना नहीं मिली।',
      createProjectBtn: 'परियोजना बनाएं'
    },
    admin: {
      title: 'रिक्लेम X व्यवस्थापक पैनल',
      subtitle: 'सिस्टम स्वास्थ्य, सुरक्षा स्थिति और गतिविधि लॉग।',
      runtime: 'रनटाइम स्थिति',
      memory: 'मेमोरी उपयोग',
      aiVision: 'एआई विजन इंजन',
      storage: 'सुरक्षा एवं डेटाबेस',
      totalSites: 'कुल विध्वंस स्थल',
      totalStreams: 'कुल सामग्री धाराएं',
      totalDiverted: 'कुल कचरा बचाया',
      totalValue: 'कुल संभावित मूल्य',
      recentAudit: 'हालिया सिस्टम गतिविधि लॉग',
      accessDenied: 'पहुंच अस्वीकृत: व्यवस्थापक अधिकार आवश्यक',
      accessDeniedDesc: 'यह पैनल केवल अधिकृत व्यवस्थापकों के लिए उपलब्ध है।',
      switchRoleDemo: 'व्यवस्थापक भूमिका में बदलें (डेमो)',
      returnDashboard: 'डैशबोर्ड पर लौटें'
    },
    common: {
      backToHub: 'परियोजना हब पर वापस जाएं',
      next: 'आगे',
      save: 'सहेजें',
      open: 'खोलें',
      close: 'बंद करें',
      tonnes: 'टन',
      viewAll: 'सभी देखें'
    },
    hero: {
      kicker: 'एक मजबूत कल का निर्माण',
      titleLine1: 'बेहतर भविष्य के लिए',
      titleLine2: 'आधुनिक निर्माण व पुनर्चक्रण।',
      subtitle: 'हम समय की कसौटी पर खरे उतरने वाले टिकाऊ और उच्च गुणवत्ता वाले सर्कुलर रिकवरी वर्कफ़्लो डिजाइन करते हैं। आवासीय से लेकर वाणिज्यिक तक, हम सटीकता और ईमानदारी के साथ विध्वंस पुनर्चक्रण को जीवंत करते हैं।',
      exploreCta: 'हमारी परियोजनाएं देखें',
      watchVideoCta: 'डेमो ऑडिट शुरू करें',
      scroll: 'स्क्रॉल करें',
      slideCount: '01 / 04'
    },
    services: {
      kicker: 'हमारी सेवाएं',
      heading: 'संपूर्ण सर्कुलर विखंडन और पुनर्चक्रण समाधान।',
      description: 'योजना से लेकर सामग्री वितरण तक, हम आपकी परियोजनाओं के अनुकूल पूर्ण स्पेक्ट्रम सेवाएं प्रदान करते हैं। हमारी एआई टीम हर संरचनात्मक और वास्तु विवरण को विशेषज्ञता के साथ संभालती है।',
      viewAll: 'सभी सेवाएं देखें',
      items: [
        {
          num: '01',
          title: 'आवासीय विखंडन',
          desc: 'आधुनिक जीवन के लिए अनुकूलित सामग्री ऑडिट, आंतरिक निस्तारण गुणवत्ता और वास्तु विवरण पर विशेष ध्यान।'
        },
        {
          num: '02',
          title: 'वाणिज्यिक विखंडन',
          desc: 'कॉर्पोरेट कार्यालय परिसरों और खुदरा स्थानों के लिए कुशल, कार्यात्मक और भविष्य-तैयार सामग्री पुनर्प्राप्ति।'
        },
        {
          num: '03',
          title: 'बुनियादी ढांचा निस्तारण',
          desc: 'सर्कुलर समुदायों की रीढ़ बनने वाले भारी संरचनात्मक स्टील, कंक्रीट और एमईपी फिक्स्चर की सुरक्षित वसूली।'
        },
        {
          num: '04',
          title: 'नवीनीकरण व रीमॉडलिंग',
          desc: 'शून्य-लैंडफिल निस्तारण, सर्कुलैरिटी लेजर और रिकवरी गैप विश्लेषण के साथ मौजूदा स्थानों का कायाकल्प।'
        }
      ]
    },
    featuredProjects: {
      kicker: 'प्रमुख परियोजनाएं',
      heading: 'प्रेरणादायी स्थान।',
      subtitle: 'हमारे हालिया विध्वंस ऑडिट और निस्तारण परियोजनाओं को देखें जहाँ नवीनता और पर्यावरणीय शिल्प कौशल मिलते हैं।',
      viewAll: 'सभी परियोजनाएं देखें',
      theRidge: 'द रिज रेसिडेंस',
      theRidgeCat: 'आवासीय',
      skyline: 'स्काईलाइन ऑफिस टॉवर',
      skylineCat: 'वाणिज्यिक',
      riverside: 'रिवरसाइड ब्रिज विखंडन',
      riversideCat: 'बुनियादी ढांचा'
    },
    stats: {
      completed: '250+',
      completedLabel: 'परियोजनाएं पूर्ण',
      experience: '15+',
      experienceLabel: 'वर्षों का अनुभव',
      satisfaction: '98%',
      satisfactionLabel: 'ग्राहक संतुष्टि',
      team: '50+',
      teamLabel: 'विशेषज्ञ सदस्य'
    },
    process: {
      kicker: 'हमारी प्रक्रिया',
      heading: 'हम आपके दृष्टिकोण को कैसे साकार करते हैं।',
      steps: [
        {
          num: '01',
          title: 'योजना',
          desc: 'हम आपके लक्ष्य, विध्वंस स्थल की सीमाओं और सामग्री निस्तारण बजट को समझते हैं।'
        },
        {
          num: '02',
          title: 'डिजाइन व पहचान',
          desc: 'हमारा एआई विजन इंजन तस्वीरों का विश्लेषण कर विस्तृत 3D सर्कुलर योजना तैयार करता है।'
        },
        {
          num: '03',
          title: 'अनुक्रम',
          desc: 'कुशल विखंडन दल सुरक्षा और सटीकता के साथ निष्कर्षण अनुक्रम को क्रियान्वित करते हैं।'
        },
        {
          num: '04',
          title: 'वितरण व मापन',
          desc: 'हम क्षेत्र के वास्तविक आंकड़ों का मिलान करते हैं और लैंडफिल बचत की पुष्टि करते हैं।'
        }
      ]
    },
    aboutUs: {
      kicker: 'हमारे बारे में',
      heading: 'विश्वास पर निर्मित, उत्कृष्टता के लिए तैयार।',
      body: 'हम पर्यावरण इंजीनियरों, सॉफ्टवेयर निर्माताओं और विध्वंस विशेषज्ञों की एक समर्पित टीम हैं जो सर्कुलर कार्यप्रवाह बनाने के लिए प्रतिबद्ध हैं। गुणवत्ता, स्थिरता और आर्थिक मूल्य पर ध्यान केंद्रित करते हुए, हम विध्वंस कचरे को मूल्यवान संपत्ति में बदलते हैं।',
      learnMore: 'और जानें',
      values: [
        { title: 'सत्यनिष्ठा', desc: 'हम पर्यावरण के लिए जो सही है वही करते हैं।' },
        { title: 'नवाचार', desc: 'हम स्मार्ट सर्कुलर एआई सिस्टम बनाते हैं।' },
        { title: 'गुणवत्ता', desc: 'हम सामग्री पुनर्प्राप्ति पर कभी समझौता नहीं करते।' },
        { title: 'साझेदारी', desc: 'आपके सर्कुलर लक्ष्य हमारी सर्वोच्च प्राथमिकता हैं।' }
      ]
    },
    testimonial: {
      kicker: 'ग्राहक समीक्षा',
      quote: 'रिक्लेम X के साथ काम करना एक सहज अनुभव था। उनके पूर्व-विध्वंस एआई विजन ऑडिट ने ₹4.2M की पुन: प्रयोज्य सामग्री की पहचान की जिसे हम अन्यथा नष्ट कर देते।',
      author: 'डैनियल कार्टर',
      role: 'निदेशक, होराइजन प्रॉपर्टीज एंड डिमोलिशन'
    },
    ctaBanner: {
      kicker: 'आइए मिलकर निर्माण करें',
      heading: 'आपकी दृष्टि। हमारी विशेषज्ञता।',
      subtitle: 'हमें अपनी विध्वंस साइट या निस्तारण आवश्यकताओं के बारे में बताएं और आइए मिलकर कुछ असाधारण बनाएं।',
      cta: 'प्रस्ताव प्राप्त करें'
    },
    footer: {
      tagline: 'एक टिकाऊ कल के लिए आधुनिक निर्माण और सर्कुलर पुनर्प्राप्ति।',
      quickLinks: 'त्वरित लिंक',
      services: 'सेवाएं',
      contact: 'संपर्क',
      phone: '+91 98765 43210',
      email: 'hello@reclaimx.com',
      address: 'मुंबई, महाराष्ट्र, भारत',
      copyright: '© 2026 RECLAIM X. सर्वाधिकार सुरक्षित।',
      privacy: 'गोपनीयता',
      terms: 'शर्तें',
      sitemap: 'साइटमैप'
    }
  },

  mr: {
    brand: {
      name: 'रिक्लेम X',
      tagline: 'सर्क्युलरिटी व साहित्य पुनर्प्राप्ती प्लॅटफॉर्म',
      oneLiner: 'काय वाचवता येईल याचा अंदाज घ्या. काय वाचवले ते सिद्ध करा. काय पुनर्प्राप्त झाले ते मोजा.'
    },
    nav: {
      dashboard: 'डॅशबोर्ड',
      projects: 'प्रकल्प',
      createProject: 'प्रकल्प तयार करा',
      analysis: 'विश्लेषण',
      recovery: 'पुनर्प्राप्ती',
      simulator: 'सिम्युलेटर',
      admin: 'प्रशासक पॅनेल',
      activeProject: 'सक्रिय प्रकल्प',
      switchProject: 'प्रकल्प बदला',
      loadDemo: 'डेमो लोड करा',
      role: 'भूमिका'
    },
    dashboard: {
      title: 'काय वाचवता येईल याचा अंदाज घ्या.',
      titleHighlight: 'काय पुनर्प्राप्त झाले ते सिद्ध करा.',
      description: 'बांधकाम आणि पाडकामासाठी एआय-चालित सर्क्युलरिटी प्लॅटफॉर्म. साइटच्या फोटोंमधून साहित्य ओळखा, पाडकामाचा क्रम ठरवा आणि पुनर्प्राप्ती तूट मोजा.',
      createProjectCta: 'प्रकल्प तयार करा',
      viewProjectsCta: 'प्रकल्प पहा',
      loadDemoCta: 'डेमो प्रकल्प लोड करा',
      metrics: {
        projects: 'प्रकल्प',
        projectsSub: 'निगराणी खालील जागा',
        aiAssessments: 'एआय मूल्यांकन',
        aiAssessmentsSub: 'साहित्य पुनर्प्राप्ती ऑडिट',
        potentialRecovery: 'संभाव्य पुनर्प्राप्ती',
        potentialRecoverySub: 'अंदाजित मूल्य',
        recoveryValue: 'पुनर्प्राप्त मूल्य',
        recoveryValueSub: 'प्रत्यक्ष मिळालेले मूल्य'
      },
      existingProjects: 'सध्याचे प्रकल्प',
      viewAll: 'सर्व पहा',
      noProjects: 'अद्याप कोणतेही प्रकल्प तयार केलेले नाहीत.',
      createFirst: 'पहिला प्रकल्प तयार करा',
      openProject: 'प्रकल्प उघडा',
      howItWorks: 'रिक्लेम X कसे कार्य करते',
      step1Title: 'प्रकल्प तयार करा',
      step1Desc: 'इमारतीचा प्रकार आणि जागा नोंदवा.',
      step2Title: 'साइटचे फोटो जोडा',
      step2Desc: 'एआय द्वारे पुनर्वापरयोग्य साहित्य शोधले जाते.',
      step3Title: 'साहित्याची खात्री करा',
      step3Desc: 'मूल्यांकनापूर्वी शोधलेले साहित्य तपासा.',
      step4Title: 'तूट मोजा',
      step4Desc: 'प्रत्यक्ष नोंदी ठेवा आणि वाया गेलेले मूल्य मोजा.'
    },
    create: {
      wizardTitle: 'नवीन पाडकाम प्रकल्प',
      step1: 'प्रकल्प तपशील',
      step2: 'साइटचे फोटो जोडा',
      step3: 'एआय ओळख',
      step4: 'साहित्याची पुष्टी',
      step5: 'पुनरावलोकन व निर्मिती',
      projectName: 'प्रकल्पाचे नाव',
      projectNamePlaceholder: 'उदा. स्टर्लिंग प्लाझा पाडकाम',
      location: 'स्थान / शहर',
      locationPlaceholder: 'उदा. पुणे, महाराष्ट्र',
      typology: 'इमारतीचा प्रकार',
      commercial: 'व्यावसायिक (कार्यालय / दुकान)',
      residential: 'निवासी (घरे / इमारती)',
      industrial: 'औद्योगिक (गोदाम / कारखाना)',
      institutional: 'संस्थात्मक (शाळा / रुग्णालय)',
      mixedUse: 'मिश्र वापर',
      area: 'अंदाजे क्षेत्रफळ (चौ.फूट)',
      areaPlaceholder: 'उदा. 12000',
      nextPhotos: 'पुढे: फोटो अपलोड करा',
      back: 'मागे',
      uploadTitle: 'साइटचे फोटो अपलोड करा',
      uploadDesc: 'साइट, साहित्य, खोल्या किंवा पाडकाम क्षेत्राचे फोटो जोडा. रिक्लेम X पुनर्वापरयोग्य साहित्य ओळखेल.',
      dragDropText: 'फोटो येथे ओढा आणि सोडा',
      orText: 'किंवा',
      chooseImages: 'फोटो निवडा',
      formats: 'JPG • PNG • WEBP',
      samplePhotosBtn: 'नमुना पाडकाम फोटो वापरा (3)',
      selectedPhotos: 'निवडलेले फोटो',
      clearAll: 'सर्व काढा',
      analyzeBtn: 'एआय द्वारे विश्लेषण करा',
      analyzingTitle: 'फोटो तपासले जात आहेत...',
      analyzingSub: 'खिडक्या, दरवाजे, स्टील आणि वायरिंगचे निरीक्षण चालू आहे.',
      confirmTitle: 'फोटोंमधून शोधलेले साहित्य',
      confirmDesc: 'एआय ने ओळखलेले साहित्य तपासा. तुम्ही मूल्यांकनापूर्वी साहित्य समाविष्ट किंवा वगळू शकता.',
      confidence: 'अचूकता',
      clearlyVisible: 'स्पष्ट दृश्य',
      likely: 'संभाव्य',
      uncertain: 'अस्पष्ट पुरावा',
      included: 'समाविष्ट',
      excluded: 'वगळले',
      addCustom: 'इतर साहित्य मॅन्युअली जोडा',
      addBtn: 'जोडा',
      cancelBtn: 'रद्द करा',
      proceedReview: 'पुढील पुनरावलोकन',
      reviewTitle: 'पुनरावलोकन आणि मूल्यांकन निर्मिती',
      reviewDesc: 'प्रकल्प तपशीलांची खात्री करा. प्रकल्प तयार होताच एआय मूल्यांकन सुरू होईल.',
      confirmedStreams: 'निश्चित साहित्य प्रवाह',
      createAndAuditBtn: 'प्रकल्प तयार करा व मूल्यांकन सुरू करा',
      creatingBtn: 'प्रकल्प तयार होत आहे...'
    },
    overview: {
      title: 'प्रकल्प विहंगावलोकन',
      status: 'स्थिती',
      planning: 'नियोजन',
      preDemolition: 'पाडकामपूर्व ऑडिट',
      salvageInProgress: 'पुनर्प्राप्ती सुरू',
      completed: 'पूर्ण',
      reRunAi: 'पुन्हा एआय मूल्यांकन करा',
      analyzing: 'विश्लेषण चालू...',
      summary: {
        potentialMaterials: 'संभाव्य पुनर्प्राप्त साहित्य',
        estimatedValue: 'अंदाजित पुनर्प्राप्ती मूल्य',
        actualRecovery: 'प्रत्यक्ष पुनर्प्राप्ती',
        recoveryGap: 'पुनर्प्राप्ती तूट',
        streams: 'साहित्य प्रकार',
        netSalvage: 'निव्वळ भंगार मूल्य',
        confirmedRealized: 'प्रत्यक्ष मिळालेले मूल्य',
        unrecoveredDeficit: 'वाया गेलेली आर्थिक क्षमता'
      },
      actions: {
        sectionTitle: 'प्रकल्प बुद्धिमत्ता आणि मॉड्यूल्स',
        intelligenceTitle: 'एआय पुनर्प्राप्ती बुद्धिमत्ता',
        intelligenceDesc: 'शोधलेले साहित्य, अंदाजित प्रमाण आणि एआय कारणमीमांसा.',
        planTitle: 'पुनर्प्राप्ती क्रम योजना',
        planDesc: 'सुरक्षित विखंडनाचा क्रम आणि उशिरामुळे होणारे नुकसान धोके.',
        economicTitle: 'आर्थिक परिणाम',
        economicDesc: 'विक्री महसूल, लँडफिल फी बचत आणि मजुरी खर्चाचा ताळेबंद.',
        actualsTitle: 'प्रत्यक्ष पुनर्प्राप्ती नोंदवा',
        actualsDesc: 'साइटवरून मिळालेले प्रत्यक्ष आणि तुटलेले साहित्य नोंदवा.',
        gapTitle: 'पुनर्प्राप्ती तूट',
        gapDesc: 'अपेक्षित विरुद्ध प्रत्यक्ष तूट आणि वाया गेलेल्या मूल्याचे मोजमाप.',
        rootCauseTitle: 'मूळ कारण विश्लेषण',
        rootCauseDesc: 'प्रकल्पातील साहित्याचे नुकसान का झाले याचे एआय विश्लेषण.',
        simulatorTitle: 'सिम्युलेटर',
        simulatorDesc: 'पाडकामाचा क्रम बदलून त्याचा पुनर्प्राप्तीवर होणारा परिणाम तपासा.'
      }
    },
    projects: {
      title: 'पाडकाम प्रकल्प',
      subtitle: 'एआय सर्क्युलरिटी ऑडिट अंतर्गत असलेले सर्व प्रकल्प व्यवस्थापित करा.',
      searchPlaceholder: 'प्रकल्प किंवा शहराच्या नावाने शोधा...',
      all: 'सर्व',
      commercial: 'व्यावसायिक',
      residential: 'निवासी',
      industrial: 'औद्योगिक',
      noProjectsFound: 'कोणताही प्रकल्प सापडला नाही.',
      createProjectBtn: 'प्रकल्प तयार करा'
    },
    admin: {
      title: 'रिक्लेम X प्रशासक पॅनेल',
      subtitle: 'सिस्टम आरोग्य, सुरक्षा पडताळणी आणि गतिविधी नोंदी.',
      runtime: 'रनटाइम स्थिती',
      memory: 'मेमरी वापर',
      aiVision: 'एआय व्हिजन इंजिन',
      storage: 'सुरक्षा व डेटाबेस',
      totalSites: 'एकूण पाडकाम जागा',
      totalStreams: 'एकूण साहित्य प्रवाह',
      totalDiverted: 'एकूण कचरा वाचवला',
      totalValue: 'एकूण संभाव्य मूल्य',
      recentAudit: 'अलीकडील सिस्टम ऑडिट नोंदी',
      accessDenied: 'प्रवेश नाकारला: प्रशासक अधिकार आवश्यक',
      accessDeniedDesc: 'हे पॅनेल केवळ अधिकृत प्रशासकांसाठी उपलब्ध आहे.',
      switchRoleDemo: 'प्रशासक भूमिकेत बदला (डेमो)',
      returnDashboard: 'डॅशबोर्डवर परत जा'
    },
    common: {
      backToHub: 'प्रकल्प हबवर परत जा',
      next: 'पुढे',
      save: 'जतन करा',
      open: 'उघडा',
      close: 'बंद करा',
      tonnes: 'टन',
      viewAll: 'सर्व पहा'
    },
    hero: {
      kicker: 'उद्याच्या मजबूत भविष्याची निर्मिती',
      titleLine1: 'उज्ज्वल भविष्यासाठी',
      titleLine2: 'आधुनिक बांधकाम व पुनर्चक्रीकरण.',
      subtitle: 'आम्ही काळाच्या कसोटीवर टिकणारे शाश्वत आणि उच्च दर्जाचे सर्क्युलर रिकव्हरी वर्कफ्लो तयार करतो. निवासी प्रकल्पांपासून व्यावसायिक संकुलांपर्यंत, आम्ही अचूकता आणि विश्वासार्हतेसह पाडकाम साहित्याचे पुनरुत्थान करतो.',
      exploreCta: 'आमचे प्रकल्प पहा',
      watchVideoCta: 'डेमो ऑडिट सुरू करा',
      scroll: 'स्क्रोल करा',
      slideCount: '०१ / ०४'
    },
    services: {
      kicker: 'आमच्या सेवा',
      heading: 'संपूर्ण सर्क्युलर विखंडन व पुनर्चक्रीकरण उपाय.',
      description: 'नियोजनापासून ते साहित्य पुनर्प्राप्तीपर्यंत, आम्ही तुमच्या पाडकाम प्रकल्पांसाठी सर्वसमावेशक सेवा देतो. आमची एआय टीम प्रत्येक वास्तू आणि रचनात्मक घटकाची काळजीपूर्वक पडताळणी करते.',
      viewAll: 'सर्व सेवा पहा',
      items: [
        {
          num: '०१',
          title: 'निवासी विखंडन',
          desc: 'आधुनिक जीवनशैलीनुसार साहित्याचे ऑडिट, अंतर्गत लाकूड, दारे व काच यांसारख्या मौल्यवान साहित्याची सुरक्षित पुनर्प्राप्ती.'
        },
        {
          num: '०२',
          title: 'व्यावसायिक विखंडन',
          desc: 'मोठ्या कॉर्पोरेट कार्यालये आणि व्यावसायिक संकुलांसाठी कार्यक्षम व भविष्यवेधी साहित्य बचाव धोरणे.'
        },
        {
          num: '०३',
          title: 'पायाभूत सुविधा निस्तारण',
          desc: 'शाश्वत समाजाचा पाया मजबूत करणारे वजनदार स्ट्रक्चरल स्टील, काँक्रीट आणि एमईपी फिक्स्चरची शास्त्रीय विल्हेवाट.'
        },
        {
          num: '०४',
          title: 'नूतनीकरण व पुनर्रचना',
          desc: 'शून्य-कचरा साध्य करण्यासाठी सर्क्युलॅरिटी लेजर, सेव्हिंग कॅल्क्युलेशन आणि रिकव्हरी गॅप विश्लेषणासह जागांचे नूतनीकरण.'
        }
      ]
    },
    featuredProjects: {
      kicker: 'प्रमुख प्रकल्प',
      heading: 'प्रेरणादायी स्थाने.',
      subtitle: 'आमचे अलीकडील पाडकाम ऑडिट आणि साहित्य बचाव प्रकल्प पहा जिथे आधुनिक तंत्रज्ञान व पर्यावरण रक्षण एकत्र येते.',
      viewAll: 'सर्व प्रकल्प पहा',
      theRidge: 'द रिज रेसिडेन्स',
      theRidgeCat: 'निवासी',
      skyline: 'स्कायलाइन ऑफिस टॉवर',
      skylineCat: 'व्यावसायिक',
      riverside: 'रिव्हरसाइड ब्रिज विखंडन',
      riversideCat: 'पायाभूत सुविधा'
    },
    stats: {
      completed: '२५०+',
      completedLabel: 'पूर्ण झालेले प्रकल्प',
      experience: '१५+',
      experienceLabel: 'वर्षांचा अनुभव',
      satisfaction: '९८%',
      satisfactionLabel: 'ग्राहक समाधान',
      team: '५०+',
      teamLabel: 'तज्ज्ञ संघ सदस्य'
    },
    process: {
      kicker: 'आमची कार्यपद्धती',
      heading: 'आम्ही तुमची दृष्टी कशी प्रत्यक्षात आणतो.',
      steps: [
        {
          num: '०१',
          title: 'नियोजन',
          desc: 'आम्ही तुमची उद्दिष्टे, पाडकामाच्या जागेचे स्वरूप आणि साहित्य बचाव बजेट नीट समजून घेतो.'
        },
        {
          num: '०२',
          title: 'डिझाइन व एआय तपासणी',
          desc: 'आमचे एआय व्हिजन इंजिन फोटोंचे विश्लेषण करून सविस्तर 3D सर्क्युलॅरिटी योजना तयार करते.'
        },
        {
          num: '०३',
          title: 'क्रमबद्ध विखंडन',
          desc: 'कुशल पाडकाम कामगार सुरक्षितता आणि अचूकतेने साहित्याचा योग्य क्रम अमलात आणतात.'
        },
        {
          num: '०४',
          title: 'वितरण व मोजमाप',
          desc: 'प्रत्यक्ष नोंदींची पडताळणी करून लँडफिल कचरा बचत आणि वेळेत काम पूर्ण करण्याची हमी देतो.'
        }
      ]
    },
    aboutUs: {
      kicker: 'आमच्याविषयी',
      heading: 'विश्वासावर आधारित, उत्कृष्टतेसाठी समर्पित.',
      body: 'आम्ही पर्यावरण अभियंते, सॉफ्टवेअर निर्माते आणि पाडकाम तज्ज्ञांचा एक समर्पित गट आहोत जो शाश्वत बांधकामासाठी कटिबद्ध आहे. दर्जा, पर्यावरण संवर्धन आणि आर्थिक बचतीवर भर देऊन आम्ही पाडकामाच्या कचऱ्याचे रूपांतर बहुमूल्य संपत्तीत करतो.',
      learnMore: 'अधिक जाणून घ्या',
      values: [
        { title: 'प्रामाणिकपणा', desc: 'आम्ही पर्यावरणासाठी जे योग्य आहे तेच करतो.' },
        { title: 'नावीन्य', desc: 'आम्ही स्मार्ट सर्क्युलर एआय अल्गोरिदम विकसित करतो.' },
        { title: 'गुणवत्ता', desc: 'आम्ही साहित्य पुनर्प्राप्तीच्या दर्जाशी कधीही तडजोड करत नाही.' },
        { title: 'भागीदारी', desc: 'तुमची शाश्वत उद्दिष्टे हीच आमची सर्वोच्च प्राथमिकता आहे.' }
      ]
    },
    testimonial: {
      kicker: 'ग्राहकांचे अभिप्राय',
      quote: 'रिक्लेम X सोबत काम करण्याचा अनुभव अतिशय उत्कृष्ट होता. त्यांच्या पाडकामपूर्व एआय ऑडिटमुळे ₹४२ लाखांचे फेरवापरयोग्य साहित्य वाचले जे अन्यथा कचऱ्यात नष्ट झाले असते.',
      author: 'डॅनिएल कार्टर',
      role: 'संचालक, होरायझन प्रॉपर्टीज अँड डिमॉलिशन्स'
    },
    ctaBanner: {
      kicker: 'चला एकत्र काम करूया',
      heading: 'तुमची दृष्टी. आमचे कौशल्य.',
      subtitle: 'तुमच्या पाडकाम साइट किंवा साहित्य बचाव गरजेबद्दल आम्हाला सांगा आणि चला मिळून काहीतरी असामान्य घडवूया.',
      cta: 'कोटेशन मिळवा'
    },
    footer: {
      tagline: 'शाश्वत भविष्यासाठी आधुनिक बांधकाम व सर्क्युलर पुनर्प्राप्ती.',
      quickLinks: 'महत्त्वाचे दुवे',
      services: 'सेवा',
      contact: 'संपर्क',
      phone: '+९१ ९८७६५ ४३२१०',
      email: 'hello@reclaimx.com',
      address: 'मुंबई, महाराष्ट्र, भारत',
      copyright: '© २०२६ RECLAIM X. सर्व हक्क राखीव.',
      privacy: 'गोपनीयता धोरण',
      terms: 'अटी व शर्ती',
      sitemap: 'साइटमॅप'
    }
  }
};
