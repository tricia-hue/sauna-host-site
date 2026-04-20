import Image from "next/image";
import OptInForm from "./OptInForm";

export default function Hero() {
  return (
    <section
      id="start"
      className="relative min-h-screen flex items-center overflow-hidden pt-32 pb-section"
    >
      {/* Background image — warm, no grayscale overlay */}
      <Image
        src="/images/hero-sauna-group.jpg"
        alt="Group sauna meditation session at Revivery"
        fill
        priority
        className="object-cover object-[center_top]"
        sizes="100vw"
      />
      {/* Left-to-right gradient so copy stays legible without washing out the image */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-blue-black/90 via-blue-black/60 to-blue-black/10"
      />
      {/* Soft bottom fade to ground the section */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-blue-black to-transparent"
      />

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
            Five days. Five gatherings you can host. One method — the same one we
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
            <span>26-Page Workbook</span>
          </div>
        </div>
      </div>
    </section>
  );
}
