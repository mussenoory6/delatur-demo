export const siteContent = {
  company: {
    name: "Delatur",
    tagline: "Estetiska injektionsbehandlingar i Örebro",
    phone: "072-310 66 83",
    phoneHref: "tel:0723106683",
    email: "info@delatur.com",
    address: "Klostergatan 5A, 703 61 Örebro",
    addressLine2: "Salong My Browbar",
    bookingUrl: "https://delatur.bokadirekt.se/",
    logoUrl: "https://delatur.netlify.app/assets/logo-Cxpqp1zx.png",
    treater: "Caroline Lundberg",
    treaterTitle: "Legitimerad sjuksköterska",
  },

  theme: {
    // Brand color: Delatur teal — hsl(174, 30%, 50%)
    accent: "#5c9090",
  },

  hero: {
    badge: "Legitimerad sjuksköterska · Örebro",
    headline: "Personlig vård,\nprofessionellt resultat",
    subheadline:
      "Caroline Lundberg är legitimerad sjuksköterska med specialistutbildning inom intensivvård och estetiska injektionsbehandlingar. Här får du alltid ett naturligt och professionellt resultat.",
    cta: {
      primary: "Boka konsultation",
      primaryUrl: "https://delatur.bokadirekt.se/",
      secondary: "Se behandlingar",
      secondaryUrl: "#tjanster",
    },
    heroImage: "/loakl.png",
    heroCard: {
      label: "Estetiska injektionsbehandlingar",
      title: "Naturliga resultat med trygg och personlig omvårdnad",
      items: [
        { icon: "✦", label: "Botox & Fillers", desc: "Godkända produkter av högsta kvalitet" },
        { icon: "✦", label: "Legitimerad sjuksköterska", desc: "Specialistutbildning inom injektionsteknik" },
        { icon: "✦", label: "Personlig behandling", desc: "Alltid anpassad efter dina önskemål" },
      ],
    },
  },

  about: {
    sectionLabel: "01 — Om oss",
    quote: "Personlig vård och professionellt omhändertagande — varje gång.",
    bio: "Jag som utför behandlingarna på Delatur heter Caroline Lundberg och är legitimerad sjuksköterska med specialistutbildning inom intensivvård. Jag har genomgått utbildningar inom injektionsteknik och estetiska injektionsbehandlingar för fyllmedel och Botox.",
    bio2: "Här får du alltid en personlig behandling och ett professionellt omhändertagande. Mitt mål är att du ska bli 100% nöjd — det är därför jag alltid arbetar med de absolut bästa produkterna på marknaden.",
    image: "https://delatur.netlify.app/assets/ocean-bg--6PO7tfd.jpg",
    credentials: [
      "Legitimerad sjuksköterska",
      "Specialistutbildning — intensivvård",
      "Certifierad injektionsteknik",
    ],
  },

  services: {
    title: "Våra behandlingar",
    subtitle:
      "Noggrant utvalda behandlingar med de bästa produkterna på marknaden.",
    categories: [
      {
        id: "botox" as const,
        label: "Botox",
        tagline: "Muskelavslappnande injektioner",
        description:
          "Naturliga och avslappnade ansiktsuttryck utan kirurgi. Effekten syns inom 3–14 dagar och håller 4–6 månader.",
        highlights: ["Ingen återhämtningstid", "Synlig effekt 3–14 dagar", "Håller 4–6 månader"],
        packages: [
          {
            label: "Ett område",
            sublabel: "Välj ett av tre områden",
            price: "1 800 kr",
            highlight: false,
            bookingUrl: "https://delatur.bokadirekt.se/",
          },
          {
            label: "Två områden",
            sublabel: "Kombinera för bättre resultat",
            price: "2 400 kr",
            highlight: false,
            bookingUrl: "https://delatur.bokadirekt.se/",
          },
          {
            label: "Tre områden",
            sublabel: "Mest populärt — bäst värde",
            price: "2 800 kr",
            highlight: true,
            bookingUrl: "https://delatur.bokadirekt.se/",
          },
        ],
        services: [
          {
            name: "Panna",
            description: "Horisontella pannrynkor",
            duration: "15 min",
            price: "1 800 kr",
            icon: "diamond",
            bookingUrl: "https://delatur.bokadirekt.se/",
          },
          {
            name: "Argrynkan",
            description: "Vertikala rynkor mellan ögonbrynen",
            duration: "10 min",
            price: "1 800 kr",
            icon: "diamond",
            bookingUrl: "https://delatur.bokadirekt.se/",
          },
          {
            name: "Kråkfötter",
            description: "Rynkor runt ögonens yttre hörn",
            duration: "10 min",
            price: "1 800 kr",
            icon: "diamond",
            bookingUrl: "https://delatur.bokadirekt.se/",
          },
        ],
      },
      {
        id: "fillers" as const,
        label: "Fillers",
        tagline: "Stylage hyaluronsyra",
        description:
          "Europas ledande fillermärke för naturlig volym, kontur och djupverkande återfuktning. Resultaten är omedelbara.",
        highlights: ["Omedelbart synligt resultat", "Skräddarsytt efter dig", "Håller 6–18 månader"],
        packages: [],
        services: [
          {
            name: "Stylage S",
            description: "Fina linjer och subtil korrektion",
            duration: "30 min",
            price: "2 900 kr",
            icon: "S",
            bookingUrl: "https://delatur.bokadirekt.se/",
          },
          {
            name: "Stylage M",
            description: "Mellandjupa rynkor och volym",
            duration: "35 min",
            price: "3 400 kr",
            icon: "M",
            bookingUrl: "https://delatur.bokadirekt.se/",
          },
          {
            name: "Stylage Lipp",
            description: "Läppkontur och volym",
            duration: "40 min",
            price: "3 200 kr",
            icon: "lips",
            bookingUrl: "https://delatur.bokadirekt.se/",
          },
          {
            name: "Stylage L",
            description: "Djupare volym och kindben",
            duration: "45 min",
            price: "3 900 kr",
            icon: "L",
            bookingUrl: "https://delatur.bokadirekt.se/",
          },
          {
            name: "Stylage XL",
            description: "Maximal volym och djup kontur",
            duration: "50 min",
            price: "4 400 kr",
            icon: "XL",
            bookingUrl: "https://delatur.bokadirekt.se/",
          },
          {
            name: "Stylage Hydro",
            description: "Djupverkande återfuktning och lyster",
            duration: "35 min",
            price: "2 500 kr",
            icon: "drop",
            bookingUrl: "https://delatur.bokadirekt.se/",
          },
          {
            name: "Stylage HydroMAX",
            description: "Intensiv återfuktning med maximalt resultat",
            duration: "45 min",
            price: "3 200 kr",
            icon: "dropmax",
            bookingUrl: "https://delatur.bokadirekt.se/",
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
      {
        label: "Botox — Panna & ögonbryn",
        before: "/before1.png",
        after:  "/after1.png",
      },
      {
        label: "Fillers — Läppar",
        before: "/before2.png",
        after:  "/after2.png",
      },
      {
        label: "Botox — Panna & ögonbryn",
        before: "/before3.png",
        after:  "/after3.png",
      },
      {
        label: "Fillers — Läppar",
        before: "/before4.png",
        after:  "/after4.png",
      },
    ],
  },

  stats: [
    { value: "500+", label: "Nöjda kunder" },
    { value: "5 år", label: "Erfarenhet" },
    { value: "4.9 ★", label: "Genomsnitt" },
  ],

  testimonials: {
    title: "Vad kunderna säger",
    subtitle: "Riktiga upplevelser från behandlade kunder",
    items: [
      {
        name: "Sofie A.",
        text: "Professionellt och personligt bemötande. Caroline tog sig tid att lyssna och förklara, och resultatet blev precis som jag hoppades. Känns verkligen tryggt.",
        rating: 5,
      },
      {
        name: "Linda K.",
        text: "Väldigt nöjd med min botoxbehandling. Naturligt resultat och känslan av trygghet under hela besöket. Klart bästa injektionsbehandlingen jag gjort. Varmt rekommenderat!",
        rating: 5,
      },
      {
        name: "Emma J.",
        text: "Fantastiskt resultat på mina läppar. Diskret, elegant och precis vad jag önskat. Inget överdrivet – bara naturligt och fint. Bokar definitivt igen.",
        rating: 5,
      },
    ],
  },

  cta: {
    title: "Redo att boka din behandling?",
    description:
      "Boka enkelt online via Bokadirekt, eller kontakta Caroline direkt för personlig rådgivning.",
    buttonText: "Boka online",
    buttonUrl: "https://delatur.bokadirekt.se/",
    secondaryText: "Ring 072-310 66 83",
    secondaryUrl: "tel:0723106683",
    backgroundImage: "https://delatur.netlify.app/assets/booking-bg-C8as45nR.jpg",
  },

  contact: {
    title: "Hör av dig",
    description:
      "Har du frågor om en behandling? Kontakta Caroline direkt så återkommer hon så snart som möjligt.",
  },

  googleReviews: {
    show: false,
    placeId: "",
  },

  booking: {
    categories: [
      {
        id: "botox",
        icon: "💉",
        title: "Botox",
        subtitle: "Muskelavslappnande behandling",
        description: "Effektivt mot rynkor i panna, argrynka och kring ögonen. Effekten håller 4–6 månader.",
        fromPrice: "Från 1 800 kr",
        treatments: [
          {
            name: "Botox — 1 område",
            description: "Välj ett av: panna, argrynka eller kråkfötter",
            duration: "10 min",
            price: "1 800 kr",
          },
          {
            name: "Botox — 2 områden",
            description: "Kombinera för ett mer harmoniskt resultat",
            duration: "15 min",
            price: "2 400 kr",
          },
          {
            name: "Botox — 3 områden",
            description: "Fullständig behandling — mest populärt",
            duration: "20 min",
            price: "2 800 kr",
          },
        ],
      },
      {
        id: "fillers",
        icon: "🌿",
        title: "Fillers",
        subtitle: "Stylage hyaluronsyra",
        description: "Europas ledande fillermärke för naturlig volym och återfuktning. Omedelbart synliga resultat.",
        fromPrice: "Från 2 500 kr",
        treatments: [
          {
            name: "Stylage S",
            description: "Fina linjer och subtil korrektion",
            duration: "30 min",
            price: "2 900 kr",
          },
          {
            name: "Stylage M",
            description: "Mellandjupa rynkor och volym",
            duration: "35 min",
            price: "3 400 kr",
          },
          {
            name: "Stylage Lipp",
            description: "Läppkontur och naturlig volym",
            duration: "40 min",
            price: "3 200 kr",
          },
          {
            name: "Stylage L",
            description: "Djupare volym och kindkonturer",
            duration: "45 min",
            price: "3 900 kr",
          },
          {
            name: "Stylage XL",
            description: "Maximal volym och djup kontur",
            duration: "50 min",
            price: "4 400 kr",
          },
          {
            name: "Stylage Hydro",
            description: "Djupverkande återfuktning och lyster",
            duration: "35 min",
            price: "2 500 kr",
          },
          {
            name: "Stylage HydroMAX",
            description: "Intensiv återfuktning, maximalt resultat",
            duration: "45 min",
            price: "3 200 kr",
          },
        ],
      },
    ],
  },
}
