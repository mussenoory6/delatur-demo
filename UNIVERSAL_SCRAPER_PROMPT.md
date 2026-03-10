# Universal Scraper Prompt

Använd denna prompt i Cursor Chat (Cmd+L) för att snabbt skapa en ny premium demo baserat på en konkurrent eller kund från Bokadirekt eller liknande källor.

---

## Prompt (kopiera och klistra in)

```
I want to create a new premium demo site for a clinic based on the information from [URL_HÄR].

Using the existing architecture and the rules in our .cursorrules file, please:

1. **Extract** the following from the URL (manually or via web fetch):
   - Company name, address, phone, email
   - Öppettider (if visible)
   - Alla tjänster med namn, beskrivning, pris, varaktighet
   - "Om företaget" / About text
   - Betyg och antal recensioner (if available)
   - Bokadirekt-bokningslänk

2. **Map their services** into our Interactive Price Menu structure in `src/content/siteContent.ts`:
   - Group similar services into categories (e.g. "Ansiktsbehandling", "Fransar & Bryn", "Kemisk peeling" → create logical category groups)
   - Each category needs: id, label, tagline, description, highlights[], packages[] (optional), services[]
   - Each service needs: name, description, duration, price, icon (diamond/lips/drop/dropmax/S/M/L/XL), bookingUrl
   - Update `siteContent.booking.categories` to match (for BookingModal)
   - If the clinic has different service types than Botox/Fillers, make ServiceMenuOverlay and ServicesSection dynamic (use category ids from siteContent instead of hardcoded "botox" | "fillers")

3. **Replace all content** in siteContent.ts:
   - company: name, tagline, phone, email, address, bookingUrl, treater, treaterTitle
   - hero: badge, headline, subheadline, cta, heroCard items
   - about: sectionLabel, quote, bio, bio2, credentials
   - services: title, subtitle, categories (with full service data)
   - results: use placeholders (e.g. /placeholder-before.png, /placeholder-after.png) if no images
   - stats: adapt to their numbers (kunder, erfarenhet, betyg)
   - testimonials: use their Bokadirekt reviews if available, or placeholder text
   - cta, contact: update with their info
   - AuraChat: update intro message and AUTO_RESPONSES with their contact details

4. **Keep the visual design EXACTLY** as the current master template:
   - Aura chat widget (glassmorphism, gold pulse)
   - Interactive Price Menu (ServiceMenuOverlay with category tabs)
   - Expert Reveal / Founder section (AboutSection layout)
   - Results section (before/after sliders)
   - All animations, parallax, scroll-reveals
   - Premium styling: cream/charcoal/gold, Playfair Display, champagne borders

5. **Use placeholders** for images where the clinic's specific images aren't available:
   - hero.heroImage: /placeholder-hero.png or similar
   - about.image: keep structure, use placeholder
   - results.items: /placeholder-before.png, /placeholder-after.png
   - Keep the Founder Reveal layout ready for when they add their portrait

6. **Make it look like a 10/10 custom-built site** for them, using our proven premium framework. All text in Swedish.
```

---

## Exempel: Setara Beauty Bar

För att skapa en demo för Setara Beauty Bar, ersätt `[URL_HÄR]` med:

```
https://www.bokadirekt.se/places/setara-beauty-bar-55601
```

---

## Snabbreferens: siteContent-struktur

| Sektion | Nycklar att uppdatera |
|---------|------------------------|
| **company** | name, tagline, phone, email, address, bookingUrl, treater, treaterTitle |
| **hero** | badge, headline, subheadline, cta, heroCard |
| **about** | sectionLabel, quote, bio, bio2, credentials, image |
| **services.categories** | id, label, tagline, description, highlights, packages, services |
| **booking.categories** | Måste matcha services för BookingModal |
| **results** | items med before/after (placeholders OK) |
| **stats** | value + label |
| **testimonials** | items med name, text, rating |
| **cta** | title, description, buttonText, buttonUrl |
| **contact** | title, description |

---

## Komponenter som behöver anpassas för nya kategorier

Om kliniken har **andra tjänstekategorier** än Botox/Fillers:

1. **ServiceMenuOverlay.tsx** – Ersätt `CategoryId = "botox" | "fillers"` med dynamisk typ baserad på `siteContent.services.categories`
2. **ServicesSection.tsx** – Samma: `CategoryId` ska vara generisk
3. **BookingModal.tsx** – Använder redan `siteContent.booking.categories`, ska fungera om data uppdateras

---

## Tips

- **Bokadirekt**: Sidan innehåller tjänster, priser, om-text, adress, telefon. Använd `mcp_web_fetch` eller manuell extrahering.
- **Färgtema**: `theme.accent` i siteContent kan anpassas per klinik (t.ex. teal för hudvård, rosa för skönhet).
- **Ikoner**: ServiceMenuOverlay stöder: `diamond`, `lips`, `drop`, `dropmax`, `S`, `M`, `L`, `XL`. Använd `diamond` som standard för nya tjänsttyper.
