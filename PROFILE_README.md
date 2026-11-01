# Arav Mendiratta

**AI Systems Engineer & M.Sc. Computer Science Researcher at the University of Freiburg**  
Freiburg im Breisgau, Germany · [aravmendiratta.github.io](https://aravmendiratta.github.io) · [arav.mendiratta1@gmail.com](mailto:arav.mendiratta1@gmail.com) · [LinkedIn](https://www.linkedin.com/in/arav-mendiratta)

---

### Focus & Availability

- **Research:** Student Researcher at **CRC 1597 "Small Data"** (Institute of Medical Biometry and Statistics, University of Freiburg) working on LLM-judged ordinal embeddings (`scTriplets`), `Cell2Sentence` single-cell foundation models, and $E(3)$ equivariant molecular graphs.
- **Industry:** Former Data Scientist (Working Student) at **Capgemini Germany** (Stuttgart), co-developing an enterprise generative AI visual prototyping platform for **AUDI AG** (diffusion pipelines, custom LoRA adapters, AWS CDK/S3/EC2, FastAPI microservices with 95%+ Pytest coverage).
- **Availability:** **100% of Master's coursework, seminars, and exam credits completed** (only the Master's Thesis remains). Available full-time for **Master's Thesis collaborations** or **Working Student / Full-Time Engineering roles** across Germany.
- **Recent Recognition:** **2nd Place / Runner Up — Black Forest Hackathon 2026**.

---

### Selected Engineering & Research Systems

| System / Research Project | Domain | Key Architecture & Benchmarks | Links |
| :--- | :--- | :--- | :--- |
| **scTriplets (CRC 1597 Small Data)** | Single-Cell LLMs | `Cell2Sentence`, Jain $O(d n \ln n)$ bound ($93.5\text{k}$ triplets), Two-Pass Consensus + CoT v5 (`GPT-OSS-20B`), Student-t **t-STE** (**ASW 0.693 vs 0.576 PCA**, peak **0.748**) | [Portfolio](https://aravmendiratta.github.io/#research) |
| **Market Data Streaming Platform** | Distributed Systems | Kafka/Redpanda, PostgreSQL, Redis, Prometheus; **>25,000 msg/s** sustained ingestion, 5D Data Quality Engine, microsecond L2 order book rebuild | [GitHub](https://github.com/aravmendiratta/Market-Data-Operations-Project-) |
| **Cloud FX Trading Analytics Engine** | Lakehouse & FinTech | PySpark Structured Streaming, Databricks Lakehouse, AWS S3, Delta Lake; **10M+** L2 FX tick records, sliding/tumbling VWAP, MiFID II auditing | [GitHub](https://github.com/aravmendiratta/cloud-based-foreign-exchange-analytics) |
| **Geometric Drug Discovery (EGNN)** | Scientific ML | PyTorch, RDKit, Biopython; 3D $E(3)$ Equivariant GNN over raw `.pdb` & `.sdf` atomic coordinates preserving rotational/translational symmetries | [GitHub](https://github.com/aravmendiratta/Geometric_Drug_Discovery) |
| **Single-Cell Foundation Model** | Bioinformatics | PyTorch, Hugging Face Transformers, Scanpy; rank-ordered `Cell2Sentence` Masked Language Modeling across **10,000+** profiles (**+35%** rare cell recall) | [GitHub](https://github.com/aravmendiratta/single_cell_foundation_model) |
| **Clinical Intelligence Platform** | Production RAG | FastAPI (Clean Architecture), React, Qdrant hybrid search, OpenAI, SSE; **50,000+** clinical docs, **>85%** hallucination reduction, **-40%** latency | [GitHub](https://github.com/aravmendiratta/clinical-intelligence-platform) |
| **SSSL-HAR Wearable Sensing** | Edge & Embedded AI | PyTorch, 1D-CNN, InfoNCE Contrastive Learning, 3D IMU rotation augmentations; **88.15% zero-shot accuracy** on PAMAP2 | [GitHub](https://github.com/aravmendiratta/SSSL_HAR) · [Live Demo](https://sssl-har-ui.vercel.app) |
| **Deep Learning Table Tennis Referee** | Video Understanding | PyTorch, Meta DINOv2, Meta V-JEPA, Bi-GRU; custom **Temporal Window Loss** solving 3–7s human operator lag on 120fps video | [Slide Deck](https://docs.google.com/presentation/d/1SoIuDp2XWWY6JBRJQE6oJZemcqlin-PTChuGxmIjwJ8/edit?usp=sharing) |
| **Tomato Crop Pathology CNN** | Computer Vision | Dual-Stream Hybrid CNN (3x3 spatial + dilated context + CLAHE); **97.2% accuracy** across 16,011 images with **38% fewer FLOPs** (*ICRCET-2024 Conference Presentation*) | [Portfolio](https://aravmendiratta.github.io/#research) |

---

### Technical Stack

- **AI & Scientific ML:** PyTorch, Hugging Face Transformers, Meta DINOv2, Meta V-JEPA, Diffusion & LoRA, $E(3)$ Equivariant GNNs, Contrastive Learning (InfoNCE), Scanpy, AnnData, scIB, RDKit, Biopython, Captum, OpenCV
- **Data & Streaming Platforms:** Apache Kafka, Redpanda, PySpark Structured Streaming, Databricks Lakehouse, Delta Lake, Microsoft Fabric, OneLake, Power BI Direct Lake & DAX, PostgreSQL, Redis, Qdrant
- **Cloud, Edge & MLOps:** Python, C++17, SQL, Bash, AWS (CDK, EC2, S3), FastAPI, TensorRT FP16, ONNX Runtime, Docker, SLURM HPC, GitHub Actions CI/CD, Pytest
