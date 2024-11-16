import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import { Link } from "react-router-dom";

export default function PropertiesWiew() {
  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex w-full items-start gap-5 rounded-xl border border-blue-500 bg-blue-500/10 p-5">
        <Info className="size-6 text-blue-500" />
        <div className="flex flex-col gap-4">
          <p>
            You need to stake 20 STRK before you will be able to create a
            listing
          </p>

          <Button variant={"black"} className="w-max px-6">
            Stake Toke
          </Button>
        </div>
      </div>

      <div>
        <Link to="/list-property">
          <Button>List Property</Button>
        </Link>
      </div>
    </div>
  );
}
