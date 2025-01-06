import { Outlet, useNavigate } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "./_components/app-sidebar";
import Navbar from "./_components/navbar";
import MaxWrapper from "@/components/shared/max-wrapper";
import ScrollTop from "@/components/shared/scroll-top";
import PersistWallet from "@/components/shared/persist-wallet";
import { useRegistrationStatusHook } from "@/hooks/contract/useCheckRegistrationStatus.hook";
import { useEffect } from "react";
import { useGetUserHook } from "@/hooks/contract/useGetUser.hook";
import { AppDispatch } from "@/store";
import { useDispatch } from "react-redux";
import { setCredential } from "@/store/slice/credential.slice";

export default function DashboardLayout() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { hasRegistered, isCheckingRegStatus } = useRegistrationStatusHook();
  const { currentUser, isFetchingUser } = useGetUserHook();

  useEffect(() => {
    if (!hasRegistered && !isCheckingRegStatus) {
      navigate("/onboarding");
      return;
    }

    if (
      hasRegistered &&
      !isCheckingRegStatus &&
      !isFetchingUser &&
      currentUser
    ) {
      dispatch(setCredential(currentUser));
    }
  }, [
    hasRegistered,
    isCheckingRegStatus,
    isFetchingUser,
    currentUser,
    navigate,
    dispatch,
  ]);

  return (
    <SidebarProvider className="relative flex w-full flex-1">
      <AppSidebar />
      <ScrollTop />
      <PersistWallet />

      <main className="flex flex-1 flex-col sm:bg-secondary">
        <Navbar />
        <MaxWrapper>
          <Outlet />
        </MaxWrapper>
      </main>
    </SidebarProvider>
  );
}
