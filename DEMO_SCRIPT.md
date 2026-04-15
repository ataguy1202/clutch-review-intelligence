# Clutch Interview · Demo Script

**Interview:** Fri Apr 17, 2pm ET with Amanda Baum (Head of Product) + Alaina Stevenson (Sr. PM)
**Total time target:** 7–10 min walkthrough, leave 30+ min for Q&A
**Keep open during demo:** this file (phone / second screen) + prototype in browser

---

## The one sentence that sells the whole thing

> "This isn't four separate features. It's one AI ecosystem with Clutch's verified review data at the center — serving human buyers on the website today, and every AI agent researching vendors tomorrow."

Memorize that. Say it in the opening. Say it again in the closing. If they remember one thing, make it this.

---

## Before you start (setup)

1. Open the prototype full-screen in Chrome. Scroll back to the top.
2. Clear any search input in the hero.
3. Close any floating chat that's already open.
4. Have this file on your phone.
5. Breathe. You are showing them a product, not defending a thesis.

---

## OPENING (30 seconds) — say this before sharing screen

> "Thanks for making time. Since my last conversation I kept coming back to one question: what is Clutch's real moat, and where is the market heading? The moat is 2M+ verified B2B reviews at scale — there's nothing else like it. The shift is that buying behavior is moving from humans browsing websites to AI agents researching on behalf of companies. So I took the prototype I shared before and rebuilt it around a bigger idea: Clutch as the AI data layer behind every B2B buying decision. Let me walk you through it."

Now share your screen.

---

## SECTION 1 · Hero + Framing (20 seconds)

**Where you are:** top of page, headline visible.

**Point to the headline:** "Connect with trusted companies — and the AI agents researching them."

**Say:**
> "This is Clutch today, reframed for the AI era. Same trust, same verified reviews — but structured to serve both humans and agents. The line I want you to hold onto is right here: Clutch's 2M+ verified reviews become the backend data layer for both."

**Transition:** "Let me show you what that means in practice."

---

## SECTION 2 · Intelligent Matching · INTERACTIVE (45 seconds)

**Where you are:** hero with "Let us match you" toggle.

**What to do:**
1. Click the popular search chip **"HIPAA marketing agency"**
2. Click the orange **"Get Matched"** button
3. Wait for results to reveal below (about 1 sec loading)

**Say while it loads:**
> "Instead of clicking eight dropdown filters, the buyer describes their project in plain English. An AI reasons across 124,990 providers — their profiles, reviews, past projects, pricing, and outcomes."

**Once results appear, point to the top match card:**
> "Here are three ranked matches. Notice the match score — 94 — and the plain-english reasoning for why: '12 verified healthcare projects, 8 with hospital systems, HIPAA certified, reviews consistently cite SEO depth in regulated industries.' That reasoning isn't written by a human. It's extracted from the actual review content."

**Key phrase to drop:**
> "This is the same engine that will serve external AI agents in a minute. Remember that."

**Transition:** "Before I show you that, let me zoom out."

---

## SECTION 3 · Ecosystem Diagram (30 seconds)

**Where you are:** scroll down past results to the "How it fits together" diagram.

**What to do:** point at each box left-to-right.

**Say:**
> "This is the framing I want you to leave with. Four capabilities, one ecosystem. Review Intelligence structures the data. Intelligent Matching uses it to recommend providers. At the center is the MCP Agent Layer — the piece that makes all of it queryable by AI agents worldwide. And Provider Demand closes the loop by telling providers what buyers and agents are searching for, so supply catches up to demand."

**Pause, point at the center box (the coral one):**
> "The MCP layer is the big bet. The other three make it valuable."

---

## SECTION 4 · MCP Agent Layer · THE VISION · INTERACTIVE (90 seconds)

**Where you are:** scroll to Step 01 · the dark navy MCP panel.

**This is your centerpiece. Slow down here.**

**Say first (before clicking anything):**
> "Today humans browse Clutch. Tomorrow AI agents research vendors on behalf of companies. When that happens, every agent needs trustworthy B2B data. Clutch has it — 2M+ verified reviews. So we publish an MCP server."

**If they ask what MCP is (likely):**
> "Model Context Protocol. Think of it as a standard way for AI assistants like Claude or ChatGPT to call external data sources directly. Anthropic published it last year, OpenAI is adopting it. It lets an AI agent query Clutch the way a human uses the website."

