import type { Metadata } from "next";
import LessonBody from "@/components/LessonBody";
import { getLesson } from "@/content/lessons";
import OptInForm from "@/components/OptInForm";
import StickyUnlockBar from "@/components/StickyUnlockBar";

const lesson = getLesson("lesson-1")!;

export const metadata: Metadata = {
  title: `Day ${lesson.day} — ${lesson.title} | The Sauna Host`,
  description: lesson.subhead,
};

export default function Lesson1Page() {
  // Lesson 1 is always open (the tripwire). One clear action lives on this page:
  // unlock Lessons 2–5 by email. The opt-in block below carries the id="unlock"
  // anchor that every in-lesson CTA and the sticky bar scroll to.
  return (
    <>
      <LessonBody lesson={lesson} nextGated />

      <section id="unlock" className="pb-section scroll-mt-24">
        <div className="container-sauna max-w-3xl mx-auto">
          <div className="border border-gold/30 bg-gold/[0.04] p-10 md:p-14 text-center">
            <p className="eyebrow mb-6 text-gold">You've read Lesson 1 of 5</p>
            <h2 className="font-display text-display-md uppercase tracking-heading text-peach leading-tight mb-6">
              Unlock the next four lessons<br />
              + the 26-page workbook.
            </h2>
            <p className="text-peach/70 leading-relaxed max-w-lg mx-auto mb-10">
              Enter your email and Lessons 2 through 5 open instantly, with the
              printable workbook. Day 2 lands in your inbox within a minute. No
              payment, no credit card.
            </p>
            <div className="flex justify-center">
              <OptInForm
                source="lesson-1-footer"
                redirectTo="/lesson-2"
                ctaLabel="Unlock Lessons 2–5 →"
              />
            </div>
          </div>
        </div>
      </section>

      <StickyUnlockBar />
    </>
  );
}
