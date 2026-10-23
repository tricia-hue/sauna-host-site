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
  preview: {
    headline: string;
    intro: string;
    tips: { label: string; title: string; text: string }[];
    lockedIntro: string;
    locked: string[];
    pages: { src: string; alt: string }[];
  };
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
    downloadName: "The-Sauna-Host-Hidden-Costs-of-Building-a-Sauna.pdf",
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
    preview: {
      headline: "Three costs that catch almost everyone.",
      intro:
        "The checklist covers 41 line items across 8 categories. Here are three of them, free.",
      tips: [
        {
          label: "Electrical",
          title: "Check your panel before you buy a heater.",
          text: "A traditional sauna heater needs its own 240V circuit, usually 30–50A. Many homes built before 1990 have 60A or 100A panels, and builders report upgrades at $2,000–4,000. That's before a single board is cut.",
        },
        {
          label: "Interior",
          title: "Don't use laminate or vinyl flooring.",
          text: "Heat warps it and the adhesive gives off fumes. One builder's laminate floor warped within three weeks. Tile, sealed concrete or removable duckboards hold up.",
        },
        {
          label: "Ongoing",
          title: "What it costs to run, in one line of math.",
          text: "Heater kW × hours × your rate per kWh. A 6 kW heater running a full hour at $0.15 per kWh costs about $0.90 at most, and heaters cycle, so real use is usually lower.",
        },
      ],
      lockedIntro: "Inside the full checklist:",
      locked: [
        "The 6 electrical line items most DIY budgets leave out",
        "Why you should measure every gate and doorway before ordering a kit",
        "The vapor barrier shortcut that leads to $5,000+ mold repairs",
        "What to check with your city, county, HOA and insurer before you buy materials",
        "The 20% contingency rule, and why installs run 30–50% over equipment",
        "A fill-in budget worksheet: estimate, quote and actual for every category",
      ],
      pages: [
        { src: "/images/products/hidden-costs-preview-1.jpg", alt: "Preview of the checklist's electrical and site pages" },
        { src: "/images/products/hidden-costs-preview-2.jpg", alt: "Preview of the checklist's walls, heater and interior pages" },
      ],
    },
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
    downloadName: "The-Sauna-Host-Hot-Climate-Sauna-Guide.pdf",
    image: "/images/products/hot-climate-guide.jpg",
    imageAlt: "A lush tropical garden path lined with palms in Key West, Florida",
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
    preview: {
      headline: "Three things northern sauna plans never tell you.",
      intro:
        "Most sauna advice is written for Finland and Minnesota. Here's a taste of what changes in Florida, free.",
      tips: [
        {
          label: "Placement",
          title: "The sun can push your exterior walls to 130–140°F.",
          text: "Direct afternoon sun ages wood, seals and finishes fast. Siting the sauna in afternoon shade, or under a reflective metal roof, is the cheapest fix you'll ever make.",
        },
        {
          label: "Walls",
          title: "Never add a second vapor barrier on the outside.",
          text: "In humid climates moisture pushes into walls from outside. Two barriers trap it between them, which is exactly how hidden mold starts. Your wall has to dry in both directions.",
        },
        {
          label: "Care",
          title: "Bake it dry after the last session.",
          text: "Leave the heater on for 10–15 minutes with the door cracked and both vents open. Mold needs moisture, warmth and time, and this takes away the time.",
        },
      ],
      lockedIntro: "Inside the full guide:",
      locked: [
        "The 7-layer wall, from paneling to siding, that dries in both directions",
        "The vent layout most first builds get wrong (and the cold feet it causes)",
        "Which exterior woods last in humidity, and which need re-oiling every 1–2 years",
        "How to keep termites out of the footings, year-round",
        "Why electric heaters beat wood-burning in humid climates",
        "The full mold-proof routine: after each session, monthly and yearly",
        "3 ways to cool down between rounds when it's 85°F outside",
        "A before-you-build checklist: flood zone, HOA, permits and panel",
      ],
      pages: [
        { src: "/images/products/hot-climate-preview-1.jpg", alt: "Preview of the guide's wall-building section" },
        { src: "/images/products/hot-climate-preview-2.jpg", alt: "Preview of the guide's materials and heater sections" },
      ],
    },
  },
};
