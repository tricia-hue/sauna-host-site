import OptInForm from "./OptInForm";

export default function FinalCTA() {
  return (
    <section className="py-section border-t border-peach/10 bg-teal/10 relative overflow-hidden">
      <div
        aria-hidden
        className="absolute top-1/2 left-12 -translate-y-1/2 hidden lg:block opacity-30"
      >
        <div className="flex flex-col gap-3">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="w-1 h-6 bg-gold" />
          ))}
        </div>
      </div>

      <div className="container-sauna relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <p className="eyebrow mb-8">Ready?</p>
          <h2 className="font-display text-display-lg uppercase tracking-heading text-peach leading-[1.05] mb-8">
            Five days.<br />
            One gathering.<br />
            <span className="text-gold">Free.</span>
          </h2>
          <p className="text-peach/70 text-lg leading-relaxed mb-12 max-w-xl mx-auto">
            Day 1 arrives the second you sign up. By Day 5, you'll have everything
            you need to host your first gathering.
          </p>

          <div className="flex justify-center">
            <OptInForm source="landing-footer" />
          </div>
        </div>
      </div>
    </section>
  );
}
