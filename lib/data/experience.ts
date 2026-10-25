export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  location?: string | null;
  period: string;
  startDate?: Date | null;
  endDate?: Date | null;
  current: boolean;
  description?: string | null;
  highlights: string[];
  skills: string[];
  displayOrder: number;
  featured: boolean;
}

export const initialExperiences: ExperienceItem[] = [
  {
    id: "exp-exl",
    company: "EXL Service · Insurance & Actuarial AI Practice",
    role: "Lead Data Scientist & Analytics Architect",
    location: "India · Open to Global / Relocation",
    period: "2023 — Present",
    current: true,
    description: "Insurance & Actuarial AI Practice Lead",
    highlights: [
      "Architected and deployed enterprise compound Generalized Linear Models (Poisson frequency × Gamma severity) for commercial property casualty underwriting, unlocking +$12M in annual premium adjustments.",
      "Engineered automated NLP triage pipeline on Google Vertex AI utilizing fine-tuned transformer architectures to extract unstructured claimant injury severity, reducing triage cycle duration by 70%.",
      "Authored end-to-end model governance whitepapers complying with strict US state regulatory filing standards, ensuring zero black-box bias and full statistical auditability.",
      "Directed cross-functional sprints across actuaries, software engineers, and underwriting executives to align algorithmic output with commercial loss-ratio targets.",
    ],
    skills: ["Compound GLMs", "Google Vertex AI", "PyTorch", "Model Governance", "Actuarial Science"],
    displayOrder: 1,
    featured: true,
  },
  {
    id: "exp-media-chronicle",
    company: "Media Chronicle · Privacy-First Edge Vision",
    role: "Applied AI Systems Architect (Founding Engineer)",
    location: "Remote",
    period: "2024",
    current: false,
    description: "Privacy-preserving on-device biometric indexing appliance",
    highlights: [
      "Built an autonomous local-first biometric indexing system utilizing YOLOv8 and quantized on-device embeddings, delivering sub-100ms real-time recognition with zero cloud egress cost.",
      "Formulated privacy-preserving local edge caching layer eliminating vendor lock-in and minimizing consumer hardware overhead.",
    ],
    skills: ["YOLOv8", "Edge Vision", "Quantization", "Local-First Architecture"],
    displayOrder: 2,
    featured: true,
  },
  {
    id: "exp-washqueue",
    company: "WashQueue Smart Appliance & Platform",
    role: "Full-Stack Systems Engineer",
    location: "India",
    period: "2024",
    current: false,
    description: "Low-latency telemetry streaming & IoT appliance platform",
    highlights: [
      "Implemented low-latency telemetry streaming using FastAPI, WebSockets, and Redis for real-time appliance state synchronization across 500+ simulated nodes.",
      "Engineered containerized deployment topology with Docker and automated CI/CD GitHub Actions pipelines.",
    ],
    skills: ["FastAPI", "WebSockets", "Redis", "Docker", "CI/CD"],
    displayOrder: 3,
    featured: true,
  },
];
