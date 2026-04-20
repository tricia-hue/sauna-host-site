import OptInForm from "./OptInForm";
import { Lesson } from "@/content/lessons";

type GatedLockProps = {
  lesson: Lesson;
};

/**
 * Shown in place of full lesson content when the user has not opted in.
 * Teases the lesson's headline and promise, then offers the opt-in form.
 */
export default function GatedLock({ lesson }: GatedLockProps) {
  return (
    <section className="py-section">
      <div className="container-sauna max-w-3xl mx-auto">
        <div className="border border-peach/15 bg-peach/[0.02] p-10 md:p-16 text-center">
          <div className="inline-flex items-center gap-2 text-gold/80 mb-8">
            <LockIcon />
            <span className="font-display text-xs uppercase tracking-display">
              Lesson unlocks with email
            </span>
          </div>

          <p className="eyebrow mb-4">Day {lesson.day}</p>
          <h2 className="font-display text-display-md uppercase tracking-heading text-peach leading-tight mb-6">
            {lesson.headline}
          </h2>
          <p className="text-peach/70 text-lg max-w-xl mx-auto mb-12 leading-relaxed">
            {lesson.subhead}
          </p>

          <p className="text-peach/80 max-w-md mx-auto mb-10 leading-relaxed">
            Enter your email to unlock Lessons 2–5 and the full 26-page workbook.
            No payment. No credit card. Day 1 is already free to read.
          </p>

          <div className="flex justify-center">
            <OptInForm
              source={`gated-${lesson.slug}`}
              microcopy="You'll get the whole course. Unsubscribe any time."
              redirectTo={`/${lesson.slug}`}
            />
          </div>

          <p className="text-peach/50 text-xs mt-10">
            Already signed up?{" "}
            <a
              href="/api/unlock"
              className="underline underline-offset-2 hover:text-peach transition-colors"
            >
              Restore access
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

function LockIcon() {
  return (
    <svg
      width="14"
      height="16"
      viewBox="0 0 14 16"
      fill="none"
      aria-hidden
    >
      <rect
        x="1.5"
        y="7"
        width="11"
        height="8"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M4 7V4.5C4 2.567 5.567 1 7.5 1C9.433 1 11 2.567 11 4.5V7"
        stroke="currentColor"
        strokeWidth="1.2"
      />
    </svg>
  );
}
