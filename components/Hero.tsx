import Image from "next/image";
import OptInForm from "./OptInForm";

export default function Hero() {
  return (
    <section
      id="start"
      className="relative min-h-screen flex items-center overflow-hidden pt-32 pb-section"
    >
      {/* Background image with dark overlay */}
      <Image
        src="/images/hero-sauna-group.jpg"
        alt="Group sauna meditation session at Revivery"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-blue-black/75" />

      {/* Subtle gold vertical pattern along the right edge */}
      <div
        aria-hidden
        className="absolute top-0 bottom-0 right-0 w-1 bg-gold/60 z-10"
      />
      <div
        aria-hidden
        className="absolute top-1/2 right-12 -translate-y-1/2 hidden lg:block z-10"
      >
        <div className="flex flex-col gap-3 opacity-40">
          {Array.from({ length: 24 }).map((_, i) => (
            <div key={i} className="w-1 h-6 bg-gold" />
          ))}
        </div>
      </div>

      <div className="container-sauna relative z-10">
        <div className="max-w-4xl">
          <p className="eyebrow mb-8 animate-fade-in">
            A free mini course from Revivery
          </p>

          <h1 className="font-display text-display-xl uppercase tracking-heading text-peach leading-none mb-8 animate-fade-up">
            The Sauna
            <br />
            Host.
          </h1>

          <p className="text-xl md:text-2xl text-peach/80 max-w-2xl leading-relaxed mb-4 animate-fade-up">
            Become the host your friends will remember.
          </p>

          <p className="text-base md:text-lg text-peach/60 max-w-xl leading-relaxed mb-12 animate-fade-up">
            Five days. Four gatherings you can host. One method — the same one we
            teach the leads at Revivery.
          </p>

          <div className="animate-fade-up">
            <OptInForm source="landing-hero" />
          </div>

          <div className="mt-20 flex items-center gap-6 text-peach/50 text-xs uppercase tracking-heading animate-fade-in">
            <span>Sauna + Cold Plunge Circle</span>
            <span className="w-px h-3 bg-peach/30" />
            <span>Free 5-Day Course</span>
            <span className="w-px h-3 bg-peach/30" />
            <span>24-Page Workbook</span>
          </div>
        </div>
      </div>
    </section>
  );
}
