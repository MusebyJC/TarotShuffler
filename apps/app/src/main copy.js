// R1 Tarot Deck Shuffler — Multi-Deck Edition with iOS Wheel Picker


function buildStandardDeckNumberedImages(deckId) {
  const deck = buildStandardDeck(); // 78 cards in fixed order
  return deck.map((card, idx) => ({ ...card, image: deckCardImage(deckId, idx) }));
}

function buildPrimordialDeckNumberedImages(deckId = 'primordial') {
  const deck = buildPrimordialDeck(); // already in Primordial order
  return deck.map((card, idx) => ({ ...card, image: deckCardImage(deckId, idx) }));
}

const app = document.getElementById('app');

// Bundle local images so Vite includes them in build
const LOCAL_ASSETS = import.meta.glob(
  './assets/decks/**/{thumb.{jpg,png},image/*.{jpg,png}}',
  {
    eager: true,
    query: '?url',
    import: 'default'
  }
);

function localAsset(path) {
  return LOCAL_ASSETS[path] || null;
}

function deckThumb(deckId) {
  return localAsset(`./assets/decks/${deckId}/thumb.jpg`)
      || localAsset(`./assets/decks/${deckId}/thumb.png`);
}

function deckCardImage(deckId, idx) {
  const file = String(idx).padStart(2, '0');
  return (
    localAsset(`./assets/decks/${deckId}/image/${file}.jpg`) ||
    localAsset(`./assets/decks/${deckId}/image/${file}.png`)
  );
}

// ============================================================
// DECK DEFINITIONS
// ============================================================

// --- Primordial Tarot ---
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

// --- Thoth deck (uses different names for some majors) ---
const THOTH_MAJOR = [
  'The Fool', 'The Magus', 'The Priestess', 'The Empress', 'The Emperor',
  'The Hierophant', 'The Lovers', 'The Chariot', 'Adjustment', 'The Hermit',
  'Fortune', 'Lust', 'The Hanged Man', 'Death', 'Art',
  'The Devil', 'The Tower', 'The Star', 'The Moon', 'The Sun',
  'The Aeon', 'The Universe'
];
const THOTH_SUITS = ['Wands', 'Cups', 'Swords', 'Disks'];
const THOTH_COURT = ['Princess', 'Prince', 'Queen', 'Knight'];

function buildThothDeck() {
  const deck = [];
  THOTH_MAJOR.forEach((name, i) => deck.push({ name, type: 'major', number: i, image: null }));
  THOTH_SUITS.forEach(suit => {
    for (let n = 1; n <= 10; n++) {
      const rName = n === 1 ? 'Ace' : ['','','Two','Three','Four','Five','Six','Seven','Eight','Nine','Ten'][n];
      deck.push({ name: `${rName} of ${suit}`, type: 'minor', suit, image: null });
    }
    THOTH_COURT.forEach(c => deck.push({ name: `${c} of ${suit}`, type: 'minor', suit, image: null }));
  });
  return deck;
}

// --- Marseille deck (uses French-style names) ---
const MARS_MAJOR = [
  'Le Mat', 'Le Bateleur', 'La Papesse', 'L\'Impératrice', 'L\'Empereur',
  'Le Pape', 'L\'Amoureux', 'Le Chariot', 'La Justice', 'L\'Hermite',
  'La Roue de Fortune', 'La Force', 'Le Pendu', 'L\'Arcane sans Nom', 'Tempérance',
  'Le Diable', 'La Maison Dieu', 'L\'Étoile', 'La Lune', 'Le Soleil',
  'Le Jugement', 'Le Monde'
];
const MARS_SUITS = ['Bâtons', 'Coupes', 'Épées', 'Deniers'];
const MARS_COURT = ['Valet', 'Cavalier', 'Reine', 'Roi'];

function buildMarseilleDeck() {
  const deck = [];
  MARS_MAJOR.forEach((name, i) => deck.push({ name, type: 'major', number: i, image: null }));
  MARS_SUITS.forEach(suit => {
    for (let n = 1; n <= 10; n++) {
      const rName = n === 1 ? 'As' : String(n);
      deck.push({ name: `${rName} de ${suit}`, type: 'minor', suit, image: null });
    }
    MARS_COURT.forEach(c => deck.push({ name: `${c} de ${suit}`, type: 'minor', suit, image: null }));
  });
  return deck;
}

// ============================================================
// DECK REGISTRY
// ============================================================
const DECK_LIST = [
 {id: 'lightseer',
  name: "Light Seer's",
  thumb: deckThumb('lightseer'),
  build: () => buildStandardDeckNumberedImages('lightseer'),
  hasImages: true
},

  // Local-asset decks (00.jpg..77.jpg in /image)
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

  // Keep Primordial as you have it now (no images)
{
  id: 'primordial',
  name: 'Primordial',
  thumb: deckThumb('primordial'),
  build: () => buildPrimordialDeckNumberedImages('primordial'),
  hasImages: true
}
];
const DECKS_MAP = {};
DECK_LIST.forEach(d => DECKS_MAP[d.id] = d);

