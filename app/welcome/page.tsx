import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/config";

export const metadata: Metadata = {
  title: "Welcome to The Sauna Host",
  description: "You're in. Lesson 1 is on its way.",
};

export default function WelcomePage() {
  return (
    <section className="min-h-[calc(100vh-200px)] flex items-center py-section">
      <div className="container-sauna max-w-3xl mx-auto text-center">
        <p className="eyebrow mb-8">You're in</p>
        <h1 className="font-display text-display-lg uppercase tracking-heading text-peach leading-[1.05] mb-10">
          Welcome to<br />
          The Sauna Host.
        </h1>

        <p className="text-peach/80 text-lg leading-relaxed max-w-xl mx-auto mb-6">
          Lesson 1 is on its way to your inbox. If you don't see it in 5 minutes,
          check your promotions folder and drag us into your main inbox — so the
          rest of the course doesn't get buried.
        </p>

        <div className="my-16 border-t border-b border-peach/10 py-10 text-left max-w-xl mx-auto">
          <p className="eyebrow mb-6">What happens next</p>
          <ul className="space-y-4 text-peach/80">
            <li className="flex gap-4">
              <span className="font-display text-xs uppercase tracking-display text-gold flex-shrink-0 pt-1">
                Today
              </span>
              <span>Lesson 1 lands in your inbox. It's about the <em>why</em>. 3 minutes to read.</span>
            </li>
            <li className="flex gap-4">
              <span className="font-display text-xs uppercase tracking-display text-gold flex-shrink-0 pt-1">
                Tomorrow
              </span>
              <span>Lesson 2. Setting the container.</span>
            </li>
            <li className="flex gap-4">
              <span className="font-display text-xs uppercase tracking-display text-gold flex-shrink-0 pt-1">
                Day 3–4
              </span>
              <span>Breath, then cold. The two lessons that change everything.</span>
            </li>
            <li className="flex gap-4">
              <span className="font-display text-xs uppercase tracking-display text-gold flex-shrink-0 pt-1">
                Day 5
              </span>
              <span>You pick your theme and walk away with a complete plan.</span>
            </li>
          </ul>
        </div>

        <div className="mb-16">
          <p className="eyebrow mb-6">Want to start right now?</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/lesson-1" className="btn-primary">
              Read Lesson 1 now →
            </Link>
            <Link href="/workbook" className="btn-secondary">
              Open the workbook
            </Link>
          </div>
        </div>

        <div className="mt-20 pt-10 border-t border-peach/10 text-peach/70 leading-relaxed max-w-xl mx-auto">
          <p className="mb-6">
            One more thing. If you know someone who needs this — the friend who
            bought the cold plunge and is using it alone, the sister who keeps
            saying "we need to get the girls together," the husband who's been
            looking for a different kind of hang — please send them this link.
          </p>
          <p className="font-display text-gold uppercase tracking-heading mb-8">
            revivery.co/host
          </p>
          <p className="text-peach/60 text-sm">
            In Tampa?{" "}
            <a
              href={site.parentSite}
              target="_blank"
              rel="noopener"
              className="underline underline-offset-4 hover:text-gold transition-colors"
            >
              Come sit with us at Revivery →
            </a>
          </p>
          <p className="mt-10 italic text-peach/80">
            See you in your inbox.
            <br />— Tricia
          </p>
        </div>
      </div>
    </section>
  );
}
