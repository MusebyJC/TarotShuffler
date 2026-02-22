// R1 Tarot Deck Shuffler — Multi-Deck Edition with iOS Wheel Picker (Local Assets)

//
// ASSET LOADING (Vite)
// ------------------------------------------------------------
// Folder convention (per deck):
// src/assets/decks/<deckId>/thumb.jpg
// src/assets/decks/<deckId>/image/00.jpg ... 77.jpg
//
const LOCAL_ASSETS = import.meta.glob(
  './assets/decks/**/{thumb.{jpg,jpeg,png,JPG,JPEG,PNG},back.{jpg,jpeg,png,JPG,JPEG,PNG},image/*.{jpg,jpeg,png,JPG,JPEG,PNG},images/*.{jpg,jpeg,png,JPG,JPEG,PNG}}',
  { eager: true, query: '?url', import: 'default' }
);

function localAsset(path) {
  const v = LOCAL_ASSETS[path];
  return (typeof v === 'string' && v.length > 0) ? v : null;
}

function deckThumb(deckId) {
  return (
    localAsset(`./assets/decks/${deckId}/thumb.jpg`) ||
    localAsset(`./assets/decks/${deckId}/thumb.png`)
  );
}

function deckBack(deckId) {
  return (
    localAsset(`./assets/decks/${deckId}/back.jpg`) ||
    localAsset(`./assets/decks/${deckId}/back.jpeg`) ||
    localAsset(`./assets/decks/${deckId}/back.png`)
  );
}

function deckCardImage(deckId, idx) {
  const n1 = String(idx);                 // "7"
  const n2 = String(idx).padStart(2, '0'); // "07"

  const bases = [
    `./assets/decks/${deckId}/image/${n1}`,
    `./assets/decks/${deckId}/image/${n2}`,
    `./assets/decks/${deckId}/images/${n1}`,
    `./assets/decks/${deckId}/images/${n2}`,
  ];

  const exts = ['.jpg', '.jpeg', '.png', '.JPG', '.JPEG', '.PNG'];

  for (const b of bases) {
    for (const e of exts) {
      const u = localAsset(b + e);
      if (u) return u;
    }
  }
  return null;
}

// ------------------------------------------------------------
// DECK DEFINITIONS
// ------------------------------------------------------------

// --- Primordial Tarot (Tarot of the Origins naming) ---
const PT_MAJOR_NAMES = [
  'The Fool', 'The Magician', 'The Great Mother', 'The Mother', 'The Father',
  'The Shaman', 'Union', 'The Chariot', 'Abundance', 'The Hermit',
  'Time', 'Creative Power', 'Sacrifice', 'Death', 'Source',
  'Demon', 'Menhir', 'The Star', 'The Moon', 'The Sun',
  'The Prey', 'The World'
];

const PT_SUITS = [
  { key: 'nature', display: 'Nature' },
  { key: 'soul', display: 'Soul' },
  { key: 'blood', display: 'Blood' },
  { key: 'jewels', display: 'Jewels' }
];

const PT_COURT = ['Child', 'Animal', 'Woman', 'Man'];

function buildPrimordialDeck() {
  const deck = [];
  PT_MAJOR_NAMES.forEach((name, i) => deck.push({ name, type: 'major', number: i, image: null }));
  PT_SUITS.forEach(suit => {
    for (let n = 1; n <= 10; n++) deck.push({ name: `${n} of ${suit.display}`, type: 'minor', suit: suit.display, image: null });
    PT_COURT.forEach(court => deck.push({ name: `${court} of ${suit.display}`, type: 'minor', suit: suit.display, image: null }));
  });
  return deck;
}

// --- Standard 78-card deck builder (RWS naming) ---
const STD_MAJOR = [
  'The Fool', 'The Magician', 'The High Priestess', 'The Empress', 'The Emperor',
  'The Hierophant', 'The Lovers', 'The Chariot', 'Strength', 'The Hermit',
  'Wheel of Fortune', 'Justice', 'The Hanged Man', 'Death', 'Temperance',
  'The Devil', 'The Tower', 'The Star', 'The Moon', 'The Sun',
  'Judgement', 'The World'
];

const STD_SUITS = ['Wands', 'Cups', 'Swords', 'Pentacles'];
const STD_RANKS = ['Ace','Two','Three','Four','Five','Six','Seven','Eight','Nine','Ten','Page','Knight','Queen','King'];

