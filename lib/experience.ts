import { prisma } from "./prisma";
import { initialExperiences, type ExperienceItem } from "./data/experience";

let memoryExperiences: ExperienceItem[] = [...initialExperiences];
let isDbAvailable: boolean | null = null;

export async function getAllExperiences(options?: {
  featuredOnly?: boolean;
}): Promise<ExperienceItem[]> {
  if (isDbAvailable !== false) {
    try {
      const where: any = {};
      if (options?.featuredOnly) {
        where.featured = true;
      }

      const dbRecords = await prisma.experience.findMany({
        where,
        orderBy: { displayOrder: "asc" },
      });

      if (dbRecords.length > 0) {
        isDbAvailable = true;
        return dbRecords as unknown as ExperienceItem[];
      }
    } catch {
      isDbAvailable = false;
    }
  }

  return memoryExperiences
    .filter((e) => !options?.featuredOnly || e.featured)
    .sort((a, b) => a.displayOrder - b.displayOrder);
}

export async function getExperienceById(id: string): Promise<ExperienceItem | null> {
  if (isDbAvailable !== false) {
    try {
      const record = await prisma.experience.findUnique({ where: { id } });
      if (record) return record as unknown as ExperienceItem;
    } catch {
      isDbAvailable = false;
    }
  }

  return memoryExperiences.find((e) => e.id === id) || null;
}

export async function createExperience(
  data: Omit<ExperienceItem, "id">
): Promise<ExperienceItem> {
  const newId = `exp-${Date.now()}`;
  const newItem: ExperienceItem = { ...data, id: newId };

  if (isDbAvailable !== false) {
    try {
      const created = await prisma.experience.create({
        data: {
          company: data.company,
          role: data.role,
          location: data.location,
          period: data.period,
          startDate: data.startDate,
          endDate: data.endDate,
          current: data.current,
          description: data.description,
          highlights: data.highlights,
          skills: data.skills,
          displayOrder: data.displayOrder,
          featured: data.featured,
        },
      });
      memoryExperiences.push(created as unknown as ExperienceItem);
      return created as unknown as ExperienceItem;
    } catch {
      isDbAvailable = false;
    }
  }

  memoryExperiences.push(newItem);
  return newItem;
}

export async function updateExperience(
  id: string,
  data: Partial<ExperienceItem>
): Promise<ExperienceItem | null> {
  if (isDbAvailable !== false) {
    try {
      const updated = await prisma.experience.update({
        where: { id },
        data,
      });
      const idx = memoryExperiences.findIndex((e) => e.id === id);
      if (idx !== -1) memoryExperiences[idx] = updated as unknown as ExperienceItem;
      return updated as unknown as ExperienceItem;
    } catch {
      isDbAvailable = false;
    }
  }

  const idx = memoryExperiences.findIndex((e) => e.id === id);
  if (idx !== -1) {
    memoryExperiences[idx] = { ...memoryExperiences[idx], ...data };
    return memoryExperiences[idx];
  }
  return null;
}

export async function deleteExperience(id: string): Promise<boolean> {
  if (isDbAvailable !== false) {
    try {
      await prisma.experience.delete({ where: { id } });
      memoryExperiences = memoryExperiences.filter((e) => e.id !== id);
      return true;
    } catch {
      isDbAvailable = false;
    }
  }

  const initialLen = memoryExperiences.length;
  memoryExperiences = memoryExperiences.filter((e) => e.id !== id);
  return memoryExperiences.length < initialLen;
}