**What to do:** The first preset (HIPAA marketing search) should already be selected.
1. Click the orange **"Run Query"** button.
2. Watch the request stream in on the left (about 2 sec).
3. Watch the response stream in on the right (about 2 sec).
4. A toast pops up: "Monetization event logged · +$4.20 referral".

**Say while it streams:**
> "An enterprise agent — in this case acting on behalf of Meridian Health Systems — asks Clutch for a HIPAA-compliant marketing agency. The MCP server returns three ranked matches, with citations to the verified reviews they came from, and a referral token. Every one of these queries is a monetization event. Same economic unit as a click on clutch.co today — routed through a new channel."

**Point to the counter that ticked up (top right of panel):**
> "This is the same unit economics Clutch has today, multiplied by the number of agents researching vendors instead of humans."

**Scroll down inside the panel, point at the tools list:**
> "These are the tools exposed — search providers, get reviews, compare, get recommendations, route a lead. Agents can compose them. And the clients that can call this — Claude, ChatGPT, enterprise agents, coding assistants."

**Land the first-mover line:**
> "No other B2B marketplace has this infrastructure yet. Clutch ships first, becomes the default citation in every agent's answer when a buyer asks for a vendor recommendation. That's the bet."

**Transition:** "And all of this depends on the data being good. Let me show you."

---

## SECTION 5 · Review Intelligence (60 seconds)

**Where you are:** scroll to Step 03 · the two-column layout with AI Provider Brief + Anomaly Feed.

**Point to the provider brief (left):**
> "For every provider, we auto-generate a brief from every verified review. Plain-english summary. Sentiment broken down by category — communication, technical skill, budget, delivery, responsiveness. Themes extracted. And — this is the one that makes VPs lean in — trend signals."

**Point to the amber trend callout:**
> "Scope-creep mentions are up in three of the last ten reviews, compared to one of ten before. Not yet a pattern, but flagged. A sales rep sees this before a renewal conversation. A buyer sees this before they sign."

**Point to the anomaly feed (right):**
> "And the prerequisite for all of this — fraud detection. If fake or coordinated reviews get into the data, every downstream feature cites garbage. The anomaly feed blocks them before they reach the matching engine or the MCP layer. Data integrity is the foundation."

**Transition:** "Last piece — how we close the loop with providers."

---

## SECTION 6 · Provider Demand Intelligence (45 seconds)

**Where you are:** scroll to Step 04 · demand gap table + profile optimization.

**Point to the top two rows (coral-highlighted) of the gap table:**
> "Every search — human or agent — is a demand signal. Twenty buyers searched this month for Shopify migration in healthcare. Only three providers match. That's a 6.7× gap. That's both an opportunity for providers and a signal for Clutch's sales team to go source supply."

**Point to the Profile Optimization card (right):**
> "For individual providers, the same demand data becomes AI-suggested profile optimizations. 'Add Shopify migration to your services, publish a HIPAA case study, sharpen your SEO positioning.' Projected impact is shown. This is concrete Clutch+ upsell justification, tied to real buyer demand."

**Transition:** "One last thing."

---

## SECTION 7 · Floating Agent Chat · INTERACTIVE (30 seconds)

**What to do:** Click the floating pill in the bottom-right corner: **"I need a recommendation…"**

**A chat overlay opens. A scripted conversation plays out.**

**Say while it runs:**
> "This is what it looks like when the buyer is the one talking to the agent, instead of the agent being a back-end service. Same system, conversational surface. The agent queries the same MCP tools, returns the same matches, cites the same verified reviews. Human-facing and agent-facing are the same engine with different front ends."

**Close the chat.**

---

## CLOSING (30 seconds)

**Where you are:** scroll to the dark navy closing panel: "Not four features. One AI ecosystem."

**Say:**
> "Coming back to where I started. Not four features — one ecosystem. First-mover advantage because no other B2B marketplace has shipped an agent data layer yet. A new distribution channel because Clutch's reach expands beyond website visitors to every AI agent in the world. And a long-term moat because the data compounds — the more reviews, the more structured intelligence, the more agents cite Clutch, the more valuable it becomes. That's what I wanted to bring to you today."

**Then:**
> "I'd love to hear what resonates, what you'd push back on, and where you'd want to see this go first."

