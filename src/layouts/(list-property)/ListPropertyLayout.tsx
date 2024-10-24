import { Outlet } from "react-router-dom";

export default function ListPropertyLayout() {
  return (
    <div className="flex h-full flex-1">
      <Outlet />
    </div>
  );
}
