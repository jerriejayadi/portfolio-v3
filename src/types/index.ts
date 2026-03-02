export interface Experience {
  id: string;
  role: string;
  company: string;
  period: { start: string; end?: string };
  description: string;
  skills: string[];
  current?: boolean;
  companyLogo?: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  slug?: string;
  path: string;
  type: "PROJECTS" | "LABS" | "THOUGHTS";
  status?: "FINISHED" | "ON_PROGRESS";
  techStack?: string[];
  lastCommit?: string;
  startedAt?: string;
  description?: string;
  publishedAt?: string;
  snippet?: string;
  preview?: {
    title?: string;
    image?: string;
    description?: string;
    content?: string;
    statusColor?: string;
  };
  // UI helpers (mapped from data)
  iconName?: "Briefcase" | "FlaskConical" | "FileText";
  iconColor?: string;
  iconBg?: string;
  hoverColor?: string;
  hoverBorder?: string;
  badgeColor?: string;
  statusColor?: string;
}

