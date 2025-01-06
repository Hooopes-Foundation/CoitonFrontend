import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface I_LISTING_DETAILS {
  split(arg0: string): string;
  owner?: string;
  email: string;
  phone: string;
  propertyType: string;
  listingType: "Rent" | "Sale";
  title: string;
  country: string;
  location: {
    name: string;
    latitude: string;
    longitude: string;
  };
  price: string;
  description: string;
  bedrooms: string;
  bathrooms: string;
  sizeSqft: string;
  landArea: string;
  parkingSpaces: string;
  yearBuilt: Date;
  banner?: File;
  bannerCid?: string;
  photos?: File[];
  photoCids?: string[];
  media?: File[];
  mediaCid?: string[];
  propertyDocuments?: File[];
  documentCids?: string[];
  document?: File[];
  documentCid?: string[];
  social: string | undefined;
  occupation: string | undefined;
  amenities: string[] | undefined;
  createdAt?: string;
}

export interface I_LISTING_SLICE {
  id: number;
  hash: string;
  owner: string;
  details: I_LISTING_DETAILS;
}

interface I_LISTING_STATE {
  approved: I_LISTING_SLICE[];
  unapproved: I_LISTING_SLICE[];
  isLoading: boolean;
  error: string | null;
}

const initialState: I_LISTING_STATE = {
  approved: [],
  unapproved: [],
  isLoading: false,
  error: null,
};

const listingSlice = createSlice({
  name: "listing",
  initialState,
  reducers: {
    addListing: (state, action: PayloadAction<I_LISTING_SLICE>) => {
      const newListing: I_LISTING_SLICE = {
        id: action.payload.id,
        hash: action.payload.hash,
        owner: action.payload.owner,
        details: action.payload.details,
      };

      state.unapproved.push(newListing);
    },
  },
});

export const { addListing } = listingSlice.actions;

export default listingSlice.reducer;
