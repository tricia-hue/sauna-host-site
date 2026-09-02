/**
 * Theme landing pages for The Sauna Host.
 *
 * Each of the five gathering themes gets its own public, indexable page at
 * /host/<slug>. These exist for two reasons:
 *
 *   1. SEO — the site's only ranking query today is "sauna host" (brand).
 *      These pages target the long-tail intersection people actually search:
 *      "sauna date night", "sauna book club", "sauna girls night".
 *   2. Pinterest — the occasion pins (date night, book club) get the most
 *      reach on the account. They now have somewhere to land that asks for
 *      the email, instead of the homepage or a gated lesson.
 *
 * TEASER-THEN-GATE. What is public: the intro, why it works, the full
 * 90-minute flow, three of the ten prompts, and the playlist. What stays
 * behind the email gate: the invitation script, all ten prompts, the
 * post-gathering text, the 5-day course, and the 26-page workbook.
 *
 * Flow, prompts, and playlists are lifted from WORKBOOK_BRIEF.md pages 5-9
 * so the page and the workbook never drift apart.
 */

export type FlowStep = {
  time: string;
  label: string;
};

export type HostTheme = {
  slug: string;
  /** Matches the id in lib/config.ts themes[] so the two stay linked. */
  configId: string;
  name: string;
  h1: string;
  tagline: string;
  seoTitle: string;
  seoDescription: string;
  groupSize: string;
  duration: string;
  breathPattern: string;
  /** Public. Opening paragraphs — the problem this gathering solves. */
  intro: string[];
  /** Public. Why contrast therapy changes this specific gathering. */
  why: string[];
  /** Public. The full 90-minute flow. */
  flow: FlowStep[];
  /** Public. Three of the ten prompts. */
  previewPrompts: string[];
  promptCount: number;
  /** Public. */
  playlist: string;
  image: string;
  imageAlt: string;
};

