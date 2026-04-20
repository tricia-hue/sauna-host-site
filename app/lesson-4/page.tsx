import type { Metadata } from "next";
import LessonBody from "@/components/LessonBody";
import GatedLock from "@/components/GatedLock";
import { getLesson } from "@/content/lessons";
import { isUnlocked } from "@/lib/auth";

const lesson = getLesson("lesson-4")!;

export const metadata: Metadata = {
  title: `Day ${lesson.day} — ${lesson.title} | The Sauna Host`,
  description: lesson.subhead,
};

export default function Lesson4Page() {
  if (!isUnlocked()) {
    return <GatedLock lesson={lesson} />;
  }
  return <LessonBody lesson={lesson} />;
}
