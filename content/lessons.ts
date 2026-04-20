/**
 * Lesson content for The Sauna Host.
 * Each lesson's full teaching is stored here as a TSX-friendly data object.
 * Content lifted directly from 02_Mini_Course_Curriculum.md
 * and adapted for web rendering.
 */

export type Lesson = {
  day: number;
  slug: string;
  title: string;
  headline: string;
  subhead: string;
  openReadingLine: string; // one-liner shown on the landing page curriculum
  practicePrompt: string;
  practiceInstruction: string;
  workbookPageRef: string;
  safetyNote?: string;
  invitationToNext: string;
  gated: boolean;
  body: string[]; // each item is a paragraph or an h3 block; see rendering logic
};

export const lessons: Lesson[] = [
  {
    day: 1,
    slug: "lesson-1",
    title: "Why We Gather",
    headline: "Why We Gather",
    subhead: "Why connection is the real medicine — and why we've forgotten how.",
    openReadingLine:
      "Why connection is the real medicine, and why you've been doing this alone.",
    practicePrompt: "Name your people. Then tell one.",
    practiceInstruction:
      "Think of the 4–8 people you've been meaning to see — the ones who would show up if you sent them an invitation that said, \"Come do this thing with me.\" Write their names down. Then pick one, and text them today. Something like: \"I'm working on hosting a small gathering in the next few weeks. Would you want to be one of the people I plan it around?\" That's it. No date. No details. Just a soft commitment — yours and theirs. The rest of this course gets much easier once someone else knows you're doing it.",
    workbookPageRef: "Page 1 — Your Gathering Starts With People",
    invitationToNext:
      "Tomorrow we'll teach you how to set the container — how to open a gathering so people actually show up to it, not just to the schedule.",
    gated: false,
    body: [
      "There's a reason you were drawn to this course.",
      "Maybe it's the sauna at your house. Maybe it's the cold plunge you bought in January and have been using alone ever since. Maybe it's a studio down the street, or a friend with a backyard setup. You know there's something more you could be doing with it. You just don't know what that is.",
      "Here's the short version. Contrast therapy — the sauna and the cold plunge together — is one of the most ancient and well-studied wellness practices we have. The science is real. The heat changes your cardiovascular system. The cold changes your nervous system. Together they build what researchers call \"stress resilience\" — the capacity to meet hard moments without falling apart.",
      "But that's not the whole story. Because if it were just about the physiology, you could do this alone forever. And you probably have.",
      "What the science keeps circling back to is this: the people who experience the deepest change from contrast therapy aren't the ones with the best protocols. They're the ones who do it **with other people**. The sauna and the cold are the capsule. **Connection is the medicine**.",
      "That's a big claim. Here's why we believe it.",
      "When you sit in heat with another person, your body moves into a state that's almost impossible to fake. You can't hide when you're sweating. You can't scroll. You can't check out. The heat forces presence. Then the cold forces honesty — because when your body is shocked, your social performance drops. What's left is the actual you.",
      "And the actual you, sitting across from the actual them, for ten quiet minutes — that's what people don't know they're hungry for.",
      "This course is about how to host that. Not a party. Not a workout. A **gathering**. A specific, intentional, beautifully simple thing that turns your sauna and cold plunge into the container for the kind of conversation your friends will call you about months later.",
      "### What's coming",
      "Over the next four days, I'll give you the four things that separate a gathering your friends remember from one that fizzles out at the first sauna round. None of these can be figured out from vibes — there's a reason the leads at Revivery train for months before they run a session. I've distilled what actually matters.",
      "**Tomorrow — Lesson 2:** The four-sentence arrival script that sets emotional safety in 90 seconds. Most hosts get the first 90 seconds wrong in ways they can't diagnose. We'll fix that.",
      "**Day 3:** Two breathwork patterns any group can do together, even when nobody in the room has tried breathwork before. No woo. Just rhythm.",
      "**Day 4:** What to actually say in the twelve seconds before the cold — the difference between your guests bailing on the plunge and your guests becoming the reason everyone comes back.",
      "**Day 5:** Five complete gathering plans — women's circle, men's gathering, milestone, book club, or couples night. You pick one. You walk away with the invitation script, the 90-minute flow, the ten conversation prompts for your theme, the playlist, and the group text to send afterward.",
      "By Friday, you'll have everything you need to pick a date in the next two to four weeks and host the gathering. Not someday. Soon.",
      "One day at a time. Starting now.",
    ],
  },
  {
    day: 2,
    slug: "lesson-2",
    title: "Setting the Container",
    headline: "The first 90 seconds",
    subhead: "The move that decides whether the room relaxes or performs.",
    openReadingLine:
      "The four-sentence arrival script that sets emotional safety in 90 seconds.",
    practicePrompt: "Write your arrival script.",
    practiceInstruction:
      'Four sentences, no more. Use this template: "I\'m so glad you\'re here. Tonight we\'re going to [what]. It\'ll take about [how long]. While we\'re in here, let\'s agree that [the agreement]." Read it out loud. See how it lands in your body.',
    workbookPageRef: "Page 2 — Setting the Container",
    invitationToNext:
      "Tomorrow we step into the sauna. I'll teach you two breathwork patterns any group can do together — even if none of them have ever tried breathwork before.",
    gated: true,
    body: [
      "Here's what almost every gathering you've been to gets wrong.",
      "It starts with, \"Hey, thanks for coming — grab a drink, help yourself.\" That's the whole opening. Everyone stands around holding something, waiting for the real moment to begin. And it never quite does.",
      "That opening is fine for a party. It's not what we're doing.",
      "When a trained lead opens a session at Revivery, the first 90 seconds have more structure than most weddings. Not in a stiff way — you'd never notice as a guest. But the lead is doing three very specific things.",
      "**One: they name what's about to happen.** They say something like, \"We're going to do two sauna rounds, a plunge between them, and end with a conversation.\" It sounds simple. It's everything. You relax as a guest because you know what you're in for.",
      "**Two: they name the shape of the time.** \"This will take about 90 minutes. You're welcome to leave early if you need to, and there's no right way to do any of this.\" You relax because the clock isn't ambiguous.",
      "**Three: they name the agreement.** \"What we say in here stays in here. Phones go in the basket by the door. There's no performance and no small talk — that's the point of being here.\" You relax because the rules are different from real life, and someone is holding them.",
      "Those three moves — what, how long, and the agreement — are what we call **setting the container**. Everything good that happens in a gathering happens because someone took 90 seconds to build it.",
      "The container is what makes it safe for people to actually show up. Not to perform. Not to make jokes. Not to ask where you got your tile from. To actually be there.",
      "Here's the counterintuitive part: when you set the container, people don't feel restricted. They feel *free*. Because most social life is made of hidden agreements nobody agreed to. When you make the agreement visible and simple, people exhale.",
      "Your job as the host isn't to entertain. It's to hold the edges of the experience so everyone inside of them can let go.",
    ],
  },
  {
    day: 3,
    slug: "lesson-3",
    title: "Heat and Breath",
    headline: "Breath is how you lead a room",
    subhead: "Two patterns any host can teach — even with guests who've never tried breathwork.",
    openReadingLine:
      "Two breathwork patterns any host can lead — even with guests who've never tried breathwork.",
    practicePrompt: "Try 4-7-8 breathing right now.",
    practiceInstruction:
      "Alone. Four cycles. See what happens in your body. Then practice counting it out loud in a mirror or on a voice memo. You want to be able to lead it without hesitating. The confidence of your voice is the permission the room needs to follow you.",
    workbookPageRef: "Page 3 — Two Breathwork Patterns",
    safetyNote:
      "Extended breath holds are not for everyone. If you're pregnant, have a seizure disorder, or have low blood pressure, skip the holds and just breathe gently.",
    invitationToNext:
      "Tomorrow we step into the cold. And I'll teach you the single most important thing to do in the minute after everyone gets out of the plunge — the move most people skip because they don't know what it is.",
    gated: true,
    body: [
      "Okay. The container is set, the phones are in the basket, you're in the sauna together. Now what?",
      "This is where most home sauna gatherings fall apart. People get quiet because they don't know what they're supposed to do. Or someone fills the silence with chatter. Or everyone looks at their towel.",
      "Here's what we do instead. For the first round of heat, we breathe together.",
      "Not in a weird way. Not in a way that demands anyone knows what they're doing. We give the group a simple pattern, we lead it with our own breath, and we do it together. Three to five minutes. That's it.",
      "This move is the single highest-leverage thing you can do in a gathering. Here's why.",
      "When a group of people breathes in the same pattern, their nervous systems start to synchronize. It's called **co-regulation** and it's not metaphor — it's measurable. Heart rate variability converges. Cortisol drops. And more importantly for you as the host, the awkwardness evaporates. People stop performing because breathing is not a performance.",
      "You don't need to be a breathwork instructor to lead this. You just need to pick a pattern, count it out loud once or twice, and then go silent while everyone does it with you.",
      "### The two patterns any group can do together",
      "**Box breathing (the calm one)** — Breathe in for 4. Hold for 4. Breathe out for 4. Hold for 4. Repeat for 3–5 minutes. This one is for book clubs, milestone gatherings, anything where the energy should stay grounded.",
      "**4-7-8 breathing (the settling one)** — Breathe in through the nose for 4. Hold for 7. Breathe out through the mouth for 8. Repeat for 4–6 cycles. This one is for women's circles, men's gatherings — anywhere you want people to drop below the surface fast.",
      "For both patterns, you lead the first three rounds out loud by counting. Then you say, \"We'll do this on our own for another two minutes.\" And you shut up. That silence is where the gathering shifts.",
      "### What happens when you do this",
      "The room gets quieter. The sauna gets more tolerable (breath is how you survive heat). People's faces soften. Someone closes their eyes. The whole thing stops feeling like a hangout and starts feeling like a practice. Which is what it is.",
    ],
  },
  {
    day: 4,
    slug: "lesson-4",
    title: "Ice and Integration",
    headline: "The 90 seconds that matter most",
    subhead: "What happens after the plunge is the whole point.",
    openReadingLine:
      "The three-step move in the 60 seconds after the plunge — the part almost every host misses.",
    practicePrompt: "Find a moment today that feels a little hard.",
    practiceInstruction:
      "A cold shower. A hard workout. A difficult conversation. When it ends, pause for 90 seconds before reaching for your phone. Breath. Body scan. One word for what you felt. That's the practice. This is a sauna gathering skill, but it's also a life skill.",
    workbookPageRef: "Page 4 — Integration Prompts",
    safetyNote:
      "Cold plunging isn't for everyone. If you have heart conditions, uncontrolled blood pressure, or are pregnant, please check with your doctor first.",
    invitationToNext:
      "Tomorrow is Day 5. You pick your theme — women's circle, men's gathering, milestone, or book club — and I'll hand you the complete plan for your first gathering.",
    gated: true,
    body: [
      "The cold plunge gets all the attention. The plunge is not the point.",
      "The point is what happens in the 60 seconds after.",
      "Here's what your guests don't know. They're about to have a physiological experience they've never had in company. Getting into cold water with other people is vulnerable in a way that no other wellness practice is. The body reacts. The breath catches. The ego falls over. For a minute afterward, they are not the curated version of themselves they walked in as. They are just people.",
      "Most home gatherings miss this moment completely. Everyone climbs out, reaches for a towel, says \"whoooo that was cold,\" and the moment closes.",
      "We do something different. We stay with it.",
      "### The three-step integration",
      "**Step 1: The breath land (30 seconds)** — After everyone is out of the plunge, the host says one sentence. Usually: \"Let's take a minute together to let our breath come back.\" Then everyone stands or sits still, towels around shoulders, breathing. You do not talk. You do not fill. You just breathe.",
      "**Step 2: The body scan (30 seconds)** — You say, slowly: \"Notice what's happening in your hands. Notice your chest. Notice what your face is doing.\" That's it. You're pointing the group's attention inward instead of outward. Most people will close their eyes without being asked.",
      "**Step 3: The anchor question (one answer each)** — Then you ask one question. Something small. Something simple. Something that earns its place in the silence you've just created. Examples: *What's one word for what you just felt? What's one thing you're noticing right now? What's one thing you're grateful your body can do?* Each person answers. One word or one sentence. Then you move back toward the sauna for round two.",
      "That's integration. It takes 90 seconds. It is why people will talk about your gathering for three weeks.",
      "### Why this works",
      "The physiological shock of cold water briefly takes people out of their social mask. If you introduce a prompt in that window, you get an honesty you cannot engineer any other way. This is not manipulation. It's the opposite — it's respect for the window that the cold just opened.",
      "If you skip integration, the window closes and you lose the gift of the cold. If you honor it, the cold does exactly what it's supposed to do: it opens the room.",
    ],
  },
  {
    day: 5,
    slug: "lesson-5",
    title: "The Close and The Choice",
    headline: "Pick your theme",
    subhead: "Your first gathering, planned today.",
    openReadingLine:
      "Pick your theme — women's circle, men's gathering, milestone, book club, or couples night — and walk away with a full 90-minute plan.",
    practicePrompt: "Text one person today.",
    practiceInstruction:
      "Text one person right now — today — and tell them you want to host a gathering. Don't wait until you feel ready. You'll feel more ready after you've told one person out loud.",
    workbookPageRef: "Pages 5–9 — Your Five Themes",
    invitationToNext:
      "You have everything you need. Host your first gathering. Then come back and tell me how it went — I read every email. In a few days, I'll send you one more thing — the real secret behind what makes this work.",
    gated: true,
    body: [
      "Congratulations — you've made it to Day 5.",
      "Today I'm going to give you three things: the final move in a Revivery gathering (the close), a decision to make about your first gathering, and the plan to host it.",
      "### The close",
      "Every Revivery session ends the same way, whether it's a private session or a full circle. We call it **landing**.",
      "After the second sauna round, after the second plunge, after the body has done what it came to do — we gather one more time for five or ten minutes and we close.",
      "A close is not a summary. It's not a debrief. It's a moment where everyone who was in the room has the chance to say one thing, if they want to.",
      "Here's the script:",
      "> \"Before we head back into the world, let's take a minute to close together. I'd love to go around and hear one thing from each of you — anything you're taking with you from tonight. One word, one sentence, one thought. If you'd rather pass, just say 'pass.' I'll go first.\"",
      "Then you go first. You model what a short, honest answer sounds like. You say, \"I'm taking with me how quiet this room got in the cold.\" Or, \"I'm taking with me the way Sarah laughed.\" Or, \"I'm just grateful you all showed up.\"",
      "Then the next person. Then the next. You don't respond after each one. You just hold the space and let it go around the circle. Nobody has to make it profound. Small things are allowed.",
      "When it's done, you say, \"Thank you for being here tonight.\" That's it. Gathering complete.",
      "### The choice",
      "Now, pick your first theme. Not someday. For the next 2–4 weeks. The one that gives you butterflies and a little bit of \"oh no\" is usually the right one.",
      "**Women's Circle / Girls' Night** — 4–6 women, intentional conversation, the gathering you wish existed.",
      "**Men's Gathering** — 4–6 men, depth without agenda, what men's retreats gesture at but rarely deliver.",
      "**Milestone Celebration** — a birthday, bachelorette, anniversary, or big threshold done differently.",
      "**Book Club** — the gathering where the book becomes the excuse to finally talk about what actually matters.",
      "**Couples Night** — 2–3 couples, date night reimagined — the together-practice that rebuilds presence and gives relationships a shared ritual.",
      "Inside your workbook, Day 5's pages are five full gathering plans — one per theme. Pick yours today.",
      "Each plan includes the invitation script (what to text your people), the flow (timings for arrival, sauna round 1, plunge, integration, sauna round 2, close), 10 conversation prompts designed for that theme, the playlist suggestion, and the \"what to text the group afterward\" script.",
      "### What to do next",
      "Pick a date in the next 2–4 weeks. Text your list of people today. Use the invitation script from your chosen theme's workbook page.",
      "That's it. You have the whole method.",
    ],
  },
];

export const getLesson = (slug: string): Lesson | undefined =>
  lessons.find((l) => l.slug === slug);

export const openLessons = lessons.filter((l) => !l.gated);
export const gatedLessons = lessons.filter((l) => l.gated);
