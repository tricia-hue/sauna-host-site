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

        <div className="grid md:grid-cols-2 gap-0 border-t border-peach/10">
          {themes.map((theme, i) => (
            <div
              key={theme.id}
              className={`
                p-10 md:p-14 border-b border-peach/10
                ${i % 2 === 0 ? "md:border-r border-peach/10" : ""}
                hover:bg-peach/[0.03] transition-colors
              `}
            >
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
          ))}
        </div>
      </div>
    </section>
  );
}