function buildStandardDeck() {
  const deck = [];
  STD_MAJOR.forEach((name, i) => deck.push({ name, type: 'major', number: i, image: null }));
  STD_SUITS.forEach(suit => {
    STD_RANKS.forEach(rank => deck.push({ name: `${rank} of ${suit}`, type: 'minor', suit, image: null }));
  });
  return deck;
}

// --- Builders that attach local numbered images (00..77) ---
function buildStandardDeckNumberedImages(deckId) {
  const deck = buildStandardDeck();
  return deck.map((card, idx) => ({ ...card, image: deckCardImage(deckId, idx) }));
}

function buildPrimordialDeckNumberedImages(deckId = 'primordial') {
  const deck = buildPrimordialDeck();
  return deck.map((card, idx) => ({ ...card, image: deckCardImage(deckId, idx) }));
}

// ------------------------------------------------------------
// DECK REGISTRY
// ------------------------------------------------------------
// NOTE: These IDs must match folder names under src/assets/decks/<id>/...
const DECK_LIST = [
  { id: 'lightseer', name: "Light Seer's", thumb: deckThumb('lightseer'), build: () => buildStandardDeckNumberedImages('lightseer'), hasImages: true },

  { id: 'hermetic', name: 'The Hermetic', thumb: deckThumb('hermetic'), build: () => buildStandardDeckNumberedImages('hermetic'), hasImages: true },
  { id: 'eightbit', name: '8-Bit', thumb: deckThumb('eightbit'), build: () => buildStandardDeckNumberedImages('eightbit'), hasImages: true },
  { id: 'crow', name: 'The Crow', thumb: deckThumb('crow'), build: () => buildStandardDeckNumberedImages('crow'), hasImages: true },
  { id: 'goldenthread', name: 'The Golden Thread', thumb: deckThumb('goldenthread'), build: () => buildStandardDeckNumberedImages('goldenthread'), hasImages: true },
  { id: 'darkexact', name: 'Dark Exact', thumb: deckThumb('darkexact'), build: () => buildStandardDeckNumberedImages('darkexact'), hasImages: true },
  { id: 'etherealvisions', name: 'Ethereal Visions', thumb: deckThumb('etherealvisions'), build: () => buildStandardDeckNumberedImages('etherealvisions'), hasImages: true },
  { id: 'fantasticalcreatures', name: 'Fantastical Creatures', thumb: deckThumb('fantasticalcreatures'), build: () => buildStandardDeckNumberedImages('fantasticalcreatures'), hasImages: true },
  { id: 'fengshui', name: 'Feng Shui', thumb: deckThumb('fengshui'), build: () => buildStandardDeckNumberedImages('fengshui'), hasImages: true },
  { id: 'loverspath', name: "Lovers' Path", thumb: deckThumb('loverspath'), build: () => buildStandardDeckNumberedImages('loverspath'), hasImages: true },
  { id: 'mysticalmoments', name: 'Mystical Moments', thumb: deckThumb('mysticalmoments'), build: () => buildStandardDeckNumberedImages('mysticalmoments'), hasImages: true },
  { id: 'tapestry', name: 'Tapestry', thumb: deckThumb('tapestry'), build: () => buildStandardDeckNumberedImages('tapestry'), hasImages: true },

  { id: 'primordial', name: 'Primordial', thumb: deckThumb('primordial'), build: () => buildPrimordialDeckNumberedImages('primordial'), hasImages: true }
];

const DECKS_MAP = {};
DECK_LIST.forEach(d => DECKS_MAP[d.id] = d);

// ------------------------------------------------------------
// SECURE RANDOM SHUFFLE (crypto)
// ------------------------------------------------------------
function secureRandom() {
  const arr = new Uint32Array(1);
  (window.crypto || window.msCrypto).getRandomValues(arr);
  return arr[0] / (0xFFFFFFFF + 1);
}

