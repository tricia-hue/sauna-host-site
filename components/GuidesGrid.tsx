import Image from "next/image";
import Link from "next/link";
import { products } from "@/content/products";

const order = ["hidden-costs", "hot-climate-guide"];

export default function GuidesGrid() {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      {order.map((slug) => {
        const p = products[slug];
        return (
          <Link
            key={slug}
            href={`/${slug}`}
            className="group block overflow-hidden bg-blue-black/40 hover:bg-blue-black/60 transition-colors border border-peach/10"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={p.image}
                alt={p.imageAlt}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
              />
            </div>
            <div className="p-8">
              <p className="eyebrow mb-3">{p.eyebrow}</p>
              <h3 className="font-display text-2xl uppercase tracking-heading text-peach mb-3">
                {p.name}
              </h3>
              <p className="text-peach/70 leading-relaxed mb-6">{p.subhead}</p>
              <span className="font-display text-xs uppercase tracking-heading text-gold group-hover:text-peach transition-colors">
                See what's inside →
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
