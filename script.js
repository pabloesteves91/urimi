// ------------------------------------------------------------
// Inhalte – hier anpassen
// ------------------------------------------------------------

// TODO: Öffnungszeiten bestätigen. Bekannt ist nur: öffnet um 08:00.
// Format: [Öffnen, Schliessen] im 24h-Format, oder null = Ruhetag.
// Wochentage beginnen mit Sonntag (0), wie in JavaScript üblich.
const HOURS = {
  1: ["08:00", "22:00"], // Montag
  2: ["08:00", "22:00"], // Dienstag
  3: ["08:00", "22:00"], // Mittwoch
  4: ["08:00", "22:00"], // Donnerstag
  5: ["08:00", "23:00"], // Freitag
  6: ["08:00", "23:00"], // Samstag
  0: ["08:00", "22:00"], // Sonntag
};

// TODO: Gerichte und Preise mit der echten Speisekarte abgleichen.
const MENU = [
  {
    category: "Vom Grill",
    items: [
      { name: "Ćevapčići (10 Stk.)", desc: "Hausgemacht, mit Fladenbrot, Zwiebeln und Ajvar", price: 22, tag: "Beliebt" },
      { name: "Qebapa (10 Stk.)", desc: "Nach albanischer Art, mit Pommes oder Salat", price: 22 },
      { name: "Pljeskavica", desc: "Gegrilltes Hacksteak, gefüllt auf Wunsch mit Käse", price: 24 },
      { name: "Grillteller Urimi", desc: "Ćevapčići, Pljeskavica, Poulet, Sucuk, Salat und Brot", price: 32, tag: "Für Hungrige" },
      { name: "Pouletbrust vom Grill", desc: "Mariniert, mit Salat und Beilage", price: 25 },
      { name: "Sucuk", desc: "Gegrillte Knoblauchwurst mit Brot und Salat", price: 21 },
    ],
  },
  {
    category: "Burek & Pide",
    items: [
      { name: "Burek mit Fleisch", desc: "Hausgemachter Blätterteig, frisch aus dem Ofen", price: 9, tag: "Hausgemacht" },
      { name: "Burek mit Käse", desc: "Mit cremigem Weisskäse", price: 9 },
      { name: "Burek mit Spinat", desc: "Spinat und Käse", price: 9 },
      { name: "Pide mit Hackfleisch", desc: "Albanische Art, mit Zwiebeln und Peperoni", price: 20 },
      { name: "Pide mit Käse und Ei", desc: "Klassisch und herzhaft", price: 19 },
      { name: "Pide Sucuk", desc: "Mit Knoblauchwurst und Käse", price: 21 },
    ],
  },
  {
    category: "Salate & Beilagen",
    items: [
      { name: "Gemischter Salat", desc: "Saisonal, mit Hausdressing", price: 8 },
      { name: "Shopska-Salat", desc: "Tomaten, Gurken, Peperoni, Zwiebeln, Weisskäse", price: 11 },
      { name: "Pommes frites", desc: "", price: 6 },
      { name: "Ajvar / Kajmak", desc: "Hausgemachte Beilage", price: 4 },
    ],
  },
  {
    category: "Getränke",
    items: [
      { name: "Softdrinks 0.33 l", desc: "Cola, Fanta, Sprite, Eistee", price: 4.5 },
      { name: "Ayran", desc: "Erfrischendes Joghurtgetränk", price: 4 },
      { name: "Kaffee / Espresso", desc: "", price: 4 },
      { name: "Mineralwasser 0.5 l", desc: "Mit oder ohne Kohlensäure", price: 4.5 },
    ],
  },
];

// ------------------------------------------------------------

const DAY_NAMES = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];
const DAY_ORDER = [1, 2, 3, 4, 5, 6, 0];

const formatPrice = (p) => p.toFixed(2);
const toMinutes = (t) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};

function renderMenu() {
  const tabs = document.getElementById("menu-tabs");
  const grid = document.getElementById("menu-grid");

  const show = (index) => {
    tabs.querySelectorAll(".menu-tab").forEach((tab, i) => {
      tab.setAttribute("aria-selected", String(i === index));
    });
    grid.innerHTML = MENU[index].items
      .map(
        (item) => `
        <article class="menu-item">
          <h3>${item.name}${item.tag ? `<span class="tag">${item.tag}</span>` : ""}</h3>
          <span class="price">${formatPrice(item.price)}</span>
          ${item.desc ? `<p>${item.desc}</p>` : ""}
        </article>`
      )
      .join("");
  };

  MENU.forEach((section, i) => {
    const tab = document.createElement("button");
    tab.className = "menu-tab";
    tab.type = "button";
    tab.setAttribute("role", "tab");
    tab.textContent = section.category;
    tab.addEventListener("click", () => show(i));
    tabs.appendChild(tab);
  });

  show(0);
}

function renderHours() {
  const table = document.getElementById("hours");
  const today = new Date().getDay();

  table.innerHTML = DAY_ORDER.map((d) => {
    const h = HOURS[d];
    const time = h ? `${h[0]} – ${h[1]}` : "Ruhetag";
    return `<tr class="${d === today ? "is-today" : ""}"><td>${DAY_NAMES[d]}</td><td>${time}</td></tr>`;
  }).join("");
}

function renderOpenStatus() {
  const el = document.getElementById("open-status");
  const now = new Date();
  const minutes = now.getHours() * 60 + now.getMinutes();
  const h = HOURS[now.getDay()];

  if (h && minutes >= toMinutes(h[0]) && minutes < toMinutes(h[1])) {
    el.textContent = `Jetzt geöffnet · bis ${h[1]}`;
    el.className = "open-status is-open";
    return;
  }

  // Nächste Öffnung suchen (heute später oder an einem der nächsten Tage)
  for (let offset = 0; offset < 7; offset++) {
    const day = (now.getDay() + offset) % 7;
    const next = HOURS[day];
    if (!next) continue;
    if (offset === 0 && minutes >= toMinutes(next[0])) continue;
    const when = offset === 0 ? "heute" : offset === 1 ? "morgen" : DAY_NAMES[day];
    el.textContent = `Geschlossen · öffnet ${when} um ${next[0]}`;
    el.className = "open-status is-closed";
    return;
  }
}

function setupNav() {
  const toggle = document.querySelector(".nav__toggle");
  const links = document.getElementById("nav-links");
  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  links.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      links.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    })
  );
}

renderMenu();
renderHours();
renderOpenStatus();
setupNav();
document.getElementById("year").textContent = new Date().getFullYear();