function shuffleDeck(deck) {
  const shuffled = deck.map(card => ({ ...card, reversed: secureRandom() < 0.5 }));
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(secureRandom() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// ------------------------------------------------------------
// SESSION STORAGE (Rabbit creationStorage)
// ------------------------------------------------------------
async function saveSession(data) {
  try {
    if (window.creationStorage) {
      await window.creationStorage.plain.setItem('tarot_session', btoa(JSON.stringify(data)));
    }
  } catch { /* silent */ }
}

async function loadSession() {
  try {
    if (window.creationStorage) {
      const s = await window.creationStorage.plain.getItem('tarot_session');
      if (s) return JSON.parse(atob(s));
    }
  } catch { /* silent */ }
  return null;
}

// ------------------------------------------------------------
// APP STATE
// ------------------------------------------------------------
let currentDeckIdx = 0;
let fullDeck = [];
let shuffledDeck = [];
let drawnCards = [];
let pullCount = 3;
let viewIndex = 0;
let screen = 'picker'; // picker | grid | spread | card

const PULL_OPTIONS = Array.from({ length: 20 }, (_, i) => i + 1); // 1..20
const app = document.getElementById('app');

// ------------------------------------------------------------
// FALLBACK SYMBOLS
// ------------------------------------------------------------
const PT_MAJOR_SYMBOLS = ['🥚','✨','🌍','🤱','👤','🔮','💞','☸️','🌾','🏔️','⏳','⚡','🗡️','💀','💧','👹','🪨','⭐','🌙','☀️','🦌','🌎'];
const STD_MAJOR_SYMBOLS = ['🃏','✨','🌙','👑','🏛️','📿','❤️','⚔️','🦁','🏔️','☸️','⚖️','🔄','💀','🏺','😈','🗼','⭐','🌙','☀️','📯','🌎'];

const SUIT_SYMBOLS = {
  Wands: '🪄', Cups: '🏆', Swords: '⚔️', Pentacles: '⭐',
  Nature: '🌿', Soul: '👁️', Blood: '🩸', Jewels: '💎'
};

function getCardSymbol(card, deckId) {
  if (card.type === 'major') {
    if (deckId === 'primordial') return PT_MAJOR_SYMBOLS[card.number] || '🔮';
    return STD_MAJOR_SYMBOLS[card.number] || '🔮';
  }
  return SUIT_SYMBOLS[card.suit] || '🃏';
}

// ------------------------------------------------------------
// INIT
// ------------------------------------------------------------
async function init() {
  const session = await loadSession();
  if (session && session.deckIdx !== undefined && DECK_LIST[session.deckIdx]) {
    currentDeckIdx = session.deckIdx;
    pullCount = session.pullCount || 3;
    if (session.drawnCards && session.drawnCards.length > 0) {
      drawnCards = session.drawnCards;
      viewIndex = session.viewIndex || 0;
      fullDeck = DECK_LIST[currentDeckIdx].build();
      renderCard(viewIndex);
      return;
    }
  }
  renderPicker();
}

// ------------------------------------------------------------
// iOS-STYLE TWO-COLUMN WHEEL PICKER
// ------------------------------------------------------------
const ITEM_H = 48;

function renderPicker() {
  screen = 'picker';
  const defaultPullIdx = PULL_OPTIONS.indexOf(pullCount);

  app.innerHTML = `
    <div class="picker-screen">
      <div class="picker-title">🂠</div>
      <h1 class="picker-heading">TAROT</h1>
      <div class="picker-cols">
        <div class="picker-col">
          <div class="picker-label">DECK</div>
          <div class="wheel-mask">
            <div class="wheel-highlight"></div>
            <div class="wheel-scroll" id="deckWheel">
              <div class="wheel-pad"></div>
              ${DECK_LIST.map((d, i) => `
                <div class="wheel-item" data-idx="${i}">
                  ${d.thumb ? `<img class="wheel-thumb" src="${d.thumb}" alt="" />` : ``}
                  <span class="wheel-text">${d.name}</span>
                </div>
              `).join('')}
              <div class="wheel-pad"></div>
            </div>
          </div>
        </div>

        <div class="picker-col picker-col-count">
          <div class="picker-label">CARDS</div>
          <div class="wheel-mask">
            <div class="wheel-highlight"></div>
            <div class="wheel-scroll" id="countWheel">
              <div class="wheel-pad"></div>
              ${PULL_OPTIONS.map((n, i) => `
                <div class="wheel-item wheel-item-count" data-idx="${i}">
                  <span class="wheel-num">${n}</span>
                </div>
              `).join('')}
              <div class="wheel-pad"></div>
            </div>
          </div>
        </div>
      </div>
      <button id="startBtn" class="btn-start">START DRAW</button>
    </div>
  `;

  const deckWheel = document.getElementById('deckWheel');
  const countWheel = document.getElementById('countWheel');

  initWheel(deckWheel, currentDeckIdx, idx => { currentDeckIdx = idx; });
  initWheel(countWheel, defaultPullIdx >= 0 ? defaultPullIdx : 2, idx => { pullCount = PULL_OPTIONS[idx]; });

  document.getElementById('startBtn').addEventListener('click', () => {
    fullDeck = DECK_LIST[currentDeckIdx].build();
    doShuffle();
  });
}

function initWheel(el, defaultIdx, onChange) {
  const items = Array.from(el.querySelectorAll('.wheel-item'));
  const totalItems = items.length;

  const ROW_H = ITEM_H;              // must match CSS row height (48)
  const SNAP_DELAY = 140;            // debounce for snap
  const MAX_TILT = 22;               // deg
  const MAX_SCALE_DOWN = 0.78;
  const MAX_BLUR = 0.6;

  // Velocity snap tuning
  const VELOCITY_THRESHOLD = 0.35;   // px/ms -> above this we "throw"
  const PROJECT_MS = 220;            // how far we project the momentum
  const MAX_THROW_ROWS = 7;          // cap the throw (feels controlled)

  const clampIdx = (idx) => Math.max(0, Math.min(idx, totalItems - 1));
  const maxTop = (totalItems - 1) * ROW_H;

  // Find highlight element for pulse
  const highlight = el.closest('.wheel-mask')?.querySelector('.wheel-highlight');

  // ---- Tick sound (WebAudio). Works on most browsers once user interacted.
  let audioCtx = null;
  function tickSound(strength = 1) {
    try {
      if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      // Some environments suspend until interaction; ignore if it fails
      if (audioCtx.state === 'suspended') audioCtx.resume().catch(() => {});
      const t0 = audioCtx.currentTime;

      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      // Tiny clicky "tick"
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(900 + 250 * strength, t0);

      gain.gain.setValueAtTime(0.0001, t0);
      gain.gain.exponentialRampToValueAtTime(0.06 * strength, t0 + 0.008);
      gain.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.055);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start(t0);
      osc.stop(t0 + 0.06);
    } catch (e) {
      /* ignore */
    }
  }

  // ---- Haptic tick (if supported)
  function hapticTick(ms = 6) {
    try { navigator.vibrate?.(ms); } catch (e) { /* ignore */ }
  }

  // ---- Pulse highlight
  function pulseHighlight() {
    if (!highlight) return;
    highlight.classList.remove('pulse');
    // force reflow so animation retriggers
    void highlight.offsetWidth;
    highlight.classList.add('pulse');
  }

  // 3D styling based on distance
  function updateStyles(activeIdx) {
    items.forEach((item, i) => {
      const dist = i - activeIdx;
      const abs = Math.abs(dist);

      const t = Math.min(abs / 3, 1);
      const tilt = dist * (MAX_TILT / 3);
      const scale = 1 - t * (1 - MAX_SCALE_DOWN);
      const opacity = abs === 0 ? 1 : abs === 1 ? 0.55 : 0.25;
      const blur = t * MAX_BLUR;

      item.classList.toggle('active', abs === 0);
      item.style.opacity = String(opacity);
      item.style.transform =
        `translateZ(${abs === 0 ? 10 : 0}px) rotateX(${tilt}deg) scale(${scale})`;
      item.style.filter = blur > 0 ? `blur(${blur}px)` : 'none';
    });
  }

  // Resistance at edges
  function applyResistance() {
    if (el.scrollTop < 0) el.scrollTop *= 0.5;
    if (el.scrollTop > maxTop) {
      const over = el.scrollTop - maxTop;
      el.scrollTop = maxTop + over * 0.5;
    }
  }

  // Smooth snap helper
  function snapToIndex(idx) {
    const clamped = clampIdx(idx);
    el.scrollTo({ top: clamped * ROW_H, behavior: 'smooth' });
    updateStyles(clamped);
    onChange(clamped);

    // snap-complete effects
    pulseHighlight();
  }

  // Initialize default position
  const startIdx = clampIdx(defaultIdx);
  el.scrollTop = startIdx * ROW_H;
  updateStyles(startIdx);
  onChange(startIdx);

  // Track velocity
  let lastTop = el.scrollTop;
  let lastTime = performance.now();
  let velocity = 0; // px/ms
  let scrollTimer = null;
  let lastIdx = startIdx;

  function computeVelocity() {
    const now = performance.now();
    const dt = Math.max(1, now - lastTime);
    const top = el.scrollTop;
    velocity = (top - lastTop) / dt; // px/ms
    lastTop = top;
    lastTime = now;
  }

  // Live scroll handling
  el.addEventListener('scroll', () => {
    applyResistance();
    computeVelocity();

    const approxIdx = clampIdx(Math.round(el.scrollTop / ROW_H));
    if (approxIdx !== lastIdx) {
      // selection changed while scrolling
      lastIdx = approxIdx;
      updateStyles(approxIdx);
      onChange(approxIdx);

      // Tick feedback (subtle)
      const strength = Math.min(1, Math.max(0.4, Math.abs(velocity) * 1.4));
      hapticTick(5);
      tickSound(strength);
    }

    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => {
      // When user stops, decide whether to throw further based on velocity
      const v = velocity;

      if (Math.abs(v) > VELOCITY_THRESHOLD) {
        // Project momentum forward
        const projectedTop = el.scrollTop + v * PROJECT_MS;
        let projectedIdx = Math.round(projectedTop / ROW_H);

        // Cap throw distance so it feels controlled
        const curIdx = Math.round(el.scrollTop / ROW_H);
        const delta = projectedIdx - curIdx;
        const cappedDelta = Math.max(-MAX_THROW_ROWS, Math.min(MAX_THROW_ROWS, delta));
        projectedIdx = curIdx + cappedDelta;

        snapToIndex(projectedIdx);
      } else {
        // Normal snap to nearest
        snapToIndex(Math.round(el.scrollTop / ROW_H));
      }
    }, SNAP_DELAY);
  }, { passive: true });

  // Tap to select an item (native feeling)
  items.forEach((item, i) => {
    item.addEventListener('click', () => {
      snapToIndex(i);
      hapticTick(7);
      tickSound(0.8);
    });
  });
}

