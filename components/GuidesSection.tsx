import Link from "next/link";
import GuidesGrid from "@/components/GuidesGrid";

export default function GuidesSection() {
  return (
    <section id="guides" className="py-section border-t border-peach/10">
      <div className="container-sauna">
        <div className="max-w-prose-wide mb-12">
          <p className="eyebrow mb-6">Building a sauna?</p>
          <h2 className="font-display text-display-md uppercase tracking-heading text-peach leading-[1.1] mb-6">
            The guides.
          </h2>
          <p className="text-peach/70 text-lg leading-relaxed">
            Two downloadable guides for anyone planning a sauna at home — what it
            really costs, and how to build one that lasts in heat and humidity.
          </p>
        </div>
        <GuidesGrid />
        <div className="mt-10">
          <Link
            href="/guides"
            className="font-display text-xs uppercase tracking-heading text-peach/60 hover:text-gold transition-colors"
          >
            All guides →
          </Link>
        </div>
      </div>
    </section>
  );
}
