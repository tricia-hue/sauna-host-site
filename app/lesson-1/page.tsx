import type { Metadata } from "next";
import LessonBody from "@/components/LessonBody";
import { getLesson } from "@/content/lessons";
import OptInForm from "@/components/OptInForm";

const lesson = getLesson("lesson-1")!;

export const metadata: Metadata = {
  title: `Day ${lesson.day} — ${lesson.title} | The Sauna Host`,
  description: lesson.subhead,
};

export default function Lesson1Page() {
  // Lesson 1 is always open. We append a post-lesson opt-in block to unlock 2–5.
  return (
    <>
      <LessonBody lesson={lesson} />

      <section className="pb-section">
        <div className="container-sauna max-w-3xl mx-auto">
          <div className="border border-gold/30 bg-gold/[0.04] p-10 md:p-14 text-center">
            <p className="eyebrow mb-6 text-gold">Unlock the rest of the course</p>
            <h2 className="font-display text-display-md uppercase tracking-heading text-peach leading-tight mb-6">
              Four more lessons<br />
              + the 24-page workbook.
            </h2>
            <p className="text-peach/70 leading-relaxed max-w-lg mx-auto mb-10">
              Enter your email to unlock Lessons 2 through 5 and the printable
              workbook. Day 2 lands in your inbox within a minute.
            </p>
            <div className="flex justify-center">
              <OptInForm
                source="lesson-1-footer"
                redirectTo="/lesson-2"
                ctaLabel="Unlock the course"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
