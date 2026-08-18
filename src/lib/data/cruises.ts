export interface RiverCruise {
  slug: string;
  title: string;
  vesselType: string;
  duration: string;
  price: string;
  priceUnit: string;
  image: string;
  description: string;
  overview: string;
  highlights: string[];
  departureTime: string;
  menuHighlights: string[];
  inclusions: string[];
}

export const RIVER_CRUISES: RiverCruise[] = [
  {
    slug: "zambezi-sunset-dinner",
    title: "Zambezi Luxury Sunset & Dinner Cruise",
    vesselType: "Luxury Catamaran & River Lounge",
    duration: "2.5 Hours",
    price: "Inquire for Rates",
    priceUnit: "Complimentary Open Bar",
    image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=1200&h=700&q=80&auto=format&fit=crop",
    description:
      "Glide along the Zambezi River on luxury vessels. Enjoy complimentary fine wines, gourmet dining, and frequent elephant and hippopotamus sightings.",
    overview:
      "Drift smoothly along the boundary of the Zambezi National Park above Victoria Falls. As the sun dips behind the riverine palms casting crimson and gold over the water, spot pods of hippos, bathing elephant herds, and prolific birdlife while sipping chilled cocktails and sampling gourmet 4-course canapés.",
    highlights: [
      "Open premium bar including signature cocktails, South African wines, and gin bar",
      "Gourmet 4-course freshly prepared chef canapés and dinner fare",
      "Spacious double-deck catamaran with 360-degree viewing lounge",
      "Frequent sightings of elephants swimming between Zambezi islands",
      "Dedicated river captains with profound knowledge of river ecosystems",
    ],
    departureTime: "16:00 (Winter) / 16:30 (Summer)",
    menuHighlights: [
      "Smoked Zambezi bream carpaccio with caper dressing",
      "Flame-grilled crocodile tail skewers with citrus glaze",
      "Beef fillet medallions with wild mushroom reduction",
      "Decadent passionfruit panna cotta and artisanal cheeses",
    ],
    inclusions: [
      "2.5 hour cruise on the upper Zambezi",
      "All meals and gourmet canapés",
      "Unlimited beverages, beer, wine, and spirits",
      "Return hotel transfers in Victoria Falls",
    ],
  },
  {
    slug: "luxury-private-charter",
    title: "Exclusive Private Zambezi River Yacht Charter",
    vesselType: "Private Executive Tender",
    duration: "Custom (2 - 4 Hours)",
    price: "Custom Charter",
    priceUnit: "On Request",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&h=700&q=80&auto=format&fit=crop",
    description:
      "Private luxury river yacht reserved exclusively for your family or VIP group with a private sommelier and personal executive chef.",
    overview:
      "The pinnacle of Zambezi exclusivity. Glide past pristine islands at your own custom pace, docking near sandbanks for secluded photography, champagne toasts, and discreet personalized service.",
    highlights: [
      "Exclusive private vessel with no other guests aboard",
      "Tailored departure times and customizable routing",
      "Dedicated sommelier and onboard executive chef",
      "Bespoke dining menu curated to your culinary preferences",
    ],
    departureTime: "Flexible upon request",
    menuHighlights: [
      "Freshly shucked oysters and French champagne",
      "Dry-aged Karoo lamb cutlets",
      "Custom vegan and dietary menus available",
    ],
    inclusions: [
      "Private vessel charter and crew",
      "Premium champagne and curated wine list",
      "Five-course dining experience",
      "Private luxury chauffeur transfers",
    ],
  },
];
