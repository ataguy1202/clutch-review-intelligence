/* =========================================================
   CLUTCH AI DATA LAYER — INTERACTIVE BEHAVIOR
   ========================================================= */

// ---------- TOAST SYSTEM ----------
const toastWrap = document.getElementById('toastWrap');
function toast(message, type = 'success') {
    const el = document.createElement('div');
    el.className = `toast ${type}`;
    const ico = type === 'success' ? '✓' : '→';
    el.innerHTML = `<span class="t-ico" style="${type==='info'?'background:var(--coral)':''}">${ico}</span>${message}`;
    toastWrap.appendChild(el);
    setTimeout(() => {
        el.classList.add('out');
        setTimeout(() => el.remove(), 300);
    }, 2800);
}

// ---------- INTERSECTION ANIMATIONS ----------
const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (!e.isIntersecting) return;
        e.target.querySelectorAll('.bar-f, .hbar-f, .match-score-bar-f, .sent-pos, .sent-neg, .sc-bar-f')
            .forEach(b => {
                const w = b.dataset.w || b.style.width;
                if (!b.dataset.w) b.dataset.w = w;
                b.style.width = '0%';
                requestAnimationFrame(() => requestAnimationFrame(() => {
                    b.style.width = b.dataset.w;
                }));
            });
        io.unobserve(e.target);
    });
}, { threshold: 0.15 });
document.querySelectorAll('.c, .mcp-wrap, .match-card, .eco, .hero-stack, .stack-card, .close')
    .forEach(c => io.observe(c));

// ---------- MATCH TOGGLE ----------
document.querySelectorAll('.match-toggle button').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.match-toggle button').forEach(b => b.classList.remove('on'));
        btn.classList.add('on');
        const mode = btn.dataset.mode;
        if (mode === 'browse') {
            toast('Browse mode — scroll down to explore categories', 'info');
        }
    });
});

// ---------- DYNAMIC MATCH DATASETS ----------
const matchDatasets = {
    hipaa: {
        filters: ['Premier Verified', 'HIPAA compliant', 'US-based', '$8K–$12K / mo', 'Hospital systems'],
        providers: [
            { name: 'SilverThread Technologies', loc: 'Washington, DC · 45 team', av: 'ST', avCls: 'a', verified: 'Premier Verified', score: 94, rank: 'Best Match', top: true, why: '12 verified healthcare projects (8 with hospital systems), HIPAA-certified infrastructure, reviews consistently cite SEO depth for regulated industries.', chips: [['HIPAA', 'p'], ['Healthcare SEO', 'p'], ['Hospital systems', 'p'], ['47 reviews · 4.8★', '']], price: '$8K–$12K / mo' },
            { name: 'NexaBuild Digital', loc: 'Austin, TX · 28 team', av: 'NX', avCls: 'b', verified: 'Verified', score: 87, rank: 'Strong Fit', top: false, why: 'Strong SEO reviews across regulated industries (finance + health). HIPAA capable but fewer hospital-system projects than top match.', chips: [['SEO', 'p'], ['Regulated industries', 'p'], ['31 reviews · 4.6★', '']], price: '$7K–$10K / mo' },
            { name: 'Helix Performance', loc: 'Boston, MA · 62 team', av: 'HP', avCls: 'c', verified: 'Verified', score: 78, rank: 'Worth Considering', top: false, why: 'Deep healthcare client list but primarily paid-media focused. SEO is a growing service — only 4 of last 20 reviews mention it prominently.', chips: [['Healthcare focus', 'p'], ['Paid media primary', ''], ['58 reviews · 4.7★', '']], price: '$9K–$14K / mo' }
        ]
    },
    shopify: {
        filters: ['Premier Verified', 'Shopify Plus', 'Healthcare eCom', '$8K–$15K / mo', 'Headless React'],
        providers: [
            { name: 'NexaBuild Digital', loc: 'Austin, TX · 28 team', av: 'NX', avCls: 'b', verified: 'Verified', score: 91, rank: 'Best Match', top: true, why: '6 verified Shopify-to-headless migrations in regulated commerce. Strong React/Next.js engineering, recent case study with a HIPAA-adjacent health retailer.', chips: [['Shopify', 'p'], ['Headless', 'p'], ['Healthcare eCom', 'p'], ['31 reviews · 4.6★', '']], price: '$9K–$14K / mo' },
            { name: 'Arcadia Commerce', loc: 'San Francisco, CA · 38 team', av: 'AC', avCls: 'a', verified: 'Premier Verified', score: 88, rank: 'Strong Fit', top: false, why: 'Shopify Plus specialist with 4 compliance-adjacent migrations. Slightly less healthcare depth but faster median timeline (4.1 mo).', chips: [['Shopify Plus', 'p'], ['B2C + B2B', 'p'], ['22 reviews · 4.8★', '']], price: '$10K–$16K / mo' },
            { name: 'Prismatic Labs', loc: 'Toronto, ON · 19 team', av: 'PL', avCls: 'c', verified: 'Verified', score: 74, rank: 'Worth Considering', top: false, why: 'Generalist ecommerce agency with solid Shopify portfolio but no verified HIPAA-adjacent healthcare work. Reviews praise price/value.', chips: [['Shopify', 'p'], ['General ecom', ''], ['41 reviews · 4.5★', '']], price: '$6K–$10K / mo' }
        ]
    },
    soc2: {
        filters: ['Premier Verified', 'SOC2 Type II', 'SaaS', '$8K–$15K / mo', 'Fractional CISO'],
        providers: [
            { name: 'CompliancePro Advisors', loc: 'Denver, CO · 24 team', av: 'CP', avCls: 'a', verified: 'Premier Verified', score: 96, rank: 'Best Match', top: true, why: 'Specializes in Series A–C SaaS SOC2 prep. 31 verified audits completed, 92% first-pass success rate. Fractional CISO engagement model matches stage.', chips: [['SOC2 Type II', 'p'], ['SaaS', 'p'], ['Fractional CISO', 'p'], ['54 reviews · 4.9★', '']], price: '$8K–$15K / mo' },
            { name: 'AuditLogic Inc.', loc: 'Remote · 14 team', av: 'AL', avCls: 'b', verified: 'Verified', score: 89, rank: 'Strong Fit', top: false, why: 'SOC2 + ISO 27001 dual-track experts. Recent reviews mention fast gap analysis but slightly longer remediation cycles than top match.', chips: [['SOC2', 'p'], ['ISO 27001', 'p'], ['28 reviews · 4.7★', '']], price: '$7K–$12K / mo' },
            { name: 'SecureSaaS Partners', loc: 'Austin, TX · 31 team', av: 'SP', avCls: 'c', verified: 'Verified', score: 82, rank: 'Worth Considering', top: false, why: 'Broader compliance practice (HIPAA, PCI, SOC2). SOC2-specific reviews strong but less tailored to Series B stage startups.', chips: [['Multi-compliance', 'p'], ['SOC2', 'p'], ['37 reviews · 4.6★', '']], price: '$10K–$18K / mo' }
        ]
    }
};

