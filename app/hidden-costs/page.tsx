import type { Metadata } from "next";
import ProductPage from "@/components/ProductPage";
import { products } from "@/content/products";
import { site } from "@/lib/config";

export const metadata: Metadata = {
  title: "The Hidden Costs of Building a Sauna | The Sauna Host",
  description:
    "A $7 checklist and budget worksheet covering every cost DIY sauna budgets miss: electrical, permits, flooring, vents and upkeep. From Revivery.",
  alternates: { canonical: `${site.url}/hidden-costs` },
};

export default function Page() {
  return <ProductPage product={products["hidden-costs"]} />;
}
