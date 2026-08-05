export const SITE = {
  name: "Dream Africa",
  tagline: "Luxury safaris and premium vehicle hire, one trusted company.",
  address: "21 Livingstone Way, Victoria Falls, Zimbabwe",
  founded: 2011,
  copyright: "© 2026 Dream Africa Tours & Car Hire",
};

export const BRANDS = {
  safaris: {
    name: "Dream Africa",
    tagline: "Where luxury meets the wild.",
    logo: "/dream-africa-logo.png",
  },
  rentals: {
    name: "Eden Car Rental",
    tagline: "Drive your journey. Live your freedom.",
    logo: "/eden-car-rental-logo.png",
    parentNote: "Eden Car Rental is Dream Africa's premium vehicle-hire division.",
  },
};

export const NAV_LINKS = [
  { label: "Safaris", href: "/safaris" },
  { label: "Car Rental", href: "/rentals" },
  { label: "About", href: "/#about" },
  { label: "Journal", href: "/journal" },
  { label: "Contact", href: "/#contact" },
];

export const HERO = {
  eyebrow: "Victoria Falls, Zimbabwe",
  headline: ["Discover Zimbabwe.", "Travel in luxury."],
  sub: "One company. Guided safaris through Hwange and the Zambezi, and a premium 4×4 fleet to explore the rest — every journey handled by the same trusted team.",
  primaryCta: { label: "Plan Your Journey", href: "#experiences" },
  secondaryCta: { label: "Explore Services", href: "#experiences" },
  image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=2400&q=80&auto=format&fit=crop",
};

export const WHO_WE_ARE = {
  eyebrow: "Who we are",
  heading: ["Fourteen years on the Zambezi,", "one standard of care."],
  body: "We started in 2011 with one Land Cruiser and a permit to guide in Hwange. Today Dream Africa runs two disciplines from the same Victoria Falls base — guided expeditions and a self-drive rental fleet — so a single call plans your whole trip, not two separate bookings with two separate companies.",
  image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1400&q=80&auto=format&fit=crop",
  milestones: [
    { year: "2011", label: "One Land Cruiser, one Parks permit" },
    { year: "2015", label: "First rental fleet vehicles added" },
    { year: "2019", label: "Best Safari Operator, Zimbabwe Tourism Awards" },
    { year: "2026", label: "32 vehicles, 12 guided itineraries" },
  ],
};

export const EXPERIENCES = [
  {
    key: "safaris" as const,
    label: "Experience 01",
    title: "Luxury Safaris",
    description: "Private guided expeditions through Victoria Falls, Hwange and the Zambezi — small groups, exclusive concessions, guides born on this river.",
    href: "/safaris",
    image: "https://images.unsplash.com/photo-1709403108621-66fe97132946?w=1600&q=80&auto=format&fit=crop",
    cta: "Explore Safaris",
  },
  {
    key: "rentals" as const,
    label: "Experience 02",
    title: "Premium Car Rental",
    description: "A meticulously serviced 4×4 fleet delivered to your lodge or the airport gate — self-drive freedom with a chauffeur option when you'd rather not.",
    href: "/rentals",
    image: "https://images.unsplash.com/photo-1663659321400-d397a637b59c?w=1600&q=80&auto=format&fit=crop",
    cta: "Explore the Fleet",
  },
];

type Stat = { value: number; label: string; suffix?: string; decimals?: number };

export const STATS: Stat[] = [
  { value: 14, label: "Years on the Zambezi" },
  { value: 4800, suffix: "+", label: "Guests hosted" },
  { value: 32, label: "Vehicles in fleet" },
  { value: 4.9, decimals: 1, label: "Average guest rating" },
];

export const DESTINATIONS = [
  {
    name: "Victoria Falls",
    description: "The smoke that thunders — rainforest walks, sunset cruises and the gateway to it all.",
    image: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=1200&q=80&auto=format&fit=crop",
  },
  {
    name: "Hwange National Park",
    description: "Zimbabwe's largest reserve, elephant herds a thousand strong.",
    image: "https://images.unsplash.com/photo-1548523507-fe3c0f2ed39d?w=1200&q=80&auto=format&fit=crop",
  },
  {
    name: "Upper Zambezi",
    description: "River islands, canoe channels, and camps that don't appear on any public booking site.",
    image: "https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?w=1200&q=80&auto=format&fit=crop",
  },
  {
    name: "Mana Pools",
    description: "A UNESCO floodplain on the Zambezi, walking safaris and wild, unfenced camps.",
    image: "https://images.unsplash.com/photo-1547970810-dc1eac37d174?w=1200&q=80&auto=format&fit=crop",
  },
];

export type Tour = {
  slug: string;
  category: string;
  duration: string;
  title: string;
  description: string;
  price: string;
  priceUnit: string;
  image: string;
  highlights: string[];
};