function detectPreset(query, explicit) {
    if (explicit && matchDatasets[explicit]) return explicit;
    const q = (query || '').toLowerCase();
    if (q.includes('hipaa') || q.includes('hospital') || (q.includes('health') && q.includes('marketing'))) return 'hipaa';
    if (q.includes('shopify') || q.includes('headless') || q.includes('ecommerce') || q.includes('migration')) return 'shopify';
    if (q.includes('soc2') || q.includes('soc 2') || q.includes('audit') || q.includes('compliance')) return 'soc2';
    return 'hipaa';
}

function renderMatches(key) {
    const data = matchDatasets[key];
    if (!data) return;

    // Update filter chips
    const filterBar = document.querySelector('#results .filter-bar');
    if (filterBar) {
        filterBar.innerHTML = data.filters.map((f, i) => `
            <button class="filter-chip${i < 2 ? ' on' : ''}">${i === 0 ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>' : ''} ${f}</button>
        `).join('') + '<button class="filter-chip">Sort: Match score</button>';
        filterBar.querySelectorAll('.filter-chip').forEach(chip => {
            chip.addEventListener('click', () => chip.classList.toggle('on'));
        });
    }

    // Render provider cards
    const grid = document.querySelector('#results .match-grid');
    grid.innerHTML = data.providers.map(p => `
        <div class="match-card${p.top ? ' top' : ''}">
            <div class="match-rank">${p.rank}</div>
            <div class="match-head">
                <div class="av ${p.avCls}">${p.av}</div>
                <div>
                    <div class="match-name">${p.name}</div>
                    <div class="match-loc">${p.loc}</div>
                    <div class="match-verified">
                        <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L4 6v6c0 5 3.5 9.5 8 10.5 4.5-1 8-5.5 8-10.5V6z"/></svg>
                        ${p.verified}
                    </div>
                </div>
            </div>
            <div class="match-score-row">
                <span class="match-score-label">Match</span>
                <div class="match-score-bar"><div class="match-score-bar-f" data-w="${p.score}%" style="width:0%"></div></div>
                <div class="match-score-v">${p.score}</div>
            </div>
            <div class="match-why"><b>Why:</b> ${p.why}</div>
            <div class="match-chips">
                ${p.chips.map(([label, cls]) => `<span class="chip ${cls}">${label}</span>`).join('')}
            </div>
            <div class="match-footer">
                <div>
                    <div class="match-footer-label">Pricing</div>
                    <div class="match-footer-val">${p.price}</div>
                </div>
                <button class="btn-profile" data-action="profile" data-name="${p.name}">View Profile</button>
            </div>
        </div>
    `).join('');

    // Rewire profile buttons on rendered cards
    grid.querySelectorAll('[data-action="profile"]').forEach(btn => {
        btn.addEventListener('click', e => {
            e.stopPropagation();
            toast(`Opening ${btn.dataset.name} profile`, 'info');
        });
    });
}

// ---------- POPULAR SEARCH CHIPS ----------
let currentPreset = null;
document.querySelectorAll('.chip-search').forEach(chip => {
    chip.addEventListener('click', () => {
        const text = chip.dataset.q;
        currentPreset = chip.dataset.preset;
        document.getElementById('matchInput').value = text;
        document.getElementById('matchInput').focus();
    });
});

// Clear preset when user types manually
document.getElementById('matchInput').addEventListener('input', () => { currentPreset = null; });

// ---------- GET MATCHED BUTTON ----------
const matchBtn = document.getElementById('matchBtn');
const matchInput = document.getElementById('matchInput');
const results = document.getElementById('results');