// ============================================================
// SECURE RANDOM SHUFFLE
// ============================================================
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

// ============================================================
// SESSION STORAGE
// ============================================================
async function saveSession(data) {
  try {
    if (window.creationStorage) {
      await window.creationStorage.plain.setItem('tarot_session', btoa(JSON.stringify(data)));
    }
  } catch (e) { /* silent */ }
}

async function loadSession() {
  try {
    if (window.creationStorage) {
      const s = await window.creationStorage.plain.getItem('tarot_session');
      if (s) return JSON.parse(atob(s));
    }
  } catch (e) { /* silent */ }
  return null;
}

// ============================================================
// APP STATE
// ============================================================
let currentDeckIdx = 0;
let fullDeck = [];
let shuffledDeck = [];
let drawnCards = [];
let pullCount = 3;
let viewIndex = 0;
let screen = 'picker'; // picker | grid | spread | card

const PULL_OPTIONS = Array.from({ length: 20 }, (_, i) => i + 1); // 1..20

// ============================================================
// CARD SYMBOLS (for decks without images)
// ============================================================
const PT_MAJOR_SYMBOLS = ['🥚','✨','🌍','🤱','👤','🔮','💞','☸️','🌾','🏔️','⏳','⚡','🗡️','💀','💧','👹','🪨','⭐','🌙','☀️','🦌','🌎'];
const STD_MAJOR_SYMBOLS = ['🃏','✨','🌙','👑','🏛️','📿','❤️','⚔️','🦁','🏔️','☸️','⚖️','🔄','💀','🏺','😈','🗼','⭐','🌙','☀️','📯','🌎'];
const SUIT_SYMBOLS = { Wands: '🪄', Cups: '🏆', Swords: '⚔️', Pentacles: '⭐', Disks: '💿', Nature: '🌿', Souls: '👁️', Blood: '🩸', Jewels: '💎', 'Bâtons': '🪵', 'Coupes': '🏆', 'Épées': '⚔️', Deniers: '🪙' };

function getCardSymbol(card, deckId) {
  if (card.type === 'major') {
    if (deckId === 'primordial') return PT_MAJOR_SYMBOLS[card.number] || '🔮';
    return STD_MAJOR_SYMBOLS[card.number] || '🔮';
  }
  return SUIT_SYMBOLS[card.suit] || '🃏';
}

// ============================================================
// INIT
// ============================================================
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

// ============================================================
// iOS-STYLE TWO-COLUMN WHEEL PICKER
// ============================================================
const ITEM_H = 48; // px per wheel row
const VISIBLE_ROWS = 5;
const CENTER_ROW = 2; // 0-indexed, middle of 5

