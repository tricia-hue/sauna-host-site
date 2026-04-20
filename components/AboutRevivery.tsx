import { site } from "@/lib/config";

export default function AboutRevivery() {
  return (
    <section className="py-section border-t border-peach/10">
      <div className="container-sauna">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <p className="eyebrow mb-6">About Revivery</p>
            <h2 className="font-display text-display-md uppercase tracking-heading text-peach leading-[1.1] mb-6">
              Heat.<br />
              Ice.<br />
              <span className="text-gold">Repeat.</span>
            </h2>
          </div>
          <div className="md:col-span-7 md:pt-8">
            <p className="text-peach/80 text-lg leading-relaxed mb-6">
              Revivery is a social wellness studio in Tampa, FL built around
              guided contrast therapy — sauna, cold plunge, and the practice of
              doing them together.
            </p>
            <p className="text-peach/70 leading-relaxed mb-6">
              We train certified leads to facilitate what we call the
              Bio/Psych/Social Method — a combination of thermal science,
              nonviolent communication, and trauma-informed facilitation. It's
              the only instructor program that combines all three. The Sauna
              Host is a consumer-grade taste of that method — simplified, made
              beautiful, and handed to you free.
            </p>
            <div className="flex flex-wrap gap-4 mt-10">
              <a
                href={site.parentSite}
                target="_blank"
                rel="noopener"
                className="btn-secondary"
              >
                Visit Revivery Tampa
              </a>
              <a
                href={site.ritUrl}
                target="_blank"
                rel="noopener"
                className="font-display text-xs uppercase tracking-heading text-gold hover:text-gold-light transition-colors self-center"
              >
                Explore Instructor Training →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
