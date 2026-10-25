import { prisma } from "./prisma";

export interface WorkspaceSettings {
  displayName: string;
  headline: string;
  bio: string;
  locationPill: string;
  educationBadge: string;
  contactEmail: string;
  githubUsername: string;
  linkedinUrl: string;
  twitterUrl: string;
  cvDownloadUrl: string;
  githubToken: string;
  mediumToken: string;
  trelloBoardUrl: string;
  rolesConfig: {
    superAdminPasscode: string;
    adminPasscode: string;
    devPasscode: string;
  };
  lastUpdated: string;
}

let memorySettings: WorkspaceSettings = {
  displayName: "Akshat Dhaundiyal",
  headline: "AI Product Strategy & Applied ML Systems",
  bio: "Lead Analytics Architect and MBA Candidate bridging mathematical soundness with commercial enterprise outcomes. Architect of +$12M impact systems.",
  locationPill: "India (GMT +5:30) • MBA Candidate",
  educationBadge: "MBA Candidate @ High-Leverage AI Systems",
  contactEmail: "akshatdhaundiyal@gmail.com",
  githubUsername: "akshatdhaundiyal",
  linkedinUrl: "https://linkedin.com/in/akshatdhaundiyal",
  twitterUrl: "https://twitter.com/akshatdhaundiyal",
  cvDownloadUrl: "/resume",
  githubToken: "ghp_mock_live_telemetry_token_99182",
  mediumToken: "",
  trelloBoardUrl: "https://trello.com/b/akshat-studio-production",
  rolesConfig: {
    superAdminPasscode: "super123",
    adminPasscode: "admin123",
    devPasscode: "dev123",
  },
  lastUpdated: "2026-09-10",
};

export async function getWorkspaceSettings(): Promise<WorkspaceSettings> {
  try {
    const record = await prisma.setting.findUnique({
      where: { key: "workspace_settings" },
    });
    if (record?.value) {
      return { ...memorySettings, ...JSON.parse(record.value) };
    }
  } catch {
    // Retain memory fallback if DB is not reachable
  }
  return memorySettings;
}

export async function updateWorkspaceSettings(updates: Partial<WorkspaceSettings>): Promise<WorkspaceSettings> {
  memorySettings = {
    ...memorySettings,
    ...updates,
    lastUpdated: new Date().toISOString().split("T")[0],
  };

  try {
    await prisma.setting.upsert({
      where: { key: "workspace_settings" },
      update: { value: JSON.stringify(memorySettings) },
      create: { key: "workspace_settings", value: JSON.stringify(memorySettings) },
    });
  } catch {
    // Retain in memory
  }

  return memorySettings;
}