// ------------------------------------------------------------
// SHUFFLE ANIMATION
// ------------------------------------------------------------
function doShuffle() {
  const deckInfo = DECK_LIST[currentDeckIdx];
  const backUrl = deckBack(deckInfo.id);

  shuffledDeck = shuffleDeck(fullDeck);
  drawnCards = [];
  viewIndex = 0;

  const style = backUrl
    ? `style="background-image:url('${backUrl}'); background-size:contain; background-position:center; background-repeat:no-repeat;"`
    : '';

  app.innerHTML = `
    <div class="shuffling">
      <div class="shuffle-cards">
        <div class="scard s1" ${style}></div>
        <div class="scard s2" ${style}></div>
        <div class="scard s3" ${style}></div>
        <div class="scard s4" ${style}></div>
        <div class="scard s5" ${style}></div>
      </div>
    </div>
  `;
  setTimeout(() => renderGrid(), 1400);
}

// ------------------------------------------------------------
// FACE-DOWN GRID
// ------------------------------------------------------------
function renderGrid() {
  screen = 'grid';
  const picked = drawnCards.length;
  const remaining = pullCount - picked;
  const deckInfo = DECK_LIST[currentDeckIdx];
  const backUrl = deckBack(deckInfo.id);

  app.innerHTML = `
    <div class="grid-screen">
      <div class="grid-header">
        <span class="grid-status">Pick ${remaining} card${remaining !== 1 ? 's' : ''}</span>
        <span class="grid-count">${picked}/${pullCount}</span>
      </div>
      <div class="grid-wrap">
        <div class="grid">
          ${shuffledDeck.map((_, i) => {
            const isDrawn = drawnCards.some(dc => dc._gridIdx === i);
            const style = backUrl ? `style="background-image:url('${backUrl}');"` : '';
	    return `<div class="grid-card ${isDrawn ? 'picked' : ''}" data-idx="${i}" ${style}></div>`;
          }).join('')}
        </div>
      </div>
      ${picked === pullCount
        ? `<button id="viewSpreadBtn" class="btn-start">VIEW SPREAD</button>`
        : `<p class="grid-hint">Tap cards to select</p>`
      }
    </div>
  `;

  if (picked < pullCount) {
    document.querySelectorAll('.grid-card:not(.picked)').forEach(el => {
      el.addEventListener('click', () => {
        const idx = parseInt(el.dataset.idx, 10);
        drawnCards.push({ ...shuffledDeck[idx], _gridIdx: idx });
        el.classList.add('picked', 'just-picked');

        if (drawnCards.length >= pullCount) {
          setTimeout(() => renderGrid(), 300);
        } else {
          const rem = pullCount - drawnCards.length;
          const statusEl = document.querySelector('.grid-status');
          const countEl = document.querySelector('.grid-count');
          if (statusEl) statusEl.textContent = `Pick ${rem} card${rem !== 1 ? 's' : ''}`;
          if (countEl) countEl.textContent = `${drawnCards.length}/${pullCount}`;
        }
      });
    });
  }

  const viewBtn = document.getElementById('viewSpreadBtn');
  if (viewBtn) viewBtn.addEventListener('click', renderSpread);
}


