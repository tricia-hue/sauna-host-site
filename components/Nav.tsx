import Link from "next/link";
import { site } from "@/lib/config";

export default function Nav() {
  return (
    <header className="absolute top-0 left-0 right-0 z-30">
      <div className="container-sauna flex items-center justify-between py-8">
        <Link
          href="/"
          className="font-display text-xs uppercase tracking-display text-peach hover:text-gold transition-colors"
          aria-label="The Sauna Host"
        >
          Revivery / The Sauna Host
        </Link>
        <nav className="hidden md:flex items-center gap-10">
          <Link
            href="/#curriculum"
            className="font-display text-xs uppercase tracking-heading text-peach/70 hover:text-peach transition-colors"
          >
            Curriculum
          </Link>
          <Link
            href="/#themes"
            className="font-display text-xs uppercase tracking-heading text-peach/70 hover:text-peach transition-colors"
          >
            Themes
          </Link>
          <Link
            href="/#faq"
            className="font-display text-xs uppercase tracking-heading text-peach/70 hover:text-peach transition-colors"
          >
            FAQ
          </Link>
          <Link
            href="/#start"
            className="font-display text-xs uppercase tracking-heading text-gold hover:text-gold-light transition-colors"
          >
            Start free →
          </Link>
        </nav>
      </div>
    </header>
  );
}
