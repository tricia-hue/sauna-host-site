/**
 * Paid digital products sold on The Sauna Host.
 * Stripe Payment Links redirect to each product's thanksPath after purchase.
 * Swap stripeUrl to the LIVE link (buy.stripe.com/...) before launch.
 */

export type Product = {
  slug: string;
  name: string;
  shortName: string;
  price: string;
  format: string;
  stripeUrl: string;
  thanksPath: string;
  downloadPath: string;
  downloadName: string;
  image: string;
  imageAlt: string;
  eyebrow: string;
  headline: string[];
  subhead: string;
  problem: string[];
  inside: { title: string; text: string }[];
  forWho: string[];
  crossSell?: string;
};

export const products: Record<string, Product> = {
  "hidden-costs": {
    slug: "hidden-costs",
    name: "The Hidden Costs of Building a Sauna",
    shortName: "The Hidden Costs Checklist",
    price: "$7",
    format: "PDF checklist + budget worksheet",
    stripeUrl: "https://buy.stripe.com/00w5kC0VaahO5Od9HNdnW00", // LIVE
    thanksPath: "/thanks/hidden-costs-checklist",
    downloadPath: "/downloads/hidden-costs-of-building-a-sauna-r7k2.pdf",
    downloadName: "Revivery-Hidden-Costs-of-Building-a-Sauna.pdf",
    image: "/images/products/hidden-costs.jpg",
    imageAlt: "A backyard barrel sauna on a wooden deck",
    eyebrow: "The $7 checklist",
    headline: ["The hidden costs", "of building a sauna."],
    subhead:
      "Every cost DIY sauna budgets miss, named before you buy a single board.",
    problem: [
      "Most DIY sauna budgets cover the wood and the heater. Then come the panel upgrade, the permit, the vents, the flooring that warps in three weeks.",
      "One builder who shared his numbers budgeted $4,000 and finished at $9,000. None of those costs were surprising once you knew to look for them.",
    ],
    inside: [
      { title: "Electrical", text: "Panel capacity, the 240V circuit, permits, and the questions to ask your electrician." },
      { title: "Site and foundation", text: "Piers, drainage, delivery access and placement." },
      { title: "Walls and weatherproofing", text: "Vapor barrier, insulation, vents, roof and fasteners." },
      { title: "Heater and interior", text: "Stones, guards, paneling, benches and the right floor." },
      { title: "Permits, HOA and insurance", text: "What to check before you buy materials." },
      { title: "Ongoing costs", text: "Electricity, refinishing and upkeep, with a simple way to estimate them." },
      { title: "Budget worksheet", text: "Estimate, quote and actual for every category, plus a 20% contingency." },
    ],
    forWho: [
      "You're pricing a DIY sauna, indoor or outdoor",
      "You're comparing a kit against building from plans",
      "You want a real number before you commit",
    ],
    crossSell: "hot-climate-guide",
  },
  "hot-climate-guide": {
    slug: "hot-climate-guide",
    name: "The Hot-Climate Sauna Guide",
    shortName: "The Hot-Climate Sauna Guide",
    price: "$29",
    format: "PDF guide",
    stripeUrl: "https://buy.stripe.com/9B6aEW7jyahOgsR2fldnW01", // LIVE
    thanksPath: "/thanks/hot-climate-guide",
    downloadPath: "/downloads/hot-climate-sauna-guide-m4q9.pdf",
    downloadName: "Revivery-Hot-Climate-Sauna-Guide.pdf",
    image: "/images/products/hot-climate-guide.jpg",
    imageAlt: "A woman in a backyard cold plunge tub surrounded by garden",
    eyebrow: "The $29 guide",
    headline: ["The hot-climate", "sauna guide."],
    subhead:
      "How to build, place and care for a sauna where it's hot and humid.",
    problem: [
      "Almost every sauna plan was written for Finland or Minnesota. In Florida and the Gulf Coast, the problems that ruin saunas are different: humidity in the walls, sun on the roof, termites year-round, and no cold air to cool off in.",
      "We run a sauna and cold plunge studio in Tampa Bay. This is what we wish every backyard builder here knew before they started.",
    ],
    inside: [
      { title: "Where to put it", text: "Shade, elevation, drainage, flood zones, and when an indoor build is the smarter call." },
      { title: "Building for humidity", text: "The wall, layer by layer, and a ventilation setup that dries the room." },
      { title: "Materials that last", text: "Wood, roofing, fasteners, flooring and footings that stand up to heat and termites." },
      { title: "Heater and electrical", text: "Sizing, electric vs wood, and what to sort out with your electrician." },
      { title: "The mold-proof routine", text: "What to do after each session, every month and every year." },
      { title: "Using it in the heat", text: "Cool-down options from a hose to a cold plunge, and a simple session to follow." },
    ],
    forWho: [
      "You live in Florida, the Gulf Coast or another hot, humid climate",
      "You're planning a backyard sauna or already have one",
      "You want it to last without fighting mold",
    ],
    crossSell: "hidden-costs",
  },
};
