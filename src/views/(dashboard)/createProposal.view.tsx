import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Info } from "lucide-react";

export default function CreateProposalView() {
  return (
    <div className="flex h-full gap-6">
      <div className="flex flex-1 flex-col gap-8">
        <div className="flex h-max flex-1 items-center gap-6 rounded-2xl border border-[#B9B9B9] px-7 py-4">
          <Info className="size-6 text-[#B9B9B9]" />
          <p className="font-sans_light text-lg leading-[35px] text-[#B9B9B9]">
            You need to be a DAO member of the space in order to submit a
            proposal
          </p>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col">
            <Label
              htmlFor="title"
              className="font-sans_light text-lg leading-[35px]"
            >
              Title
            </Label>

            <Input
              id="title"
              className="flex min-h-[82px] flex-1 items-center gap-6 rounded-2xl border border-[#B9B9B9] bg-transparent px-7 py-4"
            />
          </div>
          <div className="flex flex-col">
            <Label
              htmlFor="description"
              className="font-sans_light text-lg leading-[35px]"
            >
              Description (optional)
            </Label>

            <Textarea
              id="description"
              className="flex min-h-[267px] flex-1 resize-none items-center gap-6 rounded-2xl border border-[#B9B9B9] bg-transparent px-7 py-4"
            />
          </div>
          <div className="flex flex-col">
            <Label
              htmlFor="discussion"
              className="font-sans_light text-lg leading-[35px]"
            >
              Discussion (optional)
            </Label>

            <Input
              id="discussion"
              className="flex min-h-[82px] flex-1 items-center gap-6 rounded-2xl border border-[#B9B9B9] bg-transparent px-7 py-4"
            />
          </div>
        </div>

        <div className="flex h-max flex-1 flex-col gap-6 rounded-2xl border px-7 py-8">
          <div className="flex flex-col border-b pb-4">
            <p className="font-sans_regular text-2xl">Select Voting System</p>
            <p className="font-sans_light text-lg leading-[35px] text-[#838383]">
              Choose the choice you resonate with
            </p>
          </div>

          <div className="flex flex-col gap-4 px-4">
            <div
              role="button"
              className="flex h-14 w-full items-center rounded-full border border-[#C0C0C0] bg-[#F6F6F6] pl-8"
            >
              <span className="text-lg">Multichoice</span>
            </div>
            <div
              role="button"
              className="flex h-14 w-full items-center rounded-full border border-[#C0C0C0] bg-[#F6F6F6] pl-8"
            >
              <span className="text-lg">Optional</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex w-[489px] flex-col gap-6">
        <div className="w-full space-y-6 rounded-2xl border px-7 py-8">
          <Button
            className="w-full border border-[#E5E5E5]"
            size={"lg"}
            variant={"secondary"}
          >
            Preview
          </Button>
          <Button className="w-full" size={"lg"}>
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