export const TOURS: Tour[] = [
  {
    slug: "falls-rainforest-walk",
    category: "Walking",
    duration: "1 day",
    title: "Falls Rainforest Walk",
    description: "All sixteen viewpoints at sunrise, before the crowds and while the spray still catches gold.",
    price: "$180",
    priceUnit: "/person",
    image: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=1400&q=80&auto=format&fit=crop",
    highlights: ["Private guide", "Sunrise departure", "Rain jacket provided"],
  },
  {
    slug: "hwange-big-five",
    category: "Game drive",
    duration: "4 days",
    title: "Hwange Big Five",
    description: "Four nights in Zimbabwe's largest reserve, tracking elephant herds a thousand strong.",
    price: "$2,450",
    priceUnit: "/person",
    image: "https://images.unsplash.com/photo-1575187105891-be9b5d30cecd?w=1400&q=80&auto=format&fit=crop",
    highlights: ["Six guests max", "Luxury tented camp", "Private vehicle"],
  },
  {
    slug: "chobe-day-trip",
    category: "Day trip",
    duration: "1 day",
    title: "Chobe Day Trip",
    description: "Cross into Botswana for a river cruise and game drive through Chobe National Park, back at the Falls by dinner.",
    price: "$220",
    priceUnit: "/person",
    image: "https://images.unsplash.com/photo-1711092038197-7082ba6d20ef?w=1400&q=80&auto=format&fit=crop",
    highlights: ["Border paperwork handled", "River cruise + game drive", "Back at the Falls by evening"],
  },
  {
    slug: "upper-zambezi-canoe",
    category: "River",
    duration: "2 days",
    title: "Upper Zambezi Canoe",
    description: "Two days paddling the channels above the Falls, camping on a private island.",
    price: "$890",
    priceUnit: "/person",
    image: "https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?w=1400&q=80&auto=format&fit=crop",
    highlights: ["Island camp", "All gear included", "Qualified river guide"],
  },
  {
    slug: "mana-pools-canoe-safari",
    category: "River",
    duration: "5 days",
    title: "Mana Pools Canoe Safari",
    description: "A UNESCO floodplain, walking safaris on foot and wild camps with no fences at all.",
    price: "$3,200",
    priceUnit: "/person",
    image: "https://images.unsplash.com/photo-1547970810-dc1eac37d174?w=1400&q=80&auto=format&fit=crop",
    highlights: ["UNESCO site", "Walking safaris", "Fly camping"],
  },
];

export const LODGES = [
  {
    name: "Zambezi Sands Camp",
    region: "Upper Zambezi",
    image: "https://images.unsplash.com/photo-1535759554012-8cbbc491f0b7?w=1200&q=80&auto=format&fit=crop",
  },
  {
    name: "Hwange Elephant Camp",
    region: "Hwange National Park",
    image: "https://images.unsplash.com/photo-1754679996635-9fa307b38c36?w=1200&q=80&auto=format&fit=crop",
  },
  {
    name: "Falls Rainforest Lodge",
    region: "Victoria Falls",
    image: "https://images.unsplash.com/photo-1678714001094-ba90abd57fec?w=1200&q=80&auto=format&fit=crop",
  },
];

export type Vehicle = {
  slug: string;
  category: "SUV" | "4x4" | "Executive";
  name: string;
  subtitle: string;
  price: number;
  image: string;
  specs: { label: string; value: string }[];
};

export const VEHICLES: Vehicle[] = [
  {
    slug: "toyota-fortuner",
    category: "SUV",
    name: "Toyota Fortuner",
    subtitle: "2.8 GD-6 4×4",
    price: 250,
    image: "https://images.unsplash.com/photo-1670054953044-2605dbd0d747?w=1400&q=80&auto=format&fit=crop",
    specs: [
      { label: "Seats", value: "7" },
      { label: "Drive", value: "4×4 Auto" },
      { label: "Range", value: "1,100 km" },
      { label: "Kms", value: "Unlimited" },
    ],
  },
  {
    slug: "land-cruiser-79",
    category: "4x4",
    name: "Land Cruiser 79",
    subtitle: "Expedition-spec, single cab",
    price: 310,
    image: "https://images.unsplash.com/photo-1663659321400-d397a637b59c?w=1400&q=80&auto=format&fit=crop",
    specs: [
      { label: "Seats", value: "2" },
      { label: "Drive", value: "4×4 Manual" },
      { label: "Range", value: "1,300 km" },
      { label: "Kms", value: "Unlimited" },
    ],
  },
  {
    slug: "hilux-double-cab",
    category: "4x4",
    name: "Hilux Double Cab",
    subtitle: "City & park, rooftop tent optional",
    price: 195,
    image: "https://images.unsplash.com/photo-1631377875413-b1e3e660bfa2?w=1400&q=80&auto=format&fit=crop",
    specs: [
      { label: "Seats", value: "5" },
      { label: "Drive", value: "4×4 Auto" },
      { label: "Range", value: "950 km" },
      { label: "Kms", value: "Unlimited" },
    ],
  },
  {
    slug: "executive-sedan",
    category: "Executive",
    name: "Executive Sedan",
    subtitle: "Airport transfers & chauffeur",
    price: 140,
    image: "https://images.unsplash.com/photo-1780296269675-169390638617?w=1400&q=80&auto=format&fit=crop",
    specs: [
      { label: "Seats", value: "4" },
      { label: "Drive", value: "Auto" },
      { label: "Range", value: "700 km" },
      { label: "Kms", value: "Unlimited" },
    ],
  },
];

