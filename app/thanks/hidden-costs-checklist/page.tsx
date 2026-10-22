import type { Metadata } from "next";
import ThanksPage from "@/components/ThanksPage";
import { products } from "@/content/products";

export const metadata: Metadata = {
  title: "Your download | The Sauna Host",
  description:
    "Your download is ready.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <ThanksPage product={products["hidden-costs"]} />;
}
