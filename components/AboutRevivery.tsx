import Image from "next/image";

export default function AboutRevivery() {
  return (
    <section className="py-section border-t border-peach/10">
      <div className="container-sauna">
        <div className="grid md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-5">
            <p className="eyebrow mb-6">Who's behind it</p>
            <h2 className="font-display text-display-md uppercase tracking-heading text-peach leading-[1.1] mb-6">
              Heat.<br />
              Ice.<br />
              <span className="text-gold">Repeat.</span>
            </h2>
            <p className="text-peach/80 text-lg leading-relaxed mb-6">
              The Sauna Host comes from the team behind a sauna and cold plunge
              studio in Tampa Bay, where guided contrast therapy is what we do
              every day.
            </p>
            <p className="text-peach/70 leading-relaxed mb-6">
              We train leads in what we call the Bio/Psych/Social Method — a
              combination of thermal science, nonviolent communication, and
              trauma-informed facilitation. This course is a taste of that
              method — simplified, made beautiful, and handed to you free.
            </p>
          </div>

          {/* Right: two-image collage */}
          <div className="md:col-span-7">
            <div className="grid grid-cols-2 gap-4">
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src="/images/sauna-meditation-group.jpg"
                  alt="A guided sauna session"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 50vw, 30vw"
                />
              </div>
              <div className="relative aspect-[3/4] overflow-hidden mt-10">
                <Image
                  src="/images/plunge-joy.jpg"
                  alt="Connection after the cold plunge"
                  fill
                  className="object-cover object-top"
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
