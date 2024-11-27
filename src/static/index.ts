import { assets } from "@/assets";
import { HiOutlineUser } from "react-icons/hi2";
import { MdOutlineFeaturedPlayList } from "react-icons/md";
import { RiListCheck2 } from "react-icons/ri";
import { IoImagesOutline } from "react-icons/io5";
import { HiOutlineDocumentText } from "react-icons/hi2";

export const variants = {
  fadeIn: (direction: "up" | "down" | "left" | "right", delay: number) => {
    return {
      hidden: {
        y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
        x: direction === "left" ? 40 : direction === "right" ? -40 : 0,
        opacity: 0,
      },
      show: {
        y: 0,
        x: 0,
        opacity: 1,
        transition: {
          type: "tween",
          duration: 0.8,
          delay: delay,
          ease: [0.25, 0.25, 0.25, 0.75],
        },
      },
    };
  },
};

export const nav_routes: ROUTES[] = [
  { label: "About", path: "/about" },
  { label: "Token", path: "/token", comingSoon: true },
  { label: "Listings", path: "/listings" },
  { label: "Blog", path: "/blog" },
];

export const footer_routes: ROUTES[] = [
  {
    label: "About",
    path: ["partners", "careers", "press", "community"],
  },
  {
    label: "Listings",
    path: ["features", "how it works", "pricing"],
  },
  {
    label: "Community",
    path: ["events", "blog", "forum", "podcast", "telegram"],
  },
];

