import PersistWallet from "@/components/shared/persist-wallet";
import { useRegistrationStatusHook } from "@/hooks/contract/useCheckRegistrationStatus.hook";
import { Loader } from "lucide-react";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function OnboardingLayout() {
  const navigate = useNavigate();
  const { hasRegistered, isCheckingRegStatus } = useRegistrationStatusHook();

  useEffect(() => {
    if (hasRegistered && !isCheckingRegStatus) {
      navigate("/dashboard");
    }
  }, [hasRegistered, isCheckingRegStatus, navigate]);

  return (
    <div className="flex h-full flex-col">
      {isCheckingRegStatus && (
        <div className="pointer-events-auto fixed left-0 top-0 z-50 flex size-full select-none items-center justify-center overflow-hidden bg-foreground/40 backdrop-blur-lg">
          <Loader className="size-8 animate-spin text-background" />
        </div>
      )}
      <PersistWallet />
      <Outlet />
    </div>
  );
}
