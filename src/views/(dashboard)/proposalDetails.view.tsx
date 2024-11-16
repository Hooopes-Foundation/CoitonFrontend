export default function ProposalDetailsView() {
  return (
    <div className="flex h-full gap-6">
      <div className="h-max flex-1 rounded-2xl border px-6 py-8"></div>
      <div className="flex flex-col gap-6">
        <div className="w-[489px] rounded-2xl border px-7 py-8">
          <p className="font-sans_medium text-xl text-[#0E0E0E]">Information</p>

          <div className="mt-4 flex flex-col gap-2">
            <p className="flex flex-1 items-center justify-between">
              <span className="font-sans_regular text-lg text-[#838383]">
                Voting System
              </span>
              <span className="font-sans_regular text-lg">
                Single Choice Voting
              </span>
            </p>
            <p className="flex flex-1 items-center justify-between">
              <span className="font-sans_regular text-lg text-[#838383]">
                Start Date
              </span>
              <span className="font-sans_regular text-lg">
                Nov 13 2024, 9:30am
              </span>
            </p>
            <p className="flex flex-1 items-center justify-between">
              <span className="font-sans_regular text-lg text-[#838383]">
                End date
              </span>
              <span className="font-sans_regular text-lg">
                Nov 13 2024, 9:30am
              </span>
            </p>
            <p className="flex flex-1 items-center justify-between">
              <span className="font-sans_regular text-lg text-[#838383]">
                Snapshot
              </span>
              <span className="font-sans_regular text-lg">213,459 Votes</span>
            </p>
          </div>
        </div>

        <div className="w-[489px] rounded-2xl border px-7 py-8">
          <p className="font-sans_medium text-xl text-[#0E0E0E]">
            Current Results
          </p>

          <div className="mt-4 flex flex-col gap-2">
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <p>hello</p>
                <p>hello</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
