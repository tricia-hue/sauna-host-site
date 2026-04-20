import type { Metadata } from "next";
import Link from "next/link";
import GatedLock from "@/components/GatedLock";
import { isUnlocked } from "@/lib/auth";
import { lessons } from "@/content/lessons";
import { themes } from "@/lib/config";

export const metadata: Metadata = {
  title: "The Workbook | The Sauna Host",
  description:
    "Your 26-page printable companion. All scripts, prompts, breathwork cues, and gathering plans for your first sauna and cold plunge gathering.",
};

export default function WorkbookPage() {
  if (!isUnlocked()) {
    // Fake a lesson object for the lock screen
    return (
      <GatedLock
        lesson={{
          day: 0,
          slug: "workbook",
          title: "The Workbook",
          headline: "The 26-page workbook",
          subhead:
            "Your printable companion. All scripts, prompts, breathwork cues, and five gathering plans.",
          openReadingLine: "",
          practicePrompt: "",
          practiceInstruction: "",
          workbookPageRef: "",
          invitationToNext: "",
          gated: true,
          body: [],
        }}
      />
    );
  }

  return (
    <article className="py-section">
      <div className="container-sauna max-w-prose-wide mx-auto">
        <div className="mb-16">
          <p className="eyebrow mb-6">Your companion workbook</p>
          <h1 className="font-display text-display-lg uppercase tracking-heading text-peach leading-[1.05] mb-6">
            The Sauna Host<br />
            Workbook.
          </h1>
          <p className="text-gold/90 italic text-xl max-w-2xl leading-relaxed">
            26 pages. Scripts, prompts, breathwork cues, and a complete plan for
            each of the five gathering themes.
          </p>
        </div>

        <div className="border border-peach/15 bg-peach/[0.02] p-8 md:p-12 mb-16 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <p className="eyebrow mb-2">Your download</p>
            <p className="text-peach/80 text-lg">
              The Sauna Host — Workbook v1.0 (PDF, 8.5 × 11)
            </p>
            <p className="text-peach/50 text-sm mt-1">
              26 pages · print-ready. Open it on screen, or print it and keep
              it beside your sauna.
            </p>
          </div>
          <a
            href="/sauna-host-workbook.pdf"
            download="Revivery-Sauna-Host-Workbook.pdf"
            className="btn-primary whitespace-nowrap"
          >
            Download the workbook →
          </a>
        </div>

        {/* Workbook page reference index */}
        <div className="mb-16">
          <p className="eyebrow mb-6">What's inside</p>
          <ol className="space-y-0 border-t border-peach/10">
            {lessons.map((lesson) => (
              <li
                key={lesson.slug}
                className="grid md:grid-cols-12 gap-6 py-6 border-b border-peach/10"
              >
                <span className="md:col-span-2 font-display text-xs uppercase tracking-display text-gold">
                  Day {lesson.day}
                </span>
                <span className="md:col-span-7 text-peach">
                  {lesson.title}
                </span>
                <span className="md:col-span-3 md:text-right text-peach/60 text-sm">
                  {lesson.workbookPageRef}
                </span>
              </li>
            ))}
          </ol>
        </div>

        {/* Theme navigation anchors */}
        <div className="mb-16">
          <p className="eyebrow mb-6">Your five themes</p>
          <div className="grid md:grid-cols-2 gap-0 border-t border-peach/10">
            {themes.map((theme, i) => (
              <div
                key={theme.id}
                id={theme.id}
                className={`
                  p-8 border-b border-peach/10
                  ${i % 2 === 0 ? "md:border-r border-peach/10" : ""}
                `}
              >
                <h3 className="font-display text-xl uppercase tracking-heading text-peach mb-3">
                  {theme.name}
                </h3>
                <p className="text-gold/90 italic text-sm mb-3">
                  {theme.tagline}
                </p>
                <p className="text-peach/70 text-sm leading-relaxed mb-4">
                  {theme.description}
                </p>
                <p className="text-peach/50 text-xs">
                  Full plan, invitation script, 10 prompts, playlist — pages{" "}
                  {11 + i * 2}–{12 + i * 2}.
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-peach/10 pt-12">
          <p className="eyebrow mb-4">One last thing</p>
          <h3 className="font-display text-2xl uppercase tracking-heading text-peach mb-4">
            This is a practice, not an event.
          </h3>
          <p className="text-peach/70 leading-relaxed mb-6">
            Your first gathering will be a little messy. That's the first
            gathering. Capacity builds over time — yours and theirs. By your
            third one, you'll be leading with both hands behind your back.
          </p>
          <p className="text-peach/70 leading-relaxed">
            The single most important thing you can do is host it. Not host the
            perfect one. Just host one.
          </p>
          <div className="mt-10 flex gap-4 flex-wrap">
            <Link href="/about" className="btn-secondary">
              About Revivery
            </Link>
            <Link
              href="https://revivery.co/instructor-training"
              className="font-display text-xs uppercase tracking-heading text-gold hover:text-peach transition-colors self-center"
            >
              The bigger path — RIT →
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
