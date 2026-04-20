import Link from "next/link";
import { lessons } from "@/content/lessons";

export default function CurriculumOutline() {
  return (
    <section id="curriculum" className="py-section border-t border-peach/10">
      <div className="container-sauna">
        <div className="grid md:grid-cols-12 gap-10 mb-20">
          <div className="md:col-span-4">
            <p className="eyebrow mb-4">The curriculum</p>
          </div>
          <div className="md:col-span-8">
            <h2 className="font-display text-display-lg uppercase tracking-heading text-peach leading-[1.05]">
              Five days.
              <br />
              One method.
            </h2>
            <p className="text-peach/70 text-lg mt-8 max-w-2xl leading-relaxed">
              One short lesson a day for five days. Each lesson gives you one thing
              you can try, and one workbook page you can keep. By Day 5, you pick
              your theme and host.
            </p>
          </div>
        </div>

        <ol className="space-y-0 border-t border-peach/10">
          {lessons.map((lesson) => (
            <li key={lesson.slug}>
              <Link
                href={`/${lesson.slug}`}
                className="group grid md:grid-cols-12 gap-6 py-10 border-b border-peach/10 hover:bg-peach/[0.02] transition-colors"
              >
                <div className="md:col-span-2">
                  <span className="font-display text-xs uppercase tracking-display text-gold">
                    Day {lesson.day}
                  </span>
                </div>
                <div className="md:col-span-7">
                  <h3 className="font-display text-2xl md:text-3xl uppercase tracking-heading text-peach mb-3 group-hover:text-gold transition-colors">
                    {lesson.title}
                  </h3>
                  <p className="text-peach/60 leading-relaxed max-w-xl">
                    {lesson.openReadingLine}
                  </p>
                </div>
                <div className="md:col-span-3 flex md:justify-end items-start">
                  {lesson.gated ? (
                    <span className="font-display text-xs uppercase tracking-heading text-peach/40 flex items-center gap-2">
                      <LockIcon />
                      Gated
                    </span>
                  ) : (
                    <span className="font-display text-xs uppercase tracking-heading text-gold flex items-center gap-2">
                      Read free →
                    </span>
                  )}
                </div>
              </Link>
            </li>
          ))}
        </ol>

        <p className="text-peach/50 text-sm mt-10 max-w-2xl leading-relaxed">
          Lesson 1 is free to read. Lessons 2–5 and the 26-page workbook unlock
          when you join — a single email, no payment, no credit card.
        </p>
      </div>
    </section>
  );
}

function LockIcon() {
  return (
    <svg
      width="10"
      height="12"
      viewBox="0 0 10 12"
      fill="none"
      aria-hidden
      className="opacity-70"
    >
      <rect
        x="1"
        y="5"
        width="8"
        height="6"
        stroke="currentColor"
        strokeWidth="1"
      />
      <path
        d="M3 5V3.5C3 2.12 4.12 1 5.5 1C6.88 1 8 2.12 8 3.5V5"
        stroke="currentColor"
        strokeWidth="1"
      />
    </svg>
  );
}
