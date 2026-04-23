# The Sauna Host — 5-Day Mini Course Emails

Ready-to-paste email copy for the automated drip that new subscribers receive after signing up at thesaunahost.com.

- **6 emails total:** Day 0 welcome + 5 daily lessons (Days 1–5)
- **Full lesson content in every email** (so subscribers can read in the inbox without clicking through)
- **Tone:** Tricia's voice, warm + direct, following the Revivery brand guide
- **Trigger (Brevo):** Contact is added to the "The Sauna Host" list by `/api/subscribe`. Build the automation with entry condition *"Contact added to list → The Sauna Host"*.

> ⚠️ **Heads up:** This doc was originally written for Mailchimp's Customer Journey builder.
> As of 2026-04-23 the ESP is being swapped to Brevo, so the step-by-step below (Customer
> Journeys, Inbox Preview, etc.) will be rewritten for Brevo's Automations builder. The
> email **copy itself** (Parts 2+) is ESP-agnostic and can be used as-is. Until the rewrite,
> use this mapping:
>
> | Mailchimp term | Brevo equivalent |
> |----------------|------------------|
> | Audience | List |
> | Tag | Contact attribute (e.g. `SOURCE`) or a separate list |
> | Customer Journey | Automation |
> | "Inbox Preview" (Content → Preview) | "Inbox rendering" (part of Brevo's email editor preview) |
> | "Verify a sending domain" (Settings → Domains) | "Senders, Domains & Dedicated IPs → Domains" |
> | Merge tag `*|FNAME|*` | `{{ contact.FIRSTNAME }}` |

---

## Part 1 — Mailchimp Customer Journey Setup

Mailchimp's "Customer Journeys" is the modern replacement for Classic Automations. Build it like this.

### Step-by-step

1. **Mailchimp → Automations → Customer Journeys → Create a journey → Start from scratch**
2. **Name it:** `The Sauna Host — 5-day mini course`
3. **Audience:** The Sauna Host
4. **Starting point:** *Tag Added* → tag = `sauna-host-course`
5. **Add steps** in this order (each "Delay" is a separate step between emails):

   | Order | Step type | Setting | What it sends |
   |-------|-----------|---------|---------------|
   | 1 | **Send email** | "Day 0 — Welcome" | Email 0 below |
   | 2 | **Delay** | 1 day | — |
   | 3 | **Send email** | "Day 1 — Why we gather" | Email 1 below |
   | 4 | **Delay** | 1 day | — |
   | 5 | **Send email** | "Day 2 — The first 90 seconds" | Email 2 below |
   | 6 | **Delay** | 1 day | — |
   | 7 | **Send email** | "Day 3 — Breath is how you lead" | Email 3 below |
   | 8 | **Delay** | 1 day | — |
   | 9 | **Send email** | "Day 4 — After the plunge" | Email 4 below |
   | 10 | **Delay** | 1 day | — |
   | 11 | **Send email** | "Day 5 — Pick your theme" | Email 5 below |

6. **For each email:** set From Name `Tricia at Revivery`, From Email `learn@revivery.co` (or whatever sending address you've verified), and paste subject, preview text, and body from the sections below.
7. **Review & Start journey.**

### Things to set up once, before you start the journey

- **Verify a sending domain.** Mailchimp → Settings → Domains. Verify `revivery.co` so emails come from you, not `mailchimpapp.com`. This is the single biggest deliverability win.
- **Send a test** of each email to yourself and one teammate before turning on the journey.
- **Spam-check** each draft using Mailchimp's built-in Inbox Preview (Content → Preview → Inbox).

---

## Part 2 — The Six Emails

### Merge tags used throughout

- `*|FNAME|*` — subscriber's first name
- `*|IF:FNAME|*Hi *|FNAME|*,*|ELSE:|*Hi there,*|END:IF|*` — graceful fallback when first name is blank

### Global design notes for every email

- **Headline font:** ABC Arizona Sans, all caps, +250 kerning (per brand guide)
- **Body font:** ABC Arizona Sans regular (or email-safe fallback: Helvetica, Arial)
- **Palette:** Peach on Blue Black feels most on-brand for this audience. Keep accent elements in Gold.
- **Width:** 600px max (standard email)
- **Single-column layout.** No sidebars, no multi-column.
- **Bold should be real bold**, not markdown `**`. When you paste, use Mailchimp's bold button (or the HTML conversion prompt below).
- **Every email footer:** Revivery physical address + unsubscribe link (Mailchimp inserts automatically).

---

## Email 0 — Day 0 Welcome

**Send:** Immediately on tag add.

**Subject line:**
```
Welcome to The Sauna Host — here's what's coming
```

**Preview text (preheader):**
```
Your first lesson arrives in 24 hours. Plus the workbook to download now.
```

**Body:**

```
*|IF:FNAME|*Hi *|FNAME|*,*|ELSE:|*Hi there,*|END:IF|*

You're in.

Over the next five days, I'll teach you how to turn your sauna and cold plunge into the container for the kind of gathering your friends call you about weeks later.

Not a party. Not a workout. A gathering. A specific, intentional, beautifully simple thing that's older than most of the wellness industry and rarely taught.

Here's what to expect.

**Day 1 (tomorrow):** Why we gather — and why connection is the real medicine.

**Day 2:** The four-sentence arrival script that sets emotional safety in 90 seconds.

**Day 3:** Two breathwork patterns any host can lead, even with guests who've never tried breathwork.

**Day 4:** The three-step move in the 60 seconds after the plunge — the part almost everyone misses.

**Day 5:** Five complete gathering plans. You pick one. You walk away with the invitation script, the 90-minute flow, ten conversation prompts, the playlist, and the group text.

Each lesson takes about five minutes to read. By Friday, you'll have everything you need to pick a date in the next two to four weeks and host.

A few things before we start.

**Your workbook.** → https://thesaunahost.com/workbook — five pages you can print or keep on your phone. You'll want it by Day 2.

**Reply to any email.** I read every one. If something lands, or doesn't, or brings up a question, tell me. The course is better because the people who've taken it push back on it.

**This is a practice, not a performance.** If you've never hosted anything, that's fine. If you've hosted a thousand things, that's fine too. You don't need to feel ready to start. You'll feel more ready after the first gathering than you do right now.

Day 1 lands in 24 hours.

— Tricia
Founder, Revivery

P.S. If you know someone who should take this course too, forward this email. That's how The Sauna Host spreads.
```

---

## Email 1 — Day 1: Why we gather

**Send:** 24 hours after Email 0.

**Subject line:**
```
Day 1 — Why we gather
```

**Preview text:**
```
Connection is the real medicine. Here's why we believe it.
```

**Body:**

```
*|IF:FNAME|*Hi *|FNAME|*,*|ELSE:|*Hi there,*|END:IF|*

There's a reason you were drawn to this course.

Maybe it's the sauna at your house. Maybe it's the cold plunge you bought in January and have been using alone ever since. Maybe it's a studio down the street, or a friend with a backyard setup. You know there's something more you could be doing with it. You just don't know what that is.

Here's the short version. Contrast therapy — the sauna and the cold plunge together — is one of the most ancient and well-studied wellness practices we have. The science is real. The heat changes your cardiovascular system. The cold changes your nervous system. Together they build what researchers call "stress resilience" — the capacity to meet hard moments without falling apart.

But that's not the whole story. Because if it were just about the physiology, you could do this alone forever. And you probably have.

What the science keeps circling back to is this: the people who experience the deepest change from contrast therapy aren't the ones with the best protocols. They're the ones who do it **with other people**. The sauna and the cold are the capsule. **Connection is the medicine**.

That's a big claim. Here's why we believe it.

When you sit in heat with another person, your body moves into a state that's almost impossible to fake. You can't hide when you're sweating. You can't scroll. You can't check out. The heat forces presence. Then the cold forces honesty — because when your body is shocked, your social performance drops. What's left is the actual you.

And the actual you, sitting across from the actual them, for ten quiet minutes — that's what people don't know they're hungry for.

This course is about how to host that. Not a party. Not a workout. A **gathering**. A specific, intentional, beautifully simple thing that turns your sauna and cold plunge into the container for the kind of conversation your friends will call you about months later.

**What's coming**

Over the next four days, I'll give you the four things that separate a gathering your friends remember from one that fizzles out at the first sauna round. None of these can be figured out from vibes — there's a reason the leads at Revivery train for months before they run a session. I've distilled what actually matters.

**Tomorrow — Day 2:** The four-sentence arrival script that sets emotional safety in 90 seconds. Most hosts get the first 90 seconds wrong in ways they can't diagnose. We'll fix that.

**Day 3:** Two breathwork patterns any group can do together, even when nobody in the room has tried breathwork before. No woo. Just rhythm.

**Day 4:** What to actually say in the twelve seconds before the cold — the difference between your guests bailing on the plunge and your guests becoming the reason everyone comes back.

**Day 5:** Five complete gathering plans — women's circle, men's gathering, milestone, book club, or couples night. You pick one. You walk away with the invitation script, the 90-minute flow, the ten conversation prompts for your theme, the playlist, and the group text to send afterward.

By Friday, you'll have everything you need to pick a date in the next two to four weeks and host the gathering. Not someday. Soon.

One day at a time. Starting now.

---

**Today's practice**

**Name your people. Then tell one.**

Think of the 4–8 people you've been meaning to see — the ones who would show up if you sent them an invitation that said, "Come do this thing with me." Write their names down. Then pick one, and text them today. Something like:

> "I'm working on hosting a small gathering in the next few weeks. Would you want to be one of the people I plan it around?"

That's it. No date. No details. Just a soft commitment — yours and theirs. The rest of this course gets much easier once someone else knows you're doing it.

**Workbook page 1:** Your Gathering Starts With People → https://thesaunahost.com/workbook

---

Tomorrow we'll teach you how to set the container — how to open a gathering so people actually show up to it, not just to the schedule.

— Tricia
```

---

## Email 2 — Day 2: The first 90 seconds

**Send:** 24 hours after Email 1.

**Subject line:**
```
Day 2 — The first 90 seconds
```

**Preview text:**
```
The move most hosts get wrong — and how to fix it in four sentences.
```

**Body:**

```
*|IF:FNAME|*Hi *|FNAME|*,*|ELSE:|*Hi there,*|END:IF|*

Here's what almost every gathering you've been to gets wrong.

It starts with, "Hey, thanks for coming — grab a drink, help yourself." That's the whole opening. Everyone stands around holding something, waiting for the real moment to begin. And it never quite does.

That opening is fine for a party. It's not what we're doing.

When a trained lead opens a session at Revivery, the first 90 seconds have more structure than most weddings. Not in a stiff way — you'd never notice as a guest. But the lead is doing three very specific things.

**One: they name what's about to happen.** They say something like, "We're going to do two sauna rounds, a plunge between them, and end with a conversation." It sounds simple. It's everything. You relax as a guest because you know what you're in for.

**Two: they name the shape of the time.** "This will take about 90 minutes. You're welcome to leave early if you need to, and there's no right way to do any of this." You relax because the clock isn't ambiguous.

**Three: they name the agreement.** "What we say in here stays in here. Phones go in the basket by the door. There's no performance and no small talk — that's the point of being here." You relax because the rules are different from real life, and someone is holding them.

Those three moves — what, how long, and the agreement — are what we call **setting the container**. Everything good that happens in a gathering happens because someone took 90 seconds to build it.

The container is what makes it safe for people to actually show up. Not to perform. Not to make jokes. Not to ask where you got your tile from. To actually be there.

Here's the counterintuitive part: when you set the container, people don't feel restricted. They feel *free*. Because most social life is made of hidden agreements nobody agreed to. When you make the agreement visible and simple, people exhale.

Your job as the host isn't to entertain. It's to hold the edges of the experience so everyone inside of them can let go.

---

**Today's practice**

**Write your arrival script.**

Four sentences, no more. Use this template:

> "I'm so glad you're here. Tonight we're going to [what]. It'll take about [how long]. While we're in here, let's agree that [the agreement]."

Read it out loud. See how it lands in your body. If it feels stiff, keep tightening until it sounds like you.

**Workbook page 2:** Setting the Container → https://thesaunahost.com/workbook

---

Tomorrow we step into the sauna. I'll teach you two breathwork patterns any group can do together — even if none of them have ever tried breathwork before.

— Tricia
```

---

## Email 3 — Day 3: Breath is how you lead

**Send:** 24 hours after Email 2.

**Subject line:**
```
Day 3 — Breath is how you lead a room
```

**Preview text:**
```
Two patterns any host can teach, even with guests who've never tried breathwork.
```

**Body:**

```
*|IF:FNAME|*Hi *|FNAME|*,*|ELSE:|*Hi there,*|END:IF|*

Okay. The container is set, the phones are in the basket, you're in the sauna together. Now what?

This is where most home sauna gatherings fall apart. People get quiet because they don't know what they're supposed to do. Or someone fills the silence with chatter. Or everyone looks at their towel.

Here's what we do instead. For the first round of heat, we breathe together.

Not in a weird way. Not in a way that demands anyone knows what they're doing. We give the group a simple pattern, we lead it with our own breath, and we do it together. Three to five minutes. That's it.

This move is the single highest-leverage thing you can do in a gathering. Here's why.

When a group of people breathes in the same pattern, their nervous systems start to synchronize. It's called **co-regulation** and it's not metaphor — it's measurable. Heart rate variability converges. Cortisol drops. And more importantly for you as the host, the awkwardness evaporates. People stop performing because breathing is not a performance.

You don't need to be a breathwork instructor to lead this. You just need to pick a pattern, count it out loud once or twice, and then go silent while everyone does it with you.

**The two patterns any group can do together**

**Box breathing (the calm one)** — Breathe in for 4. Hold for 4. Breathe out for 4. Hold for 4. Repeat for 3–5 minutes. This one is for book clubs, milestone gatherings, anything where the energy should stay grounded.

**4-7-8 breathing (the settling one)** — Breathe in through the nose for 4. Hold for 7. Breathe out through the mouth for 8. Repeat for 4–6 cycles. This one is for women's circles, men's gatherings — anywhere you want people to drop below the surface fast.

For both patterns, you lead the first three rounds out loud by counting. Then you say, "We'll do this on our own for another two minutes." And you shut up. That silence is where the gathering shifts.

**What happens when you do this**

The room gets quieter. The sauna gets more tolerable (breath is how you survive heat). People's faces soften. Someone closes their eyes. The whole thing stops feeling like a hangout and starts feeling like a practice. Which is what it is.

---

**Safety note**

Extended breath holds are not for everyone. If you're pregnant, have a seizure disorder, or have low blood pressure, skip the holds and just breathe gently. Box breathing without holds (in for 4, out for 4) works beautifully too.

---

**Today's practice**

**Try 4-7-8 breathing right now.**

Alone. Four cycles. See what happens in your body. Then practice counting it out loud in a mirror or on a voice memo. You want to be able to lead it without hesitating. The confidence of your voice is the permission the room needs to follow you.

**Workbook page 3:** Two Breathwork Patterns → https://thesaunahost.com/workbook

---

Tomorrow we step into the cold. And I'll teach you the single most important thing to do in the minute after everyone gets out of the plunge — the move most people skip because they don't know what it is.

— Tricia
```

---

## Email 4 — Day 4: The 60 seconds after the plunge

**Send:** 24 hours after Email 3.

**Subject line:**
```
Day 4 — The 60 seconds after the plunge
```

**Preview text:**
```
The cold plunge gets all the attention. The plunge is not the point.
```

**Body:**

```
*|IF:FNAME|*Hi *|FNAME|*,*|ELSE:|*Hi there,*|END:IF|*

The cold plunge gets all the attention. The plunge is not the point.

The point is what happens in the 60 seconds after.

Here's what your guests don't know. They're about to have a physiological experience they've never had in company. Getting into cold water with other people is vulnerable in a way that no other wellness practice is. The body reacts. The breath catches. The ego falls over. For a minute afterward, they are not the curated version of themselves they walked in as. They are just people.

Most home gatherings miss this moment completely. Everyone climbs out, reaches for a towel, says "whoooo that was cold," and the moment closes.

We do something different. We stay with it.

**The three-step integration**

**Step 1: The breath land (30 seconds).** After everyone is out of the plunge, the host says one sentence. Usually: "Let's take a minute together to let our breath come back." Then everyone stands or sits still, towels around shoulders, breathing. You do not talk. You do not fill. You just breathe.

**Step 2: The body scan (30 seconds).** You say, slowly: "Notice what's happening in your hands. Notice your chest. Notice what your face is doing." That's it. You're pointing the group's attention inward instead of outward. Most people will close their eyes without being asked.

**Step 3: The anchor question (one answer each).** Then you ask one question. Something small. Something simple. Something that earns its place in the silence you've just created. Examples:

> *What's one word for what you just felt?*
>
> *What's one thing you're noticing right now?*
>
> *What's one thing you're grateful your body can do?*

Each person answers. One word or one sentence. Then you move back toward the sauna for round two.

That's integration. It takes 90 seconds. It is why people will talk about your gathering for three weeks.

**Why this works**

The physiological shock of cold water briefly takes people out of their social mask. If you introduce a prompt in that window, you get an honesty you cannot engineer any other way. This is not manipulation. It's the opposite — it's respect for the window that the cold just opened.

If you skip integration, the window closes and you lose the gift of the cold. If you honor it, the cold does exactly what it's supposed to do: it opens the room.

---

**Safety note**

Cold plunging isn't for everyone. If you or one of your guests has a heart condition, uncontrolled blood pressure, or is pregnant, please check with a doctor first. Anyone who wants to skip the plunge and stay with the sauna only is welcome to — a good gathering meets everyone where they are.

---

**Today's practice**

**Find a moment today that feels a little hard.**

A cold shower. A hard workout. A difficult conversation. When it ends, pause for 90 seconds before reaching for your phone. Breath. Body scan. One word for what you felt.

That's the practice. This is a sauna gathering skill. It's also a life skill.

**Workbook page 4:** Integration Prompts → https://thesaunahost.com/workbook

---

Tomorrow is Day 5. You pick your theme — women's circle, men's gathering, milestone, book club, or couples night — and I'll hand you the complete plan for your first gathering.

— Tricia
```

---

## Email 5 — Day 5: Pick your theme

**Send:** 24 hours after Email 4.

**Subject line:**
```
Day 5 — Pick your theme. Host your first gathering.
```

**Preview text:**
```
You have everything you need. Today you pick your theme and send the first text.
```

**Body:**

```
*|IF:FNAME|*Hi *|FNAME|*,*|ELSE:|*Hi there,*|END:IF|*

Congratulations. You've made it to Day 5.

Today I'm going to give you three things: the final move in a Revivery gathering (the close), a decision to make about your first gathering, and the plan to host it.

**The close**

Every Revivery session ends the same way, whether it's a private session or a full circle. We call it **landing**.

After the second sauna round, after the second plunge, after the body has done what it came to do — we gather one more time for five or ten minutes and we close.

A close is not a summary. It's not a debrief. It's a moment where everyone who was in the room has the chance to say one thing, if they want to.

Here's the script:

> "Before we head back into the world, let's take a minute to close together. I'd love to go around and hear one thing from each of you — anything you're taking with you from tonight. One word, one sentence, one thought. If you'd rather pass, just say 'pass.' I'll go first."

Then you go first. You model what a short, honest answer sounds like. You say, "I'm taking with me how quiet this room got in the cold." Or, "I'm taking with me the way Sarah laughed." Or, "I'm just grateful you all showed up."

Then the next person. Then the next. You don't respond after each one. You just hold the space and let it go around the circle. Nobody has to make it profound. Small things are allowed.

When it's done, you say, "Thank you for being here tonight." That's it. Gathering complete.

**The choice**

Now, pick your first theme. Not someday. For the next 2–4 weeks. The one that gives you butterflies and a little bit of "oh no" is usually the right one.

**Women's Circle / Girls' Night** — 4–6 women, intentional conversation, the gathering you wish existed.

**Men's Gathering** — 4–6 men, depth without agenda, what men's retreats gesture at but rarely deliver.

**Milestone Celebration** — a birthday, bachelorette, anniversary, or big threshold done differently.

**Book Club** — the gathering where the book becomes the excuse to finally talk about what actually matters.

**Couples Night** — 2–3 couples, date night reimagined, the together-practice that rebuilds presence and gives relationships a shared ritual.

Inside your workbook, Day 5's pages are five full gathering plans — one per theme. Pick yours today.

Each plan includes the invitation script (what to text your people), the flow (timings for arrival, sauna round 1, plunge, integration, sauna round 2, close), ten conversation prompts designed for that theme, the playlist suggestion, and the "what to text the group afterward" script.

**What to do next**

Pick a date in the next 2–4 weeks. Text your list of people today. Use the invitation script from your chosen theme's workbook page.

That's it. You have the whole method.

---

**Today's practice**

**Text one person today.**

Text one person right now — today — and tell them you want to host a gathering. Don't wait until you feel ready. You'll feel more ready after you've told one person out loud.

**Workbook pages 5–9:** Your Five Themes → https://thesaunahost.com/workbook

---

You have everything you need. Host your first gathering. Then come back and tell me how it went — I read every email.

In a few days, I'll send you one more thing — the real secret behind what makes this work.

— Tricia
Founder, Revivery

P.S. When you've hosted your first gathering, hit reply and tell me one sentence about how it went. I'll write you back.
```

---

## Part 3 — Claude Prompts for Building in Mailchimp

Paste any of these into Claude when you're in Mailchimp and need help with a specific step.

### Prompt — Convert an email to Mailchimp-ready HTML

```
I'm pasting a markdown email from MINI_COURSE_EMAILS.md. Convert it to clean,
email-safe HTML that I can paste into Mailchimp's "Code" content block. Rules:
- Single-column, 600px max width
- Real <strong> tags instead of **bold**
- Block quotes styled as gold left border (#ad8d4c), 4px, 16px padding
- Preserve line breaks between paragraphs
- No external CSS — all styles inline
- No <html>, <head>, or <body> tags — just the inner content
Here's the email:

[paste the email from this file]
```

### Prompt — Design the email template in Revivery brand

```
Help me design a Mailchimp email template for a Revivery drip email. Brand rules:
- Colors: Blue Black background #2e393f, Peach body text #f4dfc8, Gold accent
  #ad8d4c for links and divider lines
- Font: ABC Arizona Sans (or Helvetica/Arial as email-safe fallback)
- Headings: all caps, +250 kerning
- Single column, 600px, generous vertical space
- No stock photos. A small Gold logo mark at the top, centered. Revivery
  footer with physical address + unsubscribe.
- Tagline in the footer: "HEAT ICE REPEAT"
Show me the HTML structure I should use in the Code block.
```

### Prompt — Write subject line variants for A/B testing

```
Give me 5 alternate subject lines for this email, each under 50 characters,
sentence case, no exclamation points, in Tricia's voice (direct, warm, curious).
Include one that's a question, one that's a surprising statement, and one
that uses a number. Keep "Day N —" prefix consistent with the rest of the drip.
Here's the email body:

[paste body]
```

### Prompt — Tighten any email to 50% shorter

```
Shorten this email by about half without losing any of the core teaching.
Keep Tricia's voice (direct, warm, punchy). Keep all headers and the practice
prompt section. Cut examples, repetition, and softening phrases. Don't add
anything new.

[paste email]
```

### Prompt — Fix brand consistency on a draft

```
Review this email against the Revivery brand guide and flag anything off-brand:
- Terminology: members (not clients), leads (not instructors), sessions (not
  classes), Revivery (never "the Revivery")
- No ellipses, sentence case headlines, Oxford comma, contractions
- Sparingly used exclamation points (basically never in a prospect email)
- "Practice, not event" framing
Show me a clean version with changes tracked.

[paste email]
```

### Prompt — Generate a text-only version (for plain-text toggle)

```
Create a plain-text version of this email for Mailchimp's plain-text fallback.
Remove all formatting, replace **bold** with plain text, convert markdown
links to "anchor text: URL" format, and keep the tone intact. Aim for
something that reads well in any email client.

[paste email]
```

---

## Part 4 — Deliverability & Brand Checklist

Before the automation goes live, walk through this list once.

### Deliverability
- [ ] Sending domain verified in Mailchimp (Settings → Domains)
- [ ] DKIM authenticated (green check in Domains panel)
- [ ] From Name and From Email match across all 6 emails
- [ ] Reply-to is a real inbox that Tricia actually checks
- [ ] Physical address in footer is correct (Mailchimp requires it)
- [ ] Unsubscribe link visible in footer (Mailchimp auto-inserts; don't remove)
- [ ] Run Inbox Preview on each email (Gmail, Outlook, Apple Mail) before activating

### Brand Voice
- [ ] All subject lines in sentence case
- [ ] No ellipses anywhere in body copy
- [ ] No exclamation points unless absolutely warranted
- [ ] Contractions throughout
- [ ] "Revivery" never prefixed with "the"
- [ ] "Members / leads / sessions" used correctly if referenced

### Content & CTAs
- [ ] Every email links to `https://thesaunahost.com/workbook`
- [ ] Every email ends with a "tomorrow" tease (except Day 5)
- [ ] Day 5 ends with invitation to reply with how the gathering went
- [ ] Signoff is consistent: "— Tricia" (or "— Tricia, Founder, Revivery" on Day 0 and Day 5)

### Functional
- [ ] Journey trigger is `sauna-host-course` tag added (NOT list membership)
- [ ] Delays between emails are set to 1 day (not 24 hours, which may schedule off-time)
- [ ] Merge tag fallbacks (`*|IF:FNAME|*`) render correctly when FNAME is blank — test by subscribing with email only
- [ ] Test subscription from thesaunahost.com triggers the journey (watch the Journey view for your test contact entering)

---

## Part 5 — What lives where

| Piece | File / location |
|-------|-----------------|
| Email copy | This file (`MINI_COURSE_EMAILS.md`) |
| Lesson content (source of truth for the site) | `content/lessons.ts` |
| Signup form component | `components/OptInForm.tsx` |
| Subscribe API route | `app/api/subscribe/route.ts` |
| Mailchimp client | `lib/email.ts` |
| Env vars, audience ID, server prefix | `INFRASTRUCTURE.md` + Vercel env vars |
| Workbook PDF (gated download on site) | `app/workbook/page.tsx` + `public/` |

When you update lesson content on the site, update the matching email here too (or ask Claude to reconcile the two).