function renderPicker() {
  screen = 'picker';
  const defaultPullIdx = PULL_OPTIONS.indexOf(pullCount);

  app.innerHTML = `
    <div class="picker-screen">
      <div class="picker-title">🔮</div>
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
                  <img class="wheel-thumb" src="${d.thumb}" alt="" onerror="this.style.display='none'" />
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
  const items = el.querySelectorAll('.wheel-item');
  const totalItems = items.length;

  // Scroll to default center-aligned
  const targetScroll = defaultIdx * ITEM_H;
  el.scrollTop = targetScroll;

  let scrollTimer = null;

  function snapToNearest() {
    const scrollPos = el.scrollTop;
    const idx = Math.round(scrollPos / ITEM_H);
    const clamped = Math.max(0, Math.min(idx, totalItems - 1));
    el.scrollTo({ top: clamped * ITEM_H, behavior: 'smooth' });
    updateStyles(clamped);
    onChange(clamped);
  }

  function updateStyles(activeIdx) {
    items.forEach((item, i) => {
      const dist = Math.abs(i - activeIdx);
      item.classList.toggle('active', dist === 0);
      item.style.opacity = dist === 0 ? '1' : dist === 1 ? '0.45' : '0.2';
      const scale = dist === 0 ? 1 : dist === 1 ? 0.88 : 0.75;
      item.style.transform = `scale(${scale})`;
    });
  }

  el.addEventListener('scroll', () => {
    clearTimeout(scrollTimer);
    const scrollPos = el.scrollTop;
    const approxIdx = Math.round(scrollPos / ITEM_H);
    const clamped = Math.max(0, Math.min(approxIdx, totalItems - 1));
    updateStyles(clamped);
    scrollTimer = setTimeout(snapToNearest, 120);
  }, { passive: true });

  // Initial style
  updateStyles(defaultIdx);

  // Touch tap to select
  items.forEach((item, i) => {
    item.addEventListener('click', () => {
      el.scrollTo({ top: i * ITEM_H, behavior: 'smooth' });
      setTimeout(() => { updateStyles(i); onChange(i); }, 200);
    });
  });
}

// ============================================================
// SHUFFLE ANIMATION (no text, only visual)
// ============================================================
function doShuffle() {
  shuffledDeck = shuffleDeck(fullDeck);
  drawnCards = [];
  viewIndex = 0;

  app.innerHTML = `
    <div class="shuffling">
      <div class="shuffle-cards">
        <div class="scard s1"></div>
        <div class="scard s2"></div>
        <div class="scard s3"></div>
        <div class="scard s4"></div>
        <div class="scard s5"></div>
      </div>
    </div>
  `;
  setTimeout(() => renderGrid(), 1400);
}

// ============================================================
// FACE-DOWN GRID
// ============================================================
function renderGrid() {
  screen = 'grid';
  const picked = drawnCards.length;
  const remaining = pullCount - picked;

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
            return `<div class="grid-card ${isDrawn ? 'picked' : ''}" data-idx="${i}"></div>`;
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
        const idx = parseInt(el.dataset.idx);
        drawnCards.push({ ...shuffledDeck[idx], _gridIdx: idx });
        el.classList.add('picked', 'just-picked');
        if (drawnCards.length >= pullCount) {
          setTimeout(() => renderGrid(), 400);
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

// ============================================================
// SPREAD VIEW
// ============================================================
function renderSpread() {
  screen = 'spread';
  const deckInfo = DECK_LIST[currentDeckIdx];

  app.innerHTML = `
    <div class="spread-screen">
      <div class="spread-header">
        <span class="spread-title">${deckInfo.name} · ${drawnCards.length}-Card Spread</span>
      </div>
      <div class="spread-area">
        ${drawnCards.map((card, i) => {
          const hasImg = deckInfo.hasImages && card.image;
          return `
            <div class="spread-card ${card.reversed ? 'reversed' : ''}" data-idx="${i}">
              ${hasImg
                ? `<img class="spread-img" src="${card.image}" alt="${card.name}" onerror="this.outerHTML='<div class=\\'spread-symbol\\'>${getCardSymbol(card, deckInfo.id)}</div>'" />`
                : `<div class="spread-symbol">${getCardSymbol(card, deckInfo.id)}</div>`
              }
              <div class="spread-label">${card.reversed ? '↓' : ''}</div>
            </div>
          `;
        }).join('')}
      </div>
      <div class="spread-nav">
        <button id="spreadDetailBtn" class="btn-start btn-sm">VIEW DETAILS</button>
        <button id="spreadHomeBtn" class="link-btn">↻ New Reading</button>
      </div>
    </div>
  `;

  document.querySelectorAll('.spread-card').forEach(el => {
    el.addEventListener('click', () => renderCard(parseInt(el.dataset.idx)));
  });
  document.getElementById('spreadDetailBtn').addEventListener('click', () => renderCard(0));
  document.getElementById('spreadHomeBtn').addEventListener('click', renderPicker);
  persistSession();
}

// ============================================================
// CARD DETAIL VIEW
// ============================================================
function renderCard(index) {
  if (index < 0 || index >= drawnCards.length) return;
  viewIndex = index;
  screen = 'card';
  const card = drawnCards[index];
  const deckInfo = DECK_LIST[currentDeckIdx];
  const reversedLabel = card.reversed ? 'Reversed' : 'Upright';
  const typeLabel = card.type === 'major' ? `Major · ${card.number}` : `Minor · ${card.suit || ''}`;
  const hasImg = deckInfo.hasImages && card.image;

  app.innerHTML = `
    <div class="card-view">
      <div class="card-header">
        <span class="card-count">${index + 1} / ${drawnCards.length}</span>
        <span class="card-type">${typeLabel}</span>
      </div>
      <div class="card-frame">
        ${hasImg
          ? `<div class="card-img-wrap ${card.reversed ? 'reversed' : ''}">
               <img class="card-img" src="${card.image}" alt="${card.name}" onerror="this.parentElement.innerHTML='<div class=\\'card-fallback\\'>${getCardSymbol(card, deckInfo.id)}<br>${card.name}</div>'" />
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
      <div class="card-nav">
        <button id="prevBtn" class="nav-btn" ${index === 0 ? 'disabled' : ''}>◀</button>
        <button id="spreadBtn" class="nav-btn home-btn">☰</button>
        <button id="reshuffleBtn" class="nav-btn reshuffle">↻</button>
        <button id="nextBtn" class="nav-btn" ${index === drawnCards.length - 1 ? 'disabled' : ''}>▶</button>
      </div>
    </div>
  `;

  document.getElementById('prevBtn').addEventListener('click', () => renderCard(index - 1));
  document.getElementById('nextBtn').addEventListener('click', () => renderCard(index + 1));
  document.getElementById('reshuffleBtn').addEventListener('click', doShuffle);
  document.getElementById('spreadBtn').addEventListener('click', renderSpread);
  persistSession();
}

// ============================================================
// PERSIST SESSION
// ============================================================
function persistSession() {
  saveSession({
    deckIdx: currentDeckIdx,
    pullCount,
    drawnCards: drawnCards.map(c => ({ name: c.name, type: c.type, number: c.number, suit: c.suit, image: c.image, reversed: c.reversed })),
    viewIndex,
    timestamp: Date.now()
  });
}

// ============================================================
// HARDWARE INPUT
// ============================================================
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

// ============================================================
// BOOT
// ============================================================
document.addEventListener('DOMContentLoaded', init);
