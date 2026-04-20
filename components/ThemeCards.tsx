import Image from "next/image";
import { themes } from "@/lib/config";

export default function ThemeCards() {
  return (
    <section id="themes" className="py-section border-t border-peach/10 bg-teal/5">
      <div className="container-sauna">
        <div className="grid md:grid-cols-12 gap-10 mb-20">
          <div className="md:col-span-4">
            <p className="eyebrow mb-4">The themes</p>
          </div>
          <div className="md:col-span-8">
            <h2 className="font-display text-display-lg uppercase tracking-heading text-peach leading-[1.05]">
              Four gatherings.
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
          {themes.map((theme, i) => (
            <div
              key={theme.id}
              className="group overflow-hidden bg-blue-black/40 hover:bg-blue-black/60 transition-colors"
            >
              {/* Mood image header */}
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src={theme.image}
                  alt={theme.imageAlt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
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
          ))}
        </div>
      </div>
    </section>
  );
}
