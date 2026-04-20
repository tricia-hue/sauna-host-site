import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/config";

export const metadata: Metadata = {
  title: "About Revivery | The Sauna Host",
  description:
    "A social wellness studio in Tampa, FL. Guided contrast therapy. Trained leads. The practice, not the product.",
};

export default function AboutPage() {
  return (
    <article className="py-section">
      <div className="container-sauna max-w-prose-wide mx-auto">
        <p className="eyebrow mb-6">About Revivery</p>
        <h1 className="font-display text-display-lg uppercase tracking-heading text-peach leading-[1.05] mb-10">
          Heat.<br />
          Ice.<br />
          <span className="text-gold">Repeat.</span>
        </h1>

        <div className="prose-sauna">
          <p>
            Revivery is a social wellness studio in Tampa, FL built around guided
            contrast therapy — sauna, cold plunge, and the practice of doing
            them together.
          </p>
          <p>
            We train certified leads to facilitate what we call the
            Bio/Psych/Social Method — a combination of thermal science, nonviolent
            communication, and trauma-informed facilitation. It's the only
            instructor program that combines all three.
          </p>

          <h2>The Sauna Host</h2>
          <p>
            This course is a consumer-grade taste of that method — simplified,
            made beautiful, and handed to you free. The full framework lives
            inside our instructor training. If hosting your own gathering
            lights something up, that's where you go next.
          </p>

          <h2>The Bio/Psych/Social Method</h2>
          <p>
            Three interwoven domains make up the method we teach at Revivery:
          </p>
          <ul>
            <li>
              <strong>Biological</strong> — the science of thermal therapy, heat
              shock proteins, cardiovascular adaptation, contrast therapy
              physiology, and the Soberg protocol.
            </li>
            <li>
              <strong>Psychological</strong> — nonviolent communication,
              trauma-informed leadership, emotional regulation, and the
              neuroception of safety.
            </li>
            <li>
              <strong>Social</strong> — community building, authentic connection,
              facilitation skills, reflective listening, and creating a
              container of safety.
            </li>
          </ul>
          <p>
            The Sauna Host samples pieces from each. The full Revivery Instructor
            Training (REV-1) goes deep on all three — three days in Tampa, plus a
            twelve-hour online masterclass, plus four assigned books.
          </p>
        </div>

        <div className="mt-16 flex flex-wrap gap-4">
          <a
            href={site.ritUrl}
            target="_blank"
            rel="noopener"
            className="btn-primary"
          >
            Explore Instructor Training →
          </a>
        </div>

        <div className="mt-20 pt-10 border-t border-peach/10">
          <Link
            href="/"
            className="font-display text-xs uppercase tracking-heading text-peach/60 hover:text-peach transition-colors"
          >
            ← Back to The Sauna Host
          </Link>
        </div>
      </div>
    </article>
  );
}
