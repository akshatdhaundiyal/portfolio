"use client";

import React, { useState, useEffect } from "react";
import StudioNavbar from "@/components/admin/StudioNavbar";
import AdminAuthGate from "@/components/admin/AdminAuthGate";
import {
  Briefcase,
  Plus,
  Trash2,
  Edit3,
  Save,
  X,
  CheckCircle2,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import type { ExperienceItem } from "@/lib/data/experience";
import type { AuthUser } from "@/lib/auth";

export default function ExperienceAdminPage() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [experiences, setExperiences] = useState<ExperienceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState("");
  const [editingItem, setEditingItem] = useState<Partial<ExperienceItem> | null>(null);
  const [isNew, setIsNew] = useState(false);

  useEffect(() => {
    fetchSession();
    fetchExperiences();
  }, []);

  const fetchSession = async () => {
    try {
      const res = await fetch("/api/auth");
      const data = await res.json();
      if (data.authenticated && data.user) {
        setUser(data.user);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch {
      setIsAuthenticated(false);
    }
  };

  const fetchExperiences = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/experience");
      const data = await res.json();
      if (Array.isArray(data)) {
        setExperiences(data.sort((a, b) => a.displayOrder - b.displayOrder));
      }
    } catch {
      // Ignore
    } finally {
      setLoading(false);
    }
  };

  const isReadOnly = user?.role === "guest" || user?.role === "user";

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem || isReadOnly) return;

    try {
      if (isNew) {
        const res = await fetch("/api/experience", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...editingItem,
            displayOrder: experiences.length + 1,
          }),
        });
        if (res.ok) {
          setFeedback("Role created successfully!");
          setIsNew(false);
          setEditingItem(null);
          fetchExperiences();
        }
      } else if (editingItem.id) {
        const res = await fetch(`/api/experience/${editingItem.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editingItem),
        });
        if (res.ok) {
          setFeedback("Role updated successfully!");
          setEditingItem(null);
          fetchExperiences();
        }
      }
    } catch {
      setFeedback("Failed to save role.");
    }

    setTimeout(() => setFeedback(""), 3000);
  };

  const handleDelete = async (id: string) => {
    if (isReadOnly || !confirm("Delete this career milestone?")) return;
    try {
      const res = await fetch(`/api/experience/${id}`, { method: "DELETE" });
      if (res.ok) {
        setFeedback("Role removed.");
        fetchExperiences();
      }
    } catch {
      setFeedback("Failed to delete.");
    }
    setTimeout(() => setFeedback(""), 3000);
  };

  const handleMove = async (index: number, direction: "up" | "down") => {
    if (isReadOnly) return;
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= experiences.length) return;

    const list = [...experiences];
    const temp = list[index];
    list[index] = list[targetIdx];
    list[targetIdx] = temp;

    list.forEach((item, idx) => {
      item.displayOrder = idx + 1;
      fetch(`/api/experience/${item.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ displayOrder: idx + 1 }),
      }).catch(() => {});
    });

    setExperiences(list);
  };

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-[#faf8f5] dark:bg-[#0c0d12] flex items-center justify-center p-4">
        <span className="font-mono text-xs text-neutral-500">Verifying session...</span>
      </div>
    );
  }

  if (isAuthenticated === false) {
    return (
      <AdminAuthGate
        onSuccess={() => {
          setIsAuthenticated(true);
          fetchSession();
          fetchExperiences();
        }}
        title="Experience Studio Access"
        subtitle="Enter passcode to manage career milestones and credentials."
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#faf8f5] dark:bg-[#0c0d12] text-neutral-900 dark:text-[#ece5d8]">
      <StudioNavbar user={user} activeRoute="/admin/experience" />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-black/10 dark:border-white/10 pb-6">
            <div>
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                  <Briefcase className="w-5 h-5" />
                </span>
                <h1 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight">
                  Experience & Roles
                </h1>
              </div>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                Manage career milestones, roles, and bullet points. Powers both /resume and the 3D pinboard.
              </p>
            </div>

            <button
              onClick={() => {
                setIsNew(true);
                setEditingItem({
                  company: "",
                  role: "",
                  period: "2024 — Present",
                  location: "India",
                  current: true,
                  highlights: [""],
                  skills: [""],
                  featured: true,
                  displayOrder: experiences.length + 1,
                });
              }}
              disabled={isReadOnly}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#d94e34] hover:bg-[#c23e25] text-white font-mono text-xs font-semibold shadow-md transition-colors disabled:opacity-50"
            >
              <Plus className="w-4 h-4" />
              <span>Add Experience</span>
            </button>
          </div>

          {feedback && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-mono text-xs">
              <CheckCircle2 className="w-4 h-4" />
              <span>{feedback}</span>
            </div>
          )}

          {/* Editor Form Modal / Card */}
          {editingItem && (
            <form
              onSubmit={handleSave}
              className="bg-white dark:bg-[#16171b] border border-black/10 dark:border-white/10 rounded-2xl p-6 sm:p-8 space-y-5 shadow-xl"
            >
              <div className="flex items-center justify-between border-b border-black/10 dark:border-white/10 pb-3">
                <h3 className="font-serif text-lg font-bold">
                  {isNew ? "Create New Career Milestone" : `Edit: ${editingItem.role}`}
                </h3>
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="p-1 rounded-lg text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-mono text-xs text-neutral-500">Company / Organization *</label>
                  <input
                    type="text"
                    required
                    value={editingItem.company || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, company: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-50 dark:bg-[#1f2026] border border-black/10 dark:border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-mono text-xs text-neutral-500">Role Title *</label>
                  <input
                    type="text"
                    required
                    value={editingItem.role || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, role: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-50 dark:bg-[#1f2026] border border-black/10 dark:border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="font-mono text-xs text-neutral-500">Period *</label>
                  <input
                    type="text"
                    required
                    value={editingItem.period || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, period: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-50 dark:bg-[#1f2026] border border-black/10 dark:border-white/10 text-sm"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-mono text-xs text-neutral-500">Location</label>
                  <input
                    type="text"
                    value={editingItem.location || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, location: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-50 dark:bg-[#1f2026] border border-black/10 dark:border-white/10 text-sm"
                  />
                </div>
                <div className="flex items-center gap-3 pt-6">
                  <label className="flex items-center gap-2 cursor-pointer font-mono text-xs">
                    <input
                      type="checkbox"
                      checked={Boolean(editingItem.current)}
                      onChange={(e) => setEditingItem({ ...editingItem, current: e.target.checked })}
                      className="rounded text-indigo-600 focus:ring-indigo-500"
                    />
                    <span>Current Role</span>
                  </label>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-mono text-xs text-neutral-500">
                  Key Achievements / Highlights (One per line)
                </label>
                <textarea
                  rows={4}
                  value={(editingItem.highlights || []).join("\n")}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      highlights: e.target.value.split("\n").filter(Boolean),
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-neutral-50 dark:bg-[#1f2026] border border-black/10 dark:border-white/10 text-sm font-sans"
                />
              </div>

              <div className="space-y-1">
                <label className="font-mono text-xs text-neutral-500">
                  Skills / Technologies (Comma-separated)
                </label>
                <input
                  type="text"
                  value={(editingItem.skills || []).join(", ")}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      skills: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-neutral-50 dark:bg-[#1f2026] border border-black/10 dark:border-white/10 text-sm font-mono"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 rounded-xl border border-black/10 dark:border-white/10 font-mono text-xs hover:bg-neutral-100 dark:hover:bg-neutral-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isReadOnly}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-mono text-xs font-semibold shadow-md transition-colors disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Experience</span>
                </button>
              </div>
            </form>
          )}

          {/* List of Experiences */}
          {loading ? (
            <div className="py-12 text-center font-mono text-xs text-neutral-500">Loading experiences...</div>
          ) : experiences.length === 0 ? (
            <div className="py-12 text-center font-mono text-xs text-neutral-500">No experiences found.</div>
          ) : (
            <div className="space-y-4">
              {experiences.map((exp, index) => (
                <div
                  key={exp.id}
                  className="bg-white dark:bg-[#16171b] border border-black/10 dark:border-white/10 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col sm:flex-row sm:items-start justify-between gap-4"
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs text-[#d94e34] font-medium">{exp.company}</span>
                      <span className="text-neutral-400">•</span>
                      <span className="font-mono text-xs text-neutral-500">{exp.period}</span>
                      {exp.current && (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono text-[10px]">
                          CURRENT
                        </span>
                      )}
                    </div>
                    <h3 className="text-base sm:text-lg font-serif font-bold text-neutral-900 dark:text-white">
                      {exp.role}
                    </h3>
                    <ul className="list-disc list-inside space-y-1 text-xs text-neutral-600 dark:text-neutral-300">
                      {exp.highlights.slice(0, 2).map((h, i) => (
                        <li key={i} className="line-clamp-2">{h}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <button
                      onClick={() => handleMove(index, "up")}
                      disabled={index === 0 || isReadOnly}
                      className="p-2 rounded-lg border border-black/10 dark:border-white/10 hover:bg-neutral-100 dark:hover:bg-neutral-800 disabled:opacity-30"
                      title="Move Up"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleMove(index, "down")}
                      disabled={index === experiences.length - 1 || isReadOnly}
                      className="p-2 rounded-lg border border-black/10 dark:border-white/10 hover:bg-neutral-100 dark:hover:bg-neutral-800 disabled:opacity-30"
                      title="Move Down"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        setIsNew(false);
                        setEditingItem(exp);
                      }}
                      className="p-2 rounded-lg border border-black/10 dark:border-white/10 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-indigo-600 dark:text-indigo-400"
                      title="Edit"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(exp.id)}
                      disabled={isReadOnly}
                      className="p-2 rounded-lg border border-black/10 dark:border-white/10 hover:bg-red-500/10 text-red-600 dark:text-red-400 disabled:opacity-30"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
  );
}
