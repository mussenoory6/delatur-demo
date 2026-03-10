export const siteContent = {
  company: {
    name: "Setara Beauty Bar",
    tagline: "Hudvård, fransar & skönhet i Örebro",
    phone: "076-763 19 XX",
    phoneHref: "tel:07676319XX",
    email: "info@setarabeautybar.se",
    address: "Drottninggatan 38, 702 22 Örebro",
    addressLine2: "Setara Beauty Bar",
    bookingUrl: "https://www.bokadirekt.se/places/setara-beauty-bar-55601",
    logoUrl: "/placeholder-logo.svg",
    treater: "Skönhetsspecialisten",
    treaterTitle: "Certifierad skönhetsterapeut",
    initials: "SB",
    footerTagline: "Hudvård & skönhet · Örebro",
  },

  theme: {
    accent: "#5c9090",
  },

  hero: {
    badge: "4.8 ★ · 104 betyg · Örebro",
    headline: "Skönhet & vård\ni hjärtat av Örebro",
    subheadline:
      "Välkommen till Setara Beauty Bar — din destination för ansiktsbehandlingar, lash lift, brow lift, kemisk peeling och microneedling. Vi erbjuder professionell hudvård med produkter anpassade efter dina behov.",
    cta: {
      primary: "Boka behandling",
      primaryUrl: "https://www.bokadirekt.se/places/setara-beauty-bar-55601",
      secondary: "Se behandlingar",
      secondaryUrl: "#tjanster",
    },
    heroImage: "/placeholder-hero.jpg",
    heroCard: {
      label: "Våra specialiteter",
      title: "Professionell hudvård och skönhetsbehandlingar",
      items: [
        { icon: "✦", label: "Ansiktsbehandling", desc: "Klassisk behandling med djuprengöring" },
        { icon: "✦", label: "Fransar & Bryn", desc: "Lash lift, brow lift och färgning" },
        { icon: "✦", label: "Avancerad hudvård", desc: "Microneedling, kemisk peeling, BioRePeel" },
      ],
    },
  },

  about: {
    sectionLabel: "01 — Om oss",
    headline: "Möt Skönhetsspecialisten",
    headlineEm: "din certifierade terapeut",
    quote: "Välkommen till Setara Beauty Bar! Hoppas ni hittar en behandling som passar just er.",
    bio: "Hos oss på Setara Beauty Bar får du professionell hudvård och skönhetsbehandlingar i en avslappnad miljö. Vi erbjuder allt från klassisk ansiktsbehandling till avancerade behandlingar som microneedling och kemisk peeling.",
    bio2: "Hos mig går det bra att betala med Swish på plats eller Qliro direkt i bokning. Vi anpassar varje behandling efter dina individuella behov och önskemål — för ett resultat du blir nöjd med.",
    image: "/blabla.png",
    credentials: [
      "Certifierad skönhetsterapeut",
      "Specialist på Lash Lift & Brow Lift",
      "Erfaren inom microneedling och peeling",
    ],
  },

  services: {
    title: "Våra behandlingar",
    subtitle:
      "Från klassisk ansiktsbehandling till avancerad hudvård — välj den behandling som passar dig.",
    categories: [
      {
        id: "ansiktsbehandling" as const,
        label: "Ansiktsbehandling",
        tagline: "Klassisk hudvård",
        fromPrice: "Från 999 kr",
        description:
          "Kompletta ansiktsbehandlingar med djuprengöring, massage och anpassade masker. Funkar för alla åldrar med produkter anpassade efter din hudtyp.",
        highlights: ["Djuprengöring med ånga", "Portömning och peeling", "Anpassad mask och avslutande produkter"],
        packages: [],
        services: [
          {
            name: "Ansiktsbehandling inkl. färgning fransar & bryn",
            description: "Komplett behandling med massage, portömning och frans-/brynfärgning",
            duration: "120 min",
            price: "1 250 kr",
            icon: "diamond",
            bookingUrl: "https://www.bokadirekt.se/places/setara-beauty-bar-55601",
          },
          {
            name: "Klassisk ansiktsbehandling & kemisk peeling",
            description: "Djuprengöring med kemisk peeling på köpet",
            duration: "80 min",
            price: "1 998 kr",
            icon: "diamond",
            bookingUrl: "https://www.bokadirekt.se/places/setara-beauty-bar-55601",
          },
          {
            name: "Klassisk ansiktsbehandling | kur x4",
            description: "Fyra behandlingar för regelbunden hudvård",
            duration: "70 min",
            price: "3 100 kr",
            icon: "diamond",
            bookingUrl: "https://www.bokadirekt.se/places/setara-beauty-bar-55601",
          },
          {
            name: "Klassisk ansiktsbehandling med huvudmassage",
            description: "Djuprengöring med avslappnande huvud- och nackmassage",
            duration: "60 min",
            price: "999 kr",
            icon: "diamond",
            bookingUrl: "https://www.bokadirekt.se/places/setara-beauty-bar-55601",
          },
          {
            name: "Refined Beauty Boost",
            description: "Lash & Brow lift + 30 min ansiktsbehandling",
            duration: "120 min",
            price: "1 599 kr",
            icon: "diamond",
            bookingUrl: "https://www.bokadirekt.se/places/setara-beauty-bar-55601",
          },
          {
            name: "BioRePeel TCA 35%",
            description: "Kraftfull nålfri peeling för hudens struktur och lyster",
            duration: "30 min",
            price: "1 349 kr",
            icon: "diamond",
            bookingUrl: "https://www.bokadirekt.se/places/setara-beauty-bar-55601",
          },
        ],
      },
      {
        id: "fransar-bryn" as const,
        label: "Fransar & Bryn",
        tagline: "Lash Lift & Brow Lift",
        fromPrice: "Från 250 kr",
        description:
          "Framhäv dina naturliga fransar och bryn med Lash Lift och Brow Lift. Behandlingarna håller 4–8 veckor och ger en vaken, naturlig look.",
        highlights: ["Lash Lift — lyfta och forma fransar", "Brow Lift — brushed up look", "Håller 4–8 veckor"],
        packages: [],
        services: [
          {
            name: "Brynfärgning och form",
            description: "Plockning, ansning och färgning av ögonbrynen",
            duration: "40 min",
            price: "295 kr",
            icon: "diamond",
            bookingUrl: "https://www.bokadirekt.se/places/setara-beauty-bar-55601",
          },
          {
            name: "Brow Lift inkl. brynfärgning & formning",
            description: "Ändra riktning på dina naturliga strån — ultimata brynbehandlingen",
            duration: "60 min",
            price: "699 kr",
            icon: "diamond",
            bookingUrl: "https://www.bokadirekt.se/places/setara-beauty-bar-55601",
          },
          {
            name: "Färgning av fransar & bryn samt formning",
            description: "Komplett färgning och styling",
            duration: "40 min",
            price: "350 kr",
            icon: "diamond",
            bookingUrl: "https://www.bokadirekt.se/places/setara-beauty-bar-55601",
          },
          {
            name: "Kom 2st — Lashlift & Browlift",
            description: "Boka för två personer samtidigt",
            duration: "110 min",
            price: "750 kr",
            icon: "diamond",
            bookingUrl: "https://www.bokadirekt.se/places/setara-beauty-bar-55601",
          },
          {
            name: "Lash Lift & Brow Lift Combo",
            description: "Båda behandlingarna under samma tillfälle",
            duration: "90 min",
            price: "850 kr",
            icon: "diamond",
            bookingUrl: "https://www.bokadirekt.se/places/setara-beauty-bar-55601",
          },
          {
            name: "Lash lift inkl. färgning",
            description: "Lyfta och forma fransar med färgning",
            duration: "60 min",
            price: "599 kr",
            icon: "diamond",
            bookingUrl: "https://www.bokadirekt.se/places/setara-beauty-bar-55601",
          },
          {
            name: "Lashlift borttagning/avslappning",
            description: "Hjälp att fixa ett tidigare lashlift",
            duration: "25 min",
            price: "250 kr",
            icon: "diamond",
            bookingUrl: "https://www.bokadirekt.se/places/setara-beauty-bar-55601",
          },
        ],
      },
      {
        id: "hudvard" as const,
        label: "Hudvård & Avancerad",
        tagline: "Peeling & Microneedling",
        fromPrice: "Från 400 kr",
        description:
          "Kemisk peeling och microneedling för djupare hudförbättring. Reducera ärr, pigment och fina linjer med professionella behandlingar.",
        highlights: ["Kemisk peeling för acne och pigment", "Microneedling med Exceed", "Skalp- & ansiktsmassage"],
        packages: [],
        services: [
          {
            name: "Kemisk peeling acne",
            description: "Djuprengöring och exfoliering för aknehud",
            duration: "45 min",
            price: "999 kr",
            icon: "diamond",
            bookingUrl: "https://www.bokadirekt.se/places/setara-beauty-bar-55601",
          },
          {
            name: "Kemisk peeling pigment",
            description: "Minskar pigmentering och ger jämnare hudton",
            duration: "45 min",
            price: "999 kr",
            icon: "diamond",
            bookingUrl: "https://www.bokadirekt.se/places/setara-beauty-bar-55601",
          },
          {
            name: "Skalp- & ansiktsmassage",
            description: "Avkopplande behandling för huvud och ansikte",
            duration: "40 min",
            price: "400 kr",
            icon: "diamond",
            bookingUrl: "https://www.bokadirekt.se/places/setara-beauty-bar-55601",
          },
          {
            name: "KOMBO — Microneedling & kemisk peeling",
            description: "Två favoriter ihop för maximalt resultat",
            duration: "60 min",
            price: "1 399 kr",
            icon: "diamond",
            bookingUrl: "https://www.bokadirekt.se/places/setara-beauty-bar-55601",
          },
          {
            name: "Microneedling",
            description: "Stimulerar kollagen, minskar porer och fina linjer",
            duration: "60 min",
            price: "1 000 kr",
            icon: "diamond",
            bookingUrl: "https://www.bokadirekt.se/places/setara-beauty-bar-55601",
          },
          {
            name: "Microneedling paket 4 behandlingar",
            description: "Fyra behandlingar för bästa resultat",
            duration: "60 min",
            price: "3 100 kr",
            icon: "diamond",
            bookingUrl: "https://www.bokadirekt.se/places/setara-beauty-bar-55601",
          },
        ],
      },
      {
        id: "piercing" as const,
        label: "Piercing",
        tagline: "Studex — sterilt system",
        fromPrice: "Från 290 kr",
        description:
          "Säkert och nästintill smärtfritt med Studex — världens ledande sterila håltagningssystem. Öron, näsa och mer.",
        highlights: ["Sterilt Studex-system", "0,8 mm tunna smycken", "Nästintill smärtfritt"],
        packages: [],
        services: [
          {
            name: "Näshåltagning / Näspiercering",
            description: "Studex — säkraste sterila systemet",
            duration: "20 min",
            price: "Från 445 kr",
            icon: "diamond",
            bookingUrl: "https://www.bokadirekt.se/places/setara-beauty-bar-55601",
          },
          {
            name: "Öronhåltagning 1 hål (helix/brosk)",
            description: "Sterilt och säkert",
            duration: "20 min",
            price: "395 kr",
            icon: "diamond",
            bookingUrl: "https://www.bokadirekt.se/places/setara-beauty-bar-55601",
          },
          {
            name: "Öronhåltagning 1 hål (öronsnibb)",
            description: "Klassiskt öronhål",
            duration: "20 min",
            price: "290 kr",
            icon: "diamond",
            bookingUrl: "https://www.bokadirekt.se/places/setara-beauty-bar-55601",
          },
          {
            name: "Öronhåltagning 2 hål (helix/brosk)",
            description: "Två hål i brosket",
            duration: "20 min",
            price: "599 kr",
            icon: "diamond",
            bookingUrl: "https://www.bokadirekt.se/places/setara-beauty-bar-55601",
          },
          {
            name: "Öronhåltagning 2 hål (öronsnibb)",
            description: "Två klassiska öronhål",
            duration: "15 min",
            price: "499 kr",
            icon: "diamond",
            bookingUrl: "https://www.bokadirekt.se/places/setara-beauty-bar-55601",
          },
        ],
      },
    ],
  },

  results: {
    title: "Våra Resultat",
    subtitle:
      "Naturliga förbättringar som lyfter utan att förändra. Varje behandling är skräddarsydd efter dina unika förutsättningar.",
    items: [
      { label: "Ansiktsbehandling", before: "/results/before1.png", after: "/results/after1.png" },
      { label: "Lash Lift & Brow Lift", before: "/results/before2.png", after: "/results/after2.png" },
      { label: "Kemisk peeling", before: "/results/before3.png", after: "/results/after3.png" },
      { label: "Ansiktsbehandling", before: "/results/before1.png", after: "/results/after1.png" },
    ],
  },

  stats: [
    { value: "104+", label: "Betyg" },
    { value: "4.8 ★", label: "Genomsnitt" },
    { value: "Örebro", label: "Plats" },
  ],

  testimonials: {
    title: "Vad kunderna säger",
    subtitle: "Riktiga upplevelser från behandlade kunder",
    items: [
      {
        name: "Kund 1",
        text: "Fantastisk behandling! Professionellt bemötande och jag kände mig verkligen omhändertagen. Resultatet blev precis som jag hoppades.",
        rating: 5,
      },
      {
        name: "Kund 2",
        text: "Väldigt nöjd med min lash lift. Naturligt resultat och känslan av trygghet under hela besöket. Varmt rekommenderat!",
        rating: 5,
      },
      {
        name: "Kund 3",
        text: "Bästa ansiktsbehandlingen jag gjort. Huden känns så mycket fräschare och renare. Kommer definitivt tillbaka.",
        rating: 5,
      },
    ],
  },

  cta: {
    title: "Redo att boka din behandling?",
    description:
      "Boka enkelt online via Bokadirekt, eller kontakta oss direkt för personlig rådgivning.",
    buttonText: "Boka online",
    buttonUrl: "https://www.bokadirekt.se/places/setara-beauty-bar-55601",
    secondaryText: "Ring 076-763 19 XX",
    secondaryUrl: "tel:07676319XX",
    backgroundImage: "/placeholder-cta.jpg",
  },

  contact: {
    title: "Hör av dig",
    description:
      "Har du frågor om en behandling? Kontakta oss direkt så återkommer vi så snart som möjligt.",
  },

  googleReviews: {
    show: false,
    placeId: "",
  },

  aura: {
    intro: "Välkommen till Setara Beauty Bar! Jag är Aura — hur kan jag hjälpa dig idag?",
    footer: "Setara Beauty Bar · Alltid här",
    quickReplies: [
      { id: "tider", label: "Se lediga tider" },
      { id: "ansikts", label: "Ansiktsbehandling" },
      { id: "lashbrow", label: "Lash Lift & Brow Lift" },
      { id: "priser", label: "Priser & behandlingar" },
      { id: "kontakt", label: "Kontakt & adress" },
    ],
    responses: {
      tider: "Vi har lediga tider redan i veckan. Klicka på 'Boka tid' i menyn för att se alla tillgängliga pass — du kan boka direkt online via Bokadirekt.",
      priser: "Vår prislista hittar du på hemsidan under Behandlingar. Vi erbjuder allt från klassisk ansiktsbehandling (från 999 kr) till Lash Lift (599 kr), kemisk peeling (999 kr) och microneedling (1 000 kr). Vill du ha en personlig offert är du välkommen att kontakta oss.",
      ansikts: "Vi erbjuder klassisk ansiktsbehandling med huvudmassage (999 kr), ansiktsbehandling inkl. färgning av fransar & bryn (1 250 kr), samt Refined Beauty Boost med Lash & Brow lift (1 599 kr). Boka via Bokadirekt eller kontakta oss för rådgivning.",
      lashbrow: "Lash Lift & Brow Lift är våra populära behandlingar. Lash lift inkl. färgning 599 kr, Brow Lift 699 kr, eller båda i kombination 850 kr. Behandlingarna håller 4–8 veckor. Boka via Bokadirekt eller klicka på Behandlingar för fullständig prislista.",
      eftervard: "Efter din behandling rekommenderar vi att du undviker direkt solljus i 48 timmar och håller huden väl återfuktad. För Lash/Brow: undvik fukt i 24 timmar. Vi skickar alltid en personlig eftervårdsguide.",
      kontakt: "Setara Beauty Bar ligger på Drottninggatan 38, 702 22 Örebro. Ring oss på 076-763 19 XX eller skriv till info@setarabeautybar.se. Öppettider: Mån–Fre 10–18, Lör–Sön 11–18.",
      adress: "Vi finns på Drottninggatan 38, 702 22 Örebro — mitt i hjärtat av Örebro. Välkommen!",
      oppettider: "Öppettider: Måndag–Fredag 10:00–18:00, Lördag–Söndag 11:00–18:00.",
    },
    fallback: "Tack för ditt meddelande! En av våra skönhetsspecialister återkommer till dig så snart som möjligt.",
  },

  booking: {
    categories: [
      {
        id: "ansiktsbehandling",
        icon: "✨",
        title: "Ansiktsbehandling",
        subtitle: "Klassisk hudvård",
        description: "Kompletta ansiktsbehandlingar med djuprengöring, massage och anpassade masker.",
        fromPrice: "Från 999 kr",
        treatments: [
          { name: "Klassisk ansiktsbehandling med huvudmassage", description: "Djuprengöring och avslappnande massage", duration: "60 min", price: "999 kr" },
          { name: "Ansiktsbehandling inkl. färgning fransar & bryn", description: "Komplett behandling", duration: "120 min", price: "1 250 kr" },
          { name: "Klassisk ansiktsbehandling & kemisk peeling", description: "Med peeling på köpet", duration: "80 min", price: "1 998 kr" },
          { name: "Refined Beauty Boost", description: "Lash & Brow lift + ansiktsbehandling", duration: "120 min", price: "1 599 kr" },
        ],
      },
      {
        id: "fransar-bryn",
        icon: "👁",
        title: "Fransar & Bryn",
        subtitle: "Lash Lift & Brow Lift",
        description: "Framhäv dina naturliga fransar och bryn. Håller 4–8 veckor.",
        fromPrice: "Från 250 kr",
        treatments: [
          { name: "Lash lift inkl. färgning", description: "Lyfta och forma fransar", duration: "60 min", price: "599 kr" },
          { name: "Brow Lift inkl. brynfärgning & formning", description: "Ultimata brynbehandlingen", duration: "60 min", price: "699 kr" },
          { name: "Lash Lift & Brow Lift Combo", description: "Båda under samma tillfälle", duration: "90 min", price: "850 kr" },
          { name: "Brynfärgning och form", description: "Plockning, ansing och färgning", duration: "40 min", price: "295 kr" },
        ],
      },
      {
        id: "hudvard",
        icon: "🌿",
        title: "Hudvård & Avancerad",
        subtitle: "Peeling & Microneedling",
        description: "Kemisk peeling och microneedling för djupare hudförbättring.",
        fromPrice: "Från 400 kr",
        treatments: [
          { name: "Skalp- & ansiktsmassage", description: "Avkopplande behandling", duration: "40 min", price: "400 kr" },
          { name: "Kemisk peeling acne", description: "Djuprengöring för aknehud", duration: "45 min", price: "999 kr" },
          { name: "Microneedling", description: "Stimulerar kollagen", duration: "60 min", price: "1 000 kr" },
          { name: "KOMBO Microneedling & kemisk peeling", description: "Maximalt resultat", duration: "60 min", price: "1 399 kr" },
        ],
      },
      {
        id: "piercing",
        icon: "💎",
        title: "Piercing",
        subtitle: "Studex — sterilt system",
        description: "Säkert och nästintill smärtfritt med Studex.",
        fromPrice: "Från 290 kr",
        treatments: [
          { name: "Öronhåltagning 1 hål (öronsnibb)", description: "Klassiskt öronhål", duration: "20 min", price: "290 kr" },
          { name: "Öronhåltagning 2 hål (öronsnibb)", description: "Två öronhål", duration: "15 min", price: "499 kr" },
          { name: "Näshåltagning / Näspiercering", description: "Säkert och sterilt", duration: "20 min", price: "Från 445 kr" },
        ],
      },
    ],
  },

  instagram: {
    handle: "@setarabeautybar",
    url: "https://www.instagram.com/setarabeautybar",
  },

  contactFormTreatments: [
    "Ansiktsbehandling",
    "Lash Lift & Brow Lift",
    "Kemisk peeling",
    "Microneedling",
    "Piercing",
    "Konsultation",
  ],
}
