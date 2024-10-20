import { Button } from "@/components/ui/button";
import { memo } from "react";
import { Link } from "react-router-dom";

const StartOnboarding = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <Link to="/onboarding">
        <Button size={"lg"}>
          <span>Start Onboarding</span>
        </Button>
      </Link>
    </div>
  );
};

export default memo(StartOnboarding);
