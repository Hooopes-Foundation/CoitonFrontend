import { Button } from "@/components/ui/button";
import { memo } from "react";
import { Link } from "react-router-dom";

const StartOnboarding = () => {
  return (
    <div className="flex h-full">
      <Link to="/onboarding">
        <Button size={"lg"}>
          <span>Start Onboarding</span>
        </Button>
      </Link>
    </div>
  );
};

export default memo(StartOnboarding);
