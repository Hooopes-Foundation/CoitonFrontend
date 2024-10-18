import { Outlet } from "react-router-dom";
import Sidebar from "./_components/sidebar";
import Navbar from "./_components/navbar";

export default function DashboardLayout() {
  return (
    <div className="flex flex-1 bg-[#F9FAFB]">
      <Sidebar />

      <main className="flex flex-1 flex-col">
        <Navbar />
        <Outlet />
      </main>
    </div>
  );
}
