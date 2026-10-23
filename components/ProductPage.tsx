import Image from "next/image";
import Link from "next/link";
import { products, type Product } from "@/content/products";

function BuyButton({ product }: { product: Product }) {
  if (!product.stripeUrl) {
    return (
      <span className="btn-primary opacity-50 cursor-not-allowed">
        Coming soon
      </span>
    );
  }
  return (
    <a href={product.stripeUrl} className="btn-primary whitespace-nowrap">
      Get it for {product.price} →
    </a>
  );
}

export default function ProductPage({ product }: { product: Product }) {
  const other = product.crossSell ? products[product.crossSell] : undefined;

  return (
    <>
      <section className="pt-40 pb-section">
        <div className="container-sauna grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="eyebrow mb-6">{product.eyebrow}</p>
            <h1 className="font-display text-display-lg uppercase tracking-heading text-peach leading-[1.05] mb-6">
              {product.headline[0]}
              <br />
              {product.headline[1]}
            </h1>
            <p className="text-gold/90 italic text-xl leading-relaxed mb-10">
              {product.subhead}
            </p>
            <div className="flex items-center gap-6 flex-wrap">
              <BuyButton product={product} />
              <span className="text-peach/60 text-sm">
                {product.format} · instant download
              </span>
            </div>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image
              src={product.image}
              alt={product.imageAlt}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      <section className="pb-section">
        <div className="container-sauna max-w-prose-wide">
          <div className="prose-sauna">
            {product.problem.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-section">
        <div className="container-sauna">
          <p className="eyebrow mb-6">What's inside</p>
          <div className="grid md:grid-cols-2 gap-0 border-t border-peach/10">
            {product.inside.map((item, i) => (
              <div
                key={item.title}
                className={`p-8 border-b border-peach/10 ${
                  i % 2 === 0 ? "md:border-r border-peach/10" : ""
                }`}
              >
                <h3 className="font-display text-lg uppercase tracking-heading text-peach mb-3">
                  {item.title}
                </h3>
                <p className="text-peach/70 text-sm leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-section">
        <div className="container-sauna max-w-prose-wide">
          <p className="eyebrow mb-6">It's for you if</p>
          <ul className="space-y-3 mb-12">
            {product.forWho.map((w) => (
              <li key={w} className="text-peach/80 text-lg">
                <span className="text-gold mr-3">—</span>
                {w}
              </li>
            ))}
          </ul>
          <div className="border border-peach/15 bg-peach/[0.02] p-8 md:p-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <p className="eyebrow mb-2">{product.price}</p>
              <p className="text-peach text-lg">{product.name}</p>
              <p className="text-peach/50 text-sm mt-1">
                {product.format}. From the team behind a sauna and cold plunge
                studio in Tampa Bay.
              </p>
            </div>
            <BuyButton product={product} />
          </div>
          <p className="text-peach/40 text-xs mt-6 leading-relaxed">
            For planning and education, not professional advice. Electrical
            work must be done by a licensed electrician, and code, permit and
            HOA rules vary by location.
          </p>
        </div>
      </section>

      {other && (
        <section className="pb-section">
          <div className="container-sauna max-w-prose-wide border-t border-peach/10 pt-12">
            <p className="eyebrow mb-4">Also from The Sauna Host</p>
            <Link
              href={`/${other.slug}`}
              className="font-display text-2xl uppercase tracking-heading text-peach hover:text-gold transition-colors"
            >
              {other.name} — {other.price} →
            </Link>
          </div>
        </section>
      )}
    </>
  );
}
