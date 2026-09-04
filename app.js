/**
 * Arav Mendiratta - Personal Portfolio Interactive Logic
 * Projects rendering, category filtering, terminal CLI, modal, and animations
 */

document.addEventListener('DOMContentLoaded', () => {
  // =========================================================================
  // 1. Projects Data Definition
  // =========================================================================
  const projectsData = [
    {
      id: 'market-data-platform',
      title: 'Market Data Reliability & Streaming Platform',
      category: 'systems',
      categoryLabel: 'Data Systems & Streaming',
      metric: '>25,000 msg/s',
      description: 'Distributed, deterministic market data simulator and streaming engine with configurable fault injection and a 5-dimension Data Quality Engine validating high-throughput feeds.',
      tags: ['Redpanda / Kafka', 'PostgreSQL', 'Docker', 'Prometheus', 'Python', 'Grafana'],
      githubUrl: 'https://github.com/aravmendiratta/Market-Data-Operations-Project-',
      demoUrl: 'https://github.com/aravmendiratta/Market-Data-Operations-Project-',
      architecture: [
        'Deterministic Market Simulator: Generates stochastic trades, quotes, and order events with controllable packet drop, out-of-order arrival, and corrupt payload injection.',
        '5-Dimension Data Quality Engine: Enforces real-time checks across Validity, Completeness, Freshness, Ordering, and Uniqueness for at-least-once message streams.',
        'Real-time L2 Order Book Reconstructor: Computes rolling microsecond VWAP, Bid-Ask spread, order book depth, and imbalance under sustained 25,000+ msg/s throughput.',
        'Observability & Telemetry: Integrated Prometheus metrics and Grafana alerts for latency spikes, processing bottlenecks, and dropped packet monitoring.'
      ]
    },
    {
      id: 'fx-analytics-engine',
      title: 'Cloud-Based FX Trading Analytics Engine',
      category: 'systems',
      categoryLabel: 'Data Systems & Streaming',
      metric: '10M+ Records',
      description: 'Production-grade big data pipeline processing over 10 million Level-2 Foreign Exchange tick records across major currency pairs using PySpark on Databricks with MiFID II compliance.',
      tags: ['PySpark', 'Databricks', 'AWS', 'Delta Lake', 'MiFID II', 'Structured Streaming'],
      githubUrl: 'https://github.com/aravmendiratta/cloud-based-foreign-exchange-analytics',
      demoUrl: 'https://github.com/aravmendiratta/cloud-based-foreign-exchange-analytics',
      architecture: [
        'Scalable Databricks Lakehouse: Ingests multi-gigabyte tick datasets with strict schema enforcement and ACID transaction guarantees into Delta Lake.',
        'PySpark Structured Streaming: Implements sliding and tumbling window aggregations to compute rolling volume-weighted average prices (VWAP) and order flow dynamics.',
        'MiFID II Best Execution Module: Automated regulatory compliance engine detecting off-market transaction anomalies and trade execution discrepancies.'
      ]
    },
    {
      id: 'geometric-drug-discovery',
      title: 'Geometric Drug Discovery (EGNN)',
      category: 'bioinfo',
      categoryLabel: 'Bioinformatics & Vision',
      metric: 'E(3) Equivariant GNN',
      description: 'Architected an Equivariant Graph Neural Network (EGNN) in PyTorch to predict protein-ligand binding affinities by preserving 3D rotational and translational symmetries.',
      tags: ['PyTorch', 'RDKit', 'Biopython', 'Graph Neural Networks', 'E(3) Equivariance'],
      githubUrl: 'https://github.com/aravmendiratta/Geometric_Drug_Discovery',
      demoUrl: 'https://github.com/aravmendiratta/Geometric_Drug_Discovery',
      architecture: [
        '3D Molecular Ingestion Pipeline: Parses raw .pdb and .sdf files directly into geometric graph representations, utilizing Biopython and RDKit for atom-level feature extraction.',
        'Equivariant Convolutional Layers (EGCL): Updates node hidden states and coordinate matrices in tandem, strictly preserving physical 3D spatial orientations.',
        'Angstrom-Scale Numerical Stabilization: Implemented coordinate centroid normalization and gradient clipping to stabilize training over massive distance matrices.'
      ]
    },
    {
      id: 'single-cell-foundation-model',
      title: 'Single-Cell Foundation Model',
      category: 'aiml',
      categoryLabel: 'AI & Deep Learning',
      metric: '10,000+ Matrices',
      description: 'End-to-end Machine Learning pipeline to train and evaluate Transformer Foundation Models on single-cell RNA sequencing (scRNA-seq) data using cell-to-sentence tokenization.',
      tags: ['PyTorch', 'Hugging Face', 'Scanpy', 'Transformers', 'MLM', 'scRNA-seq'],
      githubUrl: 'https://github.com/aravmendiratta/single_cell_foundation_model',
      demoUrl: 'https://github.com/aravmendiratta/single_cell_foundation_model',
      architecture: [
        'Biological Tokenization Engine: Converts continuous gene expression profiles into rank-ordered "cell sentences" (Cell2Sentence) via Scanpy preprocessing.',
        'Pre-trained Masked Language Modeling (MLM): Trains bidirectional Transformer encoders on over 10,000 cell matrices to discover intrinsic regulatory gene relationships.',
        'Downstream Transfer Learning: Fine-tuned representations achieve high accuracy for rare cell-type identification with limited labeled examples.'
      ]
    },
    {
      id: 'clinical-intelligence-platform',
      title: 'Clinical Intelligence Platform (RAG)',
      category: 'aiml',
      categoryLabel: 'AI & Deep Learning',
      metric: '>85% Less Hallucination',
      description: 'Enterprise Retrieval-Augmented Generation (RAG) platform to query unstructured medical records with verifiable citations, low-latency SSE streaming, and full auditability.',
      tags: ['FastAPI', 'React', 'OpenAI', 'Qdrant', 'Clean Architecture', 'SSE'],
      githubUrl: 'https://github.com/aravmendiratta/clinical-intelligence-platform',
      demoUrl: 'https://github.com/aravmendiratta/clinical-intelligence-platform',
      architecture: [
        'High-Performance Async Backend: FastAPI service adhering to Clean Architecture principles, indexing and chunking 50,000+ clinical documents into Qdrant vector database.',
        'Hybrid Retrieval & Citation Verification: Combines dense semantic vector retrieval with sparse keyword indexing, generating verifiable citation footnotes to suppress hallucinations by >85%.',
        'Real-time SSE Streaming: React UI leverages Server-Sent Events for word-by-word streaming generation, slashing perceived response latency by 40%.'
      ]
    },
    {
      id: 'table-tennis-referee',
      title: 'Deep Learning Table Tennis Referee',
      category: 'aiml',
      categoryLabel: 'AI & Deep Learning',
      metric: '120fps Real-Time Vision',
      description: 'End-to-end computer vision pipeline predicting match scores directly from raw 120fps video streams by combining Meta DINOv2 / V-JEPA with GRUs and custom Temporal Window Loss.',
      tags: ['PyTorch', 'Meta DINOv2', 'V-JEPA', 'GRU', 'Computer Vision'],
      githubUrl: 'https://github.com/aravmendiratta',
      demoUrl: 'https://docs.google.com/presentation/d/1SoIuDp2XWWY6JBRJQE6oJZemcqlin-PTChuGxmIjwJ8/edit?usp=sharing',
      architecture: [
        'Scoreboard-Agnostic Learning: Masks on-screen digital scoreboards to force the model to interpret subtle game mechanics (serves, paddle contacts, table bounces) rather than relying on OCR.',
        'Spatio-Temporal Dual Backbone: Meta DINOv2 / V-JEPA foundation vision encoders extract frame-level spatial cues, feeding a recurrent GRU for temporal sequence modeling.',
        'Custom Temporal Window Loss: Formulated a novel loss function to bridge the 3-7 second asynchronous delay between in-game point conclusion and scoreboard operator updates.'
      ]
    },
    {
      id: 'crop-pathology-assessment',
      title: 'Tomato Crop Pathology Assessment',
      category: 'bioinfo',
      categoryLabel: 'Bioinformatics & Vision',
      metric: '97%+ Accuracy (ICRCET)',
      description: 'Peer-reviewed hybrid CNN system classifying 10 disease categories across 16,011 agricultural images, featuring automated pathogen detection and severity grading.',
      tags: ['PyTorch', 'OpenCV', 'Hybrid CNN', 'ICRCET-2024 Publication', 'Image Processing'],
      githubUrl: 'https://github.com/aravmendiratta',
      demoUrl: 'https://github.com/aravmendiratta',
      architecture: [
        'Published Architecture: Developed at ICRCET-2024; dual-stream hybrid CNN combining lightweight convolutional layers with multi-scale feature aggregation.',
        'Multi-stage Diagnostic Pipeline: Integrates pathogen localization, healthy vs. infected leaf segmentation, and quantitative severity grading.',
        'Production Viability: Optimized for low-latency inference on edge agricultural hardware, demonstrating high transferability to biomedical cell imaging.'
      ]
    }
  ];

  // =========================================================================
  // 2. Render Projects & Filter Logic
  // =========================================================================
  const projectsGrid = document.getElementById('projects-grid');
  const filterBtns = document.querySelectorAll('.filter-btn');

  function renderProjects(filter = 'all') {
    if (!projectsGrid) return;
    projectsGrid.innerHTML = '';

    const filtered = filter === 'all' 
      ? projectsData 
      : projectsData.filter(p => p.category === filter);

    filtered.forEach(p => {
      const card = document.createElement('article');
      card.className = 'project-card glass-panel';
      card.setAttribute('data-id', p.id);

      card.innerHTML = `
        <div class="project-header-top">
          <span class="project-category-badge">${p.categoryLabel}</span>
          <span class="project-metric-pill">${p.metric}</span>
        </div>
        <h3 class="project-title">${p.title}</h3>
        <p class="project-desc">${p.description}</p>
        <div class="project-tags">
          ${p.tags.map(t => `<span class="tech-tag">${t}</span>`).join('')}
        </div>
        <div class="project-footer">
          <button class="project-btn-deep-dive" data-project-id="${p.id}">
            <span>Architecture Deep Dive</span> <i class="fa-solid fa-arrow-right"></i>
          </button>
          <a href="${p.githubUrl}" target="_blank" rel="noopener noreferrer" class="project-repo-link" title="Open GitHub Repo">
            <i class="fa-brands fa-github"></i>
          </a>
        </div>
      `;

      projectsGrid.appendChild(card);
    });

    // Reattach modal triggers
    document.querySelectorAll('.project-btn-deep-dive').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-project-id');
        openProjectModal(id);
      });
    });
  }

  // Filter Button Click Handlers
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      renderProjects(filter);
    });
  });

  // Initial render
  renderProjects('all');

  // =========================================================================
  // 3. Project Deep Dive Modal
  // =========================================================================
  const modal = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalCategory = document.getElementById('modal-category');
  const modalMetric = document.getElementById('modal-metric');
  const modalTitle = document.getElementById('modal-title');
  const modalTags = document.getElementById('modal-tags');
  const modalDescription = document.getElementById('modal-description');
  const modalArchitectureList = document.getElementById('modal-architecture-list');
  const modalRepoLink = document.getElementById('modal-repo-link');
  const modalDemoLink = document.getElementById('modal-demo-link');

  function openProjectModal(id) {
    const project = projectsData.find(p => p.id === id);
    if (!project || !modal) return;

    modalCategory.textContent = project.categoryLabel;
    modalMetric.textContent = project.metric;
    modalTitle.textContent = project.title;
    modalDescription.textContent = project.description;

    modalTags.innerHTML = project.tags.map(t => `<span class="tech-tag">${t}</span>`).join('');
    modalArchitectureList.innerHTML = project.architecture.map(item => `<li>${item}</li>`).join('');

    modalRepoLink.href = project.githubUrl;
    modalDemoLink.href = project.demoUrl;

    if (project.id === 'table-tennis-referee') {
      modalDemoLink.innerHTML = '<i class="fa-solid fa-file-powerpoint"></i> View Slide Deck';
    } else if (project.id === 'crop-pathology-assessment') {
      modalDemoLink.innerHTML = '<i class="fa-solid fa-book-open"></i> ICRCET-2024 Publication';
    } else {
      modalDemoLink.innerHTML = '<i class="fa-solid fa-arrow-up-right-from-square"></i> Project Demo / Code';
    }

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeProjectModal() {
    if (!modal) return;
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeProjectModal);
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeProjectModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
      closeProjectModal();
    }
  });

  // =========================================================================
  // 4. Interactive Developer CLI Terminal
  // =========================================================================
  const terminalInput = document.getElementById('terminal-input');
  const terminalOutput = document.getElementById('terminal-output');
  const terminalClearBtn = document.getElementById('terminal-clear-btn');
  const termChips = document.querySelectorAll('.term-chip');

  const cliCommands = {
    help: () => `
<span class="cmd-highlight">Available Commands:</span>
  <span class="accent-text">about</span>       - Executive summary of Arav Mendiratta
  <span class="accent-text">projects</span>    - List core GitHub repositories & platforms
  <span class="accent-text">skills</span>      - Breakdown of technical competencies & tools
  <span class="accent-text">research</span>    - Seminars & peer-reviewed publications
  <span class="accent-text">experience</span>  - Industry & research background
  <span class="accent-text">thesis</span>      - Master's thesis collaboration inquiry
  <span class="accent-text">contact</span>     - Email, LinkedIn, and GitHub links
  <span class="accent-text">resume</span>      - Open / download CV in PDF
  <span class="accent-text">theme</span>       - Toggle between Light & Dark themes
  <span class="accent-text">clear</span>       - Clear current shell history
`,
    about: () => `
<span class="cmd-highlight">Arav Mendiratta</span> | M.Sc. Computer Science @ University of Freiburg
Focus: AI / Machine Learning, Distributed Streaming Systems, Computational Biology.
Passionate about engineering reliable, scalable, and high-throughput software architectures that solve complex real-world problems.
`,
    projects: () => `
<span class="cmd-highlight">Featured GitHub Projects:</span>
  1. <span class="accent-text">Market Data Platform</span>: >25k msg/s, Kafka, Postgres, Prometheus
     Repo: https://github.com/aravmendiratta/Market-Data-Operations-Project-
  2. <span class="accent-text">FX Analytics Engine</span>: 10M+ records, PySpark, Databricks, AWS
     Repo: https://github.com/aravmendiratta/cloud-based-foreign-exchange-analytics
  3. <span class="accent-text">Geometric Drug Discovery</span>: 3D Equivariant GNN (EGNN), PyTorch, RDKit
     Repo: https://github.com/aravmendiratta/Geometric_Drug_Discovery
  4. <span class="accent-text">Single-Cell Foundation Model</span>: Cell2Sentence, Transformers, Scanpy
     Repo: https://github.com/aravmendiratta/single_cell_foundation_model
  5. <span class="accent-text">Clinical Intelligence RAG</span>: FastAPI, Qdrant, SSE Streaming
     Repo: https://github.com/aravmendiratta/clinical-intelligence-platform
  6. <span class="accent-text">Deep Learning Table Tennis Referee</span>: DINOv2, V-JEPA, Temporal Window Loss
  7. <span class="accent-text">Tomato Crop Pathology</span>: Published at ICRCET-2024, 97%+ accuracy
`,
    skills: () => `
<span class="cmd-highlight">Technical Stack Breakdown:</span>
  • <span class="accent-text">Languages:</span> Python (Expert), SQL, TypeScript, Bash, C/C++
  • <span class="accent-text">AI / ML:</span> PyTorch, Hugging Face, Transformers, RAG, DINOv2, EGNN
  • <span class="accent-text">Data / Systems:</span> Databricks, PySpark, Kafka, Redpanda, PostgreSQL, Redis
  • <span class="accent-text">DevOps & Cloud:</span> AWS, Docker, Kubernetes, GitHub Actions CI/CD, FastAPI
  • <span class="accent-text">Bioinformatics:</span> Scanpy, Cell2Sentence, RDKit, Biopython
`,
    research: () => `
<span class="cmd-highlight">Academic Research & Seminars:</span>
  1. <span class="accent-text">Grad-CAMO (Feb 2026):</span> Trustworthy AI Seminar, Uni Freiburg. Audited single-cell 3D Cell Painting interpretability.
  2. <span class="accent-text">SSSL-HAR (Aug 2026):</span> Intelligent Embedded Systems. Built full reproduction of synthetic IMU contrastive learning (88.15% zero-shot accuracy).
  3. <span class="accent-text">ICRCET-2024 Publication:</span> Hybrid CNN crop pathology detection on 16,011 images.
`,
    thesis: () => `
<span class="cmd-highlight">Master's Thesis Collaboration:</span>
  I am actively looking for passionate researchers and industry labs for my Master's thesis starting 2026/2027.
  Primary interests: AI Foundation Models in Life Sciences, High-Throughput Streaming ML, or Trustworthy Machine Learning.
  Reach out directly: arav.mendiratta1@gmail.com
`,
    experience: () => `
<span class="cmd-highlight">Experience Highlights:</span>
  • <span class="accent-text">Student Researcher</span> @ CRC 1597 Small Data (May 2026 - July 2026)
    - scRNA-seq pipeline, Cell2Sentence (10k+ gene count matrices), MLOps with GitHub Actions.
  • <span class="accent-text">Data Scientist (Working Student)</span> @ Capgemini Germany (June 2025 - Dec 2025)
    - AUDI GenAI Platform (AWS CDK, Docker, FastAPI), multi-million € Life Sciences portfolio structuring.
`,
    contact: () => `
<span class="cmd-highlight">Contact Coordinates:</span>
  Email:    arav.mendiratta1@gmail.com
  Phone:    +49 15510 134845
  LinkedIn: https://www.linkedin.com/in/aravmendiratta/
  GitHub:   https://github.com/aravmendiratta
  Location: Düsseldorf / Freiburg, Germany
`,
    resume: () => {
      window.open('assets/Arav_Mendiratta_Resume.pdf', '_blank');
      return `<span class="accent-text">Opening Arav_Mendiratta_Resume.pdf in a new tab...</span>`;
    },
    theme: () => {
      toggleTheme();
      const current = document.documentElement.getAttribute('data-theme');
      return `<span class="accent-text">Theme switched to ${current.toUpperCase()} mode.</span>`;
    }
  };

  function executeCommand(inputRaw) {
    const input = inputRaw.trim().toLowerCase();
    if (!input) return;

    // Echo input line
    const echoLine = document.createElement('div');
    echoLine.className = 'term-line';
    echoLine.innerHTML = `<span class="term-prompt"><span class="prompt-user">arav@freiburg</span>:<span class="prompt-dir">~</span>$</span> ${inputRaw}`;
    terminalOutput.appendChild(echoLine);

    if (input === 'clear') {
      terminalOutput.innerHTML = '';
      terminalInput.value = '';
      return;
    }

    const responseDiv = document.createElement('div');
    responseDiv.className = 'term-line';

    if (cliCommands[input]) {
      const res = cliCommands[input]();
      responseDiv.innerHTML = res;
    } else {
      responseDiv.innerHTML = `<span style="color: #ef4444;">command not found: ${inputRaw}</span>. Type <span class="cmd-highlight">help</span> for available commands.`;
    }

    terminalOutput.appendChild(responseDiv);
    terminalInput.value = '';

    // Auto-scroll
    const termBody = document.getElementById('terminal-body');
    if (termBody) {
      termBody.scrollTop = termBody.scrollHeight;
    }
  }

  if (terminalInput) {
    terminalInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        executeCommand(terminalInput.value);
      }
    });
  }

  if (terminalClearBtn) {
    terminalClearBtn.addEventListener('click', () => {
      if (terminalOutput) terminalOutput.innerHTML = '';
    });
  }

  termChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const cmd = chip.getAttribute('data-cmd');
      if (terminalInput) {
        terminalInput.value = cmd;
        executeCommand(cmd);
      }
    });
  });

  // =========================================================================
  // 5. Light / Dark Theme Switcher with LocalStorage
  // =========================================================================
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);
    if (themeIcon) {
      if (theme === 'light') {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
      } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
      }
    }
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }

  // Load stored theme or default to dark
  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
  applyTheme(savedTheme);

  // =========================================================================
  // 6. Mobile Navigation Drawer
  // =========================================================================
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const navMenu = document.getElementById('nav-menu');

  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
      });
    });
  }

  // =========================================================================
  // 7. Dynamic Metric Counters on Scroll
  // =========================================================================
  const metricCards = document.querySelectorAll('.metric-card');
  let countersStarted = false;

  function runCounters() {
    if (countersStarted) return;
    countersStarted = true;

    metricCards.forEach(card => {
      const numElem = card.querySelector('.metric-number');
      if (!numElem) return;
      const target = parseInt(numElem.getAttribute('data-target'), 10);
      const suffix = numElem.getAttribute('data-suffix') || '';

      let count = 0;
      const step = Math.max(1, Math.ceil(target / 40));
      const interval = setInterval(() => {
        count += step;
        if (count >= target) {
          count = target;
          clearInterval(interval);
        }
        numElem.textContent = count.toLocaleString() + suffix;
      }, 30);
    });
  }

  const metricsSection = document.querySelector('.metrics-container');
  if (metricsSection && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          runCounters();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    observer.observe(metricsSection);
  } else {
    runCounters();
  }

  // =========================================================================
  // 8. Active Section Spy
  // =========================================================================
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  });

  // =========================================================================
  // 9. Ambient Canvas Constellation / Particle Network
  // =========================================================================
  const canvas = document.getElementById('ambient-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = Math.min(45, Math.floor(window.innerWidth / 30));

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 1.8 + 0.8
      });
    }

    function animateParticles() {
      ctx.clearRect(0, 0, width, height);

      const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
      const particleColor = isDark ? 'rgba(16, 185, 129, 0.4)' : 'rgba(16, 185, 129, 0.2)';
      const lineColor = isDark ? 'rgba(6, 182, 212, 0.08)' : 'rgba(6, 182, 212, 0.05)';

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = particleColor;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = lineColor;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animateParticles);
    }

    animateParticles();
  }

  // =========================================================================
  // 10. Toast Helper
  // =========================================================================
  window.showToast = function(msg) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  };
});
