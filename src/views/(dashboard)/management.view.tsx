import { Link } from "react-router-dom";
import ListingBoard from "./_components/listing-board";
import { ChevronLeft } from "lucide-react";
import { useFetchListings } from "@/hooks/starknet/useFetchListings";

export default function ManagementView() {
  const { listings } = useFetchListings();

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center gap-3">
        <Link
          to="/dashboard"
          className="font-sans_medium text-lg tracking-wide opacity-40"
        >
          Home
        </Link>
        <ChevronLeft className="size-4" />
        <p className="font-sans_medium text-lg tracking-wide">Buy/Rent</p>
      </div>
      <ListingBoard data={listings} />
    </div>
  );
}
