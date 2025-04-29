import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div>
      <h1>Dashboard</h1>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
