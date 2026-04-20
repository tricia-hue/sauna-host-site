import Link from "next/link";
import { Lesson, lessons } from "@/content/lessons";

type LessonBodyProps = {
  lesson: Lesson;
};

/**
 * Renders the full body of a lesson in premium editorial typography.
 * Handles inline markdown-ish tokens (**bold**, *italic*, > blockquote, ### h3).
 */
export default function LessonBody({ lesson }: LessonBodyProps) {
  const nextLesson = lessons.find((l) => l.day === lesson.day + 1);

  return (
    <article className="py-section">
      <div className="container-sauna max-w-prose-wide mx-auto">
        {/* Header */}
        <div className="mb-16">
          <p className="eyebrow mb-6">
            Lesson {lesson.day} of 5
          </p>
          <h1 className="font-display text-display-lg uppercase tracking-heading text-peach leading-[1.05] mb-6">
            {lesson.headline}
          </h1>
          <p className="text-gold/90 italic text-xl leading-relaxed max-w-2xl">
            {lesson.subhead}
          </p>
        </div>

        {/* Body */}
        <div className="prose-sauna">
          {lesson.body.map((block, i) => (
            <BodyBlock key={i} content={block} />
          ))}
        </div>

        {/* Practice */}
        <div className="mt-20 pt-10 border-t border-peach/10">
          <p className="eyebrow mb-4">Today's practice</p>
          <h3 className="font-display text-2xl uppercase tracking-heading text-peach mb-4">
            {lesson.practicePrompt}
          </h3>
          <p className="text-peach/70 leading-relaxed">
            {lesson.practiceInstruction}
          </p>
        </div>

        {/* Workbook reference */}
        <div className="mt-12 p-6 border border-peach/15 bg-peach/[0.02] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <p className="eyebrow mb-2">Workbook</p>
            <p className="text-peach/80">{lesson.workbookPageRef}</p>
          </div>
          <Link href="/workbook" className="btn-secondary">
            Open workbook
          </Link>
        </div>

        {/* Safety note */}
        {lesson.safetyNote && (
          <div className="mt-8 p-4 border-l-2 border-gold text-sm text-peach/70 leading-relaxed italic">
            A note: {lesson.safetyNote}
          </div>
        )}

        {/* Invitation to next */}
        <div className="mt-20 pt-10 border-t border-peach/10">
          <p className="eyebrow mb-4">Tomorrow</p>
          <p className="text-peach/80 text-lg leading-relaxed max-w-2xl mb-10">
            {lesson.invitationToNext}
          </p>
          {nextLesson && (
            <Link href={`/${nextLesson.slug}`} className="btn-primary">
              Continue to Lesson {nextLesson.day} →
            </Link>
          )}
          {!nextLesson && (
            <Link href="/workbook" className="btn-primary">
              Open your workbook →
            </Link>
          )}
        </div>

        {/* Signature */}
        <div className="mt-20 text-peach/60 italic">
          — Tricia
          <br />
          <span className="text-peach/40 text-sm not-italic">
            Tricia Will, Co-Founder, Revivery
          </span>
        </div>
      </div>
    </article>
  );
}

function BodyBlock({ content }: { content: string }) {
  if (content.startsWith("### ")) {
    return <h3>{content.slice(4)}</h3>;
  }
  if (content.startsWith("> ")) {
    return <blockquote>{content.slice(2)}</blockquote>;
  }
  return (
    <p
      dangerouslySetInnerHTML={{
        __html: parseInline(content),
      }}
    />
  );
}

/**
 * Extremely light inline markdown: **bold**, *italic*.
 * We're intentionally not using a full MD parser — the content is curated and trusted.
 */
function parseInline(text: string): string {
  const escapeHtml = (s: string) =>
    s
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

  return escapeHtml(text)
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/(^|[^*])\*(?!\*)([^*]+?)\*(?!\*)/g, "$1<em>$2</em>");
}
