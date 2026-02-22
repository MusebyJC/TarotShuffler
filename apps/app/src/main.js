import './style.css';

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
function applyStageScale() {
  const root = document.documentElement;

  const designW = Number(getComputedStyle(root).getPropertyValue('--designW')) || 360;
  const designH = Number(getComputedStyle(root).getPropertyValue('--designH')) || 360;

  // Use visualViewport if available (better on WebViews)
  const vw = window.visualViewport?.width ?? window.innerWidth;
  const vh = window.visualViewport?.height ?? window.innerHeight;

  const scale = Math.min(vw / designW, vh / designH);

  root.style.setProperty('--scale', String(scale));
}

// Run now + on changes
applyStageScale();
window.addEventListener('resize', applyStageScale);
window.visualViewport?.addEventListener('resize', applyStageScale);
window.visualViewport?.addEventListener('scroll', applyStageScale);
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

// ============================================================
// TWO-STEP PICKER FLOW (Deck -> Count)
// ============================================================
let pickerStep = 0; // 0 = deck, 1 = count

function renderPicker() {
  pickerStep = 0;
  renderPickerDeck();
}

function renderPickerDeck() {
  screen = 'picker';
  pickerStep = 0;

  app.innerHTML = `
    <div class="picker-screen">
      <div class="picker-title">🔮</div>
      <h1 class="picker-heading">TAROT</h1>

      <div class="picker-single">
        <div class="picker-label">DECK</div>

        <div class="wheel-mask">
          <div class="wheel-highlight"></div>
          <div class="wheel-scroll" id="deckWheel">
            <div class="wheel-pad"></div>
            ${DECK_LIST.map((d, i) => `
              <div class="wheel-item" data-idx="${i}">
                <img class="wheel-thumb" src="${d.thumb}" alt="" onerror="this.style.display='none'"/>
                <span class="wheel-text">${d.name}</span>
              </div>
            `).join('')}
            <div class="wheel-pad"></div>
          </div>
        </div>
      </div>

      <div class="picker-footer">
        <button id="nextBtn" class="btn-start btn-next" aria-label="Next">→</button>
      </div>
    </div>
  `;

  const deckWheel = document.getElementById('deckWheel');
  initWheel(deckWheel, currentDeckIdx, idx => { currentDeckIdx = idx; });

  document.getElementById('nextBtn').addEventListener('click', () => {
    renderPickerCount();
  });
}

function renderPickerCount() {
  screen = 'picker';
  pickerStep = 1;

  const defaultPullIdx = Math.max(0, PULL_OPTIONS.indexOf(pullCount));

  app.innerHTML = `
    <div class="picker-screen">
      <div class="picker-title">🔮</div>
      <h1 class="picker-heading">TAROT</h1>

      <div class="picker-single">
        <div class="picker-label">CARDS</div>

        <div class="wheel-mask wheel-mask-count">
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

      <div class="picker-footer">
        <button id="backBtn" class="link-btn">←</button>
        <button id="startBtn" class="btn-start">START DRAW</button>
      </div>
    </div>
  `;

  const countWheel = document.getElementById('countWheel');
  initWheel(countWheel, defaultPullIdx, idx => { pullCount = PULL_OPTIONS[idx]; });

  document.getElementById('backBtn').addEventListener('click', renderPickerDeck);
  document.getElementById('startBtn').addEventListener('click', () => {
    fullDeck = DECK_LIST[currentDeckIdx].build();
    doShuffle();
  });
}

// ============================================================
// WHEEL (dynamic row height, no hard-coded px)
// ============================================================
function getRowHeightPx(el) {
  const firstItem = el.querySelector('.wheel-item');
  if (!firstItem) return 48;
  const h = firstItem.getBoundingClientRect().height;
  return Math.max(32, Math.round(h)); // guard
}

function initWheel(el, defaultIdx, onChange) {
  const items = el.querySelectorAll('.wheel-item');
  const totalItems = items.length;

  const ITEM_H = getRowHeightPx(el);

  // Scroll to default center-aligned
  el.scrollTop = defaultIdx * ITEM_H;

  let scrollTimer = null;

  function updateStyles(activeIdx) {
    items.forEach((item, i) => {
      const dist = Math.abs(i - activeIdx);
      item.classList.toggle('active', dist === 0);
      item.style.opacity = dist === 0 ? '1' : dist === 1 ? '0.45' : '0.2';
      const scale = dist === 0 ? 1 : dist === 1 ? 0.9 : 0.78;
      item.style.transform = `scale(${scale})`;
    });
  }

  function snapToNearest() {
    const idx = Math.round(el.scrollTop / ITEM_H);
    const clamped = Math.max(0, Math.min(idx, totalItems - 1));
    el.scrollTo({ top: clamped * ITEM_H, behavior: 'smooth' });
    updateStyles(clamped);
    onChange(clamped);
  }

  el.addEventListener('scroll', () => {
    clearTimeout(scrollTimer);
    const approxIdx = Math.round(el.scrollTop / ITEM_H);
    const clamped = Math.max(0, Math.min(approxIdx, totalItems - 1));
    updateStyles(clamped);
    scrollTimer = setTimeout(snapToNearest, 110);
  }, { passive: true });

  updateStyles(defaultIdx);

  items.forEach((item, i) => {
    item.addEventListener('click', () => {
      el.scrollTo({ top: i * ITEM_H, behavior: 'smooth' });
      setTimeout(() => { updateStyles(i); onChange(i); }, 160);
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
        <button id="spreadHomeBtn" class="link-btn">↻ Another Deck?</button>
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