export const dummy_properies = [
  {
    id: 1,
    isApproved: true,
    title: "Sunny Villa",
    propertyType: "House",
    address: "123 Sunshine St, Miami, FL",
    createdAt: "June 14, 2023",
    price: 500000,
    image: [
      "https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    ],
  },
  {
    id: 2,
    isApproved: true,
    title: "Cozy Cottage",
    propertyType: "Cottage",
    address: "456 Oak Lane, Asheville, NC",
    createdAt: "June 14, 2023",
    price: 300000,
    image: [
      "https://images.pexels.com/photos/979190/pexels-photo-979190.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    ],
  },
  {
    id: 3,
    isApproved: true,
    title: "Urban Apartment",
    propertyType: "Apartment",
    address: "789 Main St, New York, NY",
    createdAt: "June 14, 2023",
    price: 750000,
    image: [
      "https://images.pexels.com/photos/4280017/pexels-photo-4280017.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    ],
  },
];

export const feedbacks: CLIENTS_FEEDBACK[] = [
  {
    id: 1,
    feedback:
      "Coiton made it possible for me to invest in real estate without needing a huge capital. The process was seamless and secure!",
    name: "John Stevens",
    position: "CEO, Even Steven",
    image: assets.svgs.johnProfile,
  },
  {
    id: 2,
    feedback:
      "Finally, a platform that brings real estate investment into the digital age. Coiton is the future!",
    name: "Yusuf Benson",
    position: "CTO, Benson's Properties",
    image: assets.svgs.yusufProfile,
  },
  {
    id: 3,
    feedback:
      "Coiton's platform is user-friendly and efficient. I appreciate how easy it is to diversify my investment portfolio with real estate tokens.",
    name: "Ikenna Akpabio",
    position: "CEO, IK Investments",
    image: assets.svgs.ikenneProfile,
  },
  {
    id: 4,
    feedback:
      "As a property developer, Coiton has opened up new opportunities for me to connect with investors and fund my projects faster. It's a win-win!",
    name: "Frank Emmanuel",
    position: "Property Developer",
    image: assets.svgs.frankProfile,
  },
];

export const createListingSteps = [
  {
    title: "Owner/Agent Information",
    subtitle: "Provide your full name and email address.",
    icon: HiOutlineUser,
    fields: ["email", "phone", "social", "occupation"],
  },
  {
    title: "Property Basics",
    subtitle: "Enter your property's address, type, and price.",
    icon: MdOutlineFeaturedPlayList,
    fields: [
      "propertyType",
      "listingType",
      "title",
      "location",
      "price",
      "description",
    ],
  },
  {
    title: "Property Features",
    subtitle: "Add amenities, utilities, and other features.",
    icon: RiListCheck2,
    fields: [
      "bedrooms",
      "bathrooms",
      "sizeSqft",
      "landArea",
      "parkingSpaces",
      "yearBuilt",
      "amenities",
    ],
  },
  {
    title: "Property Media",
    subtitle: "Upload photos and/or videos of your property.",
    icon: IoImagesOutline,
    fields: ["banner", "photos"],
  },
  {
    title: "Legal Documents",
    subtitle: "Submit a valid document for DAO approval.",
    icon: HiOutlineDocumentText,
    fields: ["propertyDocuments"],
  },
];

export const listingTypes = ["rent", "sale"] as const;

export const propertyTypes = [
  "Single-family Home",
  "Multi-family Home",
  "Condominium",
  "Townhouse",
  "Apartment",
  "Co-op",
  "Loft",
  "Duplex",
  "Triplex",
  "Quadruplex",
  "Studio",
  "Penthouse",
  "Villa",
  "Cottage",
  "Cabin",
  "Ranch",
  "Farm",
  "Land",
  "Commercial Property",
  "Industrial Property",
  "Retail Space",
  "Office Space",
  "Mixed-use Property",
  "Hotel",
  "Motel",
  "Resort",
  "Mobile Home",
  "Modular Home",
  "Tiny House",
  "Boat House",
  "Farmhouse",
  "Luxury Home",
  "Historic Property",
  "New Construction",
  "Vacation Home",
  "Investment Property",
  "Bungalow",
  "Castle",
  "Manor",
  "Eco-friendly Home",
  "Prefab Home",
  "Houseboat",
  "Log Cabin",
  "Beachfront Property",
  "Mountain Property",
  "Agricultural Land",
  "Warehouse",
  "Data Center",
  "Storage Unit",
  "Parking Lot",
  "Healthcare Facility",
  "Assisted Living Facility",
  "Senior Living Community",
  "Mixed Development Complex",
  "Recreational Property",
  "Sports Facility",
  "RV Lot",
  "Timeshare",
  "Student Housing",
  "Guest House",
] as const;

export const initialCreateListing = {
  email: "email@gmail.com",
  phone: "1234567890",
  social: "https://twitter.com/_COiTON",
  occupation: "Real-Estate Trading Platform",
  propertyType: propertyTypes[0],
  listingType: listingTypes[0],
  title: "Villa in Rizal, Phillippines",
  location: {
    name: "Lagos State, Nigeria",
    latitude: "6.5269033",
    longitude: "3.5774005",
  },
  price: "999",
  description: `Escape to your own private oasis in the heart of Lagos State, Nigeria. This stunning bungalow is tucked away behind the wall of China, offering seclusion and tranquility from the bustling city life.\n\nStep inside to find a spacious living area with high ceilings and ample natural light streaming in through large windows. The kitchen features modern appliances and plenty of storage space, perfect for whipping up delicious meals.\n\nThe master bedroom boasts an en-suite bathroom and walk-in closet, providing a luxurious retreat at the end of the day. Two additional bedrooms offer flexibility for guests or a home office.\n\nOutside, you'll discover a lush garden with colorful flowers and mature trees, creating a serene outdoor space for relaxing or entertaining. Enjoy al fresco dining on the patio or unwind in the shade of the pergola.\n\nDon't miss this rare opportunity to own a piece of paradise in Lagos State. Schedule a viewing today before it's too late!`,
  bedrooms: "4",
  bathrooms: "4",
  sizeSqft: "254",
  landArea: "32",
  parkingSpaces: "4",
  yearBuilt: new Date("2024-08-31T23:00:00.000Z"),
  amenities: [
    "amenity 1",
    "amenity 2",
    "amenity 3",
    "amenity 4",
    "amenity 5",
    "amenity 6",
    "amenity 7",
    "amenity 8",
  ],
};

export const connectorsInfo = [
  {
    id: "argentX",
    name: "Argent X",
    installLink:
      "https://chromewebstore.google.com/detail/argent-x-starknet-wallet/dlcobpjiigpikoobohmabehhmhfoodbb",
  },
  {
    id: "braavos",
    name: "Braavos",
    installLink:
      "https://chromewebstore.google.com/detail/braavos-starknet-wallet/jnlgamecbpmbajjfhmmmlhejkemejdma",
  },
];