// ------------------------------------------------------------
// SPREAD VIEW
// ------------------------------------------------------------
function chunkIntoRows(cards) {
  const n = cards.length;
  if (n <= 4) return [{ cols: n, cards }];
  // 5+ => rows of 4, last row can be 1/2/3 and should be centered
  const rows = [];
  let i = 0;
  while (i < n) {
    const remaining = n - i;
    const take = remaining >= 4 ? 4 : remaining; // last row: 1-3
    rows.push({ cols: take, cards: cards.slice(i, i + take) });
    i += take;
  }
  // force first row to be 4 columns when n>=5
  rows[0].cols = 4;
  return rows;
}

function renderSpread() {
  screen = 'spread';
  const deckInfo = DECK_LIST[currentDeckIdx];
  const n = drawnCards.length;
  const rows = chunkIntoRows(drawnCards);

  // For 1–4 cards: no scrolling; center vertically.
  // For 5+: allow scrolling.
  const areaClass = n <= 4 ? 'spread-area single' : 'spread-area scrolling';

  app.innerHTML = `
    <div class="spread-screen">
      <div class="spread-header">
        <span class="spread-title">${deckInfo.name} · ${n}-Card Spread</span>
      </div>

      <div class="${areaClass}">
        ${rows.map((row, rIdx) => `
          <div class="spread-row cols-${row.cols}">
            ${row.cards.map((card, i) => {
              const cardIdx = drawnCards.indexOf(card); // stable index in drawnCards
              const hasImg = !!(deckInfo.hasImages && card.image);
              return `
                <div class="spread-card ${card.reversed ? 'reversed' : ''}" data-idx="${cardIdx}">
                  ${hasImg
                    ? `<img class="spread-img" src="${card.image}" alt="${card.name}"
                         onerror="this.outerHTML='<div class=\\'spread-symbol\\'>${getCardSymbol(card, deckInfo.id)}</div>'" />`
                    : `<div class="spread-symbol">${getCardSymbol(card, deckInfo.id)}</div>`
                  }
                  <div class="spread-label">${card.reversed ? '↓' : ''}</div>
                </div>
              `;
            }).join('')}
          </div>
        `).join('')}
      </div>

      <div class="spread-nav">
        <button id="spreadDetailBtn" class="btn-start btn-sm">🔍VIEW DETAILS</button>
        <button id="spreadHomeBtn" class="link-btn">↻ 🎴</button>
      </div>
    </div>
  `;

  document.querySelectorAll('.spread-card').forEach(el => {
    el.addEventListener('click', () => renderCard(parseInt(el.dataset.idx, 10)));
  });

  document.getElementById('spreadDetailBtn').addEventListener('click', () => renderCard(0));
  document.getElementById('spreadHomeBtn').addEventListener('click', renderPicker);

  persistSession();
}
// ------------------------------------------------------------
// CARD DETAIL VIEW
// ------------------------------------------------------------
function renderCard(index) {
  if (index < 0 || index >= drawnCards.length) return;

  viewIndex = index;
  screen = 'card';

  const card = drawnCards[index];
  const deckInfo = DECK_LIST[currentDeckIdx];
  const reversedLabel = card.reversed ? 'Reversed' : 'Upright';
  const typeLabel = card.type === 'major' ? `Major · ${card.number}` : `Minor · ${card.suit || ''}`;
  const hasImg = !!(deckInfo.hasImages && card.image);

  app.innerHTML = `
    <div class="card-view">
      <div class="card-header">
        <span class="card-count">${index + 1} / ${drawnCards.length}</span>
        <span class="card-type">${typeLabel}</span>
      </div>
      <div class="card-frame ${card.reversed ? 'rev' : 'up'}">
        ${hasImg
          ? `<div class="card-img-wrap ${card.reversed ? 'reversed' : ''}">
               <img class="card-img" src="${card.image}" alt="${card.name}"
                 onerror="this.parentElement.innerHTML='<div class=\\'card-fallback\\'>${getCardSymbol(card, deckInfo.id)}<br>${card.name}</div>'" />
             </div>`
          : `<div class="card-symbol-wrap ${card.reversed ? 'reversed' : ''}">
               <div class="card-big-symbol">${getCardSymbol(card, deckInfo.id)}</div>
             </div>`
        }
      </div>
      <div class="card-info">
        <span class="card-name">${card.name}</span>
        <span class="card-orientation ${card.reversed ? 'rev' : 'up'}">${reversedLabel}</span>
      </div>
      <div class="card-nav ${card.reversed ? 'rev' : 'up'}">
        <button id="prevBtn" class="nav-btn  ${card.reversed ? 'rev' : 'up'}" ${index === 0 ? 'disabled' : ''}>↜</button>
        <button id="spreadBtn" class="nav-btn home-btn  ${card.reversed ? 'rev' : 'up'}">🂠</button>
        <button id="reshuffleBtn" class="nav-btn reshuffle  ${card.reversed ? 'rev' : 'up'}">🔮</button>
        <button id="nextBtn" class="nav-btn  ${card.reversed ? 'rev' : 'up'}" ${index === drawnCards.length - 1 ? 'disabled' : ''}>↝</button>
      </div>
    </div>
  `;

  document.getElementById('prevBtn').addEventListener('click', () => renderCard(index - 1));
  document.getElementById('nextBtn').addEventListener('click', () => renderCard(index + 1));
  document.getElementById('reshuffleBtn').addEventListener('click', doShuffle);
  document.getElementById('spreadBtn').addEventListener('click', renderSpread);
  persistSession();
}

