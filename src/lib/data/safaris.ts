export interface SafariTour {
  slug: string;
  title: string;
  category: string;
  duration: string;
  price: string;
  priceUnit: string;
  image: string;
  description: string;
  overview: string;
  highlights: string[];
  itinerary: { day: string; title: string; desc: string }[];
  inclusions: string[];
  exclusions: string[];
  bestTimeToVisit: string;
  crossSellVehicle?: string;
}

export const SAFARI_TOURS: SafariTour[] = [
  {
    slug: "tri-park-circuit-safari",
    title: "The Ultimate Tri-Park Circuit (6 Days / 5 Nights)",
    category: "Multi-Destination Safari",
    duration: "6 Days / 5 Nights",
    price: "Custom Package Pricing",
    priceUnit: "Inquire for Rates",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1200&h=700&q=80&auto=format&fit=crop",
    description:
      "The premier Southern African wildlife expedition: 2 Nights Hwange National Park + 2 Nights Chobe (Botswana) + 1 Night Victoria Falls Sunset Cruise.",
    overview:
      "Experience the pinnacle of African wilderness across three iconic ecosystems. Begin with luxury game drives tracking massive elephant herds and predators in Hwange, transition smoothly across the border to Botswana's renowned Chobe riverfront, and conclude with a private luxury Zambezi sunset cruise and guided Victoria Falls rainforest tour.",
    highlights: [
      "2 Nights luxury safari lodge in Hwange National Park",
      "2 Nights riverside luxury lodge in Chobe National Park (Botswana)",
      "1 Night Victoria Falls with luxury Zambezi sunset dinner cruise",
      "Certified Zimbabwe & Botswana Professional Naturalist Guides",
      "Private air-conditioned transfers and open 4x4 game drive cruisers",
      "All meals, game drives, riverboat safaris, and park permits coordinated",
    ],
    itinerary: [
      {
        day: "Days 1 - 2",
        title: "Hwange National Park Big Game Tracking",
        desc: "Private transfer from Victoria Falls to Hwange. Morning and afternoon game drives around prime waterholes with abundant lion, elephant, and cheetah sightings.",
      },
      {
        day: "Days 3 - 4",
        title: "Chobe National Park & Riverfront Safari (Botswana)",
        desc: "Cross into Botswana at Kazungula. Experience morning boat safaris along the Chobe River and afternoon 4x4 open vehicle drives across floodplain circuits.",
      },
      {
        day: "Day 5",
        title: "Victoria Falls Guided Rainforest & Luxury Zambezi Cruise",
        desc: "Private guided walking tour of all 16 viewpoints of Victoria Falls, followed by a chef-crafted Zambezi sunset dinner cruise with open bar.",
      },
      {
        day: "Day 6",
        title: "Airport Transfer / Onward Journey",
        desc: "Leisurely breakfast and private luxury chauffeur transfer to Victoria Falls International Airport (VFA).",
      },
    ],
    inclusions: [
      "Luxury lodge accommodation (5 Nights)",
      "All meals (Breakfast, Gourmet Bush Lunch, Multi-course Dinners)",
      "Private 4x4 safari vehicles and dedicated professional guides",
      "Chobe boat safari and Zambezi sunset dinner cruise",
      "All inter-destination transfers and border logistics assistance",
    ],
    exclusions: ["National Parks conservation fees (disclosed upfront)", "International flights", "Gratuities"],
    bestTimeToVisit: "Year-round (Peak wildlife: July to October)",
    crossSellVehicle: "toyota-hilux-4x4-double-cab",
  },
  {
    slug: "hwange-national-park",
    title: "Hwange Private Day Safari Tour",
    category: "Private Day Safari",
    duration: "Full Day (10-11 Hours)",
    price: "Inquire for Rates",
    priceUnit: "Best Rate Guarantee",
    image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1200&h=700&q=80&auto=format&fit=crop",
    description:
      "Early morning departure, private 4x4 open safari vehicle, professional master guide, and luxury bush lunch in Zimbabwe's premier national park.",
    overview:
      "Step into the wild without compromising on comfort. Depart Victoria Falls in a private vehicle and arrive at Hwange for intensive big game tracking. Enjoy exclusive waterhole sightings of massive elephant herds, lions, giraffes, and diverse birdlife accompanied by a luxury hot bush lunch.",
    highlights: [
      "Early morning departure maximizing predator activity hours",
      "Private open 4x4 safari cruiser with 360-degree photography angles",
      "Certified Zimbabwe Professional Safari Guide (Zimpro)",
      "Gourmet hot bush lunch served at an exclusive private concession",
      "Round-trip Victoria Falls hotel door-to-door transfers",
    ],
    itinerary: [
      {
        day: "06:00 - 08:30",
        title: "Private Scenic Transfer to Hwange",
        desc: "Morning pickup with coffee and tea en route through scenic teak forests.",
      },
      {
        day: "08:30 - 13:00",
        title: "Morning Big Game Tracking",
        desc: "Intensive 4x4 tracking of big cats, elephants, and plains game.",
      },
      {
        day: "13:00 - 14:30",
        title: "Gourmet Bush Lunch",
        desc: "Freshly prepared multi-course meal overlooking an active waterhole.",
      },
      {
        day: "14:30 - 17:00",
        title: "Afternoon Safari & Sunset Return",
        desc: "Final waterhole circuits before comfortable private transfer back to Victoria Falls.",
      },
    ],
    inclusions: [
      "Private 4x4 safari vehicle and certified guide",
      "Gourmet bush lunch, snacks, bottled mineral water, and cold soft drinks",
      "Round-trip Victoria Falls hotel transfers",
    ],
    exclusions: ["National Park entrance fee (payable at gate or pre-invoiced)", "Personal gratuities"],
    bestTimeToVisit: "Year-round",
    crossSellVehicle: "toyota-hilux-4x4-double-cab",
  },
  {
    slug: "luxury-victoria-falls",
    title: "Victoria Falls Luxury Guided Tour & Rainforest Walk",
    category: "Iconic Guided Tour",
    duration: "Half Day (3 Hours)",
    price: "Inquire for Rates",
    priceUnit: "Private Tour",
    image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1200&h=700&q=80&auto=format&fit=crop",
    description:
      "Private guided walking tour through the Victoria Falls rainforest covering all 16 panoramic viewpoints with David Livingstone history and geology.",
    overview:
      "Feel the thunderous roar and misty spray of Mosi-oa-Tunya ('The Smoke That Thunders'). Accompanied by a private master naturalist guide, explore the historic David Livingstone memorial, the Cataract View, Main Falls, and Danger Point with bespoke photography assistance.",
    highlights: [
      "Private naturalist guide with personalized pacing",
      "Complete exploration of all 16 viewpoints in the Zimbabwe Rainforest",
      "High quality rain ponchos and bottled water provided",
      "Door-to-door hotel transfers in Victoria Falls",
    ],
    itinerary: [
      {
        day: "Viewpoints 1-8",
        title: "Livingstone Memorial & Devil's Cataract",
        desc: "Learn about the discovery of the falls and admire the raging western flow.",
      },
      {
        day: "Viewpoints 9-16",
        title: "Main Falls, Rainbow Falls & Danger Point",
        desc: "Witness perpetual rainbows and look directly down into the 108m Batoka Gorge.",
      },
    ],
    inclusions: [
      "Professional private naturalist tour guide",
      "High quality rain ponchos",
      "Bottled mineral water",
      "Return hotel transfers",
    ],
    exclusions: ["Rainforest entrance fee ($50 international / $20 SADC)", "Tips"],
    bestTimeToVisit: "Year-round (High spray March-May, clear views July-December)",
  },
  {
    slug: "chobe-day-trip",
    title: "Chobe National Park Private Day Safari (Botswana)",
    category: "Cross-Border Safari",
    duration: "Full Day (10 Hours)",
    price: "Inquire for Rates",
    priceUnit: "All-Inclusive Day Safari",
    image: "https://images.unsplash.com/photo-1534177616072-ef7dc120449d?w=1200&h=700&q=80&auto=format&fit=crop",
    description:
      "Seamless day safari to Botswana's Chobe National Park: morning wildlife boat cruise on the Chobe River, riverside lodge buffet lunch, and afternoon 4x4 game drive.",
    overview:
      "Just 70km from Victoria Falls, Chobe National Park is home to the world's highest concentration of African elephants. This curated trip includes assisted border clearance at Kazungula, a scenic water safari getting close to swimming wildlife, and open 4x4 safari drives across the floodplains.",
    highlights: [
      "Chobe River morning boat cruise getting up close to elephants & hippos",
      "Afternoon 4x4 open safari vehicle game drive",
      "Sumptuous buffet lunch at a 4-star riverside safari lodge",
      "Assisted border crossing at Kazungula",
    ],
    itinerary: [
      {
        day: "07:00",
        title: "Pickup & Kazungula Border Transit",
        desc: "Fast-tracked border crossing from Zimbabwe into Botswana.",
      },
      {
        day: "09:00 - 12:30",
        title: "Chobe River Wildlife Boat Cruise",
        desc: "Gliding along river islands watching bathing elephants, buffalo, and crocodiles.",
      },
      {
        day: "12:30 - 13:30",
        title: "Riverside Lodge Lunch",
        desc: "Buffet dining overlooking the Chobe River.",
      },
      {
        day: "13:30 - 16:30",
        title: "4x4 Game Drive in Chobe Park",
        desc: "Tracking lions, leopards, sable antelope, and large herds.",
      },
      {
        day: "18:00",
        title: "Return Transfer to Victoria Falls",
        desc: "Comfortable drop-off back at your hotel.",
      },
    ],
    inclusions: [
      "All transfers between Victoria Falls and Chobe",
      "Chobe River boat cruise & 4x4 game drive",
      "Botswana park entrance & conservation fees",
      "Lodge buffet lunch and bottled water",
    ],
    exclusions: ["Botswana visa fees if applicable", "Premium drinks"],
    bestTimeToVisit: "Year-round",
    crossSellVehicle: "toyota-fortuner-4x4",
  },
];
