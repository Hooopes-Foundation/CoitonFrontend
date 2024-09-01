import Footer from "@/components/root/footer";
import Header from "@/components/root/header";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <div className="relative min-h-screen font-sans antialiased flex flex-col flex-1">
      <div className="absolute -z-10 top-0 left-0 bg-gradient-to-b from-[#FFF4DE] via-[#FFF4DE]/50 to-background min-h-screen w-full" />
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
