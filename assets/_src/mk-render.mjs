// Generates render.json for the kit (node mk-render.mjs), keeping the long HTML bodies readable.
// Then: node D:/shaker-github/_kit/render.mjs render.json
import fs from 'fs';

const BG = `body{background:radial-gradient(1100px 650px at 85% 10%,#c3a26a40,transparent 60%),radial-gradient(900px 600px at 5% 95%,#8c6e4040,transparent 60%),linear-gradient(160deg,#1a120b 0%,#24180f 55%,#140e08 100%)!important}
.title{font-family:Georgia,'Times New Roman',serif;letter-spacing:-.01em}
.muted{opacity:.8}
.bw{border-radius:14px;overflow:hidden;background:#11141b;box-shadow:0 0 0 1px #ffffff1a,0 40px 80px -30px #000d,0 0 120px -40px #c3a26a66}
.bw .bar{height:30px;display:flex;align-items:center;gap:7px;padding:0 12px;background:#221a12}
.bw .bar i{width:10px;height:10px;border-radius:50%;background:#ff5f57}.bw .bar i:nth-child(2){background:#febc2e}.bw .bar i:nth-child(3){background:#28c840}
.bw img{display:block;width:100%}
.cap{font-size:18px;font-weight:600;opacity:.85;margin-top:12px;text-align:center}
.land{position:relative;border-radius:46px;background:#1b1d22;padding:14px;box-shadow:0 0 0 2px #3a3d45,0 40px 80px -20px #000c,0 0 120px -30px #c3a26a66}
.land img{display:block;border-radius:34px;width:100%}
.box{border:1px solid #e3c48f55;background:#ffffff0a;border-radius:16px;padding:14px 16px;font-size:17px;line-height:1.35}
.box b{display:block;font-size:20px;color:#e3c48f;margin-bottom:4px}
.lab{font-size:15px;letter-spacing:.14em;text-transform:uppercase;color:#e3c48f;font-weight:700}
.arrow{color:#e3c48f;font-size:22px;text-align:center;line-height:1}
.photo{border-radius:14px;overflow:hidden;box-shadow:0 0 0 1px #ffffff1a,0 30px 60px -25px #000d}.photo img{display:block;width:100%;height:100%;object-fit:cover}`;

// Paths in html bodies are resolved by Chrome relative to the temp html in assets/.render/
const U = n => `../_src/screens/${n}.jpg`;
const P = n => `screens/${n}.jpg`; // paths for kit builders (relative to this config)
const bw = (n, extra = '') => `<div class="bw" style="${extra}"><div class="bar"><i></i><i></i><i></i></div><img src="${U(n)}"></div>`;

