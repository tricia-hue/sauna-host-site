import type { Metadata } from "next";
import Link from "next/link";
import GuidesGrid from "@/components/GuidesGrid";
import { site } from "@/lib/config";

export const metadata: Metadata = {
  title: "Sauna Guides | The Sauna Host",
  description:
    "Downloadable guides for building a sauna at home: the hidden costs checklist and the hot-climate sauna guide for Florida and other humid climates.",
  alternates: { canonical: `${site.url}/guides` },
};

export default function GuidesPage() {
  return (
    <>
      <section className="pt-40 pb-16">
        <div className="container-sauna">
          <div className="max-w-prose-wide">
            <p className="eyebrow mb-6">The guides</p>
            <h1 className="font-display text-display-lg uppercase tracking-heading text-peach leading-[1.05] mb-8">
              Build it right
              <br />
              the first time.
            </h1>
            <p className="text-gold/90 italic text-xl leading-relaxed">
              Practical guides for planning, building and caring for a sauna at
              home, from the team behind a sauna and cold plunge studio in Tampa
              Bay.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-section">
        <div className="container-sauna">
          <GuidesGrid />
        </div>
      </section>

      <section className="pb-section">
        <div className="container-sauna max-w-prose-wide border-t border-peach/10 pt-12">
          <p className="eyebrow mb-4">Already have a sauna?</p>
          <h2 className="font-display text-2xl uppercase tracking-heading text-peach mb-4">
            Learn to host in it.
          </h2>
          <p className="text-peach/70 leading-relaxed mb-6">
            Our free 5-day course teaches you to host a sauna and cold plunge
            gathering your friends will remember.
          </p>
          <Link href="/" className="btn-secondary">
            Start the free course →
          </Link>
        </div>
      </section>
    </>
  );
}
