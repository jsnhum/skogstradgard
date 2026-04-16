# Agunnaryds Allmänna Skogsträdgård — Webbprojekt

## Vad är det här?
En interaktiv informationshemsida för Agunnaryds allmänna skogsträdgård i Småland.
Besökare ska kunna orientera sig via en karta och klicka sig vidare till informationssidor om varje växt.

## Projektstruktur
```
skogstradgard/
├── CLAUDE.md              ← du är här
├── public/
│   └── arter/             ← undersidor per art (HTML)
├── src/
│   ├── App.jsx            ← huvudkomponent med karta
│   └── vaxter.json        ← all växtdata (namn, koordinater, typ, länk)
└── package.json
```

## Teknisk stack
- React (statisk site, ingen server)
- SVG-karta med koordinater i mm (A4-format, viewBox 0 0 210 297)
- Hosting: GitHub Pages eller Netlify (ej bestämt)

## Kartan
Koordinater är hämtade från InDesign, i mm, A4 stående (210×297 mm).
ViewBox är satt till `0 0 210 297` så koordinaterna används direkt utan omräkning.

### Trädgårdens hörn (mm)
- Övre vänster:  x:48,  y:97
- Övre höger:    x:185, y:97
- Nedre höger:   x:177, y:216
- Nedre vänster: x:112, y:213

### Fasta element
- IBC-tankar: rektangel från (139,122) till (156,133), två stycken sida vid sida
- Bänk 1: linje från (158,146) till (167,158)
- Bänk 2: linje från (167,164) till (167,178)
- Ingång: gap i vänsterkanten vid y≈146 (x≈73–77)

## Växtdata (vaxter.json)
Varje växt har:
- `id` — unikt ID, t.ex. "kastanj-1"
- `namn` — visningsnamn
- `x`, `y` — InDesign-koordinater i mm
- `typ` — "träd", "buske", "ört", "marktäckare" eller "klätterväxt"
- `lank` — sökväg till undersida, t.ex. "/arter/kastanj"

## Symboler per typ
- träd        → stor grön cirkel  (#3a6e28)
- buske       → mindre grön cirkel (#7a9a4a)
- ört         → orange diamant    (#c8832a)
- marktäckare → grön triangel     (#a0b060)
- klätterväxt → lila kvadrat      (#6a5a9a)

## Nästa steg
1. Migrera React-komponenten till en riktig Vite/React-setup
2. Läs vaxter.json från disk (import eller fetch)
3. Bygg ut artssidor i public/arter/
4. Skriv artstexter (en HTML-fil per art)
5. Sätt upp GitHub Pages för publicering

## Artstexter
Texterna skrivs på svenska. Varje artsida ska innehålla:
- Svenskt namn (rubrik)
- Latinskt namn
- Kort beskrivning (vad växten är)
- Användning (ätlig? medicinskt? prydnad?)
- Ev. något specifikt om just denna trädgård

## Övrigt
- Jonas (projektägare) redigerar vaxter.json själv
- Texterna skrivs i samarbete med Claude
- Designspråk: botanisk/herbarium-känsla, jordtoner, Playfair Display + Crimson Text
