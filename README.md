# Urimi Grill Restaurant & Bäckerei – Webseite

One-Page-Webseite für das Urimi Grill Restaurant, Weberstrasse 93, 8400 Winterthur.
Alles steckt in einer Datei (`index.html`), ohne Build-Schritt.

## Lokal ansehen
`index.html` im Browser öffnen.

## Inhalte anpassen
Unten in `index.html` im `<script>`-Block:
- `HOURS` – Öffnungszeiten (Wochentag 0 = Sonntag)
- `MENU` – Kategorien, Gerichte, Preise (`price: null` zeigt «im Restaurant»)

Adresse und Telefon stehen im Abschnitt `BESUCH` und im JSON-LD-Block im `<head>` (für Google).

## Was die Seite kann
- Live-Status «Offen / Zu» nach Schweizer Zeit, unabhängig vom Standort des Besuchers
- Tagesbalken mit Öffnungszeit und aktueller Uhrzeit
- Speisekarte mit Reitern (Pfeiltasten-Navigation)
- Funken-Animation im Kopfbereich; der Mauszeiger stösst Funken aus
- Scroll-Animationen mit GSAP + ScrollTrigger, weiches Scrollen mit Lenis:
  Buchstaben klappen hoch, Überschriften rutschen ein, Symbole zeichnen sich,
  der Ofen glüht stärker, Bewertung zählt auf 4.8
- Interaktiver «Urimi Teller»: Zutaten landen beim Scrollen auf dem Teller,
  Antippen einer Zutat hebt sie hervor
- 3D-Neigung der Gerichte-Karten, magnetische Knöpfe, Glutschein am Cursor
- Bei «Bewegung reduzieren» (Systemeinstellung) sind alle Animationen aus
- Ohne die CDN-Bibliotheken bleibt alles sichtbar und bedienbar
- Feste Leiste «Anrufen / Route» auf dem Handy
- Strukturierte Daten (schema.org Restaurant) für Google

## Veröffentlichen
GitHub Pages (Settings → Pages → Branch wählen), Netlify oder jedes andere statische Hosting.
