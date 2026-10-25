import { PrismaClient } from "@prisma/client";
import { initialBlogs } from "../lib/data/initialBlogs";
import { initialProjects } from "../lib/data/projects";
import { initialExperiences } from "../lib/data/experience";

const prisma = new PrismaClient();

const defaultSettings = {
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

async function main() {
  console.log("Seeding PostgreSQL database...");

  // 1. Seed Blogs
  for (const blog of initialBlogs) {
    const existing = await prisma.blog.findUnique({
      where: { slug: blog.slug },
    });

    if (!existing) {
      await prisma.blog.create({
        data: {
          slug: blog.slug,
          title: blog.title,
          subtitle: blog.subtitle,
          category: blog.category,
          summary: blog.summary,
          readTime: blog.readTime,
          accentColor: blog.accentColor,
          tags: blog.tags,
          featured: blog.featured,
          content: blog.content,
          status: blog.status,
        },
      });
      console.log(`Created blog: ${blog.title}`);
    } else {
      console.log(`Blog already exists: ${blog.title}`);
    }
  }

  // 2. Seed Projects
  for (const project of initialProjects) {
    const existing = await prisma.project.findUnique({
      where: { slug: project.slug },
    });

    if (!existing) {
      await prisma.project.create({
        data: {
          id: project.id,
          slug: project.slug,
          title: project.title,
          subtitle: project.subtitle,
          category: project.category,
          role: project.role,
          organization: project.organization,
          period: project.period,
          accentColor: project.accentColor,
          metricValue: project.metricValue,
          metricLabel: project.metricLabel,
          summary: project.summary,
          context: project.context,
          learntThat: project.learntThat,
          architecture: project.architecture,
          techStack: project.techStack,
          tradeoffs: project.tradeoffs ? JSON.parse(JSON.stringify(project.tradeoffs)) : undefined,
          artifactSkin: project.artifactSkin,
          artifactMetadata: project.artifactMetadata ? JSON.parse(JSON.stringify(project.artifactMetadata)) : undefined,
          section: project.section,
          status: project.status,
          displayOrder: project.displayOrder,
          featured: project.featured,
          githubUrl: project.githubUrl,
          liveUrl: project.liveUrl,
        },
      });
      console.log(`Created project: ${project.title}`);
    } else {
      console.log(`Project already exists: ${project.title}`);
    }
  }

  // 3. Seed Experiences
  for (const exp of initialExperiences) {
    const existing = await prisma.experience.findFirst({
      where: { company: exp.company, role: exp.role },
    });

    if (!existing) {
      await prisma.experience.create({
        data: {
          id: exp.id,
          company: exp.company,
          role: exp.role,
          location: exp.location,
          period: exp.period,
          startDate: exp.startDate,
          endDate: exp.endDate,
          current: exp.current,
          description: exp.description,
          highlights: exp.highlights,
          skills: exp.skills,
          displayOrder: exp.displayOrder,
          featured: exp.featured,
        },
      });
      console.log(`Created experience: ${exp.role} @ ${exp.company}`);
    } else {
      console.log(`Experience already exists: ${exp.role} @ ${exp.company}`);
    }
  }

  // 4. Seed Settings
  const existingSettings = await prisma.setting.findUnique({
    where: { key: "workspace_settings" },
  });

  if (!existingSettings) {
    await prisma.setting.create({
      data: {
        key: "workspace_settings",
        value: JSON.stringify(defaultSettings),
      },
    });
    console.log("Created workspace_settings");
  } else {
    console.log("workspace_settings already exist");
  }

  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
