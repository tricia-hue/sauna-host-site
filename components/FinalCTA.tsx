import Image from "next/image";
import OptInForm from "./OptInForm";

export default function FinalCTA() {
  return (
    <section className="py-section border-t border-peach/10 bg-blue-black relative overflow-hidden">
      {/*
        Revivery brand pattern — vertical, left-justified, bleeding off the left edge,
        on Blue Black. Per Revivery Brand Manual §2.
      */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 -left-24 md:-left-32 h-full w-[320px] md:w-[460px] opacity-25 z-0 select-none"
      >
        <Image
          src="/brand/pattern-gold.png"
          alt=""
          fill
          sizes="460px"
          className="object-contain object-left"
        />
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
