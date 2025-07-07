import { Outlet } from "react-router-dom";

export default function Sidebar() {
  return (
    <div>
      Sidebar
      <Outlet />
    </div>
  );
}
