import type { Metadata } from "next";
import ProductPage from "@/components/ProductPage";
import { products } from "@/content/products";
import { site } from "@/lib/config";

export const metadata: Metadata = {
  title: "The Hot-Climate Sauna Guide | The Sauna Host",
  description:
    "How to build, place and care for a sauna in Florida and other hot, humid climates. A $29 guide from the team behind a sauna and cold plunge studio in Tampa Bay.",
  alternates: { canonical: `${site.url}/hot-climate-guide` },
};

export default function Page() {
  return <ProductPage product={products["hot-climate-guide"]} />;
}
