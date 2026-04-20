import Image from "next/image";
import { site } from "@/lib/config";

export default function AboutRevivery() {
  return (
    <section className="py-section border-t border-peach/10">
      <div className="container-sauna">
        <div className="grid md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-5">
            <p className="eyebrow mb-6">About Revivery</p>
            <h2 className="font-display text-display-md uppercase tracking-heading text-peach leading-[1.1] mb-6">
              Heat.<br />
              Ice.<br />
              <span className="text-gold">Repeat.</span>
            </h2>
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

          {/* Right: two-image collage */}
          <div className="md:col-span-7">
            <div className="grid grid-cols-2 gap-4">
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src="/images/sauna-meditation-group.jpg"
                  alt="Guided sauna session at Revivery Tampa"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 30vw"
                />
              </div>
              <div className="relative aspect-[3/4] overflow-hidden mt-10">
                <Image
                  src="/images/plunge-joy.jpg"
                  alt="Connection after the plunge at Revivery"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 30vw"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
