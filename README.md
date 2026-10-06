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
- Funken-Animation im Kopfbereich (aus bei «Bewegung reduzieren»)
- Feste Leiste «Anrufen / Route» auf dem Handy
- Strukturierte Daten (schema.org Restaurant) für Google

## Veröffentlichen
GitHub Pages (Settings → Pages → Branch wählen), Netlify oder jedes andere statische Hosting.