export const hostThemes: HostTheme[] = [
  {
    slug: "sauna-date-night",
    configId: "couples",
    name: "Date Night",
    h1: "Sauna Date Night",
    tagline: "Date night, reimagined.",
    seoTitle: "Sauna Date Night: A 90-Minute Plan for Two Couples",
    seoDescription:
      "Date night, reimagined around heat and cold. The full 90-minute sauna and cold plunge flow, conversation prompts, and playlist for a gathering with your partner and one other couple.",
    groupSize: "2-3 couples",
    duration: "90 minutes",
    breathPattern: "4-7-8 breathing",
    intro: [
      "Dinner and drinks has a ceiling, and most couples have hit it. The same restaurant, the same four topics, home by nine having seen people without really seeing them.",
      "A sauna date night has a different shape. Heat makes small talk hard to sustain. Cold makes everyone honest. Ninety minutes later you've had the kind of conversation with your partner, and with the other couple, that usually takes a weekend away to reach.",
      "Two or three couples, one sauna, one cold plunge, and a structure that does the work so you can be present instead of hosting.",
    ],
    why: [
      "Contrast therapy does something to a room a dinner table can't. The heat forces presence, because you can't scroll and you can't hide. Then the cold drops the social mask for about sixty seconds, and if there's a good question waiting in that window, you get an answer nobody planned.",
      "For couples that matters twice over. You get the honesty, and you get it together. A shared hard thing is the oldest bonding mechanism there is, and the plunge is the part couples tell us they talk about for weeks afterward: helping each other in, the look across the water, the laugh on the other side.",
    ],
    flow: [
      { time: "00:00", label: "Arrival and container (10 min)" },
      { time: "00:10", label: "Sauna round 1 + 4-7-8 breath + prompts 1-3 (25 min)" },
      { time: "00:35", label: "Plunge, partners help each other in, + integration (5 min)" },
      { time: "00:40", label: "Sauna round 2 + prompts 4-7 (25 min)" },
      { time: "01:05", label: "Plunge + integration (5 min)" },
      { time: "01:10", label: "Close (10 min)" },
    ],
    previewPrompts: [
      "What was the last thing your partner did that surprised you?",
      "Where does your partner make you braver?",
      "What's a ritual you want to start together?",
    ],
    promptCount: 10,
    playlist: "Khruangbin, Men I Trust, Nick Drake, Beach House. Warm, intimate, slow.",
    image: "/images/couples.jpg",
    imageAlt:
      "A couple moving together between the sauna and cold plunge at Revivery",
  },

  {
    slug: "sauna-book-club",
    configId: "book-club",
    name: "Book Club",
    h1: "Sauna Book Club",
    tagline: "Where the book becomes the excuse.",
    seoTitle: "Sauna Book Club: How to Host One",
    seoDescription:
      "Book club, but in the sauna. The 90-minute flow, discussion prompts that get past plot summary, and the playlist. A book club idea for people tired of twenty minutes on the book and an hour of wine.",
    groupSize: "4-6 people",
    duration: "90 minutes",
    breathPattern: "Box breathing",
    intro: [
      "Every book club has the same problem. Twenty minutes on the book, then wine and catching up, and everyone drives home a little disappointed in a way nobody says out loud.",
      "The book was never really the point. It was the excuse to get six people in a room. The trouble is that a living room doesn't ask anything of anyone, so the conversation stays where it's comfortable.",
      "Move it to the sauna and the conversation moves with it.",
    ],
    why: [
      "Heat is a great leveller for a discussion. Nobody's checking a phone, nobody's refilling anything, and the person who usually talks most is exactly as uncomfortable as everyone else. You get shorter sentences and more honest ones.",
      "The plunge between rounds does the real work. Coming out of cold water people answer differently, less considered and more true. Ask what did you resist agreeing with in that window and you'll get the actual answer instead of the book club answer.",
    ],
    flow: [
      { time: "00:00", label: "Arrival and container (10 min)" },
      { time: "00:10", label: "Sauna round 1 + box breath + prompts 1-2 (25 min)" },
      { time: "00:35", label: "Plunge + integration (5 min)" },
      { time: "00:40", label: "Sauna round 2 + prompts 3-6 (30 min)" },
      { time: "01:10", label: "Plunge + integration (5 min)" },
      { time: "01:15", label: "Close (15 min)" },
    ],
    previewPrompts: [
      "What's the line from the book you've been thinking about since you closed it?",
      "What did you resist agreeing with?",
      "Who else in your life needs to read this?",
    ],
    promptCount: 10,
    playlist:
      "Max Richter, quiet Sufjan Stevens, rain recordings. Keep it low. The book is the star.",
    image: "/images/cohort-briefing.jpg",
    imageAlt: "A small group gathered in conversation at Revivery",
  },

  {
    slug: "sauna-girls-night",
    configId: "womens-circle",
    name: "Girls' Night",
    h1: "Sauna Girls' Night",
    tagline: "The girls' night you've been meaning to host.",
    seoTitle: "Sauna Girls' Night: The Gathering You've Been Meaning to Host",
    seoDescription:
      "A girls' night with more in it than wine. The 90-minute sauna and cold plunge flow, conversation prompts, and playlist for four to six women. Home by ten.",
    groupSize: "4-6 women",
    duration: "90 minutes",
    breathPattern: "4-7-8 breathing",
    intro: [
      "You've been meaning to do this for a year. The group text exists. Somebody suggests drinks, three people can't make it, and it quietly dies again.",
      "Here's what we've found: people will move mountains for a gathering that sounds like something, and won't cross town for one that sounds like nothing. Drinks is nothing. Sauna, cold plunge, six of us, real conversation, home by ten is something.",
      "Four to six women, ninety minutes. This is the plan.",
    ],
    why: [
      "Most women's gatherings run on wine and catching up, which is lovely and stays on the surface. The reason isn't the people. It's that nothing in the room asks for more.",
      "Contrast therapy asks. The heat makes performing exhausting, so people stop. The cold plunge is a hard thing you do together, and doing hard things together is what turns a group of friends into a group that actually knows each other. The ten minutes after the first plunge is where the real conversation starts, every time.",
    ],
    flow: [
      { time: "00:00", label: "Arrival and container (10 min)" },
      { time: "00:10", label: "Sauna round 1 + 4-7-8 breath (20 min)" },
      { time: "00:30", label: "Plunge + integration (5 min)" },
      { time: "00:35", label: "Sauna round 2 + prompts 1-3 (25 min)" },
      { time: "01:00", label: "Plunge + integration (5 min)" },
      { time: "01:05", label: "Close and landing (15 min)" },
    ],
    previewPrompts: [
      "What's something you've been carrying alone that you'd like to put down tonight?",
      "What are you tired of being polite about?",
      "What's the thing you're celebrating that nobody else knows yet?",
    ],
    promptCount: 10,
    playlist:
      "Nils Frahm, Olafur Arnalds, Agnes Obel, the quieter Bon Iver. Slow and spacious only.",
    image: "/images/sauna-meditation-group.jpg",
    imageAlt: "A group of women in a guided sauna circle",
  },

  {
    slug: "sauna-mens-night",
    configId: "mens-gathering",
    name: "Men's Night",
    h1: "Sauna Men's Night",
    tagline: "Depth without the workshop.",
    seoTitle: "Men's Night in the Sauna: Depth Without the Workshop",
    seoDescription:
      "Four to six men, a sauna, a cold plunge, and ninety minutes. The full flow, the conversation prompts, and the playlist. No facilitator, no sharing circle, no agenda.",
    groupSize: "4-6 men",
    duration: "90 minutes",
    breathPattern: "Box breathing",
    intro: [
      "Most men's gatherings are one of two things. A bar, where nothing gets said. Or a retreat, where too much gets said too fast by a stranger holding a talking stick.",
      "There's a version in between, and it's the one most men actually want. A few guys, something physically hard, and a couple of questions worth answering. No facilitator. No sharing circle. Just the sauna, the cold, and enough structure that the conversation goes somewhere.",
      "Four to six men, ninety minutes, home by ten.",
    ],
    why: [
      "Men tend to talk sideways. Shoulder to shoulder, doing something, is where it happens. The car, the workshop, the walk. Face to face across a table is where it doesn't.",
      "A sauna is shoulder to shoulder by design. Add the plunge, which is a genuinely hard thing done together, and you've built the two conditions men's honesty usually needs. The prompts do the rest, one question at a time, everyone answers, nobody performs. It's why guys who'd never sign up for a men's retreat come back to this one.",
    ],
    flow: [
      { time: "00:00", label: "Arrival and container (10 min)" },
      { time: "00:10", label: "Sauna round 1 + box breath (20 min)" },
      { time: "00:30", label: "Plunge + integration (5 min)" },
      { time: "00:35", label: "Sauna round 2 + prompts 1-3 (25 min)" },
      { time: "01:00", label: "Plunge + integration (5 min)" },
      { time: "01:05", label: "Close and landing (15 min)" },
    ],
    previewPrompts: [
      "What's something you've been grinding on that you haven't told anyone about?",
      "What's an identity you're ready to let go of?",
      "Where are you performing for people who aren't in this room?",
    ],
    promptCount: 10,
    playlist:
      "Emancipator, Tycho, ambient Bonobo, RY X. Nothing with lyrics during the breath rounds.",
    image: "/images/plunge-group.jpg",
    imageAlt: "Men gathered around the cold plunge",
  },

  {
    slug: "sauna-birthday",
    configId: "milestone",
    name: "Milestone",
    h1: "A Sauna Birthday",
    tagline: "Birthdays and thresholds, done differently.",
    seoTitle: "Sauna Birthday Party: Marking a Milestone Differently",
    seoDescription:
      "A birthday, bachelorette, anniversary, or big threshold hosted in the sauna. The 90-minute flow, ten prompts for the group, and the close that makes the night land.",
    groupSize: "4-8 people",
    duration: "90 minutes",
    breathPattern: "Box breathing",
    intro: [
      "Somebody's turning forty. Or leaving a job, getting married, finishing something that took years. And the default is a dinner where everyone asks so how does it feel and nobody says anything real.",
      "Milestones deserve a container. Not a speech, a structure, where eight people get to say the thing they'd never say across a table.",
      "A birthday, a bachelorette, an anniversary, or a threshold, hosted in ninety minutes.",
    ],
    why: [
      "There's an old idea that a life change needs witnesses. Not an audience, witnesses. People who saw it and said so out loud.",
      "Modern celebrations lost that. We sing, we eat, we go home. This gathering puts it back. Everyone in the room answers one question about the person, in a setting where the heat and the cold have already made honesty easier than performance. The person of honour hears eight true things about themselves in one night. That's the whole gift.",
    ],
    flow: [
      { time: "00:00", label: "Arrival and container (10 min)" },
      { time: "00:10", label: "Sauna round 1 + box breath + toast (25 min)" },
      { time: "00:35", label: "Plunge + integration (5 min)" },
      { time: "00:40", label: "Sauna round 2 + prompts 1-4 (25 min)" },
      { time: "01:05", label: "Plunge + integration (5 min)" },
      { time: "01:10", label: "Close and blessing (10 min)" },
    ],
    previewPrompts: [
      "What's one thing you're grateful this person did for you?",
      "What have they survived that they don't give themselves credit for?",
      "What's your one-sentence blessing for them?",
    ],
    promptCount: 10,
    playlist:
      "Hermanos Gutierrez, mellow Khruangbin, Daniel Caesar, with one celebratory track saved for the close.",
    image: "/images/events-connection.jpg",
    imageAlt: "A celebratory moment at Revivery",
  },
];

export const getHostTheme = (slug: string): HostTheme | undefined =>
  hostThemes.find((t) => t.slug === slug);

/** Bridges lib/config.ts themes[] (by id) to their /host page. */
export const getHostThemeByConfigId = (
  configId: string
): HostTheme | undefined => hostThemes.find((t) => t.configId === configId);