function runMatch() {
    const q = matchInput.value.trim();
    if (!q) {
        matchInput.focus();
        toast('Try one of the popular searches below, or describe your project', 'info');
        return;
    }
    const preset = detectPreset(q, currentPreset);
    matchBtn.classList.add('loading');
    setTimeout(() => {
        matchBtn.classList.remove('loading');
        renderMatches(preset);
        results.classList.add('on');
        document.getElementById('resultsQuery').textContent = q.length > 60 ? q.slice(0, 60) + '…' : q;
        // animate the score bars
        setTimeout(() => {
            document.querySelectorAll('#results .match-score-bar-f').forEach(b => {
                const w = b.dataset.w || '0%';
                b.style.width = '0%';
                requestAnimationFrame(() => requestAnimationFrame(() => {
                    b.style.width = w;
                }));
            });
        }, 50);
        setTimeout(() => {
            results.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 200);
    }, 900);
}
matchBtn.addEventListener('click', runMatch);
matchInput.addEventListener('keydown', e => { if (e.key === 'Enter') runMatch(); });

// ---------- RESULTS FILTER CHIPS ----------
document.querySelectorAll('.filter-chip').forEach(chip => {
    chip.addEventListener('click', () => {
        chip.classList.toggle('on');
    });
});

// ---------- ROUTE LEAD BUTTONS ----------
document.querySelectorAll('[data-action="route"]').forEach(btn => {
    btn.addEventListener('click', e => {
        e.stopPropagation();
        const name = btn.dataset.name || 'provider';
        btn.textContent = '✓ Routed';
        btn.classList.add('done');
        toast(`Lead routed to ${name} · revenue event logged`, 'success');
    });
});

// ---------- PROFILE VIEW BUTTONS ----------
document.querySelectorAll('[data-action="profile"]').forEach(btn => {
    btn.addEventListener('click', e => {
        e.stopPropagation();
        const name = btn.dataset.name || 'provider';
        toast(`Opening ${name} profile`, 'info');
    });
});

// ---------- MCP SIMULATOR ----------
const mcpQueries = {
    hipaa: {
        agent: { av: 'C', name: 'Enterprise Agent · Claude', client: 'Acting on behalf of Meridian Health Systems', cls: 'claude' },
        query: `"Find me a HIPAA-compliant digital marketing agency with SEO specialization in healthcare. Budget around $10K/month, US-based, hospital-system experience."`,
        request: `<span class="c">// Agent calls Clutch MCP tool</span>
<span class="k">clutch</span>.<span class="b">search_providers</span>({
  <span class="k">category</span>: <span class="s">"digital_marketing"</span>,
  <span class="k">specializations</span>: [<span class="s">"seo"</span>, <span class="s">"healthcare"</span>],
  <span class="k">compliance</span>: [<span class="s">"hipaa"</span>],
  <span class="k">budget_monthly_usd</span>: [<span class="n">8000</span>, <span class="n">12000</span>],
  <span class="k">location</span>: <span class="s">"US"</span>
})`,
        response: `{
  <span class="k">"matches"</span>: <span class="n">3</span>,
  <span class="k">"results"</span>: [
    {
      <span class="k">"provider"</span>: <span class="s">"SilverThread Technologies"</span>,
      <span class="k">"match_score"</span>: <span class="n">0.94</span>,
      <span class="k">"why_match"</span>: <span class="s">"12 verified healthcare projects, HIPAA certified, 4.8★"</span>,
      <span class="k">"verified_reviews"</span>: <span class="n">47</span>,
      <span class="k">"price_range"</span>: <span class="s">"$8K–$12K/mo"</span>,
      <span class="k">"citation"</span>: <span class="s">"clutch.co/profile/silverthread"</span>
    },
    <span class="c">// ...2 more</span>
  ],
  <span class="k">"referral_token"</span>: <span class="s">"clt_ref_8f3a2b"</span>,
  <span class="k">"monetization_event"</span>: <span class="b">true</span>
}`
    },
    shopify: {
        agent: { av: 'G', name: 'ChatGPT · Enterprise', client: 'Acting on behalf of Cascade Retail Co.', cls: 'gpt' },
        query: `"We run a Shopify store and need to migrate to headless. Health-ecommerce compliance matters. Who on Clutch has done this?"`,
        request: `<span class="c">// Agent calls Clutch MCP tool</span>
<span class="k">clutch</span>.<span class="b">recommend</span>({
  <span class="k">brief</span>: <span class="s">"Shopify to headless migration"</span>,
  <span class="k">industry</span>: <span class="s">"healthcare_ecommerce"</span>,
  <span class="k">project_type</span>: <span class="s">"platform_migration"</span>,
  <span class="k">require_past_work</span>: <span class="b">true</span>
})`,
        response: `{
  <span class="k">"matches"</span>: <span class="n">3</span>,
  <span class="k">"results"</span>: [
    {
      <span class="k">"provider"</span>: <span class="s">"NexaBuild Digital"</span>,
      <span class="k">"match_score"</span>: <span class="n">0.91</span>,
      <span class="k">"why_match"</span>: <span class="s">"6 Shopify migrations in regulated commerce, 4.6★ across 31 reviews"</span>,
      <span class="k">"past_projects"</span>: <span class="n">6</span>,
      <span class="k">"avg_timeline"</span>: <span class="s">"4.2 months"</span>
    },
    <span class="c">// ...2 more</span>
  ],
  <span class="k">"demand_signal_logged"</span>: <span class="b">true</span>,
  <span class="k">"monetization_event"</span>: <span class="b">true</span>
}`
    },
    compare: {
        agent: { av: 'E', name: 'Enterprise AI Agent', client: 'Custom procurement bot · Vertex Financial', cls: 'ent' },
        query: `"Compare the top 2 digital marketing agencies you found. I care most about timeliness and budget predictability."`,
        request: `<span class="c">// Agent calls Clutch MCP tool</span>
<span class="k">clutch</span>.<span class="b">compare_providers</span>({
  <span class="k">provider_ids</span>: [<span class="s">"silverthread_co"</span>, <span class="s">"nexabuild"</span>],
  <span class="k">dimensions</span>: [<span class="s">"timeliness"</span>, <span class="s">"budget_adherence"</span>],
  <span class="k">format</span>: <span class="s">"structured"</span>
})`,
        response: `{
  <span class="k">"comparison"</span>: {
    <span class="k">"silverthread_co"</span>: {
      <span class="k">"timeliness"</span>: <span class="n">4.1</span>,
      <span class="k">"budget_adherence"</span>: <span class="n">4.4</span>,
      <span class="k">"notable"</span>: <span class="s">"strong technical depth, slower discovery"</span>
    },
    <span class="k">"nexabuild"</span>: {
      <span class="k">"timeliness"</span>: <span class="n">4.7</span>,
      <span class="k">"budget_adherence"</span>: <span class="n">3.8</span>,
      <span class="k">"notable"</span>: <span class="s">"fast delivery, occasional scope expansion"</span>
    }
  },
  <span class="k">"recommendation"</span>: <span class="s">"nexabuild favored on timeliness; silverthread on budget"</span>,
  <span class="k">"monetization_event"</span>: <span class="b">true</span>
}`
    },
    reviews: {
        agent: { av: 'C', name: 'Claude · Research mode', client: 'Helping buyer validate a shortlist', cls: 'claude' },
        query: `"Pull sentiment breakdown for SilverThread — I want to know if communication is consistently strong across industries."`,
        request: `<span class="c">// Agent calls Clutch MCP tool</span>
<span class="k">clutch</span>.<span class="b">get_reviews</span>({
  <span class="k">provider_id</span>: <span class="s">"silverthread_co"</span>,
  <span class="k">with_sentiment</span>: <span class="b">true</span>,
  <span class="k">group_by</span>: <span class="s">"industry"</span>,
  <span class="k">category</span>: <span class="s">"communication"</span>
})`,
        response: `{
  <span class="k">"provider"</span>: <span class="s">"SilverThread Technologies"</span>,
  <span class="k">"communication_sentiment"</span>: {
    <span class="k">"healthcare"</span>: { <span class="k">"positive"</span>: <span class="n">0.96</span>, <span class="k">"n"</span>: <span class="n">14</span> },
    <span class="k">"fintech"</span>: { <span class="k">"positive"</span>: <span class="n">0.93</span>, <span class="k">"n"</span>: <span class="n">11</span> },
    <span class="k">"saas"</span>: { <span class="k">"positive"</span>: <span class="n">0.91</span>, <span class="k">"n"</span>: <span class="n">9</span> }
  },
  <span class="k">"overall"</span>: <span class="n">0.94</span>,
  <span class="k">"trend_6mo"</span>: <span class="s">"stable"</span>,
  <span class="k">"monetization_event"</span>: <span class="b">true</span>
}`
    }
};

let mcpCounter = 18427;
const mcpCounterEl = document.getElementById('mcpCounter');

function streamCode(el, html, delay = 6, done) {
    el.innerHTML = '';
    const strippedText = html.replace(/<[^>]+>/g, '');
    let i = 0;
    el.innerHTML = '<span class="cursor"></span>';
    const iv = setInterval(() => {
        i++;
        if (i >= strippedText.length) {
            clearInterval(iv);
            el.innerHTML = html;
            if (done) done();
            return;
        }
        // Render progressively — use substring of the styled html by approximating position
        const partial = substringHtml(html, i);
        el.innerHTML = partial + '<span class="cursor"></span>';
        el.scrollTop = el.scrollHeight;
    }, delay);
}

// helper: substring an html string by rendered char count, keeping tags intact
function substringHtml(html, n) {
    let out = '';
    let count = 0;
    let i = 0;
    while (i < html.length && count < n) {
        if (html[i] === '<') {
            const close = html.indexOf('>', i);
            if (close === -1) break;
            out += html.slice(i, close + 1);
            i = close + 1;
        } else {
            out += html[i];
            i++;
            count++;
        }
    }
    // close any open tags
    const openTags = [...out.matchAll(/<(\w+)[^>]*>/g)].map(m => m[1]);
    const closeTags = [...out.matchAll(/<\/(\w+)>/g)].map(m => m[1]);
    const stack = [];
    openTags.forEach(t => stack.push(t));
    closeTags.forEach(t => {
        const idx = stack.lastIndexOf(t);
        if (idx !== -1) stack.splice(idx, 1);
    });
    while (stack.length) out += `</${stack.pop()}>`;
    return out;
}

const mcpReqPanel = document.getElementById('mcpRequest');
const mcpResPanel = document.getElementById('mcpResponse');
const mcpAgentAv = document.getElementById('mcpAgentAv');
const mcpAgentName = document.getElementById('mcpAgentName');
const mcpAgentClient = document.getElementById('mcpAgentClient');
const mcpAgentQuery = document.getElementById('mcpAgentQuery');
const mcpRunBtn = document.getElementById('mcpRun');

let currentMcpKey = 'hipaa';

function loadMcpScenario(key) {
    const s = mcpQueries[key];
    currentMcpKey = key;
    mcpAgentAv.className = 'mcp-agent-av ' + s.agent.cls;
    mcpAgentAv.textContent = s.agent.av;
    mcpAgentName.textContent = s.agent.name;
    mcpAgentClient.textContent = s.agent.client;
    mcpAgentQuery.textContent = s.query;
    mcpReqPanel.innerHTML = s.request;
    mcpResPanel.innerHTML = '<div class="code-empty">Click <b style="color:var(--coral-2)">Run Query</b> to stream the live MCP response</div>';
}

document.querySelectorAll('[data-mcp-query]').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('[data-mcp-query]').forEach(b => b.classList.remove('on'));
        btn.classList.add('on');
        loadMcpScenario(btn.dataset.mcpQuery);
    });
});

