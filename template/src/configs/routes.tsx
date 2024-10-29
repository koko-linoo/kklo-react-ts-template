import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { ErrorPage } from "@/components/pages/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />,
    errorElement: <ErrorPage />,
    children: [],
  },
]);
