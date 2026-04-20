import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/config";

export default function Footer() {
  return (
    <footer className="border-t border-peach/10 mt-section">
      <div className="container-sauna py-16 grid md:grid-cols-3 gap-10">
        <div>
          <Image
            src="/brand/logo-primary-white.png"
            alt="Revivery"
            width={160}
            height={36}
            className="h-8 w-auto mb-6 opacity-90"
          />
          <p className="text-peach/70 text-sm leading-relaxed max-w-xs">
            A social wellness studio in Tampa, FL. Guided contrast therapy. Trained
            leads. The practice, not the product.
          </p>
        </div>

        <div className="md:text-center">
          <p className="eyebrow mb-4">The course</p>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                href="/#curriculum"
                className="text-peach/70 hover:text-peach transition-colors"
              >
                The 5 lessons
              </Link>
            </li>
            <li>
              <Link
                href="/#themes"
                className="text-peach/70 hover:text-peach transition-colors"
              >
                Four themes
              </Link>
            </li>
            <li>
              <Link
                href="/#faq"
                className="text-peach/70 hover:text-peach transition-colors"
              >
                FAQ
              </Link>
            </li>
          </ul>
        </div>

        <div className="md:text-right">
          <p className="eyebrow mb-4">The bigger path</p>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href={site.ritUrl}
                className="text-peach/70 hover:text-gold transition-colors"
                target="_blank"
                rel="noopener"
              >
                Revivery Instructor Training →
              </a>
            </li>
            <li>
              <a
                href={site.parentSite}
                className="text-peach/70 hover:text-gold transition-colors"
                target="_blank"
                rel="noopener"
              >
                Visit Revivery Tampa →
              </a>
            </li>
            <li>
              <a
                href={`mailto:${site.replyTo}`}
                className="text-peach/70 hover:text-gold transition-colors"
              >
                {site.replyTo}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container-sauna border-t border-peach/10 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-peach/50 text-xs">
          © {new Date().getFullYear()} Revivery. Tampa, FL. Heat Ice Repeat.
        </p>
        <div className="flex gap-6 text-xs text-peach/50">
          <Link href="/privacy" className="hover:text-peach transition-colors">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-peach transition-colors">
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
}