mcpRunBtn.addEventListener('click', () => {
    if (mcpRunBtn.classList.contains('loading')) return;
    const s = mcpQueries[currentMcpKey];
    mcpRunBtn.classList.add('loading');
    // stream request
    mcpReqPanel.innerHTML = '<div class="code-empty" style="min-height:120px">Agent composing request...</div>';
    setTimeout(() => {
        streamCode(mcpReqPanel, s.request, 4, () => {
            mcpResPanel.innerHTML = '<div class="code-empty" style="min-height:120px">Clutch MCP resolving query...</div>';
            setTimeout(() => {
                streamCode(mcpResPanel, s.response, 3, () => {
                    mcpRunBtn.classList.remove('loading');
                    mcpCounter++;
                    mcpCounterEl.textContent = mcpCounter.toLocaleString();
                    toast('Monetization event logged · +$4.20 referral', 'info');
                });
            }, 400);
        });
    }, 300);
});

// Init with first scenario
loadMcpScenario('hipaa');
document.querySelector('[data-mcp-query="hipaa"]').classList.add('on');

// ---------- AGENT CHAT OVERLAY ----------
const chatOverlay = document.getElementById('chatOverlay');
const chatBody = document.getElementById('chatBody');
const floatPill = document.getElementById('floatPill');
const chatClose = document.getElementById('chatClose');
const chatRestart = document.getElementById('chatRestart');

