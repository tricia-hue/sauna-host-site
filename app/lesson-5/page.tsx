import type { Metadata } from "next";
import Link from "next/link";
import LessonBody from "@/components/LessonBody";
import GatedLock from "@/components/GatedLock";
import { getLesson } from "@/content/lessons";
import { isUnlocked } from "@/lib/auth";
import { themes } from "@/lib/config";

const lesson = getLesson("lesson-5")!;

export const metadata: Metadata = {
  title: `Day ${lesson.day} — ${lesson.title} | The Sauna Host`,
  description: lesson.subhead,
};

export default function Lesson5Page() {
  if (!isUnlocked()) {
    return <GatedLock lesson={lesson} />;
  }

  return (
    <>
      <LessonBody lesson={lesson} />

      {/* Theme picker — the centerpiece of Day 5 */}
      <section className="pb-section">
        <div className="container-sauna max-w-4xl mx-auto">
          <div className="mb-16">
            <p className="eyebrow mb-4">Pick your theme</p>
            <h2 className="font-display text-display-md uppercase tracking-heading text-peach leading-tight">
              One method.<br />
              Five gatherings.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-0 border-t border-peach/15">
            {themes.map((theme, i) => (
              <Link
                key={theme.id}
                href={`/workbook#${theme.id}`}
                className={`
                  block p-10 border-b border-peach/15
                  ${i % 2 === 0 ? "md:border-r border-peach/15" : ""}
                  hover:bg-peach/[0.03] transition-colors group
                `}
              >
                <p className="eyebrow mb-4">Theme 0{i + 1}</p>
                <h3 className="font-display text-2xl md:text-3xl uppercase tracking-heading text-peach mb-3 group-hover:text-gold transition-colors">
                  {theme.name}
                </h3>
                <p className="text-gold/90 italic mb-4">{theme.tagline}</p>
                <p className="text-peach/70 leading-relaxed mb-6">
                  {theme.description}
                </p>
                <span className="font-display text-xs uppercase tracking-heading text-gold">
                  Open theme plan →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
