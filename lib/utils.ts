import { buildPoseidon } from "circomlibjs";

import { Buffer } from "buffer";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const genRanId = (length: number): number => {
  const upperLimit = Math.pow(10, length) - 1;
  const lowerLimit = Math.pow(10, length - 1);

  return Math.floor(Math.random() * (upperLimit - lowerLimit + 1)) + lowerLimit;
};

export function feltToString(felt: string): string {
  const hexString = felt.replace("0x", "");
  const paddedHex = hexString.length % 2 === 0 ? hexString : "0" + hexString;
  const buffer = Buffer.from(paddedHex, "hex");
  return buffer.toString("utf8").replace(/\0+$/, "");
}

export function stringToFelt(str: string): bigint {
  if (!str) return 0n;
  const buffer = Buffer.from(str, "utf8");
  const hex = buffer.toString("hex");
  return BigInt(`0x${hex}`);
}

export function objectToByteArray(obj: Record<string, unknown>): bigint[] {
  // Step 1: Convert the object to a JSON string
  const jsonString: string = JSON.stringify(obj);

  // Step 2: Convert the JSON string into bytes
  const encoder = new TextEncoder();
  const byteArray: Uint8Array = encoder.encode(jsonString);

  // Step 3: Convert the bytes to an array of BigInt values (felt252)
  const feltArray: bigint[] = [];
  for (let i = 0; i < byteArray.length; i += 31) {
    // Grab the next 31 bytes and convert them to a BigInt
    let feltValue: bigint = BigInt(0);
    const byteChunk = byteArray.slice(i, i + 31);

    for (let j = 0; j < byteChunk.length; j++) {
      feltValue = feltValue * BigInt(256) + BigInt(byteChunk[j]);
    }

    feltArray.push(feltValue);
  }

  return feltArray;
}

export function byteArrayToObject(
  feltArray: bigint[]
): Record<string, unknown> {
  const byteArray: number[] = [];

  feltArray.forEach((feltValue) => {
    let value = feltValue;
    const byteChunk = [];

    while (value > 0) {
      byteChunk.push(Number(value % BigInt(256)));
      value = value / BigInt(256);
    }

    while (byteChunk.length < 31) {
      byteChunk.push(0);
    }

    byteArray.push(...byteChunk.reverse());
  });

  const byteUint8Array = new Uint8Array(byteArray);

  const decoder = new TextDecoder();
  let jsonString = decoder.decode(byteUint8Array);

  // Trim any null characters
  jsonString = jsonString.replace(/\0/g, "");

  return JSON.parse(jsonString);
}

export function generateRandomListings() {
  const cities = [
    "Cairo",
    "Alexandria",
    "Giza",
    "Luxor",
    "Aswan",
    "Hurghada",
    "Sharm El Sheikh",
    "Dahab",
    "Siwa",
    "Marsa Matruh",
    "Suez",
    "Port Said",
    "Ismailia",
    "El Gouna",
  ];

  const areas = [
    "Downtown",
    "Waterfront",
    "Suburb",
    "City Center",
    "Historical District",
    "Old Town",
    "Financial District",
    "Beachfront",
    "Mountain View",
    "Residential Area",
    "Industrial Zone",
    "Countryside",
    "Seaside Village",
    "Urban Park",
  ];

  const ownerNames = [
    "John Doe",
    "Jane Smith",
    "Ahmed Hassan",
    "Sara Mohamed",
    "Omar Ali",
    "Mona Khalil",
    "Youssef Karim",
    "Layla Hussein",
    "Hassan Fathy",
    "Fatima El-Sayed",
    "Kareem Naguib",
    "Nadia Saad",
    "Sami Hani",
    "Noor Abdallah",
  ];

  const randomAmenities = () => {
    const all = [
      "WiFi",
      "Air Conditioning",
      "Swimming Pool",
      "Gym",
      "Parking",
      "Laundry",
      "Pets Allowed",
      "Cable TV",
      "Heating",
      "Balcony",
      "Garden",
      "BBQ Area",
      "Fireplace",
      "Concierge Service",
      "Bicycle Rental",
      "Room Service",
      "Spa",
      "Hot Tub",
      "Tennis Court",
      "Electric Vehicle Charger",
    ];
    return all.filter(() => Math.random() > 0.3);
  };

  const randomDate = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    return new Date(
      startDate.getTime() +
        Math.random() * (endDate.getTime() - startDate.getTime())
    )
      .toISOString()
      .split("T")[0];
  };

  const randomDescription = () => {
    const propertyTypes = [
      "apartment",
      "villa",
      "studio",
      "penthouse",
      "townhouse",
    ];
    const adjectives = [
      "spacious",
      "cozy",
      "modern",
      "luxurious",
      "charming",
      "elegant",
      "stylish",
    ];
    const views = ["cityscape", "sea", "garden", "mountain", "pool"];
    const nearby = [
      "shopping malls",
      "restaurants",
      "public transport",
      "schools",
      "parks",
      "beaches",
      "nightlife",
    ];

    // Randomly select items from each array
    const city = cities[Math.floor(Math.random() * cities.length)];
    const area = areas[Math.floor(Math.random() * areas.length)];
    const ownerName = ownerNames[Math.floor(Math.random() * ownerNames.length)];
    const propertyType =
      propertyTypes[Math.floor(Math.random() * propertyTypes.length)];
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const view = views[Math.floor(Math.random() * views.length)];
    const amenities = randomAmenities();
    const nearbyLocation = nearby[Math.floor(Math.random() * nearby.length)];

    return `Discover a ${adjective} ${propertyType} located in the heart of ${city}, in the ${area} area. This property offers stunning ${view} views and includes amenities such as ${amenities.join(
      ", "
    )}. Perfect for those who want to be close to ${nearbyLocation}. Contact ${ownerName} today to arrange a viewing!`;
  };

  const city = cities[Math.floor(Math.random() * cities.length)];
  const area = areas[Math.floor(Math.random() * areas.length)];

  const listingDetails = {
    title: `${city} Apartment`,
    price: Math.floor(Math.random() * 4000) + 1000,
    description: randomDescription(),
    location: `${area} ${city}`,
    amenities: randomAmenities(),
    images: Array(Math.floor(Math.random() * 8))
      .fill(null)
      .map(
        (_, i) =>
          `https://picsum.photos/${Math.floor(
            Math.random() * 250
          )}/${Math.floor(Math.random() * 350)}`
      ),
    owner: {
      name: ownerNames[Math.floor(Math.random() * ownerNames.length)],
      contact: `owner${Math.floor(Math.random() * 100)}@example.com`,
      phone: `+20 ${Math.floor(Math.random() * 1000)} ${Math.floor(
        Math.random() * 1000
      )} ${Math.floor(Math.random() * 10000)}`,
    },
    availability: {
      availableFrom: randomDate("2024-10-15", "2024-12-31"),
      availableTo: randomDate("2025-01-01", "2025-12-31"),
    },
    size: {
      area: Math.floor(Math.random() * 150) + 50,
      bedrooms: Math.floor(Math.random() * 4) + 1,
      bathrooms: Math.floor(Math.random() * 3) + 1,
    },
    optionalFeatures: {
      furnished: Math.random() > 0.5,
      petFriendly: Math.random() > 0.5,
      smokingAllowed: Math.random() > 0.7,
    },
    ratings: {
      averageRating: Number((Math.random() * 2 + 3).toFixed(1)),
      numberOfReviews: Math.floor(Math.random() * 50) + 1,
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  return listingDetails;
}