floatPill.addEventListener('click', () => {
    chatOverlay.classList.add('on');
    if (!chatBody.dataset.started) {
        chatBody.dataset.started = '1';
        runChatScript();
    }
});
chatClose.addEventListener('click', () => chatOverlay.classList.remove('on'));
chatOverlay.addEventListener('click', e => { if (e.target === chatOverlay) chatOverlay.classList.remove('on'); });
chatRestart.addEventListener('click', () => {
    chatBody.innerHTML = '';
    runChatScript();
});

function addMsg(type, html, delay) {
    return new Promise(resolve => {
        setTimeout(() => {
            const msg = document.createElement('div');
            msg.className = 'msg ' + type;
            msg.innerHTML = `<div class="msg-bubble">${html}</div>`;
            chatBody.appendChild(msg);
            chatBody.scrollTop = chatBody.scrollHeight;
            resolve();
        }, delay);
    });
}
function addTyping(delay) {
    return new Promise(resolve => {
        setTimeout(() => {
            const t = document.createElement('div');
            t.className = 'msg bot typing-wrap';
            t.innerHTML = `<div class="msg-bubble typing"><span></span><span></span><span></span></div>`;
            chatBody.appendChild(t);
            chatBody.scrollTop = chatBody.scrollHeight;
            setTimeout(() => { t.remove(); resolve(); }, 1100);
        }, delay);
    });
}
function addProviderCard(data, delay) {
    return new Promise(resolve => {
        setTimeout(() => {
            const last = chatBody.lastElementChild;
            if (last && last.classList.contains('bot')) {
                const card = document.createElement('div');
                card.className = 'msg-provider';
                card.innerHTML = `
                    <div class="av ${data.cls}">${data.init}</div>
                    <div>
                        <div class="msg-provider-name">${data.name}</div>
                        <div class="msg-provider-score">★ ${data.rating} · ${data.score}% match · ${data.reviews} reviews</div>
                    </div>
                    <div class="msg-provider-arrow">→</div>
                `;
                card.addEventListener('click', () => {
                    toast(`Opening ${data.name} profile`, 'info');
                });
                last.querySelector('.msg-bubble').appendChild(card);
                chatBody.scrollTop = chatBody.scrollHeight;
            }
            resolve();
        }, delay);
    });
}

async function runChatScript() {
    await addMsg('bot', `Hi — I'm the Clutch concierge. Describe what you're looking for and I'll research trusted providers from 2M+ verified reviews.`, 100);
    await addTyping(800);
    await addMsg('user', `I need a HIPAA-compliant digital marketing agency with strong SEO, about $10K/month, US-based, ideally hospital-system experience.`, 200);
    await addTyping(700);
    await addMsg('system', `<span>▸</span> Querying clutch.search_providers · filtering 124,990 providers`, 200);
    await addTyping(900);
    await addMsg('bot', `Got it. Out of 124,990 providers, <b>3</b> clearly fit. Ranked by match strength against your brief, with reasoning from the actual review content:`, 200);
    await addProviderCard({ init: 'ST', cls: 'a', name: 'SilverThread Technologies', rating: '4.8', score: 94, reviews: 47 }, 300);
    await addProviderCard({ init: 'NX', cls: 'b', name: 'NexaBuild Digital', rating: '4.6', score: 87, reviews: 31 }, 200);
    await addProviderCard({ init: 'HP', cls: 'c', name: 'Helix Performance', rating: '4.7', score: 78, reviews: 58 }, 200);
    await addTyping(800);
    await addMsg('bot', `<b>Top pick: SilverThread.</b> 12 verified healthcare projects (8 with hospital systems), HIPAA-certified, reviews consistently praise SEO depth in regulated industries. Want a side-by-side comparison or shall I route an intro?`, 300);
}