// ------------------------------------------------------------
// PERSIST SESSION
// ------------------------------------------------------------
function persistSession() {
  saveSession({
    deckIdx: currentDeckIdx,
    pullCount,
    drawnCards: drawnCards.map(c => ({
      name: c.name, type: c.type, number: c.number, suit: c.suit,
      image: c.image, reversed: c.reversed, _gridIdx: c._gridIdx
    })),
    viewIndex,
    timestamp: Date.now()
  });
}

// ------------------------------------------------------------
// HARDWARE INPUT
// ------------------------------------------------------------
window.addEventListener('sideClick', () => {
  if (screen === 'picker') {
    fullDeck = DECK_LIST[currentDeckIdx].build();
    doShuffle();
  } else if (screen === 'spread') {
    renderCard(0);
  } else if (screen === 'card') {
    doShuffle();
  }
});

window.addEventListener('scrollDown', () => {
  if (screen === 'card' && viewIndex < drawnCards.length - 1) renderCard(viewIndex + 1);
});

window.addEventListener('scrollUp', () => {
  if (screen === 'card' && viewIndex > 0) renderCard(viewIndex - 1);
});

if (typeof PluginMessageHandler === 'undefined') {
  window.addEventListener('keydown', (e) => {
    if (e.code === 'Space') { e.preventDefault(); window.dispatchEvent(new CustomEvent('sideClick')); }
    else if (e.code === 'ArrowDown' || e.code === 'ArrowRight') { e.preventDefault(); window.dispatchEvent(new CustomEvent('scrollDown')); }
    else if (e.code === 'ArrowUp' || e.code === 'ArrowLeft') { e.preventDefault(); window.dispatchEvent(new CustomEvent('scrollUp')); }
  });
}

// ------------------------------------------------------------
// BOOT
// ------------------------------------------------------------
document.addEventListener('DOMContentLoaded', init);