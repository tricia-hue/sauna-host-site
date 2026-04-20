/**
 * Central site config for The Sauna Host.
 * Change URLs, CTAs, and brand copy here — every component reads from here.
 */

export const site = {
  name: "The Sauna Host",
  tagline: "A free 5-day mini course from Revivery.",
  description:
    "Become the host your friends will remember. Learn to host a sauna and cold plunge gathering — a women's circle, men's gathering, milestone celebration, or book club — using the method we teach in full Revivery Instructor Training.",
  url: "https://revivery.co/host",

  // The two URLs that live outside this app
  parentSite: "https://revivery.com",
  ritUrl: "https://revivery.co/instructor-training",

  // Contact
  replyTo: "learn@revivery.co",

  // Default CTAs
  cta: {
    primary: "Start the course — free",
    primaryShort: "Start the course",
    secondary: "See what's inside",
  },

  // Email-capture cookie name. Toggling this to "logged-in" state happens client-side
  // after the /api/subscribe route succeeds.
  cookieName: "sh_unlocked",
  cookieDays: 365,
};

export const themes = [
  {
    id: "womens-circle",
    name: "Women's Circle",
    tagline: "The girls' night you've been meaning to host.",
    description:
      "4–6 women. Intentional conversation. The gathering you wish existed.",
    image: "/images/sauna-meditation-group.jpg",
    imageAlt: "A group of women in a guided sauna circle",
  },
  {
    id: "mens-gathering",
    name: "Men's Gathering",
    tagline: "Depth without the workshop.",
    description:
      "4–6 men. Honesty without the therapist in the room. What men's retreats gesture at but rarely deliver.",
    image: "/images/plunge-group.jpg",
    imageAlt: "Men gathered around the cold plunge",
  },
  {
    id: "milestone",
    name: "Milestone Celebration",
    tagline: "Birthdays and thresholds done differently.",
    description:
      "4–8 people. A birthday, a bachelorette, an anniversary, a big transition — marked in a way people remember.",
    image: "/images/events-connection.jpg",
    imageAlt: "A celebratory moment at Revivery",
  },
  {
    id: "book-club",
    name: "Book Club",
    tagline: "Where the book becomes the excuse.",
    description:
      "4–6 people. The gathering where the contrast therapy is what gets the conversation past plot summary.",
    image: "/images/cohort-briefing.jpg",
    imageAlt: "A small group gathered in conversation at Revivery",
  },
];

export const faq = [
  {
    q: "Is this really free?",
    a: "Yes. The full 5-day course and the 24-page companion workbook are free. We built it as a sampler of our full instructor training — some of you will want more; most won't. Either way, the course is yours to keep.",
  },
  {
    q: "What do I need to take the course?",
    a: "An email address. That's it for the course itself. To host your first gathering, you'll need access to a sauna and ideally a cold plunge — at home, at a studio, or at a friend's.",
  },
  {
    q: "What if I don't have a cold plunge?",
    a: "Most of the course works beautifully with sauna only. A cold shower or an ice bath tub works as a substitute for most of the integration teaching.",
  },
  {
    q: "Do I need to be a wellness instructor or have training?",
    a: "No. The course is specifically for non-professionals. If you already have training or are a certified instructor, you might want to look at our full Revivery Instructor Training — but this mini course is a great sample of how we teach.",
  },
  {
    q: "How long does it take?",
    a: "Each daily lesson is 3 minutes to read. The workbook takes about 20 minutes to fill in across the 5 days. Plan 30 minutes per day for the invitation script, your prompt, and your flow — about 2 hours of total prep for your first gathering.",
  },
  {
    q: "Will you pitch me something at the end?",
    a: "We'll introduce our full instructor training in one email after the course ends. If it's not for you, ignore it. You'll stay on our host list and hear from us about once a month — one real teaching per month, not a sales stream.",
  },
];
