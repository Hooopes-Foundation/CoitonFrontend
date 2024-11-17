import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const proposals = [
  {
    id: 1,
    name: "Sammy",
    title: "Coiton is the best, Argue with your Keybaord",
    description:
      "Author: @ACI Date: 2024-10-31 Summary This TEMP CHECK seeks governance feedback and approval to deprecate the Etherfi mainnet instance and reformat....",
    isActive: true,
  },
  {
    id: 2,
    name: "Sammy",
    title: "Coiton is the best, Argue with your Keybaord",
    description:
      "Author: @ACI Date: 2024-10-31 Summary This TEMP CHECK seeks governance feedback and approval to deprecate the Etherfi mainnet instance and reformat....",
    pole: [
      {
        label: "Yes, Totally",
        selected: 86,
      },
      {
        label: "Maybe",
        selected: 22,
      },
      {
        label: "No",
        selected: 5,
      },
    ],
    isActive: false,
  },
  {
    id: 3,
    name: "Sammy",
    title: "Coiton is the best, Argue with your Keybaord",
    description:
      "Author: @ACI Date: 2024-10-31 Summary This TEMP CHECK seeks governance feedback and approval to deprecate the Etherfi mainnet instance and reformat....",
    isActive: true,
  },
  {
    id: 4,
    name: "Sammy",
    title: "Coiton is the best, Argue with your Keybaord",
    description:
      "Author: @ACI Date: 2024-10-31 Summary This TEMP CHECK seeks governance feedback and approval to deprecate the Etherfi mainnet instance and reformat....",
    pole: [
      {
        label: "Yes, Totally",
        selected: 45,
      },
      {
        label: "Maybe",
        selected: 38,
      },
      {
        label: "No",
        selected: 67,
      },
    ],
    isActive: false,
  },
];

export default function ProposalsView() {
  return (
    <div className="flex h-full gap-6">
      <div className="sticky top-24 flex h-max w-[329px] flex-col rounded-[8px] border border-[#BEDAD9] bg-[#F5FFFE] p-8">
        <p className="mb-1 text-2xl text-[#0E0E0E]">Coiton DAO</p>
        <p className="mb-10 text-xl text-[#929292]">
          Create your DAOs proposals
        </p>

        <Link to="/proposals/new">
          <Button className="mt-auto w-full" size={"lg"}>
            <svg
              className="size-6"
              viewBox="0 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.47632 17.3999C4.48992 4.94492 13.3128 1.412 20.3739 2.62407C20.659 6.75175 18.6394 8.29738 14.7931 9.01115C15.5358 9.78721 16.8482 10.7638 16.7066 11.9846C16.6059 12.8533 16.0159 13.2796 14.836 14.1321C12.2502 16.0003 9.25474 17.1784 5.47632 17.3999Z"
                className="stroke-white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4.40039 22.3999C4.40039 15.8999 8.24887 12.5817 10.9004 10.3999"
                className="stroke-white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Create
          </Button>
        </Link>
      </div>

      <div className="flex flex-1 flex-col gap-6">
        {proposals.map((proposal, _index) => (
          <Link
            key={_index}
            to={`/proposals/${proposal.id}`}
            className="flex-1 rounded-[8px] border border-[#BEDAD9] bg-[#F5FFFE] px-6 py-4"
          >
            <div className="flex flex-col border-l border-[inherit]">
              <div className="flex items-center justify-between border-b border-[inherit] px-6 pb-4 pt-3">
                <div className="flex items-center gap-3">
                  <div className="size-12 rounded-full bg-secondary"></div>
                  <p className="text-[#0E0E0E]">{proposal.name}</p>
                  <div className="rounded-full border border-[#6F6F6F] px-2 py-1 text-xs text-[#6F6F6F]">
                    Core
                  </div>
                </div>

                <div
                  className={cn(
                    "flex items-center gap-2 rounded-full border px-4 py-2",
                    {
                      "border-[#00605A] bg-[#C8FFFB] text-[#004843]":
                        proposal.isActive,
                      "border-[#D12E2E] bg-[#FFD3D3] text-[#D12E2E]":
                        !proposal.isActive,
                    },
                  )}
                >
                  <span
                    className={cn("size-2 rounded-full", {
                      "bg-[#004843]": proposal.isActive,
                      "bg-[#D12E2E]": !proposal.isActive,
                    })}
                  />
                  <span className="font-sans_medium text-sm">
                    {proposal.isActive ? "Active" : "Closed"}
                  </span>
                </div>
              </div>

              <div className="px-6 pt-4">
                <p className="font-sans_medium text-xl">{proposal.title}</p>
                <p className="line-clamp-2 font-sans_regular text-lg">
                  {proposal.description}
                </p>

                {proposal.pole && (
                  <div className="mt-6 flex flex-col gap-4">
                    {proposal.pole.map((percent, _index) => (
                      <div
                        key={_index}
                        className="relative h-[47px] overflow-hidden rounded-[8px] border border-[#82BEB9] bg-[#D4EBE9]"
                      >
                        <span
                          className="absolute left-0 top-0 h-full w-[90%] bg-primary bg-blend-difference"
                          style={{ width: `${percent.selected}%` }}
                        />
                        <div className="flex size-full items-center justify-between px-5">
                          <p className="relative font-sans_medium text-white">
                            {percent.label}
                          </p>
                          <p className="relative font-sans_medium text-white">
                            {percent.selected}%
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <p className="mt-6 font-sans_regular text-lg text-[#C7DBD9]">
                  {proposal.isActive ? "Ends in 3 days" : "Ended 3 days ago"}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
