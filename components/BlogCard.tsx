"use client";

import React from "react";
import Link from "next/link";
import { BlogPost } from "@/lib/blogs";
import { ArrowUpRight, Clock } from "lucide-react";
import ChalkCard from "@/components/chalk/ChalkCard";
import ChalkButton from "@/components/chalk/ChalkButton";

interface Props {
  blog: BlogPost;
}

export default function BlogCard({ blog }: Props) {
  return (
    <ChalkCard
      variant="slate"
      accentColor={blog.accentColor || "#6366f1"}
      cornerTicks
      interactive
      className="flex flex-col justify-between"
    >
      <div className="p-6 sm:p-7 space-y-4">
        {/* Top Metadata */}
        <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs">
          <span
            className="px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider"
            style={{
              backgroundColor: `${blog.accentColor || "#6366f1"}18`,
              color: blog.accentColor || "#6366f1",
            }}
          >
            {blog.category}
          </span>
          <div className="flex items-center gap-1.5 text-neutral-500 dark:text-neutral-400">
            <Clock className="w-3.5 h-3.5" />
            <span>{blog.readTime}</span>
          </div>
        </div>

        {/* Title */}
        <Link href={`/blog/${blog.slug}`} className="block group">
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white tracking-tight group-hover:text-[#d94e34] dark:group-hover:text-cyan-300 transition-colors leading-snug">
            {blog.title}
          </h3>
        </Link>

        {/* Subtitle / Summary */}
        <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed line-clamp-3 font-sans">
          {blog.summary}
        </p>

        {/* Footer: Tags & Read Link */}
        <div className="pt-4 border-t border-black/10 dark:border-white/[0.06] flex items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap gap-1.5 font-mono text-[11px] text-neutral-600 dark:text-neutral-400">
            {blog.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded bg-black/[0.04] dark:bg-white/[0.04] border border-black/10 dark:border-white/[0.06] text-[10px]"
              >
                #{tag}
              </span>
            ))}
          </div>

          <ChalkButton
            href={`/blog/${blog.slug}`}
            variant="ghost"
            icon={<ArrowUpRight className="w-3.5 h-3.5" />}
          >
            Read Paper
          </ChalkButton>
        </div>
      </div>
    </ChalkCard>
  );
}