const images = [
  { type: 'banner', file: 'banner.png', css: BG, kicker: 'Product case study · دوات',
    subtitle: 'A real board-game product and its web platform: sales site, playable demo with a card-playing AI, orders and dashboard.',
    screens: [P('m-hero-ar'), P('m-table-senet-upright'), P('m-cards-ar')], devices: ['android', 'iphone', 'android'],
    chips: ['Next.js 15', 'TypeScript', 'Prisma', 'Game AI', 'Arabic · English'] },
  { type: 'web', file: 'web-landing.png', css: BG, title: 'The sales site — Arabic first, English too',
    screens: [P('web-hero-en'), P('m-order-ar')], sideDevice: 'iphone', height: 1000 },
  { type: 'html', file: 'web-tour.png', css: BG, width: 1600, height: 1230, body: `<div class="grid-bg"></div>
    <div style="position:absolute;inset:0;padding:46px 70px;display:flex;flex-direction:column;gap:28px">
      <div class="title" style="font-size:42px;text-align:center">One page that sells a box</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:30px 40px">
        <div>${bw('web-box-en')}<div class="cap">What is in the box — product renders</div></div>
        <div>${bw('web-games-en')}<div class="cap">Two games, one box</div></div>
        <div>${bw('web-cards-en')}<div class="cap">8 Heka cards, bilingual, zoomable</div></div>
        <div>${bw('web-order-en')}<div class="cap">Cash-on-delivery order form</div></div>
      </div></div>` },
  { type: 'web', file: 'play-senet.png', css: BG, title: 'Senet against the computer — in the browser',
    screens: [P('web-senet-mid'), P('m-table-senet-upright')], sideDevice: 'iphone', height: 1000 },
  { type: 'html', file: 'play-tjau.png', css: BG, width: 1600, height: 1000, body: `<div class="grid-bg"></div>
    <div style="position:absolute;inset:0;padding:50px 70px;display:flex;flex-direction:column;align-items:center;gap:36px">
      <div class="title" style="font-size:42px">Tjau — the twenty squares, desktop and phone</div>
      <div style="position:relative;width:1180px">${bw('web-tjau-mid')}
        <div class="land" style="position:absolute;right:-60px;bottom:-60px;width:600px"><img src="${U('m-table-tjau-landscape')}"></div></div>
    </div>` },
  { type: 'gallery', file: 'mobile.png', css: BG, title: 'On a phone it behaves like an app', device: 'mixed', cols: 5,
    screens: [P('m-hero-ar'), P('m-box-ar'), P('m-games-ar'), P('m-cards-ar'), P('m-order-ar')] },
  { type: 'html', file: 'feature-heka-ai.png', css: BG, width: 1600, height: 900, body: `<div class="grid-bg"></div>
    <div style="position:absolute;inset:0;display:flex;align-items:center;gap:56px;padding:0 70px">
      <div style="width:540px;display:flex;flex-direction:column;gap:22px;flex:none">
        <div class="accent" style="font-size:22px;font-weight:700">Signature feature</div>
        <div class="title" style="font-size:52px;line-height:1.05">A computer that knows when a card matters</div>
        <div style="display:flex;flex-direction:column;gap:13px;font-size:21px;opacity:.9;line-height:1.35">
          <div>— Easy: weighs a card on a copy of the table — targets, the board it leaves, turns won or lost</div>
          <div>— Medium / Hard: plays the match to the end 40 / 100 times, with and without the card, same dice in both branches</div>
          <div>— Won 64% of 160 matches against the old always-reveal computer; ~0.5 s per decision in the browser</div>
          <div>— The card it plays stays on screen with a spotlight, long enough to read</div>
        </div></div>
      <div style="flex:1">${bw('web-senet-ai-card')}<div class="cap">Real capture: the computer reveals “Grip of Apophis” mid-match</div></div>
    </div>` },
  { type: 'html', file: 'product.png', css: BG, width: 1600, height: 980, body: `<div class="grid-bg"></div>
    <div style="position:absolute;inset:0;padding:46px 70px;display:flex;flex-direction:column;gap:26px">
      <div style="text-align:center"><div class="title" style="font-size:42px">The physical product behind the site</div>
        <div class="muted" style="font-size:20px;margin-top:8px">Box, two boards, cones & spools, throw sticks, 8 Heka cards, bilingual rule sheets — 3D renders from the print and factory files</div></div>
      <div style="display:grid;grid-template-columns:2fr 1fr 1fr;grid-template-rows:1fr 1fr;gap:20px;flex:1">
        <div class="photo" style="grid-row:span 2"><img src="${U('render-lid')}"></div>
        <div class="photo"><img src="${U('render-senet')}"></div>
        <div class="photo"><img src="${U('render-tjau')}"></div>
        <div class="photo"><img src="${U('render-cards')}"></div>
        <div class="photo"><img src="${U('render-everything')}"></div>
      </div></div>` },
  { type: 'html', file: 'architecture.png', css: BG, width: 1600, height: 790, body: `<div class="grid-bg"></div>
    <div style="position:absolute;inset:0;padding:40px 70px;display:flex;flex-direction:column;gap:16px">
      <div class="title" style="font-size:40px;text-align:center">Architecture — one rules engine, two places it runs</div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px">
        <div class="box"><b>Landing & orders</b>Story, box, games, cards, FAQ · cash-on-delivery form · cities per governorate · invoice e-mail</div>
        <div class="box"><b>Playable demo</b>vs computer (3 levels) · two on one device · online · Heka cards on/off · WebAudio sounds</div>
        <div class="box"><b>Owner dashboard</b>Prices, trials, shipping table, tracker ids, content · orders · funnel analytics</div>
      </div>
      <div class="arrow">▼</div>
      <div style="display:grid;grid-template-columns:1.35fr 1fr;gap:16px">
        <div class="box" style="border-color:#e3c48f"><b>apps/web — Next.js 15 · next-intl · Tailwind 4 · zod at every boundary</b>features/: landing · demo · online · orders · players · settings · analytics · admin<br>Online: the server throws the sticks and keeps face-down cards; browsers poll ~1 s</div>
        <div class="box"><b>Players & trials</b>Signed device cookie · 6-digit e-mail code (hashed, 15 min, 5 tries, rate-limited) · trials counted on the server</div>
      </div>
      <div class="arrow">▼</div>
      <div class="lab" style="text-align:center">Pure TypeScript packages — no React, no I/O, unit-tested</div>
      <div style="display:grid;grid-template-columns:1.2fr 1fr 1fr 1fr;gap:16px">
        <div class="box" style="border-color:#e3c48f"><b>@duat/match</b>One pure reducer for a match with cards · computer player · card rollouts</div>
        <div class="box"><b>@duat/senet</b>30-square board, rule sets, throw sticks, AI, puzzles, replay</div>
        <div class="box"><b>@duat/tjau</b>Egyptian board (16) & Board of Ur (14), rule sets, AI</div>
        <div class="box"><b>@duat/heka</b>The 8 printed cards in AR/EN, generated from the print source</div>
      </div>
      <div class="arrow">▼</div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px">
        <div class="box"><b>Prisma → MySQL</b>TiDB for the hosted demo · settings, orders, players, trials, matches, funnel</div>
        <div class="box"><b>Vercel</b>Demo hosting · Vercel Analytics</div>
        <div class="box"><b>SMTP mail · consent-gated trackers</b>GA4, Clarity and pixels load only after the cookie banner</div>
      </div></div>` },
];

const cfg = {
  outDir: '..',
  brand: { name: 'DUAT', tagline: 'Two board games of ancient Egypt in one box.', accent: '#c3a26a', accent2: '#8c6e40', logo: 'icon.svg', dark: true },
  images,
};
fs.writeFileSync(new URL('./render.json', import.meta.url), JSON.stringify(cfg, null, 2));
console.log('render.json written:', images.length, 'images');