// ---------- DEMAND GAP ROW CLICK ----------
document.querySelectorAll('[data-gap]').forEach(row => {
    row.addEventListener('click', () => {
        const gap = row.dataset.gap;
        toast(`Opening opportunity detail · ${gap}`, 'info');
    });
});

// ---------- MCP TOOL CARDS ----------
document.querySelectorAll('.mcp-tool').forEach(tool => {
    tool.addEventListener('click', () => {
        const name = tool.querySelector('.mcp-tool-name').textContent;
        toast(`${name} · view full tool schema`, 'info');
    });
});

// ---------- OPTIMIZATION SUGGESTIONS ----------
document.querySelectorAll('[data-action="apply"]').forEach(btn => {
    btn.addEventListener('click', () => {
        btn.textContent = '✓ Applied to profile';
        btn.style.background = 'var(--verified-dim)';
        btn.style.color = 'var(--verified)';
        toast('Profile updated · changes will propagate in 24h', 'success');
    });
});

// ---------- LIVE MCP COUNTER (subtle increment) ----------
setInterval(() => {
    if (Math.random() < 0.3) {
        mcpCounter += Math.floor(Math.random() * 3) + 1;
        mcpCounterEl.textContent = mcpCounter.toLocaleString();
    }
}, 3500);

// =========================================================
// PRODUCT WALKTHROUGH — explains what each surface does
// =========================================================
const tourSteps = [
    {
        target: '.hero h1',
        title: "Clutch's AI Data Layer — Two Audiences, One System",
        audience: "Both audiences",
        audienceCls: "both",
        desc: "Clutch has 2M+ verified reviews. <b>Two totally different buyers need that data:</b><br>① Buyers who <em>visit clutch.co</em> (today's audience)<br>② Buyers who <em>ask AI agents instead</em> of going to websites (tomorrow's — and currently invisible to Clutch)",
        why: "Today, a buyer who asks ChatGPT for an agency gets a random answer. Clutch makes $0 on them. This prototype shows one data layer that captures <b>both</b> audiences, plus a provider-side loop to close demand gaps.",
        before: () => window.scrollTo({ top: 0, behavior: 'smooth' }),
        delay: 700
    },
    {
        target: '.popular',
        title: "Natural-Language Matching (on Clutch.co)",
        audience: "For buyers who visit clutch.co",
        audienceCls: "on-clutch",
        desc: "For Audience ①: buyers who already come to clutch.co. Instead of clicking through eight filter dropdowns, they describe their project in plain English. The AI reads the brief and ranks the best-fit providers.",
        why: "Keeps existing Clutch traffic converting better. Same buyers, less friction, higher-quality matches — and the engine learns from which matches actually close.",
        try: "The walkthrough will auto-fill a HIPAA brief and run the match for you.",
        before: () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setTimeout(() => {
                const chip = document.querySelector('.chip-search[data-preset="hipaa"]') || document.querySelector('.chip-search');
                if (chip) chip.click();
            }, 600);
        },
        delay: 900
    },
    {
        target: '.match-card.top',
        title: "Ranked Providers, with Reasoning",
        audience: "For buyers who visit clutch.co",
        audienceCls: "on-clutch",
        desc: "Each match shows a score, verified-review count, and a plain-english <b>why</b> — extracted from actual review content, not keyword overlap.",
        why: "Key point: the <b>same reasoning</b> is what an external AI agent receives in step 6. One engine, two audiences.",
        try: "The walkthrough will click <b>Get Matched</b> and scroll to the top result.",
        before: () => {
            // Ensure input has content
            const input = document.getElementById('matchInput');
            if (input && !input.value) {
                const chip = document.querySelector('.chip-search[data-preset="hipaa"]') || document.querySelector('.chip-search');
                if (chip) chip.click();
            }
            const resultsShown = document.getElementById('results').classList.contains('on');
            if (!resultsShown) {
                // Scroll up so they see the match button, then click it
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setTimeout(() => {
                    const btn = document.getElementById('matchBtn');
                    if (btn && !btn.classList.contains('loading')) btn.click();
                }, 600);
            }
            setTimeout(() => {
                const el = document.querySelector('.match-card.top');
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, resultsShown ? 300 : 1800);
        },
        delay: 2400
    },
    {
        target: '.eco',
        title: "One System, Two Audiences + Supply Loop",
        audience: "How it fits together",
        audienceCls: "both",
        desc: "Review Intelligence structures every review into signal. That signal powers both the on-site matching (Audience ①) and the MCP Agent Layer (Audience ②). Provider Demand closes the loop on the supply side.",
        why: "Each piece is more valuable because the others exist. <b>One data investment, two revenue channels</b> — the website and the agent layer — plus provider-side upsell.",
        before: () => {
            const el = document.querySelector('.eco');
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        },
        delay: 700
    },
    {
        target: '.mcp-wrap',
        title: "MCP Agent Layer — For Buyers Who Never Visit Clutch",
        audience: "For buyers who ask AI instead of visiting websites",
        audienceCls: "off-clutch",
        desc: "For Audience ②: a buyer asks Claude or ChatGPT \"find me a HIPAA-compliant marketing agency.\" The AI queries <b>Clutch's MCP server</b> in the background. Clutch sends back verified-review-backed matches. The buyer gets a great recommendation — and never had to visit clutch.co.",
        why: "Today, that buyer is <b>invisible to Clutch</b>. They ask ChatGPT, get a random answer, Clutch makes $0. MCP captures them — Clutch is the data behind the AI's answer, and the agent routes a paid lead back.",
        before: () => {
            const el = document.querySelector('.mcp-wrap');
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        },
        delay: 700
    },
    {
        target: '#mcpRun',
        title: "Watch a Real Agent Query",
        audience: "For buyers who ask AI instead of visiting websites",
        audienceCls: "off-clutch",
        desc: "A buyer at a hospital system asks their AI assistant for a marketing agency. The agent calls Clutch's MCP server. You'll see the request go out, and verified matches stream back — each one cites the real Clutch reviews it came from.",
        why: "<b>How the monetization works:</b> same lead-gen model as today — providers pay Clutch for verified buyer intent. New thing: that intent is now being generated by a buyer who <em>never visited the website</em>. Every qualifying agent query is an additional paid lead Clutch wouldn't have earned otherwise. This is net-new revenue, not cannibalized revenue.",
        try: "We'll click Run Query. Watch the request stream out — then the structured response stream back.",
        before: () => {
            const resp = document.getElementById('mcpResponse');
            const isEmpty = resp && resp.querySelector('.code-empty');
            if (isEmpty) {
                setTimeout(() => {
                    const btn = document.getElementById('mcpRun');
                    if (btn && !btn.classList.contains('loading')) btn.click();
                }, 600);
            }
        },
        delay: 900
    },
    {
        target: '#reviews',
        title: "Review Intelligence — Powers Both Audiences",
        audience: "The foundation under both audiences",
        audienceCls: "foundation",
        desc: "Every verified review is parsed into structured signal — sentiment by category, themes, six-month trends, fraud detection.",
        why: "This layer is what makes the on-site matching AND the agent answers trustworthy. Without it, neither audience gets good recommendations.",
        before: () => {
            const el = document.getElementById('reviews');
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        },
        delay: 700
    },
    {
        target: '#demand',
        title: "Provider Demand Intelligence",
        audience: "For providers (supply-side loop)",
        audienceCls: "providers",
        desc: "Every search — from Audience ① or ② — becomes a demand signal. Providers see where buyer demand exceeds supply (e.g. <b>20 buyers searched Shopify-in-healthcare; only 3 providers match</b>) and get AI-suggested profile actions.",
        why: "Closes the loop. Supply catches up to demand, match quality compounds for both audiences, and Clutch+ upsells get justified with real data instead of vibes.",
        before: () => {
            const el = document.getElementById('demand');
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        },
        delay: 700
    },
    {
        target: '#floatPill',
        title: "Concierge Chat (Third Surface)",
        audience: "Optional concierge for either audience",
        audienceCls: "both",
        desc: "A chat concierge embedded on clutch.co. Same MCP tools underneath, conversational front-door. A buyer types their brief, the concierge researches with Clutch's data and returns matches.",
        why: "One backend, three front-doors: website matching, external AI agents, and this concierge. Same data investment pays off everywhere.",
        try: "We'll open the concierge so you can see the scripted research flow in action.",
        before: () => {
            // Idempotent: only open if not already open
            const chat = document.getElementById('chatOverlay');
            if (chat && !chat.classList.contains('on')) {
                setTimeout(() => {
                    const pill = document.getElementById('floatPill');
                    if (pill) pill.click();
                }, 500);
            }
        },
        delay: 700
    },
    {
        target: '.close',
        title: "Three Strategic Wins",
        audience: "The platform thesis",
        audienceCls: "both",
        desc: "<b>① Better conversion on existing traffic</b> — natural-language matching lifts Audience ①.<br><b>② Capture previously invisible buyers</b> — MCP unlocks Audience ②.<br><b>③ Defensible moat</b> — 2M+ verified reviews + structured intelligence compounds over time.",
        why: "Not a feature roadmap. A platform thesis: Clutch becomes the data layer behind B2B buying decisions <em>everywhere</em> — not just on clutch.co.",
        before: () => {
            const chat = document.getElementById('chatOverlay');
            if (chat && chat.classList.contains('on')) chat.classList.remove('on');
            setTimeout(() => {
                const el = document.querySelector('.close');
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 400);
        },
        delay: 900
    }
];

let tourIdx = 0;
const tourOverlay = document.getElementById('tourOverlay');
const tourStart = document.getElementById('tourStart');
const tourExit = document.getElementById('tourExit');
const tourNext = document.getElementById('tourNext');
const tourBack = document.getElementById('tourBack');
const tourSpot = document.getElementById('tourSpot');
const tourTip = document.getElementById('tourTip');
const tourStepNum = document.getElementById('tourStepNum');
const tourTitle = document.getElementById('tourTitle');
const tourAudience = document.getElementById('tourAudience');
const tourDesc = document.getElementById('tourDesc');
const tourWhy = document.getElementById('tourWhy');
const tourTry = document.getElementById('tourTry');
const tourProgress = document.getElementById('tourProgress');

function openTour() {
    // Resume from where the user left off, if there was a prior session
    const saved = parseInt(sessionStorage.getItem('tourIdx') || '0', 10);
    tourIdx = (Number.isFinite(saved) && saved >= 0 && saved < tourSteps.length) ? saved : 0;
    tourOverlay.classList.add('on');
    tourStart.classList.add('hidden');
    showTourStep(tourIdx);
}
function closeTour() {
    tourOverlay.classList.remove('on');
    tourStart.classList.remove('hidden');
    const saved = parseInt(sessionStorage.getItem('tourIdx') || '0', 10);
    const label = (saved > 0 && saved < tourSteps.length - 1) ? `▸ Resume Walkthrough · ${saved + 1}/${tourSteps.length}` : 'How It Works';
    tourStart.querySelector('span:last-child').textContent = label;
}
function restartTour() {
    sessionStorage.removeItem('tourIdx');
    tourIdx = 0;
    showTourStep(0);
}

function showTourStep(i) {
    const step = tourSteps[i];
    if (!step) return;

    // Always expand when advancing steps
    expandTour();

    // Persist current position so closing + reopening resumes here
    sessionStorage.setItem('tourIdx', i);

    // Run before hook
    if (step.before) step.before();

    // Update text
    tourStepNum.textContent = `${i + 1} of ${tourSteps.length}`;
    tourTitle.textContent = step.title;

    // Audience tag (swap class each time so the color matches)
    tourAudience.className = 'tour-audience';
    if (step.audience) {
        tourAudience.textContent = step.audience;
        tourAudience.classList.add('on');
        if (step.audienceCls) tourAudience.classList.add(step.audienceCls);
    }

    tourDesc.innerHTML = step.desc || '';
    tourWhy.innerHTML = step.why || '';
    tourWhy.style.display = step.why ? 'block' : 'none';
    if (step.try) {
        tourTry.innerHTML = step.try;
        tourTry.classList.add('on');
    } else {
        tourTry.innerHTML = '';
        tourTry.classList.remove('on');
    }
    tourProgress.style.width = ((i + 1) / tourSteps.length * 100) + '%';

    // Update nav buttons
    tourBack.disabled = i === 0;
    tourNext.textContent = i === tourSteps.length - 1 ? 'Done ✓' : 'Next →';

    // Position spotlight + tooltip
    const delay = step.delay || 200;
    setTimeout(() => positionTour(step.target), delay);
}

function positionTour(targetSelector) {
    if (!targetSelector) {
        // No target — just show dim, hide spotlight
        tourSpot.classList.add('center');
        tourSpot.style.top = '50%';
        tourSpot.style.left = '50%';
        tourSpot.style.width = '0';
        tourSpot.style.height = '0';
        return;
    }

    const target = document.querySelector(targetSelector);
    if (!target) return;

    const raw = target.getBoundingClientRect();
    const pad = 14;
    const vh = window.innerHeight;
    const vw = window.innerWidth;

    // Cap spotlight height so big sections still show the dim around them
    const maxSpotH = Math.min(vh * 0.65, 480);
    const spotTop = Math.max(raw.top - pad, 8);
    const spotBottom = Math.min(raw.bottom + pad, vh - 8);
    const spotH = Math.min(spotBottom - spotTop, maxSpotH);
    const spotLeft = Math.max(raw.left - pad, 8);
    const spotRight = Math.min(raw.right + pad, vw - 8);
    const spotW = spotRight - spotLeft;

    tourSpot.classList.remove('center');
    tourSpot.style.top = spotTop + 'px';
    tourSpot.style.left = spotLeft + 'px';
    tourSpot.style.width = spotW + 'px';
    tourSpot.style.height = spotH + 'px';

    // Tooltip is fixed to bottom-right via CSS — no JS positioning needed
}

const tourMiniPill = document.getElementById('tourMiniPill');
const tourMiniStep = document.getElementById('tourMiniStep');
const tourMiniTitle = document.getElementById('tourMiniTitle');

function minimizeTour() {
    tourTip.classList.add('minimized');
    tourMiniStep.textContent = tourStepNum.textContent;
    tourMiniTitle.textContent = tourTitle.textContent;
    tourMiniPill.classList.add('on');
}
function expandTour() {
    tourTip.classList.remove('minimized');
    tourMiniPill.classList.remove('on');
}

function toggleCompact() {
    tourTip.classList.toggle('compact');
    const btn = document.getElementById('tourCompact');
    btn.title = tourTip.classList.contains('compact') ? 'Expand to full view' : 'Shrink to compact view';
}

tourStart.addEventListener('click', openTour);
tourExit.addEventListener('click', () => { expandTour(); closeTour(); });
document.getElementById('tourMin').addEventListener('click', minimizeTour);
document.getElementById('tourCompact').addEventListener('click', toggleCompact);
document.getElementById('tourExpand').addEventListener('click', expandTour);
document.getElementById('tourRestart').addEventListener('click', restartTour);
tourNext.addEventListener('click', () => {
    if (tourIdx < tourSteps.length - 1) {
        tourIdx++;
        showTourStep(tourIdx);
    } else {
        closeTour();
    }
});
tourBack.addEventListener('click', () => {
    if (tourIdx > 0) {
        tourIdx--;
        showTourStep(tourIdx);
    }
});

// Keyboard shortcuts for tour
document.addEventListener('keydown', e => {
    if (!tourOverlay.classList.contains('on')) return;
    if (e.key === 'ArrowRight' || e.key === 'Enter') tourNext.click();
    if (e.key === 'ArrowLeft') tourBack.click();
    if (e.key === 'Escape') closeTour();
});

// Reposition spotlight on scroll / resize (debounced)
let repositionTimeout;
function reposition() {
    clearTimeout(repositionTimeout);
    repositionTimeout = setTimeout(() => {
        if (tourOverlay.classList.contains('on')) {
            const step = tourSteps[tourIdx];
            if (step && step.target) positionTour(step.target);
        }
    }, 100);
}
window.addEventListener('scroll', reposition, { passive: true });
