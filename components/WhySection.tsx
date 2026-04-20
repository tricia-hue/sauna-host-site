import Image from "next/image";

export default function WhySection() {
  return (
    <section className="py-section border-t border-peach/10">
      <div className="container-sauna">
        <div className="grid md:grid-cols-12 gap-12 items-center">
          {/* Left: image with subtle gold accent bar */}
          <div className="md:col-span-5 relative">
            <div className="absolute top-0 bottom-0 left-0 w-1 bg-gold/80 z-10" />
            <div className="relative aspect-[4/5] overflow-hidden ml-4">
              <Image
                src="/images/community-joy.jpg"
                alt="A group connecting after a contrast therapy session"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-blue-black/10" />
            </div>
          </div>

          {/* Right: copy */}
          <div className="md:col-span-7">
            <p className="eyebrow mb-8">Why this course exists</p>
            <p className="font-display text-display-md uppercase tracking-heading text-peach leading-[1.1] mb-10">
              The sauna and the cold<br />
              are the capsule.<br />
              <span className="text-gold">Connection is the medicine.</span>
            </p>
            <p className="text-peach/70 text-lg leading-relaxed mb-6">
              Most people with a sauna at home are using it alone. Which works —
              the research is real. But the biggest unlock isn't the heat or the
              cold. It's what happens when you do it with people you love, in a
              container someone took the time to build.
            </p>
            <p className="text-peach/70 text-lg leading-relaxed">
              This course is how we teach that container.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
