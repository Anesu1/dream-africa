export interface ActivityItem {
  slug: string;
  title: string;
  category: "Scenic Flights" | "White Water" | "Adrenaline" | "River & Safari";
  duration: string;
  price: string;
  priceUnit: string;
  image: string;
  description: string;
  overview: string;
  highlights: string[];
  departureTimes: string[];
  safetyInfo: string;
  whatsIncluded: string[];
}

export const ACTIVITIES: ActivityItem[] = [
  {
    slug: "helicopter-flight-of-angels",
    title: "Flight of Angels Helicopter Tour (12–13 Mins or 25 Mins)",
    category: "Scenic Flights",
    duration: "12–13 Mins or 25 Mins",
    price: "Inquire for Rates",
    priceUnit: "Best Price Guarantee",
    image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=1200&h=700&q=80&auto=format&fit=crop",
    description:
      "Soar high above the Batoka Gorge and witness the breathtaking power of Victoria Falls from the air.",
    overview:
      "Experience the ultimate aerial perspective of one of the Seven Natural Wonders of the World. The Flight of Angels delivers continuous sweeps over the waterfall and deep volcanic gorges, offering unmatched 360-degree photography angles. Extended 25-minute flights continue upstream over the Zambezi National Park.",
    highlights: [
      "Guaranteed window seats for unobstructed aerial photography",
      "Panoramic views of the entire 1.7km waterfall curtain and deep Batoka Gorge",
      "Live pilot commentary on gorge geology and river formation",
      "Complimentary return transfers from all Victoria Falls hotels",
      "Instant WhatsApp booking confirmation",
    ],
    departureTimes: ["Morning departures: 07:30 - 11:30", "Afternoon departures: 14:30 - 17:30"],
    safetyInfo:
      "Modern turbine-powered helicopters operated by certified commercial pilots adhering to strict civil aviation authority standards.",
    whatsIncluded: [
      "Scenic helicopter flight as selected (12-13 mins or 25 mins)",
      "Return hotel transfers in Victoria Falls",
      "Pilot commentary and safety briefing",
    ],
  },
  {
    slug: "zambezi-sunset-dinner",
    title: "Zambezi Luxury Sunset & Dinner Cruise",
    category: "River & Safari",
    duration: "2.5 Hours",
    price: "Inquire for Rates",
    priceUnit: "All-Inclusive Open Bar",
    image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=1200&h=700&q=80&auto=format&fit=crop",
    description:
      "Glide along the Zambezi River on luxury vessels. Enjoy complimentary fine wines, gourmet dining, and frequent elephant and hippopotamus sightings.",
    overview:
      "Drift along the boundary of the Zambezi National Park during the golden hour. As the sun sets over the river, savor freshly prepared chef canapés, signature cocktails, and premium South African wines while watching elephants swim between river islands and hippos emerge for grazing.",
    highlights: [
      "Complimentary premium open bar (wines, beers, signature spirits, and cocktails)",
      "Gourmet 4-course freshly prepared dinner and canapés",
      "Spacious double-deck luxury catamaran with upper viewing deck",
      "Frequent wildlife sightings including elephants, hippos, and crocodiles",
      "Return hotel transfers included",
    ],
    departureTimes: ["Daily at 16:00 (Winter) / 16:30 (Summer)"],
    safetyInfo:
      "Twin-engine vessels with certified life jackets, river captain licenses, and navigation lights.",
    whatsIncluded: [
      "2.5 hour luxury river cruise",
      "Gourmet dinner & canapés",
      "Unlimited beverages and premium open bar",
      "Return transfers from Victoria Falls hotels",
    ],
  },
  {
    slug: "devils-pool-livingstone-island",
    title: "Devils Pool & Livingstone Island Experience",
    category: "Adrenaline",
    duration: "2.5 - 3 Hours",
    price: "Inquire for Rates",
    priceUnit: "Safety Guided Tour",
    image: "https://images.unsplash.com/photo-1527631746610-bca00a040d60?w=1200&h=700&q=80&auto=format&fit=crop",
    description:
      "Take the plunge at the edge of the waterfall with safety-guided Devil's Pool excursions.",
    overview:
      "Perched right on the lip of the 100-meter drop on the Zambian side of Victoria Falls, Devil's Pool is the world's ultimate natural infinity pool. Accompanied by experienced safety guides, swim out and lean over the edge to look down into the raging vortex below. Followed by high tea or breakfast on historic Livingstone Island.",
    highlights: [
      "Swim in the world-famous natural rock pool on the edge of Victoria Falls",
      "Boat transfer across the upper Zambezi to Livingstone Island",
      "Five-star breakfast, lunch, or high tea prepared on the island",
      "Professional safety guides assisting every swimmer",
    ],
    departureTimes: ["Breezy Morning: 07:30", "Mid-Morning: 09:00", "Lunch: 12:30", "High Tea: 15:30"],
    safetyInfo:
      "Seasonal activity operating during low-water months (typically mid-August to mid-January). 100% guide accompaniment.",
    whatsIncluded: [
      "Livingstone Island boat transfer and guide",
      "Devil's Pool swim access",
      "Island meal (Breakfast, Lunch, or High Tea)",
      "Safety escort",
    ],
  },
  {
    slug: "batoka-gorge-rafting",
    title: "Batoka Gorge White-Water Rafting & Bungee",
    category: "White Water",
    duration: "Full Day (6-7 Hours)",
    price: "Inquire for Rates",
    priceUnit: "Best Combo Rates",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200&h=700&q=80&auto=format&fit=crop",
    description:
      "For the ultimate thrill, conquer the Zambezi rapids or jump from the historic Victoria Falls Bridge.",
    overview:
      "Experience the undisputed world capital of adventure. Tackle the legendary Class IV and Class V rapids of the Zambezi River inside the deep basalt Batoka Gorge, or step off the platform of the historic Victoria Falls Bridge for a heart-stopping 111-meter vertical bungee jump.",
    highlights: [
      "Run world-renowned rapids: 'The Terminator', 'The Overland Truck-Eater', and 'Oblivion'",
      "Option to bundle with the 111m Victoria Falls Bridge Bungee Jump or Bridge Swing",
      "Full safety team with rescue kayakers on every expedition",
      "Hot BBQ lunch and cold refreshments at the top of the gorge",
    ],
    departureTimes: ["Daily at 07:00 AM"],
    safetyInfo:
      "International river safety standard compliant with commercial flotation vests and helmets. Experienced river masters with 10+ years experience.",
    whatsIncluded: [
      "Complete white-water rafting gear and safety equipment",
      "Professional river guide team and safety kayakers",
      "Hot BBQ lunch and cold drinks",
      "Hotel pickups and transfers",
    ],
  },
];