export const RENTAL_SERVICES = [
  { title: "Self Drive", description: "Unlimited kilometres, cross-border papers prepared before collection." },
  { title: "Chauffeur Service", description: "A dedicated driver for the length of your stay, day or night." },
  { title: "Airport Transfers", description: "Met at the gate, vehicle already warm, luggage handled." },
];

export const TESTIMONIALS = [
  {
    quote: "We hired the Fortuner for ten days and took two guided drives. Everything arrived early, spotless, with a fridge already cold. Nothing in Zimbabwe touched it.",
    author: "Marike de Villiers",
    location: "Cape Town",
  },
  {
    quote: "Six guests, one guide, camps you can't book on your own. The kind of trip you plan a return visit around before you've even left.",
    author: "James Whitfield",
    location: "London",
  },
  {
    quote: "Booked the vehicle and a guided day through the same call. That's the whole pitch, and they deliver on it.",
    author: "Anika Petersen",
    location: "Johannesburg",
  },
];

export const TRUST_INDICATORS = [
  "Zimbabwe Tourism Authority Licensed",
  "Best Safari Operator 2025",
  "Rated 4.9 from 480+ guests",
  "24/7 Roadside & Guide Support",
];

export const FAQS = [
  {
    question: "Can I combine a rental with a guided tour?",
    answer: "Yes — it's our most popular booking. Keep the vehicle for the week and we'll slot guided days in around it. Combined bookings get 10% off the tour portion.",
  },
  {
    question: "What licence do I need to rent?",
    answer: "A valid licence held for two years, in English or with an international permit, plus a passport. Minimum driver age is 23 for the Fortuner and Land Cruiser.",
  },
  {
    question: "How small are the tour groups?",
    answer: "Six guests maximum on every departure, and we never merge groups. Private departures are available on any tour for a flat supplement.",
  },
  {
    question: "Can I take the vehicle across the border?",
    answer: "South Africa, Zambia, Botswana and Namibia are all permitted. We prepare the cross-border letter, third-party insurance and carbon tax paperwork before collection.",
  },
  {
    question: "What is your cancellation policy?",
    answer: "Full refund up to 30 days out, 50% to 14 days. Inside 14 days we'll move your dates once at no charge rather than keep your deposit.",
  },
];

type JournalPost = {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  body: string[];
  image: string;
};

export const JOURNAL_POSTS: JournalPost[] = [
  {
    slug: "when-to-visit-the-falls-for-full-spray",
    category: "Field notes",
    title: "When to visit the Falls for full spray",
    excerpt: "February to May the river is at its loudest. Here's how to plan around it.",
    body: [
      "The Zambezi peaks between March and May, when the spray can be seen from kilometres away and the rainforest walk turns into a warm shower at every viewpoint. By October the river drops low enough to see the exposed rock face — a completely different, quieter experience.",
      "If you want the roar and the mist, book March–May and bring a dry bag. If you want clear photographs of the falls themselves rather than white spray, September–November is the better window.",
    ],
    image: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=1400&q=80&auto=format&fit=crop",
  },
  {
    slug: "crossing-into-botswana-without-the-queue",
    category: "Self drive",
    title: "Crossing into Botswana without the queue",
    excerpt: "Kazungula in under forty minutes — paperwork, timing and the one form nobody mentions.",
    body: [
      "The Kazungula border between Zambia and Botswana can take hours if you arrive without the right paperwork already filled in. We prepare the cross-border letter, third-party insurance and carbon tax forms before you collect the vehicle, so it's a matter of showing documents rather than filling them in at the counter.",
      "Arrive before 9am or after 3pm if you can — the midday coach traffic is what actually causes the queue, not the border process itself.",
    ],
    image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=1400&q=80&auto=format&fit=crop",
  },
  {
    slug: "nine-hours-with-the-hwange-elephant-census",
    category: "Guides",
    title: "Nine hours with the Hwange elephant census",
    excerpt: "Our head guide spent a day counting at Nyamandhlovu pan. What he saw.",
    body: [
      "Once a year our guides join the waterhole count across Hwange, logging herd sizes from first light until the pans empty out at dusk. It's slow, quiet work — long stretches of nothing, then a herd of eighty arriving at once.",
      "It's also the best way we know to actually understand where the animals are that season, which shapes which routes we run on the Big Five itinerary for the rest of the year.",
    ],
    image: "https://images.unsplash.com/photo-1577115025117-af4768ae5447?w=1400&q=80&auto=format&fit=crop",
  },
];

export const FOOTER_LINKS = {
  safaris: [
    { label: "All tours", href: "/safaris" },
    { label: "Hwange", href: "/safaris" },
    { label: "Zambezi", href: "/safaris" },
    { label: "Private charter", href: "/safaris" },
  ],
  rentals: [
    { label: "The fleet", href: "/rentals" },
    { label: "Chauffeur service", href: "/rentals" },
    { label: "Airport transfers", href: "/rentals" },
    { label: "Cross-border", href: "/rentals" },
  ],
};
