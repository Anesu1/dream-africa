export interface VehicleItem {
  slug: string;
  name: string;
  category: "4x4 Safari" | "SUV Luxury" | "Expedition 4x4" | "Executive Chauffeur";
  subtitle: string;
  rateLabel: string;
  rateBadge: string;
  image: string;
  summary: string;
  description: string;
  transmission: "Automatic" | "Manual";
  passengers: number;
  luggageCapacity: string;
  fuelType: "Diesel" | "Petrol";
  specs: { label: string; value: string }[];
  features: string[];
  insurancePolicy: string;
  crossBorderEligible: boolean;
  campingAddonAvailable: boolean;
}

export const VEHICLES: VehicleItem[] = [
  {
    slug: "toyota-hilux-4x4-double-cab",
    name: "Toyota Hilux 2.8 GD-6 4x4 Double Cab",
    category: "4x4 Safari",
    subtitle: "The Quintessential African Self-Drive Safari Workhorse",
    rateLabel: "Inquire for Daily Rates",
    rateBadge: "Best 4x4 Rates",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=1200&h=700&q=80&auto=format&fit=crop",
    summary:
      "Fully equipped Toyota Hilux 4x4 double cab for self-drive expeditions in Hwange National Park and cross-border journeys to Chobe Botswana.",
    description:
      "Engineered for Southern Africa's most challenging terrains, our Toyota Hilux Double Cab features robust heavy-duty suspension, high ground clearance (286mm), selectable low-range 4WD, and an ultra-reliable 2.8L turbo-diesel engine. Available with rooftop camping tents, 40L Engel fridge, dual battery system, and full bush recovery kit.",
    transmission: "Automatic",
    passengers: 5,
    luggageCapacity: "4 Large Suitcases + Safari Gear",
    fuelType: "Diesel",
    specs: [
      { label: "Drivetrain", value: "Selectable 4WD with Rear Diff Lock" },
      { label: "Engine", value: "2.8L Turbo Diesel (150kW / 500Nm)" },
      { label: "Fuel Range", value: "80L Standard / 140L Long Range Tank" },
      { label: "Ground Clearance", value: "286 mm" },
      { label: "Air Conditioning", value: "Dual-Zone Climate Control" },
      { label: "Infotainment", value: "Apple CarPlay / Android Auto with USB" },
      { label: "Recovery Kit", value: "Compressor, High-Lift Jack, Tow Straps" },
    ],
    features: [
      "Unlimited Mileage Options Available",
      "Full Cross-Border Paperwork for Botswana (Chobe) & Zambia (Livingstone)",
      "Comprehensive Insurance with Gravel Road CDW Protection",
      "Instant WhatsApp Booking Confirmation",
      "Zero hidden fees on unpaved gravel roads in Hwange",
      "Free Victoria Falls Airport (VFA) terminal pickup & drop-off",
    ],
    insurancePolicy:
      "Includes Super CDW with zero excess option on paved and gazetted park gravel roads inside Hwange and Zambezi National Parks. No sand or bush dust cleaning surcharges.",
    crossBorderEligible: true,
    campingAddonAvailable: true,
  },
  {
    slug: "toyota-fortuner-4x4",
    name: "Toyota Fortuner 2.8 GD-6 4x4 (7-Seater)",
    category: "SUV Luxury",
    subtitle: "Premium 7-Seater Luxury SUV with True 4WD Capability",
    rateLabel: "Inquire for Daily Rates",
    rateBadge: "Family SUV",
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=1200&h=700&q=80&auto=format&fit=crop",
    summary:
      "Luxurious 7-passenger 4x4 SUV combining executive comfort with off-road ruggedness for Victoria Falls and regional safari touring.",
    description:
      "Experience the comfort of leather seating and whisper-quiet cabin insulation without compromising on off-road prowess. The Fortuner 4x4 effortlessly handles the paved highway from Victoria Falls to Bulawayo or gravel tracks leading into luxury safari concessions.",
    transmission: "Automatic",
    passengers: 7,
    luggageCapacity: "5 Suitcases",
    fuelType: "Diesel",
    specs: [
      { label: "Drivetrain", value: "Full-Time 4WD with Low Range" },
      { label: "Seating", value: "7 Luxury Leather Seats" },
      { label: "Engine", value: "2.8L Turbo Diesel (Automatic 6-Speed)" },
      { label: "Safety", value: "7 Airbags, ABS, VSC, Hill Descent Control" },
      { label: "Connectivity", value: "Touchscreen Navigation & Bluetooth" },
    ],
    features: [
      "Unlimited Mileage Options Available",
      "Full Cross-Border Paperwork for Botswana (Chobe) & Zambia (Livingstone)",
      "Comprehensive Insurance with Gravel Road CDW Protection",
      "Instant WhatsApp Booking Confirmation",
      "Executive airport terminal pickup at Victoria Falls (VFA)",
    ],
    insurancePolicy:
      "Comprehensive collision damage waiver, theft protection, and third-party liability covering Zimbabwe, Botswana, and Zambia.",
    crossBorderEligible: true,
    campingAddonAvailable: false,
  },
  {
    slug: "toyota-land-cruiser-79-safari",
    name: "Toyota Land Cruiser 79 Series Expedition 4x4",
    category: "Expedition 4x4",
    subtitle: "Unbreakable Heavy-Duty African Expedition Rig",
    rateLabel: "Inquire for Daily Rates",
    rateBadge: "Heavy-Duty Expedition",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&h=700&q=80&auto=format&fit=crop",
    summary:
      "The undisputed king of overland Africa. Built for deep Kalahari sands, Mana Pools, and remote multi-week trans-frontier expeditions.",
    description:
      "Equipped with the legendary 4.5L V8 Turbo Diesel engine, dual spare wheels, snorkel, winch, front & rear diff locks, and 180-liter dual fuel capacity. Designed specifically for self-reliant explorers venturing into the deepest sectors of Southern African national parks.",
    transmission: "Manual",
    passengers: 5,
    luggageCapacity: "Massive Overland Canopy Cargo Area",
    fuelType: "Diesel",
    specs: [
      { label: "Engine", value: "4.5L V8 Turbo Diesel" },
      { label: "Lockers", value: "Front and Rear Electronic Differential Locks" },
      { label: "Fuel Capacity", value: "180 Liters Dual Fuel Tanks (1,400km Range)" },
      { label: "Water Tank", value: "50L Integrated Potable Water Tank" },
      { label: "Winch", value: "Warn 9,500lb Heavy-Duty Recovery Winch" },
    ],
    features: [
      "Unlimited Mileage Options Available",
      "Full Cross-Border Paperwork for Botswana (Chobe) & Zambia (Livingstone)",
      "Comprehensive Insurance with Gravel Road CDW Protection",
      "Instant WhatsApp Booking Confirmation",
      "Dual rooftop tents and 40L Engel dual-zone fridge freezer",
    ],
    insurancePolicy: "Zero-excess expedition coverage across SADC cross-border routes.",
    crossBorderEligible: true,
    campingAddonAvailable: true,
  },
  {
    slug: "toyota-rav4-suv",
    name: "Toyota RAV4 All-Wheel Drive",
    category: "SUV Luxury",
    subtitle: "Agile & Fuel-Efficient City & Airport Explorer",
    rateLabel: "Inquire for Daily Rates",
    rateBadge: "Affordable SUV",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1200&h=700&q=80&auto=format&fit=crop",
    summary:
      "Compact SUV ideal for Victoria Falls town travel, hotel transfers, and paved scenic excursions.",
    description:
      "Effortless comfort, exceptional fuel economy, and smooth handling. Perfect for couples and business travelers arriving at Victoria Falls International Airport seeking independent local mobility.",
    transmission: "Automatic",
    passengers: 5,
    luggageCapacity: "3 Medium Suitcases",
    fuelType: "Petrol",
    specs: [
      { label: "Drivetrain", value: "Intelligent All-Wheel Drive (AWD)" },
      { label: "Engine", value: "2.0L Dual VVT-i" },
      { label: "Fuel Economy", value: "6.8L / 100km" },
      { label: "Air Conditioning", value: "Dual Climate Control" },
    ],
    features: [
      "Instant Victoria Falls Airport (VFA) terminal pickup",
      "Unlimited Mileage Packages Available",
      "Comprehensive CDW insurance with zero hidden fees",
      "Instant WhatsApp Booking Confirmation",
    ],
    insurancePolicy: "Standard CDW covering all paved roads and designated town routes.",
    crossBorderEligible: false,
    campingAddonAvailable: false,
  },
];

export async function getVehicleDetails(slug: string): Promise<VehicleItem | null> {
  const match = VEHICLES.find((v) => v.slug === slug);
  return match || null;
}
