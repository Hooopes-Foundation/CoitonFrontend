import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowDown, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function ProposalDetailsView() {
  const isActive = true;

  return (
    <div className="flex h-full gap-6">
      <div className="flex flex-1 flex-col gap-6">
        <div className="flex h-max flex-1 flex-col gap-6 rounded-2xl border px-7 py-8">
          <div className="flex items-center gap-4">
            <Link className="text-lg opacity-50" to="/proposals">
              Proposals
            </Link>
            <ChevronRight className="size-4" />
            <p className="text-lg">Coiton is the best</p>
          </div>

          <div
            className={cn(
              "flex w-max items-center gap-2 rounded-full border px-4 py-2",
              {
                "border-[#00605A] bg-[#C8FFFB] text-[#004843]": isActive,
                "border-[#D12E2E] bg-[#FFD3D3] text-[#D12E2E]": !isActive,
              },
            )}
          >
            <span
              className={cn("size-2 rounded-full", {
                "bg-[#004843]": isActive,
                "bg-[#D12E2E]": !isActive,
              })}
            />
            <span className="font-sans_medium text-sm">
              {isActive ? "Active" : "Closed"}
            </span>
          </div>

          <div className="flex flex-col gap-6 [mask-image:linear-gradient(to_bottom,black_0%,black_20%,black_80%,transparent)]">
            <div className="flex flex-col gap-4 border-b pb-5">
              <p className="font-sans_regular text-4xl">
                Coiton is the best, Argue with your Keybaord
              </p>

              <div className="flex items-center gap-3">
                <div className="size-12 rounded-full bg-secondary"></div>
                <p className="text-[#0E0E0E]">Sammy</p>
                <div className="rounded-full border border-[#6F6F6F] px-2 py-1 text-xs text-[#6F6F6F]">
                  Core
                </div>
              </div>

              <p className="pl-11 font-sans_regular text-lg text-[#838383]">
                Date: 2024-10-21
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <p className="font-sans_regular text-2xl">Summary</p>

              <p className="pl-11 font-sans_light text-lg leading-[35px] text-[#838383]">
                This TEMP CHECK seeks governance feedback and approval to
                deprecate the Etherfi mainnet instance and reformat the
                Instances model in the Ethereum Mainnet Aave ecosystem.
              </p>
            </div>

            <div className="mt-10 flex flex-col gap-4">
              <p className="font-sans_regular text-2xl">Motivation</p>

              <p className="pl-11 font-sans_light text-lg leading-[35px] text-[#838383]">
                Aave 3.2 introduced liquid E-modes, creating a new universe of
                options and efficiency improvements for the Aave ecosystem. The
                Aave Instances vision, created & pushed by the ACI, is a massive
                success with the Lido instance that recently surpassed a
                billion-dollar market size.
              </p>
            </div>
          </div>

          <div className="flex justify-center">
            <Button variant={"outline"} className="gap-2">
              <span>View more</span>
              <ArrowDown className="size-4" />
            </Button>
          </div>
        </div>

        <div className="flex h-max flex-1 flex-col gap-6 rounded-2xl border px-7 py-8">
          <div className="flex flex-col border-b pb-4">
            <p className="font-sans_regular text-2xl">Select Your Choice</p>
            <p className="font-sans_light text-lg leading-[35px] text-[#838383]">
              Choose the choice you resonate with
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <p
              role="button"
              className="flex w-max cursor-pointer items-center gap-3"
            >
              <span className="size-6 rounded-[4px] border border-[#C3C3C3]"></span>
              <span className="font-sans_light text-lg leading-[35px] text-[#838383]">
                Yes, I agree
              </span>
            </p>
            <p
              role="button"
              className="flex w-max cursor-pointer items-center gap-3"
            >
              <span className="size-6 rounded-[4px] border border-[#C3C3C3]"></span>
              <span className="font-sans_light text-lg leading-[35px] text-[#838383]">
                No, I disagree
              </span>
            </p>
          </div>

          <Button className="ml-auto w-max">
            <span>Vote</span>
            <svg
              className="size-5"
              viewBox="0 0 20 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.83398 2.5835C4.66123 2.7213 3.85421 3.01256 3.24335 3.62819C2.08398 4.79662 2.08398 6.67718 2.08398 10.4383C2.08398 14.1994 2.08398 16.08 3.24335 17.2484C4.40273 18.4168 6.2687 18.4168 10.0007 18.4168C13.7326 18.4168 15.5986 18.4168 16.758 17.2484C17.9173 16.08 17.9173 14.1994 17.9173 10.4383C17.9173 6.67718 17.9173 4.79662 16.758 3.62819C16.1471 3.01256 15.3401 2.7213 14.1673 2.5835"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7.91602 7.16683C8.32562 7.58825 9.41585 9.25016 9.99935 9.25016M9.99935 9.25016C10.5828 9.25016 11.6731 7.58825 12.0827 7.16683M9.99935 9.25016V2.5835"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M17.9173 11.75H13.8126C13.1108 11.75 12.5595 12.3363 12.2502 12.956C11.9142 13.6292 11.2414 14.25 10.0007 14.25C8.7599 14.25 8.08709 13.6292 7.7511 12.956C7.44183 12.3363 6.89046 11.75 6.1887 11.75H2.08398"
                stroke="white"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>
          </Button>
        </div>

        <div className="flex h-max flex-1 flex-col gap-6 rounded-2xl border px-7 py-8">
          <div className="flex flex-col border-b pb-4">
            <p className="font-sans_regular text-2xl">Select Your Choice</p>
            <p className="font-sans_light text-lg leading-[35px] text-[#838383]">
              Choose the choice you resonate with
            </p>
          </div>

          <div className="flex flex-col gap-4 px-4">
            <div
              role="button"
              className="flex h-14 w-full items-center rounded-full border border-[#C0C0C0] bg-[#F6F6F6] pl-8"
            >
              <span className="text-lg">Yes</span>
            </div>
            <div
              role="button"
              className="flex h-14 w-full items-center rounded-full border border-[#C0C0C0] bg-[#F6F6F6] pl-8"
            >
              <span className="text-lg">No</span>
            </div>
            <div
              role="button"
              className="flex h-14 w-full items-center rounded-full border border-[#C0C0C0] bg-[#F6F6F6] pl-8"
            >
              <span className="text-lg">Maybe</span>
            </div>

            <Button size={"lg"}>
              <span>Vote</span>
              <svg
                className="size-5"
                viewBox="0 0 20 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.83398 2.5835C4.66123 2.7213 3.85421 3.01256 3.24335 3.62819C2.08398 4.79662 2.08398 6.67718 2.08398 10.4383C2.08398 14.1994 2.08398 16.08 3.24335 17.2484C4.40273 18.4168 6.2687 18.4168 10.0007 18.4168C13.7326 18.4168 15.5986 18.4168 16.758 17.2484C17.9173 16.08 17.9173 14.1994 17.9173 10.4383C17.9173 6.67718 17.9173 4.79662 16.758 3.62819C16.1471 3.01256 15.3401 2.7213 14.1673 2.5835"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7.91602 7.16683C8.32562 7.58825 9.41585 9.25016 9.99935 9.25016M9.99935 9.25016C10.5828 9.25016 11.6731 7.58825 12.0827 7.16683M9.99935 9.25016V2.5835"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M17.9173 11.75H13.8126C13.1108 11.75 12.5595 12.3363 12.2502 12.956C11.9142 13.6292 11.2414 14.25 10.0007 14.25C8.7599 14.25 8.08709 13.6292 7.7511 12.956C7.44183 12.3363 6.89046 11.75 6.1887 11.75H2.08398"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </svg>
            </Button>
          </div>
        </div>
      </div>

      <div className="flex w-[489px] flex-col gap-6">
        <div className="w-full rounded-2xl border px-7 py-8">
          <p className="font-sans_medium text-xl text-[#0E0E0E]">Information</p>

          <div className="mt-4 flex flex-col gap-3">
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

        <div className="w-full rounded-2xl border px-7 py-8">
          <p className="font-sans_medium text-xl text-[#0E0E0E]">
            Current Results
          </p>

          <div className="mt-4 flex flex-col gap-2">
            <div className="flex flex-col gap-1">
              <p className="flex flex-1 items-center justify-between">
                <span className="font-sans_regular text-lg text-[#838383]">
                  Yes, I agree
                </span>
                <span className="font-sans_regular text-lg">230,342 Votes</span>
              </p>

              <div className="relative h-[6px] w-full overflow-hidden rounded-2xl bg-[#C3C3C3]">
                <span className="absolute left-0 top-0 h-full w-[90%] rounded-[inherit] bg-black" />
              </div>
            </div>
            <div className="mt-7 flex flex-col gap-1">
              <p className="flex flex-1 items-center justify-between">
                <span className="font-sans_regular text-lg text-[#838383]">
                  No, I disagree
                </span>
                <span className="font-sans_regular text-lg">0 Votes</span>
              </p>

              <div className="relative h-[6px] w-full overflow-hidden rounded-2xl bg-[#C3C3C3]">
                <span className="absolute left-0 top-0 h-full w-[10%] rounded-[inherit] bg-black" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