**Stop talking. Let them ask questions.**

---

## Questions they'll probably ask — how to answer

### "What's the MVP?"
> "The Review Intelligence layer. Structured sentiment, theme extraction, anomaly detection, all stored back on the provider record. Everything else depends on structured review data. Without it there's no AI ecosystem. Once that exists, the MCP server is a thin wrapper on top — two tools to start: search_providers and get_reviews. Ship to a closed beta of enterprise agent users. Measure queries and referral conversions."

### "Who pays and how?"
> "Same economic model as today, new surface. Providers pay for qualified leads routed through the MCP layer — same as buyer-initiated leads on clutch.co today. Separately, enterprise customers who embed Clutch as a data source in their internal procurement agents become a new paid tier. Either per-query pricing or a subscription."

### "Why now?"
> "MCP as a standard shipped in late 2024. Anthropic and OpenAI are both adopting. Enterprise agent adoption is moving faster than most people realize. The first-mover window is open right now. If Clutch doesn't ship in the next 12 months, a competitor or a generic data broker will, and Clutch becomes one of many citations instead of the citation."

### "What's the biggest risk?"
> "Adoption on the agent side. We need agents to actually use Clutch as a data source. Mitigation: integrate with Claude first (they have a published tool directory), then the GPT store, then direct enterprise pilots. Pair it with the on-site matching experience so the same AI investment pays off in both channels — so we're not betting the house on agent adoption alone."

### "Why would a buyer trust an agent's recommendation over browsing themselves?"
> "They already do — that's what's happening in consumer search. The job to be done is save time and lower risk. Clutch's moat is the trust layer. If an agent says 'based on 47 verified Clutch reviews, SilverThread is your best match,' that carries more weight than 'here's a provider from a random web search.' Clutch's data is what makes the agent's answer trustworthy."

### "How is this different from just… an API?"
> "An API is a developer integration. MCP is an agent-native protocol — the AI model itself knows how to discover and use the tools, without a developer wiring them up. It's the difference between 'our team integrated the Clutch API' and 'any agent on the planet can query Clutch out of the box.' Distribution scales very differently."

### "Does this cannibalize clutch.co traffic?"
> "Probably some, eventually. But the alternative is that buyers research through agents anyway and Clutch isn't in the answer. Getting monetized on agent queries is strictly better than being invisible. And the on-site experience gets better too — the same AI powers natural-language matching for human buyers."

### "What would you measure in the first 90 days?"
> "Three things. One, MCP query volume and query-to-match rate — is the data useful. Two, referral conversion from agent-routed leads compared to web-routed leads. Three, on-site natural-language matching usage and conversion versus the classic filter flow. The first two prove the agent thesis. The third derisks it by showing the same AI investment pays off on clutch.co."

---

## Language tips

### Words to use
- **"Data layer"** — keeps the framing high-level and strategic
- **"Verified reviews"** — reinforces the moat
- **"Every query is a monetization event"** — ties it to revenue
- **"First-mover"** — the urgency lever
- **"Plain English reasoning"** — differentiates from dumb keyword matching
- **"Closes the loop"** — systems thinking

### Words to avoid
- "Model Context Protocol" without explaining it
- "LLM" / "embeddings" / "vector search" — technical; use "AI" or "the model"
- "Disrupt" — makes PMs roll their eyes
- "Just a chatbot" — undersells it
- "I think" / "kind of" / "sort of" — sound confident, you've done the work

### If you get stuck
- Breathe. It's okay to pause.
- Fall back to the one-sentence framing at the top of this file.
- "Let me re-anchor — the big idea is…"

---

## If the demo breaks on stage

- **Streaming JSON doesn't stream:** just describe what it would show. "Normally the request and response stream in — the point is an external agent is querying Clutch in real time."
- **Chat pill doesn't open:** "This would normally play out a scripted conversation showing an agent doing the research. The key point is it's the same MCP tools in a conversational surface."
- **Results don't reveal:** scroll down to the match grid section in Step 2 — the same cards are permanent there.
- **Anything else:** smile, say "that's why it's a prototype," move on.

---

## The last thing to remember

You built a working interactive prototype for this interview. Most candidates show a static Figma. You're showing something real that clicks and streams and updates.

When you're nervous, remember: **they invited you back because they liked what you did already. This demo is an upgrade, not a rescue.**

Good luck.
