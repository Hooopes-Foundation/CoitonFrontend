import ListingBoard from "./_components/listing-board";

export default function DashboardView() {
  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {[...new Array(3)].map((_, _index) => (
          <div
            key={_index}
            className="aspect-[1.8] rounded-[24px] border"
          ></div>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {[...new Array(3)].map((_, _index) => (
          <div key={_index} className="rounded-[24px] border">
            <div className="flex items-center gap-4 rounded-t-[inherit] border-b bg-white px-6 py-4">
              <p className="text-lg text-[#1D2939]">Market Overview</p>
              <p className="text-lg text-[#98A2B3]">Recent Transactions</p>
            </div>

            <div className="p-6">
              <div className="flex h-[300px] rounded-[24px] border bg-white"></div>
            </div>
          </div>
        ))}
      </div>
      <ListingBoard />
    </div>
  );
}
