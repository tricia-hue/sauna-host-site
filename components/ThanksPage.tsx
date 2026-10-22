import Link from "next/link";
import { products, type Product } from "@/content/products";

export default function ThanksPage({ product }: { product: Product }) {
  const other = product.crossSell ? products[product.crossSell] : undefined;
  return (
    <article className="pt-40 pb-section">
      <div className="container-sauna max-w-prose-wide mx-auto">
        <p className="eyebrow mb-6">Thank you</p>
        <h1 className="font-display text-display-lg uppercase tracking-heading text-peach leading-[1.05] mb-6">
          You're all set.
        </h1>
        <p className="text-gold/90 italic text-xl leading-relaxed mb-12">
          Your copy of {product.name} is ready. A receipt is on its way to your
          inbox.
        </p>

        <div className="border border-peach/15 bg-peach/[0.02] p-8 md:p-12 mb-16 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <p className="eyebrow mb-2">Your download</p>
            <p className="text-peach/80 text-lg">{product.name}</p>
            <p className="text-peach/50 text-sm mt-1">
              {product.format}. Save it, or bookmark this page to download it
              again.
            </p>
          </div>
          <a
            href={product.downloadPath}
            download={product.downloadName}
            className="btn-primary whitespace-nowrap"
          >
            Download the PDF →
          </a>
        </div>

        {other && (
          <div className="border-t border-peach/10 pt-12 mb-12">
            <p className="eyebrow mb-4">Next</p>
            <h2 className="font-display text-2xl uppercase tracking-heading text-peach mb-4">
              {other.name}
            </h2>
            <p className="text-peach/70 leading-relaxed mb-6">{other.subhead}</p>
            <Link href={`/${other.slug}`} className="btn-secondary">
              See the {other.price} {other.slug === "hidden-costs" ? "checklist" : "guide"} →
            </Link>
          </div>
        )}

        <div className="border-t border-peach/10 pt-12">
          <p className="eyebrow mb-4">When it's built</p>
          <p className="text-peach/70 leading-relaxed mb-6">
            Our free 5-day course teaches you to host a sauna and cold plunge
            gathering at home.
          </p>
          <Link href="/" className="btn-secondary">
            Start the free course →
          </Link>
        </div>

        <p className="text-peach/40 text-xs mt-12">
          Trouble downloading? Email learn@revivery.co and we'll send it over.
        </p>
      </div>
    </article>
  );
}
