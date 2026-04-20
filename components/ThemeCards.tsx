import Image from "next/image";
import { themes } from "@/lib/config";

export default function ThemeCards() {
  return (
    <section id="themes" className="relative py-section border-t border-peach/10 bg-teal/5 overflow-hidden">
      {/* Revivery gold brand pattern — layered decor behind the cards */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-1/3 w-[520px] h-[520px] md:w-[720px] md:h-[720px] opacity-[0.28] z-0 select-none"
      >
        <Image
          src="/brand/pattern-gold.png"
          alt=""
          fill
          sizes="720px"
          className="object-contain"
        />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 bottom-10 w-[380px] h-[380px] md:w-[520px] md:h-[520px] opacity-[0.26] z-0 rotate-180 select-none"
      >
        <Image
          src="/brand/pattern-gold.png"
          alt=""
          fill
          sizes="520px"
          className="object-contain"
        />
      </div>

      <div className="container-sauna relative z-10">
        <div className="grid md:grid-cols-12 gap-10 mb-20">
          <div className="md:col-span-4">
            <p className="eyebrow mb-4">The themes</p>
          </div>
          <div className="md:col-span-8">
            <h2 className="font-display text-display-lg uppercase tracking-heading text-peach leading-[1.05]">
              Five gatherings.
              <br />
              One method.
            </h2>
            <p className="text-peach/70 text-lg mt-8 max-w-2xl leading-relaxed">
              On Day 5, you pick one. Each theme comes with its own invitation
              script, 10 conversation prompts, a 90-minute flow, a playlist, and
              the group-text script for afterward.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {themes.map((theme, i) => {
            const isLastAndOdd = i === themes.length - 1 && themes.length % 2 === 1;
            return (
            <div
              key={theme.id}
              className={`group overflow-hidden bg-blue-black/40 hover:bg-blue-black/60 transition-colors ${
                isLastAndOdd ? "md:col-span-2" : ""
              }`}
            >
              {/* Mood image header */}
              <div
                className={`relative overflow-hidden ${
                  isLastAndOdd ? "aspect-[21/9]" : "aspect-[16/9]"
                }`}
              >
                <Image
                  src={theme.image}
                  alt={theme.imageAlt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes={isLastAndOdd ? "100vw" : "(max-width: 768px) 100vw, 50vw"}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-black via-blue-black/40 to-transparent" />
                {/* Gold accent bar on hover */}
                <div className="absolute bottom-0 left-0 h-1 bg-gold w-0 group-hover:w-full transition-all duration-500" />
              </div>

              {/* Content */}
              <div className="p-10 md:p-12 border-l-2 border-transparent group-hover:border-gold transition-colors">
                <p className="eyebrow mb-6">Theme 0{i + 1}</p>
                <h3 className="font-display text-3xl md:text-4xl uppercase tracking-heading text-peach mb-4">
                  {theme.name}
                </h3>
                <p className="text-gold/90 italic text-lg mb-6">
                  {theme.tagline}
                </p>
                <p className="text-peach/70 leading-relaxed max-w-md">
                  {theme.description}
                </p>
              </div>
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
